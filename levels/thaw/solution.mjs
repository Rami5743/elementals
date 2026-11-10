import { IN_RIGHT, TILE } from '../../kit.mjs';
import { go, until, waitFlag } from '../../kit.mjs';
import { hop } from '../_lib.mjs';

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* hop(c);                              // the fire gem
  yield* go(c, 12);
  yield* until(c, () => c.ent('ice').s.gone === 1, IN_RIGHT, 900, 'the ice to melt');
  c.flag('ice_out');
  yield* go(c, 11);                           // back off so water can get past
  yield* waitFlag(c, 'frozen');
  yield* go(c, 37);                           // across the frozen tunnel, home
  c.flag('fire_across');
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* waitFlag(c, 'ice_out');
  yield* go(c, 30);                           // swim the tunnel to the freeze pad
  yield* until(c, () => c.ent('pool').s.on === 1, 0, 300, 'the pool to freeze');
  c.flag('frozen');
  yield* waitFlag(c, 'fire_across');
  yield* go(c, 32);
  yield* hop(c);                              // the neutral gem
  yield* go(c, 35);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'thaw',
  sets: [{ elements: ['fire', 'water'], scripts: { fire, water } }],
  roles: {
    'fire,water': {
      fire: 'Melts the ice that shuts the near bank, then crosses once the pool is frozen.',
      water: 'Swims the tunnel and holds the freeze pad on the far side.',
    },
  },
};
