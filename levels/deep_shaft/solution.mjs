import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, pound, until, waitFlag } from '../../kit.mjs';
import { hop } from '../_lib.mjs';

const TOP = 10 * TILE;
const BOTTOM = 20 * TILE;
const VAULT = 14 * TILE;
const liftY = (c) => c.ent('lift').s.y;

/** Wait for the shuttle, board it at `berth` and ride up. */
function* ride(c, berth) {
  yield* until(c, () => liftY(c) >= BOTTOM, 0, 5000, 'the shuttle at the bottom');
  yield* go(c, berth);
  yield* until(c, () => liftY(c) <= TOP, 0, 5000, 'the shuttle at the top');
}

/** Drop through the broken floor and walk to a door. */
function* intoVault(c, drop, x) {
  yield* go(c, drop);
  yield* until(c, () => c.me.grounded === 1 && c.bottom === VAULT, 0, 300, 'down into the vault');
  yield* go(c, x);
}

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* go(c, 8);
  yield* until(c, () => c.ent('ice').s.gone === 1, IN_LEFT, 900, 'the ice to melt');
  c.flag('ice_out');
  yield* go(c, 5);
  yield* hop(c);                                     // the fire gem
  yield* until(c, () => c.ent('hold').s.on === 1, IN_LEFT, 3000, 'the crate onto the plate');
  c.flag('crate_on');
  yield* waitFlag(c, 'g1_open');
  yield* ride(c, 17);
  yield* go(c, 21);
  yield* waitFlag(c, 'air_down');
  yield* intoVault(c, 30, 29);
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* go(c, 10);
  yield* hop(c);                                     // the turbine latches the way open
  yield* until(c, () => c.ent('g1').s.open >= 96, 0, 300, 'the way to the shuttle');
  c.flag('g1_open');
  yield* waitFlag(c, 'crate_on');
  yield* ride(c, 18);
  yield* go(c, 22);
  yield* waitFlag(c, 'earth_down');
  yield* intoVault(c, 30, 31);
  c.flag('air_down');
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'crate_on');
  yield* waitFlag(c, 'g1_open');
  yield* ride(c, 19);
  yield* go(c, 23);
  yield* waitFlag(c, 'water_east');
  yield* go(c, 28);                                  // the earth gem
  yield* go(c, 31);
  for (let t = 0; t < 14; t++) yield IN_JUMP;
  yield* pound(c);                                   // the vault floor gives way
  if (c.ent('boards').s.gone !== 1) throw new Error('the cracked floor did not break');
  yield* go(c, 35);
  c.flag('earth_down');
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* waitFlag(c, 'crate_on');
  yield* waitFlag(c, 'g1_open');
  yield* ride(c, 20);
  yield* go(c, 24);                                  // the water gem
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_RIGHT, 900, 'the flames to go out');
  yield* go(c, 34);                                  // clear of the cracked floor
  c.flag('water_east');
  yield* waitFlag(c, 'earth_down');
  yield* intoVault(c, 32, 33);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'deep_shaft',
  sets: [{ elements: ['fire', 'water', 'earth', 'air'], scripts: { fire, water, earth, air } }],
  roles: {
    'air,earth,fire,water': {
      fire: 'Melts the ice and shoves the crate onto the plate that runs the shuttle.',
      air: 'Spins the turbine that opens the way to the shuttle.',
      water: 'Puts out the flames across the loft.',
      earth: 'Breaks the loft floor over the vault.',
    },
  },
};
