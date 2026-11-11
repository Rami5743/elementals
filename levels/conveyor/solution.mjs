import { IN_INTERACT, IN_JUMP, IN_LEFT, TILE } from '../../kit.mjs';
import { go, until, waitFlag } from '../../kit.mjs';
import { hop } from '../_lib.mjs';

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 7);
  yield* hop(c);                                     // the water gem
  yield* go(c, 25);                                  // the gem in the tunnel: once the boulder
  yield* go(c, 10);                                  // is parked there is no way back in
  // first run: park the boulder on the wide plate, which is what opens the bypass
  yield* until(c, () => c.ent('bould').s.x <= 22 * TILE, IN_INTERACT, 1500, 'the boulder onto the first plate');
  yield* until(c, () => c.ent('bypass').s.open >= 60, 0, 240, 'the bypass to open');
  c.flag('bypass_open');
  yield* waitFlag(c, 'fire_across');                 // let go now and Fire is sealed in for good
  // second run: on to the plate at the end of the tunnel, which is half of the gate
  yield* until(c, () => c.ent('weigh').s.on === 1, IN_INTERACT, 1500, 'the boulder onto the second plate');
  yield* until(c, () => c.ent('gate').s.open >= 90, 0, 300, 'the gate');
  yield* go(c, 1);
  c.flag('water_home');
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* go(c, 33);
  yield* hop(c);                                     // the fire gem
  yield* go(c, 36);
  yield* until(c, () => c.ent('beacon').s.on === 1, 0, 300, 'the torch to light');
  yield* waitFlag(c, 'bypass_open');
  yield* go(c, 30.4);
  yield* until(c, () => c.me.grounded === 1 && c.bottom === 18 * TILE, IN_LEFT | IN_JUMP, 240, 'up onto the shelf');
  yield* go(c, 24);                                  // the neutral gem, over the tunnel
  yield* go(c, 18);
  yield* until(c, () => c.me.grounded === 1 && c.bottom === 20 * TILE, IN_LEFT, 300, 'down into the hall');
  c.flag('fire_across');
  yield* waitFlag(c, 'water_home');
  yield* go(c, 3);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'conveyor',
  sets: [{ elements: ['fire', 'water'], scripts: { fire, water } }],
  roles: {
    'fire,water': {
      water: 'The only one at the button, and so the only one who can move the boulder at all — twice, to two different plates.',
      fire: 'Sealed in on the far side: lights the torch there, and crosses on the shelf the first stop opens.',
    },
  },
};
