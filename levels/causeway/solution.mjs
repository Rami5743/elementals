// Causeway: four tiles of open water, and a boulder that does not sink.
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

/** Straight across: the floating stone sits flush with both banks. */
function* crossOver(c, home) {
  yield* go(c, home);
}

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* clear(c, 'icewall');
  c.flag('ice_out');
  yield* waitFlag(c, 'water_home');
  yield* crossOver(c, 29);
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* waitFlag(c, 'ice_out');
  yield* bound(c, 9);
  yield* clear(c, 'flames');
  c.flag('flames_out');
  yield* waitFlag(c, 'air_home');
  yield* crossOver(c, 30);
  c.flag('water_home');
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* waitFlag(c, 'stone_in');
  yield* bound(c, 15);                               // the turbine latches the vault open
  yield* until(c, () => c.ent('gate').s.open > 0, 0, 300, 'the vault');
  c.flag('gate_open');
  yield* waitFlag(c, 'earth_home');
  yield* crossOver(c, 31);
  c.flag('air_home');
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'flames_out');
  yield* bound(c, 12);
  yield* pushTo(c, 'rock_1', 19);                    // into the channel, where it floats flush
  c.flag('stone_in');
  yield* waitFlag(c, 'gate_open');
  yield* crossOver(c, 33);
  c.flag('earth_home');
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'causeway',
  sets: [{ elements: ['fire', 'water', 'earth', 'air'], scripts: { fire, water, earth, air } }],
  roles: {
    'air,earth,fire,water': {
      earth: 'The only one who can move the boulder, and the boulder is the only thing that crosses the channel.',
      fire: 'Melts the ice at the mouth of the hall.',
      water: 'Puts out the flames behind it.',
      air: 'Spins the turbine that latches the vault open.',
    },
  },
};
