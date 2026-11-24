// Flyover — every switch here hangs in the air, so somebody has to be in it.
import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE, go, leap, until, wait, waitFlag } from '../../kit.mjs';
import { climbAboard } from '../_lib.mjs';

const stoneDown = (c) => c.ent('stone').s.y >= 19 * TILE;

/** Climb the one-way shelves in the well: a jump straight up lands on the next one. */
function* upWell(c, n) {
  for (let i = 0; i < n; i++) yield* leap(c, 2);
}

/** Cellar floor -> the low launch ledge (row 13), and along it to the run-up. */
function* climbLow(c) {
  yield* go(c, 2);
  yield* upWell(c, 3);                                    // shelves at rows 18, 16, 14
  yield* leap(c, 6);                                      // onto the low ledge
  yield* go(c, 8);
}

/** Cellar floor -> the high launch ledge (row 8), via the low one. */
function* climbHigh(c) {
  yield* go(c, 2);
  yield* upWell(c, 3);
  yield* leap(c, 6);                                      // onto the low ledge
  yield* go(c, 4);
  yield* leap(c, 2);                                      // the shelf at row 11
  yield* leap(c, 2);                                      // the shelf at row 9
  yield* leap(c, 6);                                      // onto the high ledge
  yield* go(c, 8);
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
  yield* until(c, () => c.tx <= 21.6, IN_LEFT, 400, 'the edge of the landing ledge');
  yield* until(c, () => c.me.grounded === 1 && c.bottom > 19 * TILE, IN_LEFT, 700, 'the cellar floor');
}

/** Earth: the only body heavy enough to start the draught — and the only one it never lifts. */
const earth = function* (c) {
  yield* go(c, 9);                                        // the heavy plate: the draught starts
  yield* until(c, () => stoneDown(c), 0, 12000, 'the stone to be posted');
  yield* go(c, 21);                                       // under the gate, ready to go
  yield* until(c, () => c.has('fire_set2') && c.has('water_set2') && c.has('crank_on'), 0, 12000, 'the others');
  c.flag('launch2');
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
  yield* until(c, () => c.ent('hatch').s.open >= 80, IN_JUMP, 12000, 'the hatch');
  yield* until(c, () => c.me.grounded === 1, IN_RIGHT, 300, 'the loft floor');
  yield* go(c, 26);                                       // the gem
  yield* go(c, 30);                                       // stand on the crank
  c.flag('crank_on');
  yield* until(c, () => stoneDown(c), 0, 900, 'the stone to land');
  yield* until(c, () => c.player('earth').x >= 23 * TILE, 0, 12000, 'earth through the gate');
  yield* go(c, 33);                                       // its own door, up in the loft
};

/** Fire: the high deck, twice. */
const fire = function* (c) {
  yield* climbHigh(c);
  c.flag('fire_set1');
  yield* waitFlag(c, 'launch1');
  yield* launch(c, 'the high ledge');
  yield* waitFlag(c, 'water_down');                       // Water goes back round first
  yield* backRound(c);
  yield* climbHigh(c);
  c.flag('fire_set2');
  yield* waitFlag(c, 'launch2');
  yield* launch(c, 'the high ledge');
  yield* go(c, 28);
};

/** Water: the low deck, twice; also the one who calls the first launch. */
const water = function* (c) {
  yield* waitFlag(c, 'fire_set1');                        // one at a time in the well
  yield* climbLow(c);
  yield* until(c, () => c.has('air_ready'), 0, 4000, 'Air at the mouth of the loft');
  c.flag('launch1');
  yield* launch(c, 'the low ledge');
  yield* backRound(c);
  c.flag('water_down');
  yield* go(c, 5);
  yield* waitFlag(c, 'fire_set2');                        // Fire has the well again
  yield* climbLow(c);
  c.flag('water_set2');
  yield* waitFlag(c, 'launch2');
  yield* launch(c, 'the low ledge');
  yield* go(c, 25);
};


// ---------------------------------------------------------------------------------------------
// Cheats that must fail.

/** Earth holds the draught on itself and sprints for the gate when it opens. */
const earthSprints = function* (c) {
  yield* go(c, 9);                                        // the draught runs while Earth stands here
  yield* until(c, () => c.ent('gate').s.open >= 20, 0, 5500, 'the gate');
  yield* go(c, 26);                                       // the wind dies the moment Earth steps off
  yield* go(c, 24);
};

/** Water calls the second launch itself, so that Earth's cheat is really put to the test. */
const waterCallsTheLaunch = function* (c) {
  yield* waitFlag(c, 'fire_set1');
  yield* climbLow(c);
  yield* until(c, () => c.has('air_ready'), 0, 4000, 'Air at the mouth of the loft');
  c.flag('launch1');
  yield* launch(c, 'the low ledge');
  yield* backRound(c);
  c.flag('water_down');
  yield* go(c, 5);
  yield* waitFlag(c, 'fire_set2');
  yield* climbLow(c);
  c.flag('water_set2');
  yield* until(c, () => c.has('crank_on'), 0, 6000, 'the crank');
  c.flag('launch2');
  yield* launch(c, 'the low ledge');
  yield* go(c, 25);
};

/** Fire flies the moment it is ready, so the two flights never overlap. */
const fireGoesAlone = function* (c) {
  yield* climbHigh(c);
  c.flag('fire_set1');
  yield* waitFlag(c, 'launch1');
  yield* launch(c, 'the high ledge');
  yield* waitFlag(c, 'water_down');
  yield* backRound(c);
  yield* climbHigh(c);
  c.flag('fire_set2');
  yield* launch(c, 'the high ledge');                     // no countdown: straight off the lip
  yield* go(c, 28);
};

/** Air tries to ferry Earth up the shaft instead of waiting for the stone. */
const airFerriesEarth = function* (c) {
  yield* go(c, 12);
  yield* until(c, () => Math.abs(c.player('earth').x - c.me.x) < 40 && c.player('earth').y < c.me.y, 0, 2400, 'earth aboard');
  yield* until(c, () => c.ent('wind').s.on === 1, IN_JUMP, 1200, 'a draught, with the only heavy body aboard');
  yield* until(c, () => c.bottom <= 300, IN_JUMP | IN_RIGHT, 900, 'the top of the shaft');
  yield* until(c, () => c.me.grounded === 1, IN_RIGHT, 600, 'the far side');
};

/** Earth climbs onto Air's head in the cellar and rides. */
const earthRidesAir = function* (c) {
  yield* go(c, 13);
  yield* climbAboard(c, 'air');
  yield* wait(c, 3000);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  sets: [
    {
      elements: ['fire', 'water', 'earth', 'air'],
      scripts: { fire, water, earth, air },
      shortcuts: [
        { name: 'Earth holds the draught on and runs for the gate when it opens', scripts: { fire, air, water: waterCallsTheLaunch, earth: earthSprints } },
        { name: 'The two fliers cross one after the other instead of together', scripts: { water, earth, air, fire: fireGoesAlone } },
        { name: 'Air ferries Earth up the shaft', scripts: { fire, water, earth: earthRidesAir, air: airFerriesEarth } },
      ],
    },
  ],
  roles: {
    'fire,water,earth,air': {
      fire: 'The high plate: once for the loft, once for the gate.',
      water: 'The low plate: once for the loft, once for the gate.',
      earth: 'Starts the draught, then walks the gate it cannot open.',
      air: 'Rides the draught into the loft, posts the stone, holds the crank.',
    },
  },
};
