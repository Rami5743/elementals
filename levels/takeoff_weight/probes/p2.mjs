import { room, make, step, ent, P, fmt } from './h.mjs';
import { IN_RIGHT, IN_LEFT } from '../../../kit.mjs';
const t = room();
// lift going down from y=12 to y=19 at x=10, fire stands at x=10 under it
const ctx = make(t, [
  { id: 'lift', type: 'elevator', x: 10, y: 12, w: 2, path: [[10, 12], [10, 19]], mode: 'powered' },
  { id: 'lift2', type: 'elevator', x: 20, y: 12, w: 2, path: [[20, 12], [20, 19]], mode: 'powered' },
  { id: 'c', type: 'box', x: 20, y: 18 },
], { fire: [10, 19], water: [4, 19], earth: [6, 19], air: [8, 19] });
for (let i = 0; i < 400; i++) {
  step(ctx, [i > 300 ? IN_LEFT : 0, 0, 0, 0]);
  if (i % 50 === 0) console.log(i, 'lift y', (ent(ctx, 'lift').y / 32).toFixed(2), 'd', ent(ctx, 'lift').d, 'fire', fmt(P(ctx, 0)), 'lift2', (ent(ctx, 'lift2').y / 32).toFixed(2));
}
for (let i = 0; i < 300; i++) step(ctx, [0, 0, 0, 0]);
console.log('end lift y', (ent(ctx, 'lift').y / 32).toFixed(2), JSON.stringify(ent(ctx, 'lift')), 'fire', fmt(P(ctx, 0)));
console.log('lift2', JSON.stringify(ent(ctx, 'lift2')), 'box', JSON.stringify(ent(ctx, 'c')));
