import { IN_RIGHT, TILE } from '../../kit.mjs';
import { go, run, until, waitFlag } from '../../kit.mjs';
import { hop } from '../_lib.mjs';

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 6);
  yield* hop(c);                                     // the water gem
  yield* go(c, 8);                                   // the freeze pad
  yield* until(c, () => c.ent('pool').s.on === 1, 0, 300, 'the sluice to freeze');
  c.flag('frozen');
  yield* waitFlag(c, 'spin2');
  yield* run(c, 20);                                 // across while it is still ice
  yield* go(c, 23);
  c.flag('water_across');
  yield* waitFlag(c, 'air_home');
  yield* go(c, 33);
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* go(c, 11);                                  // waiting at the sluice
  c.flag('earth_set');
  yield* waitFlag(c, 'spin1');
  yield* run(c, 20);                                 // through the gate and over the ice
  yield* until(c, () => c.ent('weigh').s.on === 1, IN_RIGHT, 2500, 'the boulder onto the plate');
  c.flag('earth_across');
  yield* go(c, 28);
  yield* hop(c);                                     // the earth gem
  yield* waitFlag(c, 'air_home');
  yield* go(c, 35);
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* go(c, 4);
  yield* waitFlag(c, 'frozen');
  yield* waitFlag(c, 'earth_set');
  yield* hop(c);                                     // spin the turbine
  yield* until(c, () => c.ent('sluice').s.open >= 96, 0, 200, 'the sluice to open');
  c.flag('spin1');
  yield* waitFlag(c, 'earth_across');
  yield* hop(c);                                     // spin it again for the other two
  yield* until(c, () => c.ent('sluice').s.open >= 96, 0, 200, 'the sluice to open again');
  c.flag('spin2');
  yield* go(c, 18);
  yield* hop(c);                                     // the air gem, over the sluice
  yield* go(c, 21);
  yield* waitFlag(c, 'water_across');
  yield* go(c, 37);
  c.flag('air_home');
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'sluicegate',
  sets: [{ elements: ['water', 'earth', 'air'], scripts: { water, earth, air } }],
  roles: {
    'air,earth,water': {
      water: 'Freezes the sluice from the pad, and crosses last on the ice it left behind.',
      air: 'The only one who can spin the turbine, and has to spin it twice.',
      earth: 'Runs the sluice first, being slowest, and puts the boulder on the heavy plate.',
    },
  },
};
