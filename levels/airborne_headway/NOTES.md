# Airborne Headway

Batch-90: 78/90

**Introduces:** the useful path opens onto a conveyor faster than a player's ground speed, so jumping rather than walking is the way upstream. Reversing the conveyor makes the return trip another upstream journey.

## The intended solution
1. Water authorizes Earth to reach the pulse console.
2. Fire takes position at the inlet; Earth launches the cargo and opens both passage gates.
3. Fire hops repeatedly against the current, clearing the eastern outlet before the pulse expires.
4. Fire records the east certificate and collects the gem. The cargo's far contact and certificate authorize Water's first gate.
5. Earth must let the clock expire and the cargo return; only then can Water reach the eastern selector.
6. Water reverses the belt, trading the old direction for the opposite one, and collects the gem.
7. Earth relaunches the clock. Fire hops back west against the reversed conveyor and operates the home certificate.
8. Fire and Water can now leave; the home contact and both certificates authorize Earth's last chamber and exit.

## Why each player is needed
Water controls the launch authorization and the belt selector, Earth controls the reusable timed passage, and Fire alone can traverse the separated conveyor gallery and obtain its two certificates. The other galleries cannot reach these controls.

## The insight
A floor can itself be the obstacle: the moving floor wins against walking but has no influence on an airborne player. The far and home cargo positions separate the two phases. The second phase reverses the belt so that simply turning around does not make the journey easy.

## Likely failures and how players recover
The two timed crossings are the only precision moments. Each pulse is 650 ticks; the successful delayed replay waits 90 additional ticks at each entrance. Missing either pulse is recoverable by another launch: both waiting banks are safe and the console remains accessible. Recovery replays deliberately skipped the entire first and second pulse separately and completed in 57.28 and 57.28 seconds. The conveyor is continuous and has safe floor under it, with no lethal gaps or expendable objects. The powered gates can be reopened even when a player is between them. The hopper has ample ceiling and no small landing targets. The delayed replay completed in 46.43 seconds. Arbitrary movement is not exhaustively tested.

## Shortcuts that were closed
Walking continuously against the initial or reversed current fails; omitting the second pulse also fails. Full-height doors prevent jumping over either gate. Separate rock galleries prevent substitution.

## Kinship with the campaign
Sorting Yard uses conveyors to route cargo. Counterflow Quorum at three players uses different walking speeds and a roof to prohibit hopping, whereas here everyone is slower than the conveyor and the intended way past is to leave its surface, twice. The existing hop-beats-belt idea is unused at three players; it interacts with a cargo clock and reverses its direction in the second phase. No new vocabulary is necessary.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 14.39 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 46.43 s; par: 117 s. All kit simulation checks passed without warnings.
Recovery and 90-tick delay runs verified with the same engine.
