# RESUME — headlong

**Finished.** Chain bookkeeping: this chain's motor counter is **built[3p]=2** (this level is the ON
of the OFF/OFF/ON cycle — `dumbwaiter` and `backshunt` were both `mind`; after this the cycle
restarts at OFF).

## The design, in two sentences

A `rolls: true` boulder holds 4 px a tick, faster than anybody can run, and the single turbine that
looses it from its pen is also the only thing that opens the catwalk gate — so the only way to be
standing on the ledge at the foot of the chute, in front of the stone, is to run the catwalk and
drop off its end after the stone has already gone. Water is the brake (a pool across the catwalk's
mouth makes the catwalk, and the ledge under it, Water's alone, and Water is far too light to fake
the heavy pad), Earth is the only thing that can move the stone at all, and Air is the only thing a
turbine answers to.

## What already passes

`node kit.mjs check headlong` — **no problems**:

- water+earth+air: **solved in 38.5 s** (par 120 s), 3/3 gems, no deaths
- all three co-op idle checks pass
- all four shortcut cheats fail, each for the thing it was meant to prove
- **no warnings** — in particular no "door open too briefly": the catwalk gate stays open for as
  long as Air stands on the turbine, so the only clock in the level is the stone

`node tools/novelty.mjs headlong` → **PASS (invented)** on `dive-ahead-of-the-runaway`, an idea no
other level anywhere uses. `node tools/build.mjs` and `node tools/catalog.mjs` both run.

Measured and relied on: 4.00 px/tick terminal on a slope after ~2 tiles; 3.07 tiles of run-out on
the flat; Earth descends a slope at 2.57; the stone takes ~135 ticks from the turbine to the pad;
the race forgives up to about 90 ticks of hesitation and loses the stone at 120.

## What fails, and the exact error

Nothing.

Engine facts this cost, recorded so nobody re-learns them:
- A one-way ledge at a lift's bottom stop **jams the lift**: the platform stops on the head of
  whatever is resting on the ledge, for good.
- A 2-tile shaft is too narrow for Earth beside the stone — the stone's right edge clipped the rock
  beside the shaft and jammed the hoist. The shaft is 3 wide.
- A rider hanging even a few pixels off the platform's edge **stalls** it.
- Ordinary 1-tile steps make a staircase that **traps the climber** (each step overhangs the one
  below) and its bottom step blocks the corridor. Use one-way ledges.
- `jump()` returns early while rising through a one-way ledge, so each hop of a climb has to wait
  until it is really standing on the next level.
- A turbine fires the instant Air touches it, so Air waits *beside* it until Water is in place.
- Air glides straight over a three-tile hole, so no jump bit when dropping down the shaft.
- **A player who walks into an open lift shaft is pinned under the returning platform for good.**
  That was a genuine unwinnable state; the hoist's control is now a hold button running the height
  of the shaft, so the mouth is never open unattended and anyone in the pit can call the platform
  up off themselves.

## The next thing to try

Nothing is outstanding. If the author wants a change, the map is generated — the generator lives in
the session scratchpad at `probe/gen.mjs` and rebuilds `level.json` from a tunable chute profile
(`PROFILE = 'SSSSFFSSFFSS'`, S = slope, F = flat shelf); the shelves are what lengthen the stone's
run and buy Water time, so lengthening or shortening the race is a one-character edit there followed
by `node kit.mjs check headlong`.
