import { IN_JUMP, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, interact, pound, until, waitFlag } from '../../kit.mjs';
import { climbAboard } from '../_lib.mjs';

const LOFT = 8 * TILE;

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* go(c, 17);                                  // stand in the flue
  c.flag('ready');
  yield* waitFlag(c, 'aboard');
  c.flag('stack_set');
  yield* waitFlag(c, 'gale_on');
  yield* until(c, () => c.me.y < 6 * TILE, 0, 4000, 'up the flue');
  yield* until(c, () => c.cx > 20 * TILE, IN_RIGHT, 400, 'out of the flue');
  yield* until(c, () => c.me.grounded === 1 && c.bottom === LOFT, 0, 400, 'down on the loft');
  c.flag('landed');
  yield* until(c, () => c.ent('ice').s.gone === 1, IN_RIGHT, 900, 'the ice to melt');
  c.flag('ice_out');
  yield* waitFlag(c, 'floor_open');
  yield* go(c, 32);
  yield* until(c, () => c.me.grounded === 1 && c.bottom === 12 * TILE, 0, 300, 'down into the vault');
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'ready');
  yield* go(c, 15.6);
  yield* climbAboard(c, 'fire');
  c.flag('aboard');
  yield* waitFlag(c, 'ice_out');
  yield* go(c, 27);                                  // the earth gem
  yield* waitFlag(c, 'gate_open');
  yield* go(c, 33);
  for (let t = 0; t < 14; t++) yield IN_JUMP;
  yield* pound(c);                                   // the vault floor gives way
  if (c.ent('boards').s.gone !== 1) throw new Error('the cracked floor did not break');
  c.flag('floor_open');
  yield* go(c, 34);
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* go(c, 3);
  yield* waitFlag(c, 'stack_set');
  yield* interact(c);                                // the timed button starts the gale
  c.flag('gale_on');
  yield* go(c, 14);                                  // wait at the foot of the flue
  yield* waitFlag(c, 'landed');
  yield* until(c, () => c.cx > 17 * TILE, IN_RIGHT, 400, 'into the flue');
  yield* until(c, () => c.me.y < 6 * TILE, 0, 4000, 'up the flue');
  yield* until(c, () => c.cx > 20 * TILE, IN_RIGHT, 400, 'out of the flue');
  yield* until(c, () => c.me.grounded === 1 && c.bottom === LOFT, 0, 400, 'down on the loft');
  yield* waitFlag(c, 'ice_out');
  yield* go(c, 24);                                  // the turbine opens the gate
  yield* until(c, () => c.ent('gate').s.open >= 128, 0, 400, 'the gate to open');
  c.flag('gate_open');
  yield* go(c, 26);                                  // the air gem
  yield* waitFlag(c, 'floor_open');
  yield* go(c, 36);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'kiln',
  sets: [{ elements: ['fire', 'earth', 'air'], scripts: { fire, earth, air } }],
  roles: {
    'air,earth,fire': {
      air: 'Starts the gale, beats it down the hall, and spins the turbine in the loft.',
      fire: 'Carries Earth up the flue and melts the ice at the top.',
      earth: 'Rides up on Fire and breaks the loft floor over the vault.',
    },
  },
};
