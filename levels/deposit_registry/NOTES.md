# Deposit Registry

Batch-90: 44/90

**Introduces:** Two irreversible cargo deposits, each with three useful positions. The registrar must record both lower contacts before the first transfer, then a high certificate and finally the two deposited contacts.

## The intended solution
1. Fire, Water and Air record the initial lower claims while both loads remain below the grate.
2. Air and Water together authorize Fire to raise A.
3. Earth, Water and Air inspect A at its high contact and issue three independent certificates.
4. Fire lowers the lift to shed the first load onto the grate.
5. Fire uses the mixed state, A deposited and B still below, together with the three high certificates. Fire returns west to record the authorization.
6. Water releases Earth's second hoist control. Earth raises B.
7. Fire inspects B at its high contact, then Earth lowers it to make the second deposit.
8. Water returns east for the return certificate. Air records the simultaneous deposits.
9. Earth crosses the inverse gate, records the final certificate, and all four leave.

## Why each player is needed
Fire owns the first lift, Water issues the authorization and return certificates, Earth inspects A and operates B, and Air registers the initial, high and deposited states. Each gallery is isolated.

## The insight
Raising is not depositing. Both lower claims must be made before spending A; then the mixed low/deposited state must be recorded before B is spent. The high claims are separate from the stable deposited permissions.

## Likely failures and how players recover
Leaving either hoist raised blocks its inverse route and the deposit contact. Lower it to deposit the cargo. A premature first ascent may be reversed and retried, as demonstrated by the recovery script. Once a load has been deposited, the hoist can pick it up again for missed high certificates; lower claims are protected by the access chain. No timed input is needed.

## Shortcuts that were closed
Direct travel, leaving either load raised and skipping the lower registration are tested. Galleries are sealed and full-height doors prevent bypasses.

## Kinship with the campaign
Winnow strips one load off a hoist; Deposit Custodian does two sequential deposits at three players. Here the fourth registrar separately protects the lower claim and records the high and final deposited states. Hoist-one-way-for-cargo is new at four players.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 21.85 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 40.13 s; par: 101 s. All kit simulation checks passed without warnings.
Interrupted first ascent and successful retry verified in the engine.
