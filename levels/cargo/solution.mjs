// Cargo: a belt too fast to walk against. Air decides which way it runs.
import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, pound, until, wait, waitFlag } from '../../kit.mjs';
import { clear, pushTo } from '../_lib.mjs';

/** Walk toward tile `x`, hopping, so a partner in the corridor is no obstacle. */
function* bound(c, x, hold = 14, max = 900) {
  const goal = x * TILE + TILE / 2;
  let h = 0;
  for (let t = 0; t < max; t++) {
    const d = goal - c.cx;
    if (Math.abs(d) < 10 && c.me.grounded === 1) return;
    if (c.me.grounded === 1) h = hold;
    yield (d > 0 ? IN_RIGHT : IN_LEFT) | (h-- > 0 ? IN_JUMP : 0);
  }
  throw new Error(`${c.me.element} could not bound to ${x} (at ${c.tx.toFixed(1)})`);
}

/** Step onto the belt: the roof is one tile high here, so nobody jumps aboard. */
function* board(c, max = 300) {
  yield* until(c, () => c.cx >= 11.4 * TILE, IN_RIGHT, max, 'the belt');
}

/** Ride the belt to the hatch at tile `hole`, then jump up through it and step aside. */
function* ride(c, hole, home, lead = 18, max = 900) {
  const trip = hole * TILE + lead;
  yield* until(c, () => c.cx >= trip, 0, max, `the belt to reach ${hole}`);
  for (let t = 0; t < 16; t++) yield IN_JUMP | IN_RIGHT;  // up through the hatch and over onto the floor
  yield* until(c, () => c.me.grounded === 1 && c.bottom <= 15 * TILE, IN_RIGHT, 150, 'the alcove floor');
  yield* go(c, home);
}

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* pushTo(c, 'rock_1', 6);                         // the boulder onto the heavy plate
  yield* until(c, () => c.ent('weigh').s.on === 1, 0, 300, 'the cargo onto the plate');
  c.flag('cargo');
  yield* waitFlag(c, 'water_home');
  yield* bound(c, 8);                                    // over the boulder
  yield* board(c);
  yield* ride(c, 27, 30);
  c.flag('earth_home');
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* clear(c, 'icewall');
  c.flag('ice_out');
  yield* waitFlag(c, 'driving');
  yield* waitFlag(c, 'flames_out');
  yield* board(c);
  yield* ride(c, 15, 18);
  c.flag('fire_home');
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* waitFlag(c, 'ice_out');
  yield* bound(c, 9);
  yield* clear(c, 'flames');
  yield* go(c, 7);                                       // back out of the loading corridor
  c.flag('flames_out');
  yield* waitFlag(c, 'fire_home');
  yield* board(c);
  yield* ride(c, 21, 24);
  c.flag('water_home');
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* waitFlag(c, 'cargo');
  yield* go(c, 1);                                       // on the turbine: the belt runs right
  c.flag('driving');
  yield* waitFlag(c, 'earth_home');
  yield* go(c, 3);
  for (let t = 0; t < 24; t++) yield IN_JUMP;            // up its own shaft
  yield* until(c, () => c.bottom <= 14 * TILE, IN_RIGHT, 120, 'the air alcove');
  yield* go(c, 4);
  yield* wait(c, 120);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'cargo',
  sets: [{ elements: ['fire', 'water', 'earth', 'air'], scripts: { fire, water, earth, air } }],
  roles: {
    'air,earth,fire,water': {
      earth: 'The only one who can shift the boulder onto the heavy plate that unlocks the three hatches.',
      fire: 'Melts the ice that shuts the loading corridor.',
      water: 'Puts out the flames behind the ice.',
      air: 'Stands on the turbine: the belt only runs toward the alcoves while Air drives it.',
    },
  },
};
