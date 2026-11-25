# Phase Dispatch

Batch-90: 63/90

## Core idea
One middle contact qualifies opposite directional inspections. A fourth operator must explicitly trade the initial launch authorization for the return authorization; this is not merely an extra vote on the final gate. The outbound inspection unlocks the second phase, and the launch lever physically blocks access to the return permit while it remains set.

## Solution
1. Water and Air grant the two launch permissions.
2. Earth enters the dispatcher station and starts the timed shuttle.
3. Fire crosses the powered middle gate on the outward contact pulse.
4. Fire secures the outward route and records the far delivery certificate.
5. Air withdraws the original launch permission, crosses its released inverse gate and the recorded delivery gate, and issues the return permit.
6. Water enters the return gallery; the inverse gate permits access only when the clock expires. Water crosses the same middle contact on the return and records the receipt.
7. Earth can leave the dispatcher station only when the cargo is back home and both inspection certificates exist.
8. Earth records the final authorization; Fire returns west, Water finishes east, Air can leave its phase station, and Earth finishes east.

## Motor challenge and recovery
The two contact crossings are the only motor moments. Both have a four-tile contact swept at 0.8 px/tick; the replay with 90 ticks extra delay at each crossing succeeds. Separately missing each inspection and repeating the entire shuttle cycle also succeeds. The initial launch gate latches, so the dispatcher remains available after Air withdraws its permission. Air's phase change remains available if the first opportunity is missed; no loss of progress occurs. All four galleries have safe floors.

## Novelty and advisory review
Direction-qualified-transit-contact is new at four players. Dispatch Clock uses several endpoint or mid-position signals as a cargo clock; this mechanism uses a single contact twice, with opposite qualifications. Stroke Inspector (three players) has a dedicated dispatcher and two inspectors. Here the fourth player owns the mutually exclusive launch and return authorizations and must revoke its earlier input after delivery before the return inspection can occur. The feature-overlap advisory names Double Manifest (0.92): that level has two timed cargo airlocks with a manually pushed stone, while here the cargo is inaccessible and rides an automatic shuttle. There are no airlock chambers, no loading moment and no two successive shipments. Brake Council converts transient contacts into stable permissions by parking a looping shuttle; here the moving contact must be crossed while it is transient, no brake exists, and the two crossings use the very same sensor. These differences are actual mechanics, not just a different tag or arrangement.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 27.43 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 55.25 s; par: 139 s. All kit simulation checks passed without warnings.
Both 90-tick delay tolerance and two independent missed-stroke recovery replays completed. Feature-overlap advisory reviewed against Double Manifest and Brake Council.
