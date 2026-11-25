# Relay Ferry

**Introduces:** The ferry requires two motor keys. Transport power closes the workshop gate, and one of the operators is also trapped in its own control room while its motor key is on.

## The intended solution

1. Fire operates the departure relay. Water and Earth gain access to their motor keys and turn both on.
2. Fire jumps aboard at the left docking window and rides to the far bank. The ferry is three tiles wide, the takeoff gap two tiles, and the dwell 150 ticks.
3. After Fire lands, both motor operators release their keys. The workshop gate opens, and Earth can leave its own control room.
4. Fire reaches its far relay and collects its gem, allowing Water and Earth to advance. Water operates the acknowledgment relay.
5. Earth reaches the home permission, operates it, then returns to its motor key. Fire leaves the workshop and returns to the dock. Water returns to its own key.
6. Both operators restart the ferry. Fire boards at the far dock, rides back and jumps off at the left stop.
7. Fire crosses the home gate and operates the final relay. Water's final gate requires its motor key and the relay. Earth can finally turn off its own key and leave the control room.
8. All three collect their gems and reach their exits.

## Why each player is needed

Fire crosses the actual trench and supplies the remote permissions. Water and Earth must both power transport. Water's acknowledgment lets Earth reach the home permission; Earth cannot leave its control room while its key is on. All three idle-at-exit tests fail.

## The insight

The operators have to relinquish power to obtain the permissions needed for the return trip, and one cannot leave at all until the ferry has arrived. The transport and access states cannot coexist. In the last phase Earth has to turn its motor key off again after Fire is safe.

## Likely failures and how players recover

- Missing a boarding jump drops Fire into a solid-bottomed trench. The one-way ledges at x=9..11 return Fire to the departure bank. The ferry repeats its trip; wait for the next 150-tick stop.
- Leaving Earth's motor key on traps Earth behind its inverted control-room door. Switch it off after Fire lands.
- Starting with only Water's motor key does not move the ferry. Both keys are needed. If the keys are restored too early and Fire is still behind the workshop gate, release either key.
- The safe trench and latched permissions make retries possible. The full three-player recovery state space was not exhaustively tested; the two-player precursor verifies falling into the trench and returning to the bank.

## Shortcuts that were closed

The direct path, leaving Earth's key on, and powering only Water's key fail in the actual engine. The right cliff is seven tiles high; the recovery ledges are confined to the left bank. Rock isolates the operators' galleries.

## Kinship with the campaign

Catch the Lift uses a short boarding window. Deadman Dock made transport power complementary to workshop access. Relay Ferry adds a quorum for the motor and a power operator trapped by its own key, who must deliberately give up that position to obtain the next permission.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 34.29 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 58.07 s; par: 146 s. All kit simulation checks passed without warnings.

