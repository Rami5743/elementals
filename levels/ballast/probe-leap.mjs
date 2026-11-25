// Probe: the leap off the pan into the draught. Run: node levels/ballast/probe-leap.mjs [holdTicks]
import { readFileSync } from 'node:fs';
import { buildWorld, createState, stepGame, TILE, IN_RIGHT, IN_JUMP } from '../../kit.mjs';

const level = JSON.parse(readFileSync(new URL('./level.json', import.meta.url), 'utf8'));
const hold = Number(process.argv[2] ?? 22);
const set = ['water', 'earth'];
const world = buildWorld(level, set);
const iRope = world.ents.findIndex((e) => (e.def?.id ?? e.id) === 'rope');
const iGate = world.ents.findIndex((e) => (e.def?.id ?? e.id) === 'gate');
let s = createState(world);

// Put Water on the pan and Earth on the bellows, then let the pan sink.
s = structuredClone(s);
s.players[0].x = 4 * TILE + 5;
s.players[0].y = 6 * TILE - 30;
s.players[1].x = 20 * TILE + 8;

let k = 0;
while (Number(s.ents[iRope].d) < 9 * TILE - 2 && k < 600) { s = stepGame(world, s, [0, 0]); k++; }
while (Number(s.ents[iGate].open) < 128 && k < 700) { s = stepGame(world, s, [0, 0]); k++; }
const p = s.players[0];
console.log(`settled at k=${k}: water(${(p.x / TILE).toFixed(2)},${(p.y / TILE).toFixed(2)}) gr=${p.grounded}`
  + ` vy=${p.vy?.toFixed?.(2)} rope.d=${Number(s.ents[iRope].d)} gate.open=${Number(s.ents[iGate].open)}`);

for (let j = 0; j < 140; j++) {
  const bits = IN_RIGHT | (j < hold ? IN_JUMP : 0);
  s = stepGame(world, s, [bits, 0]);
  const q = s.players[0];
  if (j < 30 || j % 10 === 0)
    console.log(`j${j} water(${(q.x / TILE).toFixed(2)},${(q.y / TILE).toFixed(2)}) gr=${q.grounded}`
      + ` vy=${Number(q.vy).toFixed(2)} vx=${Number(q.vx).toFixed(2)} rope.d=${Number(s.ents[iRope].d)}`);
}
