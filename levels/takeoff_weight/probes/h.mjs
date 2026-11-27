// probe harness: build a world from rows + entities, step with scripted inputs
import { buildWorld, createState, stepGame, validateLevel, TILE } from '../../../kit.mjs';
export const rock = '#'.repeat(40);
export function room() {
  const t = [];
  for (let y = 0; y < 22; y++) t.push(y === 0 || y >= 20 ? rock : '#' + '.'.repeat(38) + '#');
  return t;
}
export const ELS = ['fire', 'water', 'earth', 'air'];
export function make(tiles, entities, spawns) {
  const lvl = {
    id: 'probe', name: 'P', order: 1, supports: [ELS], tiles,
    spawns: spawns ?? { fire: [2, 19], water: [4, 19], earth: [6, 19], air: [8, 19] },
    entities: [...entities,
      { type: 'exit', element: 'fire', x: 34, y: 18 }, { type: 'exit', element: 'water', x: 35, y: 18 },
      { type: 'exit', element: 'earth', x: 36, y: 18 }, { type: 'exit', element: 'air', x: 37, y: 18 }],
  };
  const v = validateLevel(lvl);
  if (v && (v.length || v.errors?.length)) console.log('validate:', JSON.stringify(v));
  const w = buildWorld(lvl, ELS);
  return { w, s: createState(w), lvl };
}
export function step(ctx, inputs) { ctx.s = stepGame(ctx.w, ctx.s, inputs); }
export function ent(ctx, id) {
  const i = ctx.lvl.entities.findIndex((e) => e.id === id);
  return ctx.s.ents?.[i] ?? ctx.s.entities?.[i];
}
export const P = (ctx, i) => ctx.s.players[i];
export const fmt = (p) => `x=${(p.x / TILE).toFixed(2)} y=${(p.y / TILE).toFixed(2)} g=${p.grounded}${p.dead ? ' DEAD' : ''}`;
