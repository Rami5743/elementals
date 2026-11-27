// Caryatid: the lift comes down only while something heavy is at shoulder height in its shaft (a
// heavy plate hangs there), and it settles on that load. First Earth stands on the stone to call
// it and Fire rides a crate down into the west tunnel. Then the east tunnel's door needs Earth on a
// plate upstairs, so Water carries the stone on its head to call the lift for the second crate.
import { IN_LEFT, IN_RIGHT, TILE, drop, go, jump, until, waitFlag } from '../../kit.mjs';

const liftY = (c) => c.ent('lift').s.y;
const liftAtTop = (c) => liftY(c) <= 9 * TILE + 1;

/** Stand still until the lift has come to rest on its caller. */
function* waitLiftDown(c, max = 1500) {
  let last = -1, n = 0;
  for (let t = 0; t < max; t++) {
    const y = liftY(c);
    n = y === last && y > 15 * TILE ? n + 1 : 0;
    last = y;
    if (n >= 8) return;
    yield 0;
  }
  throw new Error(`${c.me.element}: the lift never came down`);
}

/** From the top hall, down the stairwell to the cellar floor. */
function* downStairs(c) {
  yield* go(c, 10);
  for (let i = 0; i < 5; i++) {
    yield* drop(c);
    yield* until(c, () => c.me.grounded === 1, 0, 200, 'landing on the next ledge');
  }
}

/** From the cellar floor, up the stairwell to the top hall. */
function* upStairs(c) {
  yield* go(c, 10);
  for (let i = 0; i < 5; i++) {
    const from = c.bottom;
    yield* jump(c, 0);
    if (c.bottom > from - TILE) throw new Error(`${c.me.element} missed a stair at ${c.bottom}`);
  }
}

/** Push a crate along a floor until its left edge reaches px. */
function* pushEast(c, crate, px, what) {
  yield* until(c, () => c.ent(crate).s.x >= px, IN_RIGHT, 900, what);
}
function* pushWest(c, crate, px, what) {
  yield* until(c, () => c.ent(crate).s.x <= px, IN_LEFT, 900, what);
}

/** Through the exit gate (a hop over the sludge under it) to the door at tile x. */
function* home(c, x) {
  yield* go(c, 7, { noHop: true });
  yield* until(c, () => c.ent('gate').s.open >= 4 * TILE - 2, 0, 3000, 'the gate to open');
  yield* jump(c, -1, { steerUntil: 4.8 });
  yield* go(c, x, { noHop: true });
}


// ---------------------------------------------------------------- the pieces each player does

/** Fire, phase A: crate A onto the lift's west half, ride it down, push it into the west niche. */
function* fireCrateA(c) {
  yield* pushEast(c, 'crateA', 24 * TILE + 1, 'crate A onto the lift');
  yield* jump(c, 1, { steerUntil: 25 });          // over the crate onto the east half
  yield* go(c, 25, { noHop: true });
  c.flag('fireAboardA');
  yield* waitLiftDown(c);
  yield* pushWest(c, 'crateA', 23 * TILE + 4, 'crate A into the west niche');
  yield* go(c, 24.6, { noHop: true });             // properly aboard, or the niche's roof stalls the lift
  c.flag('fireBackA');
  yield* until(c, () => liftAtTop(c), 0, 1200, 'the lift to rise');
}

/** Fire, phase B setup: crate B from the east nook onto the lift's east half, Fire on the west half. */
function* fireLoadB(c) {
  yield* go(c, 25, { noHop: true });
  yield* jump(c, 1, { steerUntil: 27.6 });         // over crate B into the nook
  yield* go(c, 27.6, { noHop: true });
  yield* pushWest(c, 'crateB', 25 * TILE + 2, 'crate B onto the lift');
  yield* jump(c, -1, { steerUntil: 24.2 });        // back over it onto the west half
  yield* go(c, 24.2, { noHop: true });
  c.flag('fireAboardB');
}

/** Earth, phase A: down to the shaft and up onto the stone. Earth at shoulder height calls the lift. */
function* earthOnStone(c, flag) {
  yield* go(c, 24, { noHop: true });
  yield* jump(c, 1, { steerUntil: 25 });
  yield* go(c, 25, { noHop: true });
  c.flag(flag);
}

/** Earth: from the cellar, up the stairs and down into the counterweight room. */
function* earthToWeight(c) {
  yield* go(c, 10);
  yield* upStairs(c);
  yield* go(c, 15);
  yield* drop(c);
  yield* until(c, () => c.me.grounded === 1, 0, 200, 'the room floor');
  yield* go(c, 16, { noHop: true });               // the gem in the corner
  yield* go(c, 14, { noHop: true });
  c.flag('earthOnWeight');
}

