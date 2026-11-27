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

- [x] Design written.
- [x] level.json validates (generator: scratchpad gen_level.mjs; not kept in the repo).
- [x] solution runs.
- [x] `node kit.mjs check sash_weights`: No problems — solved in 39.4 s (par 100 s), 1/1 gems,
      co-op enforced both ways, two shortcut scripts fail for the intended reasons.
- [x] NOTES.md, meta.json (order 157, mind, ideas: first-grating-catches-the-counterweight,
      twist-backwards, twist-order); new key added to tools/ideas.mjs.
- [x] `node tools/novelty.mjs sash_weights`: PASS (invented).
- [x] `node tools/build.mjs` and `node tools/catalog.mjs` run.

## Done

Nothing left. Known accepted variant: both riding down and leaning into the first-floor slot as
the lift passes it also solves it (same insight, skips the walk back); see NOTES.md.
