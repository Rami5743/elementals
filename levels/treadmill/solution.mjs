// Treadmill: three tiles of belt running at exactly the speed Earth runs.
import { IN_JUMP, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, interact, pound, until, wait, waitFlag } from '../../kit.mjs';
import { clear } from '../_lib.mjs';
import { IN_LEFT } from '../../kit.mjs';

/** Walk toward tile `x`, hopping, so a partner in the corridor is no obstacle. */
function* bound(c, x, hold = 14, max = 600) {
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

/** Walk against the belt. Only Fire, Water and Air gain ground on it. */
function* lean(c, max = 1200) {
  yield* until(c, () => c.tx >= 16.4, IN_RIGHT, max, `${c.me.element} across the treadmill`);
}

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* clear(c, 'icewall');
  c.flag('ice_out');
  yield* waitFlag(c, 'water_across');
  yield* lean(c);
  yield* go(c, 20);
  c.flag('fire_across');
  yield* waitFlag(c, 'vault_open');
  yield* go(c, 29);
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* waitFlag(c, 'ice_out');
  yield* bound(c, 9);                                // over Fire, which is holding the ice
  yield* clear(c, 'flames');
  yield* lean(c);
  yield* go(c, 22);
  c.flag('water_across');
  yield* waitFlag(c, 'vault_open');
  yield* go(c, 31);
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* waitFlag(c, 'fire_across');
  yield* lean(c);
  yield* go(c, 18);                                  // the turbine opens the cellar gate
  yield* until(c, () => c.ent('gate_c').s.open > 0, 0, 300, 'the cellar gate');
  c.flag('gate_open');
  yield* waitFlag(c, 'vault_open');
  yield* go(c, 27);
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'gate_open');                   // nobody left on the cracked floor
  yield* go(c, 11);
  for (let t = 0; t < 14; t++) yield IN_JUMP;
  yield* pound(c);                                   // down into the cellar
  yield* until(c, () => c.me.grounded === 1 && c.bottom === 20 * TILE, 0, 180, 'the cellar floor');
  yield* go(c, 30);
  yield* interact(c);                                // the lever that opens the vault
  yield* until(c, () => c.ent('vault').s.open > 0, 0, 300, 'the vault');
  c.flag('vault_open');
  yield* go(c, 31);
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'treadmill',
  sets: [{ elements: ['fire', 'water', 'earth', 'air'], scripts: { fire, water, earth, air } }],
  roles: {
    'air,earth,fire,water': {
      fire: 'Melts the ice at the mouth of the hall.',
      water: 'Puts out the flames behind it.',
      air: 'Spins the turbine that opens the cellar gate under the treadmill.',
      earth: 'Too slow for the belt: breaks the cracked floor, goes under it, and throws the lever that opens the vault for the other three.',
    },
  },
};
