# RESUME — headlong

Chain bookkeeping: this chain's motor counter is **built[3p]=2** (this level is the ON of the
OFF/OFF/ON cycle — `dumbwaiter` and `backshunt` were both `mind`; after this the cycle restarts at
OFF).

## The design, in two sentences

A `rolls: true` boulder runs at 4 px a tick, faster than anybody can run, and the single turbine
that looses it from its pen is also the only thing that opens the catwalk gate — so the only way to
be standing on the two-tile ledge at the foot of the chute, in front of the stone, is to run the
catwalk and drop off its end after the stone has already gone. Water is the brake, Earth is the only
thing that can move the stone at all (and so the only thing that can put it back on the hoist after
a miss), and Air is the only thing a turbine answers to.

## What already passes

- Rolling-boulder physics probed against `kit.mjs`: 4.00 px/tick terminal on a slope after ~2 tiles,
  **3.07 tiles of run-out** on the flat (deceleration 0.08 px/tick²), Earth descends a slope at its
  normal 2.57, so the stone cannot be overtaken by anybody (Air tops out at 3.4).
- `levels/headlong/level.json` **validates** — `node kit.mjs show headlong` reports no problems.
  22 rows × 40 cols built from `gen.mjs` (kept in the scratchpad), geometry reads correctly:
  catwalk (row 4) over gallery (row 8) over the ramp diagonal over the landing ledge (row 16, x
  25-26) over the bay (row 20).
- `order: 215` verified free across `levels/*/meta.json`.
- Design written out in full in `NOTES.md`.

## What fails, and the exact error

No solution script exists yet, so `check` has nothing to run. Two physics questions are still
unanswered and are the next thing to settle:

1. Does the stone **rest against the pen door** where the door crosses the ramp at x=19, and does it
   run on when the door opens?
2. Does an unbraked stone reaching the ledge actually **go over the edge at x=27** rather than
   balancing on the lip? Its speed there should be ~2.4 px/tick, which ought to be ample.

## The next thing to try

1. Probe both questions with a script against `level.json` directly (`buildWorld` / `stepGame`);
   `s.ents` is an **array indexed by entity order**, not keyed by id.
2. Then write `solution.mjs` for `water+earth+air` and get it to run at all, however badly.
3. Then tune `GATE_X` / `PEN_X` in `gen.mjs` so a prompt dive beats the stone by roughly a second
   and a hesitation loses.
