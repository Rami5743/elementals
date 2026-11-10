// Drill: three cracked hatches down one shaft, each a tile to the right of the last.
import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, pound, until, wait, waitFlag } from '../../kit.mjs';
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

/** Step off the hall floor into the shaft. */
function* stepOff(c) {
  yield* bound(c, 24);
  yield* until(c, () => c.bottom > 8 * TILE, IN_RIGHT, 120, 'into the shaft');
}

/** Fall, steering toward tile centre `want`, until standing on row `row`. */
function* fallTo(c, row, want, max = 300) {
  for (let t = 0; t < max; t++) {
    if (c.me.grounded === 1 && c.bottom === row * TILE) return;
    const d = want * TILE - c.cx;
    yield Math.abs(d) < 4 ? 0 : d > 0 ? IN_RIGHT : IN_LEFT;
  }
  throw new Error(`${c.me.element} missed row ${row} (at ${c.tx.toFixed(1)}, y ${(c.bottom / TILE).toFixed(1)})`);
}

/** Line up over the hatch, jump off it and pound it out. */
function* drillHere(c, tile) {
  yield* go(c, tile);
  for (let t = 0; t < 14; t++) yield IN_JUMP;
  yield* pound(c);
}

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'gate_open');
  yield* stepOff(c);
  yield* fallTo(c, 9, 25.5);
  yield* drillHere(c, 25);
  yield* fallTo(c, 13, 26.5);
  yield* drillHere(c, 26);
  yield* fallTo(c, 17, 27.5);
  yield* drillHere(c, 27);
  yield* fallTo(c, 20, 27.5);
  c.flag('shaft_open');
  yield* go(c, 24);
  yield* wait(c, 600);
};

/** Down the opened shaft: each hatch is a tile to the right of the one above. */
function* descend(c, max = 400) {
  yield* stepOff(c);
  for (let t = 0; t < max; t++) {
    if (c.me.grounded === 1 && c.bottom === 20 * TILE) return;
    const want = c.bottom < 9.5 * TILE ? 25.5 : c.bottom < 13.5 * TILE ? 26.5 : 27.5;
    const d = want * TILE - c.cx;
    yield Math.abs(d) < 4 ? 0 : d > 0 ? IN_RIGHT : IN_LEFT;
  }
  throw new Error(`${c.me.element} stuck in the shaft (at ${c.tx.toFixed(1)}, y ${(c.bottom / TILE).toFixed(1)})`);
}

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* clear(c, 'icewall');
  c.flag('ice_out');
  yield* waitFlag(c, 'water_down');
  yield* descend(c);
  yield* go(c, 30);
  c.flag('fire_down');
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* waitFlag(c, 'ice_out');
  yield* bound(c, 11);
  yield* clear(c, 'flames');
  c.flag('flames_out');
  yield* waitFlag(c, 'shaft_open');
  yield* descend(c);
  yield* go(c, 32);
  c.flag('water_down');
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* waitFlag(c, 'flames_out');
  yield* bound(c, 15);                               // the turbine opens the gate to the shaft
  yield* until(c, () => c.ent('gate').s.open > 0, 0, 300, 'the gate');
  c.flag('gate_open');
  yield* waitFlag(c, 'fire_down');
  yield* descend(c);
  yield* go(c, 29);
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'drill',
  sets: [{ elements: ['fire', 'water', 'earth', 'air'], scripts: { fire, water, earth, air } }],
  roles: {
    'air,earth,fire,water': {
      fire: 'Melts the ice across the hall.',
      water: 'Puts out the flames behind it.',
      air: 'Spins the turbine that opens the gate to the shaft head.',
      earth: 'The only one who can pound: breaks all three hatches on the way down and opens the shaft for everyone.',
    },
  },
};
