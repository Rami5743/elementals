// Jackshaft: the lift's job is to press a boulder into the ceiling and keep it there.
import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, interact, until, wait, waitFlag } from '../../kit.mjs';
import { clear } from '../_lib.mjs';

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
const liftAt = (c, row) => c.ent('hoist').s.y === row * TILE;

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 13);
  yield* clear(c, 'flames', IN_LEFT);
  c.flag('flames_out');
  yield* go(c, 14);                                  // the lever, and it stays there to work it
  yield* waitFlag(c, 'fire_aboard');
  yield* interact(c);                                // up, with Fire aboard
  yield* until(c, () => liftAt(c, 10), 0, 600, 'the lift at the top');
  yield* waitFlag(c, 'fire_off');
  yield* interact(c);                                // and down again, empty
  yield* until(c, () => liftAt(c, 16), 0, 600, 'the lift back down');
  c.flag('lift_down');
  yield* waitFlag(c, 'rock_on');
  yield* interact(c);                                // up for good, with the boulder
  yield* until(c, () => c.ent('vault').s.open > 0, 0, 900, 'the vault');
  c.flag('vault_open');
  yield* go(c, 2);
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'flames_out');
  yield* bound(c, 11);
  yield* clear(c, 'icewall', IN_LEFT);
  c.flag('ice_out');
  yield* bound(c, 21);                               // aboard, while the berth is empty
  c.flag('fire_aboard');
  yield* until(c, () => liftAt(c, 10) && c.me.grounded === 1, 0, 900, 'the top of the shaft');
  yield* go(c, 26);                                  // off onto the loft, and its gem
  yield* go(c, 29);
  c.flag('fire_off');
  yield* wait(c, 900);
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'lift_down');
  yield* until(c, () => c.ent('rock_1').s.x >= 21 * TILE, IN_RIGHT, 900, 'the boulder onto the lift');
  yield* go(c, 19);                                  // back off the berth
  c.flag('rock_on');
  yield* waitFlag(c, 'vault_open');
  yield* go(c, 4);
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'jackshaft',
  sets: [{ elements: ['fire', 'water', 'earth'], scripts: { fire, water, earth } }],
  roles: {
    'fire,water,earth': {
      water: 'Puts out the flames and works the lever: up with Fire, down for the boulder, up for good.',
      fire: 'Melts the ice, and is the one who has to ride before the boulder does.',
      earth: 'The only one who can load the boulder — the only thing that can hold the ceiling plate down and still let everybody go home.',
    },
  },
};
