# Windfall Relay

**Introduces:** the second wind interruption is controlled by a third player in an isolated booth, released only after the first descent and the selector return.

## The intended solution
Fire ascends and crosses the enabled upper gate. Water stops the right fan so Fire reaches the right balcony. Restore wind for Fire's return crossing. Water then releases the selector and opens Earth's booth. Earth waits for Fire at the left shaft and stops the left fan. Fire obtains the left relay, freeing both acknowledgment operators. Earth certifies the second descent and exits, while Water collects the right acknowledgment, reaches the finish switch, restores the selector to release Fire, and returns to its exit.

## Why each player is needed
Fire obtains the balcony contacts. Water manages the right stop, selector and final circuit. Earth must operate the left stop and certify the second descent.

## The insight
An upward transport becomes an obstacle when descending. The second temporary interruption is impossible without coordinating the first interruption, return crossing and booth permissions.

## Likely failures and how players recover
Each fan stop lasts 360 ticks. Missing the window is recoverable by waiting for wind to return and retrying. The shafts and balconies have safe landings. Restore the selector if it was released too early.

## Shortcuts that were closed
Direct walking, leaving upward wind running, and releasing the selector before the return crossing fail the scripted checks.

## Kinship with the campaign
Develops Windfall Switch with a separately gated interruption operator rather than a second timed task for the same controller.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 28.97 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 47.48 s; par: 119 s. All kit simulation checks passed without warnings.

