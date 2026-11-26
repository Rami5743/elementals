// Drawbridge: solution scripts. See NOTES.md for the plan these follow.
import { IN_LEFT, IN_RIGHT, IN_JUMP, TILE, go, until, interact, waitFlag, wait, leap } from '../../kit.mjs';

const HALL_FLOOR = 20 * TILE; // feet on the pool or the dry floor of the hall
const KEEP = 10 * TILE - 1; // the hoist's travel to the keep

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

/** Fire crosses to the keep and works the winch: on, off, on, off, on. */
const makeFire = (stack) => function* (c) {
  yield* go(c, 24); // across the bridge (the mark ignores a light player), past the gem
  yield* go(c, 31); // to the winch lever in the keep
  yield* interact(c); // winch on: the stall in the gatehouse opens, and the hoist comes up empty
  c.flag('fire-across');
  yield* waitFlag(c, 'stone-home');
  yield* interact(c); // winch off: the hoist goes back down to the hall (the stall shuts, harmlessly)
  if (stack) {
    yield* waitFlag(c, 'water-aboard'); // both of them on the one-rider hoist, Water on Earth's head
    yield* interact(c);
    yield* until(c, () => c.player('water').x > 34.5 * TILE, 0, 1200, 'the stacked pair to reach the keep');
    yield* go(c, 36);
    return;
  }
  yield* waitFlag(c, 'earth-aboard');
  yield* interact(c); // winch on: the hoist carries Earth up through the grating
  yield* until(c, () => c.player('earth').x > 34.5 * TILE, 0, 900, 'Earth to step off the hoist');
  yield* interact(c); // winch off: the hoist goes down empty for Water (it only ever delivers upward)
  yield* waitFlag(c, 'water-aboard');
  yield* interact(c); // winch on: up again with Water
  yield* until(c, () => c.player('water').x > 34.5 * TILE, 0, 900, 'Water to step off the hoist');
  yield* go(c, 36); // the gate is already open: the stone is on its plate
};

/** Water rides the first drop into the hall, freezes it from below, and comes up second. */
const makeWater = (stack) => function* (c) {
  yield* until(c, () => c.player('fire').x > c.me.x + 2 * TILE, 0, 600, 'Fire to go past');
  yield* go(c, 29); // right out to the far end, where the gem is: the first to fall
  c.flag('water-out');
  yield* landInHall(c, 'Water to be dropped into the hall');
  yield* go(c, 9); // back the length of the hall, through the water, to the freeze pad
  yield* until(c, () => c.ent('pool').s.on === 1, 0, 60, 'the pool to freeze');
  c.flag('frozen');
  yield* waitFlag(c, 'earth-aboard');
  yield* bound(c, 26); // over the ice
  yield* bound(c, 31); // over the stone on its plate and up the step, clear of the shaft
  if (stack) {
    yield* leap(c, 33); // on to Earth's head, standing on the hoist
    c.flag('water-aboard');
    yield* until(c, () => c.ent('hoist').s.d >= KEEP, 0, 1200, 'the hoist to reach the keep with two aboard');
    yield* go(c, 37);
    return;
  }
  yield* until(c, () => c.player('earth').x > 34.5 * TILE, 0, 900, 'Earth to be up');
  yield* until(c, () => c.ent('hoist').s.d === 0, 0, 900, 'the hoist to come back down');
  yield* go(c, 33); // on to the hoist
  c.flag('water-aboard');
  yield* until(c, () => c.ent('hoist').s.d >= KEEP, 0, 900, 'the hoist to reach the keep');
  yield* go(c, 37);
};

/** Earth: out of the stall, stone on the mark, back off; then down after it, and up first. */
function* earthToTheMark(c) {
  yield* waitFlag(c, 'fire-across');
  yield* until(c, () => c.ent('stall').s.open >= 3 * TILE, 0, 300, 'the stall to open');
  yield* until(c, () => c.tx >= 9, IN_RIGHT, 600, 'the stone to be out on the bridge');
  yield* waitFlag(c, 'water-out');
  // shunt the stone east until it is on the mark
  yield* until(c, () => c.ent('mark').s.on === 1, IN_RIGHT, 600, 'the stone to reach the mark');
  c.flag('stone-on-mark');
}
const earth = function* (c) {
  yield* earthToTheMark(c);
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
  yield* go(c, 33); // on to the hoist: it takes one
  c.flag('earth-aboard');
  yield* until(c, () => c.ent('hoist').s.d >= KEEP, 0, 1200, 'the hoist to reach the keep');
  yield* go(c, 38);
};

const fire = makeFire(false);
const water = makeWater(false);

// ---- shortcuts that must fail ---------------------------------------------------------------

/** Earth simply walks over the bridge to the keep once the stall is open. */
const earthWalksAcross = function* (c) {
  yield* waitFlag(c, 'fire-across');
  yield* until(c, () => c.ent('stall').s.open >= 3 * TILE, 0, 300, 'the stall to open');
  yield* until(c, () => c.tx >= 9, IN_RIGHT, 600, 'the stone to be out on the bridge');
  yield* bound(c, 11); // over the stone
  yield* go(c, 38, { max: 1200 }); // straight across to its door
};

/** Earth hops the whole way across, so as to touch the bridge as little as possible. */
const earthHopsAcross = function* (c) {
  yield* waitFlag(c, 'fire-across');
  yield* until(c, () => c.ent('stall').s.open >= 3 * TILE, 0, 300, 'the stall to open');
  yield* until(c, () => c.tx >= 9, IN_RIGHT, 600, 'the stone to be out on the bridge');
  yield* bound(c, 31, 14, 1500);
  yield* go(c, 38);
};

/** Earth shoves the stone over the mark and follows it straight down, before Water has frozen anything. */
const earthFollowsTheStone = function* (c) {
  yield* earthToTheMark(c);
  yield* until(c, () => c.me.grounded === 1 && c.bottom >= HALL_FLOOR - TILE - 1, IN_RIGHT, 900, 'Earth to land in the hall');
  yield* until(c, () => c.ent('weigh').s.on === 1, IN_RIGHT, 900, 'the stone to reach the gate plate');
};

/** A Water that just waits on the far end to be dropped, then sits on the pad, never coming up. */
const waterWaitsOnPad = function* (c) {
  yield* until(c, () => c.player('fire').x > c.me.x + 2 * TILE, 0, 600, 'Fire to go past');
  yield* go(c, 29);
  c.flag('water-out');
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  sets: [
    {
      elements: ['fire', 'water', 'earth'],
      scripts: { fire, water, earth },
      shortcuts: [
        { name: 'Earth walks over the bridge to the keep', scripts: { fire, water: waterWaitsOnPad, earth: earthWalksAcross }, maxTicks: 3000 },
        { name: 'Earth hops over the bridge to the keep', scripts: { fire, water: waterWaitsOnPad, earth: earthHopsAcross }, maxTicks: 3000 },
        { name: 'Earth follows the stone down before the pool is frozen', scripts: { fire, water: waterWaitsOnPad, earth: earthFollowsTheStone }, maxTicks: 3000 },
        { name: 'Water rides the one-rider hoist on Earth\'s head', scripts: { fire: makeFire(true), water: makeWater(true), earth } },
      ],
    },
  ],
  roles: {
    'fire,water,earth': {
      fire: 'Crosses to the keep, where only a light player can go, and works the winch that frees the stone and runs the hoist.',
      water: 'Waits at the far end of the bridge to be thrown into the flooded hall, and freezes it from below.',
      earth: 'Puts the stone on the mark and gets off the bridge before it grows back, then follows it down and pushes it on to the gate plate.',
    },
  },
};
