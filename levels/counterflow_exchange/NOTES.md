# Counterflow Exchange

Batch-90: 11/90

**Introduces:** A belt speed between the two players' running speeds creates a directional barrier for Earth but not Fire. A single reversal swaps two complementary directional barriers while also moving the cargo that certifies the journey.

## The intended solution

1. Fire walks upstream through the low-ceiling belt to reach the reversal control. Earth cannot advance against the initial current.
2. Fire reverses all four belts. Earth's first passage now carries Earth left, and the isolated cargo travels left.
3. Earth reaches the first relay. Together with the left cargo contact it opens Fire's first gate.
4. Fire records the next relay, latching Earth's passage to the central safe island. Earth crosses to that island, but the second belt opposes Earth.
5. Fire returns to the control and undoes the reversal. The second belt now carries Earth left; the cargo returns right.
6. Earth reaches the next relay, which combines with the right contact to permit Fire's next advance.
7. Fire records Earth's final permission. Earth crosses the final gate and reaches the exit while the right contact is active.
8. Fire returns to reverse the system again. The left cargo contact and Earth's relay open Fire's final gate. Both gems are collected.

## Why each player is needed

Fire alone can advance against the initial current and owns the reversal control; Earth provides two independent relays in the other gallery. Both idle-at-exit simulations fail. The isolated cargo cannot be moved by either player.

## The insight

One switch does not open a route for everyone. At 2.9 px/tick the opposing belt beats Earth's 2.6 px/tick movement but not Fire's 3.2. The two Earth belts have opposite orientations; neither switch state lets Earth walk all the way. The cargo contact is an independent physical consequence of the same reversal and must be certified before the state is changed.

## Likely failures and how players recover

Trying the second belt before undoing the reversal fails; wait at the island and request the other current. Reversing prematurely can take Earth back toward the earlier bank, but the belts are reversible and the controller remains accessible. A recovery simulation deliberately reversed back after the first left delivery and then restored the correct direction, solving in 68.48 s. No precise timing or jumping is required, and no lethal terrain exists.

## Shortcuts that were closed

The attempts to cross the first belt against its initial current and the second belt without undoing the reversal both fail. The one-tile-high belt corridors prevent jumping over the directional barriers. Full-height gates, isolated cargo and separate galleries prevent bypasses.

## Kinship with the campaign

Upstream uses hopping to beat a belt. Here the ceilings forbid hopping and the speed difference is itself the selection mechanism. Treadmill uses a speed filter in a four-player level; this two-player puzzle combines complementary filters with a cargo-contact interlock. Reversing Signal changes a cargo's destination but does not simultaneously exchange which physical player passage is traversable.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 27.94 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 54.92 s; par: 138 s. All kit simulation checks passed without warnings.

