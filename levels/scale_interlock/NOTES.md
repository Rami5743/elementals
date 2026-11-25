# Scale Interlock

Batch-90: 31/90

**Introduces:** Two independently selected hoists share a master enable. The two cargo loads and their seesaw create four distinct contact patterns; a third operator must certify the both-raised pattern and use the master to restore the loaded center.

## The intended solution
1. Earth enables the hoists. Fire selects A, raising the left stone off the scale and lowering the right one.
2. All three pass their first contact gates and register separate acknowledgments.
3. Water selects B while A remains selected. Both stones are now fully raised, the seesaw is empty and centered, and Earth can register the both-raised certificate.
4. Fire withdraws A. The left stone lowers while the right is held high, giving the opposite imbalance. Fire and Water register their second permissions; Earth registers the opposite-state certificate.
5. Earth withdraws the master enable, lowering both stones and centering the loaded seesaw. Water withdraws B.
6. The centered contacts and three intermediate permissions allow Fire and Water to register the third certificates. Water's passage also explicitly requires the master to remain off.
7. Earth re-enables the master while Fire re-selects A. Fire passes the far gate and registers its certificate.
8. Earth withdraws the master again. Fire finishes; Earth crosses the inverse and centered-contact gates to register its own far certificate.
9. Water can now pass the final gate using the centered contacts and both far certificates.

## Why each player is needed
Each hoist requires both its individual selector and Earth's master enable. Earth alone can reach the two-load certificate and must restore the center twice. Fire and Water each have their own phase permissions. All three idle-at-exit tests fail.

## The insight
The centered plank alone is not a sufficient description of the machine: it can be empty or loaded. The hoists give four contact patterns, and the master switch can restore a loaded equilibrium regardless of the individual selections.

## Likely failures and how players recover
Lowering A before both stones are raised blocks Earth's certificate; restore A. Retaining the master prevents Water from reaching its intermediate certificate. A recovery simulation withdraws the master prematurely after the both-raised certificate, waits for the loaded center, restores it and completes in 59.18 seconds. Intermediate gates latch, the three original controls remain reachable, and there is no timed input or required jump. Arbitrary states were not exhaustively tested.

## Shortcuts that were closed
Direct walking, deliberately withdrawing A before B is selected, and retaining the master throughout fail in simulation. The cargo is isolated and all doors reach the ceilings.

## Kinship with the campaign
Counterpoise uses a seesaw to lift a rider; here it is a four-state comparator. Empty Balance (two players) uses the two imbalances and loaded center; Scale Interlock additionally requires the empty-centered state and an independent master enable. The three-player Ratio Tribunal instead alters mechanical advantage of fixed loads on a pulley, not the actual loads on a seesaw.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 46.33 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 54.87 s; par: 138 s. All kit simulation checks passed without warnings.
Premature master withdrawal recovery simulation passed.
