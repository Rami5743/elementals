# Ceiling Committee

Batch-90: 08/90

**Introduces:** A binary hoist obtains an extra stable position from a retractable obstruction controlled by two independent operators.

## The intended solution

1. Fire starts the hoist against the closed ceiling. Its stable middle reading enables Fire's first relay.
2. Earth and Air separately authorize the opening of the ceiling. Neither alone can release the obstruction.
3. The powered hoist continues to its high stop. Water records its high-stage acknowledgment. Earth and Air can record theirs.
4. Fire lowers the stone. Earth withdraws its ceiling permission, so the next ascent stops at the middle contact.
5. The middle contact and the three independent acknowledgments hold Water's middle passage open. Water records a relay that also opens the next Earth and Air routes.
6. Earth and Air record their further acknowledgments while the middle state is retained. Fire lowers the hoist and obtains the low-stage relay.
7. Fire raises the hoist, Earth restores ceiling permission, and Water obtains the high-stage final relay. Fire lowers the stone again; Earth withdraws permission.
8. Fire raises the hoist to its middle stop for the final time. Its stable output, combined with the collected acknowledgments, opens the remaining exits.

## Why each player is needed

Fire owns the motion command. Earth owns one ceiling permission and two relays; Air owns the other ceiling permission and independent relays. Water connects all three phases through its acknowledgments. Every idle-at-exit simulation fails.

## The insight

Opening the obstruction does not itself command the hoist to move. Two approvals allow a powered machine to continue; withdrawing either approval restores the extra mechanical stop on the next ascent.

## Likely failures and how players recover

If the ceiling is open, the stone cannot retain its middle position. Lower the hoist, withdraw either ceiling permission, then raise the hoist. If one approval is missing, restore it to reach the high stop. A recovery simulation deliberately withdrew and restored Air's approval after the first high reading; it solved in 43.70 s. Earlier gates latch, controls remain reachable, and no timed input or hazardous tile is required.

## Shortcuts that were closed

Direct walking and attempting to exploit the fleeting middle reading while leaving the ceiling open both fail. The doors span the galleries, and the shaft is sealed from the players.

## Kinship with the campaign

Quorum counts simultaneous permissions but does not use a physical obstruction to add a state to a machine. Cascade Quorum uses two coupled machines, while this level uses a single obstructed hoist. Three-Stop Dispatch is the three-player version; here two operators must agree before the obstruction can be removed.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 32.49 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 43.75 s; par: 110 s. All kit simulation checks passed without warnings.

