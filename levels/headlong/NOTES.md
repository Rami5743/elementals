# Headlong

**Introduces:** a runaway nobody can overtake, and a shaft that only opens at the instant it is
loosed — so the only way to get in front of the stone is to throw yourself down the hole after it.

## The design, before any JSON (milestone 1)

### The core, in one sentence

A rolling stone goes 4 px a tick and nobody runs faster than 3.4, so the stone can never be caught
from behind — and the one switch that looses it is also the one that opens the dive shaft, so the
only way to be standing in front of the stone is to jump down the hole the moment it goes.

`core` tag: `the-only-way-in-front-of-the-stone-is-to-dive-after-it`

`ideas`: `dive-ahead-of-the-runaway` (coined), `shared-switch-two-gates`, `twist-setup`,
`object-as-permanent-switch`.

### Measured facts this is built on

Probed against `kit.mjs` before designing:

- A `rolls: true` boulder accelerates to exactly **4.00 px a tick** after about two tiles of slope
  and holds that speed for the rest of the slope.
- On the flat it decelerates 0.08 px a tick² and **runs out 3.1 tiles**, then stops dead.
- Earth walks down a slope at its normal 2.57 px a tick, so it falls steadily behind the stone.
- Nobody runs faster than Air at 3.4, so **once the stone is rolling, it cannot be overtaken.**

### The shape

Three storeys, stacked, with one machine linking them:

- **Top gallery** (west, high): the turbine (Air only), the stone's pen part-way down the head of
  the ramp, and the hatch over the dive shaft.
- **The ramp**: a long slope running down and east from the pen to the trench.
- **The trench** (the ramp's foot): a heavy plate, two tiles of standing room beyond it, and then a
  hole in the floor.
- **The bay** (below the trench): the three exits behind a gate, and the long return ramp back up
  to the top gallery. The stone starts here.

The dive shaft drops from the top gallery straight into the trench, and has **water** in it: Water
falls through unharmed and nobody else can use it at all.

### Each player's job, and why nobody else could do it

- **Earth** — hauls the stone out of the bay, all the way up the return ramp, and parks it in the
  pen. *Only Earth can push a boulder at all* (measured: Fire pressed into one for 600 ticks and it
  did not move). This is the long setup, and it has to be redone after every miss.
- **Air** — touches the turbine. A turbine answers to **Air only, wherever it is placed**, so this
  cannot be faked by height, a head-stack or a crate. Touching it opens the pen *and* the hatch at
  the same instant: Air starts everyone's clock.
- **Water** — the brake. Water dives down the shaft and stands in the stone's path, which stops it
  on the plate. *Only Water can go down the shaft*, because there is water in it; and Earth and Air
  would die in it. Water is also too light (mass 1) to hold the heavy plate, so Water cannot stand
  in for the stone.

### The forced order, and why it is not readable off the map

1. Earth hauls the stone up the return ramp, through the gallery, and lets it onto the ramp head,
   where it rolls down of its own accord and parks against the pen door.
2. Water and Air climb to the top gallery too — **all three have to be up there**, because the
   trench cannot be entered until the hatch opens, and the hatch opens only with the pen.
3. Air touches the turbine. The pen door and the hatch open together.
4. The stone takes the ramp at 4 px a tick.
5. Water goes down the hatch *immediately* and lands in the trench ahead of it.
6. The stone arrives, runs onto the plate, and is stopped by Water standing beyond it.
7. The plate (heavy, not latched) holds the exit gate in the bay open for as long as the stone sits
   on it.
8. Earth and Air walk down the ramp; Water drops through the hole in the trench floor; everybody
   finishes in the bay.

What is not readable: that step 2 is a step at all. The natural plan is to leave somebody down in
the trench to catch the stone, and the map does not say out loud that there is no way down there
until the stone is already gone.

### The twist — the counter-intuitive step

You have to let the stone go **before** you can get in front of it, and then jump off a cliff into
its path. Walking down the ramp behind it is the safe-looking move and it never, ever works: the
stone is faster than anybody and it has an eight-tile head start on the only route that looks like
a route.

### The interlock

Loosing the stone is the only way into the trench, and the trench is a one-way drop: its floor has
a hole that lets out into the bay, and nothing climbs back up from the bay except by the long
return ramp. So a miss costs the whole haul again — Earth down to the bay, stone up the ramp,
everybody back to the top.

### One resource, several claims

One stone. It is the only mass-2-or-more thing in the level, so it is the only thing that can hold
the heavy plate; it is also the thing that has to be hauled; and it is the thing whose release is
the only key to the trench. Every claim on it runs through the same single run down the ramp.

### Two plausible wrong plans, and why each fails

1. **"Leave Water down in the trench to catch it."** There is no way into the trench before the
   stone goes: the ramp head is behind the pen door, the hatch is shut, and the hole in the trench
   floor only lets out. One sentence: *the door that looses the stone is the only door into the
   room it runs into.*
2. **"Let it overrun, then push it onto the plate by hand."** An unbraked stone runs 3.1 tiles past
   the ramp's foot, which puts it through the hole and back into the bay — and the bay is two tiles
   below the trench, so a pushed stone can never get back up there. One sentence: *the only tile
   the stone can ever be placed on is the plate, and only a moving stone can get there.*

### The motor challenge, stated plainly

One precision moment, and it is the whole level: **from the tick Air touches the turbine, Water has
to get to the hatch, drop through it, and be standing in the two-tile pocket beyond the plate before
the stone finishes the ramp.** The fall is faster than the ramp, so the margin is real but not
cruel — a prompt dive wins by a comfortable margin, a hesitation loses. The landing pocket is two
tiles wide, not one. The attempt repeats forever: a missed stone goes back to the bay, Earth hauls
it round, everybody tries again. Nothing can be lost and nobody can die doing it.

### Fairness

- The pocket Water has to land in is **2 tiles** wide.
- The hatch is held open by Air for as long as Air stands on the turbine, so there is **no short
  door window** to run — the only clock is the stone, which players can see coming.
- A miss costs time (the haul again), never the level, and never a death.
- The dive is legible before it is attempted: standing on the gallery you can see the shaft, the
  trench, the plate and the stone's ramp all at once.

## Why each player is needed

(see "Each player's job" above — Earth is the only thing that moves a boulder, Air is the only
thing a turbine answers to, Water is the only thing that survives the shaft and the only one light
enough not to be able to cheat the plate.)

## The insight

The stone is loose before you can be in front of it, so the dive has to be part of the plan, not a
reaction to it.

## Likely failures and how players recover

- *Water dives late.* The stone runs past the pocket, drops through the hole, lands in the bay.
  Earth hauls it up the return ramp again. Nothing is lost.
- *Water dives too early, before Air touches the turbine.* Impossible — the hatch is shut.
- *Earth pushes the stone off the plate afterwards.* It falls through the hole into the bay; haul it
  up again.
- *Somebody walks down the ramp instead of diving.* They arrive after the stone; the stone is
  already in the bay. Haul it up again.

## Shortcuts that were closed

(filled in as each is scripted and proved — see `shortcuts` in solution.mjs)

## Kinship with the campaign

Nearest campaign level: **Flash** (`l73_flash`) — a boulder rolled over a plate nobody else can
reach, opening a gate for a moment. There the stone's roll *is* the window and the players wait
beside the gate; here the stone's roll is the thing you have to beat to a place you cannot already
be, and the stone has to be stopped dead on the plate rather than merely pass over it. **Ferry**
(`l67_ferry`) and **Hoist** (`l72_hoist`) also roll a stone down a slope, as transport and as a
weight; neither makes the stone something you have to get ahead of.
