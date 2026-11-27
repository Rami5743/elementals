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

## Next thing to try

Read probes/out3.txt (search with the draught). If a long forced solution exists, build it; if not,
the idea cannot be made to pass in the time left and this branch should say so.
