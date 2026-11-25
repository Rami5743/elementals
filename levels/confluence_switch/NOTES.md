# Confluence Switch

Batch-90: 10/90

**Introduces:** Two reversible belts share a cargo track. When they point inward, their seam acts as a stable destination without a mechanical stop; when they point outward, a cargo token at an endpoint stays there.

## The intended solution

1. The two belts initially point toward each other, gathering the stone at their seam. Fire records a middle-state relay.
2. Water uses the middle-state permission and records a relay requiring the left position next.
3. Fire returns to reverse the left belt. Both belts now point left; the cargo travels to the left contact.
4. Fire and Water certify the left position. Water returns to reverse the right belt.
5. This makes the belts point outward, not rightward. The cargo stays at the left end. Fire must return and undo its own reversal; both belts then carry the stone right.
6. Fire and Water certify the right position. Water returns and undoes its reversal, gathering the cargo at the seam again.
7. Water crosses the middle-state final gate and records the last relay. Fire returns to reverse the left belt again.
8. The cargo travels left, opening Fire's final gate with Water's last acknowledgment. Collect both gems and exit.

## Why each player is needed

Fire owns the left belt direction and relays in its gallery. Water owns the right direction and the other relays. Both idle-at-exit checks fail. The cargo track is isolated, and the heavy contacts cannot be reached directly.

## The insight

The two controls do not independently select destinations. When they disagree spatially, the belts can gather the load in the middle or hold it at its current outer endpoint. To transfer an endpoint load across the seam, both belts must point in the same direction.

## Likely failures and how players recover

An early rightward dispatch blocks the middle-stage route; restore both inward directions. A separate recovery simulation deliberately sent the cargo right before the first acknowledgment, then gathered it back and completed in 77.42 s. Reversing only the far belt while the near one still points outward does not transfer the cargo; undo the near reversal. All intermediate permissions latch, the controls remain accessible, and no jump, hazardous terrain, or timed input is required.

## Shortcuts that were closed

Direct walking and reversing the far belt without undoing the near reversal both fail in simulation. The galleries are sealed and all barriers span their ceilings. The cargo track cannot be entered or manipulated by the players.

## Kinship with the campaign

Furnace Line carries a stone on one belt. Reversing Signal uses a single belt and transient contacts. Here two independently directed belts interact at a seam to maintain a third destination without a brake, door, or timed input. Intermediate Stop also has three positions, but there the middle position requires an obstruction in a hoist rather than opposing conveyor currents.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 25.82 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 72.33 s; par: 181 s. All kit simulation checks passed without warnings.

