# Makeweight

**Introduces:** the game's two weighing machines disagree about what a crowd weighs. A heavy plate
reads the *heaviest single body* on it, so two of you are worth one of you; the balance plank reads
the *sum* of each half, so two of you are worth exactly Earth and three of you outweigh Earth. The
same four bodies are therefore interchangeable with the stone on the scales and useless in its place
on the lock, and that one arithmetic difference decides which of the two jobs the heavy player has
to go and do in person.

The party starts split by the shaft: Fire, Water and Air in the west hall beside the pan, Earth in
the east hall beside the seat. Nobody can cross, because the first body on to a level plank tips it.

## The intended solution

1. The plank starts **jammed**. The stone is sitting on the pan — its left half — so the pan is six
   tiles down in the vault and the seat is six tiles up, level with the loft, where nobody can
   board it. The hall Earth is standing in ends at a hole.
2. **Earth** takes the stair down into the cellar, walks west underneath the whole level, and climbs
   the one tile up on to the pan, east of the stone.
3. Earth **pushes the stone off the scale** — the counter-intuitive first move: the heaviest thing
   in the level is sitting on a balance, and the first thing to do with it is take it off. It drops
   the one tile off the pan's lip on to the heavy plate `hp` in the cellar floor and holds it down
   for good. It can never be put back: the pan's lip is a tile up, and nobody pushes a boulder
   uphill.
4. Earth steps east off the pan, and the empty plank comes **level** behind it: both halves return
   to row 8, flush with both halls. **Second state of the map.**
5. Earth climbs the stair and walks west on to the seat. Earth alone sags it one tile — and the
   same `d` that sags the seat lifts the **pan one tile above the west hall floor**, which is the
   party's cue that something over there has moved.
6. **Fire** steps up on to the raised pan: 1 against Earth's 2, so nothing happens. **Water**
   follows: 2 against 2, and the plank lies **dead level** — the exact arithmetic coincidence that
   makes it a floor again, and the moment the level's whole question is on show.
7. **Air** strolls across the flush plank and steps on. Three against two, and three is all there
   is: the pan takes Fire, Water and Air six tiles down into the vault while the seat carries Earth
   six tiles up to the loft. **Third state.**
8. Earth walks east into the loft, over its gem, and stands on **`beam`** — a heavy plate, so only
   Earth can press it. `hp` is already held by the stone, so the gate has both its keys at the same
   moment: it opens and **latches**.
9. The three step west off the pan, down over the stone, and walk through the open gate to their
   doors — Air first, since Air boarded last and stands nearest the lip.
10. With the pan empty the plank levels again and the **seat carries Earth back down** of its own
    accord. Earth hops the one tile east into the hall, takes the stair, walks west under the level
    again, hops the stone and takes the last door.

## Why each player is needed

- **Earth** — the only mass-2 body. The only one who can move the stone, the only one heavy enough
  for either plate, and so wanted in two places that have to be live at the same instant. The stone
  has to take Earth's place on `hp` before Earth can be anywhere else.
- **Fire, Water and Air** — needed as *weight*, and for nothing else. The pan has to beat Earth's 2,
  and any two of them make exactly 2. Not one ability appears in this level: Air's single kilogram
  is as decisive as a turbine would be, and that is the joke. There is no element barrier anywhere
  in the level.

## The insight

Count twice. Two of you on the loft's heavy plate is one light player and nothing happens; two of
you on the plank is exactly Earth and it lies flat. The plate takes the heaviest of you and the
plank adds you up, and the whole level lives in the gap between those two sums.

## Likely failures and how players recover

- **"Leave the stone where it is — a 3 sitting on a scale is free lift."** It is, but it lifts the
  seat *away*: the seat is already up at the loft and there is nothing to board. The machine has to
  be emptied before it can be used at all, and emptying it spends the stone for good.
- **"Two of us on the pan will do."** 2 against 2 is dead level and the plank does not move a pixel.
  Scripted; Earth waits on the seat for ever. Nothing is lost — the third one walks over.
- **"Earth can hold the cellar plate itself, so we don't need the stone."** Earth is heavy enough,
  but Earth cannot even *reach* the plate while the stone is still aboard: the loaded pan is parked
  in the cellar and seals the passage west. Scripted — Earth gets to x=16 and no further.
- **"Earth puts the stone on the plate and we go from there."** Half the lock is then held, but the
  other half is a heavy plate in the loft, and Earth is the only one who can press it. Scripted —
  Fire rides the pan down and stops at x=8, in front of a gate with one key.
- **Lifting somebody else.** Earth can sag the seat and let a light partner ride the pan up a tile,
  or board the pan itself and ride down; nothing is spent either way, and the stair always goes back
  up. Every arrangement of the plank can be undone by matching the weights, which is why a mistake
  here only ever costs a walk.
- Nothing in the level is lethal: there is no liquid anywhere. The stone cannot be lost, because the
  pan's lowest position is a tile *above* the cellar floor — it can only ever be pushed away from
  the vault, never back into it, and there is no pit for it to fall in.

## Shortcuts that were closed

- **Earth climbing a partner to the loft.** A tower can only be built where there is height, and the
  only such place is the plank shaft — whose floor is the seat, and whose stack's own weight sags
  the seat a tile lower still. Measured: Earth off a partner's head there reaches y=182, off a
  three-high tower y≈124; the loft floor is y=64. Scripted — Earth gets to x=18.6 and never reaches
  the beam at x=23. This is why the lift is **six** tiles and not five: with the loft at row 3 a tall
  enough tower clears it by 4 px.
- **Air reaching the loft.** Air can get up there on a tower, and is welcome to: the only thing in
  the loft is a heavy plate, and Air weighs 1.
- **A stack on a plate.** A plate reads `max(mass)` and ignores riders, so no number of light players
  on `beam` or `hp` does anything at all.
- **Riding the seat with Earth on a partner's head.** The plank sums the whole stack, so a carrier
  with Earth aboard weighs 3 on the seat, and three light players make 3, not more. The seat only
  ever rises under a lone Earth.
- **Walking across the plank.** The first body on to a level plank tips it, so neither hall can
  simply be walked to from the other. The only way between them is down through the cellar, and the
  only way out of the cellar is the east stair — which is deliberately on the far side of the gate
  from the exits, so opening the gate is never a shortcut to anything but the doors.
- **Sinking the seat instead of raising it.** There is rock under the seat's half from row 9 down.
  It does not pin the half — a seesaw half passes straight through rock — it pins the half's
  *rider*, which is what turns "Earth rides the seat six tiles down" into "Earth sags the seat one
  tile", and is the only reason the plank can be boarded at all.

## Kinship with the campaign

**Counterpoise** (`l53_counterpoise`) is the only seesaw level in the campaign and the nearest
relative by far: there the plank is a counterweight problem — pile enough bodies on one pan to send
a load up past a ledge. Here it is not a counterweight but a *comparator*: inequality gives the same
full swing whatever the margin, so the only quantities that exist are "equal" and "not equal", and
the puzzle is a question about two different ways of adding the same four players up. **Quorum**
(`l54_quorum`) also counts players, but it counts bodies on plates; this counts kilograms, and the
point is that the two machines disagree. Nothing in this repo has used a seesaw at all.
