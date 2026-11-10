import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, interact, pound, until, waitFlag } from '../../kit.mjs';
import { climbAboard, hop } from '../_lib.mjs';

const PAD = 19;                                    // where the tower is built
const D1 = Number(process.env.D1 ?? 14);           // ticks between Earth's jump and Water's
const D2 = Number(process.env.D2 ?? 14);           // ticks between Water's jump and Fire's

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* go(c, 14);
  yield* hop(c);                                   // the earth gem
  yield* waitFlag(c, 'flames_out');
  yield* go(c, PAD);
  c.flag('base_ready');
  yield* waitFlag(c, 'stack_ready');
  c.flag('jump');
  for (let t = 0; t < 30; t++) yield IN_JUMP;
  for (let t = 0; t < 120 && !c.me.grounded; t++) yield 0;
  yield* waitFlag(c, 'gate_open');
  yield* go(c, 35);
  for (let t = 0; t < 14; t++) yield IN_JUMP;
  yield* pound(c);                                 // the cracked floor drops everyone into the vault
  if (c.ent('boards').s.gone !== 1) throw new Error('the cracked floor did not break');
  c.flag('floor_open');
  yield* go(c, 37);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 8);
  yield* hop(c);                                   // the water gem
  yield* go(c, 9.2);
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_RIGHT, 900, 'the flames to go out');
  c.flag('flames_out');
  yield* waitFlag(c, 'base_ready');
  yield* go(c, PAD - 1.4);
  yield* climbAboard(c, 'earth');
  c.flag('water_on');
  yield* waitFlag(c, 'jump');
  for (let t = 0; t < D1; t++) yield 0;
  for (let t = 0; t < 30; t++) yield IN_JUMP;
  for (let t = 0; t < 180 && !c.me.grounded; t++) yield 0;
  yield* waitFlag(c, 'floor_open');
  yield* go(c, 35);
  yield* until(c, () => c.me.grounded === 1 && c.bottom === 20 * TILE, 0, 300, 'down into the vault');
  c.flag('water_down');
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'water_on');
  yield* go(c, PAD - 1.4);
  yield* climbAboard(c, 'water');
  c.flag('stack_ready');
  yield* waitFlag(c, 'jump');
  for (let t = 0; t < D1 + D2; t++) yield 0;
  let peak = c.bottom;
  for (let t = 0; t < 240; t++) {
    peak = Math.min(peak, c.bottom);
    yield (t < 30 ? IN_JUMP : 0) | IN_RIGHT;
    if (t > 14 && c.me.grounded) break;
  }
  if (process.env.BOOST_DEBUG) console.log(`D1=${D1} D2=${D2} peak=${(peak / TILE).toFixed(2)} landed=${(c.bottom / TILE).toFixed(2)}`);
  if (c.bottom !== 8 * TILE) throw new Error(`fire missed the shelf (bottom=${c.bottom}, peak=${peak})`);
  yield* until(c, () => c.ent('ice').s.gone === 1, IN_RIGHT, 900, 'the ice to melt');
  yield* go(c, 26);
  yield* go(c, 28);
  yield* interact(c);                              // the lever
  c.flag('gate_open');
  yield* go(c, 18);                                // off the left end of the shelf
  yield* waitFlag(c, 'water_down');
  yield* go(c, 34);
  yield* until(c, () => c.me.grounded === 1 && c.bottom === 20 * TILE, 0, 300, 'down into the vault');
  yield* go(c, 33);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'three_body',
  sets: [{ elements: ['fire', 'water', 'earth'], scripts: { fire, water, earth } }],
  roles: {
    'earth,fire,water': {
      earth: 'The base of the tower, and the only one who can break the floor behind the gate.',
      water: 'Puts out the flames, then the middle of the tower.',
      fire: 'Goes up top, melts the ice on the shelf and pulls the lever.',
    },
  },
};
