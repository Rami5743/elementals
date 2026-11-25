import {
  IN_LEFT, IN_RIGHT, IN_JUMP, IN_DOWN, TILE,
  go, until, wait, drop, pound, waitFlag,
} from '../../kit.mjs';

// --- the shapes of the level, in tiles ----------------------------------------------------------
// gallery floor row 13: rock 1..15, wooden ledge at 16, the slab 17..22, rock 23..38
// the crawl: row 14 over the floor at row 15, cracked panel at (20,15)
// the lower hall: rows 16..18 over the floor at row 19, pedestal at (20,18)

const GALLERY = 13 * TILE;        // the gallery floor's surface
const CRAWL = 15 * TILE;          // the crawl's floor
const PEDESTAL = 18 * TILE;       // the block under the panel hole
const HALL = 19 * TILE;           // the lower hall's floor

const slabGone = (c) => c.ent('slab').s.open >= 190;

/** Walk inside the crawl, where the roof is too low for anyone to hop over anyone. */
function* creep(c, x) {
  yield* go(c, x, { noHop: true, max: 1500 });
}

/** Fall off the lip at tile 23 into the crawl, then work left to the panel hole and drop through. */
function* downTheHole(c) {
  yield* until(c, () => c.bottom >= CRAWL && c.me.grounded === 1, IN_LEFT, 900, 'the crawl floor');
  yield* until(c, () => c.bottom >= PEDESTAL && c.me.grounded === 1, IN_LEFT, 900, 'the lower hall');
}

/** Step off the pedestal onto the hall floor and walk to x. */
function* intoTheHall(c, x) {
  yield* until(c, () => c.bottom >= HALL && c.me.grounded === 1, IN_RIGHT, 400, 'the hall floor');
  yield* go(c, x);
}

// --- Earth: the stone, and the floor nobody else can break ---------------------------------------
const earth = function* (c) {
  // A look at what cannot be done yet: into the crawl through the wooden ledge, take the gem,
  // stand on the panel and try. One tile of roof means no jump, and a pound is a jump first.
  yield* go(c, 16);
  yield* drop(c);
  yield* creep(c, 21);                               // the earth gem
  yield* creep(c, 20);                               // standing on the panel
  yield* wait(c, 20, IN_JUMP);
  yield* wait(c, 10, IN_DOWN);
  if (c.ent('panel').s.gone) throw new Error('the panel broke under the closed slab');

  // Back out of the mouth: a jump up through the wooden ledge is two tiles, which Earth has.
  yield* creep(c, 16);
  yield* wait(c, 20, IN_JUMP);
  yield* until(c, () => c.me.grounded === 1 && c.bottom <= GALLERY, 0, 500, 'the gallery floor');
  yield* go(c, 11);                                  // out of the mouth, clear of the crossing
  c.flag('earth_out');

  // Nothing may be taken off the pad until the far end of the gallery has given up its two keys.
  yield* waitFlag(c, 'keys');
  yield* until(c, () => c.tx <= 6.35, IN_LEFT, 1500, 'the stone off the pad');

  // Earth is still standing on the pad itself. Walking away is what finally opens the slab.
  yield* go(c, 16);
  yield* until(c, () => slabGone(c), 0, 900, 'the slab to slide away');

  // Two tiles of roof now, so the pound works.
  yield* drop(c);
  yield* creep(c, 20);
  yield* wait(c, 14, IN_JUMP);
  yield* pound(c);
  yield* until(c, () => c.ent('panel').s.gone === 1, 0, 400, 'the panel to break');
  yield* until(c, () => c.bottom >= PEDESTAL && c.me.grounded === 1, 0, 600, 'the pedestal');
  c.flag('hole');

  yield* intoTheHall(c, 26);
  yield* waitFlag(c, 'air_in');
  yield* go(c, 36);
  c.flag('earth_in');
};

// --- Fire: the torch at the far end, which can only be reached over the slab ----------------------
const fire = function* (c) {
  yield* waitFlag(c, 'earth_out');
  yield* go(c, 28);                                  // the fire gem, over the slab
  yield* go(c, 35);                                  // the torch lights on contact
  yield* until(c, () => c.ent('torch').s.on === 1, 0, 300, 'the torch to light');
  c.flag('torch_lit');

  yield* waitFlag(c, 'air_down');
  yield* go(c, 23);
  yield* downTheHole(c);
  yield* intoTheHall(c, 26);
  yield* waitFlag(c, 'earth_in');
  yield* go(c, 34);
  c.flag('fire_in');
};

