import { IN_LEFT, IN_RIGHT, IN_JUMP, TILE, go, jump, until, drop } from '../../kit.mjs';

const GALLERY = 8 * TILE; // feet of anyone standing on the gallery floor
const HALL = 20 * TILE;    // feet of anyone standing on the hall floor
const DOWN = 20 * TILE;    // the hoist parked at the bottom of its shaft

/** Hop along the floor to tile x — the way past a boulder or a partner. */
function* bound(c, x, hold = 14, max = 1500) {
  const goal = x * TILE + TILE / 2;
  let h = 0;
  for (let t = 0; t < max; t++) {
    const d = goal - c.cx;
    if (Math.abs(d) < 14) {
      if (c.me.grounded === 1) return;
      yield 0;                                   // near the goal and airborne: just land
      continue;
    }
    if (c.me.grounded === 1) h = hold;
    yield (d > 0 ? IN_RIGHT : IN_LEFT) | (h-- > 0 ? IN_JUMP : 0);
  }
  throw new Error(`${c.me.element} could not bound to ${x} (at ${c.tx.toFixed(2)})`);
}

/** Walk the stone along, guarding on where the stone has got to. */
function* push(c, dir, stoneTile, max = 3000) {
  const bits = dir > 0 ? IN_RIGHT : IN_LEFT;
  const goal = stoneTile * TILE;
  yield* until(c, () => (dir > 0 ? c.ent('rock').s.x >= goal : c.ent('rock').s.x <= goal), bits, max,
    `${c.me.element} to walk the stone to ${stoneTile}`);
}

/**
 * Air is the engine. The turbine answers to nobody else and the hoist runs only while Air is
 * standing on it, so Air works every trip and can never be on one.
 */
const air = function* (c) {
  yield* until(c, () => c.has('fire_aboard'), 0, 4000, 'Fire to board the hoist');
  yield* go(c, 6);                                        // onto the turbine
  yield* until(c, () => c.has('fire_clear'), 0, 6000, 'Fire to step off at the top');
  yield* go(c, 8);                                        // off: the hoist comes home empty
  yield* until(c, () => c.has('earth_aboard'), 0, 12000, 'Earth to board on top of the stone');
  yield* go(c, 6);                                        // back on the turbine
  yield* until(c, () => c.has('earth_clear'), 0, 9000, 'Earth to step off at the top');
  yield* go(c, 8);                                        // off: the hoist drops away, the stone stays
  // The stone can never come back down, so Earth has to. Air works the hoist one more time.
  yield* until(c, () => c.has('earth_aboard2'), 0, 16000, 'Earth to come back for a third ride');
  yield* go(c, 6);
  yield* until(c, () => c.has('earth_clear2'), 0, 9000, 'Earth to step off for the last time');
  yield* go(c, 8);
  yield* until(c, () => c.ent('gate_air').s.open >= 6 * TILE - 4, 0, 16000, "Air's gate");
  yield* go(c, 3);                                        // the gem
  yield* go(c, 2);                                        // the door
};

/**
 * Fire rides up first, with nothing to carry, and stands on the gallery plate: that plate is
 * the only thing that unlocks the loading bay down in the hall.
 */
const fire = function* (c) {
  yield* go(c, 10);                                       // onto the parked hoist
  yield* until(c, () => c.ent('hoist').s.y >= DOWN - 1 && c.me.grounded === 1, 0, 2000, 'the hoist to come home');
  c.flag('fire_aboard');
  yield* until(c, () => c.bottom <= GALLERY + 1, 0, 6000, 'the hoist to reach the gallery');
  yield* go(c, 13);                                       // onto the gallery plate
  c.flag('fire_clear');
  // Fire has to hold this plate for as long as the loading bay below is in use. Only when the
  // stone itself lands on the plate is Fire free to go.
  yield* until(c, () => c.has('stone_on_plate'), 0, 16000, 'the stone to take over the plate');
  yield* bound(c, 9);                                     // hop west over the stone
  yield* go(c, 4);                                        // the gem
  yield* go(c, 3);                                        // the torch lights on contact
  yield* until(c, () => c.ent('torch').s.on === 1, 0, 600, 'the torch');
  c.flag('torch_lit');
  yield* go(c, 2);                                        // the door
};

