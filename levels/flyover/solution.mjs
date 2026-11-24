// Flyover — every switch hangs in the air, so somebody has to be in it.
import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE, go, leap, until, waitFlag } from '../../kit.mjs';

const stoneDown = (c) => c.ent('stone').s.y >= 19 * TILE;

/** Climb the one-way shelves in the well: a jump straight up lands on the next one. */
function* upWell(c, n) {
  for (let i = 0; i < n; i++) yield* leap(c, 2);
}

/** Run to the lip of a launch ledge and sail across the shaft on the draught. */
function* launch(c, what) {
  yield* until(c, () => c.tx >= 11.4, IN_RIGHT, 400, `the lip of ${what}`);
  for (let t = 0; t < 14; t++) yield IN_RIGHT | IN_JUMP;        // a full jump; the wind holds it up
  yield* until(c, () => c.me.grounded === 0, IN_RIGHT, 30, 'the air');
  yield* until(c, () => c.me.grounded === 1, IN_RIGHT, 600, 'the landing ledge');
}

/** From the landing ledge back round to the cellar: step into the shaft and sink. */
function* backRound(c) {
  yield* until(c, () => c.tx <= 21.6, IN_LEFT, 300, 'the edge of the landing ledge');
  yield* until(c, () => c.me.grounded === 1 && c.bottom > 19 * TILE, IN_LEFT, 600, 'the cellar floor');
}

/** Earth: the only body heavy enough to start the draught — and the only one it never lifts. */
const earth = function* (c) {
  yield* go(c, 9);                                        // the heavy plate: the draught starts
  yield* until(c, () => stoneDown(c), 0, 8000, 'the stone to be posted');
  yield* go(c, 21);                                       // under the gate, ready to go
  yield* until(c, () => c.has('fire_set') && c.has('water_set') && c.has('crank_on'), 0, 8000, 'the others');
  c.flag('launch');
  yield* until(c, () => c.ent('gate').s.open >= 34, 0, 900, 'the gate');
  yield* go(c, 26);                                       // through, and the gem beyond it
  yield* go(c, 24);                                       // home
};

/** Air: the only one the draught lifts, and the only one a turbine answers to. */
const air = function* (c) {
  yield* until(c, () => c.ent('wind').s.on === 1, 0, 1200, 'the draught');
  yield* until(c, () => c.bottom <= 100, IN_JUMP, 900, 'the top of the shaft');
  yield* until(c, () => c.tx >= 20.8, IN_JUMP | IN_RIGHT, 300, 'the mouth of the loft');
  c.flag('air_ready');
  yield* until(c, () => c.ent('hatch').s.open >= 80, IN_JUMP, 6000, 'the hatch');
  yield* until(c, () => c.me.grounded === 1, IN_RIGHT, 300, 'the loft floor');
  yield* go(c, 26);                                       // the gem
  yield* go(c, 30);                                       // stand on the crank
  c.flag('crank_on');
  yield* until(c, () => stoneDown(c), 0, 900, 'the stone to land');
  yield* until(c, () => c.player('earth').x >= 23 * TILE, 0, 9000, 'earth through the gate');
  yield* go(c, 33);                                       // its own door, up in the loft
};

/** Water: the low deck. Flies once to let Air into the loft, then again for the gate. */
const water = function* (c) {
  yield* go(c, 2);
  yield* upWell(c, 3);                                    // shelves at rows 18, 16, 14
  yield* leap(c, 6);                                      // onto the low ledge
  yield* go(c, 8);
  yield* waitFlag(c, 'air_ready');
  yield* launch(c, 'the low ledge');                      // the hatch opens while Water is aloft
  yield* backRound(c);
  c.flag('well_clear');                                   // Fire's turn in the well
  yield* go(c, 5);
  yield* waitFlag(c, 'fire_set');
  yield* go(c, 2);
  yield* upWell(c, 3);
  yield* leap(c, 6);
  yield* go(c, 8);
  c.flag('water_set');
  yield* waitFlag(c, 'launch');
  yield* launch(c, 'the low ledge');
  yield* go(c, 25);
};

/** Fire: the high deck. */
const fire = function* (c) {
  yield* waitFlag(c, 'well_clear');
  yield* go(c, 2);
  yield* upWell(c, 3);
  yield* leap(c, 6);                                      // onto the low ledge
  yield* go(c, 4);
  yield* leap(c, 2);                                      // row 11
  yield* leap(c, 2);                                      // row 9
  yield* leap(c, 6);                                      // onto the high ledge
  yield* go(c, 8);
  c.flag('fire_set');
  yield* waitFlag(c, 'launch');
  yield* launch(c, 'the high ledge');
  yield* go(c, 28);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  sets: [
    {
      elements: ['fire', 'water', 'earth', 'air'],
      scripts: { fire, water, earth, air },
    },
  ],
  roles: {
    'fire,water,earth,air': {
      fire: 'Flies the high plate for the gate.',
      water: 'Flies the low plate: once for the loft hatch, once for the gate.',
      earth: 'Starts the draught, then walks the gate.',
      air: 'Rides the draught into the loft, posts the stone, holds the crank.',
    },
  },
};
