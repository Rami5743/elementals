# Descent Ledger

Batch-90: 56/90

**Introduces:** A series of irreversible cracked-floor descents whose permissions have to be spent in reverse order: Earth must record a certificate, use the current authorization and go down, before Water can revoke that authorization to reach the next control.

## Intended solution
1. Water grants the east permission.
2. Earth records the first east certificate and returns west of the permission gate.
3. Water revokes the east permission, advances to the second control and opens the west workshop.
4. Earth breaks the first hatch, descends and records the lower certificate.
5. Water withdraws the west permission, reaches the third control and grants the lower east route.
6. Earth records the second east certificate and breaks the second hatch.
7. Water withdraws the third permission and returns west; Earth records the bottom certificate, which admits Water to its west workshop.
8. Water grants Earth's bottom east route, Earth returns east and issues the final Water permission.
9. Both reach their exits, having collected their gems.

## Why each player is needed
Earth alone can break the cracked floors and record the certificates before the irreversible descents. Water controls the mutually incompatible permissions from a separate gallery.

## Insight
The safe route to the next floor must be paid for with the current floor's certificate. Every authorization also blocks the controller's own progress, so it must be withdrawn after it has been used; this is a descent with a distributed ledger, not just a shaft.

## Likely failures and recovery
All three reversible permissions can be restored from the side of the associated control. Early withdrawal of the first permission can be undone to let Earth return; this exact mistake and recovery were simulated. The first hatch is behind the second control, which is accessible only after the first certificate. The second hatch is behind the third certificate. No irreversible fall can leave a required certificate behind. The floor panels are three tiles wide with three-tile headroom, so a missed pound can be repeated without precision. All floors are safe.

## Shortcuts
Retaining either of the first two permissions blocks Water's progress, and keeping the second hatch intact prevents the bottom certificate. These plans were simulated. There is no way to jump between galleries through the solid rock.

## Kinship
Drill at four players drills three offset hatches down a single shaft. Here each descent is separately authorized by a partner and consumes a different phase of the puzzle; revocation is necessary before the partner can access the next control. Pound-chain is new at two players.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 9.46 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 54.58 s; par: 137 s. All kit simulation checks passed without warnings.
An early revocation of the first permission, blocked return and restoration of the permission were simulated.
