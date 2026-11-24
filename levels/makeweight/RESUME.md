# RESUME — makeweight (4p, motor OFF, order 316) — FINISHED

This chain's motor counter: **built[4p] = 3** (this level OFF, the next one OFF, then ON).

## The design in two sentences

A balance plank adds up the masses standing on each half while a heavy plate reads only the heaviest
single body, so three light players are worth 3 to the plank and 1 to the plate: the party can stand
in for the stone on the scales and never on the lock. The stone starts *on* the pan and so jams the
machine with the seat six tiles up out of reach, so the opening move is to take the weight off the
scale and spend it on the cellar's heavy plate — after which the only makeweight left is the whole
rest of the party, who must all ride the pan six tiles down to lift Earth up to the loft's heavy
plate, the gate's second key.

## What passes

Everything. `node kit.mjs check makeweight`:

- solved in **29.3 s** (par 75.0 s), 4/4 gems, no deaths;
- all four co-op tests pass (unfinishable while any one player waits in its door);
- all four shortcut scripts fail, each for the reason it was meant to:
  - `Earth climbs a partner in the shaft and jumps for the loft` — earth stops at x=18.6, never
    reaches the beam at x=23;
  - `Two on the pan instead of three` — earth waits on the seat for ever; the plank never moves;
  - `Earth tries to hold the cellar plate without moving the stone` — earth stops at x=16, because
    the loaded pan seals the cellar passage;
  - `Earth spends the stone on the plate and then stays in the cellar` — fire stops at x=8.3, in
    front of a gate holding one key.

`node tools/novelty.mjs makeweight` → **PASS (invented)**: `plank-sums-plate-maxes` and
`two-is-not-heavy` are used by no other level anywhere. `tools/build.mjs` and `tools/catalog.mjs`
have both been run (43 levels, 16 at 4p).

## Nothing is outstanding

If this is picked up again it is polish only: the solve time is 29.3 s, a shade under the 30 s the
skill suggests aiming at, and the way to raise it would be a fourth phase, not a longer walk.

## Engine facts measured tonight that are NOT in references/engine-facts.md

The repo had **no seesaw level**, so none of this was written down:

- A seesaw's halves are `w/2` tiles each: left = `{x, y+d}`, right = `{x+w/2, y-d}`, each **16 px
  thick**; `d` moves **2 px/tick**, so a full `range: 12` swing takes ~96 ticks.
- It is a **comparator, not a scale**: the target is `+range*32/2` if left-sum > right-sum,
  `-range*32/2` if right > left, and **0 when the two sums are exactly equal**. The margin is
  irrelevant — 1 vs 2 swings exactly as far as 1 vs 5. Three states only: left down / level / right
  down, and "level" is reached only by exact equality.
- It reads **`stackMass`: the SUM of everything resting on that half, recursively through heads** —
  unlike a plate, which reads `max(mass)` and ignores riders. Measured: Earth(2) vs Fire+Water(2)
  stays dead level for 200+ ticks; Fire+Water+Air(3) vs Earth(2) gives the full swing.
- `range: 6` → each half swings ±3 tiles from its rest row; `range: 12` → ±6 tiles.
- **`moveSolidPx` does not test tiles.** A seesaw half passes straight *through* rock; the swing is
  stopped only when an **actor** in the way cannot be pushed, and because both halves move in one
  call, either one being blocked freezes the whole plank. Two consequences worth knowing:
  - rock under a half does not pin the half, it pins the half's **rider** — so rock one row below a
    half's rest row turns "Earth rides it six tiles down" into "Earth sags it exactly one tile", and
    that sag is what makes a plank boardable at all (the first body on to a level plank otherwise
    always tips it and rides it away);
  - a rider's **head hitting a ceiling** jams the plank too. In the first probe the swing stopped at
    `d=68` of a possible 96 purely because Air's head met rock three rows above.
- A half carries its riders both up and down; three players fit side by side on a 3-tile half.
- A boulder pushed off a half's lip comes to rest with its far edge exactly at the half's edge, so a
  half's lowest position should be **one tile above** the floor the cargo lands on: the cargo then
  cannot be pushed back under the half (no uphill push) and cannot jam its descent.
- Dropping through a one-way ledge is **edge-triggered like jump**: holding Down gives exactly one
  drop. Pulse it (7 ticks on, 7 off) to descend a stack of ledges.
- Towers: with both halls capped at three tiles of headroom, the only place a human ladder can be
  built is the plank shaft, standing on the seat — whose own sag drops the tower's base a tile. Off a
  partner's head there Earth reaches y=182; off a three-high tower, y≈124.
