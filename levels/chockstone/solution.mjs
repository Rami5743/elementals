import {
  IN_INTERACT, IN_LEFT, IN_RIGHT, TILE, go, leap, runJump, until, wait, waitFlag,
} from '../../kit.mjs';

const open = (c, id) => c.ent(id).s.open >= 95;
const stoneX = (c) => c.ent('stone').s.x / TILE;
const stoneY = (c) => c.ent('stone').s.y / TILE;

/**
 * Earth is the only element that can shift a boulder, so the whole level is Earth's errand twice
 * over: walk the stone up the hill from the spoil run, then get round it and loose it again. And
 * that is exactly why Earth can never be the brake — the brake has to be standing on the hill
 * before the stone is let go, and Earth is the one letting it go.
 * @type {import('../../kit.mjs').Script}
 */
const earth = function* (c) {
  // Down the hill and round behind the stone.
  yield* go(c, 26);
  yield* runJump(c, 26, 27.3, 31);          // up onto the stone's back
  yield* go(c, 30);                         // and down the far side, so we are behind it
  // Push it the whole way up the hill and onto the flat shelf, where it will stay put.
  yield* until(c, () => stoneY(c) < 5.4 && stoneX(c) < 12.4, IN_LEFT, 3000, 'the stone up onto the shelf');
  c.flag('fetched');
  // Get round it again: nobody can push a stone downhill from behind it.
  yield* leap(c, 12, 24);                   // back over the stone the same way
  yield* go(c, 10);
  yield* waitFlag(c, 'posted');
  yield* until(c, () => stoneX(c) > 14.4, IN_RIGHT, 1200, 'the stone over the lip');
  // Wait at the hatch; it opens only once the stone is standing still at the high berth.
  yield* go(c, 6);
  yield* until(c, () => open(c, 'hatch'), 0, 4000, 'the hatch');
  yield* go(c, 1);                          // the anvil, and Earth's gem, shut in for good
  c.flag('anvil');
  yield* until(c, () => open(c, 'wicket'), 0, 9000, 'the wicket to latch');
  yield* go(c, 3);                          // Earth's own door is in the bay
  yield* until(c, () => c.me.inDoor === 1, IN_RIGHT, 300, "Earth's door");
};

/**
 * Water is the brake. It cannot go down until the stone is up — anybody standing on the hill is a
 * wall the stone cannot be pushed past — and once it is down there it parks the stone high to hold
 * the hatch open, then walks it down to the low berth.
 * @type {import('../../kit.mjs').Script}
 */
const water = function* (c) {
  yield* waitFlag(c, 'fetched');
  yield* go(c, 13);                         // round the parked stone, onto the head of the slope
  yield* go(c, 17);                         // the high post, and Water's gem
  c.flag('posted');
  yield* waitFlag(c, 'anvil');              // hold it high until Earth is in behind the hatch
  yield* go(c, 23);                         // walk the stone down to the low berth
  yield* until(c, () => open(c, 'wicket'), 0, 6000, 'the wicket to latch');
  yield* go(c, 28);                         // step aside; the stone runs out in the spoil run
  yield* leap(c, 34, 26);                   // over the spent stone and through the wicket
  yield* go(c, 37);
  yield* until(c, () => c.me.inDoor === 1, IN_RIGHT, 300, "Water's door");
};

/**
 * Fire holds the grip. The wicket wants three contacts in the same instant; the brake cannot let
 * go of the stone and Earth cannot leave the bay, so the third post needs a third body.
 * @type {import('../../kit.mjs').Script}
 */
const fire = function* (c) {
  yield* go(c, 7);                          // the grip, and Fire's gem
  c.flag('gripping');
  yield* until(c, () => open(c, 'wicket'), IN_INTERACT, 12000, 'the wicket to latch');
  yield* go(c, 24);                         // down the hill
  yield* go(c, 30);
  yield* leap(c, 34, 26);                   // over the spent stone and through the wicket
  yield* go(c, 35);
  yield* until(c, () => c.me.inDoor === 1, IN_RIGHT, 300, "Fire's door");
};

// ---- shortcuts that must fail ----------------------------------------------------------------

const fireJustGrips = function* (c) {
  yield* go(c, 7);
  yield* until(c, () => open(c, 'wicket'), IN_INTERACT, 5000, 'the wicket to latch');
  yield* go(c, 24);
  yield* go(c, 30);
  yield* leap(c, 34, 26);
  yield* go(c, 35);
  yield* until(c, () => c.me.inDoor === 1, IN_RIGHT, 300, "Fire's door");
};
/** Keeps Water out of the stone's road and out of the hill, so the cheats below are really tested. */
const waterKeepsClear = function* (c) {
  yield* go(c, 6);
  yield* until(c, () => open(c, 'wicket'), 0, 5000, 'the wicket to latch');
  yield* go(c, 24);
  yield* go(c, 30);
  yield* leap(c, 34, 26);
  yield* go(c, 37);
  yield* until(c, () => c.me.inDoor === 1, IN_RIGHT, 300, "Water's door");
};

