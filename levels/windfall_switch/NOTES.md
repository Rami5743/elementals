# Windfall Switch

**Introduces:** temporarily stopping an upward fan in order to descend into a side balcony, rather than using wind to ascend.

## The intended solution
Fire releases Water, rides the left shaft and traverses the upper passage while Water holds the selector on. Water stops the right fan for six seconds after Fire signals readiness. Fire lands on the right balcony, throws its relay, waits for the wind to restart, then rises and crosses back. Only once Fire is on the left does Water release the selector and reach the left fan's stop button. Fire drops to the left balcony and operates the second relay. Water returns to the newly unlocked acknowledgment booth at the right, then crosses the lower passage to the finish switch. The selector is restored to latch Fire's exit, whose contact in turn releases Water's exit.

## Why each player is needed
Fire supplies the remote balcony contacts; Water controls both timed fan stops and the mutually exclusive passages. Neither can complete the other's circuit.

## The insight
Wind is an obstacle during descent: the same fan that provides upward transport must be disabled to reach the intermediate floor. The top selector may not be released until the return crossing has occurred.

## Likely failures and how players recover
Each stop lasts 360 ticks, providing a generous crossing window; communicate readiness before pressing. A late attempt can be retried after the fan restarts, using the safe shaft bottom or balcony. No lethal fall is required. The top selector can be restored if released too early.

## Shortcuts that were closed
Direct walking, leaving the fans running, and releasing the selector before the return crossing all fail in the scripted checks.

## Kinship with the campaign
Related to the wind navigation in Updraft Duet and Lantern, but requires alternating temporary wind absence and restored upward travel.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 177.98 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 45.15 s; par: 113 s. All kit simulation checks passed without warnings.

