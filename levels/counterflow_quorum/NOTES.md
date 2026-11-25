# Counterflow Quorum

Batch-90: 14/90

**Introduces:** Two upstream couriers jointly control directional filters that Earth cannot oppose. One withdraws its permission to exchange which of Earth's two passages is traversable.

## The intended solution

1. Fire and Water each walk against an upstream belt to reach their independent controls.
2. When both approve, Earth's first belt points left and the cargo travels left. Earth crosses and records its first relay.
3. Fire and Water obtain separate left-stage acknowledgments. Together with the cargo contact these open Earth's route to the central island.
4. Earth reaches the island. Water returns to withdraw its approval; Fire's approval stays on.
5. The currents reverse. Earth crosses the second belt and the cargo arrives at the right contact. Earth records its next relay.
6. Fire and Water obtain the two right-stage acknowledgments, permitting Earth to cross its final gate.
7. Water returns to restore the missing quorum input. The cargo travels left again.
8. The final left contact and acknowledgments open Fire's and Water's exits. All three gems are collected.

## Why each player is needed

Fire and Water can both oppose the 2.9 px/tick current and provide independent permissions. Earth cannot oppose it and must travel in two successive current states, providing the indispensable relays. Each idle-at-exit simulation fails.

## The insight

The direction of the current is a physical filter, not merely a transport convenience. A quorum state changes both the cargo destination and the two mutually complementary walking routes. Retaining Fire's approval is compatible with undoing the motion by withdrawing Water's.

## Likely failures and how players recover

Trying to cross either opposing belt as Earth fails. Restore the appropriate current; the island between belts is safe and controllers stay reachable. The recovery simulation deliberately undid the first leftward delivery, let the token return right, then restored the leftward delivery; it finished in 70.62 s. No precise timing or jumping is necessary, and there are no lethal tiles.

## Shortcuts that were closed

Earth cannot walk against the first initial current or against the second current while the first reversal remains engaged. Both attempts fail specifically at the relevant belt. Low ceilings prevent jumping; barriers reach their ceilings. The cargo track is inaccessible.

## Kinship with the campaign

Upstream is a hopping puzzle, whereas here the low roof makes the speed filter unavoidable. Counterflow Exchange has one controller; this version separates the current quorum across two couriers. Junction Dispatch changes the destination of one isolated token through independent currents on a shared track; here the currents also determine which human walking passages physically exist for Earth.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 29.43 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 54.92 s; par: 138 s. All kit simulation checks passed without warnings.

