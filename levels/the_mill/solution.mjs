import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, pound, until, waitFlag } from '../../kit.mjs';
import { hop } from '../_lib.mjs';

const VAULT = 20 * TILE;

function* intoVault(c, drop, x) {
  yield* go(c, drop);
  yield* until(c, () => c.me.grounded === 1 && c.bottom === VAULT, 0, 300, 'down into the vault');
  yield* go(c, x);
}

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 2);
  yield* hop(c);                                     // the water gem
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_RIGHT, 900, 'the flames to go out');
  c.flag('flames_out');
  yield* go(c, 27);                                  // across the still belt, taking the gem
  c.flag('water_east');
  yield* waitFlag(c, 'air_down');
  yield* intoVault(c, 33, 32);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'flames_out');
  yield* go(c, 26);
  c.flag('fire_east');
  yield* waitFlag(c, 'gate_open');
  yield* go(c, 30.4);
  yield* until(c, () => c.ent('ice').s.gone === 1, IN_RIGHT, 900, 'the ice to melt');
  yield* go(c, 30);                                  // the fire gem
  c.flag('ice_out');
  yield* waitFlag(c, 'earth_down');
  yield* intoVault(c, 35, 36);
  c.flag('fire_down');
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* waitFlag(c, 'flames_out');
  yield* go(c, 22);
  yield* hop(c);                                     // the air gem
  yield* go(c, 24);
  c.flag('air_east');
  yield* waitFlag(c, 'bould_on');
  yield* hop(c);                                     // the turbine starts the belt
  yield* until(c, () => c.ent('weigh').s.on === 1, 0, 3000, 'the boulder to reach the plate');
  c.flag('gate_open');
  yield* waitFlag(c, 'fire_down');
  yield* intoVault(c, 34, 34);
  c.flag('air_down');
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'flames_out');
  yield* go(c, 20);                                  // the earth gem
  yield* waitFlag(c, 'air_east');
  yield* waitFlag(c, 'fire_east');
  yield* waitFlag(c, 'water_east');
  yield* go(c, 22.4);                                // round to the far side of the boulder
  yield* until(c, () => c.ent('bould').s.x <= 19 * TILE, IN_LEFT, 2500, 'the boulder onto the belt');
  c.flag('bould_on');
  yield* go(c, 23);
  yield* waitFlag(c, 'gate_open');
  yield* go(c, 34);
  for (let t = 0; t < 14; t++) yield IN_JUMP;
  yield* pound(c);                                   // the vault floor gives way
  if (c.ent('boards').s.gone !== 1) throw new Error('the cracked floor did not break');
  yield* go(c, 38);
  c.flag('earth_down');
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'the_mill',
  sets: [{ elements: ['fire', 'water', 'earth', 'air'], scripts: { fire, water, earth, air } }],
  roles: {
    'air,earth,fire,water': {
      water: 'Puts out the flames that shut the hall.',
      earth: 'The only one who can get the boulder onto the belt, and the only one who opens the vault.',
      air: 'The only one who can start the belt.',
      fire: 'Melts the ice past the gate.',
    },
  },
};
