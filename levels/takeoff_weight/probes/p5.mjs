import { room, make, step, ent, P, fmt } from './h.mjs';
const t = room();
// Fire stands at x=10; Earth on Fire's head. A heavy plate at row 18 (Earth's body row when on Fire's head) x=10
// a light plate at row 18 x=20 over Water with Air on its head.
const ctx = make(t, [
  { id: 'hp', type: 'plate', x: 10, y: 18, weight: 'heavy', targets: ['d1'] },
  { id: 'lp', type: 'plate', x: 20, y: 18, targets: ['d2'] },
  { id: 'lp2', type: 'plate', x: 30, y: 18, targets: ['d3'] },
  { id: 'd1', type: 'door', x: 2, y: 2, h: 2 },
  { id: 'd2', type: 'door', x: 4, y: 2, h: 2 },
  { id: 'd3', type: 'door', x: 6, y: 2, h: 2 },
], { fire: [10, 19], earth: [10, 17], water: [20, 19], air: [20, 17] });
for (let i = 0; i < 60; i++) step(ctx, [0, 0, 0, 0]);
const E = ['fire', 'water', 'earth', 'air'];
E.forEach((e, i) => console.log(e, fmt(P(ctx, i)), 'ride', P(ctx, i).ride));
console.log('heavy plate (earth riding fire):', ent(ctx, 'hp').on, ' light plate (air riding water):', ent(ctx, 'lp').on);
