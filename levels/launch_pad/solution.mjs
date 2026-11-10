import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, interact, waitFlag } from '../../kit.mjs';
import { climbAboard, hop, waitDoor } from '../_lib.mjs';

const PAD = 22;                                      // where water stands to launch fire
const DELAY = Number(process.env.BOOST_DELAY ?? 12);  // ticks fire waits after water leaves the ground

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 12);
  yield* hop(c);                     // the water gem
  yield* go(c, PAD);
  c.flag('ready');
  yield* waitFlag(c, 'aboard');
  c.flag('jump');
  for (let t = 0; t < 30; t++) yield IN_JUMP;
  for (let t = 0; t < 120 && !c.me.grounded; t++) yield 0;
  yield* waitDoor(c, 'gate', 110);
  yield* go(c, 3);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'ready');
  yield* go(c, PAD - 1.4);
  yield* climbAboard(c, 'water');
  c.flag('aboard');
  yield* waitFlag(c, 'jump');
  for (let t = 0; t < DELAY; t++) yield 0;
  let peak = c.bottom;
  for (let t = 0; t < 240; t++) {
    peak = Math.min(peak, c.bottom);
    yield (t < 30 ? IN_JUMP : 0) | IN_RIGHT;
    if (t > 12 && c.me.grounded) break;
  }
  if (process.env.BOOST_DEBUG) {
    console.log(`delay=${DELAY} peak=${(peak / TILE).toFixed(2)} landed=${(c.bottom / TILE).toFixed(2)} x=${c.tx.toFixed(2)}`);
  }
  if (c.bottom !== 15 * TILE) throw new Error(`fire missed the shelf (bottom=${c.bottom}, peak=${peak})`);
  yield* go(c, 26);
  yield* interact(c);                               // the lever
  yield* go(c, 32);
  yield* go(c, 29);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'launch_pad',
  sets: [{ elements: ['fire', 'water'], scripts: { fire, water } }],
  roles: {
    'fire,water': {
      water: 'The launch pad: Fire stands on its head and they jump in turn.',
      fire: 'Rides the boost up to the shelf and pulls the lever that opens Water’s gate.',
    },
  },
};
