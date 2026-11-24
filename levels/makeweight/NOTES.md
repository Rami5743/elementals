# Makeweight

**Introduces:** the two machines in this game count a crowd differently. A heavy plate reads
`max(mass)` and so sees two light players as one light player; the balance plank reads the *sum* of
each half and so sees three of them as exactly three. The same four bodies are therefore worth 1 to
one lock and 3 to the other — so the party can stand in for the stone on the scales and can never
stand in for it on the plate, and that single arithmetic difference decides who does which job.

## The intended solution

1. The plank starts **jammed**. The stone is sitting on its left half, so the pan is six tiles down
   in the vault and the seat is six tiles up at the loft, where nobody can board it. Nothing in the
   hall can be used.
2. **Earth** goes down the one-way stair at cols 10–11 into the cellar, walks east to the vault, and
   **pushes the stone off the pan** — the counter-intuitive first move: the heaviest thing in the
   level is on a scale, and the first thing you must do is take it off. The stone drops the one tile
   off the pan's lip onto the cellar floor and can never be put back (the pan's lip is a tile up and
   nobody pushes a boulder uphill).
3. Earth keeps pushing it west onto the heavy plate `hp`. That is one of the gate's two keys, and it
   is now held for good by something that is not a player.
4. With the pan empty the plank levels: both halves come back to the hall floor at row 8, flush, and
   the hall is a continuous floor again. **Second state of the map.**
5. Earth climbs the stair back to the hall.
6. The loft holds `beam`, a **heavy** plate. Only mass 2 presses it, so only **Earth** can, and the
   stone cannot get up there — so Earth is the one who has to be lifted. Earth boards the seat.
7. **Two on the pan is not enough.** Fire + Water weigh 2 and Earth weighs 2: the plank lies dead
   level and nothing moves at all. It takes **all three** of the others — 3 against 2 — and the
   price is that all three ride the pan six tiles down into the vault. **Third state.**
8. Earth steps off the raised seat into the loft and stands on `beam`. `hp` is already held by the
   stone, so the gate has both its keys at once: it opens and **latches**.
9. The three step off the pan down into the cellar, hop the stone, and walk west through the open
   gate to their doors.
10. Earth walks back out of the loft onto the seat; with the pan empty the seat sinks back to the
    hall floor, carrying Earth. Earth steps left onto the pan, which sinks under Earth alone, rides
    it down into the vault, hops the stone and takes the last door.

## Why each player is needed

- **Earth** — the only mass-2 body. The only one who can shift the stone, the only one heavy enough
  for either plate, and therefore wanted in two places that must be live at the same moment. The
  stone has to take Earth's place on `hp` before Earth can be anywhere else.
- **Fire, Water and Air** — needed as *weight*, and for nothing else. The pan has to beat Earth's 2,
  and every pair of them makes exactly 2. None of their abilities appears in this level at all:
  Air's single kilogram is as decisive as a turbine would be, and that is the joke.

## The insight

Count twice. Two of you on the loft's heavy plate is one light player and nothing happens; two of
you on the plank is exactly Earth. The plate takes the heaviest of you, the plank adds you up, and
the whole level is the gap between those two sums.

## Likely failures and how players recover

- **"Leave the stone where it is — a 3 on the scale is free lift."** It is, but it lifts the seat
  *away*: the seat is already at the loft and there is no way to board it. The machine has to be
  emptied before it can be used.
- **"Two of us on the pan will do."** 2 against 2 is dead level; the plank does not move a pixel.
  Nothing is lost, the third one walks over.
- **"Earth holds the cellar plate."** Earth is heavy, so the plate goes on — but the gate wants two
  keys and the other one is in the loft, where only Earth can press it. Scripted.
- **Lifting somebody else.** Earth alone on the pan lifts Fire, Water or Air to the loft for nothing,
  which is the cheap and obvious plan. They get there and find a heavy plate they cannot press. The
  cost is a climb back up the stair; nothing is spent.
- **Going up before the stone is placed.** Earth can always come down again — out of the loft onto
  the seat, or off the loft lip into the shaft — so the mistake costs one more lift cycle, not the
  level.
- Nothing is lethal: there is no liquid in the level. The stone cannot be lost, because the pan's
  lowest position is a tile above the cellar floor, so it can only ever be pushed away from the
  vault, never back into it, and never into a pit.

## Shortcuts that were closed

- **Earth climbing to the loft on a human ladder.** Measured: a four-high tower (Water, Fire, Air,
  Earth) puts Earth's feet at y=168 and Earth's jump is 76 px, so Earth's feet reach y=92. The loft
  floor is row 2, surface y=64. Earth is 28 px short, and that is the reason the lift is six tiles
  and not five. Scripted.
- **Air reaching the loft.** Air can get up there on a three-high tower, and is welcome to: the only
  thing in the loft is a heavy plate, and Air weighs 1.
- **Standing on the heavy plate instead of fetching the stone.** `hp` can be held by Earth, and the
  gate still will not open, because its other key is a heavy plate Earth would have to be standing
  on at the same time. Scripted.
- **A stack on a plate.** A plate reads `max(mass)`; riders do not add. Two or three light players
  on `beam` do nothing.
- **Riding the seat with Earth on a partner's head.** The plank sums the whole stack, so a carrier
  with Earth aboard weighs 3 on the seat and the pan can never beat it (three light players make 3,
  not more). The seat only ever rises under a lone Earth.
- **Sinking the seat.** There is solid rock under the seat's half from row 9 down, so the seat can
  only ever be level or raised; loading it heavier than the pan jams the plank level instead.

## Kinship with the campaign

**Counterpoise** (`l53_counterpoise`) is the only seesaw level in the campaign and the nearest
relative: there the plank is a counterweight problem — pile enough bodies on one pan to send a load
past a ledge. Here the plank is not a counterweight but a *comparator*: inequality gives the same
full swing whatever the margin, so the only quantities that matter are "equal" and "not equal", and
the puzzle is a question about two different ways of adding the same four players up. **Quorum**
(`l54_quorum`) also counts players, but it counts *bodies on plates*; this one counts kilograms, and
the point is that the two machines disagree. Nothing in this repo has used a seesaw at all.
