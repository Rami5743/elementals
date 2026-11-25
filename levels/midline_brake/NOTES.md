# Midline Brake

Batch-90: 03/90

**Introduces:** The cargo shuttle's transit contacts must be converted to stable permissions by braking the loop at two intermediate stations. The same brake must finally be released to open the operator's exit.

## The intended solution

1. Fire sets the departure relay to give Water access to the brake, initially engaged.
2. Water releases the brake. The isolated shuttle moves toward the far end carrying the stone.
3. Brake while the stone overlaps the far contact. The contact and brake together latch Fire's first gate; a moving stone cannot do this.
4. Fire crosses, sets its acknowledgment, and waits at the second gate. Water crosses its newly opened passage, sets the middle acknowledgment and returns to the brake.
5. Water releases the brake and lets the shuttle continue to the far endpoint and return toward the near contact.
6. Brake while the stone overlaps the near contact. This requires the middle acknowledgment too. Fire crosses its second gate and sets the final relay.
7. Water must give up the second parked state: release the brake. The complementary gate now opens, allowing Water to reach its final relay.
8. Water releases Fire's final gate; both collect their gems and exit.

## Why both players are needed

Fire sets the departure and two progression relays; Water controls the shuttle and both return acknowledgments. The cargo gallery is entirely sealed from both players. Only the stone can activate the heavy contacts, and neither player can substitute for the other. Both idle-at-exit checks fail.

## The insight

The important event is not the stone passing the contact but the operator deliberately stopping it there. Running the shuttle and claiming a contact permission are mutually exclusive states. The far permission enables the acknowledgment needed for the near permission, and the final exit requires relinquishing the near position.

## Motor requirement and recovery

The two intermediate contacts are four tiles wide. At 1 px/tick, the conservative full-overlap interval of a 30-pixel stone is 98 ticks, exceeding the 90-tick motor requirement. Actual overlap starts earlier and ends later. No timed traversal is required once parked. Missing either contact or braking outside it is recoverable by releasing the brake and trying again on the next pass. A separate replay intentionally missed both target zones, braked outside them, restarted and then parked correctly; it finished without deaths in 58.95 seconds. The cargo cannot be moved by players, and every progression permission latches. No lethal terrain.

## Shortcuts that were closed

The simulated attempt to let both contacts flash by without braking fails to obtain the first permission. Keeping the shuttle braked after the second permission blocks Water's complementary gate. All doors span their ceilings and the cargo track is inaccessible.

## Kinship with earlier levels

Reversing Signal requires the runner to exploit a short-lived passing contact. Midline Brake instead requires the operator to turn a transit signal into a stable parked state. Intermediate Stop obtains a third stop via a physical obstruction; here a freely running horizontal loop has no intermediate mechanical stop, so the operator must brake in the appropriate zone.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 50.61 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 49.43 s; par: 124 s. All kit simulation checks passed without warnings.

