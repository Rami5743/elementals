# Parallel Flight

Batch-90: 30/90

**Introduces:** Two isolated pilots must overlap in the air to operate a shared pair of suspended contacts, then dismantle and reconstruct the reciprocal permission circuit before repeating the flight.

## The intended solution
1. Each player turns on A to open the other player's lower access.
2. Each reaches B, turning on the other draught and opening the other stair access.
3. Both climb their stairs and launch across their individual shafts together. The two suspended contacts jointly latch the first far-side gates.
4. Each operates the far relay, granting access to the other lower east workshop. Both fly back separately and descend the stairs.
5. Both revoke A, opening the complementary east access gates. Each collects the east certificate, which grants access to the other west workshop.
6. Both revoke B, stopping the draughts and opening the complementary west gates. Each registers the west certificate.
7. Both restore B, climb the stairs, and repeat the synchronized outward flight. The two contacts and two west certificates latch the final far-side gates.
8. Each collects the far gem and records the final certificate; both fly back and descend before revoking B again. Both certificates and the complementary gate give access to the home alcoves.

## Why each player is needed
The two draughts are controlled remotely, and the first and final flight gates require simultaneous occupancy of separate airborne contacts. Each also has separate east, west and home certificates. Both idle-at-exit checks fail.

## The insight
The central plates are not safe places to stand. They can only be reached during a slow fall across a wide gap. Neither pilot can supply the other contact, and the shared circuit has to be deliberately de-energized and rebuilt between the two flights.

## Motor challenge and recovery
There are two synchronized outward flights. The 16-tile contact bands and the nearly neutral draught provide enough overlap: a simulation delaying Water by 90 ticks on the first flight and Fire by 90 ticks on the second succeeded in 48.35 seconds. Delays of 240 ticks fail to open the corresponding gate. A recovery simulation intentionally misses both overlaps, checks that both gates remain shut, flies back and retries both successfully, completing in 67.02 seconds. Each landing bank is eleven tiles wide. The lower roof catches a fall, and the left stair gives access to the launch bank again. All ground is solid or one-way and nonlethal; no permanent state is consumed. Arbitrary movements were not exhaustively tested.

## Shortcuts that were closed
Separate launches on either of the two outward flights and retaining either of the earlier permissions fail in simulation. The two galleries are separated by rock; their doors fill their passages. From the lower roof a normal Fire or Water jump cannot reach the suspended plate; entering the airflow near the upper bank is required.

## Kinship with the campaign
Slow Fall uses a slow descent as a single gate window. This puzzle requires simultaneous flights in physically separate shafts, first to authorize a circuit reconfiguration and then to certify it. Flyover uses simultaneous flights to let a fourth player pass; here the two pilots are themselves the only beneficiaries and must earn and then dismantle the circuit between their flights. No previous two-player level has used two-in-the-air-at-once.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 135.32 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 45.37 s; par: 114 s. All kit simulation checks passed without warnings.
90-tick offset and two missed-flight recovery simulations passed.
