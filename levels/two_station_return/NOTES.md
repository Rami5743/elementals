# Two-Station Return

Batch-90: 15/90

**Introduces:** Two independent runners use the upper and lower contacts of a heavy rider in reverse spatial order. The rider must continue looping until both runners have recorded their crossings.

## The intended solution

1. Fire opens access to the lower berth. Earth boards the shuttle.
2. Fire positions itself at the upper-contact gate, while Water waits in its own gallery.
3. Earth rides past the upper contact. Fire crosses its gate during the active window and records the upper acknowledgment.
4. Water's lower-contact gate now has one input. The lower contact has already passed; Earth stays aboard for a subsequent pass.
5. Water crosses during the lower-contact window and records its acknowledgment.
6. The Water acknowledgment releases Fire's next gate. Fire records the relay opening the loft.
7. Earth stays on the shuttle until the next upper berth, dismounts, and records the loft acknowledgment.
8. Fire and Water's final gates open. The three collect their gems and exit.

## Why each player is needed

Earth is the only heavy rider. Fire opens shaft access and provides the upper and loft-release acknowledgments. Water independently traverses the lower-contact gate and provides its acknowledgment. Every idle-at-exit check fails.

## The insight

The ride is a remote switch rather than mere transport. The upper acknowledgment must precede the lower passage, and the two runners cannot replace each other.

## Likely failures and how players recover

Both timed gates reopen on subsequent laps. At 0.5 px/tick, the 30px rider overlapping a 32px sensor has a nominal 124-tick contact window; the berths pause for 240 ticks. A recovery simulation deliberately missed both crossings, waited until both gates closed and used later passes; it solved in 105.00 s. Earth can reboard at an upper berth if it leaves too early. No lethal terrain.

## Shortcuts that were closed

An empty shuttle never presses the heavy sensors. Dismounting at the first upper berth leaves Water's lower-contact gate shut. Both scripts fail in the simulation. The shaft is enclosed and the barriers span their ceilings.

## Kinship with the campaign

Catch the Lift is about boarding. Here the rider generates remote switch windows for two other players. Return Trip is the two-player version, whereas this level assigns each timed traversal to a separate runner.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 23.99 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 105.00 s; par: 263 s. All kit simulation checks passed without warnings.

