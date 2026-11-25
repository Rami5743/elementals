import {IN_INTERACT,IN_JUMP,IN_LEFT,IN_RIGHT,TILE,interact,go,jump,until,wait,drop} from "../../kit.mjs";
const BAY_FLOOR = 20 * TILE;      // the hoist's bottom stop, flush with the bay floor
const GALLERY = 8 * TILE;         // the hoist's top stop, flush with the gallery floor
const LEDGE_TOP = 16 * TILE;      // the landing ledge at the foot of the chute
const DECK = 13.4;                // where the stone parks on the deck, leaving Earth room aboard
const CHUTE_HEAD = 15;            // first slope column
const RUNG_TOP = 6 * TILE;        // the stair well's one-way ledge
const STEP_TOP = 5 * TILE;        // the step between them
const CAT_TOP = 4 * TILE;         // the catwalk's walking surface

/**
 * Ride the hoist up. Its control is a hold button on the deck itself, so the
 * rider has to keep Interact down for the whole climb.
 */
function* rideUp(c, max = 1200) {
  yield* until(
    c,
    () => c.ent('hoist').s.y <= GALLERY + 1 && c.me.grounded === 1,
    IN_INTERACT, max, 'the hoist to reach the gallery',
  );
}

/** Ride the platform back down to the bay. */
function* rideDown(c, max = 1200) {
  yield* until(c, () => c.bottom >= BAY_FLOOR - 1 && c.me.grounded === 1, 0, max, 'the hoist to go back down');
}

/**
 * Up the stair well on to the catwalk: a one-way ledge, a step, and the catwalk,
 * a tile apart each. jump() can return early while rising through a one-way
 * ledge, so each hop waits until it is really standing on the next level.
 */
function* ontoCatwalk(c) {
  yield* go(c, 2.5);
  yield* jump(c, 0, { hold: 20 });
  yield* until(c, () => c.me.grounded === 1 && c.bottom <= RUNG_TOP + 1, 0, 300, 'to stand on the stair ledge');
  yield* jump(c, 1, { hold: 16, steerUntil: 4.5 });
  yield* until(c, () => c.me.grounded === 1 && c.bottom <= STEP_TOP + 1, 0, 300, 'to stand on the step');
  yield* jump(c, 1, { hold: 16, steerUntil: 5.5 });
  yield* until(c, () => c.me.grounded === 1 && c.bottom <= CAT_TOP + 1, 0, 300, 'to stand on the catwalk');
}

/** Climb the people's ladder: jump up through one-way rungs until high enough. */
function* climbLadder(c, toBottom, tries = 14) {
  for (let i = 0; i < tries; i++) {
    if (c.bottom <= toBottom + 1 && c.me.grounded === 1) return;
    yield* jump(c, 0, { hold: 24 });
  }
  throw new Error(`${c.me.element} could not climb the ladder (bottom ${c.bottom})`);
}

/** Drop back down the ladder, through one rung at a time. */
function* descendLadder(c, tries = 14) {
  for (let i = 0; i < tries; i++) {
    if (c.bottom >= BAY_FLOOR - 1 && c.me.grounded === 1) return;
    yield* drop(c);
    yield* until(c, () => c.me.grounded === 1, 0, 200, `${c.me.element} to land on a rung`);
  }
  throw new Error(`${c.me.element} could not get down the ladder (bottom ${c.bottom})`);
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

/** The whole of Earth's haul: bay to hoist to chute head, ending back in the bay. */
function* haulAndLaunch(c) {
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
  yield* until(
    c,
    () => c.ent('stone').s.x >= CHUTE_HEAD * TILE,
    IN_RIGHT | IN_INTERACT, 1200, 'earth to launch the stone into the chute',
  );
  // Let go of the button and the hoist carries Earth back down to the bay.
  yield* rideDown(c);
  yield* go(c, 17);
  c.flag('penned');
}

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* haulAndLaunch(c);
  yield* until(c, () => c.ent('pad').s.on === 1, 0, 6000, 'the stone to settle on the pad');
  yield* go(c, 35);
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  // Keep out of the way of the shunt, then take the hoist up second.
  yield* go(c, 2.6);
  yield* until(c, () => c.has('penned'), 0, 8000, 'the stone to be penned');
  yield* go(c, 9.5);
  yield* climbLadder(c, GALLERY);
  // Air's gem is along the gallery. Then wait beside the turbine: stepping on to
  // it is what looses the stone, so it must not happen a moment early.
  yield* go(c, 10);
  yield* go(c, 11);          // clear of the ladder head, so Water's climb is not blocked
  c.flag('airset');
  yield* until(c, () => c.has('ready'), 0, 8000, 'water to reach the catwalk gate');
  yield* until(c,()=>c.has('permit'),0,8000,'fire release permit');c.flag('loose');
  yield* go(c, 8);
  // Holding the turbine keeps the pen and the catwalk gate open together.
  yield* until(c, () => c.ent('pad').s.on === 1, 0, 4000, 'the stone to settle on the pad');
  yield* wait(c, 30);
  yield* go(c, 9.5);
  yield* descendLadder(c);
  yield* go(c, 36);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 3.8);
  yield* until(c, () => c.has('airset'), 0, 10000, 'air to take station');
  yield* go(c, 9.5);
  yield* climbLadder(c, GALLERY);
  // West to the stair well, up through the one-way ledge and on to the catwalk,
  // then all the way east to the gate.
  yield* ontoCatwalk(c);
  yield* go(c, 28.2);
  c.flag('ready');
  yield* until(c, () => c.has('loose'), 0, 4000, 'air to touch the turbine');
  // The run: through the gate the moment it lifts, off the end of the catwalk,
  // and back west on to the ledge before the stone gets there.
  yield* until(c, () => c.tx > 30.4, IN_RIGHT, 400, 'water to clear the catwalk gate');
  yield* until(
    c,
    () => c.me.grounded === 1 && c.bottom <= LEDGE_TOP + 1,
    IN_LEFT, 400, 'water to land on the ledge',
  );
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

