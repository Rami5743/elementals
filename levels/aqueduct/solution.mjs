import { IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, interact, until, waitFlag } from '../../kit.mjs';
import { climbAboard, hop } from '../_lib.mjs';

const LOFT = 8 * TILE;
const liftY = (c) => c.ent('lift').s.y;

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 9.2);
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_LEFT, 900, 'the flames to go out');
  yield* go(c, 6);
  yield* hop(c);                                   // the water gem
  yield* go(c, 4.5);                               // the plate: the updraft starts
  c.flag('fan_on');
  yield* waitFlag(c, 'landed');
  yield* go(c, 23);                                // onto the lift and wait for the lever
  c.flag('water_aboard');
  yield* until(c, () => liftY(c) <= LOFT, 0, 2500, 'the lift to reach the loft');
  yield* go(c, 35);
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* go(c, 15);
  c.flag('ready');
  yield* waitFlag(c, 'aboard');
  yield* waitFlag(c, 'fan_on');
  yield* until(c, () => c.cx > 18 * TILE, IN_RIGHT, 300, 'into the updraft');
  yield* until(c, () => c.me.y < 6 * TILE, 0, 6000, 'up the shaft');
  yield* until(c, () => c.cx > 21 * TILE, IN_RIGHT, 400, 'out of the updraft');
  yield* until(c, () => c.me.grounded === 1 && c.bottom === LOFT, 0, 400, 'down on the loft');
  c.flag('landed');
  yield* go(c, 20);
  yield* hop(c);                                   // the air gem
  yield* waitFlag(c, 'ice_out');
  yield* go(c, 37);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'ready');
  yield* go(c, 13.6);
  yield* climbAboard(c, 'air');
  c.flag('aboard');
  yield* waitFlag(c, 'landed');
  yield* go(c, 26);
  yield* hop(c);                                   // the fire gem
  yield* until(c, () => c.ent('ice').s.gone === 1, IN_RIGHT, 900, 'the ice to melt');
  c.flag('ice_out');
  yield* go(c, 31);
  yield* waitFlag(c, 'water_aboard');
  yield* interact(c);                              // the lever calls the lift
  yield* go(c, 33);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'aqueduct',
  sets: [{ elements: ['fire', 'water', 'air'], scripts: { fire, water, air } }],
  roles: {
    'air,fire,water': {
      water: 'The only one who can reach the plate that runs the updraft, and the one left behind by it.',
      air: 'Carries Fire up the shaft.',
      fire: 'Melts the ice in the loft and pulls the lever that sends the lift down for Water.',
    },
  },
};
