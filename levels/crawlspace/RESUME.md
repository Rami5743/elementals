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

- `node kit.mjs check crawlspace`: **no problems**. Solved in 30.0 s (par 90.0 s), 4/4 gems, no
  deaths; all four co-op idle tests pass; three shortcuts blocked.
- Shortcut `Earth pounds under the closed slab` fails for exactly the right reason:
  `earth@(20.1,14.1)` — standing on the panel in the one-tile crawl, unable to break it.
- Shortcut `Earth holds the pad for the others` fails with `earth@(6.1,12.1)` — on the pad.

## What fails

- Shortcut `Fire jumps the slab hole` currently fails for the WRONG reason: it deadlocks, because
  that variant of Fire never sets `torch_lit`, so Air never sets `keys` and Earth never moves the
  stone (`fire@(9.2,12.1)` — Fire never even got to the lip). Being rewritten as "the stone comes
  off the pad before the torch is lit, and Fire tries to jump back to the far end", with Air
  flagging `air_across` so only Fire's mistake is under test.

## Next thing to try

Rewrite that third shortcut, then meta.json (order 344, challenge mind, core
`roof-must-go-before-the-floor-can`), coin `pound-needs-headroom` in `tools/ideas.mjs`, run
`node tools/novelty.mjs crawlspace`, then `tools/build.mjs` and `tools/catalog.mjs` in the same
commit. Generator:
`/tmp/claude-0/-home-user-elementals/21399c47-b54e-59c4-b8d3-8866955cc1ed/scratchpad/a56c/gen.mjs`.