/** Earth: the only one who can move the stone, below and above — so Earth has to travel with it. */
const earth = function* (c) {
  yield* go(c, 18);                                       // up to the loading gate
  yield* until(c, () => c.ent('gate_load').s.open >= 6 * TILE - 4, 0, 14000, 'the loading gate');
  yield* bound(c, 23.6);                                  // hop over the stone to its east side
  yield* push(c, -1, 10);                                 // walk it west onto the hoist
  yield* until(c, () => c.me.grounded === 1, 0, 300, 'Earth to settle');
  // The hoist takes one load. Earth is the only one who can take the stone off at the top, so
  // Earth has to be part of that load: climb on top of the stone and ride up with it.
  yield* jump(c, -1, { hold: 20, steerUntil: 10.7 });
  yield* until(c, () => c.me.grounded === 1, 0, 120, 'Earth to land on the stone');
  if (c.bottom > HALL - 20) throw new Error(`Earth is not on the stone (bottom ${c.bottom}, tx ${c.tx.toFixed(2)})`);
  c.flag('earth_aboard');
  yield* until(c, () => c.bottom <= GALLERY - 20, 0, 8000, 'the hoist to lift the stone');
  yield* go(c, 8);                                        // step off west, leaving the stone on the grating
  c.flag('earth_clear');
  yield* until(c, () => c.ent('hoist').s.y >= DOWN - 1, 0, 2000, 'the hoist to drop away');
  yield* push(c, 1, 12);                                  // the stone onto the gallery plate
  c.flag('stone_on_plate');
  yield* until(c, () => c.has('torch_lit'), 0, 12000, 'Fire to light the torch');
  yield* push(c, 1, 16);                                  // on east, onto the heavy plate: Air's gate opens
  yield* until(c, () => c.ent('pg').s.on === 1, 0, 600, 'the stone to settle on the heavy plate');

  // Act three. The stone is up here for good, so the heavy plate down in the vault can only be
  // stood on by Earth — who then has to be hoisted a third time.
  yield* go(c, 9);                                        // back to the grating
  yield* drop(c);                                         // people go down through it; cargo never does
  yield* until(c, () => c.me.grounded === 1 && c.bottom >= HALL - 1, 0, 400, 'Earth to land in the hall');
  yield* go(c, 27);                                       // east through the bay and the vault, taking the gem
  yield* go(c, 28);                                       // onto the vault's heavy plate
  yield* until(c, () => c.ent('gate_earth').s.open >= 4 * TILE - 4, 0, 1200, "Earth's gate to latch open");
  yield* go(c, 10);                                       // all the way back to the hoist
  yield* until(c, () => c.ent('hoist').s.y >= DOWN - 1 && c.me.grounded === 1, 0, 2000, 'the hoist to come home');
  c.flag('earth_aboard2');
  yield* until(c, () => c.bottom <= GALLERY + 1, 0, 8000, 'the last ride up');
  yield* go(c, 13);                                       // off the hoist
  c.flag('earth_clear2');
  yield* bound(c, 20);                                    // hop east over the stone on the heavy plate
  yield* go(c, 25);                                       // the gem
  yield* go(c, 26);                                       // the door
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'dumbwaiter',
  sets: [{ elements: ['fire', 'earth', 'air'], scripts: { fire, earth, air } }],
  roles: {
    'fire,earth,air': {
      air: 'The engine. Only Air turns the turbine, and the hoist runs only while Air is on it — so Air works every trip and never rides one.',
      fire: 'Goes up empty, first, and holds the gallery plate: the only thing that unlocks the loading bay below. Lights the torch that opens Earth\'s way.',
      earth: 'The only one who can move the stone at either end, so Earth has to arrive on top of it.',
    },
  },
};
