# Junction Council

Batch-90: 16/90

**Introduces:** Two conveyors meet at a stable seam. Reversing the right-hand conveyor requires two approvals, and the same quorum must later be broken to gather the token.

## The intended solution

1. Both conveyors point inward. Fire records the middle-position permission.
2. Water acknowledges it. Fire reverses the left belt and the token travels left.
3. Fire and Water certify the left position; Earth and Air reach the independent right-direction controls.
4. Both approve the right reversal. The belts now point outward, holding the token at the left end.
5. Fire undoes its own reversal, so both currents point right and deliver the token to the right.
6. Fire, Earth and Air certify that delivery, enabling Water's next acknowledgment.
7. Air withdraws its right-direction approval. Earth leaves its approval on, but the belts now point inward, gathering the token at the seam.
8. Earth and Air certify the middle position. Water reaches its final relay.
9. Fire reverses the left belt again, producing the final left position and releasing all exits.

## Why each player is needed

Fire owns the left direction and progression relays; Water coordinates the destination claims; Earth and Air jointly own the right direction and provide separate certifications of the right and middle states. All four idle-at-exit checks fail.

## The insight

Outward currents retain the current endpoint, inward currents gather the token, and aligned currents transfer it. The additional quorum splits one direction change between two independent controllers, so one approval can be deliberately withdrawn to gather the token.

## Likely failures and how players recover

Reversing the far belt alone cannot move the token left-to-right. Undo the near reversal. A premature withdrawal of the left delivery returns the token to the seam; restoring it recovers the delivery. A replay of that mistake and its recovery solved in 65.98 s. Earlier permissions latch; no timed input, lethal terrain or irreversible cargo action is required.

## Shortcuts that were closed

Direct walking and reversing only the far belt fail in the simulation. The cargo is sealed away from the operators and barriers span the gallery ceilings.

## Kinship with the campaign

Junction Dispatch uses this seam mechanism for three players; here the right direction has two independent approvals. Cascade Quorum couples power supplies, whereas Junction Council joins physical conveyor currents. The third stationary destination comes from opposing currents, not a door or brake.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 36.69 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 62.88 s; par: 158 s. All kit simulation checks passed without warnings.

