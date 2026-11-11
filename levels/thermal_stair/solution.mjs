// Thermal Stair: in the draught you rise only while you do not steer, and it only goes up.
import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, interact, until, wait, waitFlag } from '../../kit.mjs';
import { climbAboard, rideAlong } from '../_lib.mjs';

/** Walk toward tile `x`, hopping, so one partner in the way is not a wall. */
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

/** Rise with the draught until the feet are inside rows `[lo, hi]`, then steer out to `side`. */
function* stepOff(c, lo, hi, side, max = 600) {
  yield* until(c, () => c.bottom <= hi * TILE && c.bottom >= lo * TILE, 0, max, `the draught to reach rows ${lo}-${hi}`);
  yield* until(c, () => c.me.grounded === 1, side, 240, 'the ledge');
}

const HALL = 18 * TILE;

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  // first trip: Fire to the middle chamber
  yield* go(c, 6);
  c.flag('air_set');
  yield* waitFlag(c, 'fire_aboard');
  yield* go(c, 9);                                   // into the draught
  yield* stepOff(c, 10, 13, IN_LEFT);                // out at the middle chamber
  yield* go(c, 7);                                   // off Fire, onto the ledge itself
  c.flag('ledge');
  yield* waitFlag(c, 'torch_lit');
  yield* go(c, 6.0);                                 // the air gem
  yield* go(c, 4);                                   // the hole: the only way down from here
  yield* until(c, () => c.me.grounded === 1 && c.bottom === HALL, 0, 300, 'the hall floor');
  yield* go(c, 6);
  c.flag('air_down');
  // second trip: Water to the top
  c.flag('air_back');
  yield* waitFlag(c, 'water_aboard');
  yield* go(c, 9);
  yield* stepOff(c, 5, 6, IN_RIGHT);                 // all the way up, then sideways onto the top floor
  yield* go(c, 12.4);
  c.flag('top');
  yield* waitFlag(c, 'water_home');
  yield* go(c, 16);                                  // the chute down to the hall
  yield* until(c, () => c.me.grounded === 1 && c.bottom === HALL, 0, 300, 'the hall floor');
  yield* bound(c, 31);
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'air_set');
  yield* go(c, 4.6);
  yield* climbAboard(c, 'air');
  c.flag('fire_aboard');
  yield* rideAlong(c, 'air', () => c.has('ledge'));
  yield* go(c, 5);                                   // off Air's head, onto the torch
  yield* until(c, () => c.ent('low_torch').s.on === 1, 0, 300, 'the torch to light');
  c.flag('torch_lit');
  yield* waitFlag(c, 'air_down');                    // Air goes down first: the hole is one body wide
  yield* go(c, 4);                                   // down the hole
  yield* until(c, () => c.me.grounded === 1 && c.bottom === HALL, 0, 300, 'the hall floor');
  yield* go(c, 12);                                  // the fire gem
  yield* bound(c, 26);                               // through the first gate, to wait at the second
  c.flag('fire_waiting');
  yield* waitFlag(c, 'button_on');
  yield* bound(c, 33);
  yield* wait(c, 900);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 22);
  yield* until(c, () => c.me.y < 16 * TILE, IN_JUMP, 120, 'the water gem');
  yield* waitFlag(c, 'air_back');
  yield* go(c, 4.6);
  yield* climbAboard(c, 'air');
  c.flag('water_aboard');
  yield* rideAlong(c, 'air', () => c.has('top'));
  yield* go(c, 12.8);                                // off Air's head
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_RIGHT, 600, 'the flames at the top');
  yield* go(c, 14);
  yield* waitFlag(c, 'fire_waiting');
  yield* interact(c);                                // nine seconds on the clock
  yield* until(c, () => c.ent('g2').s.open > 0, 0, 240, 'the second gate');
  c.flag('button_on');
  yield* go(c, 16);
  yield* until(c, () => c.me.grounded === 1 && c.bottom === HALL, 0, 300, 'the hall floor');
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
      air: 'The only one the draught lifts, and the only ride up: it has to make the trip twice, with a different passenger each time.',
      fire: 'Dropped at the middle chamber to light the torch that opens the first gate for good.',
      water: 'Dropped at the top to put out the flames there and press the button, which gives everyone nine seconds.',
    },
  },
};