/** No brake at all: Earth fetches the stone, looses it and sprints for the hatch, hoping the eight
 *  ticks the rolling stone spends over the high berth are enough to get through. */
const earthRunsForTheHatch = function* (c) {
  yield* go(c, 26);
  yield* runJump(c, 26, 27.3, 31);          // up onto the stone's back
  yield* go(c, 30);                         // and down the far side, so we are behind it
  yield* until(c, () => stoneY(c) < 5.4 && stoneX(c) < 12.4, IN_LEFT, 3000, 'the stone up onto the shelf');
  yield* leap(c, 12, 24);                   // back over the stone the same way
  yield* go(c, 10);
  yield* until(c, () => stoneX(c) > 14.4, IN_RIGHT, 1200, 'the stone over the lip');
  yield* until(c, () => c.tx <= 1.7, IN_LEFT, 4000, 'the anvil');
  yield* wait(c, 2500);
};

/** Earth brakes the stone itself, one tile up the slope from the high post, so that its own mass-2
 *  body presses the high berth. Then nobody can ever be on the anvil. */
const earthBrakes = function* (c) {
  yield* go(c, 26);
  yield* runJump(c, 26, 27.3, 31);          // up onto the stone's back
  yield* go(c, 30);                         // and down the far side, so we are behind it
  yield* until(c, () => stoneY(c) < 5.4 && stoneX(c) < 12.4, IN_LEFT, 3000, 'the stone up onto the shelf');
  yield* leap(c, 12, 24);                   // back over the stone the same way
  yield* go(c, 10);
  yield* until(c, () => stoneX(c) > 14.4, IN_RIGHT, 1200, 'the stone over the lip');
  yield* go(c, 16);
  yield* wait(c, 2500);
};

/** Water tries to be the brake at the low berth straight away, skipping the high one, so that the
 *  wicket is certified without the hatch ever opening and without Earth on the anvil. */
const waterBrakesLowOnly = function* (c) {
  yield* waitFlag(c, 'fetched');
  yield* go(c, 13);
  yield* go(c, 23);
  yield* until(c, () => open(c, 'wicket'), 0, 5000, 'the wicket to latch');
  yield* go(c, 30);
  yield* leap(c, 34, 26);
  yield* go(c, 37);
  yield* until(c, () => c.me.inDoor === 1, IN_RIGHT, 300, "Water's door");
};
const earthLoosesAndWaits = function* (c) {
  yield* go(c, 26);
  yield* runJump(c, 26, 27.3, 31);          // up onto the stone's back
  yield* go(c, 30);                         // and down the far side, so we are behind it
  yield* until(c, () => stoneY(c) < 5.4 && stoneX(c) < 12.4, IN_LEFT, 3000, 'the stone up onto the shelf');
  c.flag('fetched');
  yield* leap(c, 12, 24);                   // back over the stone the same way
  yield* go(c, 10);
  yield* waitFlag(c, 'posted');
  yield* until(c, () => stoneX(c) > 14.4, IN_RIGHT, 1200, 'the stone over the lip');
  yield* go(c, 6);
  yield* until(c, () => open(c, 'hatch'), 0, 4000, 'the hatch');
  yield* go(c, 1);
  yield* wait(c, 2500);
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  sets: [
    {
      elements: ['fire', 'water', 'earth'],
      scripts: { fire, water, earth },
      shortcuts: [
        {
          name: 'No brake: Earth looses the stone and sprints for the hatch',
          scripts: { fire: fireJustGrips, water: waterKeepsClear, earth: earthRunsForTheHatch },
        },
        {
          name: 'Earth brakes the stone and presses the high berth with its own body',
          scripts: { fire: fireJustGrips, water: waterKeepsClear, earth: earthBrakes },
        },
        {
          name: 'Water brakes at the low berth only, skipping the hatch',
          scripts: { fire: fireJustGrips, water: waterBrakesLowOnly, earth: earthLoosesAndWaits },
        },
      ],
    },
  ],
  roles: {
    'fire,water,earth': {
      fire: 'Holds the grip: the wicket’s third contact.',
      water: 'The brake. Parks the stone high to open the hatch, then walks it down to the low berth.',
      earth: 'Walks the stone up the hill and looses it — and so can never be the brake — then holds the anvil.',
    },
  },
};
