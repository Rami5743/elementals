import { IN_JUMP, IN_RIGHT, TILE } from '../../kit.mjs';
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
  yield* go(c, 8);                                   // the freeze pad
  yield* until(c, () => c.ent('pool').s.on === 1, 0, 300, 'the ford to freeze');
  c.flag('frozen');
  yield* waitFlag(c, 'air_home');
  yield* go(c, 13);                                  // its gem, wading the ford
  yield* intoVault(c, 30, 31);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'frozen');
  yield* go(c, 18.4);                                // over the ice, taking the neutral gem
  yield* until(c, () => c.ent('ice').s.gone === 1, IN_RIGHT, 900, 'the ice to melt');
  c.flag('ice_out');
  yield* go(c, 20);
  yield* hop(c);                                     // the fire gem
  yield* waitFlag(c, 'earth_home');
  yield* intoVault(c, 30, 33);
  c.flag('fire_home');
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* waitFlag(c, 'ice_out');
  yield* go(c, 21);
  yield* hop(c);                                     // the turbine latches the gate open
  yield* until(c, () => c.ent('g1').s.open >= 96, 0, 300, 'the gate to open');
  c.flag('g1_open');
  yield* go(c, 24);
  yield* hop(c);                                     // the air gem
  yield* waitFlag(c, 'fire_home');
  yield* intoVault(c, 31, 35);
  c.flag('air_home');
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'g1_open');
  yield* go(c, 28);
  yield* hop(c);                                     // the earth gem
  yield* go(c, 31);
  for (let t = 0; t < 14; t++) yield IN_JUMP;
  yield* pound(c);                                   // the vault floor gives way
  if (c.ent('boards').s.gone !== 1) throw new Error('the cracked floor did not break');
  yield* go(c, 37);
  c.flag('earth_home');
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'cataract',
  sets: [{ elements: ['fire', 'water', 'earth', 'air'], scripts: { fire, water, earth, air } }],
  roles: {
    'air,earth,fire,water': {
      water: 'Freezes the ford from the pad and crosses last on its own ice.',
      fire: 'Melts the wall of ice beyond the ford.',
      air: 'Spins the turbine nobody else can reach.',
      earth: 'Breaks the cracked floor over the vault.',
    },
  },
};
