# Single File (`single_file`) — Fire + Water + Earth + Air

**Introduces:** a corridor one tile high is one body wide as well — nobody jumps in it and nobody
hops over anybody — so a party inside it is a queue, the switches that open its gate stand *in* it,
and the one player heavy enough to work the gate is therefore the one player who can never walk
through it.

## The intended solution

Three places, left to right. The **yard** (x=1–9, floor row 19) is where everyone starts and where
Air's and Earth's doors are. The **tunnel** (x=10–24) is the only way east: open at row 18 only,
with rock at row 17, so in it nobody can jump, nobody can be stood on, and nobody can pass anybody.
The **works** (x=25–38, floor row 19, three tiles of headroom) holds Water's and Fire's doors.

Three plates lie in the tunnel floor — `p_west` (11), `p_heavy` (14, **heavy**) and `p_east` (18) —
and all three feed the `gate` at x=23, which wants **two of them held at once**. The gate is five
tiles from the nearest plate and shuts eight ticks after a plate is let go, so nobody can hold a
plate and then run for it: two of the four always stay standing still while the other two cross.

1. **Earth walks the empty tunnel to x=22 for its gem and comes all the way back out.** Once
   anybody else is in the tunnel this errand is impossible, so it has to be first.
2. The other three file in past Earth and stop, each short of the one in front: **Air** at 22,
   **Fire** at 21, **Water** on `p_east` (18). **Earth** goes in last and stands on `p_heavy` (14).
   Two plates held, the gate opens, and Fire and Air walk out into the works.
3. **Air** crosses the works to the `spin` turbine at x=35 and waits there.
4. **Fire** hops the stone, lights the `torch` at the far end (x=34), and walks the whole works back
   to the `crank` at the mouth (25) — the `belt` runs only while the torch is lit *and* the crank is
   held, and the crank is a hold button, so Fire is pinned there while the stone creeps east.
5. The stone rolls off the end of the belt onto `p_stone` (33–34, heavy). That starts the `draught`
   in the shaft, and because Air is on the turbine at the same moment, the `vault` (x=36) latches
   open over Fire's and Water's doors. Fire lets go and walks through to its door at 38.
6. **Air rides the draught** fourteen tiles up the shaft, steps west into the gallery at row 4,
   takes its gem at x=9 and drops through the hole at x=2–3 back into the yard — the only way home
   from the works, and a one-way trip.
7. **Air walks back into the tunnel and stands on `p_west` (11)** — the one plate that can only be
   reached from the yard end, because Earth is standing between it and everybody else.
8. With `p_west` and `p_heavy` held the gate opens a second time. **Water** steps off `p_east`,
   collects her gem at 21 and crosses to her door at 37.
9. **Air steps off `p_west` and walks west to its door (2); Earth steps off `p_heavy` and follows to
   its door (4)** — Air first, because in the tunnel Earth could never get past it.

Recorded solution: 41.5 s, 4/4 gems, par 110 s.

## Why each player is needed

- **Earth** is the only mass-2 body in the game, so `p_heavy` is Earth's or nobody's, and the gate
  cannot open at all without Earth standing in the tunnel. Which is exactly why Earth can never be
  one of the two who go through it: the door Earth opens is a door only Earth is barred from.
- **Fire** is the only one who lights the torch, and the belt wants the torch *and* the crank. The
  works are full of a boulder nobody over there can shift — Fire, Water and Air cannot move a
  boulder a pixel — so the belt is the only hand in the room, and Fire is the only one who can
  start it. That is what forces Fire to be one of the two who cross.
- **Air** is the only one the draught lifts (measured: at strength 1.5 Fire and Water reach 2.6
  tiles up the shaft and Earth 2.3, against the fourteen tiles needed), and the only one a turbine
  answers to. Air has to cross for the turbine, and once across is the only one with a way home —
  and that way home is the only way anyone can ever take `p_west`.
- **Water** is the spare body. With Earth on the heavy plate and the works needing both Fire and
  Air, the second plate can only be Water's, and her own door is on the far side — so she is the
  one who has to wait out the whole middle of the level on a plate and cross last. `check` confirms
  it: with Water idle the level cannot be finished at all.

## The insight

The gate wants two bodies standing still and there are only four of you, so exactly two can ever be
on the far side at once — and the tunnel decides *which* two before anyone has done anything,
because once you are in it you are in the order you are in. Work out who the far side actually
needs (the torch is Fire's, the turbine is Air's), notice that the middle plate is heavy and so
spoken for, and the queue writes itself: Air, Fire, Water, Earth. Then comes the part that is not
obvious at all — Water's door is over there too, and she can only cross when a *third* plate is
held, and the only plate she is not standing in front of is the one behind Earth. Nobody in the
tunnel can reach it. The only body that can is one that comes in from the yard end, and the only
way back to the yard end is the long way round: up the draught, along the gallery over everybody's
heads, and down the hole next to the door Air started beside.

