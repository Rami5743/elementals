# Return Stroke

Batch-90: 57/90

**Introduces:** A single cargo contact means two different things on a powered outward stroke and an unpowered return stroke. The first stroke grants Water's passage; the second requires the far certificate and grants Fire's passage.

## Intended solution
1. Fire launches the powered shuttle from its home position.
2. At the middle contact, Water crosses the timed outward gate while the power pulse is still active.
3. Water records the first holding input, then waits for the far contact to release the far workshop.
4. Water records the delivery certificate there, securing the outward passage and granting Fire's intermediate access.
5. The power pulse must expire. The inverse door opens, permitting Fire to approach the return-stroke gate.
6. The same cargo contact returns past the middle; Fire crosses during this second live window and records the Fire certificate.
7. The cargo returns home, completing Water's west access permission.
8. Water returns west through the secured gate, collects its gem and issues Fire's final permission.
9. Both exit.

## Why each player is needed
Fire controls the powered stroke and the return certificate; Water alone can pass the outward gate and record the delivery certificate. The cargo gallery is inaccessible to both.

## Insight
The same sensor cannot tell direction by itself. Its first permission requires the live clock, and its second permission needs a certificate that can only be recorded after delivery. Fire must relinquish power to get to the return gate. Thus two passages require opposite strokes of one machine.

## Motor challenge and recovery
Only two precision moments: crossing the outbound and inbound middle-contact gates. The four-tile contact and 0.8-pixel/tick shuttle speed provide over 150 ticks of overlap, and both crossings were simulated with an additional 90-tick delay. Missing either crossing is recoverable by waiting for home and starting a new cycle; both mistakes were simulated. Once Water records both certificates, the outward gate stays open for the return journey. All floors are safe.

## Shortcuts
No clock, omitting the far certificate, and Fire trying to advance on the outward stroke all fail in simulation. Full-height gates and solid galleries block bypasses. Fire's inverse gate is nine tiles from the launch control and cannot be traversed before it closes.

## Kinship and novelty review
The ingredient-overlap review names Cargo Turnstile (0.92 raw). In that level Earth physically pushes a stone through two sequential airlocks and the timer's expiry opens each cargo outlet. Here neither player can push or reach the cargo, there are no cargo airlocks, the cargo moves automatically, and the very same physical transit sensor is interpreted twice in opposite directions. Reversing Signal uses different endpoint contacts to arm two relay chains, then uses the middle contact only once as the final clock pulse. Here the outward passage itself depends on that same middle sensor before delivery and the second player must use it on the return, after delivery. The novel idea is specifically the direction-qualified interpretation of a single sensor, not moving cargo as a clock in general. The ingredient-overlap warning is therefore accepted after reviewing both levels, as allowed by the skill.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 6.37 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 49.42 s; par: 124 s. All kit simulation checks passed without warnings.
Both 90-tick delayed crossings and both missed-stroke recovery routes were simulated. The ingredient-overlap advisory was reviewed in the notes.
