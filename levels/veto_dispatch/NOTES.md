# Veto Dispatch

Batch-90: 75/90

**Introduces:** the crossing is controlled by the absence of every moving veto, not a positive rendezvous; the dispatcher must phase two cargo clocks and then use their far contacts and home contacts in different phases.

## The intended solution

1. Fire launches the slow cargo.
2. Water approaches the closed veto gate.
3. Fire moves to the other console but waits for the slow cue instead of launching immediately.
4. Fire launches the fast cargo, creating a common contact-free interval.
5. Water crosses during that interval and certifies the far side.
6. Both far cargo contacts and Water's certificate authorize Fire's workshop.
7. Fire collects the gem and records the workshop certificate, then returns west.
8. Both clocks expire; their home contacts and Fire's certificate authorize both exits.

## Why each player is needed

The dispatcher has two consoles and an isolated workshop; the receiver must physically cross the temporary gap and record the certificate before the dispatcher can enter the workshop.

## The insight

The same moving stones are vetoes during transit and affirmative permissions at their destinations. Their useful silence must be created deliberately; starting both immediately fails. After the far-side phase, their power must expire so the stones return home.

## Likely failures and how players recover

An early second launch or a missed crossing is recoverable by waiting for both stones to return and launching again from the accessible consoles. A replay deliberately launches both too early, verifies the far-side certificate remains off, then retries successfully. A replay delaying the second launch by 90 ticks also succeeds. No other precision challenge is present.

## Shortcuts that were closed

Immediate second launch and leaving the fast veto at home both fail in the simulator. Full-height gates and separated halls prevent bypassing the crossing or either player's certificate.

## Kinship with the campaign

Ferryman uses a positive quorum of stationary contacts. Phase Rendezvous at two players uses a positive overlap to latch workshops, and each player launches one clock; here all veto contacts must be absent to let the receiver physically cross a nonlatched gate, with both launch consoles controlled by the dispatcher. Adapted from Silent Interval for a different player count.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 12.07 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 50.58 s; par: 127 s. All kit simulation checks passed without warnings.
Early-launch recovery: 100.15 s; 90-tick delayed launch: 50.58 s.
