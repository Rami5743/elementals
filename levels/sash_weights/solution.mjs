// Sash Weights — solution scripts.
// The lift (pulley platform `rope`, two tiles wide at x=30-31) stops at rows 19 (hall), 15 (first
// floor: the exits), 11 (upper landing) and 7 (top). Its counterweight runs in the sealed shaft at
// x=2 through gratings at rows 11 and 15; the crate `sash` starts on the lower one.
import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE, go, jump, leap, until, wait } from '../../kit.mjs';

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
  // The gem in the upper landing can only be had now, while the crate still stops the lift here.
  // Stepping off sends the empty lift back up to the top, so it is down the tube and up again.
  yield* until(c, () => c.tx <= 26.6, IN_LEFT, 400, 'walking into the upper landing');
  yield* until(c, () => c.bottom >= 19 * TILE && c.me.grounded === 1, IN_LEFT, 600, 'dropping down the tube to the hall');
  c.flag('gem-done');
  yield* climb(c);
  yield* until(c, () => liftRow(c) < 7.1, 0, 2000, 'the empty lift to be back at the top');
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
  yield* until(c, () => c.has('gem-done') && c.player('fire').y < 8 * TILE, 0, 3000, 'Fire to fetch the gem and climb back up');
  yield* climb(c);
  yield* until(c, () => c.has('fire-at-upper-landing'), 0, 2000, 'Fire to stop at the upper landing');
  // Drop down the lift shaft onto the lift beside Fire.
  yield* go(c, 32.5);
  yield* until(c, () => c.bottom > 8 * TILE && c.me.grounded === 1, IN_LEFT, 300, 'dropping onto the lift');
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

// ---- Shortcuts that must fail ----

/** Ride down alone, step off wherever it stops, and head for the exit. */
function* rideAloneAndTry(c, exitX, after) {
  if (after) yield* until(c, () => c.has(after), 0, 4000, `waiting for ${after}`);
  yield* climb(c);
  yield* until(c, () => liftRow(c) < 7.1, 0, 2000, 'the empty lift to be at the top');
  yield* boardLift(c);
  yield* liftSettles(c);
  c.flag(c.me.element + '-rode');
  yield* until(c, () => c.tx <= exitX + 0.2, IN_LEFT, 400, 'the exit');
}
/** @type {import('../../kit.mjs').Script} */
const fireAlone = function* (c) { yield* rideAloneAndTry(c, 26); };
/** @type {import('../../kit.mjs').Script} */
const waterAlone = function* (c) {
  yield* until(c, () => c.player('fire').y < 8 * TILE, 0, 3000, 'Fire to be ahead on the climb');
  yield* rideAloneAndTry(c, 28, 'fire-rode');
};

/** Fire tries to get into the first floor early by a double jump off Water's head through the
 * drop hole (it falls short; even if it made it, it would be harmless: Water still needs the crate
 * moved, which takes two riders), then Water tries the lift alone and stops at the upper landing. */
/** @type {import('../../kit.mjs').Script} */
const waterLaunchesThenRides = function* (c) {
  yield* go(c, 25);
  c.flag('ladder');
  yield* until(c, () => c.has('on-head'), 0, 600, 'Fire on her head');
  yield* wait(c, 10);
  yield* wait(c, 20, IN_JUMP); // jump with Fire aboard
  yield* until(c, () => c.has('fire-tried'), 0, 600, 'Fire to try');
  yield* rideAloneAndTry(c, 28);
};
/** @type {import('../../kit.mjs').Script} */
const fireDoubleJumps = function* (c) {
  yield* until(c, () => c.has('ladder'), 0, 600, 'Water to stand under the hole');
  yield* go(c, 23);
  yield* leap(c, 25, 30); // onto Water's head
  if (c.bottom !== c.player('water').y) throw new Error("fire is not on Water's head");
  c.flag('on-head');
  yield* until(c, () => c.player('water').vy < 0, 0, 200, 'Water to jump');
  yield* wait(c, 18);
  yield* jump(c, 0, { hold: 30 }); // off her head at the top of her jump, up through the hole
  yield* until(c, () => c.me.grounded === 1, IN_RIGHT, 120, 'landing');
  c.flag('fire-tried');
  yield* go(c, 26);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  sets: [
    {
      elements: ['fire', 'water'],
      scripts: { fire, water },
      shortcuts: [
        { name: 'each rides the lift down alone', scripts: { fire: fireAlone, water: waterAlone } },
        { name: "Fire double-jumps off Water's head at the first floor's drop hole; Water rides the lift alone", scripts: { fire: fireDoubleJumps, water: waterLaunchesThenRides } },
      ],
    },
  ],
  roles: {
    'fire,water': {
      fire: 'Rides the lift first and is carried up to the first floor when Water steps off below.',
      water: 'Joins Fire on the lift so that two of them lift the crate, gets off in the hall, then rides down alone.',
    },
  },
};
