import { room, make, step, ent, P, fmt } from './h.mjs';
import { IN_RIGHT, IN_LEFT } from '../../../kit.mjs';
const t = room();
// lift descending at x=20..21 from row 14 to row 19 (flush w/ floor? row 19 top = 1 tile above floor)
const ctx = make(t, [
  { id: 'lift', type: 'elevator', x: 20, y: 14, w: 2, path: [[20, 14], [20, 19]], mode: 'powered' },
  { id: 'c', type: 'box', x: 21, y: 19 },
], { fire: [24, 19], water: [4, 19], earth: [6, 19], air: [8, 19] });
for (let i = 0; i < 700; i++) {
  // fire pushes box left from x=24 after tick 200
  step(ctx, [i > 200 ? IN_LEFT : 0, 0, 0, 0]);
  if (i % 50 === 0) console.log(i, 'lift', JSON.stringify(ent(ctx, 'lift')).slice(0, 80), 'box x', (ent(ctx, 'c').x / 32).toFixed(2), 'fire', fmt(P(ctx, 0)));
}
