// Updraft Duet: the draught carries a pair, and the landing at the top is ice on a clock.
import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, interact, until, wait, waitFlag } from '../../kit.mjs';
import { climbAboard } from '../_lib.mjs';

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 10);                                  // the pad: the shelf at the top freezes
  yield* until(c, () => c.ent('shelf').s.on === 1, 0, 300, 'the shelf to freeze');
  c.flag('frozen');
  yield* waitFlag(c, 'air_set');
  yield* go(c, 14.2);                                // leaving the pad starts the thaw
  yield* climbAboard(c, 'air');
  yield* waitFlag(c, 'on_shelf');
  yield* until(c, () => c.me.grounded === 1 && c.bottom === 8 * TILE, IN_RIGHT, 300, 'down off Air onto the shelf');
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_RIGHT, 600, 'the flames');
  yield* go(c, 30);
  yield* interact(c);                                // stops the draught for good, and opens the chute
  yield* until(c, () => c.ent('chute_door').s.open > 0, 0, 240, 'the chute');
  c.flag('lever_done');
  yield* until(c, () => c.ent('crate').s.x >= 33 * TILE, IN_RIGHT, 900, 'the crate into the chute');
  yield* until(c, () => c.ent('weigh').s.on === 1, 0, 600, 'the crate onto the plate below');
  yield* until(c, () => c.bottom > 9 * TILE, IN_RIGHT, 300, 'into the chute');   // and follow it down
  yield* until(c, () => c.me.grounded === 1 && c.bottom >= 19 * TILE, 0, 900, 'the floor of the hall');
  c.flag('water_down');
  yield* go(c, 3);                                   // its gem, behind the gate it opened from above
  yield* go(c, 2);
  yield* wait(c, 900);
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* waitFlag(c, 'frozen');
  yield* go(c, 15);                                  // stand clear of the draught so Water can climb aboard
  c.flag('air_set');
  yield* until(c, () => c.player('water').y + 30 <= c.me.y + 4, 0, 600, 'Water aboard');
  yield* until(c, () => c.cx > 18 * TILE, IN_RIGHT, 300, 'into the draught with Water up top');
  yield* until(c, () => c.me.y < 6 * TILE, 0, 6000, 'up the chimney');
  yield* until(c, () => c.cx > 21.5 * TILE, IN_RIGHT, 400, 'out of the chimney');
  yield* until(c, () => c.me.grounded === 1 && c.bottom === 8 * TILE, 0, 400, 'down on the shelf');
  c.flag('on_shelf');
  yield* waitFlag(c, 'lever_done');
  yield* go(c, 32);                                  // its gem
  yield* go(c, 31);                                  // its gem
  yield* waitFlag(c, 'water_down');
  yield* go(c, 33);
  yield* until(c, () => c.me.grounded === 1 && c.bottom >= 19 * TILE, 0, 900, 'the floor of the hall');
  yield* go(c, 4);
  yield* wait(c, 900);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'updraft_duet',
  sets: [{ elements: ['water', 'air'], scripts: { water, air } }],
  roles: {
    'air,water': {
      water: 'The only one who can freeze the shelf, and the one who has to leave the pad to be carried — which is what starts it melting.',
      air: 'The only one the draught lifts, and the only lift Water has.',
    },
  },
};
