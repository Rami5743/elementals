import { IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, leap, until, waitFlag } from '../../kit.mjs';
import { hop } from '../_lib.mjs';

const TOP = 10 * TILE;
const BOTTOM = 20 * TILE;
const liftY = (c) => c.ent('lift').s.y;

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_LEFT, 900, 'the flames to go out');
  yield* go(c, 6);                                   // the water gem
  yield* until(c, () => c.ent('hold').s.on === 1, IN_LEFT, 3000, 'the crate onto the plate');
  c.flag('crate_on');
  yield* go(c, 17);
  yield* until(c, () => liftY(c) >= BOTTOM, 0, 3000, 'the shuttle at the bottom');
  yield* go(c, 20);
  yield* until(c, () => liftY(c) <= TOP, 0, 3000, 'the shuttle at the top');
  yield* go(c, 23);
  yield* waitFlag(c, 'earth_home');
  yield* go(c, 36);
  c.flag('water_home');
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* hop(c);                                     // the fire gem
  yield* go(c, 16.4);
  yield* until(c, () => c.ent('ice').s.gone === 1, IN_RIGHT, 900, 'the ice to melt');
  c.flag('ice_out');
  yield* go(c, 16);
  yield* waitFlag(c, 'crate_on');
  yield* until(c, () => liftY(c) >= BOTTOM, 0, 3000, 'the shuttle at the bottom');
  yield* go(c, 19);
  yield* until(c, () => liftY(c) <= TOP, 0, 3000, 'the shuttle at the top');
  yield* go(c, 22);
  yield* waitFlag(c, 'water_home');
  yield* go(c, 34);
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'ice_out');
  yield* go(c, 18);
  yield* waitFlag(c, 'crate_on');
  yield* until(c, () => liftY(c) >= BOTTOM, 0, 3000, 'the shuttle at the bottom');
  yield* go(c, 21);
  yield* until(c, () => liftY(c) <= TOP, 0, 3000, 'the shuttle at the top');
  yield* go(c, 29);                                  // the earth gem is on the way
  yield* leap(c, 31.3);                              // over the boulder
  yield* until(c, () => c.ent('weigh').s.on === 1, IN_LEFT, 3000, 'the boulder onto the heavy plate');
  yield* until(c, () => c.ent('gate').s.open >= 128, 0, 400, 'the gate to open');
  yield* go(c, 38);
  c.flag('earth_home');
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'glasshouse',
  sets: [{ elements: ['fire', 'water', 'earth'], scripts: { fire, water, earth } }],
  roles: {
    'earth,fire,water': {
      water: 'Puts out the flames and shoves the crate onto the plate that runs the shuttle.',
      fire: 'Melts the ice in front of the shuttle.',
      earth: 'Rolls the boulder onto the heavy plate up in the loft.',
    },
  },
};
