# Stroke Inspector

Batch-90: 60/90

## Core idea
One physical moving contact provides two qualified signals: a powered outward crossing and an unpowered return crossing. A third actor is a dedicated dispatcher who is not allowed to leave the clock station until both inspection certificates have been recorded and the cargo is back home.

## Solution
1. Water sets the initial authorization.
2. Earth enters the clock station, launches the shuttle and remains available to repeat the launch.
3. At the middle contact on the outward stroke, Fire crosses its powered gate.
4. Fire records the first holding input, then waits for the far contact to latch its far compartment.
5. Fire records the delivery certificate, authorizing Water's access and securing the outbound gate.
6. Power expires, so Water's inverse gate opens. Water crosses the same contact on the return stroke and records the receipt.
7. The two inspection certificates and the home contact together open Earth's final route.
8. Earth leaves the dispatcher station, sets the final authorization, and all three collect their gems and exit.

## Motor challenge and recovery
The two crossing windows are the only precision moments. Each is driven by the same four-tile middle contact and 0.8 px/tick shuttle. The delayed replay waits 90 extra ticks after both gates are fully open and completes. Separate recovery replays miss Fire's outward crossing or Water's inward crossing, wait for Earth to launch a second cycle, and complete. Earth can always repeat the cycle until both inspections succeed. A safe floor under every player permits retreat and waiting.

## Novelty
Direction-qualified-transit-contact is new at three players. The 2-player Return Stroke uses the same principle but its return inspector also operates the clock. Here both inspectors are physically separated from the clock, while Earth is a dedicated dispatcher with a three-signal exit interlock, and Water must authorize the dispatcher before any stroke can occur. Pulse Exchange (3 players) uses distinct cargo positions as a relay clock, not a single sensor qualified by opposite strokes.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 18.25 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 55.25 s; par: 139 s. All kit simulation checks passed without warnings.
90-tick extra delay at each crossing and separate missed outward/return stroke recoveries completed.
