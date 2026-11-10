import { IN_JUMP, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, interact, until, waitFlag } from '../../kit.mjs';
import { climbAboard, hop } from '../_lib.mjs';

const SHELF = 17 * TILE;

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* hop(c);                                     // the water gem
  yield* go(c, 7.2);
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_RIGHT, 900, 'the flames to go out');
  c.flag('flames_out');
  yield* go(c, 4);                                   // out of Earth's way
  yield* waitFlag(c, 'g1_open');
  yield* go(c, 18);
  yield* hop(c);                                     // the neutral gem
  yield* go(c, 19);
  c.flag('step_ready');
  yield* waitFlag(c, 'gate_open');
  yield* go(c, 36);
  c.flag('water_home');
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* hop(c);                                     // the earth gem
  yield* waitFlag(c, 'flames_out');
  yield* until(c, () => c.ent('weigh').s.on === 1, IN_RIGHT, 3000, 'the boulder onto the plate');
  c.flag('g1_open');
  yield* waitFlag(c, 'water_home');
  yield* go(c, 34);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'step_ready');
  yield* go(c, 17.6);
  yield* climbAboard(c, 'water');
  for (let t = 0; t < 150; t++) {                    // and up again, onto the shelf
    yield (t < 30 ? IN_JUMP : 0) | IN_RIGHT;
    if (t > 12 && c.me.grounded) break;
  }
  if (c.bottom !== SHELF) throw new Error(`fire missed the shelf (bottom=${c.bottom})`);
  yield* until(c, () => c.ent('ice').s.gone === 1, IN_RIGHT, 900, 'the ice to melt');
  yield* go(c, 28);
  yield* hop(c);                                     // the fire gem
  yield* go(c, 29);
  yield* interact(c);                                // the lever
  c.flag('gate_open');
  yield* go(c, 38);
  c.flag('fire_home');
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'pillars',
  sets: [{ elements: ['fire', 'water', 'earth'], scripts: { fire, water, earth } }],
  roles: {
    'earth,fire,water': {
      water: 'Puts out the flames, then stands still and lets Fire climb up it.',
      earth: 'Rolls the boulder onto the heavy plate that opens the inner gate.',
      fire: 'Goes up on Water, melts the ice on the shelf and pulls the lever.',
    },
  },
};
