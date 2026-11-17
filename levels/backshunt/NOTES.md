# Backshunt

**Introduces:** a conveyor with no off switch, only a direction — the one stone it carries is always
pinned against the west buffer or the east buffer and never anywhere between, so the lever does not
turn anything on, it decides which end of the level has power.

The hall is one long belt in `reverse` mode: it always runs, and the shunt lever only turns it
round. A heavy plate hangs over each buffer stop. There is no Earth in this party, so nobody can
lay a hand on the stone and nothing else in the level is heavy enough to hold either plate — the
stone is the only current, and it can only ever be at one end.

- **West plate** → the draught in the west shaft, the only way up out of the hall for Fire and Water.
- **East plate** → one of the two inputs of the vault gates up in the gallery. The other is Fire's
  torch, at the dead end behind the flooded ford. The gates want both at once.

So the level has to be worked at the west end and finished at the east end, and the stone cannot be
in both places. Whoever is still in the hall when the stone goes back east is staying there, unless
it is Air: the chimney in the east wall is a one-tile flue with a tile of mist at its foot, and the
draught in it is weak enough (0.9) that it lifts nobody but Air.

## The intended solution

1. The party starts at the east end, standing beside the stone where the belt has already driven it
   against the east buffer. Fire and Water walk the length of the hall west, over the buffer stop
   and past the dead plate.
2. **Water stops on the freeze pad** at the mouth of the ford and stays there. The ford is a
   four-tile flooded crawlway one tile high: Water can wade it, nobody can be carried through it,
   and nothing can jump in it. While Water stands on the pad it is ice.
3. **Fire crosses the ice** to the dead end, lights the torch on the end wall (one of the two things
   the vault gates want) and takes its gem from the alcove above.
4. **Air walks east to the shunt lever**, takes its gem on the way with a jump, and throws the lever.
   The belt turns round. The stone leaves the east plate — the gates lose their second input, and
   the flue goes quiet — and begins the long crawl west.
5. The stone reaches the **west buffer**. The west draught starts.
6. Water leaves the pad (the ford stays ice for fifteen seconds), wades back through for its gem,
   and **rides the draught up the west shaft** into the gallery; Fire follows it up. Both walk east
   along the gallery and wait at the closed west gate.
7. **Air throws the lever back.** This is the move the whole level is built on: it takes the draught
   away from the two players it just carried, because the gates are wired to the other end. The
   stone crawls east again.
8. The stone reaches the **east buffer**: torch + east plate = two inputs, and both vault gates
   open. The flue is live again — and Air, who never left the hall, crawls into it and rides up.
9. All three walk into the vault in the middle of the gallery.

41.9 s for the recorded solution, par 120 s.

## Why each player is needed

- **Water** is the only one who can be in the ford at all, and the freeze pad is the only thing that
  makes the ford crossable for anyone else. Without Water the torch is unreachable and the vault
  gates never get their second input.
- **Fire** is the only one who can light the torch at the dead end, which is one of the two things
  both vault gates want. Nothing else in the level can supply it.
- **Air** is the only one the east flue will lift: the draught there is 0.9, which lifts Air and
  nothing else, the flue mouth is one tile high so nobody can be carried in on a head, and the floor
  of the chimney is mist, which kills anyone else who steps onto it. That makes Air the only player
  who can be the one left in the hall at the end — and somebody has to be, because the lever is in
  the hall and the level has to end with the stone at the east buffer.

Nobody here stands on a switch for the others. The stone does all of the holding; what the players
are deciding is which end it holds at, and in what order.

## The insight

The lever is not an on switch. There is no state of this level in which both the lift that gets Fire
and Water out of the hall and the lock on the vault are powered. So the question is not *how do we
turn things on*, it is *what does the west end still owe us*, and the answer has to be settled
completely — torch lit, both passengers up — before the stone is sent home. The last move is to undo
the move that got everybody up.

## Likely failures and how players recover

- **Throwing the lever as soon as you find it.** The lever is three tiles from the spawn and the
  obvious first thing to touch. Do it before Water is on the pad and Fire is across, and the ford
  is still open water with the torch unlit on the far side; the stone has to be sent back east and
  then west again, about twenty-four seconds of belt. Nothing is lost.
- **Sending the stone home too early.** If Air throws the lever back while Fire or Water is still in
  the hall, the west draught dies and they are stranded below. Air throws it again, waits out the
  belt, and they ride up. Costly, never fatal: the lever is always in the hall, Air can always
  drop back down a shaft to reach it, and the flue Air comes back up by is live in exactly the
  state the level has to end in anyway.
- **Walking into the ford before it is ice, or into the mist at the foot of the flue.** Both kill.
  There is a checkpoint on the hall floor beside the pad.
- **Letting the ice thaw.** It lasts fifteen seconds after Water steps off the pad, which is three
  times what the crossing takes; if it does thaw, Water walks back over the pad and it freezes
  again.
- **Trying to park the stone in the middle.** A player standing on the belt can hold the stone
  anywhere, and it does nothing: the plates are only at the two buffers.

The level cannot be made unwinnable. Every machine in it is reversible, the lever that drives them
all is on the hall floor where anyone can reach it, and every player who can be above can get back
down through one of the two shafts.

## Shortcuts that were closed

- **Air carrying Fire or Water up the flue.** Measured: a 0.9 draught *does* lift Air with a
  passenger on its head, so this had to be blocked by shape, not by strength. The flue mouth is one
  tile high — a stack is 58 px and does not fit — and a probe confirms the passenger is left standing
  outside while Air crawls in alone.
- **Standing in the chimney to be picked up.** The one tile at the foot of the chimney is mist.
  Fire and Water die on it, so they can never be in the tile Air has to jump from, and there is no
  way to put a body on Air's head in there.
- **Climbing into the chimney from the hall.** The three tiles of wall above the flue are solid, so
  there is no ledge over the mouth to drop in from.
- **A human ladder up the west shaft.** Measured: Fire on Water's head reaches a top of y≈13.9 — the
  gallery floor is a tile and a half higher, so a pair cannot do it. All three stacked can just
  launch the top player onto the gallery, and it gains nothing: the other two still cannot follow
  without the draught, the gates still want the stone at the east buffer, and somebody still has to
  be in the hall to shunt it. It is strictly slower than riding up.
- **Carrying Fire through the ford on Water's head.** The ford is roofed one tile above the water,
  so there is no room for a passenger and no room to jump.
- **Flying over the ford.** The three tiles above it are solid rock; the crawlway is the only way to
  the dead end.
- **Jumping either vault gate.** Both are three tiles under a three-tile roof, and their triggers
  are nine and fifteen tiles away.
- **Holding a gate up with a body.** It works — a closing gate rests on whoever is under it — and it
  buys nothing, because the gate has to be open before anyone can be under it, which already means
  the stone is at the east buffer.

## Kinship with the campaign

Nearest is **Sorting Yard** (`l61_sorting_yard`), the other level built on a belt that can be turned
round. There the belt is a sorter: two loads come down it and the puzzle is choosing the moment to
reverse so that they end up in different places. Here there is one load, the reversal is not a
moment but a standing decision, and the belt never stops — so the stone is not something you aim,
it is a supply that is always plugged into one end of the level and unplugged from the other.
**Gondola** (`l26_gondola`) and **Ferryman** (`l33_ferryman`) share the one-vehicle-many-claims
shape, but in both of those whoever holds the switches cannot ride; nobody holds anything in
Backshunt, which is what makes the question *which end* rather than *who stays*.
