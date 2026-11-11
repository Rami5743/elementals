import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, until, waitFlag } from '../../kit.mjs';
import { climbAboard, glideTo, hop, rideAlong } from '../_lib.mjs';

/** Fall off a carrier and steer onto tile `x` on the way down. */
function* dropTo(c, x, max = 300) {
  for (let t = 0; t < max; t++) {
    const d = x * TILE + TILE / 2 - c.cx;
    yield Math.abs(d) < 3 ? 0 : d > 0 ? IN_RIGHT : IN_LEFT;
    if (c.me.grounded === 1 && t > 4) return;
  }
  throw new Error(`${c.me.element} never landed dropping to ${x}`);
}

/** Walk toward tile `x` jumping properly, which climbs a two-tile stair step. */
function* bound(c, x, hold = 16, max = 900) {
  const goal = x * TILE + TILE / 2;
  let h = 0;
  for (let t = 0; t < max; t++) {
    const d = goal - c.cx;
    if (Math.abs(d) < 10 && c.me.grounded === 1) return;
    if (c.me.grounded === 1) h = hold;
    yield (d > 0 ? IN_RIGHT : IN_LEFT) | (h-- > 0 ? IN_JUMP : 0);
  }
  throw new Error(`${c.me.element} could not climb to ${x} (at ${c.tx.toFixed(1)})`);
}

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* bound(c, 13);                            // up the dark staircase
  c.flag('ledge');
  yield* waitFlag(c, 'aboard');
  yield* glideTo(c, 32);                             // out over the sludge, losing a passenger on the way
  yield* go(c, 33);
  yield* hop(c);                                     // the air gem
  yield* go(c, 31);                                  // the plate: it sends the lift out to the pillar
  yield* until(c, () => c.ent('lift').s.x <= 23.2 * TILE, 0, 900, 'the lift to reach the pillar');
  c.flag('lift_out');
  yield* waitFlag(c, 'fire_aboard_lift');
  yield* go(c, 33);                                  // off the plate: the lift comes back
  yield* waitFlag(c, 'fire_down');
  yield* go(c, 38);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'ledge');
  yield* bound(c, 12);                            // the fire gem, at the top of the stair
  yield* go(c, 11.6);
  yield* climbAboard(c, 'air');
  c.flag('aboard');
  // ride until Air is over the pillar, then simply stop following: Air glides out from under
  yield* rideAlong(c, 'air', () => c.player('air').x >= 18.5 * TILE);
  // step off backwards: a passenger who does nothing is carried all the way
  yield* dropTo(c, 21);                              // steer down onto the pillar
  yield* go(c, 21);
  yield* until(c, () => c.ent('beacon').s.on === 1, 0, 300, 'the torch to light');
  yield* waitFlag(c, 'lift_out');
  yield* go(c, 23.6);                                // onto the lift
  c.flag('fire_aboard_lift');
  yield* until(c, () => c.ent('lift').s.x >= 28.8 * TILE, 0, 900, 'the lift to come back');
  yield* go(c, 32);
  c.flag('fire_down');
  yield* go(c, 36);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'lantern',
  sets: [{ elements: ['fire', 'air'], scripts: { fire, air } }],
  roles: {
    'fire,air': {
      air: 'The only one who can cross the sludge, and the only ride there is — and afterwards the only one who can call the lift back for the passenger it left behind.',
      fire: 'Gets off halfway, on the pillar, because the torch there is the only thing that opens the gate at the far end.',
    },
  },
};
