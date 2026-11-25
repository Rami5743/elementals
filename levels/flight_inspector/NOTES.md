# Flight Inspector

Batch-90: 33/90

## Introduces
Two independent flight contacts must overlap twice. The third player controls a master enable for both draughts, and cannot issue the intermediate permission while the master remains on.

## Intended solution
1. Earth enables the master; Fire and Water grant reciprocal A access.
2. Both pilots grant B and climb to their departure banks.
3. Launch together; the overlap latches the first gates and Earth's first certificate.
4. Both pilots collect C and return to their lower decks; Earth collects E1.
5. Revoke A and collect D in the east workshops.
6. Earth returns to the master and turns it off, crossing the inverted gate to E2.
7. Both pilots revoke B, collect E in the west workshops, restore B and climb again.
8. Earth restores master power; launch together a second time.
9. Collect the far gems and F certificates, return and descend.
10. Earth turns off the master, collects the earth gem and issues Ehome; both pilots revoke B to reach their exits.

## Roles and insight
Fire and Water each supply a distinct transient contact and reciprocal permissions. Earth must collect certificates while changing the shared power state; it is not a permanent third switch.

## Failures and recovery
Launching 240 ticks apart fails to latch either flight certificate. The pilots can fly back and retry; the recovery simulation deliberately misses both overlaps and then completes in 77.32 s. A 90-tick launch offset on both flights succeeds in 58.62 s. Do not cut master power while the pilots are airborne; return to the master to restore it.

## Shortcut tests
Separate launches on either flight, retaining A, and retaining B were tested and fail. All three idle-player necessity tests pass.

## Kinship
Parallel Flight shares the paired flight-contact principle at two players. In this three-player variant, the third player's inverse master gate forces a genuine intermediate shutdown and restoration, and the final certificate requires Earth to withdraw the enable again. No previous three-player level uses two-in-the-air-at-once. The initial core wording shared "master enable" with Scale Interlock; here the state machine is driven by simultaneous airborne contacts, not by a four-state loaded seesaw, so the core tag now describes the flight certificates.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 65.48 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 55.63 s; par: 140 s. All kit simulation checks passed without warnings.
90-tick launch offsets and two missed-flight retries verified.
