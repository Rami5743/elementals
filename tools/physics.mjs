#!/usr/bin/env node
// Measure the numbers a level designer actually needs, and write catalog/PHYSICS.md.
//
//   node tools/physics.mjs            # rewrite the table
//   node tools/physics.mjs --check    # fail if the table is out of date (after a kit update)
//
// The kit publishes constants (jumpV, gravity, run...). It does not publish outcomes: how high a
// jump really reaches, how wide a gap a run-up clears, how far a rolling stone runs out. Those are
// emergent — discrete stepping, jump-cut, collision — and they are what a design is checked
// against. They are also constant until the kit changes, so they belong in a generated table
// rather than in a throwaway probe script written afresh by every agent.
import fs from 'node:fs';
import path from 'node:path';
import { buildWorld, createState, stepGame, IN_JUMP, IN_LEFT, IN_RIGHT, TILE, PHYSIQUE } from '../kit.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const ELS = ['fire', 'water', 'earth', 'air'];
const rock = '#'.repeat(40);
const other = (el) => (el === 'fire' ? 'water' : 'fire');

/** A flat hall with an optional hole in the floor, floor row 18, ceiling well above. */
function hall({ hole = null, ceiling = 4 } = {}) {
  const t = [];
  for (let y = 0; y < 22; y++) {
    if (y < ceiling || y >= 19) t.push(rock);
    else t.push('#' + '.'.repeat(38) + '#');
  }
  if (hole) {
    const r = t[19].split('');
    for (let x = hole[0]; x <= hole[1]; x++) r[x] = '.';
    t[19] = r.join('');
    t[20] = t[20].split('').map((c, x) => (x >= hole[0] && x <= hole[1] ? '.' : c)).join('');
  }
  return t;
}

function world(el, tiles, spawns) {
  const pair = [el, other(el)];
  const level = {
    id: 'probe', name: 'Probe', order: 999, supports: [pair], tiles,
    spawns: { [pair[0]]: spawns[0], [pair[1]]: spawns[1] },
    entities: pair.map((e, i) => ({ type: 'exit', element: e, x: 2 + i * 2, y: 17 })),
  };
  const w = buildWorld(level, pair);
  return { w, pair, idx: pair.indexOf(el) };
}

const bits = (pair, el, b) => pair.map((e) => (e === el ? b : 0));

/** Highest point reached, in tiles above the floor the player started on. */
function jumpApex(el, holdTicks) {
  const { w, pair, idx } = world(el, hall(), [[5, 18], [30, 18]]);
  let s = createState(w);
  const floor = s.players[idx].y;
  let apex = 0;
  for (let t = 0; t < 120; t++) {
    s = stepGame(w, s, bits(pair, el, t < holdTicks ? IN_JUMP : 0));
    apex = Math.max(apex, (floor - s.players[idx].y) / TILE);
  }
  return apex;
}

/** Widest hole (in tiles) the element clears, trying every sensible take-off point. */
function maxGap(el, { runUp }) {
  let best = 0;
  for (let width = 1; width <= 12; width++) {
    const hole = [20, 20 + width - 1];
    const lipPx = hole[0] * TILE;
    let cleared = false;
    // sweep the take-off point: the run-up version may jump anywhere in the last 3 tiles
    const offsets = runUp ? [0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32] : [0];
    for (const off of offsets) {
      const { w, pair, idx } = world(el, hall({ hole }), [[runUp ? 8 : 19, 18], [35, 18]]);
      let s = createState(w);
      let jumping = false;
      for (let t = 0; t < 240; t++) {
        const p = s.players[idx];
        const edge = p.x + PHYSIQUE[el].w;          // leading edge, in pixels
        if (!runUp) jumping = t > 2;
        else if (edge >= lipPx - off) jumping = true;
        s = stepGame(w, s, bits(pair, el, IN_RIGHT | (jumping ? IN_JUMP : 0)));
        const q = s.players[idx];
        if (q.dead) break;
        if (q.x / TILE > hole[1] + 1 && q.grounded === 1) { cleared = true; break; }
      }
      if (cleared) break;
    }
    if (cleared) best = width; else break;
  }
  return best;
}

