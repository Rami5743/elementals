import { IN_JUMP, IN_LEFT, IN_RIGHT } from '../../kit.mjs';
import { go, jump, until, waitFlag } from '../../kit.mjs';

const BOARD = 11.5; // where water waits on the near bank while fire climbs aboard
const GATE = 19;    // where water stops, right in front of the ice gate
const BANK = 24;    // the first solid tile of the far bank water walks to
const SIDING = 26;  // where fire stands still so water can pass it
const DOUSE = 29;   // where water stops, right in front of the flames

/** Fire jumps onto water's head and ends up standing on it. */
function* climbAboard(c) {
  for (let t = 0; t < 4 || !c.me.grounded; t++) {
    const w = c.player('water');
    const d = w.x + 11 - c.cx; // aim at water's centre
    yield (t < 16 ? IN_JUMP : 0) | (Math.abs(d) < 2 ? 0 : d > 0 ? IN_RIGHT : IN_LEFT);
    if (t > 200) throw new Error('fire never came down');
  }
  const w = c.player('water');
  if (c.bottom !== w.y) throw new Error(`fire is not on water's head (fire bottom=${c.bottom}, water top=${w.y})`);
}

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* go(c, 10);
  yield* jump(c, 0);                       // the fire gem, two tiles up
  yield* waitFlag(c, 'ferry_ready');
  yield* go(c, BOARD - 1.4);
  yield* climbAboard(c);
  c.flag('aboard');
  // riding: the neutral gem over the pool comes for free
  yield* waitFlag(c, 'at_gate');
  // lean right off water's head until the ice gate is within reach, and melt it
  yield* until(c, () => c.ent('gate_ice').s.gone === 1, IN_RIGHT, 600, 'the ice gate to melt');
  c.flag('gate_open');
  yield* waitFlag(c, 'ashore');
  yield* go(c, SIDING);                    // step off onto the bank and stand still
  c.flag('fire_parked');
  yield* waitFlag(c, 'flames_out');
  yield* go(c, 33);                        // home
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, BOARD);
  c.flag('ferry_ready');
  yield* waitFlag(c, 'aboard');
  yield* go(c, GATE);                      // wade out with fire riding above the surface
  c.flag('at_gate');
  yield* waitFlag(c, 'gate_open');
  yield* go(c, BANK);
  c.flag('ashore');
  yield* waitFlag(c, 'fire_parked');
  yield* go(c, 25);
  yield* jump(c, 0);                       // the water gem
  yield* go(c, DOUSE);                     // hops over fire, who is standing still
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_RIGHT, 600, 'the flames to go out');
  c.flag('flames_out');
  yield* go(c, 36);                        // home
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'the_ferry',
  sets: [{ elements: ['fire', 'water'], scripts: { fire, water } }],
  roles: {
    'fire,water': {
      water: 'Carries Fire over the pool on its head and puts out the flames in front of the doors.',
      fire: 'Rides across and melts the ice gate standing in the middle of the water.',
    },
  },
};
