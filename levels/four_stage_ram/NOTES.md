# Four-Stage Ram

**Introduces:** Four adjacent pistons make a serial mechanical handoff of a single stone. Five stationary contacts serve different requests. The return belt permits resetting the entire register, but a previously issued live permission has to be relinquished to allow a piston operator to return.

## The intended solution

The cargo starts at the far-right contact. Retract the pistons to let the belt return it left. Extend one piston at a time, in spatial order, to reach the requested contact. A later piston cannot push a stone which is behind its origin. The successive gallery permissions are:

1. water crosses gate 1 with the stone at contact 1, and operates the next relay.
2. air crosses gate 1 with the stone at contact 2, and operates the next relay.
3. earth crosses gate 1 with the stone at contact 3, and operates the next relay.
4. fire crosses gate 1 with the stone at contact 4, and operates the next relay.
5. water crosses gate 2 with the stone at contact 5, and operates the next relay.
6. air crosses gate 2 with the stone at contact 1, and operates the next relay.
7. earth crosses gate 2 with the stone at contact 2, and operates the next relay.
8. fire crosses gate 2 with the stone at contact 3, and operates the next relay.
9. water crosses gate 3 with the stone at contact 4, and operates the next relay.
10. air crosses gate 3 with the stone at contact 5, and operates the next relay.
11. earth crosses gate 3 with the stone at contact 1, and operates the next relay.
12. fire crosses gate 3 with the stone at contact 2.

After the second gate is recorded, Water must release its first relay. Otherwise its own inverted return gate prevents its return to the piston. The other latches preserve their earlier permissions. All four finish after collecting their gems.

## Why each player is needed

Each of the four controls belongs to a distinct gallery. All four are needed to retract the register and to reach the rightmost contact in sequence; every gallery also supplies indispensable relay permissions. The cargo is sealed away. All four idle-at-exit tests fail.

## The insight

The pistons are not interchangeable switches. Their physical order creates a handoff constraint: the next piston must be retracted when the preceding piston delivers the stone. The left-running belt resets the one shared resource, and releasing the first live permission is necessary to reuse the corresponding operator.

## Likely failures and recovery

Premature closure of a later piston obstructs the handoff. Retract it to resume the preceding extension. If the cargo reaches the wrong stop, retract the pistons and reset the sequence. Keeping the first relay live traps Water behind the inverted gate; undo it after the next permission latches. All completed permissions persist, there is no lethal terrain, and no timed crossings or precise jumps are required. Continuous physical states have not been exhaustively enumerated.

## Shortcuts

Direct walking and retaining the first live permission fail in simulation, the latter at the inverted return gate. The two-player precursor Tandem Ram verified a premature-piston jam and recovery for the same adjacent-piston mechanism. Here the number of actuators and contacts is extended. Rock isolates the cargo and separates the galleries, and vertical gates reach their ceilings.

## Kinship with earlier levels

Tandem Ram and Stepped Ram develop a sequential ram from two and three pistons; Four-Stage Ram adds a fourth actuator, five contact positions and a new request sequence. Unlike Dispatch Clock, each required contact is stationary, not a timing pulse.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 32.67 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 112.43 s; par: 282 s. All kit simulation checks passed without warnings.

