# Brake Council

Batch-90: 09/90

**Introduces:** A transient heavy contact is converted into stable permission by stopping a loop shuttle. Four operators certify two different parked states before relinquishing the final state.

## The intended solution

1. Fire authorizes access to the brake and the initial galleries.
2. Earth releases the brake. The shuttle travels toward the far sensor. Earth parks it over that sensor, latching Fire's first gate.
3. Fire records the far-stage relay, granting both Earth and Air access to separate acknowledgment stations and Water access to its acknowledgment.
4. Earth and Air certify the far position; Water records its relay. Earth returns to the brake and releases the far state.
5. Earth parks the shuttle at the near contact on its return. The five-input permission includes the brake, near contact and all three independent acknowledgments. Fire advances.
6. Earth and Air record the near-state acknowledgments. Fire enables Water's final route.
7. Earth returns to release the brake. All three complementary release gates now open. Water crosses and records its last relay.
8. Fire's final gate requires all three partners' final relays. Collect all four gems and exit.

## Why each player is needed

Earth controls the shuttle brake and two relays. Air independently certifies both stages. Water provides the additional near-stage and final permissions. Fire authorizes progression. All four idle-at-exit checks fail.

## The insight

A contact's presence is insufficient while the machine is moving. The operator must convert the fleeting position to a stable one, and the team must ultimately give it up to finish.

## Likely failures and how players recover

The two four-tile contact zones each allow at least 98 ticks for full overlap of the 30px cargo at 1px/tick. Missing either contact is recoverable by releasing the brake and waiting for the next pass. A recovery simulation missed both contacts, braked outside them, restarted and parked correctly, completing in 64.05 s. Only the two parks require timing; traversal after parking does not. All previous permissions latch, all controls remain accessible, and no lethal terrain exists.

## Shortcuts that were closed

Letting the contact flash without braking and retaining the brake after the second park both fail in simulation. Doors reach the gallery ceilings. The heavy sensors and cargo are inaccessible to players.

## Kinship with the campaign

Reversing Signal relies on running during a moving contact; Brake Council instead stops the machine. Signalman Brake is the three-player version. The fourth operator provides an independent certification of each parked state. Cascade Quorum and Ceiling Committee use static mechanical positions rather than timed parking, despite some shared parts.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 30.98 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 55.53 s; par: 139 s. All kit simulation checks passed without warnings.

