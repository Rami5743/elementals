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

Nothing yet — no level.json.

## What fails

Nothing yet.

## Next thing to try

Write the tile generator in the scratchpad: 22 rows of 40, gallery floor row 13 (`=` at 16, slab
door tiles 17–22), crawl row 14 over floor row 15 with the cracked panel at tile 20, lower hall rows
16–18 over floor row 19 with a pedestal at (20,18) two tiles under the panel hole. Then validate.
