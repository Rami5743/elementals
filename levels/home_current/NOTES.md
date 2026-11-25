# Home Current

Batch-90: 28/90

**Introduces:** One player's own exit selects the direction of a remote cargo belt. The player must go home, leave home to earn a missing certificate, and return home to release the partner.

## The intended solution
1. Water grants the first permission while the stone rests at the right contact.
2. Fire registers the first relay, allowing Water to reach the reciprocal relay.
3. Water grants Fire access to the exit. Fire stands in the exit, reversing the belt.
4. The stone reaches the left contact, allowing Water to register the left certificate.
5. Fire leaves the exit; the belt reverses back, and the right contact plus Water's certificate open the western workshop.
6. Fire returns west, collects the missing gem and registers the right certificate.
7. Water passes the right-contact gate and registers the last permission.
8. Fire goes home again. The left contact and the last permission open Water's final gate. Both finish.

## Why each player is needed
Fire's threshold is the only selector and the western workshop contains a separate certificate. Water provides both initial and subsequent permissions from a separated gallery. Both idle-at-exit tests fail.

## The insight
Arriving at your exit is an intermediate action, not finishing. The very act of leaving the exit changes which cargo contact can grant the next permission.

## Likely failures and how players recover
Remaining home after the first delivery blocks the western workshop and Water's next gate; walk away to reverse the current. Staying in the west workshop leaves the final gate closed; return to the exit. A simulated premature departure reversed the cargo before its first left delivery; returning to the threshold restored the state and completed the level in 47.85 seconds. The end walls retain the stone, the intermediate gates latch, and there is no timed input or required jump.

## Shortcuts that were closed
Walking directly, staying at the first exit and never returning to the exit after the western certificate all fail in simulation. The cargo is isolated by rock, so the contact cannot be pressed directly by either player. All doors reach the ceiling.

## Kinship with the campaign and novelty review
Portcullis requires a body holding a remote gate. Here the body's own exit selects the direction of a moving stone, creating mutually exclusive stable contacts. The player must leave and return to its nominal goal. No earlier two-player level uses an exit as the selector or the two-stops-no-middle idea. The novelty tool flags a parts similarity of 0.92 to Confluence Switch. That level uses two independently reversible belts meeting at a seam and three contact states (left, center, right); Home Current uses one belt and two terminal contacts selected by an exit plate. Its essential problem is a departure from and return to a nominal goal, not steering cargo through a junction. The parts review is accepted for that concrete mechanical distinction.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 35.88 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 46.15 s; par: 116 s. All kit simulation checks passed without warnings.
Premature departure and return recovery simulation passed.
