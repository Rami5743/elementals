# Takeoff Weight — resume notes

## Design in two sentences

Air's glide is weight-blind (measured: Air glides 33 tiles off a 12-tile drop alone, with Fire, or
with Earth aboard), so Air can fly anyone across the sludge chasm — but only from the launch pan of a
seesaw when it is raised, and that pan rises only while the other pan outweighs Air *plus its
passenger*. Every flight therefore has a price in counterweight, and every flight carries weight
away from the near side for good: the order of departures is a weight budget.

Proposed new idea key: `takeoff-weight` — the launch height of the glider is bought on a scale that
weighs the passenger too.

## Measured so far (probes/, not committed)

- Fans do not move crates or boulders at any strength.
- A descending lift stops on a player and resumes when they step away; a crate under it jams it for
  good (the platform's edge stops anyone reaching the crate).
- Riders count on plates (Earth on Fire's head holds a heavy plate in mid-air).
- Air's jump is 3.75 tiles with or without a rider (weight-blind).
- Seesaw range 6: each half moves 3 tiles from level; equal loads sit level.

## Abstract solver (probes/solve.mjs)

Pans at heights 0/4/8 (range 8, so nobody jumps between storeys), pockets beside each pan, glide from
the launch pan at 8. Result: with only the seesaw lifting people there is **no solution in any
layout or start** (energy argument: passengers only rise when counterweight falls, and only Air
comes back up). Now searching a variant with an Air-only updraft that can carry Fire or Water (not
Earth) back up to the counterweight loft.

## Status when the session stopped (budget exhausted)

**NOT FINISHED. Do not publish.** `level.json` and `solution.mjs` are still the untouched
`kit.mjs new` scaffold (a small Fire + Water level); nothing of the design has been built, so
`tools/build.mjs` and `tools/catalog.mjs` were deliberately not run and `meta.json` does not exist.

What passes: nothing of the design. What fails: the abstract model itself has no solution yet.

- `probes/solve.mjs` is a BFS over the abstract puzzle (pockets `C0 C4 C8` beside the counter pan,
  `L0 L4 L8` beside the launch pan, `L8` = launch tunnel; walking on/off a flush pan, dropping onto
  a lower pan, walking across at level, Earth pushing the boulder (3), anyone pushing crates (1),
  Air gliding with one rider from the launch pan at 8, Air returning to `ret`, optional Air-only
  draught `fan: [from, to]` that can carry Fire or Water but not Earth).
- `probes/search2.mjs` (no draught, one crate, every pocket subset, every start): **0 solutions**.
- Hand-picked layouts with the draught `C0 -> C8` and `ret` in `L8 / C0 / C8 / L0`: 0 solutions.
- `probes/search3.mjs` (draught variants, full sweep) was too slow to finish; stopped.

Why it is stuck: the passengers must end up on the launch pan at its top, a pan only rises when the
other side outweighs it, and nothing re-raises fallen counterweight except Air. Earth's own flight
needs boulder + one more on the counter pan, and that extra weight is then stranded at the bottom.
Also nobody can ever reach the launch side at all unless somebody starts there (the first body on a
level pan tips it).

## Next thing to try

1. Seed the launch side: start one light player in `L4` (flush with the level pan) and rerun
   `node probes/t1.mjs '<cfg json>'` on a few layouts; add `L4`/`C4` starts to `search3.mjs` and
   restrict it to one pocket set so it finishes.
2. If the model still has no long forced solution, drop the seesaw for a pulley (Air weighs 1/2 on
   a rope, balanced pans stay put, `weights` can make a pan sink back) — it gives the memory the
   seesaw lacks.
3. Only once a forced solution of 10+ moves exists: lay out the map (range 8 so nobody jumps
   between storeys; 2-tile launch tunnel with a roof overhang so nobody jumps out of it; check head
   boosts from the pans), then write the scripts.
