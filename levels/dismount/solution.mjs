import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, interact, leap, until, waitFlag } from '../../kit.mjs';
import { climbAboard, hop } from '../_lib.mjs';

const GALLERY = 11 * TILE;
const FLOOR = 20 * TILE;
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
  for (let t = 0; t < 200; t++) {                    // off the ledge, then glide, braking short of the lava
    const d = 20 * TILE + 16 - c.cx;
    yield IN_JUMP | (Math.abs(d) < 8 ? 0 : d > 0 ? IN_RIGHT : IN_LEFT);
    if (t > 20 && c.me.grounded) break;
  }
  yield* go(c, 18.4);
  yield* leap(c, 16.6);                              // up onto the platform at the foot of the shaft
  yield* until(c, () => c.bottom === 19 * TILE, 0, 240, 'up onto the platform');
  c.flag('air_aboard');
  yield* until(c, () => c.bottom === GALLERY, 0, 900, 'the platform to reach the gallery');
  yield* go(c, 19);                                  // off, onto the gallery itself
  yield* go(c, 30);
  yield* hop(c);                                     // the air gem
  yield* go(c, 32);                                  // off the gallery's right end, past the lava
  yield* until(c, () => c.me.grounded === 1 && c.bottom === FLOOR, 0, 300, 'the floor below');
  c.flag('air_down');
  yield* waitFlag(c, 'gate_open');
  yield* go(c, 37);
  c.flag('air_home');
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
  for (let t = 0; t < 240; t++) {
    yield (t < 30 ? IN_JUMP : 0) | IN_RIGHT;         // jump off Air's head while it still climbs
    if (t > 12 && c.me.grounded) break;
  }
  if (process.env.DISMOUNT_DEBUG) console.log(`delay=${DELAY} landed=${(c.bottom / TILE).toFixed(2)}@x${c.tx.toFixed(1)}`);
  if (c.bottom !== GALLERY) throw new Error(`fire missed the gallery (bottom=${c.bottom}, x=${c.tx.toFixed(1)})`);
  yield* go(c, 22);                                  // the neutral gem
  yield* go(c, 24);
  yield* waitFlag(c, 'air_aboard');
  yield* interact(c);                                // lever on: the platform rises, the gate shuts
  yield* until(c, () => c.ent('hoist').s.y <= 12 * TILE, 0, 900, 'the platform to rise');
  yield* waitFlag(c, 'air_down');
  yield* interact(c);                                // and back again, or the gate never opens
  yield* until(c, () => c.ent('gate').s.open >= 90, 0, 300, 'the gate to open');
  c.flag('gate_open');
  yield* go(c, 32);
  yield* until(c, () => c.me.grounded === 1 && c.bottom === FLOOR, 0, 300, 'the floor below');
  yield* waitFlag(c, 'air_home');
  yield* go(c, 35);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'dismount',
  sets: [{ elements: ['fire', 'air'], scripts: { fire, air } }],
  roles: {
    'air,fire': {
      air: 'Carries Fire out over the hall — a glide only goes down, so the height has to be spent at the right moment — and then rides the platform Fire sends down for it.',
      fire: 'Jumps off Air in mid-flight onto the gallery, works the lever that raises the platform, and has to put it back before anyone can leave.',
    },
  },
};
