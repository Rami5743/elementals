# Double Veto

Batch-90: 61/90

## Core idea
Two one-way drops are irreversible commitments for the runner; each inspector controls an independent seal. The first approach needs both seals, while the second has two separate inverse gates that require both to be withdrawn. Water supplies the route permissions and cannot finish without the three other certificates.

## Intended solution
1. Water sets the initial east permission; Earth records the upper east certificate and returns west.
2. Fire and Air enter their respective inspection stations and set both seals. Water withdraws the first permission and grants the west approach.
3. Earth drops through the one-way floor, four tiles to the middle gallery. The upper certificate cannot be retrieved after this drop.
4. Earth records the middle left certificate. Water withdraws the west route, and both inspectors independently withdraw their seals, opening their own forward workshops and the two inverse gates on the second descent approach.
5. The two inspectors record forward certificates. With Earth's middle certificate, these permit Water to enter its third station.
6. Water grants the middle east route. Earth records the east certificate, walks through both veto gates, and commits to the second one-way drop.
7. Earth records the bottom west certificate. Fire and Air return to their own western inspection stations and set both certificates. Water withdraws the last route permission and can reach its west control only with all three certificates.
8. Water grants Earth's bottom east route. Earth returns east and authorizes all controller exits; everyone collects their gems and exits.

## Recovery and necessity
Neither drop is accessible before the certificates that would otherwise be left above it. Four-tile spacing is beyond Earth's jump and there are no ledges or other players in the runner's gallery. Inspectors can restore a prematurely withdrawn seal from the same control; both erroneous early withdrawals were separately simulated. All floors are safe. The kit verifies all four players necessary and all gems collected. Leaving either inspector's seal set, or refusing the second drop, fails.

## Novelty
One-way-drop and twist-sacrifice have not been used by a four-player level in this repository. Drill uses Earth's ability to destroy floors; here intact one-way ledges can be crossed downward without destruction but cannot be revisited. The two independent vetoes must be both present before committing and both absent before the next commitment. Sealed Descent (3 players) uses destructible hatches and one inspector, whereas Double Veto makes the commitment positional and splits the approval/withdrawal across two separate inspectors.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 27.59 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 56.08 s; par: 141 s. All kit simulation checks passed without warnings.
Separate early-withdrawal recoveries for Fire and Air succeeded.
