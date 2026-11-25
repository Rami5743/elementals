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
- order 344, challenge `mind`, core `roof-must-go-before-the-floor-can`.
- New idea key to coin in `tools/ideas.mjs`: `pound-needs-headroom`.

## What passes

- `node kit.mjs check crawlspace`: `level.json is valid`, `every spawn point is safe`.

## What fails

- `✗ no solution.mjs: every supported group needs a solution script` — expected, not written yet.

## Next thing to try

Write `solution.mjs` for `fire+water+earth+air`. Running order: Earth recces the crawl for its gem
(and cannot pound); Fire/Water/Air cross the slab; Fire lights the torch, Air touches the turbine
(torch first — the gate wants both at once), Air takes the roof gem at (26,8); Earth pushes the
stone left off the pad at tile 6; Earth drops through the ledge at 16, crawls to 20, pounds; the
others walk left off the lip at tile 23 and fall into the crawl, then drop through the panel; Water
takes its gem at (22,18); through the latched gate; Water on the freeze pad at 25, everybody over
the pool, Water last. Generator lives at
`/tmp/claude-0/-home-user-elementals/21399c47-b54e-59c4-b8d3-8866955cc1ed/scratchpad/a56c/gen.mjs`.
