import { IN_LEFT, IN_RIGHT, IN_JUMP, TILE, go, jump, until, wait, waitFlag } from '../../kit.mjs';

const beam = (c) => c.ent('beam').s;

/** Hopping walk: keeps jumping while it travels, to get over a crate or the stone. */
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

/** Earth rolls the stone out of the hall onto the near pan and rides it down. */
function* loadTheStone(c) {
  yield* go(c, 6.6, { tol: 5 });
  yield* until(c, () => c.tx >= 20.6, IN_RIGHT, 1500, 'the stone onto the pan');
  yield* until(c, () => c.tx >= 21.4, IN_RIGHT, 300, 'aboard the pan');
  yield* until(c, () => beam(c).d >= 120, 0, 400, 'the pan to settle in the cellar');
}

/** Fire pushes `n` crates west onto the far pan, nearest first so they do not jam. */
function* loadCrates(c, n) {
  if (n >= 1) yield* until(c, () => c.tx <= 24.4, IN_LEFT, 900, 'the first crate onto the pan');
  if (n >= 2) {
    yield* bound(c, 31);                  // hop east over the next crate
    yield* until(c, () => c.tx <= 25.4, IN_LEFT, 900, 'the second crate onto the pan');
  }
  if (n >= 3) {
    yield* bound(c, 33);
    yield* until(c, () => c.tx <= 26.4, IN_LEFT, 900, 'the third crate onto the pan');
  }
  yield* go(c, 27);                       // clear of the pan, and the gem on the way
}

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  // The beam opens dead level, flush with the hall floor. Rolling the stone onto the near
  // pan sinks that pan into the cellar -- and that is what lifts the far pan up to Fire.
  yield* loadTheStone(c);
  // the stone alone keeps the pan at the bottom, so Earth can get off and come back
  yield* go(c, 6);                         // the gem at the foot of the west stair
  yield* go(c, 23.6);                      // round under the pan to its far side
  yield* jump(c, -1, { hold: 14 });        // back aboard, two tiles up
  yield* wait(c, 20);
  c.flag('aboard');
  // wait for Fire to load the far pan, then hop over the stone to get at its far side
  yield* waitFlag(c, 'crates');
  yield* bound(c, 22.4);
  // Shove the stone off the west end: it drops onto the heavy pad, and the pan it leaves
  // is the pan that rises. Three crates outweigh Earth alone; Earth and the stone, never.
  yield* until(c, () => c.ent('stone').s.y > 600, IN_LEFT, 600, 'shove the stone off the pan');
  // stand square on the pan again: a shoulder over the edge would jam it on the way up
  yield* until(c, () => c.tx >= 21, IN_RIGHT, 200, 'square on the pan');
  yield* until(c, () => beam(c).d <= -120, 0, 600, 'the pan to rise');
  // off at gallery-left, gem, through the gate the stone is holding, into the door
  yield* go(c, 17);
  yield* go(c, 12);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  // Fire's whole job is up here: the far pan can only be loaded from the gallery, and it
  // is only up at the gallery while the stone weighs the near pan down.
  yield* waitFlag(c, 'aboard');
  yield* loadCrates(c, 3);
  c.flag('crates');
  // all three studs pressed: the chute out of the gallery has unlatched
  yield* until(c, () => c.ent('chute').s.open >= 90, 0, 600, 'the chute to open');
  yield* go(c, 34);
  yield* go(c, 36.6);                     // over the lip, down the chute
  yield* go(c, 36);                       // square in the door at the bottom
};

// ---------------------------------------------------------------- shortcuts that must fail

/** Earth is heavy enough for the pad itself -- but then nothing is on the pan to lift. */
const earthHoldsThePad = function* (c) {
  yield* go(c, 4);
  yield* go(c, 6);
  yield* go(c, 18);                       // stand on the heavy pad in the cellar
  yield* wait(c, 4000);
};

/** Fire tries to do Earth's job: a boulder will not move for anyone else. */
const fireShovesTheStone = function* (c) {
  yield* go(c, 27);
  yield* go(c, 19.5);                     // off the gallery lip, down the shaft
  yield* go(c, 4);
  yield* go(c, 6);
  yield* go(c, 9);                        // into the hall by the west stair... far below
  yield* until(c, () => c.tx >= 20.6, IN_RIGHT, 2000, 'fire to shift the stone');
  yield* wait(c, 1000);
};

/** Keep the stone aboard and let Fire load every crate: four still will not lift five. */
const earthKeepsTheStone = function* (c) {
  yield* loadTheStone(c);
  c.flag('aboard');
  yield* waitFlag(c, 'crates');
  yield* until(c, () => beam(c).d <= -120, 0, 3000, 'the pan to rise with the stone aboard');
  yield* go(c, 17);
  yield* go(c, 12);
};

/** Two crates weigh exactly what Earth weighs: the beam only levels, it does not lift. */
const fireLoadsTwo = function* (c) {
  yield* waitFlag(c, 'aboard');
  yield* loadCrates(c, 2);
  c.flag('crates');
  yield* wait(c, 3000);
};

const earthRidesTwo = function* (c) {
  yield* loadTheStone(c);
  c.flag('aboard');
  yield* waitFlag(c, 'crates');
  yield* bound(c, 22.4);
  yield* until(c, () => c.ent('stone').s.y > 600, IN_LEFT, 600, 'shove the stone off the pan');
  yield* until(c, () => c.tx >= 21, IN_RIGHT, 200, 'square on the pan');
  yield* until(c, () => beam(c).d <= -120, 0, 2000, 'the pan to rise on two crates');
  yield* go(c, 17);
  yield* go(c, 12);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'steelyard',
  sets: [{
    elements: ['fire', 'earth'],
    scripts: { fire, earth },
    shortcuts: [
      { name: 'Earth holds the heavy pad itself instead of spending the stone on it',
        scripts: { fire, earth: earthHoldsThePad } },
      { name: 'Fire tries to shift the stone, so that Earth could stay on the pan',
        scripts: { fire: fireShovesTheStone, earth: earthHoldsThePad } },
      { name: 'Earth rides with the stone still aboard, on all three crates',
        scripts: { fire, earth: earthKeepsTheStone } },
      { name: 'Two crates instead of three',
        scripts: { fire: fireLoadsTwo, earth: earthRidesTwo } },
    ],
  }],
  roles: {
    'fire,earth': {
      fire: 'The only one who can reach the far pan, and the only hands the crates have.',
      earth: 'The only one who can shift the stone, and the passenger the beam has to lift.',
    },
  },
};
