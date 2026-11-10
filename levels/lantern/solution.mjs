import { IN_JUMP, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, leap, until, waitFlag } from '../../kit.mjs';
import { climbAboard, glideTo, hop } from '../_lib.mjs';

/** The four two-tile steps up to the launch ledge. */
function* stairs(c) {
  yield* go(c, 3);
  yield* leap(c, 5);
  yield* go(c, 6);
  yield* leap(c, 8);
  yield* go(c, 8);
  yield* leap(c, 10);
  yield* go(c, 10);
  yield* leap(c, 12);
}

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* stairs(c);
  yield* go(c, 13);
  c.flag('ready');
  yield* waitFlag(c, 'aboard');
  yield* glideTo(c, 31);                      // off the ledge and over the sludge
  if (c.bottom !== 20 * TILE) throw new Error(`air landed at ${c.bottom}`);
  c.flag('landed');
  yield* hop(c);                              // the air gem
  yield* waitFlag(c, 'lit');
  yield* go(c, 38);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'ready');
  yield* stairs(c);
  yield* go(c, 12);
  yield* hop(c);                              // the fire gem
  yield* climbAboard(c, 'air');
  c.flag('aboard');
  yield* waitFlag(c, 'landed');
  yield* go(c, 29);
  yield* until(c, () => c.ent('beacon').s.on === 1, IN_RIGHT, 300, 'the torch to light');
  c.flag('lit');
  yield* go(c, 36);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'lantern',
  sets: [{ elements: ['fire', 'air'], scripts: { fire, air } }],
  roles: {
    'air,fire': {
      air: 'Glides across the sludge with Fire on its head.',
      fire: 'Lights the torch that opens the gate on the far bank.',
    },
  },
};
