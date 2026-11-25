# Crawlspace — resume notes

**Chain motor counter: built[4p]=4 (this level OFF, the next OFF, then ON).**

## The design in two sentences

A ground pound is a jump first, so a cracked panel in a crawl one tile high cannot be broken at
all; the crawl's roof is a six-tile sliding slab that is also the gallery's only bridge, held shut
by a boulder on a heavy pad, so giving Earth the headroom to pound means pulling the party's own
road out from under them. The far end of the gallery can be entered over the slab and left only by
falling, so Fire's torch and Air's turbine — the two keys the lower hall's gate wants on at the same
moment — have to be won before the stone comes off the pad.

## State

- Design written. No JSON yet.
- Measured and relied on (probes in the scratchpad, not in the repo):
  - **1 tile of headroom: Earth cannot pound at all** (cannot get airborne). 2 tiles: pound works.
    Measured on a cracked panel with rock ceilings at 1/2/3 tiles.
  - A closing door rests on a boulder at exactly `open = 30` px and stays there for good; the
    stone's own tile stays plugged, so a jammed doorway is not a passage. (Explored, then dropped —
    not used by this level.)
- order 347, challenge `mind`, core `roof-must-go-before-the-floor-can`.
- New idea key to coin in `tools/ideas.mjs`: `pound-needs-headroom`.

## What passes — finished

- `node kit.mjs check crawlspace`: **no problems**. Solved in 29.6 s (par 90.0 s), 4/4 gems, no
  deaths; all four co-op idle tests pass; three shortcuts blocked, each for the right reason:
  - `Earth pounds under the closed slab` -> `earth@(20.1,14.1)`: on the panel in the one-tile crawl,
    unable to leave the ground. This is the core fact, proved rather than asserted.
  - `Earth holds the pad for the others` -> `earth@(6.1,12.1)`: pinned to the pad.
  - `Fire jumps the slab hole to reach the torch` -> `fire@(11.2,12.1)` beaten back to the near
    side, `water@(23.3,17.1)` and `earth@(23.2,18.1)` stacked in front of the gate that never
    latched, `air@(29.1,12.1)` still waiting beside the turbine for a torch nobody lit.
- `node tools/novelty.mjs crawlspace`: **PASS (invented)** — `pound-needs-headroom` is used by no
  other level anywhere.
- `node tools/build.mjs` and `node tools/catalog.mjs` both run in the same commit as the level.

## What fails

Nothing.

## Measured constants this level stands on

- **Earth cannot ground-pound with one tile of headroom at all** (cannot get airborne, so no
  airborne Down press); two tiles are enough. Measured against a cracked panel with rock ceilings
  at 1, 2 and 3 tiles.
- A closing door rests on a boulder at exactly `open = 30` px and stays there for good, and the
  stone's own tile stays plugged, so a jammed doorway is not a passage. Explored first, then
  dropped — this level does not use it. Worth knowing for a future one.

## If anything needs changing

The tile generator is at
`/tmp/claude-0/-home-user-elementals/21399c47-b54e-59c4-b8d3-8866955cc1ed/scratchpad/a56c/gen.mjs`
(scratchpad, may be cleared); re-run it to regenerate `level.json`, then `kit.mjs check`,
`tools/build.mjs` and `tools/catalog.mjs` in the same commit.
