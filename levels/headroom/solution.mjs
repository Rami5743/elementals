import { IN_RIGHT, TILE } from '../../kit.mjs';
import { go, leap, until, waitFlag } from '../../kit.mjs';
import { hop } from '../_lib.mjs';

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* until(c, () => c.ent('ice').s.gone === 1, IN_RIGHT, 900, 'the ice to melt');
  yield* go(c, 12);
  yield* hop(c);                                     // the fire gem
  yield* go(c, 10);                                  // out of the way
  c.flag('ice_out');
  yield* waitFlag(c, 'doors_open');
  yield* go(c, 1);
  c.flag('fire_home');
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* hop(c);                                     // the turbine latches the inner gate open
  yield* until(c, () => c.ent('g1').s.open >= 64, 0, 300, 'the inner gate');
  yield* go(c, 6);
  yield* hop(c);                                     // the air gem
  yield* waitFlag(c, 'earth_home');
  yield* go(c, 3);
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'ice_out');
  yield* go(c, 11.8);
  yield* leap(c, 14);                                // onto the ledge, and its gem
  c.flag('earth_up');
  yield* waitFlag(c, 'catch_ready');
  yield* until(c, () => c.ent('bould').s.x >= 17 * TILE, IN_RIGHT, 1200, 'the boulder off the ledge');
  c.flag('boulder_off');
  yield* waitFlag(c, 'fire_home');
  yield* go(c, 2);
  c.flag('earth_home');
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* waitFlag(c, 'earth_up');
  yield* go(c, 17);                                  // stand under the lip of the ledge
  c.flag('catch_ready');
  yield* until(c, () => c.ent('bould').s.y > 560 && c.ent('bould').s.y < 600, 0, 1200, 'the boulder on its head');
  yield* go(c, 22);                                  // wading, with the boulder aboard
  yield* go(c, 31);                                  // into the tunnel: the roof takes the boulder off
  yield* until(c, () => c.ent('weigh').s.on === 1, 0, 600, 'the boulder onto the heavy plate');
  c.flag('doors_open');
  yield* go(c, 36);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'headroom',
  sets: [{ elements: ['fire', 'water', 'earth', 'air'], scripts: { fire, water, earth, air } }],
  roles: {
    'air,earth,fire,water': {
      fire: 'Melts the ice that shuts the hall.',
      air: 'Spins the turbine that opens the inner gate.',
      earth: 'The only one who can move the boulder, and tips it off the ledge onto Water.',
      water: 'The only one who can cross, and carries the boulder over on its head.',
    },
  },
};