// ---------------------------------------------------------------- the intended solution

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* fireCrateA(c);
  yield* fireLoadB(c);
  yield* waitLiftDown(c);
  yield* until(c, () => c.ent('door').s.open >= 60, 0, 2000, 'the east door');
  yield* pushEast(c, 'crateB', 27 * TILE + 2, 'crate B to the east plate');
  yield* jump(c, -1, { steerUntil: 24.8 });        // back out of the doorway onto the lift
  yield* go(c, 24.8, { noHop: true });
  c.flag('fireBackB');
  yield* until(c, () => liftAtTop(c), 0, 1200, 'the lift to rise');
  yield* home(c, 2);
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* downStairs(c);
  yield* waitFlag(c, 'fireAboardA');
  yield* earthOnStone(c, 'earthOnStone');
  yield* waitFlag(c, 'fireBackA');
  yield* go(c, 24, { noHop: true });               // step off: the lift goes back up
  // Phase B: Earth is wanted on the counterweight, so it cannot be the one at shoulder height.
  yield* earthToWeight(c);
  yield* waitFlag(c, 'fireBackB');
  // Stay put until Fire and Water are home: Earth's door is the nearest, so it goes in last.
  yield* until(c, () => c.player('fire').inDoor === 1 && c.player('water').inDoor === 1, 0, 3000, 'the others to get home');
  yield* go(c, 15, { noHop: true });
  yield* jump(c, 0);
  yield* home(c, 4);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  // Follow Earth down; wait in the crawl until Earth is up on the stone.
  yield* until(c, () => c.player('earth').y > 12 * TILE, 0, 600, 'Earth to start down');
  yield* downStairs(c);
  yield* go(c, 22, { noHop: true });
  yield* waitFlag(c, 'earthOnStone');
  // Into the pocket under the grating.
  yield* go(c, 24, { noHop: true });
  yield* drop(c);
  yield* until(c, () => c.me.grounded === 1, 0, 200, 'the pocket floor');
  // Phase B: jump up under the stone and carry it: the stone at shoulder height calls the lift.
  yield* waitFlag(c, 'fireAboardB');
  yield* waitFlag(c, 'earthOnWeight');
  yield* go(c, 25, { noHop: true });
  yield* jump(c, 0);
  yield* waitFlag(c, 'fireBackB');
  yield* go(c, 22, { noHop: true });               // the crawl's roof scrapes the stone off
  yield* go(c, 10);
  yield* until(c, () => c.player('fire').inDoor === 1, 0, 3000, 'Fire to get home');
  yield* upStairs(c);
  yield* home(c, 3);
};

// ---------------------------------------------------------------- shortcuts that must fail

/** Fire, for both cheats: crate A as intended, then crate B down on whatever calls the lift. */
const fireTriesB = function* (c) {
  yield* fireCrateA(c);
  yield* fireLoadB(c);
  yield* waitLiftDown(c, 4000);
  yield* pushEast(c, 'crateB', 27 * TILE + 2, 'crate B to the east plate');
  yield* go(c, 24.8, { noHop: true });
  c.flag('fireBackB');
  yield* until(c, () => liftAtTop(c), 0, 1200, 'the lift to rise');
  yield* home(c, 2);
};

/** Cheat 1: Earth calls the lift for crate B as well, and nobody holds the counterweight. */
const earthCallsTwice = function* (c) {
  yield* downStairs(c);
  yield* waitFlag(c, 'fireAboardA');
  yield* earthOnStone(c, 'earthOnStone');
  yield* waitFlag(c, 'fireBackA');
  yield* go(c, 24, { noHop: true });
  yield* waitFlag(c, 'fireAboardB');
  yield* earthOnStone(c, 'earthOnStoneB');
  yield* waitFlag(c, 'fireBackB');
  yield* go(c, 22, { noHop: true });
  yield* go(c, 10);
  yield* upStairs(c);
  yield* home(c, 4);
};
const waterWaits = function* (c) {
  yield* waitFlag(c, 'fireBackB');
  yield* home(c, 3);
};

/** Cheat 2: Earth opens the east door, Water stands in the doorway to hold it, Earth calls the lift. */
const earthOpensThenCalls = function* (c) {
  yield* downStairs(c);
  yield* waitFlag(c, 'fireAboardA');
  yield* earthOnStone(c, 'earthOnStone');
  yield* waitFlag(c, 'fireBackA');
  yield* go(c, 24, { noHop: true });
  yield* earthToWeight(c);
  yield* waitFlag(c, 'waterInDoorway');
  yield* go(c, 15, { noHop: true });
  yield* jump(c, 0);                               // off the counterweight: the door shuts onto Water
  yield* downStairs(c);
  yield* waitFlag(c, 'fireAboardB');
  yield* earthOnStone(c, 'earthOnStoneB');
  yield* waitFlag(c, 'fireBackB');
  yield* go(c, 22, { noHop: true });
  yield* go(c, 10);
  yield* upStairs(c);
  yield* home(c, 4);
};
const waterHoldsTheDoor = function* (c) {
  yield* waitFlag(c, 'earthOnWeight');
  yield* downStairs(c);
  yield* go(c, 24, { noHop: true });
  yield* until(c, () => c.ent('door').s.open >= 60, 0, 2000, 'the east door');
  yield* jump(c, 1, { steerUntil: 26 });           // over the stone into the doorway
  yield* go(c, 26, { noHop: true });
  c.flag('waterInDoorway');
  // Make way for the crate when it arrives: step back onto the plate behind the door.
  yield* until(c, () => c.ent('crateB').s.x + 28 >= 26 * TILE - 2, 0, 4000, 'crate B to arrive');
  yield* until(c, () => c.tx >= 27.4, IN_RIGHT, 300, 'room behind the door');
  yield* until(c, () => false, 0, 3000, 'a way out');
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  sets: [
    {
      elements: ['fire', 'water', 'earth'],
      scripts: { fire, water, earth },
      shortcuts: [
        { name: 'Earth calls the lift for the second crate too', scripts: { fire: fireTriesB, water: waterWaits, earth: earthCallsTwice }, maxTicks: 6000 },
        { name: 'Water holds the east door open with its body while Earth calls the lift', scripts: { fire: fireTriesB, water: waterHoldsTheDoor, earth: earthOpensThenCalls }, maxTicks: 8000 },
      ],
    },
  ],
  roles: {
    'fire,water,earth': {
      fire: 'Rides the lift down with each crate and pushes it off into its niche.',
      water: 'Carries the stone on its head under the lift, so the lift comes down without Earth.',
      earth: 'Calls the lift the first time by standing on the stone, then holds the east door from the counterweight room.',
    },
  },
};
