// Tripwire: the switch hangs in the lift shaft, and the ride past it is the whole window.
import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, until, wait, waitFlag } from '../../kit.mjs';
import { clear } from '../_lib.mjs';

function* bound(c, x, hold = 14, max = 900) {
  const goal = x * TILE + TILE / 2;
  let h = 0;
  for (let t = 0; t < max; t++) {
    const d = goal - c.cx;
    if (Math.abs(d) < 10 && c.me.grounded === 1) return;
    if (c.me.grounded === 1) h = hold;
    yield (d > 0 ? IN_RIGHT : IN_LEFT) | (h-- > 0 ? IN_JUMP : 0);
  }
  throw new Error(`${c.me.element} could not bound to ${x} (at ${c.tx.toFixed(1)})`);
}

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* go(c, 12);                                  // its gem
  yield* go(c, 11);                                  // the turbine opens the way to the shaft
  yield* until(c, () => c.ent('shaft_gate').s.open > 0, 0, 240, 'the shaft gate');
  c.flag('shaft_open');
  yield* waitFlag(c, 'water_home');
  yield* go(c, 10);
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* waitFlag(c, 'shaft_open');
  yield* bound(c, 15);                               // its gem, then the flames
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_LEFT, 600, 'the flames');
  c.flag('flames_out');
  yield* waitFlag(c, 'fire_home');
  yield* go(c, 18);
  c.flag('water_home');
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'flames_out');
  yield* bound(c, 15);
  yield* clear(c, 'icewall');
  yield* go(c, 15);                                  // in position, five tiles short of the gate
  c.flag('fire_set');
  yield* until(c, () => c.ent('gate').s.open >= 30, 0, 2400, 'the gate as the lift goes by');
  yield* go(c, 26);                                  // run it: the gate shuts behind the lift
  yield* go(c, 31);
  c.flag('fire_home');
  yield* wait(c, 900);
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'shaft_open');
  yield* waitFlag(c, 'fire_set');
  yield* until(c, () => c.ent('hoist').s.y === 17 * TILE, 0, 1200, 'the lift at the berth');
  yield* go(c, 2);                                   // aboard during the pause
  yield* until(c, () => c.me.grounded === 1 && c.bottom <= 8 * TILE, 0, 1800, 'the top of the shaft');
  yield* go(c, 6);                                   // off onto the loft, and its gem
  yield* go(c, 7);
  yield* wait(c, 900);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'tripwire',
  sets: [{ elements: ['fire', 'water', 'earth', 'air'], scripts: { fire, water, earth, air } }],
  roles: {
    'air,earth,fire,water': {
      air: 'The only one a turbine answers to: it opens the way into the shaft.',
      water: 'Puts out the flames across the hall.',
      fire: 'Melts the ice, then waits by the gate and runs it while the lift is going past the switch.',
      earth: 'The only one heavy enough to press the switch in the shaft — and it presses it only for as long as the lift takes to carry it past.',
    },
  },
};
