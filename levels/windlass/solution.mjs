import { IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, leap, runJump, until, waitFlag } from '../../kit.mjs';
import { hop } from '../_lib.mjs';

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* leap(c, 3);                                 // over the boulder, to the turbine end
  yield* hop(c);                                     // the turbine: the near gate opens, the far one shuts
  yield* until(c, () => c.ent('g1').s.open >= 96, 0, 200, 'the near gate to open');
  yield* leap(c, 7.5);                               // back over the boulder, out of Earth's lane
  yield* go(c, 8);
  yield* hop(c);                                     // the air gem: there is no coming back for it
  c.flag('air_clear');
  yield* runJump(c, 8, 11.4, 17.5);                  // into the lock, over the mud that is deadly to Air
  yield* go(c, 18);
  yield* hop(c);                                     // the neutral gem
  yield* runJump(c, 17.2, 18.6, 23.4);               // the second mud strip
  yield* until(c, () => c.ent('g2').s.open >= 96, 0, 900, 'the far gate, once the turbine runs down');
  yield* go(c, 31);                                  // clear of the plate before the boulder arrives
  c.flag('air_parked');
  yield* until(c, () => c.ent('g3').s.open >= 96, 0, 1500, 'the last gate, held open by the boulder');
  yield* go(c, 37);
  c.flag('air_gone');
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'air_clear');
  // the boulder and Earth both have to be inside the lock before the turbine runs down
  yield* until(c, () => c.ent('bould').s.x >= 12 * TILE, IN_RIGHT, 900, 'the boulder into the lock');
  yield* waitFlag(c, 'air_parked');
  yield* until(c, () => c.ent('bould').s.x >= 28 * TILE, IN_RIGHT, 1500, 'the boulder onto the plate');
  yield* waitFlag(c, 'air_gone');
  yield* runJump(c, 26, 27.4, 30.6);                 // over the boulder, which stays to hold the gate
  yield* go(c, 35);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'windlass',
  sets: [{ elements: ['earth', 'air'], scripts: { earth, air } }],
  roles: {
    'air,earth': {
      air: 'Spins the turbine, then has to be inside the lock before its own gate drops — the turbine cannot be reached from in there.',
      earth: 'Pushes the boulder into the lock in the same window, and onto the heavy plate once the far gate opens.',
    },
  },
};
