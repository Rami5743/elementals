import { rock, make, step, ent, P, fmt } from './h.mjs';
import { IN_RIGHT, IN_LEFT } from '../../../kit.mjs';
// seesaw at row 14, x 10..15 (w 6), range 6; shafts below/above open
const t = [];
for (let y = 0; y < 22; y++) {
  if (y === 0 || y >= 20) t.push(rock);
  else if (y >= 14) t.push('#' + '.'.repeat(8) + '#' + '.'.repeat(6) + '#' + '.'.repeat(22) + '#');
  else t.push('#' + '.'.repeat(38) + '#');
}
const ctx = make(t, [
  { id: 'ss', type: 'seesaw', x: 10, y: 14, w: 6, range: 6 },
], { fire: [3, 13], water: [4, 13], earth: [11, 13], air: [5, 13] });
const show = (tag) => { const s = ent(ctx, 'ss'); console.log(tag, JSON.stringify(s), 'earth', fmt(P(ctx, 2))); };
for (let i = 0; i < 300; i++) step(ctx, [0, 0, 0, 0]);
show('earth on left');
// earth walks to right half
for (let i = 0; i < 300; i++) step(ctx, [0, 0, IN_RIGHT, 0]);
show('earth right?');
