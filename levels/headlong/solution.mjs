import {
  IN_INTERACT, IN_JUMP, IN_LEFT, IN_RIGHT, TILE,
  go, jump, until, wait,
} from '../_lib.mjs';

const BAY_FLOOR = 20 * TILE;      // the hoist's bottom stop, flush with the bay floor
const GALLERY = 8 * TILE;         // the hoist's top stop, flush with the gallery floor
const LEDGE_TOP = 16 * TILE;      // the landing ledge at the foot of the chute
const DECK = 13;                  // middle of the hoist platform
const CHUTE_HEAD = 15;            // first slope column

/** Press the call button — it stands on the deck — and ride up to the gallery. */
function* rideUp(c, max = 1200) {
  yield* until(c, () => c.ent('hoist').s.y >= BAY_FLOOR - 1, 0, max, 'the hoist to be home');
  yield* wait(c, 4, IN_INTERACT);
  yield* until(c, () => c.ent('hoist').s.y <= GALLERY + 1 && c.me.grounded === 1, 0, max, 'the hoist to reach the gallery');
}

/** Stand still until the platform is back at the bay, so the next rider can board. */
function* waitHome(c, max = 2000) {
  yield* until(c, () => c.ent('hoist').s.y >= BAY_FLOOR - 1, 0, max, 'the hoist to come home');
}

/** Ride the platform back down to the bay. */
function* rideDown(c, max = 1200) {
  yield* until(c, () => c.bottom >= BAY_FLOOR - 1 && c.me.grounded === 1, 0, max, 'the hoist to go back down');
}

/**
 * Hop over the stone. A boulder in open ground is only a tile high, but you have
 * to be above it before you start moving sideways or you just walk into it.
 */
function* hopOver(c, toX, rise = 7, max = 200) {
  for (let t = 0; t < 12; t++) yield IN_JUMP | (t >= rise ? (toX * TILE + TILE / 2 > c.cx ? IN_RIGHT : IN_LEFT) : 0);
  for (let t = 0; t < max; t++) {
    const d = toX * TILE + TILE / 2 - c.cx;
    yield Math.abs(d) < 4 ? 0 : d > 0 ? IN_RIGHT : IN_LEFT;
    if (c.me.grounded === 1 && t > 4 && c.bottom >= BAY_FLOOR - 1) return;
  }
  throw new Error(`${c.me.element} never landed hopping to ${toX} (at ${c.tx.toFixed(1)})`);
}

/** Walk off the gallery's edge into the open hoist shaft and come down to the bay. */
function* intoShaft(c, max = 800) {
  for (let t = 0; t < max; t++) {
    // No gliding: Air would sail straight over a three-tile hole.
    yield c.me.grounded === 1 ? IN_RIGHT : 0;
    if (c.me.grounded === 1 && c.bottom >= BAY_FLOOR - 1) return;
  }
  throw new Error(`${c.me.element} never got down the shaft (at ${c.tx.toFixed(1)})`);
}

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  // Round behind the stone and shunt it the length of the bay, past the hoist,
  // taking Earth's gem on the way. Only Earth can move it at all.
  yield* go(c, 28.6);
  yield* until(c, () => c.ent('stone').s.x <= 7 * TILE, IN_LEFT, 2400, 'earth to shunt the stone past the hoist');
  // Hop over it, so that from here on Earth shoves eastward and ends up on the
  // uphill side — the side the stone has to be pushed from at the top.
  yield* hopOver(c, 5.8);
  yield* until(c, () => c.ent('stone').s.x >= DECK * TILE, IN_RIGHT, 2400, 'earth to shunt the stone on to the hoist');
  yield* rideUp(c);
  // Shove the stone off the deck on to the head of the chute, where it runs away
  // down to the pen door on its own.
  yield* until(c, () => c.ent('stone').s.x >= CHUTE_HEAD * TILE, IN_RIGHT, 1200, 'earth to launch the stone into the chute');
  // Step properly back aboard: a rider hanging off the edge stalls the platform.
  yield* go(c, 13.5);
  yield* rideDown(c);
  yield* go(c, 17);
  c.flag('penned');
  yield* until(c, () => c.ent('pad').s.on === 1, 0, 6000, 'the stone to settle on the pad');
  yield* go(c, 35);
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  // Keep out of the way of the shunt, then take the hoist up second.
  yield* go(c, 2.6);
  yield* until(c, () => c.has('penned'), 0, 8000, 'the stone to be penned');
  yield* waitHome(c);
  yield* go(c, DECK);
  yield* rideUp(c);
  // Air's gem is along the gallery. Then wait beside the turbine: stepping on to
  // it is what looses the stone, so it must not happen a moment early.
  yield* go(c, 10);
  yield* go(c, 9.7);
  c.flag('airset');
  yield* until(c, () => c.has('ready'), 0, 8000, 'water to reach the catwalk gate');
  c.flag('loose');
  yield* go(c, 8);
  // Holding the turbine keeps the pen and the catwalk gate open together.
  yield* until(c, () => c.ent('pad').s.on === 1, 0, 4000, 'the stone to settle on the pad');
  yield* wait(c, 30);
  yield* go(c, 11);
  yield* waitHome(c);
  yield* intoShaft(c);
  yield* go(c, 36);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 3.8);
  yield* until(c, () => c.has('airset'), 0, 10000, 'air to take station');
  yield* waitHome(c);
  yield* go(c, DECK);
  yield* rideUp(c);
  // West to the stair well, up through the one-way ledge and on to the catwalk,
  // then all the way east to the gate.
  yield* go(c, 2.5);
  yield* jump(c, 0, { hold: 20 });
  yield* jump(c, 1, { hold: 20, steerUntil: 4.6 });
  yield* go(c, 28.2);
  c.flag('ready');
  yield* until(c, () => c.has('loose'), 0, 4000, 'air to touch the turbine');
  // The run: through the gate the moment it lifts, off the end of the catwalk,
  // and back west on to the ledge before the stone gets there.
  yield* until(c, () => c.tx > 30.4, IN_RIGHT, 400, 'water to clear the catwalk gate');
  yield* until(c, () => c.me.grounded === 1 && c.bottom >= LEDGE_TOP - 1, IN_LEFT, 400, 'water to land on the ledge');
  yield* go(c, 28.6);
  // Stand fast. The pad flickers on as the stone merely rolls across it; only a
  // stone that has come to rest against Water is actually parked on it.
  yield* until(
    c,
    () => c.ent('stone').s.vx === 0 && c.ent('stone').s.x <= 29 * TILE && c.ent('pad').s.on === 1,
    0, 1200, 'the stone to come to rest on the pad',
  );
  // Step off the ledge into the void and go home.
  yield* until(c, () => c.me.grounded === 1 && c.bottom >= BAY_FLOOR - 1, IN_RIGHT, 400, 'water to drop into the bay');
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
