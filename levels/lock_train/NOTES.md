# Lock Train

Batch-90: 24/90

**Introduces:** One timed airlock controller drives two successive cargo chambers; the second chamber is only authorized after the first delivery, and the authorization must be withdrawn after the second delivery.

## The intended solution
1. Fire enables Water's access to the clock and waits at the first entrance.
2. Water starts the clock; Fire and Earth (pushing the stone) enter the first airlock before the 420-tick timer expires.
3. The clock expires, closing the entrances and opening the outlets. Fire leaves the first chamber and turns the middle relay.
4. Earth pushes the stone to the middle staging area. Water crosses to the stage selector, arms it and returns to the clock.
5. Water starts the second cycle. Both travelers enter the second chamber, with the stone.
6. The clock expires again; Fire clears the final delivery area, and Earth pushes the stone onto the heavy contact.
7. Water withdraws the stage selector to reach the certificate, which opens the last door only while the heavy contact remains pressed.
8. Fire leaves; Earth jumps over the stationary stone and follows; Water returns to its exit.

## Why each player is needed
Fire can reach both relay stations ahead of the cargo. Earth moves the stone, which must maintain a remote signal when Earth leaves. Water works the isolated clock and selector. All three fail their individual idle-at-exit checks.

## The insight
Do not try to cross both airlocks in one clock cycle. The same pulse opens two entrances but closes both outlets; authorization of the second entrance is obtained only after the first delivery. The selector must be relinquished to reach the final certificate. A live cargo contact replaces a player's presence.

## Motor challenge and recovery
Each clock window lasts 420 ticks. Entering both chambers with the slow stone requires coordinated movement. The simulation verified a 90-tick delayed start at both entrances and a recovery in which the first attempt at each clock was deliberately missed and restarted, finishing in 55.85 s. The controller remains accessible so a missed window is repeatable. The central and final areas have flat ground; an earlier stop can be resumed. Jumping over the parked stone is not a timed input. Recovery from arbitrary cargo placements has not been exhaustively tested.

## Shortcuts that were closed
A direct walk, using only one cycle, retaining the selector, and replacing the final stone with Earth all fail at the corresponding closed gates in simulation. The separated gallery and full-height doors prevent bypasses. The final heavy contact is five tiles from the last gate and must remain live.

## Kinship with the campaign
Windlass (two players) uses a single timed airlock whose turbine cannot be retriggered from inside. Here two chambers share a remotely repeatable clock, and an intermediate authorization must be granted then withdrawn. Three-player Phase Canon requires overlapping timers; this puzzle instead uses one clock with two mutually exclusive phases and physically stages a conserved cargo between them.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 50.75 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 40.45 s; par: 102 s. All kit simulation checks passed without warnings.

