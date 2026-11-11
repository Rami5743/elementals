# Thermal Stair — notes

**Brings together:** a draught that only goes up, a lift that carries exactly one passenger,
and two switches on two floors that two different elements have to work — so the ride has to
be made twice, in the right order, with a nine-second clock at the end.

## The intended solution

The shaft (columns 8–11) runs from the hall to the top of the map. Air rises in it as long as
it does not steer; steering out of the column is how you choose a floor, and it ends the climb.
Only Air rises, so Air is the lift. Anyone on Air's head rides along.

- **Middle chamber** (x 4–7, rows 10–13): the torch, which opens `g1` for good. Only Fire can
  light it. Its only way out is the hole at (4,14) — a drop to the hall, not a way back up.
- **Top floor** (x 12–16, row 5): flames at 13, and the button behind them at 14. Only Water
  can put the flames out. The button opens `g2` for 540 ticks — nine seconds — and nothing
  else opens it. The chute at column 16 is the way down.

1. Fire climbs onto Air in the hall. Air rides up and steers left out of the draught into the
   middle chamber; Air steps off Fire onto the ledge.
2. Fire lights the torch; `g1` opens and latches. Air takes the air gem.
3. Both drop through the hole to the hall — Air first, the hole takes one body at a time.
4. Fire crosses the hall, takes its gem and goes through `g1` to wait between the two gates.
5. Air goes back for Water. Second climb, this time all the way: with a passenger the pair
   tops out one row lower, so the step-off is onto row 5.
6. Water puts out the flames, then waits until Fire reports it is at the second gate, and only
   then presses the button.
7. Water and Air drop down the chute and all three run for the exits inside the nine seconds.

## Roles

- **Air** — the only one the draught lifts, so the only lift there is, and it has to run twice.
- **Fire** — the only one who can light the torch; the first gate exists for nobody else.
- **Water** — the only one who can put out the flames at the top, and so the only one who can
  reach the button that opens the second gate.

## Why each is necessary

Without Fire the first gate never opens; without Water the second never opens; without Air
neither switch can be reached at all.

## The insight

The lift takes one passenger and only goes up, so the question is not *how* to get up but
*who* goes up *when* — and the clock on the second gate means the party has to be assembled
at it before the button is pressed, not after.

## Likely failures and recovery

- **Pressing the button on the way past.** The nine seconds run out while the others are still
  the wrong side of `g1`. Nothing is lost: climb again and press it again.
- **Carrying Water first.** The flames come out and the button works, but `g1` is still shut,
  so the window is wasted and Fire still has to be taken up. Recoverable, costs a full climb.
- **Expecting to come back down the shaft.** The draught only lifts; the middle chamber's hole
  and the top floor's chute are the only ways down, and the chute is behind the flames.
- **Stepping off at the wrong row.** The middle chamber is four rows tall, so the window is
  generous; the top floor is reached by not steering at all until the climb stops.
