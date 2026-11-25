# Counterflow Council

Batch-90: 17/90

**Introduces:** Three upstream couriers jointly control two complementary directional filters. The slow player must use one state for each passage, while a cargo token certifies the states independently.

## The intended solution

1. Fire, Water and Air each walk upstream through their low-ceiling belts and enable separate controls.
2. The three approvals reverse the complementary Earth belts and move the cargo left. Earth crosses the first belt and records a relay.
3. Fire, Water and Air independently certify the left-stage permission, releasing Earth to the central island.
4. Earth advances to the island. Water returns to withdraw its approval; Fire and Air leave theirs on.
5. The second Earth belt now points left. Earth crosses, the cargo returns right, and Earth records the next relay.
6. The three couriers separately certify the right-stage permission, releasing Earth to its exit.
7. Water returns to restore the missing approval. The cargo returns left.
8. The final left-position permissions open the three courier exits. All four collect their gems and exit.

## Why each player is needed

Fire, Water and Air each have a speed exceeding 2.9 px/tick, and each has an indispensable approval and two relay jobs. Earth runs at 2.6 px/tick, so it needs both current states to provide its two relays. The four idle-at-exit checks fail.

## The insight

A single speed filter is not the puzzle here: the two complementary filters cannot both allow Earth to proceed at once. The team must deliberately break its own quorum to exchange the two routes, and the cargo token must separately certify each state.

## Likely failures and how players recover

Trying either opposing belt as Earth fails at the belt. The intervening island is safe, and every current can be reversed again. A recovery simulation withdrew Water's approval after the first left delivery, allowed the cargo to return right, then restored the approval; it finished in 70.62 s. There is no timed input, lethal terrain or irreversible cargo operation.

## Shortcuts that were closed

Earth's attempts to cross the initial current and the second belt without undoing the first reversal both fail specifically at the corresponding belt. Low ceilings forbid hopping; barriers span their galleries and rock below the upper belts prevents inter-gallery substitution.

## Kinship with the campaign

Treadmill is a fixed speed filter: Earth takes an entirely different route beneath it. Here Earth crosses both filters by exchanging their directions, which simultaneously moves the certification cargo. Junction Council uses independent directions on a shared cargo track; Counterflow Council reverses several different player routes together. The novelty verdict is based on a genuinely different interaction of established mechanics rather than on a newly coined tag.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 36.65 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 54.92 s; par: 138 s. All kit simulation checks passed without warnings.

