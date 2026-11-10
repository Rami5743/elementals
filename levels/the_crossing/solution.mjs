import { IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, until, waitFlag } from '../../kit.mjs';
import { hop } from '../_lib.mjs';

const GALLERY = 12 * TILE;
const liftHome = (c) => c.ent('lift').s.x <= 12 * TILE + 4 && c.ent('lift').s.y >= 19 * TILE - 4;

/** Wait for the shuttle at its berth, board it and ride to the gallery. */
function* ride(c, wait, berth, off) {
  yield* go(c, wait);
  yield* until(c, () => !liftHome(c), 0, 4000, 'the shuttle to set off');
  yield* until(c, () => liftHome(c), 0, 6000, 'the shuttle to come back');
  yield* go(c, berth);
  yield* until(c, () => c.me.grounded === 1 && c.bottom === GALLERY, 0, 4000, 'the shuttle to reach the gallery');
  yield* go(c, off);
}

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* hop(c);                                     // the fire gem
  yield* until(c, () => c.ent('ice').s.gone === 1, IN_LEFT, 900, 'the ice to melt');
  c.flag('ice_out');
  yield* go(c, 10);                                  // clear of Earth's road
  c.flag('fire_set');
  yield* waitFlag(c, 'plate_on');
  yield* ride(c, 10, 13, 28);
  yield* waitFlag(c, 'water_home');
  yield* go(c, 35);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* waitFlag(c, 'ice_out');
  yield* go(c, 11);
  c.flag('water_set');
  yield* waitFlag(c, 'plate_on');
  yield* ride(c, 11, 14, 30.4);
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_RIGHT, 900, 'the flames to go out');
  c.flag('flames_out');
  yield* go(c, 37);
  c.flag('water_home');
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'ice_out');
  yield* waitFlag(c, 'fire_set');
  yield* waitFlag(c, 'water_set');
  yield* go(c, 7.4);                                 // round to the far side of the boulder
  yield* until(c, () => c.ent('weigh').s.on === 1, IN_LEFT, 3000, 'the boulder onto the heavy plate');
  c.flag('plate_on');
  yield* ride(c, 9, 12, 27);
  yield* waitFlag(c, 'flames_out');
  yield* go(c, 33);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'the_crossing',
  sets: [{ elements: ['fire', 'water', 'earth'], scripts: { fire, water, earth } }],
  roles: {
    'earth,fire,water': {
      fire: 'Melts the ice that shuts the western end off.',
      earth: 'Rolls the boulder onto the heavy plate that sets the shuttle running.',
      water: 'Puts out the flames on the gallery.',
    },
  },
};
