// Passing Place — water + earth.
//
// Earth shunts the stone out of the crawlway and up to the shelf; Water goes past it in the
// one place with headroom, puts the flames out, comes home over the gallery, and takes over
// the shelf so that Earth can push the stone the rest of the way.
import { IN_INTERACT, IN_JUMP, IN_LEFT, IN_RIGHT, TILE, go, interact, jump, leap, runJump, until } from '../../kit.mjs';

const CRAWL = 14 * TILE;   // the crawlway floor: a player standing in it has bottom === 448
const SHELF = 12 * TILE;   // the top of the shelf in the niche

/** Jump straight up onto the one-way rung whose tile row is `row`, retrying until it sticks. */
function* rung(c, row, max = 420) {
  const top = row * TILE;
  for (let t = 0; t < max; t++) {
    if (c.me.grounded === 1 && c.bottom === top) return;
    yield t % 70 < 16 ? IN_JUMP : 0;
  }
  throw new Error(`${c.me.element} never got onto the rung at row ${row} (bottom=${c.bottom})`);
}

/** Up the ladder out of the right hall and onto the gallery. */
function* upToTheGallery(c) {
  yield* go(c, 30, { noHop: true });
  for (const row of [16, 14, 12, 10, 8, 6]) yield* rung(c, row);
}

/** Up the two steps from the hall floor into the mouth of the crawlway. */
function* intoCrawlway(c) {
  yield* go(c, 5, { noHop: true });
  yield* leap(c, 6);
  yield* leap(c, 7);
  yield* until(c, () => c.me.grounded === 1 && c.bottom === CRAWL, 0, 120, 'to settle in the mouth');
  yield* go(c, 8, { noHop: true });
}

/** Onto the shelf from the open tile west of it, and wait until the plate has answered. */
function* ontoShelf(c) {
  yield* go(c, 15, { noHop: true });
  for (let tries = 0; tries < 4; tries++) {
    yield* leap(c, 16);
    if (c.me.grounded === 1 && c.bottom === SHELF) break;
  }
  if (c.bottom !== SHELF) throw new Error(`${c.me.element} is not on the shelf (bottom=${c.bottom})`);
  yield* until(c, () => c.ent('hatch').s.open > 0, 0, 180, 'the hatch to lift');
}

/** East out of the crawlway: off the lip and straight down onto the hall floor. */
function* downIntoTheHall(c) {
  yield* go(c, 24, { noHop: true });
  yield* until(c, () => c.me.grounded === 0, IN_RIGHT, 180, 'off the lip');
  yield* until(c, () => c.me.grounded === 1, 0, 300, 'down to the hall floor');
}

/** Jump the notch the stone sits in: its top is two pixels below the floor, so a walk
 *  across it stops dead. */
function* overNotch(c, to, max = 5) {
  for (let i = 0; i < max; i++) {
    yield* leap(c, to);
    if (c.me.grounded === 1 && c.cx >= (to - 0.2) * TILE) return;
  }
  throw new Error(`${c.me.element} could not jump the notch to ${to} (at ${c.tx.toFixed(1)})`);
}

