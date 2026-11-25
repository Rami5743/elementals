# Chockstone — resume notes

**Motor counter for this chain: built[3p] = 4 (this level OFF, the next OFF, then ON).**

## The design, in two sentences

A rolling boulder on a long hill can only be brought to a halt by a body standing in its path, and
it comes to rest in the cell immediately *uphill* of that body — exactly where a heavy plate hangs
over the walkway, out of reach of any body light enough to be standing there. The lock on the way
out wants that plate, a heavy body on an anvil at the far end of the top shelf and a held grip all
at the same instant, so one of you has to be standing on the hill *before* the stone is ever loosed
— nothing in the game outruns a runaway — and the one who looses it is the one who can never be the
brake.

## State

- `level.json` written by a generator (`/tmp/claude-0/-home-user-elementals/21399c47-b54e-59c4-b8d3-8866955cc1ed/scratchpad/gen.mjs`) and **valid**.

## The map

Top shelf (floor row 6, x 1..11) with the grip at (2,5), the anvil at (5,5) and the stone parked on
the lip at (11,5). A ten-tile slope `\` at (12+i, 6+i) runs down to a flat run (floor row 16,
x 22..30) and the wicket at x=31 seals the exit hall (x 32..38). The brake's post is the walkway
cell (17,10), standing on slope tile (17,11); a stone stopped there rests in cells (16,9)+(17,9),
which is exactly the `berth` plate.

## Measured facts this design rests on (probed, 2026-11-25)

- A boulder with `rolls: true` starts rolling from rest on a `\` slope with no push, and reaches
  4 px/tick (PHYSICS.md agrees).
- A body standing on the slope stops it. It comes to rest in cells `(C-1, R-1)` and `(C, R-1)`
  where the body stands in cell `(C, R)` — i.e. uphill and one row up, **not** on the body's head.
- A **heavy** plate placed in that cell reads the stone and is *not* pressed by the light body
  standing below it.
- Step aside and the stone rolls on at once: nothing is ever lost.
- On the **flat**, a body stops a rolling stone dead in front of it and it never moves again.
- A plate on the stone's path is pressed *momentarily* as it rolls past (~8 ticks).

## What passes

- `node kit.mjs check chockstone` reports **no problems**: solved in 10.5 s, 3/3 gems, no deaths,
  all three co-op idle tests pass, and both shortcut scripts fail with the wicket never latching.

## What fails

- **Too small.** 10.5 s against the skill's 20 s floor (30 s is the mark). One mechanism plus a
  three-way contact is not enough; it needs a second phase, not a longer walk.
- The no-brake shortcut is currently blocked only by *distance* (Earth's walk back to the anvil is
  about 150 ticks against the stone's 70 to the berth). That is a timing argument, and brittle.

## Next thing to try

Two berths instead of one, and a structural block in place of the distance argument:

- `berthHigh` (high on the hill) drives a `hatch` on the shelf with **no latch** — open only while
  the stone is actually held there, which an eight-tick rolling press can never do for long enough
  to walk through.
- Behind the hatch is the anvil bay, with the anvil and **Earth's own exit** in it. Earth walks in
  while the stone is held high and can never come out — so the anvil can never be pressed during a
  free roll, which kills the rolling-pass shortcut structurally.
- The brake then walks the stone *down* the hill to `berthLow`, which the stone never touches on a
  free roll (it would have had to stop at berthHigh first), and `wicket` latches on
  berthLow + anvil + grip.
