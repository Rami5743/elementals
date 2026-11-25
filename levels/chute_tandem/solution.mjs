import {IN_INTERACT,IN_JUMP,IN_LEFT,IN_RIGHT,TILE,interact,go,jump,until,wait,drop,waitFlag} from "../../kit.mjs";
const BAY_FLOOR = 20 * TILE;      // the hoist's bottom stop, flush with the bay floor
const GALLERY = 8 * TILE;         // the hoist's top stop, flush with the gallery floor
const LEDGE_TOP = 16 * TILE;      // the landing ledge at the foot of the chute
const DECK = 13.4;                // where the stone parks on the deck, leaving Earth room aboard
const CHUTE_HEAD = 15;            // first slope column
const RUNG_TOP = 6 * TILE;        // the stair well's one-way ledge
const STEP_TOP = 5 * TILE;        // the step between them
const CAT_TOP = 4 * TILE;         // the catwalk's walking surface

/**
 * Ride the hoist up. Its control is a hold button on the deck itself, so the
 * rider has to keep Interact down for the whole climb.
 */
function* rideUp(c, max = 1200) {
  yield* until(
    c,
    () => c.ent('hoist').s.y <= GALLERY + 1 && c.me.grounded === 1,
    IN_INTERACT, max, 'the hoist to reach the gallery',
  );
}

/** Ride the platform back down to the bay. */
function* rideDown(c, max = 1200) {
  yield* until(c, () => c.bottom >= BAY_FLOOR - 1 && c.me.grounded === 1, 0, max, 'the hoist to go back down');
}

/**
 * Up the stair well on to the catwalk: a one-way ledge, a step, and the catwalk,
 * a tile apart each. jump() can return early while rising through a one-way
 * ledge, so each hop waits until it is really standing on the next level.
 */
function* ontoCatwalk(c) {
  yield* go(c, 2.5);
  yield* jump(c, 0, { hold: 20 });
  yield* until(c, () => c.me.grounded === 1 && c.bottom <= RUNG_TOP + 1, 0, 300, 'to stand on the stair ledge');
  yield* jump(c, 1, { hold: 16, steerUntil: 4.5 });
  yield* until(c, () => c.me.grounded === 1 && c.bottom <= STEP_TOP + 1, 0, 300, 'to stand on the step');
  yield* jump(c, 1, { hold: 16, steerUntil: 5.5 });
  yield* until(c, () => c.me.grounded === 1 && c.bottom <= CAT_TOP + 1, 0, 300, 'to stand on the catwalk');
}

/** Climb the people's ladder: jump up through one-way rungs until high enough. */
function* climbLadder(c, toBottom, tries = 14) {
  for (let i = 0; i < tries; i++) {
    if (c.bottom <= toBottom + 1 && c.me.grounded === 1) return;
    yield* jump(c, 0, { hold: 24 });
  }
  throw new Error(`${c.me.element} could not climb the ladder (bottom ${c.bottom})`);
}

/** Drop back down the ladder, through one rung at a time. */
function* descendLadder(c, tries = 14) {
  for (let i = 0; i < tries; i++) {
    if (c.bottom >= BAY_FLOOR - 1 && c.me.grounded === 1) return;
    yield* drop(c);
    yield* until(c, () => c.me.grounded === 1, 0, 200, `${c.me.element} to land on a rung`);
  }
  throw new Error(`${c.me.element} could not get down the ladder (bottom ${c.bottom})`);
}

/**
 * Hop over the stone. A boulder in open ground is only a tile high, but you have
 * to be above it before you start moving sideways or you just walk into it.
 */
function* hopOver(c, toX, rise = 7, max = 200) {
  for (let t = 0; t < 12; t++) yield IN_JUMP | (t >= rise ? (toX * TILE + TILE / 2 > c.cx ? IN_RIGHT : IN_LEFT) : 0);
  for (let t = 0; t < max; t++) {
    const d = toX * TILE + TILE / 2 - c.cx;
    yield Math.abs(d) < 4 ? 0 : d > 0 ? IN_RIGHT : IN_LEFT;
    if (c.me.grounded === 1 && t > 4 && c.bottom >= BAY_FLOOR - 1) return;
  }
  throw new Error(`${c.me.element} never landed hopping to ${toX} (at ${c.tx.toFixed(1)})`);
}

