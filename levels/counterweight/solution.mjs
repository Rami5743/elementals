// Counterweight: the stone that holds the gate open is the stone the vault wants.
import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { drop, go, interact, until, wait, waitFlag } from '../../kit.mjs';

function* bound(c, x, hold = 14, max = 1200) {
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

/** Up through the grating from the crawl, or down through a ledge into it. */
function* climbOut(c, max = 8) {
  for (let k = 0; k < max; k++) {
    for (let t = 0; t < 18; t++) yield IN_JUMP;
    for (let t = 0; t < 14; t++) yield 0;
    if (c.me.grounded === 1 && c.bottom <= 17 * TILE) return;
  }
  throw new Error(`${c.me.element} never climbed out of the crawl (at ${c.tx.toFixed(1)})`);
}

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* until(c, () => c.ent('rock_1').s.x <= 3 * TILE, IN_LEFT, 1200, 'the stone onto the holding plate');
  yield* until(c, () => c.ent('gate_a').s.open > 0, 0, 240, 'the far gate to open');
  c.flag('gate_open');
  yield* waitFlag(c, 'water_across');                // taking the stone back shuts it behind Water
  yield* bound(c, 19);                               // its gem, and round to the stone's other side
  yield* bound(c, 1);
  yield* until(c, () => c.ent('rock_1').s.x >= 14 * TILE, IN_RIGHT, 1200, 'the stone onto the grating');
  yield* bound(c, 17);                               // over the stone, clear of the lid's two tiles
  c.flag('stone_set');
  yield* waitFlag(c, 'key_set');
  yield* drop(c);                                    // down through the grating into the crawl
  yield* until(c, () => c.me.grounded === 1 && c.bottom === 19 * TILE, 0, 240, 'the crawl');
  yield* until(c, () => c.tx >= 33.5, IN_RIGHT, 1200, 'the far end of the crawl');
  yield* climbOut(c);
  c.flag('earth_up');
  yield* go(c, 37);
  yield* wait(c, 900);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 18);                                  // out of the stone's road
  yield* waitFlag(c, 'gate_open');
  yield* go(c, 23);                                  // through while the stone still holds the gate
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_RIGHT, 600, 'the flames');
  yield* go(c, 27);                                  // its gem
  yield* go(c, 30);                                  // the lever, now on the wrong side of the gate
  c.flag('water_across');
  yield* waitFlag(c, 'stone_set');
  yield* interact(c);                                // the lid comes down on the stone
  yield* until(c, () => c.ent('vaultkey').s.on === 1, 0, 600, 'the stone through the grating');
  c.flag('key_set');
  yield* go(c, 32);
  yield* wait(c, 900);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'counterweight',
  sets: [{ elements: ['water', 'earth'], scripts: { water, earth } }],
  roles: {
    'earth,water': {
      earth: 'The only one who can move the stone — onto the plate to open the gate, and off it again to feed the grating, which shuts the gate on Water.',
      water: 'Puts out the flames and works the lever, which can only be reached from the side the stone locks it on.',
    },
  },
};
