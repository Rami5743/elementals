import { IN_JUMP, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, interact, leap, until, waitFlag } from '../../kit.mjs';
import { climbAboard, hop } from '../_lib.mjs';

const GALLERY = 11 * TILE;
const DELAY = Number(process.env.DISMOUNT ?? 80);   // ticks after Air leaves the ledge

/** The three two-tile steps up to the launch ledge. */
function* stairs(c) {
  yield* go(c, 1);
  yield* leap(c, 3);
  yield* leap(c, 5);
  yield* leap(c, 7);
}

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* stairs(c);
  yield* go(c, 8);
  c.flag('ready');
  yield* waitFlag(c, 'aboard');
  c.flag('launch');
  for (let t = 0; t < 200; t++) {
    yield IN_JUMP | IN_RIGHT;                        // jump off the ledge, then glide
    if (t > 20 && c.me.grounded) break;
  }
  c.flag('landed');
  yield* go(c, 28);
  yield* hop(c);                                     // the air gem
  yield* waitFlag(c, 'gate_open');
  yield* go(c, 36);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'ready');
  yield* stairs(c);
  yield* go(c, 6.6);                                 // the fire gem is on the ledge
  yield* climbAboard(c, 'air');
  c.flag('aboard');
  yield* waitFlag(c, 'launch');
  for (let t = 0; t < DELAY; t++) yield 0;
  let peak = c.bottom, peakX = c.tx;
  for (let t = 0; t < 240; t++) {
    if (c.bottom < peak) { peak = c.bottom; peakX = c.tx; }
    yield (t < 30 ? IN_JUMP : 0) | IN_RIGHT;
    if (t > 12 && c.me.grounded) break;
  }
  if (process.env.DISMOUNT_DEBUG) {
    console.log(`delay=${DELAY} peak=${(peak / TILE).toFixed(2)}@x${peakX.toFixed(1)} landed=${(c.bottom / TILE).toFixed(2)}@x${c.tx.toFixed(1)}`);
  }
  if (c.bottom !== GALLERY) throw new Error(`fire missed the gallery (bottom=${c.bottom}, x=${c.tx.toFixed(1)})`);
  yield* go(c, 22);
  yield* go(c, 24);
  yield* interact(c);                                // the lever
  c.flag('gate_open');
  yield* go(c, 27);                                  // off the gallery's right end
  yield* go(c, 34);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'dismount',
  sets: [{ elements: ['fire', 'air'], scripts: { fire, air } }],
  roles: {
    'air,fire': {
      air: 'Carries Fire out over the hall; a glide only goes down, so the height has to be spent at the right moment.',
      fire: 'Jumps off Air in mid-flight onto the gallery and pulls the lever.',
    },
  },
};
