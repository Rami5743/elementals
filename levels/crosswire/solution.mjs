// Crosswire: one lever, two doors, opposite ways round — thrown while Fire is already in the air.
import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, interact, until, wait, waitFlag } from '../../kit.mjs';

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* go(c, 8);                                   // the turbine: nothing moves until the draught does
  yield* until(c, () => c.ent('wind').s.on === 1, 0, 240, 'the draught to start');
  c.flag('wind_on');
  yield* until(c, () => c.tx >= 10.4, IN_RIGHT, 300, 'off the lip into the draught');
  yield* until(c, () => c.bottom <= 6 * TILE, 0, 900, 'up the shaft into the loft');
  yield* until(c, () => c.me.grounded === 1, IN_RIGHT, 300, 'the loft floor');
  yield* go(c, 27);                                  // its gem, at the far end of the loft
  yield* go(c, 16);                                  // the lever, and nothing to do but watch
  c.flag('air_ready');
  yield* until(c, () => c.player('fire').x > 16.6 * TILE, 0, 2400, 'Fire past the shutter');
  yield* interact(c);                                // shutter shuts behind Fire, perch appears under it
  yield* until(c, () => c.ent('perch').s.open === 0, 0, 120, 'the perch');
  c.flag('perch_set');
  yield* waitFlag(c, 'fire_returning');              // the same lever, the other way, mid-flight again
  yield* interact(c);
  yield* until(c, () => c.ent('shutter').s.open > 0, 0, 120, 'the shutter to lift again');
  yield* waitFlag(c, 'fire_home');
  yield* go(c, 29);                                  // right along the loft and down the chute
  yield* until(c, () => c.me.grounded === 1 && c.bottom === 13 * TILE, 0, 300, 'the far ledge');
  yield* go(c, 37);
  yield* wait(c, 600);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'air_ready');
  yield* go(c, 8);
  for (let t = 0; t < 200; t++) {                    // the committed float: twelve tiles of draught
    yield IN_RIGHT | (t < 14 ? IN_JUMP : 0);
    if (t > 20 && c.me.grounded === 1) break;
  }
  if (c.bottom !== 13 * TILE) throw new Error(`fire did not land on the perch (at ${c.tx.toFixed(1)}, y ${(c.bottom / TILE).toFixed(1)})`);
  yield* go(c, 32);                                  // its gem, past the checkpoint
  yield* go(c, 34);
  yield* interact(c);                                // the lever that lets Air out of the loft
  yield* until(c, () => c.ent('cage').s.open > 0, 0, 240, 'the cage');
  yield* go(c, 22);                                  // to the near lip of the perch for the return crossing
  for (let t = 0; t < 200; t++) {                    // floating the other way, under a shutter Air has to lift
    yield IN_LEFT | (t < 14 ? IN_JUMP : 0);
    if (t === 18) c.flag('fire_returning');          // only once airborne: the flip takes the perch away
    if (t > 20 && c.me.grounded === 1) break;
  }
  if (c.bottom !== 13 * TILE || c.tx > 9.5) throw new Error(`fire did not get home (at ${c.tx.toFixed(1)}, y ${(c.bottom / TILE).toFixed(1)})`);
  c.flag('fire_home');
  yield* go(c, 4);
  yield* wait(c, 900);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'crosswire',
  sets: [{ elements: ['fire', 'air'], scripts: { fire, air } }],
  roles: {
    'air,fire': {
      air: 'The only one the draught lifts to the loft, and the only one who can throw the lever — which it has to throw while Fire is between the shutter and the gap where the perch will be.',
      fire: 'The only one the draught carries sideways instead of up, and the only one who can reach the lever that lets Air out of the loft afterwards.',
    },
  },
};
