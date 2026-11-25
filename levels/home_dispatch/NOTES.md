# Home Dispatch

Batch-90: 43/90

**Introduces:** Fire's own exit selects a remote cargo belt. Two inspectors must certify opposite cargo states in a forced order.

## The intended solution
1. Earth inspects the right contact and gives Fire the first key, jointly with Water.
2. Fire and Water exchange permissions. Air uses Water's permission to authorize Fire's route home.
3. Fire stands at the exit: the stone travels left.
4. Earth and Water inspect the left contact and jointly authorize Fire's return west.
5. Fire leaves home; the belt reverses and the stone returns right.
6. Fire collects the missing gem and certificate. Air inspects the right contact, enabling Water's next relay jointly with Fire.
7. Water records the final dispatch authorization.
8. Fire returns home, reversing the belt to the left again.
9. Earth certifies the last delivery, releasing Water and Air. All four finish.

## Why each player is needed
Fire alone can occupy its threshold. Earth inspects all three stages; Air grants the first home authorization and the intermediate right-contact certificate. Water connects the stages and authorizes the last delivery.

## The insight
The nominal goal is a reversible control. Remaining home prevents the right-state inspectors from acting, while staying away prevents the final left delivery.

## Likely failures and how players recover
Remaining at the first home arrival blocks Fire's missing gem and Air's inspection; leave after the left certificates. Remaining away after the right certificate blocks the final left relay; return home. A premature departure and re-entry were simulated successfully. The stone is captive between walls and can be sent back indefinitely. Intermediate gates latch; no precise timing or jumps are required.

## Shortcuts that were closed
Direct walk, staying home after first arrival, and never returning after the west certificate were tested and fail. Cargo and galleries are isolated by rock; doors reach the ceiling.

## Kinship with the campaign
Threshold uses an exit as fan power; Home Current uses a reversible belt at two players. Here three other operators certify alternating states, including separate initial authorization by Air. Neither threshold-is-a-switch nor two-stops-no-middle appears previously at four players.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 16.59 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 56.10 s; par: 141 s. All kit simulation checks passed without warnings.
Premature departure and re-entry recovery verified in the original engine.
