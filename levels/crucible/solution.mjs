import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, pound, until, waitFlag } from '../../kit.mjs';
import { climbAboard, climbOnto, hop } from '../_lib.mjs';

const LOFT = 8 * TILE;
const VAULT = 12 * TILE;

function* upTheFlue(c) {
  yield* until(c, () => c.cx > 17 * TILE, IN_RIGHT, 300, 'into the flue');
  yield* until(c, () => c.me.y < 6 * TILE, 0, 4000, 'up the flue');
  yield* until(c, () => c.cx > 20 * TILE, IN_RIGHT, 400, 'out of the flue');
  yield* until(c, () => c.me.grounded === 1 && c.bottom === LOFT, 0, 400, 'down on the loft');
}

function* intoVault(c, drop, x) {
  yield* go(c, drop);
  yield* until(c, () => c.me.grounded === 1 && c.bottom === VAULT, 0, 300, 'down into the vault');
  yield* go(c, x);
}

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* waitFlag(c, 'earth_aboard');
  yield* go(c, 4);
  yield* hop(c);                                     // the turbine latches the gale on
  yield* until(c, () => c.ent('gale').s.on === 1, 0, 300, 'the gale');
  c.flag('gale_on');
  yield* go(c, 6);
  yield* hop(c);                                     // the air gem
  yield* waitFlag(c, 'pair_one_up');
  yield* go(c, 15);
  c.flag('air_ready');
  yield* waitFlag(c, 'water_aboard');
  yield* upTheFlue(c);
  c.flag('pair_two_up');
  yield* waitFlag(c, 'earth_down');
  yield* intoVault(c, 32, 35);
  c.flag('air_down');
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* go(c, 10.4);
  yield* until(c, () => c.ent('ice').s.gone === 1, IN_LEFT, 900, 'the ice to melt');
  c.flag('ice_out');
  yield* go(c, 15);                                  // clear of the flue while Earth climbs on
  c.flag('fire_ready');
  yield* waitFlag(c, 'gale_on');
  yield* upTheFlue(c);
  c.flag('pair_one_up');
  yield* go(c, 20);
  yield* hop(c);                                     // the fire gem
  yield* go(c, 19);                                  // clear of the flue mouth
  yield* waitFlag(c, 'water_down');
  yield* intoVault(c, 32, 31);
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'fire_ready');
  yield* go(c, 13.6);
  yield* climbAboard(c, 'fire');
  c.flag('earth_aboard');
  yield* waitFlag(c, 'flames_out');
  yield* go(c, 29);                                  // the earth gem
  yield* go(c, 33);
  for (let t = 0; t < 14; t++) yield IN_JUMP;
  yield* pound(c);                                   // the vault floor gives way
  if (c.ent('boards').s.gone !== 1) throw new Error('the cracked floor did not break');
  yield* go(c, 37);
  c.flag('earth_down');
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* waitFlag(c, 'air_ready');
  yield* go(c, 13.6);
  yield* climbOnto(c, 'air');
  c.flag('water_aboard');
  yield* waitFlag(c, 'pair_two_up');
  yield* go(c, 23.4);
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_RIGHT, 900, 'the flames to go out');
  yield* go(c, 26);                                  // the water gem
  c.flag('flames_out');
  yield* waitFlag(c, 'air_down');
  yield* intoVault(c, 34, 33);
  c.flag('water_down');
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'crucible',
  sets: [{ elements: ['fire', 'water', 'earth', 'air'], scripts: { fire, water, earth, air } }],
  roles: {
    'air,earth,fire,water': {
      air: 'Starts the gale and carries Water up it.',
      fire: 'Melts the ice and carries Earth up the flue.',
      water: 'Puts out the flames across the loft.',
      earth: 'Breaks the loft floor over the vault.',
    },
  },
};
