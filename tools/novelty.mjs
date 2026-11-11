#!/usr/bin/env node
// Is this level's IDEA new for its player count?
//
// Ingredients are not the test: two levels may use the same ice walls, turbines and cracked floors
// all day. What has to be new is the idea, or — if every idea in it has been used before — the
// combination of them.
//
//   node tools/novelty.mjs <id>            # a level in levels/
//   node tools/novelty.mjs <path.json>     # a draft level file
//
// Prints the nearest levels by feature overlap, the features that are new at this player count,
// and a verdict. Overlap with a level for a *different* player count is reported but never fails:
// a 2-player level may reuse a 3-player level's idea.
import fs from 'node:fs';
import path from 'node:path';
import { IDEAS } from './ideas.mjs';

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
const myIdeas = meta.ideas ?? [];
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

// ideas, and combinations of ideas, that no level of this player count has used
const pairsOf = (ts) => { const s = [...ts].sort(), out = []; for (let i = 0; i < s.length; i++) for (let j = i + 1; j < s.length; j++) out.push(s[i] + ' + ' + s[j]); return out; };
const ideasHere = sameCount.filter((l) => l.ideas?.length);
const seenIdeas = new Set(ideasHere.flatMap((l) => l.ideas));
const seenIdeaPairs = new Set(ideasHere.flatMap((l) => pairsOf(l.ideas)));
const newIdeas = myIdeas.filter((i) => !seenIdeas.has(i));
const newIdeaPairs = pairsOf(myIdeas).filter((p) => !seenIdeaPairs.has(p));
const coined = myIdeas.filter((i) => !IDEAS[i]);
const contains = ideasHere.filter((l) => myIdeas.length && myIdeas.every((i) => l.ideas.includes(i)));

console.log(`${level.name} (${level.id}) — ${sizes.join('/')} players, ${mine.length} features`);
console.log(`core tag: ${meta.core ? '`' + meta.core + '`' : '(none — add "core" to meta.json)'}`);
console.log(`ideas:    ${myIdeas.join(', ') || '(none — add "ideas" to meta.json)'}`);
console.log(`features: ${mine.join(' ')}   (context only — repeating ingredients is free)`);
console.log(`\nideas new at ${sizes.join('/')} players (${newIdeas.length}): ${newIdeas.join(', ') || '(none)'}`);
console.log(`idea pairings new at ${sizes.join('/')} players (${newIdeaPairs.length}): ${newIdeaPairs.join(', ') || '(none)'}`);
if (coined.length) console.log(`coined here, in no other level anywhere: ${coined.join(', ')}  (add them to tools/ideas.mjs)`);

console.log(`\nlevels at the same player count that share an idea:`);
const sharers = sameCount.filter((l) => l.ideas?.some((i) => myIdeas.includes(i)));
for (const l of sharers) console.log(`  ${l.name} (${l.id}) core=${l.core} — shares: ${l.ideas.filter((i) => myIdeas.includes(i)).join(', ')}`);
if (!sharers.length) console.log('  (none — every idea in this level is new at this player count)');

console.log(`\nnearest by ingredients, for context only — never a reason to fail:`);
for (const l of sameCount.slice(0, 4)) {
  console.log(`  ${l.j.toFixed(2)} (raw ${l.plain.toFixed(2)})  ${l.source === 'mine' ? '*' : ' '} ${l.name} (${l.id})${l.core ? ' core=' + l.core : ''}`);
}
const crossTop = scored.filter((l) => !l.same).slice(0, 3);
if (crossTop.length) {
  console.log(`\nnearest at other player counts (never a failure, shown for context):`);
  for (const l of crossTop) console.log(`  ${l.j.toFixed(2)}  ${l.name} (${l.id})`);
}

// ---- verdict ----------------------------------------------------------------
const problems = [], warnings = [];
const worst = sameCount[0];
if (worst && worst.plain >= 0.9) warnings.push(`built from almost exactly ${worst.name}'s parts (${worst.plain.toFixed(2)}) — fine in itself, but make sure the idea really is somewhere else`);
if (!myIdeas.length) problems.push('meta.json has no "ideas" list — name the ideas this level is built from');
else {
  for (const l of contains) problems.push(`every idea in this level is already in ${l.name} (${l.ideas.join(', ')}) — it brings nothing new`);
  if (!contains.length && !newIdeas.length && !newIdeaPairs.length) {
    problems.push('no new idea at this player count, and no pairing of ideas that some level here does not already have together');
  }
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
if (problems.length) {
  console.log('FAIL: change the idea or its combination — not the wording.');
} else {
  // Three ways to clear the gate, in the order they are worth having.
  const tier = coined.length
    ? `PASS (invented): ${coined.join(', ')} — an idea no level anywhere has used. This is what to aim for.`
    : newIdeas.length
      ? `PASS (new here): ${newIdeas.join(', ')} — already in the vocabulary, but no ${sizes.join('/')}-player level had used it.`
      : `PASS (recycled): nothing new, only a combination no ${sizes.join('/')}-player level has together (${newIdeaPairs.slice(0, 3).join('; ')}). This is the fallback, not the target — say in NOTES.md what you tried to invent first and why it did not work.`;
  console.log(tier);
  if (warnings.length) console.log('Read the warnings above and justify the core in NOTES.md.');
}
process.exit(problems.length ? 1 : 0);
