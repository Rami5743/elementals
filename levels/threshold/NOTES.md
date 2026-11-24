# Threshold

**Introduces:** a plate under an exit — standing in your own front door is a switch, so the first
player home is not finished but *employed*: the draught that carries everybody else up is powered by
a body in a doorway, and that body can never step out again.

## The intended solution

Three players in a hall seven tiles tall. Overhead is a gallery with three cells in it, and the only
machine in the level is a draught in a column at x=18–19. It is dead: its one input is a plate under
the floor of **Fire's cell**, up in the gallery.

1. **Earth** walks west to the heavy plate at x=10 and stands on it. Earth's gem is on the way.
   The plate opens the hatch at x=29 — the mouth of the lava tunnel at the east end of the hall.
2. **Fire** walks east through the open hatch and wades the six tiles of lava. The tunnel is one
   tile high, so nobody can jump in it, and the lava is lethal to the other two.
3. Fire climbs the one-way ledges of the east chamber (rows 18, 16, 14) and jumps through the
   grating in the gallery floor into **its own cell**, taking its gem on the way.
4. Fire steps into its doorway. The plate under it starts the **draught**. This is the whole level:
   nothing else can turn it on, and Fire can never step out of the door again.
5. Earth steps off the hall plate (the tunnel hatch shuts behind Fire — it is not needed again) and
   walks to the draught column.
6. **Air** takes its gem at the east end of the hall, stands in the column, and **Earth jumps onto
   Air's head**. At strength 1.54 the draught lifts Air, and Air carrying Earth, and nobody else.
7. The two of them rise eight tiles. Earth steps west off Air's head onto the gallery floor; Air
   follows it out of the column.
8. Earth stands on the **heavy plate on the landing** (x=13). That opens `air_gate`, the door of
   Air's cell at the west end.
9. Air walks west through the gate and into its own doorway. The plate under *that* door opens
   `earth_gate`, at the east end of the landing.
10. Earth **steps off the landing plate** — `air_gate` shuts behind Air, which is exactly right,
    because Air is already home — and walks east into its own cell.

## Why each player is needed

- **Fire** — the only one who can wade the lava, and the tunnel is one tile high so nobody jumps
  over it. Fire's cell is sealed from the landing by rock and reachable only from the tunnel, so
  Fire is the only player who can ever stand on the plate that powers the draught. Fire is then
  pinned there for the rest of the level.
- **Earth** — mass 2, and the only mass 2 in the level: there is no boulder and a crate is mass 1,
  so both heavy plates can only ever be held by Earth. Its weight is wanted in two places, in a
  forced order, at opposite ends of two different storeys.
- **Air** — at strength 1.54 the draught lifts Air, and Air with a passenger, and nothing else
  (measured: Fire and Water get no lift below about 1.6, and Earth manages three tiles and comes
  back down). Air is the only transport in the level, so Earth's second job depends on it.

## The insight

The door you are trying to reach is a switch. Getting home is not the end of a player's job — it is
the start of it, and the party has to decide who is going to spend the level standing in their own
doorway working the machine that brings the others up. The second half of the level turns that
round: the last thing to do is to *give up* the switch holding Air's gate open, because Air is
already behind it and a door that shuts on somebody standing in their own exit costs nothing.

## Likely failures and how players recover

- **Air flies up first to sort things out from above.** The draught is dead until Fire is home;
  nothing happens. Costs nothing but a moment.
- **Earth rides up with Air and then tries to come back for the hall plate.** The tunnel hatch needs
  the hall plate *before* Fire can even start, so the order is forced; Earth drops back to the hall
  through the hole at x=8–9 and starts again. About twenty seconds.
- **Earth steps off the hall plate too early.** The hatch shuts on Fire's nose; Fire walks back out
  of the tunnel and waits. Nothing is lost — the lava hurts nobody standing on the bank.
- **Fire steps out of its doorway to help.** The draught dies at once and anyone riding it drops to
  the hall floor. Nobody is hurt; Fire steps back in and the ride starts again.
- **Earth stays on the landing plate, waiting for a signal that never comes.** Air is already home;
  the level is waiting for Earth to let go.
- There is a **checkpoint** in the hall by the spawns.

## Shortcuts that were closed

- **Air carries Fire up the shaft instead of sending Fire through the tunnel.** Blocked twice over:
  the draught is off until Fire is already home, and Fire's cell is sealed from the landing by rock,
  so a Fire delivered to the gallery could not reach its door anyway.
- **Air or Earth walks the lava tunnel.** The lava covers the full floor of a corridor one tile
  high: no jumping, no hopping, no gliding past.
- **Earth jumps the lava.** Same one-tile roof — the jump is blocked outright.
- **Air or Fire stands on a heavy plate.** Both are mass 1. A plate reads the heaviest single thing
  on it, so a stack does not help either, and there is no boulder in the level.
- **Somebody holds a gate open with their body.** `air_gate` and `earth_gate` are three tiles tall
  under a solid ceiling, and both are more than fifteen tiles from the plate that opens them.
- **Earth walks into Air's cell and presses Air's threshold itself.** `air_gate` is only open while
  Earth is on the landing plate, so Earth cannot be in the cell and on the plate at once.

## Kinship with the campaign

Nearest campaign level: **Relay** (`l49_relay`) — Air ferrying a partner over a liquid nobody else
can cross, with plates that open each other's gates. There the switches are ordinary floor plates
and arriving at a door ends a player's involvement. Here the doors themselves are the switches:
one player has to be posted in their own exit as the level's power supply, and the last move is to
let a door shut on a partner rather than hold it open. **Portcullis** (`l56_portcullis`) and
**Two High** (`l63_two_high`) also end with a door closing on somebody, but there the body is a
doorstop holding the gate *up*; here the point is that the gate may shut, because the far side of it
is home.
