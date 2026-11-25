# Cascade Triad

Batch-90: 04/90

**Introduces:** The first cargo lift's bottom contact is the power supply of the second. Three operators must alternate supply loss and restoration, with acknowledgments made at opposite machine states.

## The intended solution

1. Water opens Earth's starting gate. Earth enables B, which receives its second input from the bottom contact of A.
2. B rises and latches Fire's first gate. Fire reaches A's control and raises A.
3. B automatically loses power and lowers; A high and B low latch Water's first gate.
4. Water sets the first relay. Fire crosses the second gate and sets the acknowledgment that Earth needs at B high.
5. Fire returns to A and lowers it. B rises again. Earth can now cross the second gate and provide the additional acknowledgment for Water's second gate.
6. Water sets the second relay. Fire advances and sets the third relay, enabling both Earth and Water to proceed while A is low.
7. Earth and Water provide final acknowledgments. Fire must abandon the current state, return to A and raise it again.
8. The final gates require A high or B low together with the acknowledgments. Collect the three gems and exit.

## Why each player is needed

Water authorizes Earth's initial access and Fire's intermediate gates. Earth enables B and supplies acknowledgments at the renewed-power stage and the final low-A stage. Fire controls A and its cascading effect on B. All three idle-at-exit checks fail. The cargo shafts are inaccessible.

## The insight

An enabled machine can lose power without anyone touching its own control. The three operators must distinguish the switch setting from the actual mechanical state. The final claim on the shared supply requires giving up the restored state.

## Likely failures and how players recover

Leaving A high after the initial exchange prevents Earth from accessing the renewed-power acknowledgment. Lower A again. Prematurely lowering A interrupts Water's first permission, but raising it again restores the missing contact pair. A separate recovery simulation toggled A back down and back up before the first exchange completed, then solved in 59.37 s. Intermediate gates latch, controllers remain accessible, no timing or jumping is required, and no lethal terrain or irreversible actions occur.

## Shortcuts that were closed

Walking directly to exits and never restoring B's supply both fail in simulation. Doors reach the ceilings; separate galleries prevent substitution, and the cargo chambers have no player access.

## Kinship with the campaign

Windmill is a sequence of relays. Here the supply is the physical cargo position and the second machine automatically loses and regains it. Cascade Relay is the two-player version; the third operator's acknowledgment must be obtained while B has regained power.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 25.93 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 49.17 s; par: 123 s. All kit simulation checks passed without warnings.