// ---------------------------------------------------------------------------
// Cheats that have to fail. `check` runs each one and reports a problem if it
// finishes the level.
// ---------------------------------------------------------------------------

/**
 * Earth is mass 2, so Earth could hold the heavy pad as well as the stone can --
 * if Earth could reach it. Measured: Earth's 76 px jump will not take it up the
 * stair well's one-way ledge, and the pool would stop it even if it did.
 */
const earthHoldsThePad = function* (c) {
  // Never bother with the stone at all: ride up, climb to the catwalk and dive
  // on to the ledge, then stand on the pad. Dash for the door at the end.
  yield* go(c, 13.5);
  yield* rideUp(c);
  yield* go(c, 11);
  yield* ontoCatwalk(c);
  yield* until(c, () => c.tx >= 28.5, IN_RIGHT, 900, 'earth to reach the catwalk gate');
  c.flag('atgate');
  yield* until(c, () => c.ent('catgate').s.open >= 40, 0, 4000, 'air to open the catwalk gate');
  yield* until(c, () => c.me.grounded === 0, IN_RIGHT, 400, 'earth to get off the end of the catwalk');
  yield* until(
    c,
    () => c.me.grounded === 1 && c.bottom <= LEDGE_TOP + 1,
    IN_LEFT, 400, 'earth to land on the ledge',
  );
  yield* go(c, 28);
  // Prove the cheat really got there: Earth's own mass is holding the gate open.
  if (c.ent('pad').s.on !== 1) throw new Error(`earth reached ${c.tx.toFixed(1)} bottom ${c.bottom} (ledge is ${16 * TILE}) but the pad is not held`);
  c.flag('onpad');
  yield* until(c, () => c.has('othershome'), 0, 5000, 'the others to reach their doors');
  yield* until(c, () => c.me.grounded === 1 && c.bottom >= BAY_FLOOR - 1, IN_RIGHT, 600, 'earth to drop into the bay');
  yield* go(c, 35);
};
const airHoldsTheGate = function* (c) {
  yield* go(c, 2.6);
  yield* until(c, () => c.has('atgate'), 0, 5000, 'earth to reach the gate');
  yield* go(c, 9.5);
  yield* climbLadder(c, GALLERY);
  yield* go(c, 11);
  yield* go(c, 8);                       // hold the turbine so the gate stays up for Earth
  yield* until(c, () => c.has('onpad'), 0, 5000, 'earth to reach the pad');
  yield* go(c, 9.5);
  yield* descendLadder(c);
  yield* go(c, 36);
  c.flag('airhome');
};
const waterWaitsAtItsDoor = function* (c) {
  yield* go(c, 3.8);
  yield* until(c, () => c.has('onpad'), 0, 6000, 'earth to reach the pad');
  // Patient: wait at the gate for as long as it takes Earth's weight to lift it.
  yield* until(c, () => c.tx >= 33.6, IN_RIGHT, 2500, 'water to get through the way gate');
  yield* go(c, 34);
  yield* until(c, () => c.has('airhome'), 0, 4000, 'air to get home');
  c.flag('othershome');
};

/**
 * Do everything right, but stroll instead of running. Measured: up to about 90
 * ticks of hesitation still makes it and 120 does not, so the clock is real and
 * the forgiveness is about two seconds.
 */
