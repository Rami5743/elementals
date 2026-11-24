# RESUME — headlong

Chain bookkeeping: this chain's motor counter is **built[3p]=2** (this level is the ON of the
OFF/OFF/ON cycle — `dumbwaiter` and `backshunt` were both `mind`; after this the cycle restarts at
OFF).

## The design, in two sentences

A `rolls: true` boulder runs at 4 px a tick, faster than anybody can run, and the single turbine
that looses it from its pen is also the only thing that opens the water-filled shaft down into the
trench it runs into — so the only way to be standing in front of the stone is to dive down the
shaft after it has already gone. Water is the brake (only Water survives the shaft and Water is too
light to fake the heavy plate), Earth is the only thing that can haul the stone back up the return
ramp after a miss, and Air is the only thing a turbine answers to.

## What already passes

- Rolling-boulder physics probed and measured against `kit.mjs`: 4.00 px/tick terminal on a slope
  after ~2 tiles, 3.1 tiles of run-out on the flat at 0.08 px/tick² deceleration, Earth descends at
  2.57, so the stone cannot be overtaken. Slope tiles (`\` stepped one row down per column, rock
  beneath) make a continuous ramp and work as expected.
- Design written out in full in `NOTES.md` (milestone 1): core, player jobs, forced order, twist,
  interlock, two wrong plans, fairness.
- `order: 215` verified free across `levels/*/meta.json`.

## What fails, and the exact error

Nothing yet — no `level.json` exists. Next milestone is the first JSON that validates.

Known open risk to resolve first: whether a `rolls: true` boulder will **rest against a door placed
across a slope** (needed for the pen). If it will not, fall back to penning the stone on a flat
shelf at the ramp head and having the hatch+pen pair open an `elevator` or a floor plug instead.

## The next thing to try

1. Write `levels/headlong/level.json` from a generator script in the scratchpad (22 rows × 40 cols,
   asserted), with: top gallery, pen door across the ramp head, turbine, water-filled dive shaft
   with its hatch, the ramp, the trench (heavy plate + 2-tile pocket + hole), the bay (exits, gate,
   return ramp).
2. `node kit.mjs show headlong` and check the geometry reads.
3. Probe the pen: does the stone rest against the door on the slope, and does it run when the door
   opens?
