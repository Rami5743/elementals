# Footprint Ledger

**Introduces:** A player's location is a volatile key, but meeting on the right two plates records a permanent permission; the puzzle is to acquire those permissions without abandoning a position that a partner still needs.

## The intended solution

Rooms are numbered in travel order (top gallery, lift, then lower gallery in reverse direction). The plates and their wires are the controls, not decoration. Keep one player on their plate until the other's move is finished. The two lifts wait three seconds at their endpoints and can be caught on a later cycle.

1. water: room 1 → 2.
2. fire: room 1 → 2.
3. fire: room 2 → 3.
4. water: room 2 → 1.
5. fire: room 3 → 4.
6. fire: room 4 → 5.
7. water: room 1 → 2.
8. water: room 2 → 1.
9. fire: room 5 → 4.
10. fire: room 4 → 3.
11. fire: room 3 → 2.
12. water: room 1 → 2.
13. fire: room 2 → 1.
14. water: room 2 → 3.
15. water: room 3 → 4.
16. fire: room 1 → 2.
17. fire: room 2 → 3.
18. fire: room 3 → 2.
19. fire: room 2 → 1.
20. water: room 4 → 3.
21. fire: room 1 → 2.
22. fire: room 2 → 3.
23. water: room 3 → 2.
24. water: room 2 → 1.
25. fire: room 3 → 4.
26. fire: room 4 → 5.
27. water: room 1 → 2.
28. water: room 2 → 3.
29. fire: room 5 → 4.
30. water: room 3 → 4.
31. fire: room 4 → 5.
32. fire: room 5 → 6.
33. water: room 4 → 5.
34. water: room 5 → 6.

Finally enter the two exits.

## Why each player is needed

Each gallery has its own independent occupancy signals. Neither player can reach the other's gallery, and the latch gates require signals from both. Each player is therefore a movable key for the other, rather than merely a body to transport.

## The insight

A plate being pressed is not the same as a door remembering that it was pressed. The former disappears as soon as you leave, the latter persists. The two interacting mechanisms let you exchange a temporary position for permanent permission and then return to a previous room. A player's position is a scarce resource: they cannot hold two plates at once. The required backward moves are not evident from the geometry alone.

## Likely failures and how players recover

Walking straight strands the players behind a gate; refusing to return to a previous room prevents an earlier plate from being reactivated. A player can also step off a plate within their room to release an inverted gate. A missed lift is harmless. An abstract reachability check including both plate-on and plate-off states found 293 reachable states, all 293 with a path to completion. This is a room-level model, not an exhaustive continuous-physics proof.

## Shortcuts that were closed

The direct route and a forward-only route are tested in solution.mjs. Doors reach the ceiling. Separate rock-walled galleries prevent head boosts and partner doorstops. There is no cargo to substitute for a player. There are no timed doors or lethal gaps.

## Kinship with the campaign

Interlock and Four Corners use remote switch cooperation. Unlike Crossed Signals, which retains arbitrary lever bits, the inputs here are the actual positions of the players; latches retain only previously achieved joint occupancy. The backward travel solves this spatial memory puzzle.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 10.78 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 98.52 s; par: 247 s. All kit simulation checks passed without warnings.

