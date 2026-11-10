import { IN_JUMP, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, leap, pound, until, waitFlag } from '../../kit.mjs';
import { climbAboard, glideTo, hop } from '../_lib.mjs';

const VAULT = 20 * TILE;

/** The four two-tile steps up to the launch ledge. */
function* stairs(c) {
  yield* go(c, 1);
  yield* leap(c, 2);
  yield* leap(c, 4);
  yield* leap(c, 6);
  yield* leap(c, 8);
}

function* intoVault(c, drop, x) {
  yield* go(c, drop);
  yield* until(c, () => c.me.grounded === 1 && c.bottom === VAULT, 0, 300, 'down into the vault');
  yield* go(c, x);
}

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* stairs(c);
  yield* go(c, 8);
  c.flag('ready');
  yield* waitFlag(c, 'aboard');
  yield* until(c, () => c.me.grounded === 0, IN_RIGHT, 180, 'off the ledge');
  yield* glideTo(c, 25);
  if (c.bottom !== 17 * TILE) throw new Error(`air landed at ${c.bottom}`);
  c.flag('landed');
  yield* waitFlag(c, 'water_down');
  yield* intoVault(c, 35, 34);
  c.flag('air_down');
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'ready');
  yield* stairs(c);
  yield* go(c, 6.6);                                 // the fire gem is on the top step
  yield* climbAboard(c, 'air');
  c.flag('aboard');
  yield* waitFlag(c, 'landed');
  yield* go(c, 26);
  yield* until(c, () => c.ent('beacon').s.on === 1, 0, 300, 'the torch to light');
  c.flag('span_closed');
  yield* go(c, 24);                                  // out of the way of the crossing
  yield* waitFlag(c, 'air_down');
  yield* intoVault(c, 35, 32);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 10);                                  // the neutral gem
  yield* waitFlag(c, 'span_closed');
  yield* go(c, 28);                                  // over the span, taking its gem
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_RIGHT, 900, 'the flames to go out');
  c.flag('flames_out');
  yield* waitFlag(c, 'earth_down');
  yield* intoVault(c, 35, 36);
  c.flag('water_down');
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'flames_out');
  yield* go(c, 32);                                  // the earth gem
  yield* go(c, 35);
  for (let t = 0; t < 14; t++) yield IN_JUMP;
  yield* pound(c);                                   // the vault floor gives way
  if (c.ent('boards').s.gone !== 1) throw new Error('the cracked floor did not break');
  yield* go(c, 38);
  c.flag('earth_down');
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'the_span',
  sets: [{ elements: ['fire', 'water', 'earth', 'air'], scripts: { fire, water, earth, air } }],
  roles: {
    'air,earth,fire,water': {
      air: 'Glides the chasm with Fire aboard — the only crossing until the span closes.',
      fire: 'Lights the torch that closes the span for the other two.',
      water: 'Puts out the flames on the far bank.',
      earth: 'Breaks the floor over the vault.',
    },
  },
};
