# Stepped Ram

**Introduces:** Three adjacent pistons form a sequential handoff of one stone, with four stationary contacts. A piston cannot capture the stone from behind its origin; its predecessor must first deliver it to that boundary. The first live permission also locks its operator out of the return route.

## The intended solution

The cargo is initially at the far-right contact. The belt runs left, but the closed pistons prevent return. Each piston has its own operator. Retract all pistons to return the stone to the left contact. Then extend one piston at a time, in spatial order, pausing at intermediate contacts to collect the corresponding permissions. The required contact and gallery sequence is:

1. water crosses gate 1 with the stone at contact 1, and operates the next relay.
2. earth crosses gate 1 with the stone at contact 2, and operates the next relay.
3. fire crosses gate 1 with the stone at contact 3, and operates the next relay.
4. water crosses gate 2 with the stone at contact 4, and operates the next relay.
5. earth crosses gate 2 with the stone at contact 1, and operates the next relay.
6. fire crosses gate 2 with the stone at contact 2, and operates the next relay.
7. water crosses gate 3 with the stone at contact 3, and operates the next relay.
8. earth crosses gate 3 with the stone at contact 4, and operates the next relay.
9. fire crosses gate 3 with the stone at contact 1.

After the second gate has latched, Water must turn its first relay off again: leaving that permission live prevents Water from returning to its piston control. The other latches remember previous permissions. Finally all three collect their gems and enter their exits.

## Why each player is needed

Each player alone can reach its own piston control and gallery relays. All three pistons must retract to return the stone, and all three must extend sequentially to reach the far end. The single stone, the return belt, and the three controls are inaccessible from the other galleries. The idle-at-exit tests fail for every player.

## The insight

The belt returns the cargo in one direction; the pistons hand it forward in the opposite direction. Their order matters, not merely their final on/off configuration. Each intermediate stationary contact is a useful stage rather than something to skip. The first operator must relinquish an already used live permission before returning to control the cargo.

## Likely failures and recovery

Extending a later piston prematurely obstructs the handoff. Retract it and allow the preceding piston to complete its travel. If the wrong contact is selected, retract all three pistons and start the handoff again. If Water leaves its first relay on, it is stopped at the inverted return gate; turn the relay off from the same room after the next gate latches. All achieved permissions persist; no lethal terrain or timed crossings are required. The continuous physics state space has not been exhaustively searched.

## Shortcuts

Direct walking and retaining the first live permission fail in the actual engine. The latter stops Water at the inverted return gate. The two-player Tandem Ram also verifies premature piston closure and recovery; the extra piston here is driven by the same adjacent-door mechanism. Rock separates the galleries and seals the cargo chamber, preventing substitution or head-boosting.

## Kinship with the campaign

Battering Ram uses one sideways door to move cargo. Tandem Ram introduced an ordered two-piston handoff; this three-player development adds a third stage, four contacts and a permission which must be relinquished before the operator can return.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 38.48 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 97.62 s; par: 245 s. All kit simulation checks passed without warnings.

