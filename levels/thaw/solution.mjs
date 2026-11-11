import { go, until, waitFlag } from '../../kit.mjs';
import { hop } from '../_lib.mjs';

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 23);                                  // onto the pad: the near pool turns to ice
  yield* until(c, () => c.ent('poolA').s.on === 1, 0, 300, 'the near pool to freeze');
  c.flag('a_ice');
  yield* waitFlag(c, 'fire_island');
  yield* go(c, 24);
  yield* hop(c);                                     // the neutral gem, off the pad: the far pool freezes
  yield* until(c, () => c.ent('poolB').s.on === 1, 0, 300, 'the far pool to freeze');
  c.flag('b_ice');
  yield* go(c, 29);                                  // out onto the ice, onto the plate
  yield* until(c, () => c.ent('latchplate').s.on === 1, 0, 120, 'the plate on the ice');
  yield* until(c, () => c.ent('gate').s.open >= 90, 0, 2400, 'the gate, once the torch is lit too');
  yield* go(c, 31);
  yield* hop(c);                                     // the water gem
  yield* waitFlag(c, 'fire_back_on_b');
  yield* go(c, 23);                                  // back on the pad: ice behind us again
  yield* until(c, () => c.ent('poolA').s.on === 1, 0, 300, 'the near pool to freeze again');
  c.flag('a_ice_again');
  yield* waitFlag(c, 'fire_home');
  yield* go(c, 3);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* waitFlag(c, 'a_ice');
  yield* go(c, 22);                                  // across the near pool while it is ice
  c.flag('fire_island');
  yield* waitFlag(c, 'b_ice');
  yield* go(c, 36);                                  // across the far pool, past Water on the plate
  yield* until(c, () => c.ent('beacon').s.on === 1, 0, 300, 'the torch to light');
  yield* go(c, 37);
  yield* hop(c);                                     // the fire gem: there is no second trip out here
  yield* until(c, () => c.ent('gate').s.open >= 90, 0, 1200, 'the gate to latch open');
  yield* go(c, 25);                                  // back over the far pool before it thaws
  c.flag('fire_back_on_b');
  yield* waitFlag(c, 'a_ice_again');
  yield* go(c, 12);                                  // and back over the near one
  c.flag('fire_home');
  yield* go(c, 5);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'thaw',
  sets: [{ elements: ['fire', 'water'], scripts: { fire, water } }],
  roles: {
    'fire,water': {
      water: 'The pad answers to nobody else, so Water alone decides which pool is ice — and has to decide it four times, in the right order.',
      fire: 'Crosses both pools, lights the torch at the far end, and has to be back over each one before the ice moves.',
    },
  },
};
