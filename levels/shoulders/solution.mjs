import { IN_JUMP, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, pound, until, waitFlag } from '../../kit.mjs';
import { climbAboard, hop } from '../_lib.mjs';

const VAULT = 20 * TILE;

function* intoVault(c, drop, x) {
  yield* go(c, drop);
  yield* until(c, () => c.me.grounded === 1 && c.bottom === VAULT, 0, 300, 'down into the vault');
  yield* go(c, x);
}

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 5);
  yield* hop(c);                                     // the water gem
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_RIGHT, 900, 'the flames to go out');
  c.flag('flames_out');
  yield* go(c, 10);
  yield* hop(c);                                     // the neutral gem
  yield* go(c, 9);
  yield* waitFlag(c, 'air_down');
  yield* intoVault(c, 32, 32);
  c.flag('water_down');
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'flames_out');
  yield* go(c, 12);                                  // the mark under the turbine
  c.flag('base_ready');
  yield* waitFlag(c, 'spun');
  yield* go(c, 18);                                  // the earth gem
  yield* waitFlag(c, 'ice_out');
  yield* go(c, 31);
  for (let t = 0; t < 14; t++) yield IN_JUMP;
  yield* pound(c);                                   // the vault floor gives way
  if (c.ent('boards').s.gone !== 1) throw new Error('the cracked floor did not break');
  yield* go(c, 36);
  c.flag('earth_down');
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* waitFlag(c, 'base_ready');
  yield* go(c, 10.6);
  yield* climbAboard(c, 'earth');
  yield* hop(c);                                     // from up there the turbine is in reach
  yield* until(c, () => c.ent('gate').s.open >= 96, 0, 400, 'the gate to latch open');
  c.flag('spun');
  yield* go(c, 14);
  yield* waitFlag(c, 'earth_down');
  yield* intoVault(c, 31, 34);
  c.flag('air_down');
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'spun');
  yield* go(c, 24);
  yield* hop(c);                                     // the fire gem
  yield* until(c, () => c.ent('ice').s.gone === 1, IN_RIGHT, 900, 'the ice to melt');
  c.flag('ice_out');
  yield* go(c, 27);
  yield* waitFlag(c, 'water_down');
  yield* intoVault(c, 31, 30);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'shoulders',
  sets: [{ elements: ['fire', 'water', 'earth', 'air'], scripts: { fire, water, earth, air } }],
  roles: {
    'air,earth,fire,water': {
      water: 'Puts out the flames that shut the hall.',
      earth: 'The step Air needs, and the only one who can open the vault.',
      air: 'Spins the turbine — from Earth\'s head, because it cannot be reached from the floor.',
      fire: 'Melts the ice past the gate.',
    },
  },
};
