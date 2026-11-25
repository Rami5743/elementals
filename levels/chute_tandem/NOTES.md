# Chute Tandem

Batch-90: 21/90

**Introduces:** A runner dives ahead of a rolling stone which is released by a slow rising barrier; a return conveyor recovers missed deliveries, and the captured load unlocks the partner's final hoist.

## The intended solution

1. Earth shunts the heavy rolling stone west past the cargo hoist.
2. Earth hops over it, pushes it back onto the deck, and holds the deck control to raise it.
3. Earth pushes the stone into the pen, backs onto the deck, and returns to the bay.
4. Water climbs the ladder and reaches the upper catwalk, setting the release permit.
5. Earth goes to the release control. Together the two permits raise the pen's slow barrier and open the catwalk door. Earth clears the recovery belt's landing area.
6. Water walks through the gate, drops through the one-way trapdoor, and stands on the landing ledge before the stone reaches it. The rolling stone stops against Water and holds the heavy plate.
7. Earth reaches the east workshop and operates the key that unlocks Water's return control.
8. Earth boards the home lift while Water drops back into the bay and returns west.
9. Water operates the home lift from the western berth. Earth rides to the upper exit; Water is already at its own door.

## Why each player is needed

Only Earth can push and load the stone. Water can reach the catwalk across the water pool and intercept the stone; Earth's weight cannot substitute for the runner's job through that route. Both permits are required, and Water controls the last lift from the opposite end of the bay. Each player's idle-at-exit check fails.

## The insight

The switch that opens the runner's path also looses the stone, so being in front of it requires dropping instead of chasing. The pen is a slow powered platform, rather than an ordinary quick door, which makes the timing humanly achievable.

## Likely failures and how players recover

A missed launch does not consume the stone. It rolls into the bay, where the powered westward belt returns it away from the gate. Earth crosses behind it, switches off the release, reloads the stone and launches again. The upper permit can remain on throughout. The hold control extends one tile above the deck's upper landing, and Earth backs onto the deck before lowering it. A complete simulated missed-release, retrieval, reload and successful second dive took 76.67 s. A separate successful simulation with a 90-tick late start took 47.57 s. A 120-tick late start fails the intended interception. If the last lift is called early, Water can turn its lever off and let the lift return.

## Shortcuts that were closed

Direct walking, a 120-tick late dive and prepositioning past the unopened catwalk gate fail the scripted checks. The water pool and height separation prevent Earth from using the catwalk normally. The lower return control cannot be reached until the east workshop key is obtained. The capture gate latches, so a completed capture is not lost if the stone is subsequently disturbed.

## Kinship with the campaign

Avalanche uses a runaway load and a runner. This version combines the interception with a separate loading operation, jointly permitted release, recovery conveyor and a remote final hoist. The dive-ahead-of-the-runaway idea is new for two players. The three-player Headlong and four-player Chute Council are relatives, but the two roles here must jointly authorize release and the runner alone completes the return certification.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 227.05 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 47.57 s; par: 119 s. All kit simulation checks passed without warnings.

