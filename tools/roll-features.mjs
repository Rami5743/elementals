#!/usr/bin/env node
// Roll a starting point for a new level: an idea to build on, a twist, and some ingredients.
//
//   node tools/roll-features.mjs 3            # three-player level
//   node tools/roll-features.mjs 4 --seed 17  # reproducible roll
//
// The target is always to INVENT an idea that is not in tools/ideas.mjs at all. The rolled IDEA
// and TWIST are the fallback for when nothing comes, drawn with a bias away from whatever this
// player count has already used. The SUPPORTS and TERRAIN are only ingredients: repeating those is
// free, and they are rolled purely to stop the same four props being reached for every time.
import fs from 'node:fs';
import path from 'node:path';
import { IDEAS, SUPPORTS, TERRAIN } from './ideas.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const players = Number(process.argv[2]);
if (![2, 3, 4].includes(players)) { console.error('usage: node tools/roll-features.mjs <2|3|4> [--seed N]'); process.exit(2); }
const seedArg = process.argv.indexOf('--seed');
let seed = seedArg > 0 ? Number(process.argv[seedArg + 1]) : (Date.now() ^ (Math.random() * 1e9)) >>> 0;
const shown = seed >>> 0;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);

const catalogue = JSON.parse(fs.readFileSync(path.join(ROOT, 'catalog', 'levels.json'), 'utf8'));
const here = catalogue.filter((l) => l.sizes.includes(players));
const mineHere = here.filter((l) => l.source === 'mine');
const ideaUses = (key) => mineHere.filter((l) => (l.ideas ?? []).includes(key)).length;

function draw(pool, n) {
  const out = [];
  const rest = [...pool];
  for (let k = 0; k < n && rest.length; k++) {
    const weights = rest.map((p) => 1 / (1 + p.n));
    const total = weights.reduce((a, b) => a + b, 0);
    let r = rnd() * total, i = 0;
    while (r > weights[i] && i < rest.length - 1) r -= weights[i++];
    out.push(rest.splice(i, 1)[0]);
  }
  return out;
}

const ideaPool = (kind) => Object.entries(IDEAS).filter(([, v]) => v.kind === kind)
  .map(([key, v]) => ({ key, note: v.note, n: ideaUses(key) }));
const plain = (table) => table.map(([key, , note]) => ({ key, note, n: 0 }));

const spine = draw(ideaPool('spine'), 1);
const twist = draw(ideaPool('twist'), 1);
const supports = draw(plain(SUPPORTS), 2);
const terrain = draw(plain(TERRAIN), 1);

const line = (label, it, withTally) => {
  const tally = withTally ? (it.n ? `  (${it.n} level(s) at ${players}p already built on it)` : '  (unused at this player count)') : '';
  console.log(`${label.padEnd(9)} ${it.key}${tally}\n          ${it.note}`);
};

console.log(`roll for a ${players}-player level  (seed ${shown}; ${mineHere.length} of this repo's levels play at ${players})\n`);
console.log(`--- first, try to invent ---
          Before taking the roll, spend a minute on the question it cannot answer: what could this
          level be about that no key in tools/ideas.mjs describes? Something the simulation does
          that nobody has built on yet. An invented idea is the best outcome every time; the roll
          below is the fallback for when nothing comes.\n`);
console.log('--- fallback: build on this ---');
for (const it of spine) line('IDEA', it, true);
for (const it of twist) line('TWIST', it, true);
console.log('\n--- ingredients: free to repeat, rolled only for variety ---');
for (const it of supports) line('SUPPORT', it, false);
for (const it of terrain) line('TERRAIN', it, false);

console.log(`\nideas already used at ${players} players:`);
const used = new Map();
for (const l of mineHere) for (const i of l.ideas ?? []) used.set(i, [...(used.get(i) ?? []), l.name]);
for (const [k, names] of [...used].sort()) console.log(`  ${k.padEnd(28)} ${names.join(', ')}`);

console.log(`\ncores already taken at ${players} players:`);
for (const l of mineHere) console.log(`  ${l.core ?? '?'}  (${(l.ideas ?? []).join(' + ')})`);

console.log(`
Re-roll as often as you like. In order of what is worth having: an idea invented here and added to
tools/ideas.mjs; an idea no level of this player count has used; and, only if neither comes, a
pairing of old ideas that no level of this player count has together. node tools/novelty.mjs <id>
says which of the three you ended up with.`);
