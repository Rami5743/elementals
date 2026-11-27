# Sash Weights — resume notes

**Design (two sentences).** A lift hangs on one rope against a counterweight that runs in its own
narrow shaft through two one-way gratings; anything riding the counterweight down is set down on
the first grating it meets, and a crate left there stops the counterweight — so the lift opposite
stops at the matching floor, both ways. Fire's exit is on the first floor and Water's on the
second: the first crate has to be hoisted up the counterweight shaft (both ride the lift down
together) and dropped back so the upper grating catches it, and only then does it stop the second
crate's ride halfway so that the lower grating catches that one — which needs Fire to come back
out of their own exit to be the second rider.

**Rope arithmetic** (pulley, counterweight ballast 0.5, Fire = Water = crate = 1): one rider on
the lift sinks it against the empty counterweight; one rider cannot sink it against a loaded
counterweight (1 < 1.5); two riders can (2 > 1.5); two crates on the counterweight never move.

**Intended solution** (verified in an abstract model: 17 moves, no dead states, impossible with
one crate):
1. Push crate A onto the counterweight pan (at the bottom, in the hall).
2. Both climb to the top landing and ride the lift down together: the counterweight hoists A to
   the top of its shaft.
3. One steps off at the bottom; the other rises: A comes down, is caught by the upper grating and
   pins the lift at the first floor. (Whoever rose drops back to the hall if it is not Fire.)
4. Push crate B onto the counterweight. Both ride the lift down again: B rises until A (on the
   upper grating) stops it, so the lift stops at the first floor.
5. Fire steps off into the first-floor exit; Water, alone, is lighter than B: B goes back down,
   the lower grating catches it, and Water is lifted to the second floor.

## Status

- [x] Design written (this file).
- [ ] level.json validates.
- [ ] solution runs.
- [ ] check passes.

## Next

Write the generator (scratchpad), build level.json, probe: lift flush at each stop; a rider cannot
slip into a landing's one-tile slot while the lift passes.
