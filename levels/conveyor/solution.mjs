import { IN_INTERACT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, until, waitFlag } from '../../kit.mjs';
import { hop } from '../_lib.mjs';

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* go(c, 13);
  yield* until(c, () => c.ent('ice').s.gone === 1, IN_RIGHT, 900, 'the ice to melt');
  c.flag('ice_out');
  yield* go(c, 17);
  yield* hop(c);                                   // the fire gem
  yield* waitFlag(c, 'belt_on');
  yield* until(c, () => c.ent('crate').s.x >= 20 * TILE, IN_RIGHT, 900, 'the crate onto the belt');
  yield* until(c, () => c.ent('crate').s.x >= 30 * TILE, 0, 1800, 'the crate to clear the belt');
  yield* waitFlag(c, 'water_home');
  yield* go(c, 3);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* waitFlag(c, 'ice_out');
  yield* go(c, 11);                                // the hold button
  c.flag('belt_on');
  yield* until(c, () => c.ent('crate').s.x >= 30 * TILE, IN_INTERACT, 3000, 'the crate to clear the belt');
  yield* until(c, () => c.ent('weigh').s.on === 1, 0, 300, 'the plate to go down');
  yield* go(c, 10);
  yield* hop(c);                                   // the neutral gem
  yield* go(c, 8);
  yield* hop(c);                                   // the water gem
  yield* go(c, 1);
  c.flag('water_home');
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'conveyor',
  sets: [{ elements: ['fire', 'water'], scripts: { fire, water } }],
  roles: {
    'fire,water': {
      fire: 'Melts the ice and pushes the crate onto the belt while it is running the right way.',
      water: 'Holds the button that reverses the belt until the crate is on the plate.',
    },
  },
};
