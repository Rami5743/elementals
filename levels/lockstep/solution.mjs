import { IN_JUMP, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, interact, pound, run, until, waitFlag } from '../../kit.mjs';
import { hop } from '../_lib.mjs';

const VAULT = 20 * TILE;

function* intoVault(c, drop, x) {
  yield* go(c, drop);
  yield* until(c, () => c.me.grounded === 1 && c.bottom === VAULT, 0, 300, 'down into the vault');
  yield* go(c, x);
}

/** Press the button and run the span before it opens again. */
function* cross(c, to) {
  yield* go(c, 13);
  yield* interact(c);
  yield* until(c, () => c.ent('span').s.open === 0, 0, 200, 'the span to close over the sludge');
  yield* run(c, 25);
  yield* go(c, to);
}

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 2);
  yield* hop(c);                                     // the water gem
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_RIGHT, 900, 'the flames to go out');
  c.flag('flames_out');
  yield* go(c, 11);                                  // the neutral gem
  yield* waitFlag(c, 'fire_over');
  yield* cross(c, 27);
  c.flag('water_over');
  yield* waitFlag(c, 'air_down');
  yield* intoVault(c, 35, 33);
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'flames_out');
  yield* cross(c, 28);                               // slowest, so first
  c.flag('earth_over');
  yield* waitFlag(c, 'ice_out');
  yield* go(c, 36);
  for (let t = 0; t < 14; t++) yield IN_JUMP;
  yield* pound(c);                                   // the vault floor gives way
  if (c.ent('boards').s.gone !== 1) throw new Error('the cracked floor did not break');
  yield* go(c, 38);
  c.flag('earth_down');
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'earth_over');
  yield* cross(c, 30);                               // the fire gem is on the far bank
  c.flag('fire_over');
  yield* waitFlag(c, 'gate_open');
  yield* go(c, 32.4);
  yield* until(c, () => c.ent('ice').s.gone === 1, IN_RIGHT, 900, 'the ice to melt');
  c.flag('ice_out');
  yield* waitFlag(c, 'earth_down');
  yield* intoVault(c, 37, 36);
  c.flag('fire_down');
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* waitFlag(c, 'water_over');
  yield* cross(c, 24);
  yield* hop(c);                                     // the air gem
  yield* go(c, 26);
  yield* hop(c);                                     // the turbine latches the gate open
  yield* until(c, () => c.ent('gate').s.open >= 96, 0, 300, 'the gate to open');
  c.flag('gate_open');
  yield* waitFlag(c, 'fire_down');
  yield* intoVault(c, 35, 34);
  c.flag('air_down');
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'lockstep',
  sets: [{ elements: ['fire', 'water', 'earth', 'air'], scripts: { fire, water, earth, air } }],
  roles: {
    'air,earth,fire,water': {
      water: 'Puts out the flames at the near end, and crosses third.',
      earth: 'Crosses first, being slowest, and opens the vault at the end.',
      fire: 'Melts the ice past the gate.',
      air: 'Crosses last and spins the turbine nobody else can reach.',
    },
  },
};
