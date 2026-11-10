import { IN_RIGHT, TILE } from '../../kit.mjs';
import { go, until, waitFlag } from '../../kit.mjs';
import { climbAboard } from '../_lib.mjs';

const LOFT = 8 * TILE;

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* go(c, 15);                       // clear of the updraft, so water can climb on
  c.flag('ready');
  yield* waitFlag(c, 'aboard');
  yield* until(c, () => c.cx > 18 * TILE, IN_RIGHT, 300, 'into the chimney');
  yield* until(c, () => c.me.y < 6 * TILE, 0, 6000, 'up the chimney');
  yield* until(c, () => c.cx > 21.5 * TILE, IN_RIGHT, 400, 'out of the chimney');
  yield* until(c, () => c.me.grounded === 1 && c.bottom === LOFT, 0, 400, 'down on the loft');
  c.flag('landed');
  yield* go(c, 20);                       // the air gem
  yield* waitFlag(c, 'flames_out');
  yield* go(c, 31);
  c.flag('air_home');
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 10);                       // the water gem
  yield* waitFlag(c, 'ready');
  yield* go(c, 13.6);
  yield* climbAboard(c, 'air');
  c.flag('aboard');
  yield* waitFlag(c, 'landed');
  yield* go(c, 27);
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_RIGHT, 900, 'the flames to go out');
  c.flag('flames_out');
  yield* waitFlag(c, 'air_home');
  yield* go(c, 24);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'updraft_duet',
  sets: [{ elements: ['water', 'air'], scripts: { water, air } }],
  roles: {
    'air,water': {
      air: 'Carries Water up the chimney on its head.',
      water: 'Rides up, then puts out the flames that shut the loft.',
    },
  },
};
