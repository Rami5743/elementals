import { IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, until, waitFlag } from '../../kit.mjs';
import { climbAboard, hop } from '../_lib.mjs';

const LOFT = 8 * TILE;

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* hop(c);                                   // the earth gem
  yield* until(c, () => c.ent('weigh').s.on === 1, IN_LEFT, 2500, 'the boulder onto the plate');
  c.flag('fan_on');
  yield* waitFlag(c, 'torch_lit');
  yield* go(c, 33);
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* go(c, 14);
  c.flag('ready');
  yield* waitFlag(c, 'aboard');
  yield* waitFlag(c, 'fan_on');
  yield* until(c, () => c.cx > 17 * TILE, IN_RIGHT, 300, 'into the updraft');
  yield* until(c, () => c.me.y < 6 * TILE, 0, 6000, 'up the shaft');
  yield* until(c, () => c.cx > 20 * TILE, IN_RIGHT, 400, 'out of the updraft');
  yield* until(c, () => c.me.grounded === 1 && c.bottom === LOFT, 0, 400, 'down on the loft');
  c.flag('landed');
  yield* waitFlag(c, 'torch_lit');
  yield* go(c, 22);
  yield* hop(c);                                   // the air gem
  yield* go(c, 33);
  c.flag('air_home');
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'ready');
  yield* go(c, 12.6);
  yield* climbAboard(c, 'air');
  c.flag('aboard');
  yield* waitFlag(c, 'landed');
  yield* go(c, 23);                                // step off air's head onto the loft
  yield* go(c, 21);
  yield* until(c, () => c.ent('beacon').s.on === 1, 0, 300, 'the torch to light');
  c.flag('torch_lit');
  yield* go(c, 25);
  yield* hop(c);                                   // the fire gem
  yield* waitFlag(c, 'air_home');
  yield* go(c, 31);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'draught',
  sets: [{ elements: ['fire', 'earth', 'air'], scripts: { fire, earth, air } }],
  roles: {
    'air,earth,fire': {
      earth: 'Rolls the boulder onto the heavy plate so the draught runs without anybody holding it.',
      air: 'Carries Fire up the shaft.',
      fire: 'Lights the torch that opens the loft gate and the hatch down in the hall.',
    },
  },
};
