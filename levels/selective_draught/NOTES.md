# Selective Draught

Batch-90: 46/90

**Introduces:** Two overlapping fans give a selective lift: Air alone rises with the weak fan, Fire also rises with the strong fan. Removing the stronger current releases Fire without releasing Air.

## Intended solution
1. Air ascends alone using the weak fan and unlocks Fire's first lower control.
2. Fire activates that control, granting Air access to the upper selector.
3. Air turns the stronger fan on. Fire ascends and collects the first upper certificate.
4. Air switches the stronger fan off, leaving the weak current. Fire descends and gains the lower certificate.
5. Air uses the lower certificate to access the second upper control, collecting the Air gem.
6. Air restores the stronger current. Fire ascends for the second upper certificate and gem.
7. Air switches the stronger current off again. Fire descends to the newly unlocked lower control.
8. Fire disables the weak current. Air can finally descend; both exit.

## Why each player is needed
Air alone can ascend initially, and controls the strong fan from above. Fire issues the lower and upper certificates and operates the last control that releases Air. Each has distinct gems and exits.

## The insight
The overlapping fans do not need to be turned off together. Fire's return requires reducing the available lift, rather than eliminating it. The final release requires removing the remaining weak current.

## Likely failures and how players recover
Leaving the strong fan on prevents Fire from descending; switch it off at the upper selector. Leaving the weak fan on prevents Air from descending; Fire can turn it off after earning both upper certificates. Both fans are reversible. A simulated interruption of the first ascent followed by restoration also completed the level. Both landings are broad; no precise timing is required.

## Shortcuts that were closed
Direct travel, keeping the strong fan running, and keeping the weak fan running all fail in simulation. The shaft is surrounded by solid rock, and the full-height gates prevent bypassing the certificate chain.

## Kinship with the campaign
Lofts uses different fan responses at four players. Here two independent currents overlap in one shaft, and their selective shutdown is used twice before the final release. Fan-band is new at two players.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 5.41 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 49.45 s; par: 124 s. All kit simulation checks passed without warnings.
Interrupted and restored first ascent verified in simulation.
