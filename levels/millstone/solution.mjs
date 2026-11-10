import { IN_RIGHT, TILE } from '../../kit.mjs';
import { go, until, waitFlag } from '../../kit.mjs';
import { hop } from '../_lib.mjs';

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* hop(c);                                     // the water gem
  yield* go(c, 9.2);
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_RIGHT, 900, 'the flames to go out');
  c.flag('flames_out');
  yield* go(c, 2);                                   // out of Earth's way
  yield* waitFlag(c, 'earth_home');
  yield* go(c, 34);
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* hop(c);                                     // the earth gem
  yield* waitFlag(c, 'flames_out');
  yield* until(c, () => c.ent('bould').s.x >= 18 * TILE, IN_RIGHT, 3000, 'the boulder onto the belt');
  c.flag('bould_on');
  yield* waitFlag(c, 'air_home');
  yield* go(c, 36);
  c.flag('earth_home');
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* go(c, 3);                                   // out of Earth's way
  yield* waitFlag(c, 'bould_on');
  yield* go(c, 6);
  yield* hop(c);                                     // spin the turbine
  yield* until(c, () => c.ent('belt').s.on === 1, 0, 200, 'the mill to start');
  yield* until(c, () => c.ent('weigh').s.on === 1, 0, 2500, 'the boulder to reach the plate');
  yield* go(c, 24);
  yield* hop(c);                                     // the air gem, four tiles up
  yield* go(c, 30);
  yield* hop(c);                                     // the neutral gem
  yield* go(c, 38);
  c.flag('air_home');
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'millstone',
  sets: [{ elements: ['water', 'earth', 'air'], scripts: { water, earth, air } }],
  roles: {
    'air,earth,water': {
      water: 'Puts out the flames that shut the hall.',
      earth: 'The only one who can move the boulder, and gets it onto the belt.',
      air: 'The only one who can reach the turbine that drives the belt.',
    },
  },
};
