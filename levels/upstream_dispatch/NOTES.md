# Upstream Dispatch

Batch-90: 45/90

**Introduces:** One selector reverses both an isolated cargo belt and the runner's conveyor. The cargo grants the other operators' permissions, but its current opposes the runner's next journey.

## The intended solution
1. Air and the initial right cargo contact grant Water access to the first timed button.
2. Water starts the first window. Earth hops upstream to the left bank, passes the timed gate and issues Eleft.
3. Water issues Wstart; Fire uses both permissions to reach the shared direction selector.
4. Fire reverses both conveyors. The cargo moves left, enabling Water's left certificate.
5. Water's certificate and the left cargo contact release Air's second timed button.
6. Air starts the second window. Earth hops against the now leftward conveyor and records Eright on the far bank.
7. Fire relinquishes the reversal. The cargo returns right and the inverse gate opens.
8. Water and Air use the right contact and the two final certificates to reach their exits.

## Why each player is needed
Earth is the only runner in the conveyor gallery. Water and Air supply separate timed windows and relay permissions. Fire controls the direction of both machines, and must restore the initial state at the end.

## The insight
The same current that delivers the remote token makes the runner's journey harder. A hop disconnects the runner from the belt for a moment. The second delivery asks for the opposite current, so the upstream technique is used in both directions.

## Motor challenge and recovery
Two 660-tick (11 s) timed windows, with solid banks and no hazards. Delaying Earth by 90 ticks at each launch was simulated successfully (49.45 s). Waiting for each pulse to expire, then retrying both controls while Earth waits on a safe bank, also completed (58.12 s). The controls remain accessible. The second crossing can be made easier by running back before the selector is reversed, but the first crossing still requires hops; the intended route is against the current both ways.

## Shortcuts that were closed
Direct travel, walking without jumps against the first current and retaining the reversed direction all fail in simulation. The walk-only script remains near the original right bank. The cargo gallery is sealed and cannot be replaced by a player holding its contacts.

## Kinship with the campaign
Treadmill sorts players by running speed, and Upstream (two players) uses hops to defeat a fast belt. Here the runner conveyor and a separate cargo conveyor share a reversible control; delivery of that cargo gates the second receiver's timed permission. Hop-beats-belt is new at four players.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 13.21 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 46.45 s; par: 117 s. All kit simulation checks passed without warnings.
Both delayed launches and missed-window retries passed the original simulation.
