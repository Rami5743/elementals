# Caryatid — resume notes

**Design in two sentences.** A lift comes down only while something heavy is held at shoulder
height in its shaft (a heavy plate hanging there), and since it never crushes it settles on that
load: Earth on Water's shoulders calls it for the first crate, but the second crate's tunnel is
behind a door only Earth can hold from far away, so the stone has to ride on Water's head instead.
Fire rides the lift down both times and pushes each crate off into its tunnel; the exit opens when
both crates sit on their plates.

## Layout plan (tiles; floor rows are the solid row under the feet)
- Top hall rows 6-8, floor 9: exits cols 2-4, gate X col 6 over one sludge tile, stairwell cols 8-11,
  HPD room under a `=` at (15,9) (room row 10), crates on the hall, nook east of the shaft cols 26-27.
- Shaft cols 24-25, lift w=2 path (24,9)->(24,18); heavy plate A at (24,17) w=2 (shoulder band).
- Pad `==` at row 19 in the shaft, pocket row 20 below it (pick the stone up by jumping under it).
- WT west tunnel rows 15-16, floor 17, cols 18-23, lintel (static platform) at (23,15); LP_W light plate.
- ET east tunnel rows 15-16, floor 17, cols 26-34, lintel at (26,15), door D col 28 (HPD), LP_E.
- Cellar crawl row 18 from the stairwell bottom (col 12) to the shaft (col 23).
- Lintel: crate on the resting lift (76 px above the pad) fits under it; a carrier with a crate on
  its head (58 px) does not, so cargo reaches the tunnels only on the lift.

## Status
- Milestone 1: design written.
- Milestone 2: level.json validates (generator kept in levels/caryatid/tools/gen.mjs).

## Next
- Generator script in the scratchpad -> level.json; validate with `node kit.mjs show caryatid`.
