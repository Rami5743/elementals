import {
  IN_LEFT, IN_RIGHT, IN_JUMP, TILE,
  go, until, interact, wait, steerTo,
} from '../../kit.mjs';

/** Ride the draught until the feet are at or above `feetRow`, holding nothing so as not to leave the column. */
function* ride(c, feetRow, max = 900) {
  const goal = feetRow * TILE;
  for (let t = 0; t < max; t++) {
    if (c.bottom <= goal) return;
    yield 0;
  }
  throw new Error(`${c.me.element} could not ride the draught to row ${feetRow} (feet at ${(c.bottom / TILE).toFixed(2)})`);
}

/** Walk toward tile x while airborne is handled by steerTo; this nudges along the floor. */
function* edge(c, x, max = 600) {
  const goal = x * TILE + TILE / 2;
  for (let t = 0; t < max; t++) {
    const d = goal - c.cx;
    if (Math.abs(d) < 6) return;
    yield d > 0 ? IN_RIGHT : IN_LEFT;
  }
  throw new Error(`${c.me.element} could not edge to ${x} (at ${c.tx.toFixed(2)})`);
}

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  // 1. Into the draught shaft, and wait for Earth to lean on the bellows.
  yield* go(c, 7.5);
  yield* until(c, () => c.ent('draught').s.on === 1, 0, 1200, 'the draught to start');

  // 2. Ride it to the roof and step off onto the gallery ledge beside the pan.
  yield* ride(c, 4.2);
  yield* steerTo(c, 5.5);

  // 3. Board the pan beside the boulder. Its own weight is 3 against the
  //    counterweight's 3.5, so only a body on top of it sends it down.
  yield* go(c, 4.5);
  yield* until(c, () => c.ent('rope').s.d >= 9 * TILE - 2, 0, 900, 'the pan to reach the bottom');

  // 4. Nine tiles down the boulder settles on the pad and the gate opens, eleven tiles up.
  yield* until(c, () => c.ent('gate').s.open >= 120, 0, 600, 'the gate to open');

  // 5. The whole idea: leap off the pan into the draught. The rope goes on counting
  //    Water, so the boulder stays on the pad and the gate stays open all the way up.
  yield* jumpAcross(c);
  yield* ride(c, 4.2);

  // 6. Peel out of the column, through the open gate, and land beyond it.
  yield* steerTo(c, 11.5);

  // 7. Throw the lever that lifts Earth's hatch, then home.
  yield* go(c, 16.5);
  yield* interact(c);
  c.flag('released');
  yield* go(c, 19.5);
};

/** Leap right off the pan, across the void, into the draught column. */
function* jumpAcross(c, max = 200) {
  for (let t = 0; t < max; t++) {
    if (t > 6 && c.ent('draught').def && c.cx >= 7 * TILE) return;
    yield IN_RIGHT | (t < 22 ? IN_JUMP : 0);
  }
  throw new Error(`water could not leap into the draught (at ${c.tx.toFixed(2)})`);
}

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  // 1. Lean on the bellows: mass 2, and nothing lighter will hold it.
  yield* go(c, 20.5);
  // 2. Stay there for every second Water is in the air.
  yield* until(c, () => c.has('released'), 0, 6000, 'Water to get through the gate');
  // 3. Collect the gem and walk out through the hatch Water opened.
  yield* until(c, () => c.ent('hatch').s.open >= 90, 0, 600, 'the hatch to open');
  yield* go(c, 24.5);
  yield* go(c, 33.5);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  sets: [
    {
      elements: ['water', 'earth'],
      scripts: { water, earth },
      shortcuts: [],
    },
  ],
  roles: {
    'water,earth': {
      water: 'Rides the draught, is the weight on the rope, and must fly through the gate it is itself holding open.',
      earth: 'The only body heavy enough to hold the bellows plate, so the draught blows only while Earth stands on it.',
    },
  },
};