/** The whole of Earth's haul: bay to hoist to chute head, ending back in the bay. */
function* haulAndLaunch(c) {
  // Round behind the stone and shunt it the length of the bay, past the hoist,
  // taking Earth's gem on the way. Only Earth can move it at all.
  yield* go(c, 28.6);
  yield* until(c, () => c.ent('stone').s.x <= 7 * TILE, IN_LEFT, 2400, 'earth to shunt the stone past the hoist');
  // Hop over it, so that from here on Earth shoves eastward and ends up on the
  // uphill side — the side the stone has to be pushed from at the top.
  yield* hopOver(c, 5.8);
  yield* until(c, () => c.ent('stone').s.x >= DECK * TILE, IN_RIGHT, 2400, 'earth to shunt the stone on to the hoist');
  yield* rideUp(c);
  // Shove the stone off the deck on to the head of the chute, where it runs away
  // down to the pen door on its own.
  yield* until(
    c,
    () => c.ent('stone').s.x >= CHUTE_HEAD * TILE,
    IN_RIGHT | IN_INTERACT, 1200, 'earth to launch the stone into the chute',
  );
  // Let go of the button and the hoist carries Earth back down to the bay.
  yield* until(c,()=>c.tx<=13.5,IN_LEFT|IN_INTERACT,200,'square on hoist');yield* rideDown(c);
  yield* go(c, 17);
  c.flag('penned');
}


function* gate(c,id){yield* until(c,()=>c.ent(id).s.open>=96,0,6000,id);}
function* pull(c,x){yield* go(c,x);yield* interact(c);}
const earth=function*(c){
 yield* haulAndLaunch(c);
 yield* until(c,()=>c.tx>=31.0,IN_RIGHT,800,"reach release lever");
 yield* until(c,()=>c.has("ready"),0,6000,"ready");yield* interact(c);c.flag("loose");yield* go(c,22);
 yield* until(c,()=>c.ent("pad").s.on===1 && c.ent("stone").s.vx===0,0,2000,"parked stone");
 yield* gate(c,"way");yield* pull(c,34);yield* go(c,35.5);c.flag("home_aboard");yield* until(c,()=>c.me.grounded===1&&c.bottom<=4*TILE+1,0,2500,"home lift top");yield* go(c,38);
};
function* prepare(c){
 yield* go(c,9.5);yield* climbLadder(c,GALLERY);yield* ontoCatwalk(c);
 yield* pull(c,23);yield* go(c,27.2);c.flag("ready");
 yield* until(c,()=>c.has("loose"),0,5000,"release");
}
function* dive(c,delay=0){
 if(delay)yield* wait(c,delay);
 yield* go(c,28.9);yield* go(c,29.2);yield* drop(c);
 yield* until(c,()=>c.me.grounded===1&&c.bottom>=LEDGE_TOP-1,0,400,"land on ledge");
 yield* go(c,28.6);
 yield* until(c,()=>c.ent("stone").s.vx===0&&c.ent("stone").s.x<=29*TILE&&c.ent("pad").s.on===1,0,1200,"stone stopped");
 yield* until(c,()=>c.me.grounded===1&&c.bottom>=BAY_FLOOR-1,IN_RIGHT,400,"drop into bay");
 yield* gate(c,"return_gate");yield* go(c,1);yield* waitFlag(c,"home_aboard");yield* interact(c);
}
const water=function*(c){yield* go(c,3.8);yield* until(c,()=>c.has("penned"),0,8000,"penned");yield* prepare(c);yield* dive(c);};
const lateWater=function*(c){yield* go(c,3.8);yield* until(c,()=>c.has("penned"),0,8000,"penned");yield* prepare(c);yield* dive(c,120);};
const direct={earth:function*(c){yield* go(c,35);},water:function*(c){yield* go(c,1);}};
const earlyWater=function*(c){yield* go(c,3.8);yield* until(c,()=>c.has("penned"),0,8000,"penned");yield* go(c,9.5);yield* climbLadder(c,GALLERY);yield* ontoCatwalk(c);yield* until(c,()=>c.tx>=31.0,IN_RIGHT,800,"reach release lever");};
export const solutions={sets:[{elements:["water","earth"],scripts:{water,earth},shortcuts:[{name:"walk directly",scripts:direct},{name:"dawdle on the catwalk",scripts:{water:lateWater,earth},maxTicks:12000},{name:"preposition before release",scripts:{water:earlyWater,earth},maxTicks:12000}]}]};
