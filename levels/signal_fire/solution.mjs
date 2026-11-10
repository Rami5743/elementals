import { IN_RIGHT, TILE } from '../../kit.mjs';
import { go, leap, until, waitFlag } from '../../kit.mjs';
import { glideTo, hop } from '../_lib.mjs';

/** The four two-tile steps up to the launch ledge. */
function* stairs(c) {
  yield* go(c, 3);
  yield* leap(c, 5);
  yield* leap(c, 7);
  yield* leap(c, 9);
  yield* leap(c, 11);
}

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* stairs(c);
  yield* go(c, 11);
  c.flag('ready');
  yield* waitFlag(c, 'aboard');
  yield* until(c, () => c.me.grounded === 0, IN_RIGHT, 180, 'off the ledge');
  yield* glideTo(c, 28);
  if (c.bottom !== 20 * TILE) throw new Error(`air landed at ${c.bottom}`);
  c.flag('landed');
  yield* go(c, 28);
  yield* hop(c);                                   // the neutral gem
  yield* waitFlag(c, 'flames_out');
  yield* go(c, 38);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'ready');
  yield* stairs(c);
  yield* go(c, 10.3);                              // the fire gem is on the way
  yield* leap(c, (c.player('air').x + 10) / TILE - 0.5, 22);
  yield* until(c, () => c.bottom === c.player('air').y, 0, 90, 'to be aboard');
  c.flag('aboard');
  yield* waitFlag(c, 'landed');
  yield* go(c, 30);
  yield* until(c, () => c.ent('beacon').s.on === 1, 0, 300, 'the torch to light');
  c.flag('bridge_on');
  yield* waitFlag(c, 'flames_out');
  yield* go(c, 34);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 2);
  yield* hop(c);                                   // the water gem
  yield* waitFlag(c, 'bridge_on');
  yield* go(c, 31);                                // over the bridge
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_RIGHT, 900, 'the flames to go out');
  c.flag('flames_out');
  yield* go(c, 36);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'signal_fire',
  sets: [{ elements: ['fire', 'water', 'air'], scripts: { fire, water, air } }],
  roles: {
    'air,fire,water': {
      air: 'The only one who can cross the chasm, and only by gliding it with Fire aboard.',
      fire: 'Lights the torch on the far side, which closes the bridge for Water.',
      water: 'Crosses on the bridge and puts out the flames in front of the doors.',
    },
  },
};
