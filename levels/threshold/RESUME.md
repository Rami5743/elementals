# Threshold — resume notes

Motor counter for this chain: **built[3p]=3** (this level OFF, the next one OFF, then ON).

## The design in two sentences

A plate under an exit: the draught that is the only way from the hall up to the gallery is powered by
Fire standing in its own doorway, which Fire can only reach by wading a one-tile-high lava tunnel and
climbing a sealed stairwell, so the first player home becomes the level's power station and can never
step out again. Earth is the only mass 2 in the level and its weight is claimed twice — the hall plate
that (with Air's hand on the catch) opens the tunnel hatch, then the landing plate that opens Air's
gate — and the last move is to *give up* that second plate, letting the gate shut on Air, who is
already home.

3 players, fire + earth + air, order 216, challenge "mind" (motor OFF).
Idea coined in `tools/ideas.mjs`: `threshold-is-a-switch`.

## What already passes — the level is finished

- `node kit.mjs check threshold`: **No problems.** Solved in **22.6 s** (par 80 s), 3/3 gems, no
  deaths, no warnings; all three co-op "waits at its exit" tests pass; all three shortcut scripts fail
  for the right reason (`air died` at the lava, `earth timed out waiting for the draught to lift us`,
  `air could not reach x=2` at the shut `air_gate`).
- `node tools/novelty.mjs threshold`: **PASS (invented)**.
- `node tools/build.mjs` and `node tools/catalog.mjs` both run.

## What fails, and the exact error

Nothing.

## Next thing to try

Nothing for this level. If it is ever revisited: 22.6 s is comfortably over the 20 s floor but short
of the 30 s mark, and the honest way to lengthen it is another gear in the gallery, not a longer walk.

## Gotchas paid for while building this one

- Liquids go in the **floor** row, not the body row: a liquid tile is a solid wall from the side, so
  Fire was stopped dead at the edge of a lava strip laid at body height. A strip you wade is `L` at
  row 20 with row 19 open above it.
- `check` fails a level that can be finished while a player idles in its own door, so a player whose
  only job is to *be* in its doorway is rejected by construction. Fire therefore lights a lamp on the
  stairwell landing on the way up, and `earth_gate` wants that lamp **and** Air's threshold
  (`required: 2`).
- `go()` hops over a partner standing in the way, so a carrier must park on the far side of its rider
  (Air arrives from the east and stops east of Earth) or `climbOnto` fires mid-hop. The same bites in
  shortcut scripts: two of the three first failed because a *body* was in the way rather than the
  thing being proved.
- A rider must step off the draught on the side its own cell is on: the column's mouth is a hole in
  the gallery floor, and walking over it drops you back to the hall.
- In a draught, steer *late*: a step-out that presses a direction from the first tick walks the rider
  straight out of the column before it has risen at all.
- `_lib.mjs` already has `climbOnto` (for mounting narrow Air) and `rideAlong` (for staying on a head
  through a ride) — do not write them again.
- Measured here: at strength 1.54 the draught lifts Air alone and Air **carrying Earth** the eight
  tiles from the hall floor to the gallery. `docs/MECHANICS.md` says Air carrying Earth does not rise;
  that is true of the default 0.9, not of 1.54, as `engine-facts.md` says.
