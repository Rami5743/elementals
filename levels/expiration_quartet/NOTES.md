# Expiration Quartet

**Introduces:** A fourth operator must undo the early permissions before three overlapping clocks can become successive complementary crossing windows.

## The intended solution

1. Water sets its first relay. Air crosses and sets its first relay, opening Water's next passage.
2. Water sets its second relay. Earth reaches its first lever, allowing Air to reach its second lever. Air sets it.
3. Water returns and releases both earlier relays. Earth passes the two-part gate and sets its next lever. Air crosses its inverted gate and operates the far relay. Both signals give Fire access to its lower relay.
4. Fire sets the lower relay, arming the timer approaches. Air returns to release its original relay. Water and Earth now reach their timers, while Fire returns to timer A.
5. Fire starts A. Water starts B 210 ticks later, and Earth starts C another 210 ticks later. All last 600 ticks. Their overlap latches the two preparation gates.
6. Fire waits for A to expire, crosses its inverted gate and the live B gate. Water waits for B to expire, crosses its inverted gate and the live C gate.
7. Fire and Water set their final relays. Earth can renew C if necessary, crosses its final latch, and sets the final lever which releases Air. All four collect their gems and reach their exits.

## Why each player is needed

Air operates the upper interlock and relinquishes a permission so Water can reach B. Fire and Water use distinct expiry windows. Earth supplies the last clock and opens Air's final exit. Every idle-at-exit check fails.

## The insight

The early permission has to be relinquished, not merely accumulated. The three clocks must then overlap once, but subsequently disagree in a particular order. Starting them simultaneously destroys the two intended 210-tick windows.

## Likely failures and how players recover

The forward route is blocked until the upper relays are undone. Return to the earlier levers. Starting all clocks together prevents the timed crossing; the preparation doors latch, so the relevant clocks can be started again while their complement is off. All floors are solid. Two motor windows are intended, each longer than 90 ticks. Recovery for arbitrary physical states has not been exhaustively tested.

## Shortcuts that were closed

Direct walking, leaving old relays on, and simultaneous starts fail in simulation. Solid separators prevent substitution between galleries. All doors reach the ceiling.

## Kinship with the campaign

Clockwork uses simultaneous timer operation. Here the overlap records permission, while subsequent expirations create successive traversal windows. This is a four-player development of Phase Canon with a fourth, independent permission operator.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 48.35 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 41.20 s; par: 103 s. All kit simulation checks passed without warnings.