const waterDawdles = function* (c) {
  yield* go(c, 3.8);
  yield* until(c, () => c.has('airset'), 0, 10000, 'air to take station');
  yield* go(c, 9.5);
  yield* climbLadder(c, GALLERY);
  yield* ontoCatwalk(c);
  yield* go(c, 28.2);
  c.flag('ready');
  yield* until(c, () => c.has('loose'), 0, 4000, 'air to touch the turbine');
  yield* wait(c, 120);                   // two seconds of dithering: too long
  yield* until(c, () => c.tx > 30.4, IN_RIGHT, 400, 'water to clear the catwalk gate');
  yield* until(
    c,
    () => c.me.grounded === 1 && c.bottom <= LEDGE_TOP + 1,
    IN_LEFT, 400, 'water to land on the ledge',
  );
  yield* go(c, 28.6);
  yield* until(
    c,
    () => c.ent('stone').s.vx === 0 && c.ent('stone').s.x <= 29 * TILE && c.ent('pad').s.on === 1,
    0, 1500, 'the stone to come to rest on the pad',
  );
  yield* until(c, () => c.me.grounded === 1 && c.bottom >= BAY_FLOOR - 1, IN_RIGHT, 400, 'water to drop into the bay');
  yield* go(c, 34);
};

/**
 * Air looses the stone and then tries to be the brake itself. Two things stop
 * it: the pool across the catwalk, and the gate that shuts the moment Air steps
 * off the turbine.
 */
const airLoosesAndRuns = function* (c) {
  yield* go(c, 2.6);
  yield* until(c, () => c.has('penned'), 0, 8000, 'the stone to be penned');
  yield* go(c, 9.5);
  yield* climbLadder(c, GALLERY);
  yield* go(c, 11);
  yield* go(c, 8);                       // the turbine: the stone is away
  yield* go(c, 2.5);                     // bolt for the stair well
  yield* jump(c, 0, { hold: 20 });
  yield* jump(c, 1, { hold: 20, steerUntil: 4.6 });
  yield* go(c, 31);                      // and down the catwalk — but the gate shut behind it
  yield* until(c, () => c.me.grounded === 1 && c.bottom >= LEDGE_TOP - 1, IN_LEFT, 400, 'air to land on the ledge');
  yield* go(c, 28);
  yield* wait(c, 600);
};
const waterSitsOut = function* (c) {
  yield* go(c, 3.8);
  yield* wait(c, 5000);
};

/** Get to the ledge before the stone is ever loosed. */
const waterTriesToPreposition = function* (c) {
  yield* go(c, 3.8);
  yield* until(c, () => c.has('penned'), 0, 8000, 'the stone to be penned');
  yield* go(c, 9.5);
  yield* climbLadder(c, GALLERY);
  yield* ontoCatwalk(c);
  yield* go(c, 31);                      // the catwalk gate is shut: this cannot be reached
  yield* until(
    c,
    () => c.me.grounded === 1 && c.bottom <= LEDGE_TOP + 1,
    IN_LEFT, 400, 'water to land on the ledge',
  );
  yield* go(c, 28);
  yield* wait(c, 600);
};
const airStaysOffTheTurbine = function* (c) {
  yield* go(c, 2.6);
  yield* wait(c, 5000);
};

/** @type {import('../../kit.mjs').Solutions} */
const fire = function* (c) {
 yield* go(c,38);yield* interact(c);c.flag("permit");
 yield* go(c,36);
 yield* until(c,()=>c.me.grounded===1&&c.bottom<=4*TILE+1,0,10000,"certificate lift top");
 yield* go(c,37);yield* interact(c);yield* go(c,38);
};
export const solutions = {
  level: 'chute_council',
  sets: [
    {
      elements: ['fire','water','earth','air'],
      scripts: { fire,water,earth,air },
      shortcuts: [ {name:'omit the fourth operator permit',scripts:{water,earth,air,fire:function*(c){yield* wait(c,12000);}},maxTicks:14000},
        {
          name: 'Earth goes to hold the heavy pad itself instead of fetching the stone',
          scripts: { fire, water: waterWaitsAtItsDoor, earth: earthHoldsThePad, air: airHoldsTheGate },
        },
        {
          name: 'Water strolls the catwalk instead of running',
          scripts: { fire, water: waterDawdles, earth, air },
        },
        {
          name: 'Air looses the stone and goes to brake it itself, so Water is not needed',
          scripts: { fire, water: waterSitsOut, earth: haulAndLaunch, air: airLoosesAndRuns },
        },
        {
          name: 'Water waits on the ledge before the stone is loosed',
          scripts: { fire, water: waterTriesToPreposition, earth: haulAndLaunch, air: airStaysOffTheTurbine },
        },
      ],
    },
  ],
  roles: {
    'water,earth,air': {
      earth: 'The only one who can move the stone: shunts it to the hoist and launches it into the chute.',
      air: 'The only one a turbine answers to: looses the stone and holds the catwalk open.',
      water: 'Dives off the catwalk to be standing in front of the stone when it reaches the ledge.',
    },
  },
};
