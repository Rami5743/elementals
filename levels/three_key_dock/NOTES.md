# Three-Key Dock

**Introduces:** The ferry requires three separate power keys. Two operators cannot leave their own control rooms while their keys are active. Power must be relinquished to gain the permissions necessary for the return crossing.

## The intended solution

1. Fire operates the departure relay, giving Water, Earth and Air access to their motor keys. All three enable the ferry.
2. Fire jumps the two-tile gap onto the three-tile-wide platform during its 150-tick dwell and rides to the far bank.
3. All three operators release their keys. The workshop and the two inverted control-room gates open.
4. Fire enters the workshop, collects the gem and sets the far relay. Water sets the acknowledgment. Air can now reach its far permission; this combines with Water's acknowledgment to open Earth's next gate.
5. Earth sets the home permission. Fire returns to the far dock; all three operators return to their keys and restart the ferry.
6. Fire boards, rides back, and jumps from the platform during the left docking window.
7. Fire crosses the home gate and operates the final relay. Earth and Air release their keys again to leave their control rooms. Water's own motor key and the final relay latch its last gate.
8. All four collect their gems and enter their exits.

## Why each player is needed

Fire must physically cross the trench and obtain its remote permission. Water, Earth and Air each supply an indispensable motor input. Water's acknowledgment and Air's permission jointly release Earth, which in turn supplies the home permission. Every idle-at-exit test fails.

## The insight

The transport and access states cannot coexist. The three operators must stop the one shared machine to collect permissions and restore their earlier positions before restarting it. Earth and Air are literally trapped by their own power inputs and must relinquish them a second time after Fire has returned.

## Likely failures and recovery

Missing the boarding jump lands Fire in the safe trench. Its one-way ledges return Fire to the departure bank; wait for the next ferry stop. The docking dwell is 150 ticks, above the 90-tick motor minimum. Leaving Air's power key on traps Air at its own inverted gate; turn it off. Powering only two keys cannot move the ferry. Starting the motor while Fire is still in the workshop closes its entrance; release a key and wait for Fire to return to the dock. No lethal terrain is used. The two-player predecessor verifies recovery from a missed jump; the complete four-player physical state space has not been exhaustively searched.

## Shortcuts

Direct walking, retaining Air's power key, and crossing with only two motor inputs fail in the actual engine. The recovery ledges stay on the left; the right cliff is seven tiles high from the trench. Rock separates the galleries and the upper operators from each other.

## Kinship with earlier levels

Deadman Dock makes ferry power complementary to access; Relay Ferry adds a quorum and a trapped operator. Three-Key Dock adds another power input and a two-input acknowledgment: the three operators have distinct jobs in the return protocol.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 34.83 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 52.97 s; par: 133 s. All kit simulation checks passed without warnings.

