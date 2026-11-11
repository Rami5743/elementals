// Slipstream: the second switch hangs over the chasm, where only something airborne can touch it.
import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, until, wait, waitFlag } from '../../kit.mjs';
import { clear } from '../_lib.mjs';

/** Walk toward tile `x`, hopping, so the boulder is no obstacle. */
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
const earth = function* (c) {
  yield* waitFlag(c, 'ice_out');
  yield* go(c, 12);                                  // in behind the boulder
  yield* until(c, () => c.ent('rock_1').s.x <= 9 * TILE, IN_LEFT, 900, 'the boulder onto the plate');                 // the boulder onto the heavy plate
  yield* until(c, () => c.ent('weigh').s.on === 1, 0, 300, 'the boulder on the plate');
  c.flag('weigh_on');
  yield* waitFlag(c, 'fire_over');
  yield* bound(c, 2);                                // over the boulder, through the gate its leap opened
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* bound(c, 9);                                // in past the boulder
  yield* clear(c, 'icewall', IN_RIGHT);              // opens the boulder's road to the plate
  yield* go(c, 6);                                   // out of the boulder's road
  c.flag('ice_out');
  yield* waitFlag(c, 'weigh_on');                    // the airborne switch is no use on its own
  yield* bound(c, 12);
  for (let t = 0; t < 70; t++) {                     // the leap: it arms the switch on the way over
    yield IN_RIGHT | (t < 14 ? IN_JUMP : 0);
    if (t > 20 && c.me.grounded === 1) break;
  }
  yield* until(c, () => c.ent('vault').s.open > 0, 0, 240, 'the vault');
  c.flag('fire_over');
  yield* go(c, 22);                                  // its gem, then through the vault
  yield* go(c, 31);
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'slipstream',
  sets: [{ elements: ['fire', 'earth'], scripts: { fire, earth } }],
  roles: {
    'fire,earth': {
      earth: 'The only one who can move the boulder onto the heavy plate — the half of the lock that stays down.',
      fire: 'Makes the leap, and arms the other half of the lock with its own body on the way across.',
    },
  },
};
