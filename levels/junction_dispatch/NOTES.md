# Junction Dispatch

Batch-90: 13/90

**Introduces:** Two independently directed conveyors share a seam. The third operator owns the second direction, which must change only after the team's left-position work is complete.

## The intended solution

1. Both belts point inward; the stone rests at their seam. Fire certifies the middle state.
2. Water records its relay. Fire returns and reverses the left belt, sending the stone left.
3. Fire and Water certify the left position. Earth obtains access to the right belt control.
4. Water records the second relay. Earth reverses the right belt: the belts now point outward and retain the stone at its left endpoint.
5. Fire must undo its own reversal so both belts point right. The stone travels right and Fire records the next relay.
6. Earth certifies the right position. Water reaches the next relay, after which Earth returns to undo its reversal, gathering the stone at the seam.
7. Earth certifies the middle position. Water reaches its last relay.
8. Fire returns to reverse the left belt once more. The left position opens Fire's and Earth's final gates; all three collect their gems and exit.

## Why each player is needed

Fire controls the left belt and three relays. Earth controls the right belt and certifies two different mechanical states. Water coordinates the succession of claims and the final permissions. All three idle-at-exit checks fail.

## The insight

The two direction settings are not independent destination commands. Outward currents retain a cargo token at whichever endpoint it already occupies, whereas inward currents gather it at the seam. Moving to the opposite end requires both currents to agree.

## Likely failures and how players recover

Reversing only the far belt while the near one points outward cannot move the token to the opposite end. Undo the near reversal. A premature withdrawal of the left delivery returns the stone to the middle; restore that delivery to recover. A separate replay deliberately did this and completed in 68.50 s. All previous permissions latch, controls remain reachable, and there are no hazardous tiles or timing-dependent actions.

## Shortcuts that were closed

Direct walking and reversing only the far belt both fail in the simulation. The heavy sensors and cargo are inaccessible to players, and the barriers span the gallery ceilings.

## Kinship with the campaign

Reversing Signal has one conveyor and uses a transient contact. Here two conveyors interact at their seam to create three stationary destinations and an endpoint-retaining state. Confluence Switch is the two-player version. The third operator here has its own control and must certify the right and middle stages. Cascade Triad has two machines linked by power; these belts instead meet mechanically on the same track.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 30.76 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 65.53 s; par: 164 s. All kit simulation checks passed without warnings.