/** How a fan of this strength treats the element: ticks to climb 10 tiles, or the hang it gives. */
function fanBehaviour(el, strength) {
  const tiles = hall({ ceiling: 1 });
  const pairEls = [el, other(el)];
  const lvl = {
    id: 'probe', name: 'Probe', order: 999, supports: [pairEls], tiles,
    spawns: { [pairEls[0]]: [20, 18], [pairEls[1]]: [5, 18] },
    entities: [
      { id: 'f', type: 'fan', x: 19, y: 2, w: 3, h: 17, strength },
      ...pairEls.map((e, i) => ({ type: 'exit', element: e, x: 2 + i * 2, y: 17 })),
    ],
  };
  const w2 = buildWorld(lvl, pairEls);
  const idx = pairEls.indexOf(el);
  let s = createState(w2);
  const floor = s.players[idx].y;
  let peak = 0, tenAt = null, airborne = 0;
  for (let t = 0; t < 600; t++) {
    s = stepGame(w2, s, bits(pairEls, el, 0));
    const up = (floor - s.players[idx].y) / TILE;
    peak = Math.max(peak, up);
    if (!s.players[idx].grounded) airborne++;
    if (tenAt === null && up >= 10) tenAt = t;
  }
  if (tenAt !== null) return `climbs, 10 tiles in ${(tenAt / 60).toFixed(1)} s`;
  if (peak > 0.3) return `floats ${peak.toFixed(1)} tiles`;
  return airborne > 30 ? `hang only` : '—';
}

/** A rolling boulder: terminal speed on a slope, and how far it runs out on the flat. */
function rollMeasure(slopeTiles) {
  const t = [];
  for (let y = 0; y < 22; y++) t.push(y < 10 ? rock : '#' + '.'.repeat(38) + '#');
  // a ramp of `\\` stepping one row down per column, rock beneath, then flat floor at row 19
  const rows = t.map((r) => r.split(''));
  for (let i = 0; i < slopeTiles; i++) {
    const x = 6 + i, y = 13 + i;
    rows[y][x] = '\\';
    for (let yy = y + 1; yy < 19; yy++) rows[yy][x] = '#';
  }
  for (let x = 1; x < 39; x++) rows[19][x] = '#';
  const tiles = rows.map((r) => r.join(''));
  const pairEls = ['earth', 'fire'];
  const lvl = {
    id: 'probe', name: 'Probe', order: 999, supports: [pairEls], tiles,
    spawns: { earth: [35, 18], fire: [33, 18] },
    entities: [
      { id: 'b', type: 'boulder', x: 6, y: 12, rolls: true },
      ...pairEls.map((e, i) => ({ type: 'exit', element: e, x: 2 + i * 2, y: 17 })),
    ],
  };
  const w2 = buildWorld(lvl, pairEls);
  let s = createState(w2);
  const b = () => s.ents[w2.ents.findIndex((e) => e.def.id === 'b')];
  let top = 0, lastX = b().x, stillFor = 0, flatStart = null, flatEnd = null;
  for (let tick = 0; tick < 600; tick++) {
    s = stepGame(w2, s, [0, 0]);
    const now = b();
    const v = now.x - lastX;
    top = Math.max(top, v);
    if (flatStart === null && now.y / TILE >= 18) flatStart = now.x;
    if (Math.abs(v) < 0.01) { if (++stillFor > 20) { flatEnd = now.x; break; } } else stillFor = 0;
    lastX = now.x;
  }
  return { top, runOut: flatStart !== null && flatEnd !== null ? (flatEnd - flatStart) / TILE : null };
}

/**
 * Pulleys (format 3): a shaft with one pulley, something on each platform, left to settle.
 * `first`/`second` are an element, 'box', 'boulder' or null. Returns how far the first platform
 * dropped and how far the second rose, in tiles, and how many ticks it moved for.
 */
function pulleyTrial({ first = null, second = null, ratio = 1, weights = [0, 0], range = 2, ticks = 500 }) {
  const open = [];
  for (let y = 0; y < 22; y++) open.push(y < 2 || y >= 19 ? rock : '#' + '.'.repeat(38) + '#');
  const ents = [{ id: 'p', type: 'pulley', x: 8, y: 10, w: 2, to: [20, 10], ratio, weights, range }];
  const spawns = {}, pair = [];
  for (const [side, what] of [['first', first], ['second', second]]) {
    if (!what) continue;
    const x = side === 'first' ? 8 : 20;
    if (ELS.includes(what)) { pair.push(what); spawns[what] = [x, 9]; }
    else ents.push({ id: side, type: what, x, y: 9 });
  }
  while (pair.length < 2) {                              // fill the group out, well away from the shaft
    const e = ELS.find((x) => !pair.includes(x));
    pair.push(e); spawns[e] = [30 + pair.length * 2, 18];
  }
  const level = {
    id: 'probe', name: 'Probe', order: 999, supports: [pair], tiles: open, spawns,
    entities: [...ents, ...pair.map((e, i) => ({ type: 'exit', element: e, x: 2 + i * 2, y: 17 }))],
  };
  const w = buildWorld(level, pair);
  const pi = w.ents.findIndex((e) => e.def.id === 'p');
  let s = createState(w);
  const y0 = s.ents[pi].y;
  let moving = 0, prev = s.ents[pi].d;
  for (let t = 0; t < ticks; t++) {
    s = stepGame(w, s, pair.map(() => 0));
    if (s.ents[pi].d !== prev) moving++;
    prev = s.ents[pi].d;
  }
  return { drop: s.ents[pi].d / TILE, rise: (y0 - s.ents[pi].y) / TILE, moving, dropPx: s.ents[pi].d };
}

