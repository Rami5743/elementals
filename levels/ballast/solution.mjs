import {
  IN_LEFT, IN_RIGHT, IN_JUMP, TILE,
  go, until, steerTo,
} from '../../kit.mjs';

/** Ride the draught, holding nothing, until the feet are at or above `feetRow`. */
function* ride(c, feetRow, max = 900) {
  const goal = feetRow * TILE;
  for (let t = 0; t < max; t++) {
    if (c.bottom <= goal) return;
    yield 0;
  }
  throw new Error(`${c.me.element} could not ride the draught to row ${feetRow} (feet at ${(c.bottom / TILE).toFixed(2)})`);
}

/** Walk to the centre of tile x and stop, to within 6 px - tighter than go()'s tolerance. */
function* edge(c, x, max = 600) {
  const goal = x * TILE + TILE / 2;
  for (let t = 0; t < max; t++) {
    const d = goal - c.cx;
    if (Math.abs(d) < 6) return;
    yield d > 0 ? IN_RIGHT : IN_LEFT;
  }
  throw new Error(`${c.me.element} could not edge to ${x} (at ${c.tx.toFixed(2)})`);
}

/** Leap right off the pan, across the void, into the draught column. */
function* jumpAcross(c, max = 200) {
  for (let t = 0; t < max; t++) {
    if (t > 6 && c.cx >= 7 * TILE) return;
    yield IN_RIGHT | (t < 22 ? IN_JUMP : 0);
  }
  throw new Error(`water could not leap into the draught (at ${c.tx.toFixed(2)})`);
}

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  // 1. Into the draught shaft, and wait for Earth to lean on the bellows.
  yield* go(c, 7);
  yield* until(c, () => c.ent('draught').s.on === 1, 0, 1800, 'the draught to start');

  // 2. Ride it to the roof and step off onto the gallery ledge beside the pan.
  yield* ride(c, 4.2);
  yield* steerTo(c, 5);

  // 3. Board the pan beside the boulder. The pan's own load is the boulder's 3
  //    against the counterweight's 3.5: only a body on top of it sends it down.
  yield* edge(c, 4);
  yield* until(c, () => c.ent('rope').s.d >= 9 * TILE - 2, 0, 900, 'the pan to reach the bottom');
  yield* until(c, () => c.ent('gate').s.open >= 128, 0, 600, 'the gate to open');

  // 4. Nine tiles down, the boulder settles on the pad: the gate opens eleven tiles
  //    above AND the hatch opens in the hall. Wait here - flying now would strand
  //    Earth on the wrong side of the hatch, and Earth has to leave the bellows to
  //    cross, which takes the draught with it.
  yield* until(c, () => c.has('across'), 0, 4000, 'Earth to cross the hatch');
  yield* until(c, () => c.ent('draught').s.on === 1, 0, 900, 'the draught to come back');

  // 5. The idea: leap off the pan into the draught. The rope goes on counting Water,
  //    so the boulder stays on the pad and the gate stays open the whole way up.
  yield* jumpAcross(c);
  yield* ride(c, 4.2);

  // 6. Peel out of the column, through the open gate, and land beyond it. Landing is
  //    what finally takes Water's weight off the rope, so the gate shuts behind it.
  yield* steerTo(c, 11);
  c.flag('home');

  // 7. The landing strip is between two doors that are never open together: the gate
  //    shuts as the pan rises, and only then does the inner door let Water on.
  yield* until(c, () => c.ent('inner').s.open >= 100, 0, 900, 'the inner door to open');
  yield* go(c, 34);
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  // 1. Collect the gem on the near side, then lean on the first bellows:
  //    mass 2, and nothing lighter will hold it down.
  yield* go(c, 24);
  yield* go(c, 20);

  // 2. Hold the draught open while Water climbs, boards the pan and rides it down.
  yield* until(c, () => c.ent('hatch').s.open >= 90, 0, 3000, 'the hatch to open');

  // 3. The hatch is open only while the pan is down. Crossing costs the draught,
  //    so it has to happen while Water is standing on the pan, not flying.
  yield* go(c, 30);
  c.flag('across');

  // 4. Hold the second bellows for Water's flight, then walk out.
  yield* until(c, () => c.has('home'), 0, 4000, 'Water to get through the gate');
  yield* go(c, 33);
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
      earth: 'The only body heavy enough for the bellows plates, and the one who must cross the hatch in the pan-down window.',
    },
  },
};
