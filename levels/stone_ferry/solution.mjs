// Stone Ferry: the stone is the only boat. Air drops it and holds it, the rider boards, Air lets
// go and the turbine's run-down launches it; whoever has just landed holds the lift up while Earth
// rolls the stone back to the trapdoor. Air crosses last: spin, run, jump aboard before it stops.
import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE, go, until, wait, waitFlag } from '../../kit.mjs';

const stone = (c) => c.ent('stone').s;
const stoneTx = (c) => stone(c).x / TILE;

/** Stand still until the stone has not moved for `still` ticks. */
function* stoneSettles(c, still = 12, max = 4000) {
  let last = null, n = 0, t = 0;
  while (n < still) {
    yield 0;
    const at = `${stone(c).x},${stone(c).y}`;
    n = at === last ? n + 1 : 0;
    last = at;
    if (++t > max) throw new Error(`${c.me.element}: the stone never settled`);
  }
}

/** From the slope just uphill of the stone, hop onto it and stand on top (retrying short hops). */
function* board(c, hold = 8) {
  const target = () => stone(c).x + TILE / 2;
  let h = 0, settled = 0;
  for (let t = 0; ; t++) {
    const d = target() - c.cx;
    const on = c.me.grounded === 1 && Math.abs(c.bottom - stone(c).y) <= 2 && Math.abs(d) < 12;
    settled = on ? settled + 1 : 0;
    if (settled >= 4) return;
    if (c.me.grounded === 1 && !on && h <= -6) h = hold;
    let bits = h > 0 ? IN_JUMP : 0;
    h--;
    if (Math.abs(d) > 3) bits |= d > 0 ? IN_RIGHT : IN_LEFT;
    yield bits;
    if (t > 400) throw new Error(`${c.me.element} could not board the stone (at ${c.tx.toFixed(2)}, bottom ${c.bottom}, stone ${stoneTx(c).toFixed(2)},${stone(c).y})`);
  }
}

/** Ride the stone until it has stopped on the far bank. */
function* ride(c) {
  yield* until(c, () => stoneTx(c) > 18.5, 0, 2000, 'the stone to cross');
  yield* stoneSettles(c, 10);
}

/** Air: stand in the turbine (it holds the gate shut and the trapdoor open). */
function* spin(c) {
  yield* go(c, 2, { noHop: true });
}

const air = function* (c) {
  // trip 1: drop the stone for Fire
  yield* go(c, 5);
  yield* until(c, () => c.me.grounded === 1, 0, 60, 'landing');
  yield* wait(c, 1, IN_JUMP); // the gem overhead
  yield* wait(c, 20);
  yield* until(c, () => c.me.grounded === 1, 0, 120, 'landing');
  yield* spin(c);
  yield* waitFlag(c, 'fire-aboard');
  yield* stoneSettles(c);
  yield* go(c, 5); // let go: the gate opens when the turbine stops
  // trip 2: Water
  yield* waitFlag(c, 'stone-home-2');
  yield* spin(c);
  yield* waitFlag(c, 'water-aboard');
  yield* stoneSettles(c);
  yield* go(c, 5);
  // trip 3: my own. Spin until the stone is held, then run for it.
  yield* waitFlag(c, 'stone-home-3');
  yield* spin(c);
  yield* until(c, () => stoneTx(c) > 13.5 && stone(c).y > 12 * TILE, 0, 600, 'the stone to reach the gate');
  yield* stoneSettles(c);
  yield* go(c, 13, { tol: 6 });
  yield* board(c);
  yield* ride(c);
  yield* go(c, 33);
};

const fire = function* (c) {
  yield* until(c, () => stoneTx(c) > 12.5 && stone(c).y > 11 * TILE, 0, 2000, 'the first stone');
  yield* stoneSettles(c);
  yield* go(c, 12, { tol: 6 });
  yield* board(c); // stepping on unlatches the chock: the stone rolls on to the gate
  yield* stoneSettles(c);
  yield* until(c, () => c.me.grounded === 1, 0, 120, 'landing');
  if (Math.abs(c.bottom - stone(c).y) > 2) yield* board(c);
  c.flag('fire-aboard');
  yield* ride(c);
  yield* go(c, 24); // gem
  yield* go(c, 27); // hold the lift up
  c.flag('lift-1');
  yield* until(c, () => c.has('stone-off-2'), 0, 3000, 'Earth to take the stone');
  yield* go(c, 36);
};

const water = function* (c) {
  yield* waitFlag(c, 'stone-home-2');
  yield* until(c, () => stoneTx(c) > 13.5 && stone(c).y > 12 * TILE, 0, 2000, 'the second stone');
  yield* stoneSettles(c);
  yield* go(c, 13, { tol: 6 });
  yield* board(c);
  c.flag('water-aboard');
  yield* ride(c);
  yield* go(c, 27);
  c.flag('lift-2');
  yield* until(c, () => c.has('stone-off-3'), 0, 3000, 'Earth to take the stone');
  yield* go(c, 30); // gem
  yield* go(c, 35);
};

/** Earth: wait for the stone to come up, roll it west onto the trapdoor. */
function* haul(c, n) {
  yield* until(c, () => stone(c).y < 6 * TILE && stoneTx(c) > 18.5, 0, 4000, `stone ${n} to come up`);
  yield* until(c, () => c.ent('hoist').s.y <= 6 * TILE, 0, 600, 'the lift to stop');
  // push until the stone stops against the step over the trapdoor
  let last = -1, still = 0;
  for (let t = 0; still < 10; t++) {
    yield IN_LEFT;
    still = stone(c).x === last && stoneTx(c) < 17 ? still + 1 : 0;
    last = stone(c).x;
    if (t > 1500) throw new Error(`Earth could not push stone ${n} to the trapdoor`);
  }
  if (Math.abs(stoneTx(c) - 12) > 0.02) throw new Error(`stone ${n} stopped at ${stoneTx(c)}`);
  yield* go(c, 21); // back over the shaft before the lift goes down
  c.flag(`stone-off-${n}`);
}

const earth = function* (c) {
  yield* haul(c, 2);
  yield* until(c, () => c.ent('hoist').s.y >= 16 * TILE - 1, 0, 1200, 'the lift to go down');
  c.flag('stone-home-2');
  yield* haul(c, 3);
  yield* until(c, () => c.ent('hoist').s.y >= 16 * TILE - 1, 0, 1200, 'the lift to go down');
  c.flag('stone-home-3');
  yield* until(c, () => c.player('air').x > 19 * TILE, 0, 4000, 'Air to cross');
  // down the ladder ledges to the bank
  yield* go(c, 22);
  for (let i = 0; i < 5; i++) {
    for (let t = 0; t < 8; t++) yield 8; // Down: drop through
    yield* until(c, () => c.me.grounded === 1, 0, 120, 'a ledge');
  }
  yield* go(c, 34);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  sets: [
    {
      elements: ['fire', 'water', 'earth', 'air'],
      scripts: { fire, water, earth, air },
      shortcuts: [],
    },
  ],
  roles: {
    'fire,water,earth,air': {
      fire: 'Rides the first stone, then holds the lift up so Earth can take it.',
      water: 'Rides the second stone, then holds the lift up for the third.',
      earth: 'The only one who can push the stone: rolls it from the lift to the trapdoor, twice.',
      air: 'Drops and holds every stone with the turbine, and crosses last: spin, run, jump aboard.',
    },
  },
};
