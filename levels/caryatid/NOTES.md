# Caryatid

**Introduces:** a lift that comes down only while something heavy is held at shoulder height in its
shaft, and that settles on whatever called it. A heavy plate hangs in the shaft one body above the
grating at its foot, so nothing standing on the grating reaches it. Something heavy on top of
something else does: Earth on a partner's shoulders,
Earth standing on the stone, or the stone riding on somebody's head. A lift never crushes, so it
stops on that load. The caller is always underneath it and can never be the one who rides.

## The map

- **Top hall** (rows 5–8): the three of you start here. The **lift** (two tiles wide) docks flush
  with the floor at x24–25. **Crate A** is just west of it and **crate B** is in the nook east of
  it. The **exit gate** (x6) stands over one tile of sludge, so nobody can stand under it. It wants
  both niche plates at once.
- **The stairwell** (x8–11): one-way ledges every two tiles, from the top hall down to the cellar
  and back. Only players use it.
- **The counterweight room** (x14–16): a one-tile room under a one-way hatch at x15 in the top hall
  floor. It holds the **counterweight**, a heavy plate that opens the **east door**.
- **The shaft** (x24–25) runs from the top hall down to a one-way **grating** at row 19, with a
  one-tile **pocket** under it. The **call plate** (heavy, two wide) hangs in the shaft at row 17,
  the row a second body standing on someone on the grating occupies. The **stone** starts on the
  east half of the grating.
- **The niches**, one tile above the lift's resting height on either side of the shaft. The **west
  niche** (x23) is one tile deep and has its plate in the mouth. The **east niche** (x26–27) has the
  **east door** in its mouth and its plate behind it.
- **The cellar** (row 18): a one-tile crawl from the foot of the stairwell to the grating.

## The intended solution

**Phase A: the first crate, the obvious way.**

1. **Fire** pushes crate A onto the lift's west half and hops over it onto the east half.
2. **Earth** goes down the stairs, through the cellar to the grating, and **climbs onto the stone**.
   Earth is now at shoulder height and presses the call plate. The lift comes down with Fire and
   crate A and settles on Earth's head, level with the niches.
3. **Water** follows Earth down and drops through the grating into the pocket underneath.
4. **Fire** pushes crate A off the west edge into the west niche, onto its plate. Fire stays aboard.
5. **Earth steps off the stone.** Nothing is at shoulder height any more, so the lift goes back up
   with Fire.

**Phase B: the second crate, with Earth needed somewhere else.**

6. **Fire** fetches crate B from the nook onto the lift's east half and stands on the west half.
7. The east niche is behind the east door, and only the counterweight opens it. Only Earth is heavy
   enough for the counterweight, and the stone cannot get there (see below). **Earth climbs the
   stairs and drops into the counterweight room.** The east door opens, and nothing now calls the
   lift.
8. **Water, in the pocket, walks under the stone and jumps up through the grating.** A crate or stone
   standing on a one-way grating is lifted onto the head of whoever jumps up under it. Water lands
   on the grating with the stone on its head, and the stone is at shoulder height. The lift comes
   down with Fire and crate B and settles on the stone.
9. **Fire** pushes crate B east through the open door onto the east plate, then hops back out of the
   doorway onto the lift. Both niche plates are pressed and the exit gate opens.
10. **Water walks west into the cellar.** The crawl's roof scrapes the stone off its head, and the
    stone drops back onto the grating. The lift rises with Fire.
11. Everyone goes home: Fire from the top, Water up the stairs, Earth out of the counterweight room
    last (its door is the nearest).

The recorded solution takes about 33 s; par is 90 s.

## Why each player is needed

- **Earth** is the only player who can hold the counterweight, and phase B cannot happen without
  it.
- **Fire** (or Water) has to ride the lift each time: a crate only leaves the lift if somebody
  aboard pushes it.
- **Water** (or Fire) has to carry the stone in phase B, because Earth is in the counterweight room
  and the rider is on the lift. Nobody else is left to be at the bottom of the call.

`check` confirms that the level cannot be finished while any one player waits in its door.

## The insight

The lift needs **weight on shoulders**, and the obvious weight is Earth. The level is solved when
you notice that the stone counts too, and that you can get it up there, by jumping under it on the
grating. Earth is wanted in two places at once, under the lift and on the counterweight. The stone
can only stand in for it in the first.

**Why the core is not Thermal Stair's.** `novelty.mjs` flags the core tag as close to Thermal
Stair's ("one-seat-lift-only-goes-up-so-ride-it-twice"), because both mention a lift. Thermal Stair
is about a draught that only lifts, ridden twice in an order. Here the question is what can summon
the lift, and the lift's resting place is decided by its caller.

