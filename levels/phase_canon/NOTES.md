# Phase Canon

**Introduces:** Three equal clocks are first made to overlap, then expire in canon: each expiry opens one route while the next live clock provides the crossing window.

## The intended solution

1. Water turns its first relay on. Fire crosses and sets the first Fire relay, letting Water reach the second relay.
2. Water turns its second relay on. Earth crosses and enables Fire's second passage.
3. Fire enables Earth's next passage. Water turns both earlier relays off: the inverted Earth passage and Fire's lift approach open, but previous routes close.
4. Earth enables Fire's lower passage. Fire descends, enables the timer approaches, then rides back upstairs to turn the first Fire relay off. Water can now reach B; Earth can reach C. Fire returns downstairs to A.
5. Fire starts A, Water starts B 210 ticks later, Earth starts C 210 ticks after B. Each lasts 600 ticks. The common overlap of 180 ticks latches the two preparation gates.
6. Fire waits for A to expire, crosses its inverted gate and runs through the still-open B gate. Water waits for B to expire, then runs through C's live gate.
7. The two far levers allow Earth to leave when C is on; Earth can restart C if necessary. Everyone collects their gems and exits.

## Why each player is needed

All three participate in the upper relays and the timer overlap. The runners are Fire and Water; Earth holds the last signal and needs both far permissions. All idle-at-exit tests fail.

## The insight

The time resource changes from agreement to ordered disagreement. The players must deliberately undo the upper relays and then exploit two successive 210-tick windows, rather than simply press everything together.

## Likely failures and how players recover

Leaving old relays on blocks timer access; revisit the relevant levers. Starting the timers together makes both crossing windows vanish. The tested simultaneous attempt stops Fire before its live gate. After the overlap latches the preparation gates, a missed run can be retried by restarting the appropriate live timer while its complementary timer is off; the route back to the buttons remains open. There are no lethal gaps. The intended two timing windows each exceed 90 ticks.

## Shortcuts that were closed

Walking straight, leaving old relays on and starting all clocks together all fail in the simulation. Gates reach the ceiling, and rock separates the galleries.

## Kinship with the campaign

Clockwork uses overlapping clocks; this canon additionally uses their successive expirations. It extends Afterbeat with three clocks and two separate timed crossings.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 103.18 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 55.90 s; par: 140 s. All kit simulation checks passed without warnings.

