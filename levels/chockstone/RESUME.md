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

- Design written. No JSON yet beyond `kit.mjs new`'s scaffold.

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

- Nothing yet.

## What fails

- Nothing yet.

## Next thing to try

Write `level.json` from a generator script and get `node kit.mjs check chockstone` to validate.
