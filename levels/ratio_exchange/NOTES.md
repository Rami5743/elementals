# Ratio Exchange

Batch-90: 20/90

**Introduces:** Changing the mechanical advantage reverses which of two loaded pans is heavier; each direction produces a different pair of simultaneous, permanent-until-reversed cargo contacts.

## The intended solution

1. Fire and Water engage their separate ratio inputs A and B. With the block engaged, the left pan's mass 3 exceeds the right pan's effective mass 2; the left descends four tiles and the right rises two.
2. The low-left and high-right contacts open the first galleries. Fire and Water record their first acknowledgments.
3. Fire returns to A and disengages it. The right side now weighs 4 and the left 3. The high-left and low-right contacts open the next routes, together with the earlier acknowledgments.
4. Fire and Water set the second pair of acknowledgments. Water remains west of the live low-right gate.
5. Fire returns and engages A again, physically reversing the rope. Water's route back east closes, but the third western permission opens. Fire reaches the third eastern permission.
6. Both record the third acknowledgments. Water's western lever also unlocks the previously inaccessible east workshop.
7. Fire returns and disengages A again. The rope reverses and opens Water's return route.
8. Water visits the east workshop and records its acknowledgment, then returns west through the low-right gate.
9. Fire engages A once more. Both stones reach their final paired contacts, and the final gates open only with the appropriate recorded acknowledgments.
10. Collect the two gems and enter the exits.

## Why each player is needed

Each operates one indispensable ratio input in an isolated gallery and the acknowledgments on their own route. Neither has access to the other's controls or the two stones. The simulation's idle-at-exit tests fail for both players.

## The insight

The rope is not a balanced register. Its heavier side reverses because the ratio divides the second pan's total mass. Both cargo contacts change together, with unequal excursions. To obtain the east-workshop acknowledgment, the players have to surrender the very state that opened the third gates.

## Likely failures and how players recover

Leaving the block engaged after the first phase keeps both second gates shut. Disengage either input, and the rope returns by itself. Engaging the ratio early after a reset shuts Water's live middle gate: Fire can disengage A and wait until Water crosses. All other intermediate doors latch; the controlling lever A remains accessible. A recovery variant deliberately restores the wrong ratio state and reverses it again before continuing, completing in 43.63 seconds. No jump or timed input is required.

## Shortcuts that were closed

Direct walking, leaving the original ratio engaged, and skipping the return to the east workshop were all attempted in scripts and failed at the intended gates. The machine is isolated by rock; neither player can substitute their own weight for a cargo contact. The gallery doors reach their ceilings.

## Kinship with the campaign

Counterpoise uses added body weight to lift a load. Here the cargo weights remain fixed; the ratio itself selects the direction, and the unequal excursions produce complementary pairs of sensor permissions. Unlike Rope Register, no state is stored by balance and no rider writes a height.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 26.02 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 42.90 s; par: 108 s. All kit simulation checks passed without warnings.

