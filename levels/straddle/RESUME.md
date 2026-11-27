# Straddle — resume notes

**Design (two sentences).** A plate senses any body overlapping it, so one body standing on the join
of two adjacent plates presses both: door A wants four presses from three light/heavy pairs (one of
them held at the start by the boulder) and the latched exit door wants the boulder dropped into its
slot *and* Earth standing on a heavy plate back in the start room. Spending the boulder takes two of
A's presses away, so Earth's trip home and everybody's way out have to be paid for with seams: Fire
holds the home pair, Water the crawl pair the stone left, Earth the heavy|light pair only it counts
double on.

Layout plan (3p Fire+Water+Earth, rows: floor 19, hall rows 16-18, roof 15):
- W x1-13: heavy plate `l` (F) at x1; light pair w1|w2 at x8,9 (A). Spawns x11-13. Door A at x14.
- M-west x15-21: pair s1 (heavy) | s2 (light) at x19,20 (A) — Earth counts 2, others 1.
- Pedestal x22-26 (row 18 solid), mouth x22, one-tile crawl x23-25 (roof row 16); boulder at x24.5 on
  m1|m2 (x24,25) (A). Earth can only ever push it east. x26 open above.
- Slot x27 (1x1 pit) with heavy plate `h` (F). M-east x28-38 floor row 18, door F x33 (latch, h+l).

## Status
- Milestone 1: design written, no JSON yet.

## Next
Write generator in scratchpad, produce level.json, `node kit.mjs show straddle`.
