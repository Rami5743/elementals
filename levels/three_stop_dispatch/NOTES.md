# Three-Stop Dispatch

Batch-90: 05/90

**Introduces:** A binary hoist acquires a stable third stop by pushing against a retractable ceiling. The third operator owns that ceiling and must acknowledge different stops.

## The intended solution

1. Fire starts the hoist with its ceiling closed. The middle contact opens Fire's first gate; Fire enables Earth's ceiling control.
2. Earth opens the ceiling. The powered hoist continues to the high contact; Water crosses and records its high-stage acknowledgment.
3. Fire records its own acknowledgment and returns to lower the hoist. Earth records an additional high-stage permission and returns to the ceiling control.
4. At the low position Earth closes the ceiling. Fire raises the hoist again; the parked middle contact and both acknowledgments hold Water's middle passage open.
5. Water reaches its middle relay. This retains the passage and enables Earth to reach a further relay while the middle contact is active.
6. Fire lowers the stone, crosses the low-stage gate, records the final low permission, and returns to raise the hoist.
7. Earth returns to open the ceiling. Water reaches the final relay at the high state. Fire lowers the hoist; Earth closes the ceiling at the bottom.
8. Fire raises the stone to the middle stop again, holding the two final passages open. Water exits via the previously latched low-stage gate.

## Why each player is needed

Fire supplies vertical motion and progression relays; Water provides the high and middle acknowledgments; Earth controls the ceiling and provides two additional dispatch acknowledgments. All three idle-at-exit tests fail. The shaft is inaccessible.

## The insight

A binary command is not a binary physical state. A deliberate obstruction gives an extra stationary position. Changing the obstruction releases an already powered machine. A transient middle reading is not sufficient.

## Likely failures and how players recover

If the ceiling remains open, the stone passes through the middle position instead of parking. Lower the hoist, close the ceiling, and restart it. If the low position is needed while the hoist is up, return to the control and lower it. A recovery simulation prematurely closed the ceiling after the first high reading, then reopened it, and solved in 46.72 s. Controllers remain reachable through latched doors; Water's live middle door is retained by its far-side relay. No jump, timed crossing or lethal terrain is required. Arbitrary state recovery is not exhaustively proved.

## Shortcuts that were closed

Direct walking fails. The alternative script leaves the ceiling open during the second ascent and attempts to use the transient middle contact. Water times out at w2. Rock isolates the cargo and separates the operators; doors reach their ceilings.

## Kinship with the campaign

Jackshaft presses cargo into a sensor without creating a third stable position. The novelty review notes identical part types to Cascade Triad: the similarity is limited to ingredients. Cascade Triad has two coupled machines and a supply contact; this puzzle has one hoist and a deliberately blocked physical path. Three-Way Imprint stores cargo on a grate; here it never leaves its elevator. The transient-contact shortcut specifically tests this distinction. Intermediate Stop is the two-player version.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 48.57 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 44.82 s; par: 113 s. All kit simulation checks passed without warnings.

