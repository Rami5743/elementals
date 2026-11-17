import { IN_LEFT, IN_RIGHT, IN_JUMP, TILE, go, until, interact, wait, waitFlag } from '../../kit.mjs';

// A hopping walk: the hall has two buffer stops and a boulder to get over.
function* bound(c, x, max = 1200) {
  const goal = x * TILE + TILE / 2;
  let h = 0;
  for (let t = 0; t < max; t++) {
    const d = goal - c.cx;
    if (Math.abs(d) < 10 && c.me.grounded === 1) return;
    if (c.me.grounded === 1) h = 14;
    yield (d > 0 ? IN_RIGHT : IN_LEFT) | (h-- > 0 ? IN_JUMP : 0);
  }
  throw new Error(`${c.me.element} could not bound to ${x} (at ${c.tx.toFixed(1)})`);
}

// Step into an updraft, let it carry you to the top of the shaft, then steer out onto the gallery.
function* ride(c, intoDir, inTx, topRow, outDir, landTx) {
  yield* until(c, () => (intoDir === IN_RIGHT ? c.tx >= inTx : c.tx <= inTx), intoDir, 400, 'step into the draught');
  let h = 0, t = 0;
  for (; t < 1800 && c.me.y > topRow * TILE; t++) {
    if (c.me.grounded === 1) h = 14;
    yield h-- > 0 ? IN_JUMP : 0;
  }
  if (t >= 1800) throw new Error(`${c.me.element} could not rise up the shaft (at ${c.me.y / TILE})`);
  yield* until(c, () => c.me.grounded === 1 && Math.abs(c.tx - landTx) < 2.2, outDir, 900, 'step out of the draught');
}

// Settle precisely into your own doorway.
function* enter(c, x) {
  const goal = x * TILE + TILE / 2;
  for (let t = 0; t < 900; t++) {
    if (c.me.inDoor === 1) return;
    const d = goal - c.cx;
    yield Math.abs(d) < 2 ? 0 : (d > 0 ? IN_RIGHT : IN_LEFT);
  }
  throw new Error(`${c.me.element} could not settle into its door at ${x}`);
}

const stoneWest = (c) => c.ent('plate_west').s.on === 1;
const stoneEast = (c) => c.ent('plate_east').s.on === 1;
const gatesOpen = (c) => c.ent('door_w').s.open >= 92 && c.ent('door_e').s.open >= 92;

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  // Stand on the freeze pad: the ford stays ice for as long as Water is on it.
  yield* bound(c, 10);
  yield* until(c, () => c.ent('pool').s.on === 1, 0, 300, 'the ford to freeze');
  c.flag('ford');
  // Hold the ford open until Fire is across and the torch is lit, and until the stone
  // has been shunted to the west buffer, which is what starts the draught.
  yield* until(c, () => c.has('torch') && stoneWest(c), 0, 3000, 'the torch and the west buffer');
  yield* bound(c, 6);          // the gem, mid-ford
  yield* ride(c, IN_LEFT, 4.0, 10.6, IN_RIGHT, 6);
  yield* go(c, 14);
  c.flag('water_up');
  yield* until(c, () => gatesOpen(c), 0, 3000, 'the gates');
  yield* enter(c, 19);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'ford');
  yield* bound(c, 1);                       // crossing the ice lights the torch at the wall
  yield* until(c, () => c.ent('torch').s.on === 1, 0, 120, 'the torch to catch');
  yield* wait(c, 4);
  yield* until(c, () => c.ent('gem_15').s.gone === 1, IN_JUMP, 90, 'the fire gem');
  c.flag('torch');
  yield* waitFlag(c, 'water_up');
  yield* ride(c, IN_RIGHT, 3.0, 10.6, IN_RIGHT, 6);
  yield* go(c, 13);
  c.flag('fire_up');
  yield* until(c, () => gatesOpen(c), 0, 3000, 'the gates');
  yield* enter(c, 18);
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* bound(c, 34);
  yield* until(c, () => c.ent('gem_17').s.gone === 1, IN_JUMP, 120, 'the air gem');
  yield* interact(c);                        // shunt the stone to the west buffer
  yield* until(c, () => stoneWest(c), 0, 1500, 'the stone to reach the west buffer');
  yield* waitFlag(c, 'fire_up');
  yield* interact(c);                        // and send it back: both gates want it east
  yield* until(c, () => stoneEast(c), 0, 1500, 'the stone to reach the east buffer');
  yield* ride(c, IN_RIGHT, 38.3, 10.6, IN_LEFT, 37);
  yield* enter(c, 20);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'backshunt',
  sets: [{ elements: ['fire', 'water', 'air'], scripts: { fire, water, air } }],
  roles: {
    'fire,water,air': {
      fire: 'Crosses the frozen ford and lights the torch at the dead end — one of the two things both gates want.',
      water: 'Holds the ford frozen so Fire can cross, then rides the west draught up.',
      air: 'Works the shunt lever at both ends of the level, and is the only one the weak east draught will lift.',
    },
  },
};
