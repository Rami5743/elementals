// Solution scripts: one generator per player, yielding that player's input bits once a tick.
// They read the live game through `c` (see docs/SOLUTIONS.md). `node kit.mjs check <level>`
// runs them and records the replays.
import { IN_LEFT, IN_RIGHT, TILE, go, jump, runJump, until } from '../../kit.mjs';

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* go(c, 20); // under the gem
  yield* jump(c, 0); // straight up through it
  // lean on the ice until it melts (Fire melts it by touching it)
  yield* until(c, () => c.ent('ice').s.gone === 1, IN_LEFT, 600, 'the ice to melt');
  yield* go(c, 37); // through the lava (safe for Fire), over Water and into the door
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* runJump(c, 23, 25, 29); // a running jump over the lava
  // walk into the flames: Water puts them out
  yield* until(c, () => c.ent('flames').s.gone === 1, IN_RIGHT, 600, 'the flames to go out');
  yield* go(c, 30);
  // stand still while Fire hops over (two players walking into each other both hop, and get stuck)
  yield* until(c, () => c.player('fire').inDoor === 1, 0, 1500, 'Fire to get home');
  yield* runJump(c, 31, 28, 24); // back over the lava
  yield* go(c, 2);
};

// Shortcuts: ways to cheat that must NOT work. `check` runs each one and reports a problem if it
// finishes the level. Write one for every shortcut you blocked, and make it try as hard as it can.
/** @type {import('../../kit.mjs').Script} */
const fireStraightHome = function* (c) {
  yield* go(c, 37); // the flames are in the way
};
/** @type {import('../../kit.mjs').Script} */
const waterStraightHome = function* (c) {
  // let Fire hop past first, so they don't block each other: the shortcut must fail at the ice, not here
  yield* until(c, () => c.player('fire').x > c.me.x + 2 * TILE, 0, 600, 'Fire to go past');
  yield* go(c, 2); // the ice is in the way
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  sets: [
    {
      elements: ['fire', 'water'],
      scripts: { fire, water },
      shortcuts: [{ name: 'each walks straight home without helping', scripts: { fire: fireStraightHome, water: waterStraightHome }, maxTicks: 1200 }],
    },
  ],
  roles: {
    'fire,water': {
      fire: 'Melts the ice in front of Water\'s door.',
      water: 'Jumps the lava and puts out the flames in front of Fire\'s door.',
    },
  },
};
