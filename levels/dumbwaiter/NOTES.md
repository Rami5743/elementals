# Dumbwaiter (`dumbwaiter`) — Fire + Earth + Air

**Introduces:** a hoist that runs up through a one-way grating, so whatever it carries is scraped
off on the grating when it goes back down — it delivers upward and only upward, and people can
drop back through after their cargo but the cargo can never follow them down.

## The intended solution

Two floors with no stair between them: a hall at the bottom, a gallery at the top, and twelve
tiles of solid rock in between pierced by one shaft. The shaft is floored at both ends with
one-way grating — solid to stand and park a stone on, open to the hoist rising from beneath.

1. **Air** is the only one the turbine answers to, and the hoist climbs only while Air is standing
   on it. Air takes up that post and, in effect, never leaves it again.
2. **Fire** walks onto the parked hoist. Air holds the turbine; Fire rides up alone and steps off
   onto the gallery, onto the plate there. That plate unlocks the loading bay down in the hall —
   nothing in the hall opens it, so nobody can load anything until somebody is already up top.
3. Air steps off the turbine. The hoist comes home empty.
4. **Earth** hops over the stone, walks it the length of the hall, west through the loading bay and
   onto the hoist. Then Earth climbs on top of the stone, because the hoist takes one load and
   Earth is the only one who can take the stone off at the far end: the load has to include its
   own handler.
5. Air returns to the turbine. Stone and rider go up together. Earth steps off west onto the
   gallery floor; Air steps off the turbine; the hoist drops away and **the stone stays behind on
   the grating.** That is the whole level in one moment.
6. Earth walks the stone east onto the gallery plate. With the stone holding it, Fire is free of
   the plate at last — Fire hops over the stone, goes west through the gate, takes its gem and
   lights the torch. The torch opens the vault at the far east end of the hall below.
7. Earth walks the stone on east onto the heavy plate. **Air's gate latches open** — the stone Air
   spent the whole level hoisting is what finally lets Air out.
8. But the vault's plate is heavy, and the only heavy thing left in the hall is a person. So Earth
   goes back to the grating and **drops through it** — people can, cargo cannot — crosses the hall,
   takes the loose gem, stands in the vault and latches Earth's own gate open.
9. Earth walks back to the hoist. Air gets on the turbine one last time and sends Earth up. Earth
   hops over the stone, collects its gem and goes home; Fire is already home; Air finally walks
   west through its gate, takes its gem and follows.

Recorded solution: **43.7 s**, 4/4 gems, par 120 s.

## Why each player is needed

- **Air** is the engine. The turbine is Air's alone, and with `duration` at zero the hoist runs
  only while Air is physically on it. Every one of the five trips is Air's work, and because
  letting go is what brings the hoist down, Air can never be on board. Air does more than anybody
  and moves less than anybody.
- **Earth** is the only one who can shift the stone — at the bottom *and* at the top. That is the
  pincer the level is built from: being the only loader and the only unloader means Earth cannot
  send the stone ahead and follow, and has to travel as part of the load. Earth is also the only
  body heavy enough for either heavy plate once the stone has gone up for good.
- **Fire** is the only one who can light the torch, and before that the only one who can be spared
  to go up empty and hold the gallery plate. The loading bay cannot be unlocked from the hall, so
  somebody has to be upstairs before anything can be sent upstairs — and it cannot be Earth, who
  is needed below, or Air, who is holding the machine.

## The insight

Every lift anyone has met is two-way transport. This one is a ratchet. The grating it rises
through is solid from above, so the platform slides out from under its load and leaves it sitting
there; a closing door is the only thing in the simulation that pushes an object down through a
one-way tile, and there isn't one. So the hoist has exactly one direction for cargo.

Everything else follows from that. The stone has to finish every errand it will ever owe the hall
*before* it is loaded — and the level makes sure it owes one afterwards, so that the players
discover the rule by wanting it broken. And the asymmetry is the way out: the grating that will
not let the stone down will let Earth down, which is why act three is a person doing a stone's job
and then queueing for the hoist like freight.

