// Probe: what does the rope actually weigh? Run: node levels/ballast/probe-rope.mjs [w2]
import { readFileSync } from 'node:fs';
import { buildWorld, createState, stepGame, TILE } from '../../kit.mjs';

const level = JSON.parse(readFileSync(new URL('./level.json', import.meta.url), 'utf8'));
const w2 = process.argv[2] ? Number(process.argv[2]) : null;
if (w2 !== null) level.entities.find((e) => e.id === 'rope').weights = [0, w2];
const dropStone = process.argv[3] === 'nostone';
if (dropStone) level.entities = level.entities.filter((e) => e.id !== 'stone');

const set = ['water', 'earth'];
const world = buildWorld(level, set);
const iRope = world.ents.findIndex((e) => (e.def?.id ?? e.id) === 'rope');
const iStone = world.ents.findIndex((e) => (e.def?.id ?? e.id) === 'stone');
let s = createState(world);

// Teleport Water onto the pan at tile 4, feet on the platform (row 6 top).
s = structuredClone(s);
s.players[0].x = 4 * TILE + 5;
s.players[0].y = 6 * TILE - 30;

const row = (k) => {
  const r = s.ents[iRope];
  const st = iStone >= 0 ? s.ents[iStone] : null;
  return `${k} water(${(s.players[0].x / TILE).toFixed(2)},${(s.players[0].y / TILE).toFixed(2)})`
    + ` gr=${s.players[0].grounded} | rope d=${Number(r.d).toFixed(0)} y2=${(r.y / TILE).toFixed(2)}`
    + (st ? ` stone(${(st.x / TILE).toFixed(2)},${(st.y / TILE).toFixed(2)})` : '');
};
console.log('weights', JSON.stringify(world.ents[iRope].def?.weights ?? level.entities.find(e => e.id === 'rope').weights), dropStone ? '(no stone)' : '');
console.log(row(0));
for (let k = 1; k <= 300; k++) {
  s = stepGame(world, s, [0, 0]);
  if (k % 50 === 0) console.log(row(k));
}
