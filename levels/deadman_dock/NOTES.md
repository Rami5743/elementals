# Deadman Dock

**Introduces:** The single powered ferry is needed to reach a workshop, but its motor simultaneously closes that workshop's entrance. To enter, stop the ferry after docking. To get back, reopen the motor circuit only after the rider has returned to the dock.

## The intended solution

1. Fire operates the departure relay, latching Water's first gate. Water goes to the motor lever.
2. Water turns the motor on, which begins the ferry's repeated trip and closes the far workshop gate.
3. Fire waits for the left docking window and jumps from the bank onto the moving platform. The gap is two tiles; the platform is three tiles wide and dwells 150 ticks at each endpoint.
4. Fire rides across and steps onto the right bank. Water stops the motor. The inverted workshop gate opens.
5. Fire walks through the workshop, takes the gem, and sets its far relay, enabling Water's next passage.
6. Water reaches the acknowledgment relay, latching the home gate, and returns to the motor. Fire gives up the far position and goes back to the dock.
7. Water restarts the motor, closing the workshop again. Fire boards at the right dock, rides back, and jumps left from the platform during its stop.
8. Fire crosses the home gate and sets the final relay. The relay and running motor latch Water's last gate. Both reach their exits.

## Why each player is needed

Fire must actually cross the trench and operate the remote workshop relay; Water must operate the motor and acknowledgment while Fire is on the other bank. The gate into the workshop is closed exactly when the ferry runs. Neither player can reach the other's gallery; the idle-at-exit tests fail.

## The insight

The motor does not simply enable progress. Its two states give mutually exclusive transport and access permissions. The same platform is wanted for both outbound and return crossings, so the operator must stop and restart it after the rider relinquishes the far room.

## Likely failures and how players recover

- A missed boarding jump lands on a safe trench floor. Walk left along the lower tunnel to the one-way ledges at x=9..11 and jump back up. The recovery replay deliberately walks off the bank, climbs back, catches the next ferry and wins without dying.
- Keeping the motor running locks the workshop. Switch it off after docking. Starting it again too early can strand Fire behind the far gate; stop it and let Fire return to the dock first.
- The return jump can also be retried; the trench recovery route returns to the departure side of the home gate. The lift has a 150-tick dwell, exceeding the 90-tick motor window minimum. No lethal terrain.
 
## Shortcuts that were closed

The direct route and leaving the motor running both fail in simulation. The right cliff is seven tiles high from the trench; the recovery ledges are confined to the left and cannot reach the workshop. The home gate spans the ceiling, and the recovery tunnel ends on its departure side.

## Kinship with the campaign

Catch the Lift uses a short transport window. Here stopping the transport opens an incompatible route, and restarting it closes that route. The rider must change sides of the workshop gate before the motor may run again.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 50.69 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 48.33 s; par: 121 s. All kit simulation checks passed without warnings.