## Likely failures and how players recover

- **"Send the cargo up first, then follow it."** The obvious plan, and exactly wrong — the point of
  the level is that it looks right. It is recoverable, and the recovery teaches the mechanic:
  tested in the simulation, the stone parks on the landing, and when Earth rides up afterwards the
  rising platform lifts the stone onto Earth's head. Earth walks out from under it wherever it is
  wanted. Nobody dies and nothing is lost; it just takes two trips to learn what one would have
  taught.
- **"Earth should go up, that's where the work is."** Then nobody is left below who can move the
  stone, and Fire and Air can only stand and look at it. Earth drops back through the grating and
  starts again, a round trip poorer.
- **"Hold the gallery plate with Earth so Fire can go west early."** This works, and is a real
  alternative route — but it spends Earth's trip, so the stone still has to be fetched afterwards.
  Slower, not wrong.
- **Fire caught east of the west gate when the stone moves on from the gallery plate.** Fire's gate
  is held by the plate, not latched, so it shuts when the stone leaves. Earth walks the stone back
  onto the plate and Fire goes through. Costs a push each way.
- **The stone shoved into a far corner.** Both rooms are left deliberately roomy at the east end so
  Earth can always hop over it and get behind it again.

No state in this level is unwinnable. Every gate that matters afterwards is latched, every object
is retrievable, there is no liquid anywhere and nothing that can kill anyone — the only cost of a
wrong plan is walking.

## Shortcuts that were closed

- **Climbing the shaft.** The shaft is twelve tiles of bare rock. A three-high tower on the hall
  floor puts Air's feet at about 460 px at the top of its jump against a chimney mouth at 448 and
  a landing at 256; even standing the tower on the stone does not reach a floor, because rows 9–13
  are open air with nothing to land on. Measured against the body table rather than guessed.
- **Jumping or gliding a barrier.** Every door spans its room floor-to-ceiling: `h: 6` in the
  six-tile hall, `h: 4` in the four-tile gallery. There is no doorway left over the top of any of
  them, and no gap anywhere for Air to glide.
- **Holding a gate open with a body instead of the plate.** Possible on the west gallery gate, and
  harmless: it still needs a second player up in the gallery to let go of the plate, which is the
  same cost the intended route pays.
- **Getting the stone back down.** The only two openings between the floors are the gratings, and
  both are solid from above. The one machine in the simulation that pushes an object down through
  a one-way tile is a closing door, and this level deliberately has none anywhere near the shaft.
- **Loading the stone before anyone is upstairs.** The loading bay gate has no trigger in the hall
  at all; the only switch that opens it is in the gallery.
- **Pressing the vault plate with the stone instead of Earth.** The vault is opened by the torch,
  the torch can only be reached once the stone is holding the gallery plate — so by the time the
  vault exists, the stone is a storey above it and staying there.
- **Motor check.** Nothing is timed, nothing is a window, nothing can kill. The one hop in the
  level is Earth stepping up onto a stone standing on flat floor next to it, with nothing to fall
  into and no cost to missing; and even that is optional, since the stone can be sent up alone and
  caught on the way out.

## Kinship with the campaign

The nearest campaign level is **Ore Run** (`l52_ore_run`) — the same three elements, and the same
parts list: a lift, a boulder, a walkway above and a vault plate the boulder has to end up on.
There the lift is ordinary two-way transport and the puzzle is the route the boulder takes around
the map; the boulder can be let down again whenever it suits, and does. Here the lift is not
transport at all but a one-way valve, and the question is never *where* the stone goes but *when*
it is allowed to go, because going is final.

**Ferryman** (`l33_ferryman`) is the other relative: a one-seat gondola that takes a player or a
crate or a boulder, so load order is the puzzle. Ferryman's ferry comes back with whatever is on
it. That is precisely the thing this hoist will not do.