// --- Air: the roof gem, and the turbine that closes the gate's pair -------------------------------
const air = function* (c) {
  yield* waitFlag(c, 'earth_out');
  yield* go(c, 26);                                  // under the chimney in the gallery roof
  yield* wait(c, 30, IN_JUMP);
  yield* until(c, () => c.me.grounded === 1, 0, 300, 'back on the gallery floor');

  // The gate wants both keys on at the same moment, and only the torch stays on by itself.
  yield* waitFlag(c, 'torch_lit');
  yield* go(c, 31);
  yield* until(c, () => c.ent('gate').s.on === 1, 0, 400, 'the gate to latch');
  c.flag('keys');

  yield* waitFlag(c, 'ice');
  yield* go(c, 23);
  yield* downTheHole(c);
  yield* intoTheHall(c, 38);
  c.flag('air_in');
};

// --- Water: down behind Earth, then the freeze pad ------------------------------------------------
const water = function* (c) {
  yield* waitFlag(c, 'hole');
  yield* go(c, 16);
  yield* drop(c);
  yield* creep(c, 20);
  yield* until(c, () => c.bottom >= PEDESTAL && c.me.grounded === 1, 0, 600, 'the pedestal');
  yield* intoTheHall(c, 25);                         // the water gem at 21 is on the way to the pad
  yield* until(c, () => c.ent('pool').s.on === 1, 0, 400, 'the pool to freeze');
  c.flag('air_down');
  c.flag('ice');

  yield* waitFlag(c, 'fire_in');
  yield* go(c, 32);
};

// --- shortcuts that must fail ---------------------------------------------------------------------

/** Earth never touches the stone and tries to pound the panel under the closed slab. */
const earthPoundsUnderTheSlab = function* (c) {
  yield* go(c, 16);
  yield* drop(c);
  yield* creep(c, 20);
  for (let i = 0; i < 40; i++) {
    yield* wait(c, 14, IN_JUMP);
    yield* wait(c, 6, IN_DOWN);
    yield* wait(c, 4, 0);
  }
  yield* wait(c, 600);
};

/** Earth parks on the heavy pad so the bridge stays up for everybody else. */
const earthHoldsThePad = function* (c) {
  yield* until(c, () => c.tx <= 6.5, IN_LEFT, 1500, 'the pad');
  yield* wait(c, 4000);
};

/** Fire tries to jump the six-tile hole once the slab has gone. */
const fireJumpsTheHole = function* (c) {
  yield* waitFlag(c, 'hole');
  for (let i = 0; i < 12; i++) {
    yield* go(c, 12, { max: 900 });
    yield* until(c, () => c.tx >= 15.4 || c.bottom > GALLERY, IN_RIGHT, 300, 'the lip');
    yield* wait(c, 30, IN_RIGHT | IN_JUMP);
    yield* until(c, () => c.me.grounded === 1, IN_RIGHT, 300, 'a landing');
    if (c.tx > 23) break;
    if (c.bottom > GALLERY) return;                  // fell into the crawl: the hole is not jumpable
  }
  yield* wait(c, 600);
};

/** A partner who simply waits, so a shortcut set is still four scripts. */
const idle = function* (c) {
  yield* wait(c, 5800);
};

/** For the pad shortcut: the others do everything they can without Earth's pound. */
const fireTriesAlone = function* (c) {
  yield* go(c, 28);
  yield* go(c, 35);
  yield* until(c, () => c.ent('torch').s.on === 1, 0, 300, 'the torch to light');
  c.flag('torch_lit');
  yield* wait(c, 4000);
};

const airTriesAlone = function* (c) {
  yield* go(c, 26);
  yield* wait(c, 30, IN_JUMP);
  yield* until(c, () => c.me.grounded === 1, 0, 300, 'the gallery floor');
  yield* waitFlag(c, 'torch_lit');
  yield* go(c, 31);
  yield* until(c, () => c.ent('gate').s.on === 1, 0, 400, 'the gate to latch');
  c.flag('keys');
  yield* go(c, 23);
  yield* wait(c, 3000);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  sets: [
    {
      elements: ['fire', 'water', 'earth', 'air'],
      scripts: { fire, water, earth, air },
      shortcuts: [
        {
          name: 'Earth pounds under the closed slab',
          scripts: { fire: fireTriesAlone, water: idle, earth: earthPoundsUnderTheSlab, air: airTriesAlone },
        },
        {
          name: 'Earth holds the pad for the others',
          scripts: { fire: fireTriesAlone, water: idle, earth: earthHoldsThePad, air: airTriesAlone },
        },
        {
          name: 'Fire jumps the slab hole',
          scripts: { fire: fireJumpsTheHole, water, earth, air },
        },
      ],
    },
  ],
  roles: {
    'fire,water,earth,air': {
      fire: 'Lights the torch at the far end of the gallery — the key that stays on by itself.',
      water: 'Freezes the pool between the gate and the four doors.',
      earth: 'Takes the stone off the pad, and is the only one who can break the panel once there is room to jump.',
      air: 'Touches the turbine to close the gate’s pair, and is the only one who can re-cross the hole.',
    },
  },
};
