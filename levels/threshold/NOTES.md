# Threshold

**Introduces:** a plate under an exit — standing in your own front door is a switch, so the first
player home is not finished but *employed*: the draught that carries everybody else up is powered by
a body in a doorway, and that body can never step out again.

## The intended solution

Three players in a hall seven tiles tall. Overhead is a gallery with the three doors home in it, and
the only machine in the level is a draught in the column at x=18–19. The draught is dead: its one
input is the plate under the floor of **Fire's doorway**, up in the gallery, in a cell sealed from
everything except the stairwell behind the lava.

1. **Air** walks east, takes its gem, and puts a hand on the **catch** at x=22.
2. **Earth** walks *west* to the heavy plate at x=2 and stands on it. The hatch at the mouth of the
   lava tunnel wants both at once — a weight and a hand — so two of the three are posted before
   anybody has gone anywhere.
3. **Fire** walks east through the open hatch and wades the six tiles of lava. The tunnel is one
   tile high, so nobody can jump, hop or glide in it, and the lava is lethal to the other two.
4. Fire climbs the one-way ledges of the east chamber (rows 18, 16, 14), **lights the lamp** on the
   first landing, takes its gem on the second, and jumps through the grating in the gallery floor.
5. Fire steps into its doorway. The plate under it starts the **draught**. This is the whole level:
   nothing else turns it on, and Fire can never step out of that door again.
6. Earth and Air come off their posts (the hatch shuts behind Fire — it is not wanted again). Air
   comes back west past Earth and parks east of it; Earth takes its gem and **jumps onto Air's
   head**. At strength 1.54 the draught lifts Air, and Air carrying Earth, and nothing else.
7. Air carries Earth into the column and the two of them rise eight tiles. Earth steps **east** off
   Air's head onto the gallery floor — east, because the column's mouth is a hole in that floor and
   Earth's own cell is on the east side of it. Air steers out to the west.
8. Earth stands on the **heavy plate on the east landing** (x=24). That opens `air_gate`, the door
   of Air's cell at the far west end.
9. Air walks west, jumps the hole in the gallery floor at x=10–11, goes through the gate and stands
   in its own doorway. The plate under *that* door is the second input `earth_gate` wants; the first
   is the lamp Fire lit on the way up.
10. Earth **steps off the landing plate** — `air_gate` shuts behind Air, which is exactly right,
    because Air is already home — and walks east into its own cell.

`check`: solved in **22.6 s**, par 80 s, 3/3 gems, no deaths, no warnings.

## Why each player is needed

