import { rock, make, step, P, fmt } from './h.mjs';
import { IN_RIGHT, IN_JUMP, TILE } from '../../../kit.mjs';
// ledge top at row 8 (x 1..8), floor at row 20 everywhere
const t = [];
for (let y = 0; y < 22; y++) {
  if (y === 0 || y >= 20) t.push(rock);
  else if (y >= 8) t.push('#'.repeat(9) + '.'.repeat(30) + '#');
  else t.push('#' + '.'.repeat(38) + '#');
}
const riders = process.argv[2] ? process.argv[2].split(',') : [];
const ELS = ['fire', 'water', 'earth', 'air'];
const spawns = { fire: [1, 19], water: [2, 19], earth: [3, 19], air: [5, 7] };
// put riders on air's head
for (const r of riders) spawns[r] = [5, 6];
if (riders.length === 0) { spawns.fire = [12, 19]; }
const ctx = make(t, [], spawns);
const ai = 3;
const holdJ = process.argv[3] !== 'nojump';
// settle
for (let i = 0; i < 40; i++) step(ctx, [0, 0, 0, 0]);
console.log('start air', fmt(P(ctx, ai)), riders.map((r) => r + ' ' + fmt(P(ctx, ELS.indexOf(r)))).join(' | '));
// air walks right from x=5 off the ledge edge at x=9, holding jump while falling (glide) but first a jump
let landed = -1;
for (let i = 0; i < 600; i++) {
  const air = P(ctx, ai);
  const inp = [0, 0, 0, 0];
  inp[ai] = IN_RIGHT | (holdJ && (i < 20 || air.vy > 0) ? IN_JUMP : 0);
  // riders steer to stay on: hold right too
  for (const r of riders) inp[ELS.indexOf(r)] = IN_RIGHT;
  step(ctx, inp);
  if (i > 5 && P(ctx, ai).grounded && P(ctx, ai).y > 9 * TILE) { landed = i; break; }
}
console.log('landed t', landed, 'air', fmt(P(ctx, ai)), riders.map((r) => r + ' ' + fmt(P(ctx, ELS.indexOf(r)))).join(' | '));
