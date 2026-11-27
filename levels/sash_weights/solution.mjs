// Sash Weights — solution scripts.
// The lift (pulley platform `rope`, two tiles wide at x=30-31) stops at rows 19 (hall), 15 (first
// floor: the exits), 11 (upper landing) and 7 (top). Its counterweight runs in the sealed shaft at
// x=2 through gratings at rows 11 and 15; the crate `sash` starts on the lower one.
import { IN_LEFT, IN_RIGHT, TILE, go, leap, until, wait } from '../../kit.mjs';

const rope = (c) => c.ent('rope').s;
/** Row the lift platform is standing at (its top edge, in tiles). The rope's state follows the
 * counterweight (bottom stop row 19), and the lift is its mirror image (top stop row 7). */
const liftRow = (c) => 7 + (19 * TILE - rope(c).y) / TILE;

/** Stand still until the lift has not moved for `still` ticks. */
function* liftSettles(c, still = 20, max = 3000) {
  // A counterweight held up by the crate on a grating wobbles by a pixel or two: allow 3.
  let last = null, n = 0;
  for (let t = 0; t < max; t++) {
    const y = rope(c).y;
    if (last === null || Math.abs(y - last) > 3) { last = y; n = 0; } else n++;
    if (n >= still) return;
    yield 0;
  }
  throw new Error(`${c.me.element}: the lift never settled (row ${liftRow(c).toFixed(2)})`);
}

/** Walk left off the top landing onto the lift, and stand on its left half. */
function* boardLift(c) {
  yield* until(c, () => c.tx <= 30.9, IN_LEFT, 400, 'stepping onto the lift');
  yield* wait(c, 2);
}

/** From the hall floor up the one-way ledges on the right to the top landing. */
function* climb(c) {
  yield* go(c, 37);
  for (const x of [37, 33.5, 37, 33.5, 37, 37]) {
    const before = c.bottom;
    yield* leap(c, x, 16);
    yield* until(c, () => c.me.grounded === 1, 0, 120, 'landing on a ledge');
    if (c.bottom >= before) throw new Error(`${c.me.element} did not climb from row ${before / TILE} (leap to ${x})`);
  }
  if (Math.round(c.bottom / TILE) !== 7) throw new Error(`${c.me.element} is not on the top landing (row ${c.bottom / TILE})`);
}

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* climb(c);
  // Alone, the lift takes Fire only as far as the upper landing: the crate on the lower grating
  // stops the counterweight.
  yield* boardLift(c);
  yield* liftSettles(c);
  if (Math.abs(liftRow(c) - 11) > 0.1) throw new Error(`fire: lift stopped at row ${liftRow(c)}, not the upper landing`);
  c.flag('fire-at-upper-landing');
  // Water drops onto the lift: two riders lift the crate off its grating and go down to the hall.
  yield* until(c, () => liftRow(c) > 18.5, 0, 1500, 'the lift to reach the hall');
  yield* liftSettles(c);
  c.flag('both-in-hall');
  // Water gets off; Fire, alone again, is carried back up and the crate is caught one grating
  // higher, so the lift stops at the first floor.
  yield* until(c, () => liftRow(c) < 18.5, 0, 1500, 'the lift to rise again');
  yield* liftSettles(c);
  if (Math.abs(liftRow(c) - 15) > 0.1) throw new Error(`fire: lift stopped at row ${liftRow(c)}, not the first floor`);
  yield* go(c, 26);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* until(c, () => c.player('fire').y < 12 * TILE, 0, 2000, 'Fire to get up the climb');
  yield* climb(c);
  yield* until(c, () => c.has('fire-at-upper-landing'), 0, 2000, 'Fire to stop at the upper landing');
  // Drop down the lift shaft onto the lift beside Fire.
  yield* go(c, 32.5);
  yield* until(c, () => c.me.grounded === 1 && c.tx < 32, IN_LEFT, 300, 'dropping onto the lift');
  yield* go(c, 31);
  yield* until(c, () => c.has('both-in-hall'), 0, 2000, 'the lift to reach the hall');
  // Step off into the hall: Fire rides back up.
  yield* go(c, 34);
  yield* wait(c, 30);
  yield* climb(c);
  // The lift has come back to the top on its own once Fire stepped off.
  yield* until(c, () => c.player('fire').inDoor === 1, 0, 2000, 'Fire to get home');
  yield* until(c, () => liftRow(c) < 7.1, 0, 2000, 'the empty lift to come back up');
  yield* boardLift(c);
  yield* liftSettles(c);
  if (Math.abs(liftRow(c) - 15) > 0.1) throw new Error(`water: lift stopped at row ${liftRow(c)}, not the first floor`);
  yield* go(c, 28);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  sets: [
    {
      elements: ['fire', 'water'],
      scripts: { fire, water },
      shortcuts: [],
    },
  ],
  roles: {
    'fire,water': {
      fire: 'Rides the lift first and is carried up to the first floor when Water steps off below.',
      water: 'Joins Fire on the lift so that two of them lift the crate, gets off in the hall, then rides down alone.',
    },
  },
};
