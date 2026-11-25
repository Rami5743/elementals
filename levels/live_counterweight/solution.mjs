import { IN_LEFT, IN_RIGHT, IN_JUMP, TILE, go, jump, until, wait, waitFlag, interact } from '../../kit.mjs';

const beam = (c) => c.ent('beam').s;

/** Hopping walk: keeps jumping while it travels, to get over a crate or the stone. */
function* bound(c, x, hold = 14, max = 900) {
  const goal = x * TILE + TILE / 2;
  let h = 0;
  for (let t = 0; t < max; t++) {
    const d = goal - c.cx;
    if (Math.abs(d) < 10 && c.me.grounded === 1) return;
    if (c.me.grounded === 1) h = hold;
    yield (d > 0 ? IN_RIGHT : IN_LEFT) | (h-- > 0 ? IN_JUMP : 0);
  }
  throw new Error(`${c.me.element} could not bound to ${x} (at ${c.tx.toFixed(1)})`);
}

/** Earth rolls the stone out of the hall onto the near pan and rides it down. */
function* loadTheStone(c) {
  yield* go(c, 6.6, { tol: 5 });
  yield* until(c, () => c.tx >= 20.6, IN_RIGHT, 1500, 'the stone onto the pan');
  yield* until(c, () => c.tx >= 21.4, IN_RIGHT, 300, 'aboard the pan');
  yield* until(c, () => beam(c).d >= 120, 0, 400, 'the pan to settle in the cellar');
}

/** Fire pushes `n` crates west onto the far pan, nearest first so they do not jam. */
function* loadCrates(c, n) {
  if (n >= 1) yield* until(c, () => c.tx <= 24.4, IN_LEFT, 900, 'the first crate onto the pan');
  if (n >= 2) {
    yield* bound(c, 31);                  // hop east over the next crate
    yield* until(c, () => c.tx <= 25.4, IN_LEFT, 900, 'the second crate onto the pan');
  }
  if (n >= 3) {
    yield* bound(c, 33);
    yield* until(c, () => c.tx <= 26.4, IN_LEFT, 900, 'the third crate onto the pan');
  }
  yield* go(c, 27);                       // clear of the pan, and the gem on the way
}

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  // The beam opens dead level, flush with the hall floor. Rolling the stone onto the near
  // pan sinks that pan into the cellar -- and that is what lifts the far pan up to Fire.
  yield* loadTheStone(c);
  // the stone alone keeps the pan at the bottom, so Earth can get off and come back
  yield* go(c, 6);                         // the gem at the foot of the west stair
  yield* go(c, 23.6);                      // round under the pan to its far side
  yield* jump(c, -1, { hold: 14 });        // back aboard, two tiles up
  yield* wait(c, 20);
  c.flag('aboard');
  // wait for Fire to load the far pan, then hop over the stone to get at its far side
  yield* waitFlag(c, 'crates');
  yield* bound(c, 22.4);
  // Shove the stone off the west end: it drops onto the heavy pad, and the pan it leaves
  // is the pan that rises. Three crates outweigh Earth alone; Earth and the stone, never.
  yield* until(c, () => c.ent('stone').s.y > 600, IN_LEFT, 600, 'shove the stone off the pan');
  // stand square on the pan again: a shoulder over the edge would jam it on the way up
  yield* until(c, () => c.tx >= 21, IN_RIGHT, 200, 'square on the pan');
  yield* until(c, () => beam(c).d <= -120, 0, 600, 'the pan to rise');
  // off at gallery-left, gem, through the gate the stone is holding, into the door
  yield* go(c, 17);
  yield* go(c, 12);
  c.flag('earth_home');
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  // Fire's whole job is up here: the far pan can only be loaded from the gallery, and it
  // is only up at the gallery while the stone weighs the near pan down.
  yield* waitFlag(c, 'aboard');
  yield* loadCrates(c, 2);yield* go(c,32);c.flag('two_crates');yield* waitFlag(c,'rider');c.flag('crates');
  // all three studs pressed: the chute out of the gallery has unlatched
  yield* until(c, () => c.ent('chute').s.open >= 90, 0, 600, 'the chute to open');
  yield* go(c, 34);
  yield* go(c, 36.6);                     // over the lip, down the chute
  yield* go(c,4);yield* until(c,()=>c.ent('lower_cert_gate').s.open>=90,0,3000,'stone receipt');yield* go(c,2);yield* interact(c);yield* go(c,30);yield* waitFlag(c,'earth_home');yield* waitFlag(c,'water_clear');yield* go(c,1);
};


const waterMode=(mode="normal")=>function*(c){yield* waitFlag(c,"two_crates");if(mode==="no_rider"){yield* wait(c,6000);return;}yield* go(c,25);c.flag("rider");if(mode==="early"){yield* go(c,27);yield* wait(c,6000);return;}if(mode==="retry"){yield* go(c,27);yield* go(c,25);}yield* waitFlag(c,"earth_home");yield* go(c,34);c.flag("water_clear");};const water=waterMode();
const noContact=function*(c){yield* waitFlag(c,'aboard');yield* loadCrates(c,2);yield* go(c,32);c.flag('two_crates');yield* waitFlag(c,'rider');c.flag('crates');yield* until(c,()=>c.ent('chute').s.open>=90,0,600,'chute');yield* go(c,36.6);yield* go(c,36);};
const noRiderFire=function*(c){yield* waitFlag(c,"aboard");yield* loadCrates(c,2);yield* go(c,32);c.flag("two_crates");c.flag("crates");yield* until(c,()=>c.ent("chute").s.open>=90,0,2500,"two crates cannot open chute");yield* go(c,36.6);};
export const solutions={sets:[{elements:["fire","water","earth"],scripts:{fire,water,earth},shortcuts:[{name:"two crates without a live rider",scripts:{fire:noRiderFire,water:waterMode("no_rider"),earth}},{name:"leave counterweight before Earth is home",scripts:{fire,water:waterMode("early"),earth}},{name:"omit lower contact",scripts:{fire:noContact,water,earth}}]}]};