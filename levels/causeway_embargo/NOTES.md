# Causeway Embargo

Batch-90: 73/90

**Introduces:** a floating causeway is both the three-crossing physical floor and the persistent veto on the inspector's road. Adapted from the distinct three-player Stone Causeway, as allowed by the player-count-specific novelty rule.

## The intended solution
1. Fire enables the approach.
2. Earth pushes the stone into the sludge, closing Fire's western road and opening its eastern workshop.
3. Fire records the east certificate.
4. Earth crosses the stone, records the first east certificate, releasing Fire's western workshop.
5. Fire withdraws the original permit, then records the western certificate.
6. Fire restores the permit so Earth can return west and record its own western certificate.
7. Earth crosses the stone a third time; Fire withdraws the permit again.
8. Earth records the second east certificate, making Fire's final workshop accessible.
9. Fire records its final certificate, releasing Earth.
10. Earth opens Fire's western exit; both leave.

## Why each player is needed
Earth alone pushes the stone and reaches the three certificates above; Fire controls the approach and veto and records the three certificates below.

## The insight
The physical bridge cannot be removed, so release the embargo by repeatedly withdrawing the original approach signal instead.

## Likely failures and how players recover
A premature withdrawal can be reversed at Fire's accessible station; the recovery run proves this. Retaining the permit blocks the western workshop; withdraw it at the same station. All certificate gates latch. No timing window or precision landing is required. The stone rests in the one-tile channel and cannot be pushed into either raised bank.

## Shortcuts that were closed
Retaining the permit, omitting Earth's western certificate, and leaving the stone on its initial bank were scripted. All failed. The low roof prevents jumping past the initial stone.

## Kinship with the campaign
Stepping Stone uses a floating boulder as a bridge; here the bridge is also an electrical veto and the original permit must be withdrawn, restored and withdrawn again. Beacon Duet uses a torch, not a floating load/contact. No prior two-player level uses the causeway-as-veto idea.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 8.84 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 40.43 s; par: 102 s. All kit simulation checks passed without warnings.
Recovery replay: premature withdrawal, restoration, then complete in 42.50 s.
