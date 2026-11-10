import { IN_RIGHT, TILE } from '../../kit.mjs';
import { go, until, waitFlag } from '../../kit.mjs';
import { hop } from '../_lib.mjs';

const TOP = 11 * TILE;
const BOTTOM = 20 * TILE;
const atTop = (c) => c.ent('lift').s.y <= TOP;
const atBottom = (c) => c.ent('lift').s.y >= BOTTOM;

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* go(c, 14);                      // stand on the parked lift
  c.flag('fire_aboard');
  yield* until(c, () => atTop(c), 0, 1500, 'the lift to reach the top');
  yield* go(c, 18);                      // step off onto the upper floor
  c.flag('fire_up');
  yield* until(c, () => c.ent('ice').s.gone === 1, IN_RIGHT, 900, 'the ice to melt');
  yield* go(c, 21);                      // wait beside the crate until water is on the lift
  yield* waitFlag(c, 'water_aboard');
  yield* until(c, () => c.ent('crate').s.x >= 35 * TILE, IN_RIGHT, 2500, 'the crate over the edge');
  c.flag('crate_away');
  yield* go(c, 32);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* hop(c);                         // the neutral gem
  yield* waitFlag(c, 'fire_aboard');
  yield* go(c, 35);                      // onto the plate: the lift goes up
  yield* waitFlag(c, 'fire_up');
  yield* go(c, 31);                      // off it again: the lift comes back for water
  yield* until(c, () => atBottom(c), 0, 1500, 'the lift to come back down');
  yield* go(c, 14);                      // board the lift and wait for the crate to take over
  if (c.bottom !== BOTTOM) throw new Error(`water is not on the lift (bottom=${c.bottom})`);
  c.flag('water_aboard');
  yield* until(c, () => atTop(c), 0, 2500, 'the lift to reach the top');
  yield* go(c, 18);
  yield* go(c, 30);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'service_lift',
  sets: [{ elements: ['fire', 'water'], scripts: { fire, water } }],
  roles: {
    'fire,water': {
      fire: 'Rides up first, melts the ice and rolls the crate off the edge onto the plate.',
      water: 'Holds the plate to send Fire up, then waits on the lift for the crate to take over.',
    },
  },
};