/** What a body pulls with on a rope: the smallest weight of its own the far platform needs to hold it. */
function ropeWeight(what) {
  for (let w2 = 0; w2 <= 8; w2 += 0.5) {
    if (pulleyTrial({ first: what, weights: [0, w2], ticks: 400 }).drop < 0.05) return w2;
  }
  return null;
}

const n = (x, d = 2) => x.toFixed(d);
const rows = [];

rows.push('## Jumps\n');
rows.push('| element | jumpV | held to apex | 3-tick tap | widest gap, run-up | widest gap, from the lip |');
rows.push('|---|---|---|---|---|---|');
for (const el of ELS) {
  rows.push(`| ${el} | ${PHYSIQUE[el].jumpV} | ${n(jumpApex(el, 30))} tiles | ${n(jumpApex(el, 3))} tiles | ${maxGap(el, { runUp: true })} tiles | ${maxGap(el, { runUp: false })} tiles |`);
}

rows.push('\n## Fans — what each strength does to a player standing in it, no steering\n');
rows.push('| strength | fire | water | earth | air |');
rows.push('|---|---|---|---|---|');
for (const strength of [0.9, 1.54, 2.0, 2.7]) {
  rows.push(`| ${strength} | ${ELS.map((el) => fanBehaviour(el, strength)).join(' | ')} |`);
}

rows.push('\n## Rolling boulders (`"rolls": true`)\n');
rows.push('| slope | top speed | run-out on the flat |');
rows.push('|---|---|---|');
for (const sl of [2, 3, 5]) {
  const r = rollMeasure(sl);
  rows.push(`| ${sl} tiles | ${n(r.top)} px/tick | ${r.runOut === null ? 'did not settle' : n(r.runOut, 1) + ' tiles'} |`);
}

rows.push('\n## Pulleys (`pulley`, format 3) — what a body pulls with on the rope\n');
rows.push('| air | fire | water | earth | crate | boulder |');
rows.push('|---|---|---|---|---|---|');
rows.push(`| ${['air', 'fire', 'water', 'earth', 'box', 'boulder'].map((b) => ropeWeight(b)).join(' | ')} |`);
rows.push('\nThe heavier side goes down; equal sides stay where they are. `weights` adds a weight of the');
rows.push('platform\'s own to either side, and a snatch block divides everything on the second side,');
rows.push('its own weight included, by `ratio`.\n');
rows.push('| `range` | `ratio` | the first platform drops | the second rises | speed |');
rows.push('|---|---|---|---|---|');
for (const [range, ratio] of [[2, 1], [4, 1], [6, 1], [2, 2], [2, 4]]) {
  const r = pulleyTrial({ first: 'fire', range, ratio });
  rows.push(`| ${range} | ${ratio} | ${n(r.drop, 1)} tiles | ${n(r.rise, 2)} tiles | ${n(r.dropPx / r.moving)} px/tick (${n(r.moving / 60, 1)} s) |`);
}

const body = `# Measured physics

Generated by \`node tools/physics.mjs\` — do not edit by hand. Regenerate after every kit update;
\`node tools/physics.mjs --check\` fails when the table no longer matches the simulation.

The kit publishes constants (\`PHYSIQUE\`, gravity, \`jumpV\`, \`COYOTE_TICKS\`…). These are the
*outcomes* those constants produce, which is what a design has to be checked against: the naive
apex from \`jumpV²/2g\` is 2.84 tiles, and the real figure is 2.69, enough to turn a three-tile
ledge from reachable into unreachable.

${rows.join('\n')}

Widest gap is the largest hole, in whole tiles, that the element gets across and lands on the far
side of: with a run-up from eight tiles back, or starting at the lip. A rider on your head, a low
ceiling, or a slope changes these, so a design that sits on the boundary still wants its own probe.
`;

const out = path.join(ROOT, 'catalog', 'PHYSICS.md');
if (process.argv.includes('--check')) {
  const old = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : '';
  if (old !== body) { console.error('catalog/PHYSICS.md is out of date — run: node tools/physics.mjs'); process.exit(1); }
  console.log('catalog/PHYSICS.md matches the simulation');
} else {
  fs.writeFileSync(out, body);
  console.log(`catalog/PHYSICS.md written (${rows.length} rows)`);
}
