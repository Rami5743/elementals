# Attendance

**Introduces:** A group cannot keep all location-dependent keys active; simultaneous occupancy records permanent permission, so the players must decide which earlier rooms to abandon and revisit.

## The intended solution

Rooms are numbered from each spawn to exit. Keep each player on the center plate during the other's movement.

1. water: room 1 → 2.
2. water: room 2 → 3.
3. water: room 3 → 4.
4. water: room 4 → 3.
5. fire: room 1 → 2.
6. fire: room 2 → 1.
7. water: room 3 → 4.
8. fire: room 1 → 2.
9. fire: room 2 → 3.
10. fire: room 3 → 4.
11. earth: room 1 → 2.
12. earth: room 2 → 3.
13. fire: room 4 → 3.
14. fire: room 3 → 2.
15. fire: room 2 → 1.
16. water: room 4 → 3.
17. fire: room 1 → 2.
18. fire: room 2 → 3.
19. water: room 3 → 2.
20. fire: room 3 → 4.
21. fire: room 4 → 3.
22. fire: room 3 → 2.
23. fire: room 2 → 1.
24. water: room 2 → 1.
25. fire: room 1 → 2.
26. fire: room 2 → 3.
27. fire: room 3 → 4.
28. earth: room 3 → 2.
29. earth: room 2 → 3.
30. fire: room 4 → 3.
31. fire: room 3 → 2.
32. fire: room 2 → 1.
33. water: room 1 → 2.
34. water: room 2 → 3.
35. water: room 3 → 4.
36. fire: room 1 → 2.
37. fire: room 2 → 3.
38. fire: room 3 → 4.
39. fire: room 4 → 5.
40. earth: room 3 → 4.
41. water: room 4 → 5.
42. earth: room 4 → 5.

Then enter the three exits.

## Why each player is needed

All three galleries supply remote occupancy signals, including multi-input latches. Earth cannot substitute for the other two, since rock separates the galleries. The solver fails when any player is idle at their exit.

## The insight

A live plate and a remembered coincidence of plates have different lifetimes. Moving a player spends a key. Rewind the occupants to record another coincidence before proceeding.

## Likely failures and how players recover

The forward-only plan and direct plan fail. Step off a plate to release an inverted gate or revisit its room. An abstract room-and-plate model found 3014 reachable states, all 3014 with a path to completion; it is not an exhaustive continuous-physics proof. No jumps, timers or lethal gaps are required.

## Shortcuts that were closed

Direct and forward-only scripts both fail. The galleries prevent substitution, head boosts and using a partner as a doorstop. Doors reach the ceiling.

## Kinship with the campaign

Interlock distributes persistent keys; here actual location is the volatile key and latches retain meetings. This extends Footprint Ledger to three interacting occupancy histories.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 47.55 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 63.73 s; par: 160 s. All kit simulation checks passed without warnings.

