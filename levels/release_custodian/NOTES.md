# Release Custodian

Batch-90: 71/90

**Introduces:** an irreversible transfer of a cargo key between two circuits, with an independent custodian who must approve the transfer and thereafter alone controls the new register.

## The intended solution
1. The upper stone opens Fire's approval station.
2. Fire records approval, opening Water's station.
3. Water approves and opens Air's isolated booth.
4. Air approves the release; the three approvals unlock Earth's access to the cracked slab.
5. Earth pounds the slab, permanently removing the upper contact and dropping the stone onto the lower reversible belt. Earth descends into the separate lower inspection chamber.
6. The lower stone travels west, letting Fire and Water record the western certificates.
7. Air reverses the belt. The eastern contact and both certificates open Earth's inspection door.
8. Earth certifies the delivery, enabling Water's final inspection in the east state.
9. Air reverses again, returning the stone west and releasing all four exits.

## Why each player is needed
Earth alone pounds the slab. Fire and Water give independent approvals and later western certificates. Air is isolated from them and supplies the third approval plus the two direction changes.

## The insight
The same stone changes its electrical meaning when its support is destroyed. A custodian outside both circuits controls the new register, but cannot release it before the earlier obligations are complete.

## Likely failures and how players recover
The slab is behind the three-approval gate. The belt has stable endpoints, and its direction lever is always reachable by Air. In the recovery replay Air selects the wrong direction before release, waits for the stone to reach east, reverses back, and completes all inspections. The slab's lower shaft has a stepped ledge back to the lower inspection room. No hazards or timed input.

## Shortcuts that were closed
Omitting the third approval and retaining the final eastern state both fail in actual scripted attempts. Four idle-at-exit tests verify that each participant is necessary.

## Kinship with the campaign
Fault Line makes a cracked floor into a passage, whereas this slab transfers the electrical key into a reversible register. Deposit Registry at four players uses sequential permanent hoist deposits, not a cracked support changing one key from stationary to reversible. Drop Register at three players uses the same physical transfer; here a distinct isolated custodian handles the third permission and exclusively controls the new register.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 21.07 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 59.47 s; par: 149 s. All kit simulation checks passed without warnings.
Recovery with initial wrong lower direction reached east and then solved.
