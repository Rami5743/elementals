# Draught Relay

Batch-90: 81/90

**Introduces:** A vertical draught has a middle-floor exit that must be selected while rising, not at the roof; its second launch is unlocked by a cargo arriving at a dock, and the cargo must be recalled to release the final return route.

## The intended solution
1. Fire opens Water's eastern workroom. Water sends the stone to the far dock, simultaneously releasing Earth's first gate.
2. Earth earns the eastern certificate, allowing Fire to reach the first launch button.
3. Fire launches the draught. Air climbs and steers out into the middle gallery, before overshooting to the roof, and records its certificate during the timed opening.
4. This unlocks Fire's eastern certificate. Fire collects it and returns.
5. The first two certificates plus the stone's far contact allow Water to reach the second launch button.
6. Water pulses the draught again, reopening the middle gallery's door and unlocking the roof gate. Air leaves the middle bank, ascends, and records the roof certificate.
7. The roof certificate is not sufficient for Earth's return: Water must travel back to the east and revoke the first cargo dispatch. The same stone that authorized the second launch must now move home.
8. The home contact and roof certificate open Earth's western return gate. Earth operates the final relay, unlocking all remaining exits. Air waits for the draught to cease, descends and exits.

## Why each player is needed
Fire controls the first pulse and the middle-floor receipt, Water controls cargo and second pulse, Earth controls the initial and final relay, Air alone reaches the separated middle and roof galleries on the weak fan. The four co-op idle checks fail.

## The insight
There are two destinations on the same vertical road. Steering at the intermediate opening is the price of the first certificate. The cargo's far and home contacts are mutually exclusive permissions: after the second launch the first dispatch must be reversed.

## Likely failures and how players recover
Going directly to the roof cannot earn its certificate; the gate is locked until the middle certificate and the far cargo contact authorize Water. Let the first pulse expire, drop to the bottom, and ask Fire to relaunch. Missing the second pulse while behind the middle gate costs only a retry from Water. The controls remain accessible, the cargo route is reversible, and there are no hazards or irreversible losses. Simulated full-pulse misses on both launches separately and 90-tick late departures on each launch separately all completed. The two ledges before the gates are at least three tiles wide.

## Shortcuts that were closed
Going straight to the roof is blocked by its locked gate; omitting the second launch leaves Air in the middle gallery; leaving the stone at the far dock prevents Earth from returning. Full-height doors and solid gallery walls prevent substitution. Each attempt was scripted and checked. Four separate idle tests fail.

## Kinship with the campaign
Lofts is about different responses to one fan; Draught Dispatcher at three players uses overlapping fans. This level uses one fan as a road with two destinations, timed intermediate steering, and a separate round-trip docking permission. The climb-then-steer idea has not previously appeared at four players. The combination with a cargo returning home is not a duplicate of any four-player core.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 94.50 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 42.77 s; par: 107 s. All kit simulation checks passed without warnings.
Recovery: first missed pulse 48.35 s; second missed pulse 51.78 s. 90-tick late departures: 42.77 s and 43.88 s.
