import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, leap, run, runJump, until, waitFlag } from '../../kit.mjs';
import { hop } from '../_lib.mjs';

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* go(c, 3);
  yield* waitFlag(c, 'earth_set');
  yield* hop(c);                                     // touch the turbine: both gates open
  yield* until(c, () => c.ent('g1').s.open >= 96, 0, 200, 'the gates to open');
  c.flag('gates_open');
  yield* runJump(c, 5, 11.4, 17.5);                  // over the mud, which is deadly to Air
  yield* go(c, 20);
  yield* hop(c);                                     // the air gem, high over the corridor
  yield* go(c, 25);                                  // through the second gate in time
  yield* waitFlag(c, 'earth_home');
  yield* leap(c, 28.6);                              // over the boulder on the plate
  yield* go(c, 35);
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* go(c, 9);
  c.flag('earth_set');
  yield* waitFlag(c, 'gates_open');
  yield* go(c, 14);                                  // the earth gem, in the mud
  yield* go(c, 18);
  yield* hop(c);                                     // the neutral gem
  yield* run(c, 23);
  yield* runJump(c, 26, 28, 30.4);                   // over the boulder, to its far side
  yield* until(c, () => c.ent('weigh').s.on === 1, IN_LEFT, 3000, 'the boulder onto the plate');
  yield* until(c, () => c.ent('g3').s.open >= 96, 0, 300, 'the last gate');
  yield* go(c, 33);
  c.flag('earth_home');
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'windlass',
  sets: [{ elements: ['earth', 'air'], scripts: { earth, air } }],
  roles: {
    'air,earth': {
      air: 'Spins the turbine that opens both gates, and has to beat the clock down the corridor too.',
      earth: 'Runs the corridor in the five seconds, then puts the boulder on the heavy plate.',
    },
  },
};
