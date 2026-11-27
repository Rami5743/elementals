import { room, make, step, ent } from './h.mjs';
const t = room();
const ctx = make(t, [
  { id: 'f1', type: 'fan', x: 12, y: 5, w: 2, h: 15, strength: 2.7 },
  { id: 'c1', type: 'box', x: 12, y: 19 },
  { id: 'f2', type: 'fan', x: 18, y: 5, w: 2, h: 15, strength: 2.7 },
  { id: 'b1', type: 'boulder', x: 18, y: 19 },
]);
console.log(Object.keys(ctx.s));
for (let i = 0; i < 200; i++) step(ctx, [0, 0, 0, 0]);
console.log(JSON.stringify(ent(ctx, 'c1')), JSON.stringify(ent(ctx, 'b1')));
