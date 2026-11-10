import { IN_INTERACT, IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, run, until, waitFlag } from '../../kit.mjs';
import { hop } from '../_lib.mjs';

const BELOW = 20 * TILE;

/** Through the gate and down the hole beyond it, before the five seconds are up. */
function* throughAndDown(c) {
  yield* run(c, 24);
  yield* go(c, 25);
  yield* until(c, () => c.me.grounded === 1 && c.bottom === BELOW, 0, 300, 'down into the lower hall');
}

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* go(c, 13);
  yield* hop(c);                                     // the air gem, four tiles up
  yield* go(c, 10);
  c.flag('air_set');
  yield* waitFlag(c, 'water_set');
  yield* waitFlag(c, 'earth_set');
  for (let t = 0; t < 60; t++) {                     // jump into the button and press it
    yield IN_JUMP | (t >= 10 && t % 2 === 0 ? IN_INTERACT : 0);
    if (c.ent('knob').s.on === 1) break;
  }
  c.flag('pressed');
  yield* until(c, () => c.me.grounded === 1 && c.bottom === BELOW, 0, 400, 'down through the trapdoor');
  yield* waitFlag(c, 'earth_home');
  yield* go(c, 32);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 6);
  yield* hop(c);                                     // the water gem
  yield* go(c, 18);
  c.flag('water_set');
  yield* waitFlag(c, 'pressed');
  yield* throughAndDown(c);
  yield* go(c, 27);
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_RIGHT, 900, 'the flames to go out');
  c.flag('flames_out');
  yield* waitFlag(c, 'plate_on');
  yield* go(c, 36);
  c.flag('water_home');
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* go(c, 16);
  yield* hop(c);                                     // the earth gem
  yield* go(c, 17);
  c.flag('earth_set');
  yield* waitFlag(c, 'pressed');
  yield* throughAndDown(c);
  yield* go(c, 23.4);                                // round to the far side of the boulder
  yield* until(c, () => c.ent('weigh').s.on === 1, IN_LEFT, 2500, 'the boulder onto the heavy plate');
  c.flag('plate_on');
  yield* waitFlag(c, 'water_home');
  yield* go(c, 34);
  c.flag('earth_home');
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'the_drop',
  sets: [{ elements: ['water', 'earth', 'air'], scripts: { water, earth, air } }],
  roles: {
    'air,earth,water': {
      air: 'The only one who can reach the button, and the one it drops.',
      water: 'Runs the gate and puts out the flames below.',
      earth: 'Runs the gate and rolls the boulder onto the heavy plate.',
    },
  },
};
