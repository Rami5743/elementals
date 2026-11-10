import { IN_JUMP, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, pound, runJump, until, waitFlag } from '../../kit.mjs';
import { climbAboard, hop } from '../_lib.mjs';

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
  yield* go(c, 12);
  yield* hop(c);                                     // the neutral gem
  yield* waitFlag(c, 'ferry_one');
  yield* go(c, 13.6);
  yield* climbAboard(c, 'fire');
  c.flag('water_aboard');
  yield* waitFlag(c, 'water_over');
  yield* go(c, 24);                                  // step off on the far bank
  c.flag('water_clear');
  yield* waitFlag(c, 'air_down');
  yield* intoVault(c, 33, 32);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'flames_out');
  yield* go(c, 15);
  c.flag('ferry_one');
  yield* waitFlag(c, 'water_aboard');
  yield* go(c, 23);                                  // wade the lava, taking the fire gem
  c.flag('water_over');
  yield* waitFlag(c, 'water_clear');
  yield* go(c, 15);
  c.flag('ferry_two');
  yield* waitFlag(c, 'earth_aboard');
  yield* go(c, 23);
  c.flag('earth_over');
  yield* waitFlag(c, 'earth_down');
  yield* intoVault(c, 35, 36);
  c.flag('fire_down');
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'ferry_two');
  yield* go(c, 13.6);
  yield* climbAboard(c, 'fire');
  c.flag('earth_aboard');
  yield* waitFlag(c, 'earth_over');
  yield* go(c, 30);                                  // the earth gem
  yield* waitFlag(c, 'gate_open');
  yield* go(c, 34);
  for (let t = 0; t < 14; t++) yield IN_JUMP;
  yield* pound(c);                                   // the vault floor gives way
  if (c.ent('boards').s.gone !== 1) throw new Error('the cracked floor did not break');
  yield* go(c, 38);
  c.flag('earth_down');
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* waitFlag(c, 'flames_out');
  yield* waitFlag(c, 'water_clear');
  yield* runJump(c, 12, 14.8, 21);                   // over the lava
  yield* go(c, 20);
  yield* hop(c);                                     // the air gem
  yield* go(c, 21);
  yield* hop(c);                                     // the turbine latches the gate open
  yield* until(c, () => c.ent('gate').s.open >= 96, 0, 300, 'the gate to open');
  c.flag('gate_open');
  yield* go(c, 24);
  yield* waitFlag(c, 'fire_down');
  yield* intoVault(c, 33, 34);
  c.flag('air_down');
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'lantern_hall',
  sets: [{ elements: ['fire', 'water', 'earth', 'air'], scripts: { fire, water, earth, air } }],
  roles: {
    'air,earth,fire,water': {
      water: 'Puts out the flames, then rides across on Fire.',
      fire: 'The ferry: the only one the lava is safe for.',
      earth: 'Rides across too, and breaks the floor over the vault.',
      air: 'Jumps the lava by itself and spins the turbine nobody else can reach.',
    },
  },
};