- **Fire** — the only one who can wade the lava, and the tunnel's roof is one tile up, so there is
  no jumping over it. Fire's cell is sealed from the landing by rock and reachable only from the
  stairwell, so Fire is the only player who can ever stand on the plate that powers the draught.
  Fire also lights the lamp that is one of the two things `earth_gate` wants, which is work done on
  the way and not from the doorway — so a Fire that simply sat in its exit would leave Earth locked
  out (this is what `check`'s co-op test proves).
- **Earth** — mass 2, and the only mass 2 in the level: there is no boulder, and a crate would be
  mass 1, so both heavy plates can only ever be Earth. Its weight is wanted in two places, at
  opposite ends of two different storeys, in an order that is forced.
- **Air** — at 1.54 the draught lifts Air, and Air with a passenger, and nobody else (Fire and Water
  get no lift below about 1.6; Earth manages three tiles and comes back down). Air is the only
  transport in the level, and it is also the hand on the hatch's catch, because the only other hand
  free at that moment is Fire's and Fire is the one going through.

## The insight

The door you are trying to reach is a switch. Getting home is not the end of a player's job — it is
the start of it, and the party has to work out which of them is going to spend the level standing in
their own front doorway working the machine that brings the others up, and get that player there by
the one route only they can take before anybody else can move at all. The second half turns it
round: the last thing to do is to *give up* the plate holding Air's gate open, because Air is already
behind it, and a door that shuts on somebody standing in their own exit costs nothing.

## Likely failures and how players recover

- **Air flies up first to sort things out from above.** The draught is dead until Fire is home;
  nothing happens. Costs a moment.
- **Somebody sends Air down the tunnel** because Air is the one that gets about. Air dies at the
  lava and comes back at the checkpoint by the spawns.
- **Earth steps off the hall plate too early**, or Air lets go of the catch. The hatch drops in front
  of Fire; Fire walks back out of the tunnel and waits. Nothing is lost — lava hurts nobody standing
  on the bank.
- **Earth rides up and goes west instead of east.** It is then on the far side of the column's mouth
  from its own cell, and can get back only by dropping through the hole at x=10–11 to the hall and
  being carried up again. About twenty seconds.
- **Fire steps out of its doorway to help.** The draught dies at once and whoever is riding it drops
  to the hall floor. Nobody is hurt; Fire steps back in and the ride starts again.
- **Earth stays on the landing plate waiting for a signal that never comes.** Air is already home;
  the level is waiting for Earth to let go.
- Nothing in the level can be destroyed or dropped somewhere unreachable, and the hole in the gallery
  floor means the gallery is never a trap: anybody who went up without their gem can go back down for
  it. There is a **checkpoint** in the hall by the spawns.

## Shortcuts that were closed

All three are scripted in `shortcuts` in `solution.mjs`, and `check` prints the reason each fails.

1. **"Send Air through the tunnel instead — it is the one that gets about."** Fire takes the catch,
   Earth the plate, Air walks east. *Fails:* `air died at (28.63, 19.13)` — at the lava's edge. The
   tunnel's roof is one tile up for its whole length, so there is no jumping, no hopping over and no
   gliding past; and the only way to the lava is through a hatch at body height.
2. **"Never mind Fire — Air can just carry Earth up."** The full carry, done properly, with Fire
   still in the hall. *Fails:* `earth timed out waiting for the draught to lift us` — the draught's
   only input is the plate under Fire's doorway. This is the central claim of the level, so it is the
   central proof; the cheat throws if the draught ever does lift them.
3. **"Air rides up alone and lets itself in."** Fire goes home as usual, Earth stays below, Air rides
   the draught, crosses the gallery and walks west. *Fails:* `air could not reach x=2 (at 6.31)` —
   stopped at `air_gate`, which is three tiles tall under a solid ceiling and opens only for a heavy
   plate. Air is mass 1 and there is no boulder in the level.

Hunted and answered without needing a script:

- **Could somebody jump a barrier from a partner's head?** `air_gate` and `earth_gate` are both three
  tiles tall under the gallery's solid ceiling, and the tunnel forbids jumping outright.
- **Could a stack hold a heavy plate?** No: a plate reads the heaviest single thing on it and riders
  are ignored, so two light players are still mass 1. Only Earth.
- **Could a body hold a gate open?** Both gates are more than fifteen tiles from the plate that opens
  them, and both plates are behind the gates they do *not* open, so nobody is ever standing under one
  at the moment it closes.
- **Could Air carry Fire up the shaft and skip the tunnel?** Blocked twice: the draught is off until
  Fire is already home, and Fire's cell is walled off from the landing, so a Fire delivered to the
  gallery could not reach its door anyway.
- **Could Earth walk into Air's cell and press Air's threshold itself?** `air_gate` is open only while
  Earth is on the landing plate, and Earth cannot be in the cell and on the plate at once.
- **Can the level reach a state it cannot be finished from?** No. The draught can always be restarted
  (Fire steps back in), the hole in the gallery floor is a way down that is always open, the hatch can
  be re-opened as often as anybody likes, and nothing in the level can be consumed or lost.

## Kinship with the campaign

Nearest campaign level: **Relay** (`l49_relay`) — Air ferrying a partner over a liquid nobody else can
cross, with plates that open each other's gates. There the switches are ordinary floor plates and
arriving at a door ends a player's involvement; here the doors themselves are the switches, one
player has to be posted in their own exit as the level's power supply, and the last move is to let a
door shut on a partner rather than hold it open. **Portcullis** (`l56_portcullis`) and **Two High**
(`l63_two_high`) also end with a door closing on somebody, but there the body is a doorstop holding
the gate *up*; here the point is that the gate may shut, because the far side of it is home.
**Hoist** (`l72_hoist`) has the same shape of draught and the same "only Earth is heavy enough", but
its gale is started by a stone on a plate, not by a player who has gone home.
