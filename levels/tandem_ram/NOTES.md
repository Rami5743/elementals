# Tandem Ram

**Introduces:** Two adjacent sideways doors act as a two-stage piston. The short piston must hand the stone to the long one before the long piston closes; closing the long one first blocks the handoff. The returning belt makes all three positions reusable.

## The intended solution

1. Fire retracts the short piston. Water retracts the long one, so the belt returns the stone all the way to the left contact.
2. The left contact latches Water's first gate. Water sets the first relay.
3. Fire closes the short piston while the long one is still open. It pushes the stone onto the middle contact; the contact and Water's relay latch Fire's first gate.
4. Fire sets its first relay. Water returns to close the long piston, pushing the stone from the middle onto the right contact. Water's second gate latches and Water sets the second relay.
5. Both return to retract their pistons. The belt brings the stone back to the left. Fire's second gate now latches.
6. Fire sets the second relay, returns and closes only the short piston. The middle contact and relay latch Water's last gate.
7. Water passes and sets the last relay, then goes back to close the long piston. The right contact now latches Fire's last gate.
8. Both pass the recorded permissions, collect their gems and reach their exits.

## Why each player is needed

Fire controls the short piston and its two relays. Water controls the long piston and three relays. The two pistons act on a single shared stone in a sealed room; neither player can reach the other's control or substitute for the heavy stone.

## The insight

The long piston cannot capture a stone sitting behind its origin. The same configuration of closed pistons is therefore not enough; the sequence of actuations matters. To obtain the right-hand contact from the left, one must first close the short piston with the long one retracted. To get back left, retract both. The belt reverses progress instead of being an obstacle to defeat.

## Likely failures and how players recover

Closing the long piston too early jams the stone before the handoff point. Reopen it and allow the short piston to finish extending. The recovery replay deliberately creates this jam, reopens the long piston, and then finishes without a death. Retaining one closed piston prevents return to the left; retract both. Every completed gate latches; all controls remain reachable, and there are no timed crossings, jumps or lethal terrain.

## Shortcuts that were closed

The direct route fails at a closed gate. The premature-long-piston script fails waiting for the stone to reach the middle contact. Rock isolates the machinery and separates the galleries. The vertical passage doors reach the ceiling, so head-stacks and jump shortcuts cannot replace the controls.

## Kinship with the campaign

Battering Ram uses a single door as a cargo mover, while Sorting Yard separates loads. Tandem Ram uses two adjacent pistons as a sequential mechanical handoff and a belt as the return mechanism. This is distinct from cargo-clock-contact: no transient pulse is required, and the key is the order of physical handoff.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 29.01 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 51.67 s; par: 130 s. All kit simulation checks passed without warnings.

