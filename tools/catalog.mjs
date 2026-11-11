#!/usr/bin/env node
// Regenerate the level catalogue: catalog/LEVELS.md, catalog/MAPS.md, catalog/levels.json.
//
//   node tools/catalog.mjs
//
// Sources: catalog/campaign.json (fingerprints of the 75 built-in levels, extracted from the
// game bundle) and levels/*/ (level.json, meta.json, NOTES.md) for this repo's own levels.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const CAT = path.join(ROOT, 'catalog');
const SKIP_ENT = new Set(['gem', 'exit', 'sign', 'checkpoint']);
const SPECIAL_TILE = { '=': 'one-way', '/': 'slope', '\\': 'slope', L: 'lava', W: 'water', M: 'mud', V: 'mist', S: 'sludge' };

/** Belt and fan numbers only matter through who they stop or lift, so bucket them that way. */
const beltBand = (s) => (s < 2.6 ? 'walkable' : s < 3.2 ? 'blocks-earth' : s < 3.4 ? 'blocks-fire-water' : 'blocks-all');
const fanBand = (f) => (f < 1.2 ? 'lifts-air' : f < 1.6 ? 'hang-time' : f < 2.5 ? 'lifts-fire-water' : 'lifts-all');

/** The token set a level is compared by. Same vocabulary for campaign and own levels. */
function tokensOfOwn(level) {
  const t = new Set();
  for (const e of level.entities) {
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
  for (const ch of new Set(level.tiles.join(''))) if (SPECIAL_TILE[ch]) t.add(`tile:${SPECIAL_TILE[ch]}`);
  if (level.dark) t.add('dark');
  return [...t].sort();
}

function tokensOfCampaign(l) {
  const t = new Set();
  for (const [type, n] of Object.entries(l.entities)) if (!SKIP_ENT.has(type) && n) t.add(`ent:${type}`);
  for (const o of l.options) {
    if (o === 'latch') t.add('opt:latch');
    else if (o === 'heavy plate') t.add('opt:heavy-plate');
    else if (o.startsWith('invert(')) t.add(`opt:invert:${o.slice(7, -1)}`);
    else if (o.startsWith('required:')) t.add(`opt:${o}`);
    else if (/^seesaw range/.test(o)) t.add('opt:seesaw-range');
    else if (/^fan /.test(o)) t.add(`opt:fan:${fanBand(parseFloat(o.slice(4)))}`);
    else if (/^belt speed /.test(o)) t.add(`opt:belt:${beltBand(Math.abs(parseFloat(o.slice(11))))}`);
    else if (/ speed /.test(o)) { /* lift speeds are cosmetic */ }
    else if (/ dur /.test(o)) t.add(`opt:${o.split(' ')[0]}-timed`);
    else if (o.includes(':')) t.add(`opt:${o}`);
  }
  for (const ch of l.palette) if (SPECIAL_TILE[ch]) t.add(`tile:${SPECIAL_TILE[ch]}`);
  if (l.dark) t.add('dark');
  return [...t].sort();
}

/** The one-line idea, however that level's NOTES.md phrases it. */
function coreLine(notes) {
  const m = notes.match(/\*\*(?:Introduces|Brings together):\*\*([\s\S]+?)\n\n/)
    || notes.match(/## The insight\n\n([\s\S]+?)\n\n/);
  return m ? m[1].replace(/\s+/g, ' ').trim() : '';
}

// ---- gather -----------------------------------------------------------------
const campaign = JSON.parse(fs.readFileSync(path.join(CAT, 'campaign.json'), 'utf8'));
const mine = [];
for (const id of fs.readdirSync(path.join(ROOT, 'levels')).sort()) {
  const dir = path.join(ROOT, 'levels', id);
  if (!fs.existsSync(path.join(dir, 'level.json'))) continue;
  const level = JSON.parse(fs.readFileSync(path.join(dir, 'level.json'), 'utf8'));
  const meta = fs.existsSync(path.join(dir, 'meta.json')) ? JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8')) : {};
  const notes = fs.existsSync(path.join(dir, 'NOTES.md')) ? fs.readFileSync(path.join(dir, 'NOTES.md'), 'utf8') : '';
  mine.push({
    id, name: level.name, source: 'mine',
    sizes: [...new Set(level.supports.map((g) => g.length))].sort(),
    groups: level.supports.map((g) => g.join('+')),
    parTicks: level.parTicks ?? 3600, dark: !!level.dark,
    challenge: meta.challenge ?? '?', core: meta.core ?? '', ideas: meta.ideas ?? [], order: meta.order ?? level.order,
    line: coreLine(notes), tokens: tokensOfOwn(level),
  });
}
const camp = campaign.map((l) => ({
  id: l.id, name: l.name, source: 'campaign', order: l.order,
  sizes: [...new Set(l.supports.map((g) => g.split('+').length))].sort(),
  groups: l.supports, parTicks: l.parTicks, dark: l.dark,
  line: l.description, hints: l.hints, tokens: tokensOfCampaign(l),
}));

// ---- catalog/levels.json ----------------------------------------------------
fs.writeFileSync(path.join(CAT, 'levels.json'), JSON.stringify([...camp, ...mine], null, 1) + '\n');

// ---- catalog/LEVELS.md ------------------------------------------------------
const esc = (s) => String(s).replace(/\|/g, '\\|');
const entry = (l) => {
  const bits = [`- **${l.name}** \`${l.id}\``, `(${l.sizes.join('/')}p: ${l.groups.join(', ')})`];
  if (l.source === 'mine') bits.push(`core=\`${l.core}\``, `challenge=${l.challenge}`);
  bits.push(`par=${l.parTicks}`);
  if (l.dark) bits.push('dark');
  const out = [bits.join(' ')];
  if (l.line) out.push(`  - idea: ${esc(l.line)}`);
  if (l.ideas?.length) out.push(`  - ideas: ${l.ideas.join(', ')}`);
  if (l.hints?.length) out.push(`  - hints: ${l.hints.map(esc).join(' / ')}`);
  out.push(`  - features: ${l.tokens.join(' ')}`);
  return out.join('\n');
};

const bySize = (list, n) => list.filter((l) => l.sizes.includes(n));
let md = `# Level catalogue

Generated by \`node tools/catalog.mjs\` — do not edit by hand.

This file is written for an agent, not for players. It exists so that a new level can be checked
against every level that already exists. Read it before designing anything.

- **How to use it.** Find the section for the player count you are building for, read every entry
  in it, and make sure the level you are planning is not a rearrangement of one of them. Levels
  for *different* player counts may share an idea freely; levels for the *same* player count may
  not.
- \`idea\` is the level's one-line core: for campaign levels it is the game's own description, for
  this repo's levels it is the "Introduces"/"The insight" line from its NOTES.md.
- \`ideas\` is what the level is *about*, in the vocabulary of \`tools/ideas.mjs\`. This is what
  novelty is judged on: a new level needs an idea nobody of its player count has used, or a pairing
  of old ideas that no level of its player count has together. \`node tools/novelty.mjs <id>\`
  checks it.
- \`features\` is a normalised token set (entity types, wiring options, liquid and one-way tiles,
  darkness). It is context only — **repeating ingredients is free**, and never a reason to reject a
  level.
- \`core\` is this repo's one-line tag for the central idea; it must be unique among levels of the
  same player count.
- Campaign entries carry no map: the kit ships only four of the 75 built-in levels, so the rest
  are described here by idea, hints and feature inventory. Maps of this repo's own levels are in
  \`catalog/MAPS.md\`.
- Entity counts ignore gems, exits, signs and checkpoints — every level has those.

Totals: ${camp.length} campaign levels, ${mine.length} in this repo.

`;
for (const n of [2, 3, 4]) {
  const own = bySize(mine, n).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  md += `\n## ${n} players — this repo (${own.length})\n\n${own.map(entry).join('\n')}\n`;
  const cc = bySize(camp, n).sort((a, b) => a.order - b.order);
  md += `\n## ${n} players — campaign (${cc.length})\n\n${cc.map(entry).join('\n')}\n`;
}
fs.writeFileSync(path.join(CAT, 'LEVELS.md'), md);

// ---- catalog/MAPS.md --------------------------------------------------------
let maps = `# Maps of this repo's levels

Generated by \`node tools/catalog.mjs\` — do not edit by hand. Each block is the output of
\`node kit.mjs show <id>\`: the tile grid with a ruler, then every entity with its wiring.

`;
for (const l of mine.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))) {
  const show = execFileSync('node', ['kit.mjs', 'show', l.id], { cwd: ROOT, encoding: 'utf8' });
  maps += `\n## ${l.name} (\`${l.id}\`) — ${l.sizes.join('/')}p, core \`${l.core}\`\n\n\`\`\`\n${show.trim()}\n\`\`\`\n`;
}
fs.writeFileSync(path.join(CAT, 'MAPS.md'), maps);

console.log(`catalog: ${camp.length} campaign + ${mine.length} own levels -> LEVELS.md, MAPS.md, levels.json`);
