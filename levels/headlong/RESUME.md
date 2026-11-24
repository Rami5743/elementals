# RESUME — headlong

Chain bookkeeping: this chain's motor counter is **built[3p]=2** (this level is the ON of the
OFF/OFF/ON cycle — `dumbwaiter` and `backshunt` were both `mind`; after this the cycle restarts at
OFF).

## The design, in two sentences

A `rolls: true` boulder runs at 4 px a tick, faster than anybody can run, and the single turbine
that looses it from its pen is also the only thing that opens the catwalk gate — so the only way to
be standing on the three-tile ledge at the foot of the chute, in front of the stone, is to run the
catwalk and drop off its end after the stone has already gone. Water is the brake, Earth is the only
thing that can move the stone at all (and so the only thing that can put it back on the hoist after
a miss), and Air is the only thing a turbine answers to.

## What already passes

`node kit.mjs check headlong` — **no problems**:

- level.json valid, every spawn safe
- water+earth+air: **solved in 43.1 s** (par 120.0 s), 3/3 gems, no deaths
- all three co-op idle checks pass (the level cannot be finished while any one player waits in its
  own door)
- no warnings — in particular no "door open too briefly": the catwalk gate stays open for as long as
  Air stands on the turbine, so the only clock is the stone itself.

Measured and relied on (all probed against `kit.mjs`): 4.00 px/tick terminal on a slope after ~2
tiles; 3.07 tiles of run-out on the flat; Earth descends at 2.57; the stone takes ~135 ticks from
the turbine to the pad against ~70 for Water's run-and-dive, so the race has about a second of
slack.

## What fails, and the exact error

Nothing. The remaining work is the publishing checklist, not debugging.

Hard-won gotchas, recorded so they are not re-learned:
- A one-way ledge at a lift's bottom stop **jams the lift** — the platform stops on the head of
  whatever is resting on the ledge. The shaft mouth is a plain gap, plugged by the platform itself
  (the hoist is `powered` with a `timed` call button, so it is parked at the bay by default).
- The call button sits **on the platform's own deck** (`w: 3`), so it can only be pressed from
  aboard: nobody can send the platform away and leave the shaft mouth open behind them.
- A 2-tile-wide shaft is too narrow for Earth beside the stone: the stone's right edge clipped the
  rock beside the shaft and jammed the hoist. The shaft is 3 wide.
- Ordinary 1-tile steps make a staircase that **traps the climber** (each step overhangs the one
  below) and the bottom step blocks the corridor. The way up to the catwalk is a one-way ledge.
- A turbine fires the moment Air touches it, so Air has to wait *beside* it until Water is in place.
- Air must not glide down the hoist shaft — it sails straight over a three-tile hole.

## The next thing to try

1. Shortcut scripts in `solution.mjs` (`shortcuts`), then re-check:
   - Earth walks down the chute and stands on the heavy pad itself instead of the stone.
   - Water walks down the chute behind the stone instead of diving (must arrive too late).
   - Air touches the turbine and then tries to be the brake itself.
2. `meta.json` with `order: 215`, `challenge: "motor"`, the core tag and the ideas.
3. Coin `dive-ahead-of-the-runaway` in `tools/ideas.mjs`, then `node tools/novelty.mjs headlong`.
4. Finish `NOTES.md` (shortcuts section), then `node tools/build.mjs` and `node tools/catalog.mjs`.
