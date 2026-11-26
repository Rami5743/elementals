// Stone Ferry: the stone is the only boat. Air drops it and holds it, the rider boards, Air lets
// go and the turbine's run-down launches it; whoever has just landed holds the lift up while Earth
// rolls the stone back to the trapdoor. Air crosses last: spin, run, jump aboard before it stops.
import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE, go, jump, until, waitFlag } from '../../kit.mjs';

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
  yield* jump(c, 0); // the gem overhead
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


// ---- Shortcuts that must fail ---------------------------------------------------------------

/** Run right from tile `from` and leap, holding Jump the whole way (Air glides). */
function* leapTheMoat(c, from) {
  yield* go(c, from, { noHop: true });
  for (let t = 0; t < 240; t++) {
    yield IN_RIGHT | IN_JUMP;
    if (t > 10 && c.me.grounded === 1) break;
  }
  if (c.tx < 19.2) throw new Error(`${c.me.element} came down at ${c.tx.toFixed(2)}, short of the bank`);
}

/** Air does trips 1 and 2 as usual, then glides for it instead of dropping and riding the last stone. */
const airGlides = (from) => function* (c) {
  yield* spin(c);
  yield* waitFlag(c, 'fire-aboard');
  yield* stoneSettles(c);
  yield* go(c, 5);
  yield* waitFlag(c, 'stone-home-2');
  yield* spin(c);
  yield* waitFlag(c, 'water-aboard');
  yield* stoneSettles(c);
  yield* go(c, 5);
  yield* waitFlag(c, 'stone-home-3');
  yield* until(c, () => c.ent('gate').s.open >= 60, 0, 600, 'the gate to open');
  yield* leapTheMoat(c, from);
  yield* go(c, 33);
};

/** Water jumps the moat while the gate stands open between trips, instead of riding. */
const waterJumps = function* (c) {
  yield* waitFlag(c, 'stone-off-2');
  yield* until(c, () => c.ent('gate').s.open >= 60, 0, 1200, 'the gate to open');
  c.flag('water-tried');
  yield* leapTheMoat(c, 15);
  c.flag('water-aboard'); // Air lets the second stone go empty
  yield* until(c, () => stoneTx(c) > 18.5 && stone(c).y > 14 * TILE, 0, 4000, 'the empty stone');
  yield* stoneSettles(c);
  yield* go(c, 27);
  c.flag('lift-2');
  yield* until(c, () => c.has('stone-off-3'), 0, 3000, 'Earth to take the stone');
  yield* go(c, 30);
  yield* go(c, 35);
};
/** Air as usual, but holds back trip 2 until Water has made her jump. */
const airWaitsForWater = function* (c) {
  yield* spin(c);
  yield* waitFlag(c, 'fire-aboard');
  yield* stoneSettles(c);
  yield* go(c, 5);
  yield* waitFlag(c, 'water-aboard'); // only once Water has made her jump
  yield* waitFlag(c, 'stone-home-2');
  yield* spin(c);
  yield* waitFlag(c, 'water-aboard');
  yield* stoneSettles(c);
  yield* go(c, 5);
  yield* waitFlag(c, 'stone-home-3');
  yield* spin(c);
  yield* until(c, () => stoneTx(c) > 13.5 && stone(c).y > 12 * TILE, 0, 600, 'the stone to reach the gate');
  yield* stoneSettles(c);
  yield* go(c, 13, { tol: 6 });
  yield* board(c);
  yield* ride(c);
  yield* go(c, 33);
};

/** Earth hauls once (the stacked pair came over together), then goes home after Air. */
const earthTwoHauls = function* (c) {
  yield* haul(c, 2);
  yield* until(c, () => c.ent('hoist').s.y >= 16 * TILE - 1, 0, 1200, 'the lift to go down');
  c.flag('stone-home-2');
  yield* until(c, () => c.player('air').x > 19 * TILE, 0, 6000, 'Air to cross');
  yield* go(c, 22);
  for (let i = 0; i < 5; i++) {
    for (let t = 0; t < 8; t++) yield 8;
    yield* until(c, () => c.me.grounded === 1, 0, 120, 'a ledge');
  }
  yield* go(c, 34);
};

/** Water climbs onto Fire's head on the first stone: two across on one trip. */
const waterStacks = function* (c) {
  yield* waitFlag(c, 'fire-aboard');
  yield* go(c, 12, { tol: 6 });
  for (let t = 0; t < 300; t++) {
    const f = c.player('fire');
    const d = f.x + 11 - c.cx;
    const on = c.me.grounded === 1 && Math.abs(c.bottom - f.y) <= 2;
    if (on && t > 10) break;
    yield ((t % 30) < 8 ? IN_JUMP : 0) | (Math.abs(d) > 3 ? (d > 0 ? IN_RIGHT : IN_LEFT) : 0);
  }
  c.flag('water-aboard');
  yield* until(c, () => stoneTx(c) > 18.5, 0, 2000, 'the stone to cross');
  yield* stoneSettles(c, 10);
  if (c.tx < 19.2) throw new Error(`water was left behind at x=${c.tx.toFixed(2)}, y=${(c.me.y / TILE).toFixed(2)}: the roof took her off Fire's head`);
  yield* go(c, 30);
  yield* go(c, 35);
};
const airStack = function* (c) {
  yield* spin(c);
  yield* waitFlag(c, 'water-aboard');
  for (let t = 0; t < 30; t++) yield 0;
  yield* go(c, 5);
  yield* waitFlag(c, 'stone-home-2');
  yield* spin(c);
  yield* until(c, () => stoneTx(c) > 13.5 && stone(c).y > 12 * TILE, 0, 600, 'the stone to reach the gate');
  yield* stoneSettles(c);
  yield* go(c, 13, { tol: 6 });
  yield* board(c);
  yield* ride(c);
  yield* go(c, 33);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  sets: [
    {
      elements: ['fire', 'water', 'earth', 'air'],
      scripts: { fire, water, earth, air },
      shortcuts: [
        { name: 'Air glides the moat from the top of the slope', scripts: { fire, water, earth, air: airGlides(13) } },
        { name: 'Air glides the moat from the gate', scripts: { fire, water, earth, air: airGlides(15) } },
        { name: 'Water jumps the moat while the gate stands open', scripts: { fire, water: waterJumps, earth, air: airWaitsForWater } },
        { name: "Water rides across on Fire's head", scripts: { fire, water: waterStacks, earth: earthTwoHauls, air: airStack } },
      ],
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
