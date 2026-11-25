import {
  IN_INTERACT, IN_LEFT, IN_RIGHT, TILE, go, leap, until, wait, waitFlag,
} from '../../kit.mjs';

const latched = (c) => c.ent('wicket').s.open >= 95;
const stoneX = (c) => c.ent('stone').s.x / TILE;

/**
 * Water is the brake. It has to be on the hill, in the walkway cell under the hanging plate,
 * before Earth ever touches the stone: nothing catches a runaway from behind.
 * @type {import('../../kit.mjs').Script}
 */
const water = function* (c) {
  yield* go(c, 10);                       // up to the stone parked on the lip
  yield* leap(c, 13, 24);                 // hop over it onto the head of the slope
  yield* go(c, 17);                       // the brake's post, and Water's gem
  c.flag('posted');
  yield* until(c, () => latched(c), 0, 6000, 'the wicket to latch');
  // Step aside: the stone rolls on down the hill behind us and runs out in the spoil run.
  yield* go(c, 26);
  yield* go(c, 37);
  yield* until(c, () => c.me.inDoor === 1, IN_RIGHT, 300, "Water's door");
};

/**
 * Fire holds the grip at the far end of the shelf. The wicket wants three contacts at once and
 * the brake cannot let go, so somebody has to be the third.
 * @type {import('../../kit.mjs').Script}
 */
const fire = function* (c) {
  yield* go(c, 3);                        // Fire's gem on the way
  yield* go(c, 2);                        // the grip
  c.flag('gripping');
  yield* until(c, () => latched(c), IN_INTERACT, 6000, 'the wicket to latch');
  yield* go(c, 21);                       // down the hill
  yield* go(c, 24);
  yield* leap(c, 29, 24);                 // over the spent stone in the run
  yield* go(c, 35);
  yield* until(c, () => c.me.inDoor === 1, IN_RIGHT, 300, "Fire's door");
};

/**
 * Earth is the only element that can shift a boulder, so only Earth can loose the stone — and
 * is therefore the one who can never be the brake. Then the long walk back to the anvil, which
 * is the only reason the rolling press cannot certify the wicket on its own.
 * @type {import('../../kit.mjs').Script}
 */
const earth = function* (c) {
  yield* waitFlag(c, 'posted');
  yield* waitFlag(c, 'gripping');
  yield* go(c, 10);
  yield* until(c, () => stoneX(c) > 12.4, IN_RIGHT, 900, 'the stone over the lip');
  yield* go(c, 5);                        // the anvil, and Earth's gem
  yield* until(c, () => latched(c), 0, 6000, 'the wicket to latch');
  yield* go(c, 21);
  yield* go(c, 24);
  yield* leap(c, 29, 24);                 // over the spent stone
  yield* go(c, 33);
  yield* until(c, () => c.me.inDoor === 1, IN_RIGHT, 300, "Earth's door");
};

// ---- shortcuts that must fail ----------------------------------------------------------------

/** Nobody brakes: Earth pushes the stone and sprints for the anvil, hoping the rolling press of
 *  the berth lines up with the anvil and the grip. The stone is past the berth in about 70 ticks
 *  and the walk back is about 150, so it cannot. */
const earthSprints = function* (c) {
  yield* go(c, 10);
  yield* until(c, () => stoneX(c) > 12.4, IN_RIGHT, 900, 'the stone over the lip');
  yield* until(c, () => c.tx <= 5.6, IN_LEFT, 900, 'the anvil');
  yield* wait(c, 3000);
};
const fireJustGrips = function* (c) {
  yield* go(c, 2);
  yield* until(c, () => latched(c), IN_INTERACT, 3000, 'the wicket to latch');
  yield* go(c, 21);
  yield* go(c, 24);
  yield* leap(c, 29, 24);
  yield* go(c, 35);
  yield* until(c, () => c.me.inDoor === 1, IN_RIGHT, 300, "Fire's door");
};
const waterWaitsBelow = function* (c) {
  yield* go(c, 10);
  yield* leap(c, 13, 24);
  yield* go(c, 24);                       // down in the run, out of the stone's way on the hill
  yield* until(c, () => latched(c), 0, 4000, 'the wicket to latch');
  yield* go(c, 37);
  yield* until(c, () => c.me.inDoor === 1, IN_RIGHT, 300, "Water's door");
};

/** Earth brakes the stone itself, standing one tile up the slope from the brake's post so that
 *  its own mass-2 body presses the berth. Then nobody is on the anvil. */
const earthBrakes = function* (c) {
  yield* go(c, 10);
  yield* until(c, () => stoneX(c) > 12.4, IN_RIGHT, 900, 'the stone over the lip');
  yield* go(c, 16);
  yield* wait(c, 3000);
};
const waterIdles = function* (c) {
  yield* go(c, 3);
  yield* until(c, () => latched(c), 0, 4000, 'the wicket to latch');
  yield* go(c, 37);
  yield* until(c, () => c.me.inDoor === 1, IN_RIGHT, 300, "Water's door");
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  sets: [
    {
      elements: ['fire', 'water', 'earth'],
      scripts: { fire, water, earth },
      shortcuts: [
        {
          name: 'No brake: the stone presses the berth in passing while Earth sprints for the anvil',
          scripts: { fire: fireJustGrips, water: waterWaitsBelow, earth: earthSprints },
        },
        {
          name: 'Earth brakes the stone and presses the berth with its own body',
          scripts: { fire: fireJustGrips, water: waterIdles, earth: earthBrakes },
        },
      ],
    },
  ],
  roles: {
    'fire,water,earth': {
      fire: 'Holds the grip at the far end of the shelf: the third contact.',
      water: 'The brake. Posted on the hill under the hanging plate before the stone is loosed.',
      earth: 'Looses the stone, then holds the anvil — and so can never be the brake.',
    },
  },
};
