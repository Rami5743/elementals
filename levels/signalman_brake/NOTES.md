# Signalman Brake

Batch-90: 06/90

**Introduces:** A moving cargo contact becomes a stable permission only when the signalman applies a brake. Two independent acknowledgments determine when the same shuttle may be moved again.

## The intended solution

1. Fire starts the departure relay, opening Water's first passage and Earth's brake access.
2. Earth releases the brake and parks the shuttle over the far contact. The simultaneous brake and contact latch Fire's first passage.
3. Fire records its first acknowledgment, allowing Water to approach its relay and Earth to access the far-stage relay.
4. Water and Earth record both acknowledgments. Earth returns to the brake and releases the far position.
5. Earth parks the shuttle over the near contact. With both acknowledgments, the brake and contact latch Fire's second passage; Water's acknowledgment also latches Earth's next route.
6. Fire records its second relay. Earth travels to the second acknowledgment and then returns to the brake.
7. Earth releases the brake. Water crosses the inverted release gate and records its final relay; Earth crosses its own inverted gate.
8. Fire's final gate requires both final relays. Collect all gems and exit.

## Why each player is needed

Fire authorizes both stages; Water supplies the near-stage and final acknowledgments; Earth operates the brake and supplies the other two acknowledgments. All three idle-at-exit simulations fail. The cargo and sensors are sealed away from the players.

## The insight

The signalman must deliberately convert a transient moving contact to a persistent one before the team can claim it. The final permissions require abandoning that same parked state.

## Likely failures and how players recover

Each four-tile contact is at least 98 ticks wide even when requiring full overlap of a 30px stone at 1px/tick. Missing the target or stopping elsewhere is recoverable by releasing the brake and waiting for the next pass. A recovery script intentionally missed both contacts, stopped outside them, released the brake and then parked correctly; the simulation solved in 64.72 s. The two timed inputs are the two parks; traversal of gates after parking is untimed. All earlier permissions latch and there are no lethal tiles.

## Shortcuts that were closed

Running through the far contact without braking blocks Earth's first acknowledgment. Leaving the second park engaged blocks Earth's and Water's final routes. Both fail in simulation. Full-height doors and inaccessible heavy contacts prevent substitution.

## Kinship with the campaign

Reversing Signal exploits passing contacts during a moving window. Here the timing belongs to the brake operator, not a runner. Midline Brake is the two-player version. Cascade Triad uses separate hoists and electrical supply; Three-Stop Dispatch creates an extra position with an obstruction; neither requires timing the brake of a moving loop. Shared ingredient types do not make these the same puzzle.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 25.80 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 56.20 s; par: 141 s. All kit simulation checks passed without warnings.

