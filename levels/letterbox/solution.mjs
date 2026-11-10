// Letterbox: a one-way grating holds the boulder up. Only a closing door pushes it through.
import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, interact, until, wait, waitFlag } from '../../kit.mjs';
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

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* clear(c, 'icewall');
  c.flag('ice_out');
  yield* waitFlag(c, 'flames_out');
  yield* go(c, 23);
  c.flag('fire_set');
  yield* waitFlag(c, 'water_home');
  yield* go(c, 31);
  c.flag('fire_home');
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* waitFlag(c, 'ice_out');
  yield* bound(c, 9);
  yield* clear(c, 'flames');
  c.flag('flames_out');
  yield* waitFlag(c, 'fire_set');
  yield* go(c, 26);
  c.flag('water_set');
  yield* waitFlag(c, 'stone_set');
  yield* go(c, 25);
  yield* interact(c);                                // the lid comes down on the boulder
  yield* until(c, () => c.ent('weigh').s.on === 1, 0, 900, 'the stone through the grating');
  yield* interact(c);                                // and up again, to let Earth past
  yield* until(c, () => c.ent('lid').s.open > 0, 0, 300, 'the lid');
  c.flag('lid_open');
  yield* go(c, 32);
  c.flag('water_home');
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'water_set');
  yield* bound(c, 13);                               // in behind the boulder
  yield* until(c, () => c.ent('rock_1').s.x >= 19 * TILE, IN_RIGHT, 900, 'the boulder onto the grating');
  yield* go(c, 16);                                  // out from under it
  c.flag('stone_set');
  yield* waitFlag(c, 'fire_home');
  yield* go(c, 30);
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'letterbox',
  sets: [{ elements: ['fire', 'water', 'earth'], scripts: { fire, water, earth } }],
  roles: {
    'earth,fire,water': {
      earth: 'The only one who can move the boulder, and the only one who can put it under the lid.',
      water: 'Puts out the flames, then works the lever that brings the lid down and takes it back up.',
      fire: 'Melts the ice at the mouth of the hall.',
    },
  },
};
