# Two Deposits

Batch-90: 37/90

## Introduces
Two one-way cargo deposits with a shared grating must be spent in sequence. A lower certificate and an elevated certificate are different claims on the same load; only lowering the hoist leaves the deposit available.

## Intended solution
1. Fire and Water collect the certificates requiring both bottom loads.
2. Water unlocks the first control; Fire raises A.
3. Water collects W2 using A's high contact.
4. Fire lowers A and crosses the inverse gate.
5. Fire records F2 while A is deposited but B is still at the lower contact.
6. Fire returns to the far west workshop and records Freturn; only then can Water reach B's control.
7. Water raises B; Fire collects F3 using the high contact.
8. Water lowers B, returns to the far east workshop and records Wreturn.
9. Water crosses the inverse gate and records W3.
10. The two stored deposits and both final certificates unlock the exits.

## Roles and insight
Fire and Water each own one hoist and must earn the other operator's permissions. Both rocks are committed upward, never returning to their bottom contacts once deposited. The interlock protects every lower claim before permitting the corresponding irreversible transfer.

## Failures and recovery
Leaving either hoist raised blocks its inverse/return route; return to its selector and lower it. The second load cannot be spent before Fire's mixed lower/deposited certificate. The recovery script interrupts the first ascent at the intermediate contact, lowers the hoist, then raises it fully and completes (44.72 s). The grating prevents a deposited load from dropping back; the lift can still pick it up again for a high certificate.

## Shortcut tests
Direct walk and leaving either hoist raised were tested and fail. Both idle-player necessity tests pass.

## Kinship
Dumbwaiter is a one-way transfer at three players. Grate Register is a reversible memory using a press to erase the deposit. This level has no eraser: two lower resources must be committed in order and certificates are needed at low, high and deposited heights. No previous two-player level uses hoist-one-way-for-cargo or lift-sheds-its-load.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 49.67 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 41.75 s; par: 105 s. All kit simulation checks passed without warnings.
Interrupted first ascent and successful retry verified.
