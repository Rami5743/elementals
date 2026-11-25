# Afterbeat

**Introduces:** Two clocks first form an AND signal, but the exit needs the clocks to disagree: one must expire while the other still runs.

## The intended solution

1. Fire sets L0, opening Water's first passage.
2. Water sets L1; Fire crosses and sets L2.
3. Water crosses its second gate, sets L3, returns to turn L1 off, then returns to the far room.
4. Fire reaches the lift, goes down, sets L4, returns up, and turns L2 off. This releases Water's lift approach but closes the earlier route.
5. Both ride down to the lower galleries.
6. Water starts A (400 ticks); Fire starts B (440 ticks) 100 ticks later. Both signals latch the central doors. Fire runs left to the inverted A gate.
7. After A expires, Fire crosses it and the still-open B gate. The intended time between expirations is 140 ticks, above the 90-tick motor minimum. Fire sets the final lever.
8. Both enter their exits, collecting the gems.

## Why each player is needed

Fire controls the timed crossing and Fire relays. Water controls the earlier inversion and timer A. Rock separates their galleries; they cannot impersonate each other.

## The insight

A timer ending is the key. The clocks are a scarce resource with incompatible jobs: first record overlap, then allow a crossing only after one signal disappears. The upper switches also have to be undone.

## Likely failures and how players recover

Leaving earlier levers on blocks lift approaches; return to turn them off. Simultaneous starts leave only 40 ticks after A expires, and Fire stops at the last gate in the tested attempt. Offset B. Missing the final run is recoverable because the central doors latch and Fire can return to B for another attempt. The lifts repeat, and no lethal terrain is present.

## Shortcuts that were closed

Direct walking, leaving earlier levers on and simultaneous starts are tested; all fail. The final run is the sole intended time-pressure challenge. Full-height doors and rock-separated galleries prevent jumping or partner doorstop shortcuts.

## Kinship with the campaign

Clockwork asks players to align timed switches; Afterbeat asks them first to align and then deliberately to let one expire. The initial core tag shared generic words with Windlass, which stocks an airlock before it seals; here no cargo must be stocked, and the inverted timer expiry is an enabling condition, not a loss of access.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 123.35 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 56.02 s; par: 141 s. All kit simulation checks passed without warnings.

