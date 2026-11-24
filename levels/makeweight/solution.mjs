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
function* sink(c, floor, max = 600) {
  for (let i = 0; i < max; i++) {
    if (c.me.grounded === 1 && c.bottom >= floor) return;
    yield IN_DOWN;
  }
  throw new Error(`${c.me.element} could not sink to y=${floor} (at ${c.bottom})`);
}

/** Walk in `dir` off the ledge we are on, then let go so we drop more or less straight. */
function* stepOff(c, dir, floor, max = 400) {
  yield* until(c, () => c.me.grounded === 0, dir > 0 ? IN_RIGHT : IN_LEFT, 150, 'to step off the lip');
  for (let i = 0; i < max; i++) {
    if (c.me.grounded === 1 && c.bottom >= floor) return;
    yield 0;
  }
  throw new Error(`${c.me.element} did not come to rest at y=${floor} (at ${c.bottom})`);
}

/** Hop over something one tile high sitting on our floor, moving in `dir`. */
function* hopOver(c, dir, x, max = 400) {
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

const PAN_DOWN = () => -190;  // scale.s.d when the pan (right half) is at the bottom

// ---------------------------------------------------------------- the solution

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  // The stone is on the pan, so the plank starts tipped: pan at the bottom, seat at the loft.
  yield* until(c, () => c.ent('scale').s.d <= -190, 0, 400, 'the plank to settle');

  // East along the hall and down into the trough the raised seat has left behind.
  yield* go(c, 13);
  yield* stepOff(c, 1, 288);
  yield* go(c, 16, { noHop: true });

  // Off the lip into the vault, landing on the pan west of the stone.
  yield* stepOff(c, 1, 448);

  // Push the stone east until it drops off the pan onto the plate below.
  yield* until(c, () => c.ent('stone').s.y >= 440, IN_RIGHT, 900, 'to push the stone off the pan');
  yield* until(c, () => c.ent('hp').s.on === 1, 0, 120, 'the stone to settle on the plate');
  c.flag('stone_placed');

  // West off the pan, down into the cellar; the empty plank comes back level behind us.
  yield* stepOff(c, -1, 480);
  yield* go(c, 10);
  yield* until(c, () => Math.abs(c.ent('scale').s.d) <= 2, 0, 400, 'the plank to come level');

  // Up the stair into the hall, then out onto the seat. Earth alone only sags it a tile.
  yield* climb(c, 256);
  yield* go(c, 14);
  yield* until(c, () => c.me.grounded === 1 && c.bottom >= 288, 0, 200, 'the plank to sag');
  c.flag('earth_on_seat');

  // The other three load the pan; the seat carries Earth up six tiles to the loft.
  yield* until(c, () => c.ent('scale').s.d <= -190 && c.me.grounded === 1, 0, 1200, 'the lift');

  // West into the loft, over the gem, onto the heavy beam. That is the gate's second key.
  yield* go(c, 5);
  yield* go(c, 8);
  yield* until(c, () => c.ent('gate').s.open >= 90, 0, 400, 'the gate to open');
  c.flag('gate_open');

  // Back east and off the loft lip; the plank is level again, so the seat is waiting below.
  yield* waitFlag(c, 'pan_clear');
  yield* go(c, 13);
  yield* stepOff(c, 1, 288);
  yield* go(c, 16, { noHop: true });
  yield* stepOff(c, 1, 480);

  // East along the cellar, over the stone, through the gate, home.
  yield* hopOver(c, 1, 22);
  yield* go(c, 30);
};

/** Fire and Water cross the sag and jump the two tiles up onto the raised pan. */
function* ballast(c, gemX, panX) {
  yield* waitFlag(c, 'stone_placed');
  if (gemX !== null) yield* go(c, gemX);
  yield* waitFlag(c, 'earth_on_seat');
  yield* go(c, 13);
  yield* stepOff(c, 1, 288);
  yield* go(c, 16, { noHop: true });
  // the pan is a tile above the hall floor while Earth sags the seat: jump up onto it
  yield* until(c, () => c.me.grounded === 1 && c.bottom <= 240, IN_RIGHT | IN_JUMP, 240, 'to board the pan');
  yield* go(c, panX, { noHop: true });
  c.flag(`aboard_${c.me.element}`);
  // ride the pan down, then wait until Earth is safely in the loft
  yield* waitFlag(c, 'gate_open');
  yield* stepOff(c, 1, 480);
  yield* hopOver(c, 1, 22);
  yield* go(c, c.me.element === 'fire' ? 28 : c.me.element === 'water' ? 29 : 31);
}

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* ballast(c, 12, 19);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* waitFlag(c, 'aboard_fire');
  yield* ballast(c, 13, 18);
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  // By the time Air walks over, Fire and Water have levelled the plank: Air just strolls aboard.
  yield* waitFlag(c, 'aboard_water');
  yield* until(c, () => Math.abs(c.ent('scale').s.d) <= 2, 0, 400, 'the plank to come level');
  yield* go(c, 17);
  c.flag('aboard_air');
  yield* until(c, () => c.ent('scale').s.d <= -190, 0, 600, 'the pan to sink');
  yield* waitFlag(c, 'gate_open');
  yield* stepOff(c, 1, 480);
  c.flag('pan_clear');
  yield* hopOver(c, 1, 22);
  yield* go(c, 31);
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
      earth: 'Clears the stone off the scale, then is the one who has to be lifted.',
      fire: 'A kilogram on the pan.',
      water: 'A kilogram on the pan.',
      air: 'The third kilogram — the one that finally beats Earth.',
    },
  },
};
