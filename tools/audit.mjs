#!/usr/bin/env node
// Which levels are corridors? Reports, per level, the things the difficulty bar is made of:
// how long the recorded solution runs, how many element barriers carry the necessity, whether the
// design records an interlock, and how many ideas it is built from.
//
//   node tools/audit.mjs            # every level
//   node tools/audit.mjs --fast     # skip the solve times (static checks only)
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const fast = process.argv.includes('--fast');
const BARRIER = new Set(['ice', 'firewall', 'cracked', 'turbine']);
const rows = [];

for (const id of fs.readdirSync(path.join(ROOT, 'levels')).sort()) {
  const dir = path.join(ROOT, 'levels', id);
  if (!fs.existsSync(path.join(dir, 'level.json'))) continue;
  const level = JSON.parse(fs.readFileSync(path.join(dir, 'level.json'), 'utf8'));
  const meta = fs.existsSync(path.join(dir, 'meta.json')) ? JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8')) : {};
  const barriers = level.entities.filter((e) => BARRIER.has(e.type)).length;
  const ideas = meta.ideas ?? [];
  const interlock = ideas.some((i) => i.startsWith('twist-')) || /interlock|strand|shuts behind|un-press|take[sn]? the weight/i.test(
    fs.existsSync(path.join(dir, 'NOTES.md')) ? fs.readFileSync(path.join(dir, 'NOTES.md'), 'utf8') : '');
  let secs = null;
  if (!fast) {
    const out = execFileSync('node', ['kit.mjs', 'check', id], { cwd: ROOT, encoding: 'utf8' });
    const m = out.match(/solved in ([\d.]+) s/);
    secs = m ? Number(m[1]) : null;
  }
  const players = level.supports[0].length;
  const fails = [];
  if (secs !== null && secs < 20) fails.push(`${secs}s`);
  if (barriers > 1) fails.push(`${barriers} barriers`);
  if (!interlock) fails.push('no interlock');
  if (ideas.length < 2) fails.push('one idea');
  rows.push({ id, players, challenge: meta.challenge ?? '?', secs, barriers, interlock, ideas, fails });
}

rows.sort((a, b) => b.fails.length - a.fails.length || (a.secs ?? 0) - (b.secs ?? 0));
for (const r of rows) {
  const mark = r.fails.length >= 3 ? 'REBUILD' : r.fails.length === 2 ? 'weak   ' : r.fails.length === 1 ? 'thin   ' : 'ok     ';
  console.log(`${mark} ${r.id.padEnd(15)} ${r.players}p ${String(r.secs ?? '?').padStart(5)}s  ${String(r.barriers).padStart(2)} barrier(s)  ${r.interlock ? 'interlock' : '         '}  ${r.fails.join(', ')}`);
}
console.log(`\n${rows.filter((r) => r.fails.length >= 3).length} to rebuild, ${rows.filter((r) => r.fails.length === 2).length} weak, ${rows.filter((r) => r.fails.length === 1).length} thin, ${rows.filter((r) => !r.fails.length).length} clear.`);
console.log('A level fails on: a solution under 20 s, more than one element barrier, no interlock recorded, or a single idea.');
