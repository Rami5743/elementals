# Double Deck

Batch-90: 19/90

**Introduces:** The same platform is the only bridge on two decks; each deck has work that the other deck must authorize, so the platform must change decks four times.

## The intended solution
1. Fire uses the bridge at the lower floor and turns the eastern access lever.
2. Water enters the lift-control room; Fire boards the bridge.
3. Water raises the bridge, removing the lower crossing.
4. Fire steps off at the upper east berth and operates its lever, opening the lower west room.
5. Fire boards again and Water lowers the platform. Fire crosses west to authorize Water's acknowledgment.
6. Water returns west, opens the upper west berth, then returns east to the lift control.
7. Fire boards again. Water raises the bridge; Fire collects its gem and gives the upper west permission.
8. Both give up the upper crossing: Water returns the lift to the lower floor.
9. Water turns the final lever, opening Fire's exit, and both go home.

## Why each player is needed
Fire owns both decks; Water owns the isolated control gallery. Each idle-at-exit check fails. No elemental barrier is used.

## The insight
The machine is a bridge as much as a lift. Each change of height consumes the previous road; the lower west permission is unavailable before the first ascent, and the upper west permission is unavailable until the descent.

## Likely failures and how players recover
Raising the lift while Fire waits on the eastern bank leaves Fire on the lower bank; Water can lower it again. The real simulation verified an entire premature raise/lower cycle before the first ascent (53.85 s). Missing the upper west permission leaves both exits closed; the control remains accessible and the two access doors latch. If Fire falls in the pit there is a lower-bank checkpoint. No precision jump or timed crossing is required: coordinate before changing decks. Recovery from every possible death/checkpoint configuration has not been exhaustively tested.

## Shortcuts that were closed
Direct walking and skipping the second upper berth fail at closed exit doors in the simulation. The galleries are isolated by solid rock, and the barriers span the full height. The seven-tile gap is wider than Fire's measured jump.

## Kinship with the campaign
Gondola uses a shared vehicle. This two-player variation on Gangway makes the same platform the sole bridge at both floors, rather than only the lower crossing, and requires two round trips for permissions on opposing banks. The lift-as-floor idea has not been used in a two-player level in this repository.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 25.94 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 44.45 s; par: 112 s. All kit simulation checks passed without warnings.

