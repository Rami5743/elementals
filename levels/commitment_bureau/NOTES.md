# Commitment Bureau

Batch-90: 64/90

## Core idea
An authorization is also a veto: Water's W2 lever permits Earth to leave the first floor, but prohibits the second descent. The runner cannot jump back up through either one-way grating from four tiles below, so an earlier certificate must be recorded before committing. After the first descent the controller must withdraw W2, changing the accessible portion of both galleries.

## Intended solution
1. Water sets W1, granting Earth's first east passage.
2. Earth records E1 at the far east end and returns towards the western grating.
3. Water withdraws W1, crosses the formerly closed inverse gate and sets W2. This opens Earth's western descent approach, but blocks the second descent.
4. Earth drops through the first grating, then records E2.
5. Water withdraws W2, passes its inverse gate and uses the E2 permission to reach W3. Earth can now approach the second drop only when W3 grants access to E3.
6. Earth records E3, crosses the now-open W2 veto, and drops through the second grating. Earth records E4 at the far west of the bottom floor.
7. Water withdraws W3, returns west through the route authorized by E4, and operates W4.
8. Earth reaches the final eastern certificate E5, which releases Water's final exit; both collect their gems and finish.

## Necessity and recovery
The runner's separated gallery requires Earth to pass through both one-way floors; Water supplies the alternating permissions in its isolated corridor. Both idle-at-exit tests fail. Retaining W2 or refusing the second commitment fails in the simulated shortcuts. Withdrawing W2 prematurely closes the first permit, but Water remains beside the lever and can restore it; this recovery replay was explicitly tested and completed. Both drops land on safe floors and their approach gates enforce prior certificate collection. There is no timed action, no precision jump, and no lethal terrain. The permanent commitments cannot strand the runner without an earlier required certificate because the corresponding approach is gated.

## Novelty
One-way-drop has not appeared at this player count. Unlike destructible cracked hatches, the ledges remain intact and Earth cannot return. Unlike Double Veto at four players, one operator uses the same permit first as an authorization and then as a veto, forcing a withdrawal between commitments.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 26.36 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 53.38 s; par: 134 s. All kit simulation checks passed without warnings.
Recovery replay for early W2 withdrawal and restoration passed.
