# Cascade Relay

Batch-90: 01/90

**Introduces:** One cargo lift draws power from a contact on the other lift. Raising A removes power from B even while B's control remains on; restoring A's low position restarts B automatically.

## The intended solution

1. Water enables B from the starting gallery. A is initially low and its lower contact completes B's two-input supply. B raises its stone.
2. B's high contact latches Fire's first gate. Fire reaches the A control and raises A.
3. A leaves its low contact, cutting B's power. B lowers its own stone. A high and B low jointly latch Water's first gate.
4. Water sets its first relay. A high and that relay latch Fire's second gate. Fire reaches the second relay, which is needed with B high.
5. Fire returns to the A control and lowers A. A's low contact automatically powers B again. B high and Fire's second relay latch Water's second gate.
6. Water sets the second relay. B high and that relay latch Fire's third gate. Fire reaches the third relay and enables Water's next route.
7. Water crosses while A is low and sets the final relay. Fire must return a third time to the A control and raise A, depriving B of power again.
8. A high with Water's final relay releases Fire. B low with Fire's third relay releases Water. Collect the gems and exit.

## Why both players are needed

Fire controls the supply contact on A and Water enables B. Each operates relays in an inaccessible separate gallery. All idle-at-exit checks fail. Neither player can substitute for the other or press the heavy sensors directly.

## The insight

The two machines are not independent: the physical position of A's load is B's supply switch. The first lever therefore controls both machines indirectly, and the second remains on during a complete power-loss and restart cycle. The stones are stored mechanical state, not timers.

## Likely failures and how players recover

Leaving A high after the first stage blocks B's high permission. Return to A and lower it. Leaving B off prevents the initial permission; Water's control remains accessible from the start. All first and intermediate gates are latched, so earlier permissions survive later changes. Both controls remain accessible via previously latched gates. Final gates are persistent under the final machine state and need no timing. Stone chambers are inaccessible to players, have no liquid hazards and have a clear vertical travel path. No jumps are required.

## Shortcuts that were closed

The direct route and an attempt to complete the level without restoring B's power both fail in the simulation. Heavy sensors cannot be substituted for by the players; solid rock separates the cargo shafts and the player galleries, and doors reach their ceilings.

## Kinship with the campaign

Windmill uses an ordinary relay sequence. Here the relay is the actual location of a cargo load and its disappearance cuts power from an already enabled second machine. Unlike Cargo, where a controller reverses one belt, this cascade automatically removes and restores the second machine's supply.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 25.21 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 43.30 s; par: 109 s. All kit simulation checks passed without warnings.

