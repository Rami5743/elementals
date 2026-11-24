import { IN_LEFT, IN_RIGHT, IN_JUMP, IN_DOWN, TILE, go, jump, until, wait, waitFlag } from '../../kit.mjs';

// ---------------------------------------------------------------- helpers

/** Jump repeatedly (releasing between hops) until standing at or above `top` px. */
function* climb(c, top, max = 1800) {
  for (let i = 0; i < max; i++) {
    if (c.me.grounded === 1 && c.bottom <= top) return;
    yield (i % 30 < 18 ? IN_JUMP : 0);
  }
  throw new Error(`${c.me.element} could not climb to y=${top} (at ${c.bottom})`);
}

/** Press Down until we have fallen through the ledge(s) below us, down to `floor` px. */
function* sink(c, floor, max = 900) {
  for (let i = 0; i < max; i++) {
    if (c.me.grounded === 1 && c.bottom >= floor) return;
    yield (i % 14 < 7 ? IN_DOWN : 0);
  }
  throw new Error(`${c.me.element} could not sink to y=${floor} (at ${c.bottom})`);
}

/** Walk in `dir` off the ledge we are on, then let go so we drop more or less straight. */
function* stepOff(c, dir, floor, max = 500) {
  yield* until(c, () => c.me.grounded === 0, dir > 0 ? IN_RIGHT : IN_LEFT, 200, 'to step off the lip');
  for (let i = 0; i < max; i++) {
    if (c.me.grounded === 1 && c.bottom >= floor) return;
    yield 0;
  }
  throw new Error(`${c.me.element} did not come to rest at y=${floor} (at ${c.bottom})`);
}

/** Step off a lip in `dir`, then steer in the air to come down near tile x. */
function* dropTo(c, dir, x, floor, max = 700) {
  yield* until(c, () => c.me.grounded === 0, dir > 0 ? IN_RIGHT : IN_LEFT, 200, 'to step off the lip');
  const goal = x * TILE + TILE / 2;
  for (let i = 0; i < max; i++) {
    if (c.me.grounded === 1 && c.bottom >= floor) return;
    const d = goal - c.cx;
    yield Math.abs(d) < 6 ? 0 : (d > 0 ? IN_RIGHT : IN_LEFT);
  }
  throw new Error(`${c.me.element} did not come down at y=${floor} near ${x} (at ${c.tx.toFixed(1)},${c.bottom})`);
}

/** Hop in `dir` on to a ledge or platform whose surface is at or above `top`. */
function* hopUp(c, dir, top, max = 500) {
  for (let i = 0; i < max; i++) {
    if (c.me.grounded === 1 && c.bottom <= top) return;
    yield (dir > 0 ? IN_RIGHT : IN_LEFT) | (i % 26 < 15 ? IN_JUMP : 0);
  }
  throw new Error(`${c.me.element} could not hop up to y<=${top} (at ${c.bottom}, x=${c.tx.toFixed(1)})`);
}

/** Hop over something one tile high sitting on our own floor, on the way to tile x. */
function* hopOver(c, dir, x, max = 500) {
  const goal = x * TILE + TILE / 2;
  let h = 0;
  for (let i = 0; i < max; i++) {
    const d = goal - c.cx;
    if (Math.abs(d) < 12 && c.me.grounded === 1) return;
    if (c.me.grounded === 1) h = 16;
    yield (d > 0 ? IN_RIGHT : IN_LEFT) | (h-- > 0 ? IN_JUMP : 0);
  }
  throw new Error(`${c.me.element} could not hop to ${x} (at ${c.tx.toFixed(1)})`);
}

const PAN_DOWN = (c) => c.ent('scale').s.d >= 190;   // left half (pan) at the bottom
const SEAT_UP = (c) => c.ent('scale').s.d >= 190;    // pan down <=> seat up at the loft
const LEVEL = (c) => Math.abs(c.ent('scale').s.d) <= 2;

