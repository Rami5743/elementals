# Phase Rendezvous

Batch-90: 66/90

**Introduces:** Two independent moving cargo contacts with different physical travel times; the relative launch phase, rather than either clock's absolute expiry, is the key.

## The intended solution
1. Fire starts the slow shuttle.
2. Water waits for the upper cargo's cue contact, instead of launching simultaneously.
3. Water starts the faster shuttle.
4. Their spatial contacts overlap, opening both workshop gates permanently.
5. Fire records its eastern workshop certificate and gem.
6. Water records the other eastern certificate and gem.
7. Both return west; they cannot exit while either stone is away from home, even with both certificates.
8. The clocks expire and return the cargo; the two home contacts and two certificates jointly authorize the final exits.

## Why each player is needed
Each operates one independent clock and one workshop certificate. An idle partner cannot substitute for either.

## The insight
Launching together is wrong precisely because the travel times to the contacts differ. The resource is a relative phase window. The two clocks then have to stop rather than continue running; the gates require both cargo home positions as well as the two workshop certificates.

## Likely failures and how players recover
Both launch stations remain accessible after a missed rendezvous; once the shuttles have returned home, repeat the launch. A deliberate simultaneous-launch failure followed by a second correctly phased launch was simulated to victory. A 90-tick late launch relative to the cue was also simulated to victory. No dangerous terrain or narrow landing is involved.

## Shortcuts that were closed
A simultaneous launch and omitting the second clock were both scripted and fail. Workshop walls are full-height; both final doors require both home contacts and both far-side certificates.

## Kinship with the campaign
Ferryman uses one moving transport and a quorum of stationary switches. Here independent machine motions must be phased to achieve a transient conjunction. Afterbeat instead overlaps electrical timer expiry; Return Stroke uses the direction of one cargo. Neither uses two spatial contacts with unequal travel times.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 9.32 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 50.57 s; par: 127 s. All kit simulation checks passed without warnings.
Recovery replay after a missed simultaneous launch and tolerance replay with 90 ticks of delayed launch passed.
