// One Through: a lock that wants three keys held at once, and four players to find out what that means.
import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, interact, until, wait, waitFlag } from '../../kit.mjs';
import { clear } from '../_lib.mjs';

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

/** Down the shaft beside the lock, along the passage Fire opened, and up at the far end. */
function* theLongWayRound(c, home) {
  yield* go(c, 4);
  yield* until(c, () => c.me.grounded === 1 && c.bottom === 19 * TILE, 0, 300, 'the crawl');
  yield* until(c, () => c.tx >= 29.8, IN_RIGHT, 900, 'the far end of the crawl');
  for (let k = 0; k < 8; k++) {                      // up through the ledge into the hall
    for (let t = 0; t < 18; t++) yield IN_JUMP;
    for (let t = 0; t < 14; t++) yield 0;
    if (c.me.grounded === 1 && c.bottom <= 17 * TILE) break;
  }
  if (c.bottom > 17 * TILE) throw new Error(`${c.me.element} never climbed out of the crawl (at ${c.tx.toFixed(1)})`);
  yield* go(c, home);
}

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* clear(c, 'flames', IN_LEFT);                // only Water opens the alcove at all
  yield* bound(c, 1);                                // hopping the shaft in the alcove floor                                   // its gem, then the third key
  yield* bound(c, 2);
  c.flag('w_held');
  yield* waitFlag(c, 'bypass_open');
  yield* theLongWayRound(c, 33);
  c.flag('water_home');
  yield* wait(c, 900);
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* bound(c, 15);                               // its gem
  yield* bound(c, 8);                                // back onto the heavy plate
  c.flag('e_held');
  yield* waitFlag(c, 'water_home');
  yield* theLongWayRound(c, 32);
  c.flag('earth_home');
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* bound(c, 17);                               // its gem
  yield* bound(c, 12);                               // back onto the turbine
  c.flag('a_held');
  yield* waitFlag(c, 'earth_home');
  yield* theLongWayRound(c, 31);
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'w_held');
  yield* waitFlag(c, 'e_held');
  yield* waitFlag(c, 'a_held');
  yield* until(c, () => c.ent('lock').s.open >= 60, 0, 300, 'the lock');
  yield* bound(c, 19);                               // over the two holding their plates
  yield* until(c, () => c.tx > 21, IN_RIGHT, 300, 'through the lock');   // walking: the lintel is low
  yield* go(c, 22);                                  // the only one nobody needs as a key
  yield* clear(c, 'icewall');
  yield* go(c, 28);
  yield* interact(c);                                // the lever that opens the way back for the rest
  yield* until(c, () => c.ent('bypass').s.open > 0, 0, 240, 'the passage door');
  c.flag('bypass_open');
  yield* go(c, 34);
  yield* wait(c, 900);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'one_through',
  sets: [{ elements: ['fire', 'water', 'earth', 'air'], scripts: { fire, water, earth, air } }],
  roles: {
    'earth,fire,water,air': {
      water: 'The only one who can open the alcove, and then the only one holding the key inside it.',
      earth: 'The only one heavy enough for the second key.',
      air: 'The only one a turbine answers to — the third key.',
      fire: 'The one nobody needs as a key, and so the only one who can go through: it opens the way back for the other three.',
    },
  },
};
