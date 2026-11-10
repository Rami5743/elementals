// Lofts: one updraft. Air rises fifteen tiles, Fire and Water are carried ten across, Earth drops straight through.
import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, until, wait, waitFlag } from '../../kit.mjs';
import { clear, pushTo } from '../_lib.mjs';

/** Walk toward tile `x`, hopping, so a partner in the corridor is no obstacle. */
function* bound(c, x, hold = 14, max = 900) {
  const goal = x * TILE + TILE / 2;
  let h = 0;
  for (let t = 0; t < max; t++) {
    const d = goal - c.cx;
    if (Math.abs(d) < 10 && c.me.grounded === 1) return;
    if (c.me.grounded === 1) h = hold;
    yield (d > 0 ? IN_RIGHT : IN_LEFT) | (h-- > 0 ? IN_JUMP : 0);
  }
  throw new Error(`${c.me.element} could not bound to ${x} (at ${c.tx.toFixed(1)})`);
}

/** Run off the lip at tile 11 and jump into the wind. */
function* sail(c, max = 400) {
  yield* go(c, 11);
  for (let t = 0; t < max; t++) {
    yield IN_RIGHT | (t < 30 ? IN_JUMP : 0);
    if (t > 40 && c.me.grounded === 1) return;
  }
  throw new Error(`${c.me.element} never came down (at ${c.tx.toFixed(1)})`);
}

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* pushTo(c, 'rock_1', 4, -1);                 // the boulder onto the heavy plate
  yield* until(c, () => c.ent('weigh').s.on === 1, 0, 300, 'the boulder on the plate');
  c.flag('weigh_on');
  yield* go(c, 2);                                   // its own gem, and then its own door
  yield* waitFlag(c, 'all_away');
  yield* go(c, 10);
  yield* wait(c, 900);
};

/** Into the wind and then let it work: Air rises only if it stops steering. */
function* soar(c, max = 600) {
  yield* go(c, 11);
  for (let t = 0; t < 20; t++) yield IN_RIGHT | IN_JUMP;
  yield* until(c, () => c.bottom <= 6 * TILE, 0, 400, 'up to the loft');
  for (let t = 0; t < max; t++) {
    yield IN_RIGHT;
    if (c.me.grounded === 1) return;
  }
  throw new Error(`air never landed in the loft (at ${c.tx.toFixed(1)})`);
}

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* waitFlag(c, 'weigh_on');
  yield* soar(c);                                    // straight up into the loft
  yield* go(c, 24);
  yield* until(c, () => c.ent('gate').s.open > 0, 0, 300, 'the vault');
  c.flag('gate_open');
  yield* waitFlag(c, 'water_home');
  yield* go(c, 27);                                  // down the chute into the lower hall
  yield* until(c, () => c.me.grounded === 1 && c.bottom === 18 * TILE, 0, 300, 'the lower hall');
  yield* go(c, 31);
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'gate_open');
  yield* sail(c);                                    // carried across, never lifted
  yield* go(c, 23);
  yield* clear(c, 'icewall');
  c.flag('ice_out');
  yield* waitFlag(c, 'water_home');
  yield* go(c, 32);
  c.flag('all_away');
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* waitFlag(c, 'ice_out');
  yield* sail(c);
  yield* bound(c, 25);                               // over Fire, and the water gem on the way
  yield* clear(c, 'flames');
  yield* go(c, 33);
  c.flag('water_home');
  yield* wait(c, 900);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'lofts',
  sets: [{ elements: ['fire', 'water', 'earth', 'air'], scripts: { fire, water, earth, air } }],
  roles: {
    'air,earth,fire,water': {
      earth: 'Too heavy for the wind: stays behind and holds the vault\'s first key down with the boulder.',
      air: 'The only one the wind lifts, up to the loft and the turbine — the second key.',
      fire: 'Carried across the shaft by the wind, and melts the ice in the lower hall.',
      water: 'Carried across behind Fire, and puts out the flames.',
    },
  },
};
