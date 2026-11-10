import { IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, leap, until, waitFlag } from '../../kit.mjs';
import { hop } from '../_lib.mjs';

/** Hop the one-tile cistern, which is deadly to everyone but Water. */
function* overCistern(c) {
  yield* go(c, 17);
  yield* leap(c, 19.2);
}

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* hop(c);                                     // the fire gem
  yield* go(c, 14.4);
  yield* until(c, () => c.ent('ice').s.gone === 1, IN_RIGHT, 900, 'the ice to melt');
  c.flag('ice_out');
  yield* go(c, 14);                                  // out of the way
  yield* waitFlag(c, 'gate_open');
  yield* overCistern(c);
  yield* go(c, 30);
  c.flag('fire_home');
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 10.4);
  yield* leap(c, 8);                                 // over the boulder, to the crate behind it
  yield* until(c, () => c.ent('light').s.on === 1, IN_LEFT, 3000, 'the crate onto the light plate');
  c.flag('crate_on');
  yield* go(c, 8);
  yield* leap(c, 10.6);                              // back over the boulder
  yield* go(c, 12);
  c.flag('water_back');
  yield* waitFlag(c, 'boulder_on');
  yield* waitFlag(c, 'ice_out');
  yield* go(c, 20.4);                                // wading, taking the gem in the cistern
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_RIGHT, 900, 'the flames to go out');
  yield* until(c, () => c.ent('gate').s.open >= 96, 0, 400, 'the gate to open');
  c.flag('gate_open');
  yield* waitFlag(c, 'fire_home');
  yield* go(c, 26);
  c.flag('water_home');
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'water_back');
  yield* go(c, 10.4);                                // the earth gem
  yield* until(c, () => c.ent('heavy').s.on === 1, IN_LEFT, 3000, 'the boulder onto the heavy plate');
  c.flag('boulder_on');
  yield* waitFlag(c, 'water_home');
  yield* overCistern(c);
  yield* go(c, 28);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'cistern',
  sets: [{ elements: ['fire', 'water', 'earth'], scripts: { fire, water, earth } }],
  roles: {
    'earth,fire,water': {
      fire: 'Melts the ice that shuts the hall.',
      earth: 'Rolls the boulder onto the heavy plate.',
      water: 'Fetches the crate from behind the boulder and puts out the flames.',
    },
  },
};
