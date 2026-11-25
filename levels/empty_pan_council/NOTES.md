# Empty Pan Council

Batch-90: 34/90

## Introduces
The difference between an unloaded centered seesaw and two loaded centered pans is a four-party permission problem. Each hoist needs its selector and both inspectors' enables.

## Intended solution
1. Earth and Air enable the hoists while Fire selects A.
2. The left stone rises and the right pan falls, admitting all four to the first workshops.
3. Fire and Water record their first certificates; Water selects B, lifting both stones.
4. Air records A2 using the two high contacts, permitting Earth's E2 certificate.
5. Fire lowers A, so the right high and left low contacts release the next workshops.
6. Fire, Water and Earth collect intermediate certificates.
7. Both inspectors revoke their enables. Air crosses its inverted gate and records A3 at loaded equilibrium; Water resets B and collects W3.
8. Air and Earth re-enable, and Fire selects A to record the far certificate.
9. Both inspectors disable again; Earth's and Air's final certificates are issued only at loaded center.
10. Water receives the last permissions and reaches the exit.

## Roles and insight
Fire and Water select the individual hoists. Earth and Air have independent enable duties and different certificate locations; neither can replace the other. A visually horizontal beam is not enough information to solve the contacts.

## Failures and recovery
Skipping the both-raised state blocks the next certificates; keeping either enable on prevents its inspector from crossing the inverse gate. The selectors and enables remain accessible. Recovery test: Air withdraws its enable prematurely after A2, waits 240 ticks, restores it, and then follows the remaining solution (59.52 s).

## Shortcut tests
Direct walk, skip both-raised, keep Earth enable, and keep Air enable fail. Four idle-player necessity tests pass.

## Kinship
Scale Interlock uses this comparator at three players; the additional inspector here requires a second independent enable and distinct final permission. Makeweight compares mass rules on a beam and a plate, not the contact pattern obtained by lifting loads clear of the beam. No earlier four-player level uses hoist-unloads-comparator.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 74.33 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 56.97 s; par: 143 s. All kit simulation checks passed without warnings.
Premature Air disable and restoration verified.