// ---------------------------------------------------------------- the solution

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  // The stone is on the pan, so the plank starts tipped: pan in the vault, seat up at the loft.
  yield* until(c, () => PAN_DOWN(c), 0, 400, 'the plank to settle');

  // Down the east stair into the cellar and west under the hall to the foot of the vault.
  yield* go(c, 22);
  yield* sink(c, 480);
  yield* go(c, 16);

  // One tile up on to the pan, east of the stone.
  yield* hopUp(c, -1, 450);
  yield* go(c, 15, { noHop: true });

  // Push the stone west until it drops off the pan on to the heavy plate below.
  yield* until(c, () => c.ent('stone').s.y >= 440, IN_LEFT, 900, 'to push the stone off the pan');
  yield* until(c, () => c.ent('hp').s.on === 1, 0, 180, 'the stone to settle on the plate');
  c.flag('stone_placed');

  // East off the pan into the cellar; the empty plank comes level again behind us.
  yield* stepOff(c, 1, 480);
  yield* go(c, 22);
  yield* until(c, () => LEVEL(c), 0, 500, 'the plank to come level');

  // Up the stair, west on to the seat. Earth alone only sags it a tile.
  yield* climb(c, 256);
  yield* go(c, 17, { noHop: true });
  yield* until(c, () => c.me.grounded === 1 && c.bottom >= 286, 0, 300, 'the plank to sag');
  c.flag('earth_on_seat');

  // The other three load the pan; the seat carries Earth six tiles up to the loft.
  yield* until(c, () => SEAT_UP(c) && c.me.grounded === 1, 0, 2000, 'the lift');

  // East into the loft, over the gem, on to the heavy beam: the gate's second key.
  yield* go(c, 21);
  yield* go(c, 23);
  yield* until(c, () => c.ent('gate').s.open >= 90, 0, 500, 'the gate to open');
  c.flag('gate_open');

  // Back off the loft lip on to the waiting seat, then home the long way round.
  yield* waitFlag(c, 'pan_clear');
  yield* go(c, 18, { noHop: true });
  yield* until(c, () => c.me.grounded === 1 && c.bottom >= 286, 0, 1400, 'the seat to come down');
  for (let k = 0; k < 8 && c.bottom > 260; k++) yield* jump(c, 1, { hold: 25, steerUntil: 21 });
  yield* go(c, 22);
  yield* sink(c, 480);
  yield* go(c, 14);
  yield* hopOver(c, -1, 11);
  yield* go(c, 5);
};

/** Fire and Water step up on to the raised pan; Air strolls on once they have levelled it. */
function* ballast(c, gemX, panX, exitX, boardFromLevel, leaveAfter, leaveFlag) {
  yield* waitFlag(c, 'stone_placed');
  if (gemX !== null) yield* go(c, gemX);
  yield* waitFlag(c, 'earth_on_seat');
  yield* go(c, 12);
  if (boardFromLevel) {
    yield* until(c, () => LEVEL(c), 0, 600, 'the plank to come level');
    yield* go(c, panX, { noHop: true });
  } else {
    // while Earth sags the seat the pan rides a tile high: step up on to it
    yield* hopUp(c, 1, 230);
    yield* go(c, panX, { noHop: true });
  }
  c.flag(`aboard_${c.me.element}`);

  // ride the pan down, and stay on it until Earth is safe in the loft
  yield* waitFlag(c, 'gate_open');
  if (leaveAfter) yield* waitFlag(c, leaveAfter);
  yield* stepOff(c, -1, 440);
  yield* hopOver(c, -1, 10);
  if (leaveFlag) c.flag(leaveFlag);
  yield* go(c, exitX);
}

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* ballast(c, 10, 15, 4, false, 'off_water', 'off_fire');
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* waitFlag(c, 'aboard_fire');
  yield* ballast(c, 11, 14, 3, false, 'off_air', 'off_water');
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* waitFlag(c, 'aboard_water');
  yield* ballast(c, null, 13, 2, true, null, 'off_air');
  c.flag('pan_clear');
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'makeweight',
  sets: [
    {
      elements: ['fire', 'water', 'earth', 'air'],
      scripts: { fire, water, earth, air },
      shortcuts: [],
    },
  ],
  roles: {
    'fire,water,earth,air': {
      earth: 'Clears the stone off the scale on to the plate, then is the one who has to be lifted.',
      fire: 'A kilogram on the pan.',
      water: 'The second kilogram, which brings the plank level.',
      air: 'The third kilogram — the one that finally outweighs Earth.',
    },
  },
};
