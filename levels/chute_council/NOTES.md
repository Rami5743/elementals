# Chute Council

Batch-90: 18/90

## Design
A four-person variation of the runaway-stone dive, with a separate authorization and certification stage. The same parked stone that supplies the heavy-pad signal also powers the fourth player's isolated lift. The bay gate additionally needs that player's certificate. The fourth role cannot be replaced by any of the three operators.

## Dependency chain
1. Earth shunts the stone onto the hoist.
2. Earth raises it to the chute and parks it behind the pen gate.
3. Air climbs to the turbine, keeping clear until Water reaches the catwalk.
4. Fire operates the remote release permit, which is required together with the turbine for both release gates.
5. Water climbs to the high catwalk and signals readiness.
6. Air activates the turbine; Water dives ahead of the rolling stone onto the ledge.
7. Water stops the stone on the heavy pad, keeping the pad energized after Water drops away.
8. The pad raises Fire's certificate lift to the isolated upper berth.
9. Fire operates the certificate lever, opening the bay gate together with the still-loaded pad.
10. All four reach their own exits after collecting their gems.

## Novelty
The dive-ahead-of-the-runaway idea has not previously been used at four players. The additional independent permit and post-capture certificate hoist make the existing three-player Headlong mechanism into a four-role interlock rather than merely adding a passenger. Unlike the existing Tripwire family, a moving stone must be intercepted by an operator on a separate route.

## Shortcuts and recovery
The recorded checks reject omission of the remote permit, substituting Earth's weight on the pad, strolling the catwalk with a 120-tick delay, using Air as the brake instead of Water, and prepositioning Water on the ledge before release. The real simulation also solves with a 90-tick delay before Water's dive (2511 ticks), showing a nontrivial timing window. A second successful recovery run cycles Fire's permit off and back on before release (2500 ticks). The original loading route remains available for reloading after an unsuccessful dive; a complete missed-dive/reload replay is not included.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 75.31 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 41.67 s; par: 105 s. All kit simulation checks passed without warnings.

