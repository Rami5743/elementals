import { IN_JUMP, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, interact, pound, until, waitFlag } from '../../kit.mjs';
import { climbAboard, hop } from '../_lib.mjs';

const PAD = 21;
const VAULT = 20 * TILE;
const D1 = 14, D2 = 14;

function* intoVault(c, drop, x) {
  yield* go(c, drop);
  yield* until(c, () => c.me.grounded === 1 && c.bottom === VAULT, 0, 300, 'down into the vault');
  yield* go(c, x);
}

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* go(c, 3);
  yield* hop(c);                                     // the turbine latches the hall open
  yield* until(c, () => c.ent('g1').s.open >= 96, 0, 300, 'the hall to open');
  c.flag('g1_open');
  yield* go(c, 5);
  yield* hop(c);                                     // the air gem
  yield* waitFlag(c, 'frozen');
  yield* go(c, 25);                                  // across the ice, out of the tower's way
  c.flag('air_east');
  yield* waitFlag(c, 'earth_down');
  yield* intoVault(c, 36, 36);
  c.flag('air_down');
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* waitFlag(c, 'g1_open');
  yield* go(c, 9);
  yield* hop(c);                                     // the water gem
  yield* go(c, 10);                                  // the freeze pad
  yield* until(c, () => c.ent('pool').s.on === 1, 0, 300, 'the ford to freeze');
  c.flag('frozen');
  yield* waitFlag(c, 'base_ready');
  yield* go(c, PAD - 1.4);
  yield* climbAboard(c, 'earth');
  c.flag('water_on');
  yield* waitFlag(c, 'jump');
  for (let t = 0; t < D1; t++) yield 0;
  for (let t = 0; t < 30; t++) yield IN_JUMP;
  for (let t = 0; t < 180 && !c.me.grounded; t++) yield 0;
  yield* waitFlag(c, 'air_down');
  yield* intoVault(c, 35, 34);
  c.flag('water_down');
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'frozen');
  yield* waitFlag(c, 'air_east');
  yield* go(c, 19);                                  // the earth gem, over the ice
  yield* go(c, PAD);
  c.flag('base_ready');
  yield* waitFlag(c, 'stack_ready');
  c.flag('jump');
  for (let t = 0; t < 30; t++) yield IN_JUMP;
  for (let t = 0; t < 120 && !c.me.grounded; t++) yield 0;
  yield* waitFlag(c, 'g2_open');
  yield* go(c, 36);
  for (let t = 0; t < 14; t++) yield IN_JUMP;
  yield* pound(c);                                   // the vault floor gives way
  if (c.ent('boards').s.gone !== 1) throw new Error('the cracked floor did not break');
  yield* go(c, 38);
  c.flag('earth_down');
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'water_on');
  yield* go(c, PAD - 1.4);
  yield* climbAboard(c, 'water');
  c.flag('stack_ready');
  yield* waitFlag(c, 'jump');
  for (let t = 0; t < D1 + D2; t++) yield 0;
  for (let t = 0; t < 240; t++) {
    yield (t < 30 ? IN_JUMP : 0) | IN_RIGHT;
    if (t > 14 && c.me.grounded) break;
  }
  if (c.bottom !== 8 * TILE) throw new Error(`fire missed the shelf (bottom=${c.bottom})`);
  yield* until(c, () => c.ent('ice').s.gone === 1, IN_RIGHT, 900, 'the ice to melt');
  yield* go(c, 28);                                  // the fire gem
  yield* go(c, 30);
  yield* interact(c);                                // the lever
  c.flag('g2_open');
  yield* go(c, 20);                                  // off the near end of the shelf
  yield* waitFlag(c, 'water_down');
  yield* intoVault(c, 35, 33);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'finale',
  sets: [{ elements: ['fire', 'water', 'earth', 'air'], scripts: { fire, water, earth, air } }],
  roles: {
    'air,earth,fire,water': {
      air: 'Opens the hall with the turbine nobody else can reach.',
      water: 'Freezes the ford, then leaves the pad to be the middle of the tower.',
      earth: 'The base of the tower, and the only one who can open the vault.',
      fire: 'Goes up top, melts the ice and pulls the lever.',
    },
  },
};
