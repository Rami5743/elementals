import { IN_JUMP, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, pound, run, until, waitFlag } from '../../kit.mjs';
import { hop } from '../_lib.mjs';

const VAULT = 20 * TILE;

function* intoVault(c, drop, x) {
  yield* go(c, drop);
  yield* until(c, () => c.me.grounded === 1 && c.bottom === VAULT, 0, 300, 'down into the vault');
  yield* go(c, x);
}

/** Air's hop into the turbine, waiting for the gates to swing. */
function* spin(c) {
  yield* go(c, 3);
  yield* hop(c);
  yield* until(c, () => c.ent('g1').s.open >= 96, 0, 200, 'the gates to open');
}

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 2);
  yield* hop(c);                                     // the water gem
  yield* go(c, 5.4);
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_RIGHT, 900, 'the flames to go out');
  c.flag('flames_out');
  yield* go(c, 8);
  yield* waitFlag(c, 'spin3');
  yield* run(c, 25);                                 // the third window
  yield* go(c, 32);
  c.flag('water_through');
  yield* waitFlag(c, 'air_down');
  yield* intoVault(c, 34, 34);
  c.flag('water_down');
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* waitFlag(c, 'flames_out');
  yield* go(c, 8);
  yield* hop(c);                                     // the air gem, four tiles up
  yield* waitFlag(c, 'earth_set');
  yield* spin(c);
  c.flag('spin1');
  yield* waitFlag(c, 'fire_set');
  yield* spin(c);
  c.flag('spin2');
  yield* waitFlag(c, 'fire_through');
  yield* spin(c);
  c.flag('spin3');
  yield* waitFlag(c, 'water_through');
  yield* spin(c);
  yield* run(c, 25);                                 // and out through its own window
  yield* go(c, 33);
  yield* waitFlag(c, 'earth_down');
  yield* intoVault(c, 33, 36);
  c.flag('air_down');
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'flames_out');
  yield* waitFlag(c, 'earth_through');
  yield* go(c, 9);
  c.flag('fire_set');
  yield* waitFlag(c, 'spin2');
  yield* run(c, 25);                                 // the second window
  yield* go(c, 29.4);
  yield* until(c, () => c.ent('ice').s.gone === 1, IN_RIGHT, 900, 'the ice to melt');
  yield* go(c, 31);
  c.flag('fire_through');
  yield* waitFlag(c, 'water_down');
  yield* intoVault(c, 33, 32);
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'flames_out');
  yield* go(c, 9);
  c.flag('earth_set');
  yield* waitFlag(c, 'spin1');
  yield* run(c, 25);                                 // the first window, being slowest
  yield* go(c, 27);
  c.flag('earth_through');
  yield* waitFlag(c, 'fire_through');
  yield* go(c, 32);                                  // the earth gem
  yield* go(c, 34);
  for (let t = 0; t < 14; t++) yield IN_JUMP;
  yield* pound(c);                                   // the vault floor gives way
  if (c.ent('boards').s.gone !== 1) throw new Error('the cracked floor did not break');
  yield* go(c, 38);
  c.flag('earth_down');
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'tandem',
  sets: [{ elements: ['fire', 'water', 'earth', 'air'], scripts: { fire, water, earth, air } }],
  roles: {
    'air,earth,fire,water': {
      water: 'Puts out the flames that shut the near end.',
      air: 'The only one who can spin the turbine, and has to spin it four times.',
      earth: 'Takes the first window, being the slowest, and opens the vault at the end.',
      fire: 'Melts the ice past the second gate.',
    },
  },
};