/** Earth: make sure the stone is in front, not under or behind. */
function* getBehindStone(c) {
  for (let t = 0; t < 5; t++) {
    const sx = c.ent('stone').s.x;
    if (c.bottom === 18 * TILE && c.cx < sx - 4) return;
    yield* leap(c, Math.floor(sx / TILE) - 1);
  }
  throw new Error(`Earth could not get behind the stone (at ${c.tx.toFixed(1)})`);
}

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  // 1. Into the crawlway, behind the stone.
  yield* intoCrawlway(c);
  // 2. Shunt the stone the length of the crawlway and into the niche. Nobody can get past it
  //    anywhere else, so it has to end up under the high roof.
  yield* until(c, () => c.ent('stone').s.x >= 20 * TILE, IN_RIGHT, 1500, 'the stone into the niche');
  // 3. Back west and up onto the shelf: the plate there holds the far hatch open.
  yield* ontoShelf(c);
  c.flag('shelf');
  // 4. Wait on the shelf while Water goes past underneath, puts the flames out and comes
  //    all the way back round over the gallery. Stepping off early would shut the hatch.
  //    The same plate seals the gallery, so Water cannot come home until Earth lets go.
  yield* until(c, () => c.has('gallery'), 0, 9000, 'Water to reach the gallery gate');
  // 5. Give the shelf up — the hatch shuts, and the way home opens. Drop off to the east,
  //    which is the side the stone is on.
  yield* go(c, 19, { noHop: true });
  yield* until(c, () => c.ent('hatch').s.open > 0, 0, 9000, 'Water to take the shelf over');
  // 6. Now push the stone through the hatch. It drops off the lip into the right hall.
  yield* until(c, () => c.ent('stone').s.y > CRAWL, IN_RIGHT, 1500, 'the stone through the hatch');
  // 7. Down after it and east past the dead flames.
  yield* downIntoTheHall(c);
  // 8. The stone's berth is past the flames, so none of this could have been done before
  //    Water put them out. Shunt it the rest of the way in the open.
  yield* getBehindStone(c);
  yield* until(c, () => c.ent('stone').s.y > 18 * TILE - 20, IN_RIGHT, 2400, 'the stone into its notch');
  yield* until(c, () => c.ent('vault').s.open > 0, 0, 300, 'the vault to open');
  yield* overNotch(c, 29);              // over the stone in its berth
  yield* go(c, 36, { noHop: true });    // east past the dead flames, through the vault
  yield* interact(c);                   // the lever holds the hatch open for good
  c.flag('released');
  // 9. Earth's own door is up on the gallery, so Earth goes home the long way too — and
  //    only once Water has come off the shelf and unsealed the gallery.
  yield* upToTheGallery(c);
  yield* go(c, 12, { noHop: true });
  yield* until(c, () => c.ent('gallerygate').s.open >= 90, 0, 1200, 'the gallery gate');
  yield* go(c, 5, { noHop: true });   // Earth's own door, at the west end of the gallery
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  // 1. Nothing to do until Earth has parked the stone and taken the shelf.
  yield* until(c, () => c.has('shelf'), 0, 3000, 'Earth to take the shelf');
  yield* intoCrawlway(c);
  // 2. East under the shelf — under Earth — and over the stone, the only place either is
  //    passable.
  yield* runJump(c, 16, 19, 21);
  if (c.tx < 20.5) throw new Error(`Water never got over the stone (at ${c.tx.toFixed(1)})`);
  // 3. Through the hatch, down into the hall, and put the flames out.
  yield* downIntoTheHall(c);           // takes Water's gem at 22 on the way
  yield* overNotch(c, 29);             // the stone's berth, still empty
  yield* until(c, () => c.ent('blaze').s.gone === 1, IN_RIGHT, 900, 'the flames to go out');
  // 4. There is no way back up the lip into the crawlway: the way home is the ladder and
  //    the gallery over the top of the whole level.
  yield* go(c,34,{noHop:true});yield* interact(c);
  yield* upToTheGallery(c);
  yield* go(c, 17, { noHop: true });   // takes the gallery gem at 18 on the way west
  yield* go(c, 12, { noHop: true });
  c.flag('gallery');
  yield* until(c, () => c.ent('gallerygate').s.open >= 90, 0, 2400, 'Earth to give up the shelf');
  yield* go(c, 4, { noHop: true });
  // 5. Off the west end of the gallery, down the shaft into the hall, and round again.
  yield* until(c, () => c.me.grounded === 1 && c.bottom === 18 * TILE, IN_LEFT, 600, 'down the shaft');
  yield* intoCrawlway(c);
  yield* go(c, 14, { noHop: true });
  c.flag('home');
  // 6. Take over the shelf, so that Earth is free to push.
  yield* until(c, () => c.player('earth').y > 12 * TILE, 0, 1200, 'Earth to come off the shelf');
  yield* ontoShelf(c);
  // 7. Hold it until the lever on the far side takes over.
  yield* until(c, () => c.has('released'), 0, 6000, 'the lever on the far side');
  yield* go(c, 19, { noHop: true });
  yield* downIntoTheHall(c);
  yield* overNotch(c, 29);              // over the stone in its berth
  yield* go(c, 37, { noHop: true });
};

/** @type {import('../../kit.mjs').Solutions} */
const fireMode=(mode='normal')=>function*(c){yield* go(c,5,{noHop:true});if(mode!=='nopermit')yield* interact(c);if(mode==='retry'){yield* wait(c,120);yield* interact(c);yield* wait(c,120);yield* interact(c);}yield* until(c,()=>c.ent('fire_middle').s.open>=32,0,9000,'inspection');yield* go(c,34,{noHop:true});if(mode!=='novault')yield* interact(c);yield* go(c,35,{noHop:true});yield* until(c,()=>c.ent('fire_exit').s.open>=32,0,9000,'release');yield* go(c,1,{noHop:true});};const fire=fireMode();
export const solutions = {
  sets: [{ elements: ['fire','water', 'earth'], scripts: { fire,water, earth },shortcuts:[{name:'omit passage permit',scripts:{fire:fireMode('nopermit'),water,earth}},{name:'omit vault permit',scripts:{fire:fireMode('novault'),water,earth}}] }],
  roles: {
    'water,earth': {
      earth: 'The only one who can shift the stone, and only ever forwards. Holds the shelf first, pushes the stone through the hatch last.',
      water: 'Goes past the stone at the niche, puts out the flames that seal the far end, comes back over the gallery and takes over the shelf.',
    },
  },
};
