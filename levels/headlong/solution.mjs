import {
  IN_DOWN, IN_JUMP, IN_LEFT, IN_RIGHT, TILE,
  go, jump, until, wait,
} from '../_lib.mjs';

const BAY_FLOOR = 20 * TILE;      // the hoist's bottom stop, flush with the bay floor
const GALLERY = 8 * TILE;         // the hoist's top stop, flush with the gallery floor

/** Stand still until the hoist platform is parked at the bottom. */
function* hoistDown(c, max = 2000) {
  yield* until(c, () => c.ent('hoist').s.y >= BAY_FLOOR - 1, 0, max, 'the hoist at the bay');
}

/** Stand still until the hoist platform is parked at the top. */
function* hoistUp(c, max = 2000) {
  yield* until(c, () => c.ent('hoist').s.y <= GALLERY + 1, 0, max, 'the hoist at the gallery');
}

/** Ride the hoist: hold still until it has arrived where we want to be. */
function* rideTo(c, py, max = 2000) {
  yield* until(c, () => Math.abs(c.ent('hoist').s.y - py) < 2 && c.me.grounded === 1, 0, max, 'the hoist to arrive');
}

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  // Walk up behind the stone and shove it the length of the bay to the hoist,
  // picking up Earth's gem on the way.
  yield* go(c, 28.6);
  yield* until(c, () => c.tx <= 13.9, IN_LEFT, 2000, 'earth to shove the stone to the hoist');
  // Wait for the platform, then ride up beside the stone.
  yield* hoistDown(c);
  yield* rideTo(c, GALLERY);
  // Push the stone off the platform and onto the head of the chute, where it
  // rolls away down to the pen door on its own.
  yield* until(c, () => c.ent('stone').s.x >= 15 * TILE, IN_RIGHT, 1200, 'earth to launch the stone into the chute');
  yield* go(c, 14);
  c.flag('penned');
  // Earth's work is done up here; wait for the run, then ride back down.
  yield* until(c, () => c.ent('pad').s.on === 1, 0, 4000, 'the stone to settle on the pad');
  yield* go(c, 13);
  yield* rideTo(c, BAY_FLOOR);
  yield* go(c, 35);
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  // Keep out of Earth's way while the stone is shunted, then take the hoist up.
  yield* go(c, 4);
  yield* until(c, () => c.has('penned'), 0, 6000, 'the stone to be penned');
  yield* go(c, 13);
  yield* hoistDown(c);
  yield* rideTo(c, GALLERY);
  yield* go(c, 11);
  // Collect Air's gem on the gallery and take station on the turbine.
  yield* go(c, 4);
  yield* go(c, 6);
  yield* until(c, () => c.has('ready'), 0, 6000, 'water to reach the catwalk gate');
  c.flag('loose');
  // Hold the turbine: this keeps both the pen and the catwalk gate open.
  yield* until(c, () => c.ent('pad').s.on === 1, 0, 4000, 'the stone to settle on the pad');
  yield* wait(c, 30);
  yield* go(c, 13);
  yield* rideTo(c, BAY_FLOOR);
  yield* go(c, 36);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 3);
  yield* until(c, () => c.has('penned'), 0, 6000, 'the stone to be penned');
  yield* until(c, () => c.player('air').y < 10 * TILE, 0, 4000, 'air to go up first');
  yield* go(c, 13);
  yield* hoistDown(c);
  yield* rideTo(c, GALLERY);
  // Up the three steps on to the catwalk.
  yield* go(c, 10);
  yield* jump(c, -1, { hold: 14, steerUntil: 9 });
  yield* jump(c, -1, { hold: 14, steerUntil: 8 });
  yield* go(c, 24);
  c.flag('ready');
  yield* until(c, () => c.has('loose'), 0, 4000, 'air to touch the turbine');
  // The sprint: along the catwalk, off its end, and back west on to the ledge.
  yield* until(c, () => c.tx > 29.6, IN_RIGHT, 300, 'water to clear the catwalk gate');
  yield* until(c, () => c.me.grounded === 1 && c.bottom > 15 * TILE, IN_LEFT, 300, 'water to land on the ledge');
  yield* go(c, 28.6);
  yield* until(c, () => c.ent('pad').s.on === 1, 0, 1200, 'the stone to arrive on the pad');
  // Off the ledge into the bay and home.
  yield* go(c, 29.6);
  yield* until(c, () => c.me.grounded === 1 && c.bottom > 19 * TILE, IN_RIGHT, 300, 'water to drop into the bay');
  yield* go(c, 34);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'headlong',
  sets: [
    { elements: ['water', 'earth', 'air'], scripts: { water, earth, air } },
  ],
  roles: {
    'water,earth,air': {
      earth: 'The only one who can move the stone: shunts it to the hoist and launches it into the chute.',
      air: 'The only one a turbine answers to: looses the stone and holds the catwalk open.',
      water: 'Dives off the catwalk to be standing in front of the stone when it reaches the ledge.',
    },
  },
};
