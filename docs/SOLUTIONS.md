# Solution scripts

Every supported group needs a solution: a script per player that plays the level in the real game. `node kit.mjs check <level>` runs the scripts tick by tick in the game's simulation, records what they pressed as a replay (`replays/<elements>.json`), then plays the replay back and tests it: it must win with no deaths, take every gem, finish within par, and fail when any one player stays idle in their door.

## The file

`levels/<id>/solution.mjs`:

```js
import { IN_LEFT, IN_RIGHT, IN_JUMP, TILE, go, jump, until, interact, wait } from '../../kit.mjs';

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* go(c, 12);                      // walk until Fire's centre is at the centre of tile 12
  yield* until(c, () => c.ent('gate').s.open >= 64, 0, 2000, 'the gate'); // stand still until it opens
  yield* go(c, 30);
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* go(c, 5);
  yield* interact(c);                    // pull the lever here
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  sets: [
    { elements: ['fire', 'water'], scripts: { fire, water } },
    // one entry per group in "supports"; the same script functions can be reused
  ],
  roles: { 'fire,water': { fire: 'Holds the plate.', water: 'Pulls the lever.' } },
};
```

A script is a generator: each `yield` is one tick of input bits for that player (`IN_LEFT` 1, `IN_RIGHT` 2, `IN_DOWN` 8, `IN_JUMP` 16, `IN_INTERACT` 32, combined with `|`; `0` is no input). All scripts advance together, one tick at a time, and read the live game through `c`. When a script ends, that player stands still. The level must be won before 20 000 ticks.

## Reading the game: `c`

| | |
|---|---|
| `c.me` | this player: `x`, `y` (px, top-left), `vx`, `vy`, `grounded` (1/0), `inDoor` (1 when standing in its own exit), `dead`, `element` |
| `c.cx`, `c.bottom`, `c.tx` | centre x in px, feet y in px, centre x in tiles |
| `c.ent(id)` | `{ def, s }`: the entity's definition (pixel `x`, `y`, `w`, `h`) and state `s`: `on` (1/0), `gone` (ice/fire wall/cracked removed, gem taken), `open` (px a door has opened), `x`, `y` (crates, boulders, lifts), `d` (lift distance travelled) |
| `c.player('water')` | another player's state; `c.playing('air')` says whether Air is in this group |
| `c.state.tick`, `c.state.players`, `c.world` | the whole game state and level |
| `c.flag('name')`, `c.has('name')` | shared flags, so players can wait for each other |

## Helpers

All positions are in tiles (fractions allowed); `go(c, 12)` aims for the centre of tile 12.

| Helper | Does |
|---|---|
| `go(c, x, { tol, hold, max, noHop })` | Walk to tile x and stop. Hops over a partner standing in the way. `hold` adds bits while walking (e.g. `IN_INTERACT`). |
| `run(c, x)` | Run without stopping until the centre passes tile x. |
| `jump(c, dir, { hold, steerUntil, delay })` | Jump (`dir` -1 left, 0 up, 1 right), holding Jump `hold` ticks (default 30 = full height; less = lower), steering until tile `steerUntil`; returns on landing. |
| `runJump(c, from, takeoff, steerUntil)` | Go to `from`, run to `takeoff` and jump at full speed (for gaps and pools). |
| `leap(c, x, hold)` | Jump and steer to land centred on tile x. |
| `steerTo(c, x, glide)` | While airborne, steer toward x (Air glides) until landing. |
| `drop(c)` | Drop through the one-way ledge you stand on. |
| `pound(c)` | Earth: ground pound from the current jump (breaks a cracked floor below). |
| `interact(c)` | Press Interact once (lever, button). |
| `wait(c, n, bits)` | n ticks (pressing `bits`). |
| `until(c, pred, bits, max, what)` | Repeat `bits` until `pred()` is true; fails after `max` ticks naming `what`. Use it to wait for doors, partners and lifts, or to keep pushing a crate. |
| `holdAt(c, x, pred)` | Stay at tile x (also hovering in a fan) until `pred()`. |
| `waitFlag(c, name)` | Stand still until someone calls `c.flag(name)`. |

You can write your own helpers: any generator that yields bits works, e.g. a loop that yields `IN_LEFT` until a crate stops moving.

## Making scripts work

- **Wait for events, not for times.** `until(c, () => c.ent('gate').s.open >= 64)` is robust; `wait(c, 200)` breaks when anything changes.
- **Two players walking into each other both hop and get stuck.** Let one stand still (`until`) while the other passes.
- **Script failures name the problem:** "fire could not reach x=12 (at 9.40) by tick 800", "water died at tick 412 (x=20.1, y=18.0)". The position tells you where it went wrong.
- **Trace:** `node kit.mjs check <level> --trace 30 --ents gate,box` prints every player's tile position and those entities' state every 30 ticks.
- **Probe:** to find out whether a jump is possible, write a small script that builds the world and steps the game yourself:

```js
// probe.mjs (in the kit folder): can Earth jump from the floor onto the ledge at row 17?
import fs from 'node:fs';
import { buildWorld, createState, stepGame, IN_RIGHT, IN_JUMP, TILE } from './kit.mjs';
const level = JSON.parse(fs.readFileSync('levels/my_level/level.json', 'utf8'));
const set = ['fire', 'earth'];
const world = buildWorld(level, set);
let s = createState(world);
for (let t = 0; t < 120; t++) {
  s = stepGame(world, s, [0, IN_RIGHT | (t < 30 ? IN_JUMP : 0)]);
  if (t % 10 === 0) console.log(t, (s.players[1].x / TILE).toFixed(2), (s.players[1].y / TILE).toFixed(2));
}
```

- `jump()` can return early when rising through a one-way ledge exactly on a tile boundary; if a jump onto a ledge "lands" too soon, wait until `c.bottom` is at the ledge's top before moving on.
- **Gems:** route the scripts through every gem; the check fails if any gem is left. Raise `parTicks` if the honest solution is slower than par (par should be beatable by players who know the solution, not only by a script).
- The examples in `examples/` show bigger solutions: crates (`l05_box_relay`), fans and gliding (`l09_updraft`), Earth (`l44_flue`) and four players (`l53_counterpoise`). Their `detours.json` adds gem pickups the game's tools recorded separately; your own levels don't need one.

The full list of exports and their types is in `kit.d.mts`.
