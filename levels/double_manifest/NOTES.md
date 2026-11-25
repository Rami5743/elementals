# Double Manifest

Batch-90: 27/90

**Introduces:** Two successive cargo locks share one clock, but the second delivery requires two separate manifests that both have to be revoked to register delivery.

## The intended solution
1. Fire and Air jointly authorize Water's access to the clock.
2. Water starts the first pulse. Fire and Earth enter the first chamber with the stone before it expires.
3. When the clock expires, the outlets open. Fire reaches the middle relay and authorizes the two isolated selector galleries.
4. Earth pushes the stone to the middle berth. Water and Air arm their selectors; Water returns to the clock.
5. Water starts the second pulse. Fire and Earth enter the second chamber with the stone.
6. The pulse expires, opening the outlet. Fire clears the final delivery area and Earth parks the stone on the contact.
7. Water and Air revoke their selectors, allowing access to the two separate final certificates.
8. The stone and both certificates jointly open the final cargo door. Fire and Earth reach their exits and the controllers return to theirs.

## Why each player is needed
Fire precedes the stone and operates the middle relay. Earth moves the stone and must leave it on the final contact. Water controls both timed shipments and one selector. Air supplies the start authorization and the other selector and certificate. Each idle-at-exit test fails.

## The insight
The clock opens both entrances but closes both outlets. Two shipments must occur in separate pulses, with a dual authorization earned and then relinquished. A live cargo contact replaces a player's presence.

## Motor challenge and recovery
Both windows last 420 ticks. A delayed-entry simulation with 90 additional ticks at each entrance succeeded in 40.70 seconds. Deliberately missing and restarting both pulses succeeded in 56.10 seconds. The clock remains reachable, and the cargo can be moved again if stopped short. The jump over the parked stone has no timed input. Arbitrary cargo placements have not been exhaustively tested.

## Shortcuts that were closed
Walking directly, using one pulse, retaining either selector, and using Earth instead of the stone as the permanent contact all fail at the corresponding gates. Solid rock separates the controllers from the cargo lane; the doors fill the passage height.

## Kinship with the campaign
The timed gates in Clockwork are used simultaneously. Here successive pulses stock two different airlocks, and the intermediate permission requires a two-party grant and revocation. The three-player Lock Train uses only one selector. No previous four-player level has used stock-before-it-seals.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 27.43 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 40.70 s; par: 102 s. All kit simulation checks passed without warnings.
Both delayed-entry and missed-pulse recovery simulations passed.
