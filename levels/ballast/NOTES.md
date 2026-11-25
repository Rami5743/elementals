# Ballast

**Introduces:** A pulley goes on counting the weight of whoever jumped off it until they land somewhere else — so a draught that stops you landing keeps the rope loaded with nobody aboard, and the way to hold the pan down while you leave it is to never touch the ground.

## The intended solution

1. Earth collects its gem in the hall and then leans on the first **bellows** plate. It is a heavy
   plate: mass 2 or more, so Earth and nothing else switches the **draught** on.
2. Water rides the draught up the shaft, peels out at the roof and lands on the gallery ledge.
3. Water walks left onto the **pan**, which rests flush with the gallery floor with the **boulder**
   standing on it. The rope reads the *sum* of what is on a platform: the boulder's 3 alone is less
   than the counterweight's 3.5, so the pan only sinks once a body steps aboard.
4. The pan grinds nine tiles down. The boulder settles over the **pad** — a heavy plate, which only
   the boulder is heavy enough to press — and two doors open at once: the **gate** eleven tiles
   above, and the **hatch** away along the hall.
5. Water waits on the pan. Earth steps off the first bellows, crosses the hatch, and stands on the
   second bellows beyond it. Crossing takes the draught with it for a few seconds, which is why
   this has to happen while Water is *standing* on the pan rather than flying.
6. With the draught blowing again, Water **leaps right off the pan**, across the void, into the
   column. The rope keeps counting Water all the way up: the boulder never leaves the pad and the
   gate never shuts.
7. Water peels out of the column through the open gate and lands on the strip beyond it.
8. Landing is what finally takes Water's weight off the rope. The pan rises, the boulder lifts off
   the pad, the gate shuts behind Water — and the **inner** door, which is inverted on the same
   wire, opens for the first time. Water walks on to its door.
9. Earth steps off the second bellows and walks into its own.

## Why each player is needed

- **Earth** is the only body of mass 2. Nothing lighter holds either bellows plate down — Water
  standing on one does nothing at all — so there is no wind in this level without Earth, and Earth
  is pinned in place for every second Water is in the air.
- **Water** is the only one the draught lifts: Earth's `fanFactor` is 0.15 and three tiles is all it
  ever manages. Water is also the tipping weight on the rope, and the only body that can be both
  the counterweight and the traveller, because only a body in flight is in two places at once.
- Neither can finish alone: Earth's hatch is opened by Water's weight nine tiles away, and Water's
  gate is opened by a boulder Water can never touch.

## The insight

You keep the switch pressed by **jumping off it**. Standing on the floor is the one state that
releases the rope, so the safe-looking move — stepping off the pan onto solid ground — is the
single thing that undoes the whole machine. And the second half of the insight is an ordering one:
the gate opening is *not* the cue to fly, because Earth still has to cross on the same wire, and
Earth cannot cross without turning off the wind you are about to need.

## Likely failures and how players recover

- **Flying the moment the gate opens.** Earth is still on the near side of the hatch, which shuts as
  soon as Water lands. Recovery: Water walks back through the inner door — it is open now, since
  the pan is up — drops down the return shaft at the far end of the gallery into the hall, and
  climbs again. A long loop, but nothing is lost.
- **Stepping off the pan instead of leaping.** Water drops into the void and lands in the hall; the
  rope lets go, the pan rises and the gate shuts while Water is still at the bottom. Recovery: climb
  the draught again and re-board. The pan always comes back to the gallery by itself.
- **Missing the leap into the column.** The void is three tiles of open air over a five-tile drop, so
  a short jump means a fall to the hall floor, not a death. Climb and try again.
- **Earth crossing too early or too late.** Too early and the hatch is simply shut; too late and
  nothing is lost at all, because Water can wait on the pan indefinitely.
- **Nothing in the level can be destroyed or dropped out of reach.** The boulder cannot be pushed
  (Water cannot move boulders, and Earth can never reach the gallery), the pan shaft is solid rock
  below the pan's bottom stop so nobody can be standing in its path, and the far gallery has a
  return shaft so it is never a one-way trap. A checkpoint stands on the landing strip.

## Shortcuts that were closed

All four are scripted in `solution.mjs` and `check` proves each one fails:

- **Water walks straight at the gate without boarding the pan** — the gate is shut whenever the pan
  is up, and the gate reaches the roof, so Water just hovers against it. (`water never landed while
  steering to 11`.)
- **Water flies the moment the gate opens, stranding Earth** — Earth gets as far as x=27.59 and
  stops at the closed hatch at x=28. (`earth could not reach x=30`.)
- **Water touches down in the hall and then goes for the gate** — landing hands the rope back, the
  pan rises and the gate is shut long before Water is up again. (`water never landed`.)
- **Water holds the bellows so Earth can ride the wind** — both plates are heavy and Water is mass
  1, so the draught never starts and nobody moves an inch.

Also checked by hand: the gate and the inner door both run from the roof to their sills, so nothing
can be jumped over; the pan is one berth wide plus the boulder, so nobody rides beside cargo; a
partner's head is no help, because the two are never on the same storey at the same time; and the
heavy pad cannot be pressed by Earth, because the only way into the pan shaft is the berth in the
gallery floor, and Earth can never get to the gallery.

## Kinship with the campaign

The nearest campaign level is **Slow Fall** (`l87_slow_fall`), where sinking slowly through a
draught buys your partner a bridge for as long as you are in the air. Ballast turns that inside
out: here being in the air does not buy *time*, it keeps your **weight** somewhere you no longer
are. In Slow Fall the draught is a clock; here it is a hand holding a rope down. **Keep It
Spinning** (`l88`) is the other neighbour — a machine that runs only while something is held — but
there the holder is a turbine you touch again, whereas here the holder is your own body, and the
only way to keep holding is to stop standing.

## Preparation and verification

Three facts were measured against `kit.mjs` before any tiles were laid, because none of them is in
`catalog/PHYSICS.md`:

1. **A jumper's weight stays on the rope until they land somewhere else.** A body rode a platform
   down (`d` 0 → 128 px), jumped off, and the rope's `ry` picked its weight up; `d` stayed at 128
   for all 540 ticks it hung in a strength-2.0 updraft.
2. **The rope releases the weight on landing, not on leaving.** Without the fan, the same jump
   landed on the floor and `d` immediately ran back, 128 → 83 in thirty ticks.
3. **A pulley platform does not press a plate.** A plate parked under a platform stayed `on=0`,
   which is why the pan's position is read through the boulder riding it rather than directly.

`check`: solved in 24.9 s against a par of 70 s, 2/2 gems, no deaths, no warnings, both co-op
necessity tests passing and all four shortcut scripts failing.
`node tools/novelty.mjs ballast`: **PASS (invented)** — `rope-keeps-the-jumper` is used by no other
level anywhere.