## The design, against `difficulty.md`

- **Steps that depend on each other, across three states:** both crates up top → crate A in its
  niche → Earth on the counterweight with the door open → the stone on Water's head → crate B in its
  niche → the gate open.
- **Two mechanisms whose interaction is the puzzle:** the call plate (weight at shoulder height
  brings the lift down onto it), and the east door's counterweight (weight in a room far away).
  Only two things are heavy, and they are needed in both.
- **Interlock / cost:** whoever calls is pinned under the lift. Water can't leave the stone until
  Fire is back aboard, and Earth can't leave the counterweight until Fire is out of the doorway.
- **Counter-intuitive step:** standing under something so that a two-hundred-kilogram stone ends up
  on your head, and sending Earth, the heavy one, away from the lift that needs weight.
- **One resource, several claims:** Earth's weight, wanted under the lift and on the counterweight.
- **The order** is not on the map. Nothing says the stone can be carried, or which crate has to go
  first. Phase A is the one that can be done the obvious way.

## Likely failures and how players recover

- **Earth calls the lift for crate B as well.** The east door is shut and the crate stops at it.
  Earth steps off and the lift goes back up with the crate still aboard. Nothing is lost.
- **Leaving the stone lying under the lift.** On the grating it only reaches waist height and calls
  nothing. Jump under it from the pocket to pick it up.
- **Carrying the stone into the cellar.** The crawl's roof scrapes it off. Earth pushes it back
  along the cellar onto the grating, and it can be picked up again.
- **Fire, Water or a light tower under the lift.** The call plate is heavy, so the lift does not
  come. Earth hopping on the grating passes through the plate and drags the lift down while it is
  in the air. That is just Earth calling, with Earth still not on the counterweight.
- **Earth leaves the counterweight while Fire is still in the east doorway.** The door comes down
  and rests on Fire's head. Fire walks out from under it onto the lift; Earth goes back and the
  crate is pushed again.
- **The caller walks out while Fire is still pushing.** The lift rises with Fire and whatever crate
  is still aboard. Call it again.
- **A crate pushed onto a one-way hatch** (the stairwell's or the counterweight room's) is not lost.
  Jump up under it from below and carry it back, or push it off with Fire.

## Shortcuts that were closed

- **Earth calls the lift twice** (scripted: *Earth calls the lift for the second crate too*). Crate
  B stops at the shut east door, which only the counterweight opens.
- **A body holds the east door** (scripted: *Water holds the east door open with its body while
  Earth calls the lift*). Earth opens the door, Water stands in the doorway, Earth leaves the
  counterweight and calls the lift from the stone. The door rests on Water's head and Fire brings
  crate B down. The east niche is only two tiles deep, though: Water has to step back onto the plate
  to let the crate in, and then the crate can't reach the plate and Water is shut in behind it.
- **The stone on the counterweight.** The stone never leaves the bottom of the shaft. The cellar
  crawl scrapes it off a carrier's head. The shaft's only other way up is the lift, and a carrier
  with the stone is underneath it, not on it. Climbing into a niche first would take a jump with
  four pixels to spare. And even if the stone reached the top hall, a one-way hatch scrapes it off
  anyone who drops through, and Earth can't push it through.
- **A crate carried on someone's head into a niche.** A crate on a head comes down only under a low
  roof, and neither niche has one. A carrier standing in a niche presses the plate with its own
  feet, and has to leave it to go home.
- **A body holding the exit gate.** One tile of sludge under it.
- **A light tower calling the lift.** The call plate is heavy (`max(mass)`), so Fire on Water's
  shoulders calls nothing.
- **Pushing a crate off the lift while it is moving.** The lift never passes the niches uncalled.
  It comes down only while called, and stops on the caller exactly at niche height. With no call
  it goes straight back to the top.

## Kinship with the campaign

- **Jack** (two players) is the nearest: lifts never crush, so a crate slid under a sinking bridge
  holds it up. Caryatid turns that around. The thing under the lift is also what summons it,
  because the call plate is at shoulder height. So the question is no longer what to wedge under
  the lift. It is which heavy thing can be held one body up, and who is left to hold it.
- **Two High** (three players) carries a crate on Air's head after Earth pushes it off a shelf.
  Here the stone is picked up from a one-way grating by jumping under it. Being carried is how it
  gets to shoulder height, not how it travels.
- **Assay** lets a crate take Earth's place on a scale. Here the stone takes Earth's place under a
  lift, because Earth's weight is wanted on a different plate at the same time.
