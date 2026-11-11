#!/usr/bin/env node
// How close is a level to everything that already exists for the same player count?
//
//   node tools/novelty.mjs <id>            # a level in levels/
//   node tools/novelty.mjs <path.json>     # a draft level file
//
// Prints the nearest levels by feature overlap, the features that are new at this player count,
// and a verdict. Overlap with a level for a *different* player count is reported but never fails:
// a 2-player level may reuse a 3-player level's idea.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const arg = process.argv[2];
if (!arg) { console.error('usage: node tools/novelty.mjs <id|path-to-level.json>'); process.exit(2); }

const catalogue = JSON.parse(fs.readFileSync(path.join(ROOT, 'catalog', 'levels.json'), 'utf8'));
const file = arg.endsWith('.json') ? arg : path.join(ROOT, 'levels', arg, 'level.json');
if (!fs.existsSync(file)) { console.error(`no such level: ${file} (run node tools/catalog.mjs first?)`); process.exit(2); }
const level = JSON.parse(fs.readFileSync(file, 'utf8'));
const metaFile = path.join(path.dirname(file), 'meta.json');
const meta = fs.existsSync(metaFile) ? JSON.parse(fs.readFileSync(metaFile, 'utf8')) : {};

// Same token vocabulary as tools/catalog.mjs.
const SKIP_ENT = new Set(['gem', 'exit', 'sign', 'checkpoint']);
const SPECIAL_TILE = { '=': 'one-way', '/': 'slope', '\\': 'slope', L: 'lava', W: 'water', M: 'mud', V: 'mist', S: 'sludge' };
const beltBand = (s) => (s < 2.6 ? 'walkable' : s < 3.2 ? 'blocks-earth' : s < 3.4 ? 'blocks-fire-water' : 'blocks-all');
const fanBand = (f) => (f < 1.2 ? 'lifts-air' : f < 1.6 ? 'hang-time' : f < 2.5 ? 'lifts-fire-water' : 'lifts-all');
function tokensOf(l) {
  const t = new Set();
  for (const e of l.entities) {
    if (SKIP_ENT.has(e.type)) continue;
    t.add(`ent:${e.type}`);
    if (e.latch) t.add('opt:latch');
    if (e.invert) t.add(`opt:invert:${e.type}`);
    if (e.required) t.add(`opt:required:${e.required}`);
    if (e.mode) t.add(`opt:${e.type}:${e.mode}`);
    if (e.weight === 'heavy') t.add('opt:heavy-plate');
    if (e.strength !== undefined) t.add(`opt:fan:${fanBand(e.strength)}`);
    if (e.speed !== undefined && e.type === 'belt') t.add(`opt:belt:${beltBand(Math.abs(e.speed))}`);
    if (e.duration !== undefined) t.add(`opt:${e.type}-timed`);
    if (e.range !== undefined) t.add('opt:seesaw-range');
    if (e.type === 'door' && e.w > e.h) t.add('opt:wide-door');
  }
  for (const ch of new Set(l.tiles.join(''))) if (SPECIAL_TILE[ch]) t.add(`tile:${SPECIAL_TILE[ch]}`);
  if (l.dark) t.add('dark');
  return [...t].sort();
}

const mine = tokensOf(level);
const sizes = [...new Set(level.supports.map((g) => g.length))];
const jaccard = (a, b) => {
  const B = new Set(b), inter = a.filter((x) => B.has(x)).length;
  return inter / (new Set([...a, ...b]).size || 1);
};

// Weight each feature by how rare it is across the whole catalogue: a level is not novel because
// it also has a door and a gem, and it is novel because of the two things almost nothing else has.
const df = new Map();
for (const l of catalogue) for (const t of new Set(l.tokens)) df.set(t, (df.get(t) ?? 0) + 1);
const N = catalogue.length;
const w = (t) => Math.log(N / (1 + (df.get(t) ?? 0)));
const weighted = (a, b) => {
  const B = new Set(b), A = new Set(a);
  let inter = 0, union = 0;
  for (const t of new Set([...a, ...b])) { const x = w(t); union += x; if (A.has(t) && B.has(t)) inter += x; }
  return union ? inter / union : 0;
};

