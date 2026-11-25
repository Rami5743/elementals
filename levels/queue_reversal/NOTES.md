# Queue Reversal

Batch-90: 38/90

**Introduces:** A single-file throat, two distant plates, and a return gallery that reverses who is ahead. The second return requires withdrawing the plate holder in front of the returning partner, rather than attempting to pass in the throat.

## The intended solution

1. Air takes the lead in the narrow throat while Fire stays behind.
2. Fire holds the west plate; Air crosses and powers the narrow return fan.
3. Air rides the weak fan (which cannot lift Fire), crosses the upper gallery, and sets A1, opening the east workshop.
4. Air drops into the west yard behind Fire. Fire advances to the gate, relinquishing the plate; Air takes over its plate.
5. Fire crosses, enters the workshop, sets F1, and holds the far plate beyond the workshop door.
6. Air crosses the throat again using the far plate, climbs and records A2 in the upper east workshop.
7. Air returns to the west plate, releasing Fire to return through the throat.
8. Fire cannot overtake Air in the throat: Air withdraws into the roomy west yard, allowing Fire to reach the newly unlocked west workshop and set F2.
9. Air takes the lead a third time; Fire holds the west plate for the final crossing.
10. Air reaches the upper final exit; Fire relinquishes the plate and returns home.

## Why each player is needed

Air can use the weak return fan; Fire cannot. The lower and upper workshops trade permissions; each player must replace the other as the gate's holder. Both idle-at-exit tests fail.

## The insight

The gate's holder is behind the departing runner, but ahead of the returning runner. The upper gallery swaps the order, and the west yard is the only place to exchange positions on the way back. The east plate is behind the first workshop door, so it cannot substitute for the first return.

## Likely failures and how players recover

Fire leading first fails because the first workshop needs A1, accessible only to Air via the weak fan. Fire can retreat through the gate held by Air, both back out, and exchange order. Air remaining upstairs after A1 leaves Fire's gate closed; return to the west plate. Both recovery paths were simulated to successful completion. The doors that certify a visit latch. The fan can be restored by its reachable lower selector, and a missed landing returns the player to the shaft's solid floor. No timed crossing or precision jump is required. Arbitrary multiplayer states have not been exhaustively enumerated.

## Shortcuts that were closed

Direct exit, leaving Air upstairs, and sending Fire first were tested and fail. The one-tile throat forbids head boosts or overtaking; the weak fan is tuned to Air. The east plate is beyond the initially locked workshop, and the far plate cannot be used by the same runner to open a distant gate.

## Kinship with the campaign

Ferryman transfers an operator; Single File (four players) uses a queue and a quorum. Here two players alternate control of one gate and use the return route three times; the queue itself forces a retreat before the final exchange. Neither no-overtaking nor send-one-through has previously appeared at two players.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 60.78 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 48.32 s; par: 121 s. All kit simulation checks passed without warnings.
Both wrong-order and premature upstairs-stay recovery scripts completed in the original engine.
