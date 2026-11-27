import { room, make, step, P, fmt } from './h.mjs';
import { IN_JUMP } from '../../../kit.mjs';
const t = room();
const E = ['fire', 'water', 'earth', 'air'];
for (const rider of ['none', 'fire', 'earth']) {
  const sp = { fire: [2, 19], water: [4, 19], earth: [6, 19], air: [20, 19] };
  if (rider !== 'none') sp[rider] = [20, 18];
  const ctx = make(t, [], sp);
  for (let i = 0; i < 40; i++) step(ctx, [0, 0, 0, 0]);
  let minY = 1e9;
  for (let i = 0; i < 120; i++) {
    const inp = [0, 0, 0, 0]; inp[3] = i < 30 ? IN_JUMP : 0;
    step(ctx, inp);
    minY = Math.min(minY, P(ctx, 3).y + 28);
  }
  console.log(rider, 'air feet apex rise tiles', ((640 - minY) / 32).toFixed(2), rider !== 'none' ? fmt(P(ctx, E.indexOf(rider))) : '');
}
