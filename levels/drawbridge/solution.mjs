// Drawbridge: solution scripts. See NOTES.md for the plan these follow.
import { IN_LEFT, IN_RIGHT, IN_JUMP, TILE, go, until, interact, waitFlag, wait } from '../../kit.mjs';

const HALL_FLOOR = 20 * TILE; // feet on the pool or the dry floor of the hall
const STEP = 19 * TILE; // feet on the raised step by the hoist

/** A hopping walk: jumps whenever grounded, so it clears the stone or a partner. */
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

/** Stand still until this player has fallen through and landed in the hall. */
function* landInHall(c, what) {
  // on the pool, the ice, the dry floor, or on top of the floating stone
  yield* until(c, () => c.me.grounded === 1 && c.bottom >= HALL_FLOOR - TILE - 1, 0, 900, what);
}

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* go(c, 24); // across the bridge (the mark ignores a light player), past the gem
  yield* go(c, 31); // to the winch lever in the keep
  yield* interact(c); // winch on: the stall in the gatehouse opens, and the hoist comes up empty
  c.flag('fire-across');
  yield* waitFlag(c, 'stone-home');
  yield* interact(c); // winch off: the hoist goes back down to the hall (the stall shuts, harmlessly)
  yield* waitFlag(c, 'aboard');
  yield* interact(c); // winch on: the hoist rises through the grating with both of them
  yield* go(c, 38); // the gate is already open: the stone is on its plate
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* until(c, () => c.player('fire').x > c.me.x + 2 * TILE, 0, 600, 'Fire to go past');
  yield* go(c, 22); // out beyond the mark, over the stone
  c.flag('water-out');
  yield* landInHall(c, 'Water to be dropped into the pool');
  yield* go(c, 19); // the gem over the pool
  yield* go(c, 9); // the freeze pad
  yield* until(c, () => c.ent('pool').s.on === 1, 0, 60, 'the pool to freeze');
  c.flag('frozen');
  yield* waitFlag(c, 'earth-aboard');
  yield* bound(c, 26); // over the ice
  yield* bound(c, 32); // over the stone on its plate and up the step
  yield* go(c, 33); // on to the hoist beside Earth
  c.flag('aboard');
  yield* until(c, () => c.ent('hoist').s.d >= 10 * TILE - 1, 0, 900, 'the hoist to reach the keep');
  yield* go(c, 36);
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'fire-across');
  yield* until(c, () => c.ent('stall').s.open >= 3 * TILE, 0, 300, 'the stall to open');
  yield* until(c, () => c.tx >= 9, IN_RIGHT, 600, 'the stone to be out on the bridge');
  yield* waitFlag(c, 'water-out');
  // shunt the stone east until it is on the mark
  yield* until(c, () => c.ent('mark').s.on === 1, IN_RIGHT, 600, 'the stone to reach the mark');
  c.flag('stone-on-mark');
  // back off at once, all the way to the gatehouse floor: the bridge is being eaten from the far end
  // towards us, and when it grows back it slides out and carries whoever is on it into the mark
  yield* go(c, 7);
  yield* until(c, () => c.ent('stone').s.y > 12 * TILE, 0, 600, 'the stone to fall');
  yield* until(c, () => c.ent('bridge').s.open === 0, 0, 600, 'the bridge to grow back');
  yield* waitFlag(c, 'frozen');
  // step on to the mark and let the floor come and take us down on to the ice
  yield* go(c, 14);
  yield* landInHall(c, 'Earth to land on the ice');
  yield* bound(c, 12); // back over the stone, to its west side
  yield* until(c, () => c.ent('weigh').s.on === 1, IN_RIGHT, 900, 'the stone to reach the gate plate');
  c.flag('stone-home');
  yield* wait(c, 10);
  yield* bound(c, 31); // over the stone and up the step, clear of the hoist's shaft
  yield* until(c, () => c.ent('hoist').s.d === 0, 0, 900, 'the hoist to come back down');
  yield* go(c, 34); // on to the hoist, far side
  c.flag('earth-aboard');
  yield* until(c, () => c.ent('hoist').s.d >= 10 * TILE - 1, 0, 900, 'the hoist to reach the keep');
  yield* go(c, 37);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  sets: [
    {
      elements: ['fire', 'water', 'earth'],
      scripts: { fire, water, earth },
    },
  ],
  roles: {
    'fire,water,earth': {
      fire: 'Crosses to the keep, where only a light player can go, and works the hoist.',
      water: 'Rides the first drop into the flooded hall and freezes the pool from below.',
      earth: 'Puts the stone on the mark and backs off, then follows it down and pushes it on to the gate plate.',
    },
  },
};
