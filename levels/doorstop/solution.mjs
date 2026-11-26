// Doorstop: solution scripts for Earth + Air, and the shortcuts that must fail.
import { IN_LEFT, IN_RIGHT, IN_JUMP, TILE, go, holdAt, steerTo, until, interact, wait, waitFlag } from '../../kit.mjs';

/** A hopping walk to tile x: clears a boulder or crate in open ground. */
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

const tileOf = (c, id) => (c.ent(id).s.x + 15) / TILE; // centre of a boulder or crate, in tiles
const stillFor = (c, id) => {
  let last = c.ent(id).s.x, n = 0;
  return () => { const x = c.ent(id).s.x; n = x === last ? n + 1 : 0; last = x; return n >= 20; };
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  // 1. Earth's lever, in the mud tunnel: ON frees Air's crate (and shuts Earth's own outer door).
  yield* go(c, 11);
  yield* interact(c);
  c.flag('crate_free');
  // 2. Air wedges its door with the crate, throws its lever (its inner door opens) and goes home.
  yield* waitFlag(c, 'air_home');
  // 3. The undo: Earth's lever back OFF. The stone's second gate opens (Air's lever is ON) and so
  //    does Earth's own outer door.
  yield* interact(c);
  yield* until(c, () => c.ent('outer_e').s.open >= 30, 0, 120, 'the outer door to open');
  yield* until(c, () => c.ent('stone').s.x < 25 * TILE, 0, 300, 'the stone to leave its pen');
  yield* until(c, stillFor(c, 'stone'), 0, 900, 'the stone to roll out and stop');
  // 4. Round the stone and roll it back west, down the mud tunnel, past the lever.
  const sx = tileOf(c, 'stone');
  yield* go(c, sx - 1.6);
  yield* bound(c, sx + 1.4);
  // 5. Push it into the doorway: it stops against the shut inner door, in the slot.
  yield* until(c, () => tileOf(c, 'stone') <= 5.6, IN_LEFT, 900, 'the stone into the slot');
  yield* wait(c, 10);
  // 6. Lever ON again: the outer door shuts on the stone (30 px) and the inner door opens.
  yield* go(c, 11);
  yield* interact(c);
  yield* until(c, () => c.ent('inner_e').s.open >= 30, 0, 200, 'the inner door to open');
  // 7. Push the stone home ahead of you.
  yield* go(c, 2);
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* waitFlag(c, 'crate_free');
  // ride the draught up to Air's floor
  yield* go(c, 20);
  yield* holdAt(c, 20, () => c.me.y < 7 * TILE, 400, 'the draught');
  yield* steerTo(c, 22);
  // push the crate along the mist tunnel until it stops against the shut inner door
  yield* go(c, 28);
  yield* until(c, () => c.ent('crate').s.x >= 34 * TILE, IN_RIGHT, 900, 'the crate into the slot');
  yield* wait(c, 10);
  // back to Air's lever, inside the tunnel: ON shuts the outer door on the crate (28 px)
  yield* go(c, 28);
  yield* interact(c);
  yield* until(c, () => c.ent('inner_a').s.open >= 28, 0, 200, 'the inner door to open');
  // push the crate home ahead of you
  yield* go(c, 37);
  yield* until(c, () => c.me.inDoor === 1, 0, 60, 'Air home');
  c.flag('air_home');
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  sets: [
    {
      elements: ['earth', 'air'],
      scripts: { earth, air },
      shortcuts: [],
    },
  ],
  roles: {
    'earth,air': {
      earth: 'Frees the crate with its lever, then undoes it, wedges its own outer door with the stone and pushes it home.',
      air: 'Rides the draught, wedges its outer door with the crate, frees the stone with its lever and pushes the crate home.',
    },
  },
};
