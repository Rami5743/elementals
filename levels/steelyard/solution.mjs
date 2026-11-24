import { IN_LEFT, IN_RIGHT, IN_JUMP, TILE, go, jump, until, wait, waitFlag } from '../../kit.mjs';

const beam = (c) => c.ent('beam').s;

/** Hopping walk: keeps jumping while it travels, for climbing a stair of one-tile steps. */
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

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  // down the west stairwell into the cellar, taking the gem on the way east
  yield* go(c, 4);
  yield* go(c, 6);
  yield* go(c, 12);
  yield* go(c, 23);
  // up onto pan A, east of the stone
  yield* jump(c, -1, { hold: 14 });
  yield* wait(c, 20);
  c.flag('aboard');
  // wait for Fire to load the far pan
  yield* waitFlag(c, 'crates');
  // shove the stone off the west end of the pan: it drops onto the heavy plate,
  // and the pan it leaves is the pan that rises
  yield* until(c, () => c.tx <= 20.6, IN_LEFT, 600, 'shove the stone off the pan');
  yield* until(c, () => beam(c).d <= -120, 0, 600, 'the pan to rise');
  // off at gallery-left, gem, through the gate, into the door
  yield* go(c, 17);
  yield* go(c, 12);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  // down the west stairwell, east along the cellar, up the lava stair
  yield* go(c, 4);
  yield* go(c, 6);
  yield* go(c, 10);
  yield* go(c, 26);
  yield* bound(c, 27);          // tread row 19
  yield* bound(c, 30);          // tread row 17
  yield* bound(c, 33);          // tread row 15
  yield* bound(c, 36);          // tread row 13
  yield* bound(c, 34);          // up through the hole onto gallery-right
  yield* go(c, 29);             // the fire gem
  yield* waitFlag(c, 'aboard');
  // three crates west onto pan B
  yield* go(c, 27);
  yield* until(c, () => c.tx <= 24.5, IN_LEFT, 900, 'crate 1 onto the pan');
  yield* go(c, 28);
  yield* until(c, () => c.tx <= 25.5, IN_LEFT, 900, 'crate 2 onto the pan');
  yield* go(c, 29);
  yield* until(c, () => c.tx <= 26.5, IN_LEFT, 900, 'crate 3 onto the pan');
  yield* go(c, 27);
  c.flag('crates');
  yield* go(c, 33);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'steelyard',
  sets: [{ elements: ['fire', 'earth'], scripts: { fire, earth } }],
  roles: {
    'fire,earth': {
      fire: 'Climbs the lava stair nobody else survives and loads the far pan from the gallery.',
      earth: 'The only one who can shift the stone, and the passenger the beam has to lift.',
    },
  },
};