## Likely failures and how players recover

- **Sending Earth through.** Earth is obviously the one the works want — there is a boulder in
  there. Earth walks to the head of the queue, somebody light takes the heavy plate, and the gate
  does not move. Costs nothing but the walk back out; the tunnel empties in the reverse order it
  filled.
- **Sending the wrong pair.** If Fire and Water cross (leaving Earth and Air holding), the works
  have a torch nobody can light, or a turbine nobody can spin, and whoever is over there is stuck
  with a stone they cannot push. Recoverable: the holders keep holding, the pair walks back into
  the tunnel, and then everybody backs out to the yard and re-forms. Expensive, never fatal.
- **Forgetting the gem at the far end.** Earth's gem sits at x=22, past every plate. If the queue
  has already formed, the whole queue has to walk back out before Earth can fetch it — or Earth can
  go for it at the very end, when the tunnel is empty again.
- **Spinning the turbine too early.** The vault wants the turbine and the stone's plate on at the
  same moment. Air touching the turbine before the stone arrives does nothing; the turbine stays on
  for 600 ticks afterwards, and Air can simply touch it again. No window to miss.
- **Riding the draught before the turbine is spun.** Air ends up back in the yard with nothing
  done, and has to be sent across again — which the other three can do, because two of them are
  still free to hold plates. A lap lost, not the level.
- Nothing in the level can be put somewhere it cannot come back from: the stone only ever travels
  east onto its plate, and once it is there the draught never stops.

## Shortcuts that were closed

- **Jumping the gate, or standing on a partner to clear it.** The tunnel's roof is one tile above
  its floor over its whole length, which forbids jumping outright — the measured cleanest way to
  forbid a shortcut. The gate itself is one tile tall in a one-tile hole, so it reaches the roof.
- **Holding the gate open with a body.** The nearest plate is five tiles from the gate and the gate
  is shut eight ticks after a plate is released, so nobody can hold and then run. A player standing
  *in* the doorway as a doorstop gains nothing either: to be there at all the gate must already be
  open, which takes two holders, and the two who then end up on the far side are the same two who
  would have crossed anyway — the holders are still eight tiles back.
- **Two light players making up a heavy plate.** A plate takes `max(mass)` and ignores riders, so
  two bodies on `p_heavy`, or one standing on another's head, still weigh 1.
- **Putting the stone on the tunnel plates.** The stone is in the works and only Earth can push it;
  Earth can only get into the works after the gate has been opened for the second and last time, by
  which point the stone has nothing left to do.
- **Fire or Water climbing the shaft.** Probed: with the draught on, Fire and Water get 2.6 tiles
  and Earth 2.3, against fourteen tiles to the gallery. Jumping repeatedly does not accumulate.
- **Boosting somebody into the gallery from the works.** Three players is the most that can ever be
  east at once, and a three-player boost is measured at about 10.7 tiles; the gallery is fourteen
  above the works floor.
- **Boosting somebody into the gallery from the yard** is the one route I could not rule out by
  measurement: the gallery is fourteen tiles above the yard floor, and only three-player boosts are
  documented (10.7 tiles). If four players can manage it, it buys nothing — it is an alternative
  way to put *one* player in the works, the gate still has to open for the second one, and the
  draught is still the only way anybody comes home, so the level is solved the same way by a harder
  road.
- **Walking back west through the open gate** is allowed, and deliberately useless: a returning
  player can only reach the pocket between the gate and whoever is holding `p_east`, and there is
  no plate in that pocket. Anyone who comes back has to join at the back, which in a one-tile
  tunnel means the far end of it.

## Kinship with the campaign

The nearest campaign level is **Quorum** (`l54_quorum`), which also has gates that count how many
plates are held. Quorum's counting happens in four separate lanes, and the puzzle is arithmetic:
get the right *number* of bodies on plates, then walk through. Here the count is fixed at two and
the whole question is *whose* bodies, because the plates and the gate share one corridor that
nobody can turn around in — the gate is not a sum to solve but a decision about who gets abandoned
on which side of it. **Portcullis** (`l56_portcullis`) is the other neighbour: it also makes a
plate-holder unable to use their own gate, but it answers that with the doorstop trick, which is
exactly what the five-tile gap between plate and gate forbids here. And where **One Through**
(`l83_one_through`) uses a quorum to let exactly one player past, this uses one to make exactly one
player — the heaviest — permanently ineligible.
