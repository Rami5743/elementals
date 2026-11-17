import { IN_LEFT, IN_RIGHT, IN_JUMP, IN_INTERACT, TILE, go, until, waitFlag } from '../../kit.mjs';

/**
 * Walk to tile x, and only jump when the walk has actually stalled - which in this
 * level means the stone is in the way. Hopping blindly would send Air up the shaft.
 */
function* bound(c, x, hold = 14, max = 2400) {
  const goal = x * TILE + TILE / 2;
  let h = 0;
  let stuck = 0;
  for (let t = 0; t < max; t++) {
    const d = goal - c.cx;
    if (Math.abs(d) < 10 && c.me.grounded === 1) return;
    if (c.me.grounded === 1) {
      if (Math.abs(c.me.vx) < 0.4) stuck++;
      else stuck = 0;
      if (stuck > 6 && h <= 0) {
        h = hold;
        stuck = 0;
      }
    }
    yield (d > 0 ? IN_RIGHT : IN_LEFT) | (h-- > 0 ? IN_JUMP : 0);
  }
  throw new Error(`${c.me.element} could not bound to ${x} (at ${c.tx.toFixed(1)})`);
}

const open = (c) => c.ent('gate').s.open >= 30;

/**
 * Earth: fetches its gem from the far end of the tunnel first, because once anybody
 * else is in there nobody can get past them. Then it holds the heavy plate - the one
 * plate nothing else in the level can hold - for the whole of the rest of the level.
 * @type {import('../../kit.mjs').Script}
 */
const earth = function* (c) {
  yield* go(c, 22); // the gem at the far end, while the tunnel is still empty
  yield* go(c, 8); // and all the way back out, to let the other three file past
  c.flag('earth_out');
  yield* waitFlag(c, 'water_set');
  yield* go(c, 14); // the heavy plate
  c.flag('earth_set');
  yield* until(c, () => c.has('air_clear'), 0, 12000, 'water through and air clear');
  yield* go(c, 4);
};

/**
 * Air: crosses with Fire, works the turbine, and is the only one with a way home -
 * up the draught, back along the gallery, and into the tunnel again from the near end.
 * @type {import('../../kit.mjs').Script}
 */
const air = function* (c) {
  yield* waitFlag(c, 'earth_out');
  yield* go(c, 22); // the head of the queue, past the last plate
  c.flag('air_set');
  yield* until(c, () => open(c), 0, 12000, 'the gate');
  yield* bound(c, 35); // through, over the stone, onto the turbine
  c.flag('air_in_works');
  yield* until(c, () => c.ent('vault').s.open > 0, 0, 12000, 'the vault to latch');
  yield* bound(c, 30); // back west over the stone
  yield* until(c, () => c.tx < 27.4, IN_LEFT, 900, 'the foot of the shaft');
  yield* until(c, () => c.me.y < 4.6 * TILE, 0, 1800, 'the top of the shaft');
  yield* until(c, () => c.me.grounded === 1 && c.tx < 25.5, IN_LEFT, 900, 'the gallery');
  yield* go(c, 9); // the gem on the way west
  yield* until(c, () => c.me.grounded === 1 && c.bottom >= 19 * TILE, IN_LEFT, 900, 'the yard floor');
  yield* go(c, 11); // the third plate, which only somebody coming from the yard can reach
  c.flag('air_set2');
  yield* until(c, () => c.has('water_through'), 0, 12000, 'water through');
  yield* go(c, 2);
  c.flag('air_clear');
};

/**
 * Fire: crosses with Air, lights the torch at the far end of the works and then walks
 * all the way back to the crank, because the belt wants both at once.
 * @type {import('../../kit.mjs').Script}
 */
const fire = function* (c) {
  yield* waitFlag(c, 'air_set');
  yield* go(c, 21);
  c.flag('fire_set');
  yield* until(c, () => open(c), 0, 12000, 'the gate');
  yield* waitFlag(c, 'air_in_works');
  yield* bound(c, 34); // the torch, past the stone and its gem
  yield* bound(c, 25); // back to the crank at the mouth
  yield* until(c, () => c.ent('p_stone').s.on === 1, IN_INTERACT, 3000, 'the stone on its plate');
  yield* bound(c, 38); // out of the mouth of the tunnel, so Water can come through it
};

/**
 * Water: the spare body. She holds the second plate while Fire and Air cross, and can
 * only cross herself once Air has come the long way round to take the third plate.
 * @type {import('../../kit.mjs').Script}
 */
const water = function* (c) {
  yield* waitFlag(c, 'fire_set');
  yield* go(c, 18);
  c.flag('water_set');
  yield* until(c, () => c.has('air_set2') && open(c), 0, 14000, 'the gate a second time');
  yield* bound(c, 26); // her gem is in the tunnel on the way
  c.flag('water_through');
  yield* bound(c, 37);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'single_file',
  sets: [{ elements: ['fire', 'water', 'earth', 'air'], scripts: { fire, water, earth, air } }],
  roles: {
    'fire,water,earth,air': {
      earth: 'Holds the heavy plate, and so can never go through the gate.',
      water: 'The spare body on the second plate, and the last one across.',
      fire: 'Lights the torch at the far end of the works and holds the crank at the near end.',
      air: 'Works the turbine, then rides the draught home to take the third plate.',
    },
  },
};
