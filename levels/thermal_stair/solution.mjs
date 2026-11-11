// Thermal Stair: in the draught you rise only while you do not steer.
import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, interact, until, wait, waitFlag } from '../../kit.mjs';


/** Rise with the draught until the feet are inside `[lo, hi]` rows, then steer out to `side`. */
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

/** Rise with the draught until the feet are inside `[lo, hi]` rows, then steer out to `side`. */
function* stepOff(c, lo, hi, side, max = 600) {
  yield* until(c, () => c.bottom <= hi * TILE && c.bottom >= lo * TILE, 0, max, `the draught to reach rows ${lo}-${hi}`);
  yield* until(c, () => c.me.grounded === 1, side, 240, 'the ledge');
}

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* go(c, 9);                                   // into the draught
  yield* stepOff(c, 10, 13, IN_LEFT);                // out at the lower chamber, four tiles of window
  yield* go(c, 5);
  yield* interact(c);                                // the lever that opens the first gate
  yield* until(c, () => c.ent('g1').s.open > 0, 0, 240, 'the first gate');
  c.flag('g1_open');
  yield* until(c, () => c.tx > 8, IN_RIGHT, 240, 'back into the draught');
  yield* stepOff(c, 4, 5, IN_RIGHT);                 // all the way to the top, then sideways
  yield* go(c, 14);
  yield* interact(c);
  yield* until(c, () => c.ent('g2').s.open > 0, 0, 240, 'the second gate');
  c.flag('g2_open');
  yield* go(c, 16);                                  // down the chute to the hall
  yield* until(c, () => c.me.grounded === 1 && c.bottom === 18 * TILE, 0, 300, 'the hall floor');
  yield* waitFlag(c, 'water_home');
  yield* bound(c, 31);
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* until(c, () => c.ent('icewall').s.gone === 1, IN_RIGHT, 900, 'the ice');
  c.flag('ice_out');
  yield* waitFlag(c, 'water_home');
  yield* bound(c, 33);
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* waitFlag(c, 'ice_out');
  yield* bound(c, 19);                               // over Fire, which is holding the melted ice
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_RIGHT, 900, 'the flames');
  c.flag('flames_out');
  yield* waitFlag(c, 'g2_open');
  yield* bound(c, 32);
  c.flag('water_home');
  yield* wait(c, 900);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'thermal_stair',
  sets: [{ elements: ['fire', 'water', 'air'], scripts: { fire, water, air } }],
  roles: {
    'air,fire,water': {
      air: 'The only one the draught lifts, and so the only one who can reach either lever — but only by giving up the climb at the right height.',
      fire: 'Melts the ice across the hall.',
      water: 'Puts out the flames behind it.',
    },
  },
};
