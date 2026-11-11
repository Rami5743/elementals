// Ballast Run: a heavy plate two light players cannot hold between them.
import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, until, wait, waitFlag } from '../../kit.mjs';
import { clear } from '../_lib.mjs';

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
const water = function* (c) {
  yield* go(c, 11);
  yield* clear(c, 'flames');
  c.flag('flames_out');
  yield* waitFlag(c, 'belt_running');
  yield* go(c, 33);                                  // clear of the belt before the ballast arrives
  yield* waitFlag(c, 'vault_open');
  yield* go(c, 35);
  yield* wait(c, 900);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'flames_out');
  yield* bound(c, 17);                               // over Water, which is holding the flames
  yield* clear(c, 'icewall');
  yield* until(c, () => c.ent('lamp').s.on === 1, IN_RIGHT, 600, 'the torch');   // the line starts moving
  c.flag('belt_running');
  yield* go(c, 34);                                  // off the belt, ahead of the boulder
  yield* until(c, () => c.ent('weigh').s.on === 1, 0, 900, 'the ballast onto the plate');
  c.flag('vault_open');
  yield* go(c, 36);
  yield* wait(c, 900);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'ballast_run',
  sets: [{ elements: ['fire', 'water'], scripts: { fire, water } }],
  roles: {
    'fire,water': {
      water: 'Puts out the flames that block the line, and would be the obvious thing to put on the plate — which is exactly what does not work.',
      fire: 'Melts the ice on the line and lights the torch that starts it, which is the only way to get something heavy onto the plate.',
    },
  },
};
