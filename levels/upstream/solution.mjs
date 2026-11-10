import { IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, leap, until, waitFlag } from '../../kit.mjs';
import { hop, hopAlong } from '../_lib.mjs';

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* go(c, 3);
  yield* hop(c);                                     // the fire gem
  yield* until(c, () => c.ent('ice').s.gone === 1, IN_RIGHT, 900, 'the ice to melt');
  c.flag('ice_out');
  yield* go(c, 11);
  yield* hopAlong(c, 27);                            // up the belt, hop by hop
  yield* go(c, 28);
  yield* leap(c, 30.5);                              // over the boulder
  yield* go(c, 32);                                  // out of Earth's way
  c.flag('fire_across');
  yield* waitFlag(c, 'earth_home');
  yield* go(c, 35);
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'fire_across');
  yield* go(c, 11);
  yield* hopAlong(c, 27);                            // up the belt, taking the gem on the way
  yield* go(c, 28);
  yield* leap(c, 30.5);                              // over the boulder, and its gem
  yield* until(c, () => c.ent('weigh').s.on === 1, IN_LEFT, 2500, 'the boulder onto the heavy plate');
  yield* until(c, () => c.ent('gate').s.open >= 64, 0, 400, 'the gate to open');
  yield* go(c, 37);
  c.flag('earth_home');
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'upstream',
  sets: [{ elements: ['fire', 'earth'], scripts: { fire, earth } }],
  roles: {
    'fire,earth': {
      fire: 'Melts the ice at the mouth of the tunnel.',
      earth: 'The only one who can move the boulder onto the heavy plate at the far end.',
    },
  },
};
