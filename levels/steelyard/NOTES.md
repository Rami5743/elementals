# Steelyard (2 players: Fire + Earth)

**Introduces:** a weighing beam used as the only route between three storeys, where **you rise by
what is taken off your pan, never by what is added** — the stone has to be loaded onto your own pan
to send the far one up to the storey where it can be loaded at all, and shed off again before your
pan will carry you anywhere.

The beam is a `seesaw` six tiles wide in a central shaft: two three-tile pans, rigidly coupled, the
heavier one four tiles down and the lighter four tiles up. Each of its three positions is flush
with a floor — **gallery (row 11), hall (row 15), cellar (row 19-ish)** — and the two pans serve
opposite sides of the shaft, so the hall and the cellar belong to the near pan and the gallery that
Fire starts in belongs to the far one.

Weights: Fire 1, Earth 2, a crate 1, the stone 3.

## The intended solution

1. The beam starts **dead level** — both pans empty, flush with the hall floor, a six-tile bridge
   over the shaft. Nothing can be put on the far pan while it is down here with everything else.
2. **Earth rolls the stone** out of the hall onto the near pan. Three against nothing: the near pan
   sinks four tiles into the cellar, carrying Earth and the stone with it, and the far pan rises
   four tiles to the gallery floor, where Fire has been waiting with nothing to push it onto.
3. Earth hops off (the stone alone holds the pan down, so the ride is not lost), fetches the gem at
   the foot of the west stair, comes back along the cellar floor **under** the pan and jumps aboard
   from its far side.
4. **Fire pushes the crates west onto the far pan**, nearest one first. Earth and the stone weigh
   five, so three crates and Fire together — four — never move the beam: Fire can load in peace.
5. **Earth hops over the stone and shoves it off the west end of the pan.** It drops two tiles onto
   the heavy pad on the cellar floor, which unlocks the gate in front of Earth's own door. And the
   pan Earth is standing on, now carrying two against the crates' three, **rises to the gallery**.
6. The three crates, each on its own stud under the far pan's berth, have unlatched the chute out of
   the gallery. Earth walks west to the gem and its door; Fire walks east and drops down the chute
   into its own, at the bottom of the cellar corridor.

Par is 7200 ticks against a 28-second solution.

## Why each player is needed

- **Earth** is the only one who can shift the stone (measured: Fire presses into a boulder for
  hundreds of ticks and it does not move a pixel), and the stone is the only ballast that raises the
  far pan to Fire. Earth is also the passenger: the gallery it finishes in is four tiles above the
  hall floor, which beats a jump from a partner's head.
- **Fire** is the only one who can be at the gallery at all. Earth can never get there before the
  lift, and the far pan can only be loaded by somebody standing level with it. The crates have no
  other hands.
- Neither can substitute for the other on the pad, either: the pad is heavy, so Fire's 1 is not
  enough, and Earth's 2 is — which is exactly why Earth cannot be the one holding it at the end.

## The insight

**The beam counts the sum, and you are part of it.** Loading the stone is what sends the far pan up
to be loaded; unloading the same stone is what sends your own pan up with you on it. Two crates
weigh precisely what Earth weighs and only bring the beam level; it takes the third to tip it. And
the stone's weight, which was a counterweight on the beam, is a *lock* on the pad — because a plate
reads the heaviest single thing on it, never the sum, so nothing the two of them can arrange will
hold that pad except the stone.

## Likely failures and how players recover

- **Shoving the stone off before Fire has loaded the crates.** The pan stays in the cellar (Earth's
  2 still beats nothing), so nothing is lost; but the far pan is now only as high as the balance
  allows, and the crates have to come down to it. Earth can walk the stone back under the pan, and
  the beam can always be re-levelled by taking everything off it — with both pans back at the hall
  floor, the stone can be rolled on again.
- **Taking the crates out before Earth is aboard.** Harmless: Earth and the stone outweigh any
  number of them, and the far pan stays at the gallery while the stone is down.
- **Walking off a pan.** The cellar floor is two tiles below the pans and runs the whole width of
  the shaft, so a fall costs a climb, never a route: the west stair joins the cellar to the hall in
  two-tile steps, and anything shoved off a pan lands on that flat floor where it can be pushed
  anywhere, jams nothing, and is never out of reach.
- **Fire leaving the gallery early.** The chute is latched shut until all three studs are pressed,
  so the only way down is the one that cannot strand the level.

## Shortcuts that were closed

Each of these is a script in `solution.mjs`; `check` fails if any of them finishes the level.

- **Earth holds the heavy pad itself.** It is heavy enough — but then it is not on the pan, and the
  crates lift an empty pan to a gallery Earth cannot follow it to. (`check`: level not completed.)
- **Fire shifts the stone instead.** Fire drops off the gallery lip, walks the cellar and the hall,
  and leans on the stone for two thousand ticks. It does not move. (`check`: fire timed out at
  x=17.75, pressed against it.)
- **Earth rides with the stone still aboard.** Five against four: with every crate Fire owns on the
  far pan the beam does not stir. This is the arithmetic the level is about. (`check`: the pan never
  rises.)
- **Two crates instead of three.** Two weigh exactly what Earth weighs; the beam hangs level in
  mid-shaft and Earth gets nowhere, and the third stud is unpressed so the chute stays shut.
- Jumping the gap is not available anywhere: the gallery floors are four tiles above the hall, and
  a jump from a partner's head reaches about three and three quarters.

## Kinship with the campaign

The campaign already weighs things on a seesaw, and it is worth being exact about how. **Assay**
(`l50_assay`, 3p) is the nearest: Earth and one partner on the left pan balance a boulder, a floating
plate over the right pan is touched only while the scale hangs *level*, and a crate dropped on later
takes Earth's place so Earth can go too. **Counterpoise** (`l53_counterpoise`, 4p) sums bodies as
well — all four weigh 5 against a boulder and a crate's 4 — to hoist cargo past a ledge. Both are
about *reaching a particular reading*: balance the pan, or outweigh the load.

Steelyard is about where the two pans **are**. Each of its three positions is a storey, the beam is
the only way between them, and only the heavier pan is ever at floor level — so the far pan can
never be loaded from below, and the only way to send it up to Fire is to weigh your own pan down.
That turns the whole level into one counter-intuitive motion: load the stone to raise their pan,
shed the stone to raise your own. Neither campaign scale asks that, and no 2-player level in the
game or in this repo uses a seesaw as a mechanism at all (**Riverbed**, `l16_riverbed`, has one as a
step). Among this repo's 2-player levels, **Counterweight** also takes a weight off a plate in order
to get on — but there the plate is a switch and lifting the stone shuts a gate; here the stone is
not a signal at all, it is one side of a sum, and the same stone is read as 3 by the beam and merely
as "heavy" by the pad.
