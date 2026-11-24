# Flyover

**Introduces:** a lock that reads the air instead of the floor — two plates hang in the draught
where nobody can stand, one above the other, and the gate in the cellar is open exactly while two
of you are off the ground in them at the same time. The thermal is what makes that fair: in it a
jump lasts two seconds and ten tiles instead of half a second, so "both of us in the air at once"
is a window somebody can actually walk through.

## The intended solution

1. Everyone starts in the left cellar. The shaft above is dead: the fan is wired to two heavy
   plates, and nothing is on either.
2. **Earth** walks to the heavy plate `weight_a` in the left cellar and stands on it. The thermal
   starts. Earth is the only body heavy enough (mass 2), so Earth is the only one who can start it
   — and standing on it is all Earth can now do.
3. **Air** climbs the shelves on the left wall to the low ledge and jumps off it into the shaft.
   Fire and Water only hang in a 1.5 draught; Air rises, and rides it to the top of the shaft.
4. At the top Air steers right onto the loft floor and touches the **crank** (a turbine: Air only).
   The crank is wired, inverted, to the `clamp` — a door standing open over the boulder at the far
   end of the loft. The crank *shuts* it, and the closing door pushes the boulder down through the
   one-way grating it is resting on. Nothing else in the game moves a boulder through a grating.
5. The boulder falls the whole chimney into the right cellar and lands in the notch on
   `weight_b`. The thermal is now powered for good, and **Earth can leave the plate**.
6. Earth walks to the gate and waits under it. Fire climbs to the **high** ledge, Water stays on
   the **low** one. Air goes back to the crank.
7. On a count, **Fire and Water launch together.** Each sails across the shaft — Fire through the
   high plate `hi`, Water through the low plate `lo` — and each holds its plate for as long as the
   flight lasts.
8. With `hi`, `lo` and the crank all on, the gate opens and **Earth walks through** into the right
   cellar.
9. Fire and Water land on the right ledge, beside their own doors. Air drops through the empty
   grating, down the chimney, onto the boulder, and into the right cellar. Everyone stands in
   their door.

## Why each player is needed

- **Earth** — the only mass-2 body: the only one who can start the thermal, and (because the
  thermal will never lift it) the only one who needs the gate. Earth is therefore the one person
  who can never be one of the two bodies in the air.
- **Air** — the only element a turbine answers to, and the only one the 1.5 draught lifts. Without
  Air the boulder never leaves the loft (so Earth is never freed) and the gate is always one key
  short.
- **Fire** and **Water** — the gate wants two bodies airborne at once, in two plates five rows
  apart. One body cannot be in both. With either of them idle the gate never reaches three keys,
  and without the wind neither of them can cross the shaft at all.

## The insight

The switches are in the air, so standing still anywhere is worth nothing to them — and the one
player heavy enough to turn the wind on is the one player the wind will never carry. The stone has
to take Earth's place on the plate before Earth can be anywhere else, and the only thing that can
post the stone is a door being *shut*.

## Likely failures and how players recover

- **"Earth holds the plate and the rest of us go on."** The wind runs, everyone else crosses, and
  then there is nobody left who needs the gate and nobody left to open it for Earth. The party has
  to come back for the stone. Nothing is lost: Earth can step off and on again at any time.
- **Flying one after the other.** The gate wants both plates at once; a relay never opens it. The
  fix is a countdown, not better flying.
- **A missed launch.** A flight that falls short lands on the shaft floor, which is a dead end
  with one way out: the hatch at its left end drops into the left cellar, and the shelves lead
  back up. A flier who has already landed on the right ledge can step back into the shaft and come
  round the same way. The thermal never stops once the stone is on `weight_b`, so every attempt
  can be made again.
- **Earth catches the stone.** If Earth is standing in the chimney's foot when the boulder is
  posted it lands on Earth's head and travels with it; the one-tile roof at the cellar's right end
  scrapes it off, and Earth can push it back. (Earth cannot be there in the intended order — it is
  behind the gate — so this is only reachable on a replay.)
- Nothing in the level is lethal and nothing can be spent: the boulder's notch is one tile deep, so
  once posted it cannot be pushed back out of the plate.

## Shortcuts that were closed

- **Standing on the heavy plate instead of fetching the stone** — that is the intended first move,
  and the point is that it strands Earth. Scripted as a shortcut: Earth holds `weight_a` while the
  other three do everything they can, and the level cannot be finished.
- **Flying the shaft one at a time** — scripted: Fire and Water each make a clean crossing, in
  series, with Air on the crank and Earth at the gate, and the gate never opens.
- **Reaching the plates from the floor.** `hi` and `lo` hang over the shaft only; a player
  bouncing on a launch ledge never touches one, because the ledges stop at x=14 and the plates
  start at x=15. From the shaft floor the low plate is five rows up, and the fan does not reach
  that low, so there is no lift down there either.
- **Earth in the thermal.** The fan's bottom edge is row 11; Earth's jump from the shaft floor
  tops out below it, so Earth gets no lift at all. Earth can jump into the low plate from the low
  ledge — but then Earth is the one in the air, and Earth is the only one who needs the gate.
- **Getting into the shaft from the cellar.** The shaft floor is four tiles above the cellar and
  its only opening is a one-way hatch: nobody can jump up through it, so the shaft can only be
  entered from the low ledge.
- **Riding up with Air.** The draught is 1.5. Air carrying Earth needs 1.54, so Earth cannot be
  ferried to the loft or the high ledge.

## Kinship with the campaign

Nearest is **Windmill** (`l11_windmill`), which also hangs a chain of machines off one updraught,
and **Last Word** (`l55_last_word`), whose gale carries people across a gap. Both treat the wind as
transport. Here the wind is not transport but *duration*: the switch is the fact of being airborne,
and the draught exists only to make a jump last long enough to be a door. The closest level in this
repo is **Tripwire**, which also has a plate nobody can stand on — but there the window is a lift
carrying one rider past a switch, and here it is two players' own hang time, held at once.
