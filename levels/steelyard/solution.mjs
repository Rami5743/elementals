import { IN_LEFT, IN_RIGHT, IN_JUMP, TILE, go, jump, leap, until, wait, waitFlag } from '../../kit.mjs';

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


/** Jump onto a ledge whose surface is tile row `row`: rise first, then drift across. */
function* step(c, x, row, takeoff, lead = 8) {
  const goal = x * TILE + TILE / 2;
  const dir = goal > c.cx ? IN_RIGHT : IN_LEFT;
  // back off to the take-off mark: a two-tile ledge cannot be jumped from under its lip
  if (takeoff !== undefined) {
    const away = takeoff * TILE + TILE / 2;
    yield* until(c, () => (dir === IN_RIGHT ? c.cx <= away : c.cx >= away),
      dir === IN_RIGHT ? IN_LEFT : IN_RIGHT, 200, `the take-off mark at ${takeoff}`);
  }
  // release jump (the press must be an edge) and let any slide die away first
  for (let t = 0; t < 30 && (t < 4 || Math.abs(c.me.vx) > 0.2); t++) yield 0;
  let top = c.bottom, trace = [];
  for (let t = 0; t < 120; t++) {
    const bits = (t < 18 ? IN_JUMP : 0) | (t >= lead && Math.abs(goal - c.cx) > 6 ? dir : 0);
    yield bits;
    top = Math.min(top, c.bottom);
    if (t < 40) trace.push(`${t}:b${bits}:${c.bottom}@${c.tx.toFixed(2)}`);
    if (t > 22 && c.me.grounded === 1) break;
  }
  if (c.me.grounded === 1 && Math.abs(c.bottom - row * TILE) < 3) return;
  throw new Error(`${c.me.element} missed row ${row} (want ${row * TILE}, highest ${top}, tx ${c.tx.toFixed(1)}) ${trace.join(' ')}`);
}

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  // the beam opens dead level, flush with the hall floor. Rolling the stone onto the near
  // pan sinks that pan into the cellar -- and that is what lifts the far pan up to Fire.
  yield* go(c, 6.6, { tol: 5 });
  yield* until(c, () => c.tx >= 20.6, IN_RIGHT, 1500, 'the stone onto the pan');
  yield* until(c, () => c.tx >= 21.4, IN_RIGHT, 300, 'aboard the pan');
  yield* until(c, () => beam(c).d >= 120, 0, 400, 'the pan to settle in the cellar');
  // the stone alone keeps the pan at the bottom, so Earth can get off and come back
  yield* go(c, 12);                        // the gem on the cellar floor
  yield* go(c, 23.6);                      // round under the pan to its far side
  yield* jump(c, -1, { hold: 14 });        // back aboard, two tiles up
  yield* wait(c, 20);
  c.flag('aboard');
  // wait for Fire to load the far pan, then hop over the stone to get at its far side
  yield* waitFlag(c, 'crates');
  yield* bound(c, 22.4);
  // shove the stone off the west end of the pan: it drops onto the heavy plate,
  // and the pan it leaves is the pan that rises
  yield* until(c, () => c.ent('stone').s.y > 600, IN_LEFT, 600, 'shove the stone off the pan');
  // stand square on the pan again: a shoulder over the edge would jam it on the way up
  yield* until(c, () => c.tx >= 21, IN_RIGHT, 200, 'square on the pan');
  yield* until(c, () => beam(c).d <= -120, 0, 600, 'the pan to rise');
  // off at gallery-left, gem, through the gate, into the door
  yield* go(c, 17);
  yield* go(c, 12);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  // Fire's whole job is up here: the far pan can only be loaded from the gallery
  yield* waitFlag(c, 'aboard');
  // the crates go west onto pan B, which is parked level with the gallery floor,
  // nearest one first so they do not jam against each other
  yield* until(c, () => c.tx <= 24.4, IN_LEFT, 900, 'the first crate onto the pan');
  yield* bound(c, 31);                    // hop east over the next crate
  yield* until(c, () => c.tx <= 25.4, IN_LEFT, 900, 'the second crate onto the pan');
  yield* bound(c, 33);
  yield* until(c, () => c.tx <= 26.4, IN_LEFT, 900, 'the third crate onto the pan');
  yield* go(c, 27);                       // clear of the pan, and the gem on the way
  c.flag('crates');
  // the stone landing on the pad down in the cellar is what unlocks both doors
  yield* until(c, () => c.ent('gate_f').s.open >= 90, 0, 1200, 'the stone to reach the pad');
  yield* go(c, 36);
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
