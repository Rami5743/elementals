# Sash Weights — resume notes

**Design (two sentences).** A two-seat lift hangs on one rope against a counterweight that runs in
a sealed one-tile shaft through two one-way gratings, and the crate standing on the lower grating
stops the rising counterweight, so a lone rider from the top always stops at the upper landing,
short of the exits' floor. Two riders outweigh counterweight + crate, so the counterweight picks
the crate up and the lift goes to the bottom; when one steps off there, the crate rides the
counterweight back down and is caught by the FIRST grating it meets (the upper one), which lifts
the other rider to the exits' floor and from then on stops every lone rider there.

(Earlier drafts loaded crates at the foot of the shaft; dropped because a crate pushed in while the
counterweight was up sat under it for good. The shaft is now sealed: only the rope moves the crate.)

**Rope arithmetic** (pulley, counterweight ballast 0.5, Fire = Water = crate = 1): one rider on
the lift sinks it against the empty counterweight; one rider cannot sink it against a loaded
counterweight (1 < 1.5); two riders can (2 > 1.5); two crates on the counterweight never move.

**Intended solution** (verified in an abstract model of the rope: no dead states):
1. Both climb to the top landing. (A lone rider from the top stops at the upper landing: wrong.)
2. Both ride the lift down together: 2 > counterweight 0.5 + crate 1, so the rising counterweight
   lifts the crate off the lower grating and the lift goes all the way to the hall.
3. One steps off in the hall. The other (1) is now lighter than counterweight + crate: the lift
   rises, the counterweight sinks, the upper grating takes the crate off it, and the lift stops at
   the first floor: that rider walks into their exit.
4. The one in the hall climbs back to the top and rides down alone: the counterweight rises to
   the crate on the upper grating and the lift stops at the first floor again.

## Status

- [x] Design written (this file).
- [x] level.json validates (generator: scratchpad gen_level.mjs).
- [x] solution runs.
- [x] check passes: No problems, solved in 28.3 s (par 100 s). No shortcut scripts yet.

## Next

Shortcut scripts (a lone rider never reaches the first floor; slipping off the moving lift into a
landing slot; stacking from the lift at a landing). Consider a longer solve (aim 30 s+). Then
NOTES.md, meta.json, novelty, build, catalog.
