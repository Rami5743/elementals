// Gangway: the lift's platform is the only floor over the sludge. It cannot be a floor and a lift at once.
import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, interact, pound, until, wait, waitFlag } from '../../kit.mjs';
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
const fire = function* (c) {
  yield* bound(c, 17);                               // aboard, while the gangway is still a floor
  c.flag('fire_aboard');
  yield* until(c, () => c.ent('lift').s.y === 8 * TILE, 0, 900, 'the top of the shaft');
  yield* go(c, 19);
  yield* clear(c, 'icewall');
  yield* go(c, 23);                                  // the fire gem, then the lever
  yield* interact(c);
  yield* until(c, () => c.ent('vault').s.open > 0, 0, 300, 'the vault');
  c.flag('vault_open');
  yield* waitFlag(c, 'earth_down');
  yield* go(c, 17);                                  // back down the shaft onto the lift
  yield* until(c, () => c.me.grounded === 1 && c.bottom >= 14 * TILE, 0, 600, 'the gangway');
  yield* go(c, 29);
  yield* until(c, () => c.me.grounded === 1 && c.bottom === 18 * TILE, 0, 300, 'the vault floor');
  yield* go(c, 31);
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* waitFlag(c, 'fire_aboard');
  yield* bound(c, 8);                                // its gem, past the turbine
  yield* go(c, 6);                                   // on the turbine: the gangway becomes a lift
  yield* until(c, () => c.ent('lift').s.y === 8 * TILE, 0, 900, 'the lift at the top');
  c.flag('lift_up');
  yield* waitFlag(c, 'vault_open');
  yield* go(c, 2);                                   // off the turbine: the lift comes back down
  yield* until(c, () => c.ent('lift').s.y === 14 * TILE, 0, 900, 'the gangway back');
  c.flag('lift_down');
  yield* wait(c, 900);
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'lift_down');
  yield* bound(c, 29);                               // over the gangway and onto the cracked floor
  for (let t = 0; t < 14; t++) yield IN_JUMP;
  yield* pound(c);
  yield* until(c, () => c.me.grounded === 1 && c.bottom === 18 * TILE, 0, 300, 'the vault floor');
  yield* go(c, 27);
  c.flag('earth_down');
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'gangway',
  sets: [{ elements: ['fire', 'earth', 'air'], scripts: { fire, earth, air } }],
  roles: {
    'air,earth,fire': {
      air: 'The only one who can spin the turbine, and so the only one who decides whether the platform is a lift or a floor.',
      fire: 'Rides up and melts the ice in the loft to reach the lever that opens the vault.',
      earth: 'Crosses once the platform is back down, and breaks the cracked floor into the vault.',
    },
  },
};
