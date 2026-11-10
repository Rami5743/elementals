import { IN_JUMP, IN_RIGHT } from '../../kit.mjs';
import { go, leap, pound, until, waitFlag } from '../../kit.mjs';
import { hop } from '../_lib.mjs';

/** The staircase from the floor up to the gallery. */
function* climb(c) {
  yield* go(c, 11);
  yield* leap(c, 13);
  yield* go(c, 14);
  yield* leap(c, 16);
  yield* go(c, 17);
  yield* leap(c, 19);
}

/** Over the post and the boulder wedged against it. */
function* crossPen(c) {
  yield* go(c, 21);
  yield* leap(c, 22);     // onto the post
  yield* go(c, 24.5);     // across the boulder's back and down onto the cracked floor
}

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* hop(c);                           // the neutral gem
  yield* go(c, 9.2);
  yield* until(c, () => c.ent('ice').s.gone === 1, IN_RIGHT, 600, 'the ice to melt');
  yield* climb(c);
  yield* go(c, 20);                        // the fire gem on the gallery
  yield* crossPen(c);
  yield* go(c, 31);                        // off the end of the gallery, out of the way
  c.flag('fire_parked');
  yield* waitFlag(c, 'earth_home');
  yield* go(c, 35);
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* go(c, 3);                         // the earth gem, in the mud
  yield* waitFlag(c, 'fire_parked');
  yield* climb(c);
  yield* crossPen(c);
  for (let t = 0; t < 14; t++) yield IN_JUMP;
  yield* pound(c);                         // the cracked floor gives way under the boulder
  if (c.ent('boards').s.gone !== 1) throw new Error('the cracked floor did not break');
  yield* until(c, () => c.ent('weigh').s.on === 1, 0, 400, 'the boulder to settle on the plate');
  yield* go(c, 37);
  c.flag('earth_home');
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'quarry',
  sets: [{ elements: ['fire', 'earth'], scripts: { fire, earth } }],
  roles: {
    'fire,earth': {
      fire: 'Melts the ice that opens the passage, then keeps out of the way past the gallery.',
      earth: 'Climbs into the pen and drops the boulder through the cracked floor onto the plate.',
    },
  },
};
