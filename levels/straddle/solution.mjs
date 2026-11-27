// Straddle: one body standing on the join of two plates presses both.
// Door A wants four presses. The stone starts across the crawl pair (two of them). Dropping the
// stone into its slot arms the latched exit, but takes those two away, so every later crossing of
// A is paid for by people standing on seams: Fire on the home pair, Water on the crawl pair the
// stone left, and Earth on the heavy|light pair, which only Earth counts twice.
import { IN_RIGHT, TILE, go, jump, until, waitFlag } from '../../kit.mjs';

const doorOpen = (c, id) => c.ent(id).s.open >= 3 * TILE - 2;
const doorShut = (c, id) => c.ent(id).s.open === 0;

/** Climb from the hall floor onto the pedestal mouth (x22), then into the crawl. */
function* intoCrawl(c, x) {
  yield* go(c, 21);
  yield* jump(c, 1, { steerUntil: 22 });
  yield* go(c, x, { noHop: true });
}

/** Out of the crawl east: over the stone in its slot and down into the east hall. */
function* overTheSlot(c) {
  yield* go(c, 26, { noHop: true });
  yield* jump(c, 1, { steerUntil: 28.5 });
}

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  // 1. Hold the home pair: two presses, plus the stone's two, opens A.
  yield* go(c, 8.5);
  c.flag('homeHeld');
  // Stay until Earth is standing on the heavy|light pair and Water on the crawl pair.
  yield* waitFlag(c, 'earthOnStep');
  // 6. Out through A, past Earth, and wait at the foot of the pedestal for Water to leave the crawl.
  yield* go(c, 17);
  c.flag('fireOut');
  yield* until(c, () => c.player('water').x > 26.5 * TILE, 0, 2000, 'Water to leave the crawl');
  yield* intoCrawl(c, 25);
  yield* overTheSlot(c);
  yield* go(c, 36);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  // 2. Slip through A while the stone and Fire hold it, and wait in the middle hall.
  yield* waitFlag(c, 'homeHeld');
  yield* until(c, () => doorOpen(c, 'A'), 0, 600, 'A to open');
  yield* go(c, 17);
  // 3. Once the stone has dropped and Earth is back out of the crawl, take the stone's place.
  yield* waitFlag(c, 'earthBackInHall');
  yield* intoCrawl(c, 24.5);
  c.flag('waterOnCrawlPair');
  // 7. Leave when Fire is out of the home room.
  yield* waitFlag(c, 'fireOut');
  yield* overTheSlot(c);
  yield* go(c, 37);
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* waitFlag(c, 'homeHeld');
  yield* until(c, () => doorOpen(c, 'A'), 0, 600, 'A to open');
  // 2. Into the crawl, and push the stone east until it drops into its slot.
  yield* intoCrawl(c, 23);
  yield* until(c, () => c.ent('stone').s.y >= 18 * TILE - 2, IN_RIGHT, 900, 'the stone to drop into the slot');
  // A is shut again now: the stone's two presses are gone.
  // 3. Back out of the crawl, and wait by A for Water to take the crawl pair.
  yield* go(c, 21, { noHop: true });
  yield* go(c, 15.5);
  c.flag('earthBackInHall');
  yield* waitFlag(c, 'waterOnCrawlPair');
  yield* until(c, () => doorOpen(c, 'A'), 0, 600, 'A to open for the way home');
  // 4. Home, onto the heavy plate: with the stone in its slot the exit latches open.
  yield* go(c, 1);
  yield* until(c, () => c.ent('F').s.open > 0, 0, 300, 'the exit to latch');
  // 5. Back out and onto the heavy|light pair: Earth counts twice there.
  yield* go(c, 19.5);
  c.flag('earthOnStep');
  // 8. Last through, once Fire is past.
  yield* waitFlag(c, 'fireOut');
  yield* until(c, () => c.player('fire').x > 27 * TILE, 0, 2000, 'Fire to cross the slot');
  yield* intoCrawl(c, 25);
  yield* overTheSlot(c);
  yield* go(c, 35);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  sets: [
    {
      elements: ['fire', 'water', 'earth'],
      scripts: { fire, water, earth },
      shortcuts: [],
    },
  ],
  roles: {
    'fire,water,earth': {
      fire: 'Holds the home pair on its seam the whole time, and is the last one let out.',
      water: 'Takes the stone\'s place on the crawl pair once the stone has gone into its slot.',
      earth: 'Drops the stone into its slot, walks home to the heavy plate, then counts twice on the heavy|light pair.',
    },
  },
};
