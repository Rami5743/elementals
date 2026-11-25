# Bridge Assembly

Batch-90: 23/90

**Introduces:** A bridge with two incompatible deck positions rises only by joint consent; each operator must rescind their own consent to reach the next acknowledgment.

## The intended solution
1. Fire crosses the lower bridge and enables Water's control gallery.
2. Fire boards. Water and Earth independently approve the ascent.
3. Fire reaches the upper east lever, authorizing the lower west room.
4. Earth withdraws its approval, taking away the upper crossing and opening its own inverse door.
5. Fire descends, crosses west and enables Earth's acknowledgment.
6. Earth crosses the inverse door and acknowledges, authorizing the upper west berth.
7. Earth returns to approve the second ascent; Water's vote is still on.
8. Fire takes the upper west permission and gem, then boards for descent.
9. Both operators withdraw their approvals. Water reaches its final certificate behind its inverse door; Earth can reach its exit. Fire uses the restored lower crossing to reach its exit.

## Why each player is needed
Fire travels between decks. Water and Earth occupy isolated control galleries; their independent votes are both necessary, and withdrawing each vote also opens a different route. The simulation fails with each player idle at its exit.

## The insight
A vote for the upper bridge is a vote against the operator's own passage. The two approvals are not just a quorum: one has to be temporarily relinquished in the middle and both at the end.

## Likely failures and how players recover
If the bridge rises without Fire, withdraw a vote and wait for its return. A full premature raise/lower cycle followed by the intended solution was simulated successfully in 51.07 s. Keeping the Earth or Water approval on prevents the corresponding acknowledgment; return and switch it off. A lower-bank checkpoint protects the pit; recovery from arbitrary death states was not exhaustively tested. No precision jumps or timed doors.

## Shortcuts that were closed
Walking directly, retaining Earth approval and retaining Water approval each fail at the relevant closed door. Solid gallery separators prevent substituting an operator; all doors reach their roofs.

## Kinship with the campaign
Gondola uses shared votes for transport; Gangway uses a lift as a floor. Neither uses the loss of the crossing on two alternating decks together with inverse permissions for separate voters. This reuses the two-deck geometry of the two-player Double Deck (allowed across player counts), but makes independent withdrawal of votes part of the puzzle. Novelty is a fresh combination at three players, not a newly invented physical behavior. A separate three-way seesaw was considered, but the additional balancing states would need a separate mechanical probe.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 60.90 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 41.65 s; par: 105 s. All kit simulation checks passed without warnings.

