import { IN_LEFT, TILE } from '../../kit.mjs';
import { go, leap, until, waitFlag } from '../../kit.mjs';

const TOP = 11 * TILE;
const BOTTOM = 20 * TILE;
const liftY = (c) => c.ent('lift').s.y;

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 6);                                  // board the shuttle
  c.flag('water_aboard');
  yield* until(c, () => liftY(c) <= TOP, 0, 2500, 'the shuttle to reach the gallery');
  yield* go(c, 9);                                  // step off
  yield* go(c, 12);                                 // the freeze pad
  yield* until(c, () => c.ent('pool').s.on === 1, 0, 300, 'the pool to freeze');
  c.flag('frozen');
  yield* waitFlag(c, 'earth_up');
  yield* go(c, 14);                                 // the water gem
  yield* go(c, 16);
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'water_aboard');
  yield* go(c, 9.5);                                // onto the heavy plate: the shuttle runs
  yield* waitFlag(c, 'frozen');
  yield* go(c, 13);                                 // off the plate again
  yield* go(c, 27);                                 // over the frozen pool and the mud, taking both gems
  yield* leap(c, 29);                               // over the boulder, to its far side
  yield* until(c, () => c.ent('bould').s.x <= 9 * TILE, IN_LEFT, 5000, 'the boulder onto the plate');
  yield* leap(c, 8.4);                              // back over the boulder
  yield* until(c, () => liftY(c) >= BOTTOM, 0, 2500, 'the shuttle to come down');
  yield* go(c, 6);
  yield* until(c, () => liftY(c) <= TOP, 0, 2500, 'the shuttle to reach the gallery');
  yield* go(c, 9);
  c.flag('earth_up');
  yield* go(c, 10);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'wellspring',
  sets: [{ elements: ['water', 'earth'], scripts: { water, earth } }],
  roles: {
    'earth,water': {
      earth: 'Weighs down the plate for Water, then fetches the boulder that takes its place.',
      water: 'Rides up and freezes the pool from the gallery so Earth can cross it.',
    },
  },
};
