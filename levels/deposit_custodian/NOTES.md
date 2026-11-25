# Deposit Custodian

Batch-90: 40/90

**Introduces:** A third, isolated custodian must inspect one raised load before its deposit grants access to the other hoist. Raising a load and leaving it on the grating are distinct permissions.

## The intended solution
1. Fire and Water record both lower-contact certificates.
2. Water releases Fire's first hoist control; Fire raises A.
3. Water records W2 while Earth inspects the raised state and records E1.
4. Fire lowers A. The grating receives the deposit and the inverse gate opens.
5. Fire uses the mixed state (A deposited, B below) with E1 and W2 to record F2, then returns to the west certificate.
6. Water uses the two Fire permissions and A's deposit to authorize Earth's access to B.
7. Earth raises B; Fire records F3 from B's high contact.
8. Earth lowers B and passes the inverse gate. Water returns east for Wreturn.
9. Earth records the final certificate, and the two deposits and certificates open the three exits.

## Why each player is needed
Fire controls A and the mixed-state certification. Water controls access to Earth's workshop and records the return certificate. Earth is the high-state inspector of A and sole operator of B. All three have independent, sealed galleries.

## The insight
A raised load is not a deposited load. The custodian inspects the first while it is still on the lift, then cannot access the second control until the first load has been shed onto the grating.

## Likely failures and how players recover
Leaving the first lift raised blocks Fire's inverse gate; leaving the second raised blocks Earth's certificate. Return to the relevant control and lower it. Premature first ascent can be reversed and retried (tested). A hoist can pick up a deposited load for a missed high certificate. The controls for the second cargo are locked until the first mixed-state certification has been recorded, protecting the irreversible lower claim. No precise inputs or timed crossings are needed.

## Shortcuts that were closed
Direct travel and leaving either load raised are blocked in the simulation. Each gallery is isolated and every door reaches the ceiling. Idle-at-exit tests cover each player.

## Kinship with the campaign
Dumbwaiter delivers a single cargo upward; this uses two loads, three distinct positions per load, and an independent inspector who later becomes the second operator. Two Deposits is the two-player predecessor. Lift-sheds-its-load has not appeared at this player count.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 19.69 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 41.53 s; par: 104 s. All kit simulation checks passed without warnings.
Interrupted first ascent and successful retry verified in the engine.