const others = catalogue.filter((l) => l.id !== level.id);
const scored = others.map((l) => ({ ...l, j: weighted(mine, l.tokens), plain: jaccard(mine, l.tokens), same: l.sizes.some((n) => sizes.includes(n)) }))
  .sort((a, b) => b.j - a.j);
const sameCount = scored.filter((l) => l.same);

// features nobody of this player count has used before
const seenHere = new Set(sameCount.flatMap((l) => l.tokens));
const fresh = mine.filter((t) => !seenHere.has(t));

// pairs of features nobody of this player count has ever put in the same level: the combination
// can be new even when every ingredient has been used before
const pairsOf = (ts) => { const out = []; for (let i = 0; i < ts.length; i++) for (let j = i + 1; j < ts.length; j++) out.push(ts[i] + ' + ' + ts[j]); return out; };
const seenPairs = new Set(sameCount.flatMap((l) => pairsOf(l.tokens)));
const freshPairs = pairsOf(mine).filter((p) => !seenPairs.has(p));

console.log(`${level.name} (${level.id}) — ${sizes.join('/')} players, ${mine.length} features`);
console.log(`core tag: ${meta.core ? '`' + meta.core + '`' : '(none — add "core" to meta.json)'}`);
console.log(`features: ${mine.join(' ')}`);
console.log(`\nnew at ${sizes.join('/')} players — features (${fresh.length}): ${fresh.join(' ') || '(none)'}`);
console.log(`new at ${sizes.join('/')} players — pairings (${freshPairs.length}): ${freshPairs.slice(0, 6).join(', ')}${freshPairs.length > 6 ? ', …' : ''}`);

console.log(`\nnearest at the same player count (overlap weighted by how rare each feature is):`);
for (const l of sameCount.slice(0, 8)) {
  console.log(`  ${l.j.toFixed(2)} (raw ${l.plain.toFixed(2)})  ${l.source === 'mine' ? '*' : ' '} ${l.name} (${l.id})${l.core ? ' core=' + l.core : ''}`);
  console.log(`         shared: ${mine.filter((t) => l.tokens.includes(t)).join(' ') || '(none)'}`);
}
const crossTop = scored.filter((l) => !l.same).slice(0, 3);
if (crossTop.length) {
  console.log(`\nnearest at other player counts (never a failure, shown for context):`);
  for (const l of crossTop) console.log(`  ${l.j.toFixed(2)}  ${l.name} (${l.id})`);
}

// ---- verdict ----------------------------------------------------------------
const problems = [], warnings = [];
const worst = sameCount[0];
if (worst && worst.j >= 0.62) problems.push(`weighted feature overlap ${worst.j.toFixed(2)} with ${worst.name} — this is a rearrangement, not a new level`);
else if (worst && worst.j >= 0.45) warnings.push(`weighted feature overlap ${worst.j.toFixed(2)} with ${worst.name} — the parts are nearly the same set, so the core had better not be`);
if (fresh.length < 2 && freshPairs.length < 8) {
  problems.push(`${fresh.length} new feature(s) and ${freshPairs.length} new pairing(s) at this player count; want 2 new features, or 8 pairings no level of this count has together`);
}
if (!meta.core) problems.push('meta.json has no "core" tag');
else {
  const words = (s) => new Set(s.split('-').filter((w) => w.length > 3));
  for (const l of sameCount) {
    if (!l.core) continue;
    if (l.core === meta.core) { problems.push(`core tag "${meta.core}" is already used by ${l.name}`); continue; }
    const a = words(meta.core), b = words(l.core);
    const shared = [...a].filter((w) => b.has(w));
    if (shared.length >= 2) warnings.push(`core tag looks close to ${l.name}'s "${l.core}" (shared: ${shared.join(', ')})`);
  }
}

console.log('');
for (const w of warnings) console.log(`  ! ${w}`);
for (const p of problems) console.log(`  x ${p}`);
if (!problems.length) console.log(warnings.length ? 'REVIEW: mechanically acceptable, but read the warnings and justify the core in NOTES.md.' : 'PASS: nothing of this player count is close to it.');
else console.log('FAIL: change the design, not the description.');
process.exit(problems.length ? 1 : 0);
