# Sash Weights (`sash_weights`) — Fire + Water

**Introduces:** a counterweight that drops its load on the first grating it meets. The two-seat
lift on the right hangs on one rope against a counterweight running in a sealed one-tile shaft on
the left, through two one-way gratings. Whatever rides the counterweight down is put off on the
first grating it passes, and the crate standing on a grating stops the rising counterweight — so
the lift opposite stops at the matching floor. Nobody can ever touch the crate: the only way to
move it is to out-weigh it.

The rope (pulley; the counterweight pan carries a ballast of 0.5; Fire, Water and the crate each
pull 1):

| on the lift | on the counterweight | what happens |
|---|---|---|
| nobody | ballast | the empty lift goes back up to the top landing |
| one rider | ballast, crate on a grating | the lift comes down until the counterweight meets the crate: 1 ≥ 0.5 + 1 is false, so it is held there — the lift stops at the matching floor |
| two riders | ballast, crate on a grating | 2 > 0.5 + 1: the counterweight lifts the crate off its grating and the lift goes all the way to the hall |
| one rider, in the hall | ballast + crate, at the top | 1 < 1.5: the counterweight sinks, the first grating takes the crate off it, and the lift rises to that grating's floor |

The crate starts on the lower grating, whose floor is the upper landing (row 11). The exits are on
the first floor (row 15), opposite the upper grating.

## The intended solution

1. Fire climbs the one-way ledges on the right to the top landing and steps onto the lift. Alone,
   Fire rides down only to the upper landing: the crate on the lower grating holds the
   counterweight. Fire walks in for the gem (it can only be had now, while the crate is still
   there).
2. Stepping off sends the empty lift back to the top. Fire drops down the tube to the hall and
   climbs again; Water climbs behind.
3. Fire rides down alone again and stops at the upper landing. Water drops down the lift shaft
   from the top landing onto the lift beside Fire.
4. Two riders outweigh counterweight and crate: the counterweight lifts the crate off its grating
   and carries it to the top of its shaft, and the lift takes them both down to the hall.
5. Water steps off in the hall. Fire, alone, is lighter than counterweight + crate: the lift rises,
   the counterweight sinks, and the FIRST grating it meets — the upper one — takes the crate off
   it. The counterweight is held under the crate and Fire stops at the first floor, and walks to
   their exit.
6. With Fire off, the empty lift goes back to the top. Water climbs again and rides down alone:
   the counterweight now meets the crate on the upper grating, so the lift stops at the first
   floor. Water walks into her exit.

Recorded: 39.4 s, par 100 s.

## Why each player is needed

- The crate has to move up one grating, and only two riders outweigh counterweight + crate. One
  player alone never gets the lift below the upper landing.
- Moving the crate needs both on the lift and then one *off* it at the bottom while the other
  stays aboard: the one who stays is carried to the first floor, the one who got off has to come
  round again. Neither can do both halves.
- The roles are interchangeable (either can be the one who stays aboard); the gem decides that
  Fire rides alone first.

## The insight

You cannot touch the crate; you can only out-weigh it. Riding the lift *down* is what sends the
crate *up* the counterweight's shaft, and getting *off* is what lets it fall back — onto the first
grating it meets, which is one higher than where it started.

## Likely failures and how players recover

- **Each rides down alone.** Both stop at the upper landing, short of the exits. Stepping off sends
  the empty lift home; the tube from the upper landing leads back to the hall. Costs a climb.
- **Both ride down and both step off in the hall.** The crate still comes down onto the upper
  grating (counterweight and crate outweigh the empty lift), the lift returns to the top, and each then rides
  down alone to the first floor. Slower, but correct — no harm done.
- **Both ride down again after the crate is on the upper grating.** Two riders lift it off again
  and the lift goes to the hall; one steps off and it is caught on the upper grating once more.
  The crate can never go back down to the lower grating, so nothing is lost.
- **Moving the crate before Fire has the gem.** The upper landing can no longer be reached (the lift
  now stops below it), so the gem is gone. That costs the gem star, never the level.
- There is no state the level cannot be finished from: an exhaustive search of an abstract model of the rope (players,
  crate, counterweight position) found none.

## Shortcuts that were closed

- **Ride the lift alone and hope** — scripted in `solution.mjs` ("each rides the lift down alone"):
  both end up at the upper landing.
- **Climb a partner to the first floor** — the first floor's drop hole is 4 rows above the hall
  floor; a jump from a standing partner's head peaks at 3.6 (measured). A jump off a partner who is herself jumping goes higher and
  might get one player in early, which is harmless: the other still needs the crate moved, which
  takes two riders, so whoever got in has to drop back out through the same hole. Scripted
  ("Fire double-jumps off Water's head at the drop hole; Water rides the lift alone"): Water still
  stops at the upper landing.
- **Push the crate** — impossible: the counterweight shaft is sealed rock. (An earlier draft loaded
  crates at the foot of the shaft; a crate pushed in while the counterweight was up sat under it for
  good, so the shaft was closed.)
- **Board the lift while the crate is on it** — the crate is never on the lift.
- The landings are one-tile slots, so nobody jumps from the lift into a higher landing, and the
  landings are 4 rows apart: a jump from a partner's head on a stopped lift (3.6) falls short.

**Accepted variant:** when both ride down, holding toward the first floor all the way slips one
rider into its slot as the lift passes it. That works for the same reason as the intended
solution — one rider leaves while the crate is up, so the crate comes back down onto the upper
grating and the lift returns the other to the first floor — and needs no timing (leaning too early
slips into the upper landing instead, which just puts the crate back where it was). It skips the
walk back from the hall, not the idea, so it is left in.

## Kinship with the campaign

Nearest: **Dumbwaiter** (`l46_dumbwaiter`) — a lift carries a boulder past a one-way ledge and the
ledge keeps it. Here the load rides the *counterweight*, the side nobody can reach, and it is kept
on the way *down*; what it then does is stop the counterweight, which sets the floor the lift
stops at. Moving it is done by weight alone: riding the lift down together lifts it, and stepping
off lets it fall onto a higher grating than it came from. Among this repo's 2-player rope levels
(Ratio Exchange, Ballast, Steelyard, Half-Unit Escrow) the rope arithmetic is a tool here, not the
puzzle; nothing there has a grating in the counterweight's path.

The idea is new to the vocabulary: `first-grating-catches-the-counterweight`
(`node tools/novelty.mjs sash_weights`: PASS, invented).
