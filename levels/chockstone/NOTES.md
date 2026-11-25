# Chockstone

**Introduces:** a runaway boulder that only a body can stop, resting in the cell *uphill* of
whoever stands in its path — so a heavy plate hung over the walkway, where no body light enough to
be standing there can ever press it, is a lock whose only key is a stone held in place by a person
who had to be standing on the hill before it was ever loosed.

## The intended solution

1. **Water** walks down the hill and stops in the walkway cell directly under the hanging plate
   (its gem is on that tile, which is the hint). It is now below the stone's start, with its back
   to the slope.
2. **Fire** walks to the far left end of the top shelf, takes its gem and holds the **grip**
   (a hold button): on only while somebody is standing there pressing Interact.
3. **Earth** — the only one who can shift a boulder at all — walks into the stone and pushes it off
   the lip of the shelf onto the slope. It is gone the moment it tips: at 4 px a tick nothing in the
   game can catch it from behind.
4. Earth then walks the whole length of the shelf back to the **anvil**, a heavy plate only a mass-2
   body (or the stone itself) can hold down, and stands on it, taking its gem.
5. Meanwhile the stone has run down the hill and come to rest against Water, in the cell immediately
   uphill — which is where the **berth** plate hangs.
6. With berth, anvil and grip all on at once, the **wicket** at the bottom of the run latches open.
   It is the only way from the run into the exit hall, and it never shuts again.
7. Water steps aside and walks down. The stone follows it down the hill and runs out in the flat
   run, where it stays for good. Water carries on through the wicket to its door.
8. Fire lets go of the grip and Earth leaves the anvil; both walk down the hill, hop over the
   spent stone in the run, and take their doors.

## Why each player is needed

- **Earth** is the only element that can move a boulder a single pixel, so only Earth can loose the
  stone; and Earth is the only body heavy enough to hold the anvil down (mass 2 against a heavy
  plate the stone would otherwise have to sit on, and the stone is needed elsewhere).
- **Water** (or Fire — the two are interchangeable in the role, and the gems decide which) is the
  brake. The berth plate is heavy, so the body standing under it can never press it; the stone has
  to be stopped exactly there, and the only thing that stops a runaway is a body already in its way.
- **Fire** holds the grip. The wicket wants three contacts in the same instant and the brake cannot
  let go, so the third post needs a third body.
- Earth cannot be the brake, because the brake has to be on the hill *before* the stone is loosed
  and Earth is the one who looses it; and Earth cannot hold the grip, because then nobody holds the
  anvil.

## The insight

You cannot chase a runaway — you have to be standing in front of it before you let it go. And the
switch that wants the stone is hung where a person cannot reach it, so the stone must be stopped
under it rather than pushed onto it; which means the person who stops it is standing one tile below
the very switch they are closing, unable to press it themselves.

## Likely failures and how players recover

- **"Push the stone, then run down and stop it."** The stone holds 4 px a tick and the fastest
  element runs 3.4, so it can never be caught from behind. It runs out at the bottom of the hill.
  Recovery: Earth walks down and pushes it back up the slope to the shelf, which costs the better
  part of a minute but loses nothing.
- **"Stand on the hanging plate."** It is heavy: a light body cannot press it at all, and the cell
  it hangs in is one above the walkway anyway. Earth *can* press it by standing one tile further
  up the slope — but then nobody is on the anvil, and the wicket wants both.
- **Brake posted on the wrong tile.** The stone comes to rest one tile uphill of whoever stops it,
  so standing a tile too low or too high parks it beside the plate rather than under it. Stepping
  one tile uphill is not possible (the stone is in the way); stepping downhill looses the stone
  again, and then Earth has to walk it back up.
- Nothing in the level can be lost: the stone always rolls on the instant the brake moves, and Earth
  can always push it back up the hill.

## Shortcuts that were closed

- **The rolling pass.** Every plate on the stone's road is pressed for about eight ticks as it rolls
  over it, and the wicket latches — so in principle the berth could be satisfied in passing with no
  brake at all. It is blocked by distance: Earth has to walk the full length of the shelf from the
  lip to the anvil (about 150 ticks) and the stone is past the berth in about 70, so the anvil is
  never on while the stone is rolling. `shortcuts` has a script that pushes the stone and sprints
  for the anvil.
- **Earth as the brake.** Earth standing one tile up the slope from the brake's post presses the
  berth with its own body, but then the anvil is unheld. `shortcuts` has a script that tries it.
- **Climbing out of the run.** The run has a rock roof and the wicket reaches it, so the exit hall
  cannot be entered over the top.

## Kinship with the campaign

**Flash** (`l73_flash`) also rolls a boulder over a plate nobody can reach, but there the gate opens
for the moment the stone passes and the puzzle is to be ready for it. Here the passing press is
deliberately *useless* — the lock wants three contacts at once and the stone's eight ticks can never
line up with them — so the stone has to be brought to a standstill under the plate instead, by a
body that had to be posted on the hill before anything moved. **Headlong** (`headlong`, this repo)
is the nearest neighbour at three players: it is also about never being able to catch a runaway, but
its answer is to fall in front of the stone and its plate is pressed by the stone rolling past.
Chockstone's answer is the opposite — stop the stone and keep it stopped — and its brake is a person
standing one tile below a switch they are physically unable to press.
