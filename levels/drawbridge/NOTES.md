# Drawbridge

**Introduces:** a drawbridge that is eaten from its far end back towards its hinge, faster than
anyone runs, whenever anything heavy is past the mark. So the weight can never cross, everything
beyond the mark is thrown into the hall in order of distance, and the bridge then slides back out
carrying whoever stands on it.

## The intended solution

The gatehouse is in the west, the keep with the three doors in the east, and between them a long
drawbridge over a flooded hall. A **curtain of heavy plates** hangs over the bridge's far part,
from x=14 to the keep (three rows of plates, so nothing passes it untouched). While anything heavy
is under the curtain the bridge opens, and a wide door opens by **vanishing from its free end back
towards its hinge at 4 px a tick**. When the weight has fallen through, the bridge **slides back
out, carrying whoever stands on it** at the same speed. Earth and the stone start shut in a stall
at the back of the gatehouse.

1. **Fire** walks over the bridge (the curtain ignores a light player; Fire's gem is on the way),
   into the keep, and pulls the **winch**. The winch opens the stall, and also sends the hoist up
   from the hall, empty, which looks like a waste and is the price of the stall.
2. **Water** walks out to the far end of the bridge, where its gem is, and **waits there**.
3. **Earth** shoves the stone out of the stall and east along the bridge until it touches the
   curtain. The far end of the bridge starts to vanish. Water, standing furthest out, falls first
   into the flooded hall, which is harmless to Water and nobody else.
4. Earth **gets off the bridge at once, all the way back onto the gatehouse floor.** The edge eats
   back to the stone, the stone drops and floats in the pool, and the bridge slides back out,
   carrying anything on it straight into the curtain again. *This is the motor moment.*
5. Water wades the length of the hall to the **freeze pad** at its west end. The pool freezes.
6. Earth walks into the curtain **and stands there**. The bridge is eaten back to Earth, and Earth
   drops onto the ice beside the floating stone.
7. Earth hops back over the stone and shoves it east across the ice onto the **gate plate** on the
   dry floor (Earth's gem is on the way). The gate in front of the three doors opens. The stone
   cannot go further: a one-tile step stands between it and the hoist.
8. Fire turns the winch **off**: the hoist comes down. Earth hops over the stone, climbs the step
   and boards. **The hoist takes one rider**: a stone lintel over its top stop leaves room for only
   one body.
9. Fire turns the winch **on**: Earth rides up through the grating into the keep and walks to its
   door. Fire turns it **off** again: the hoist goes down empty (it rises through a one-way
   grating, so it only ever delivers upward). Water boards, Fire turns it **on**, and Water comes up.
10. All three walk through the open gate into their doors.

`check`: solved in **43.4 s**, par 120 s, 3/3 gems, no deaths, no warnings. Every shortcut below
fails for the reason given.

## Why each player is needed

- **Earth** is the only thing besides the stone that the curtain notices, and the only thing that
  can move the stone (measured in other levels here: Fire pressed into a boulder for 600 ticks and it
  did not move). Earth cannot cross the bridge, by walking or by hopping (both proved below), so it
  can only reach the keep from the hall, by the hoist.
- **Water** is the only one who survives a fall into the flooded hall, and the only one who can
  freeze it. Until Water is down there, any fall kills Earth, and the stone can never be pushed.
- **Fire** is the only one who can be in the keep when the hoist is needed. Water is in the hall,
  and Earth can never be on the keep side of the curtain. A Water that pulls the winch first and
  then gets dropped leaves the hoist stuck at the top with nobody to bring it down. The co-op check
  confirms that the level cannot be finished while any one of the three idles in its door.

## The insight

A heavy weight on the far half of this bridge does not drop the whole bridge at once. It drops it
**from the far end back to itself**, faster than anybody can run. So the mark is not a trap for the
one who steps on it: it is a trapdoor for everyone **beyond** it, and the one thing you can do with
it is to throw a light partner into the hall. Water is the only one who survives that, so Water has
to go first, and the stone (or Earth) is what throws it. After that, Earth gets down the same way,
by standing on the mark on purpose and waiting for the floor to come and take it.

The second half of the insight is the regrowth. When the weight has gone, the bridge slides back
out and carries everyone on it. Backing off a tile or two is therefore not enough: anything left on
the bridge is carried into the curtain and starts the whole thing again. Off means off.

## The motor challenge

One moment, step 4, and it is legible before it happens: the far end of the bridge visibly starts
to go the instant the stone touches the curtain. In the recorded run the stone touches the mark at
tick 500 with Earth at x=12.3, and the bridge starts sliding back out at tick 652. Earth needs about
52 ticks to get its whole body onto the gatehouse floor, which leaves **about 100 ticks (1.7 s) of
slack**. A miss is recoverable: if Earth is carried into the curtain it is dropped, and it either
drowns (a restart from the checkpoint by the stall, a cost in time) or, if Water has already frozen
the pool, simply lands on the ice, which is step 6 done early.

There is a harder alternative for good players: Earth can follow the stone over the edge and steer
in mid-air onto the floating stone, which keeps it out of the water until Water has frozen the pool.
It needs the same partners and the same order, so it is a variation, not a shortcut.

## Likely failures and how players recover

- **Earth pushes the stone across, or walks across itself.** The far end goes, Earth is caught
  wherever the edge meets it, and drowns. Restart at the checkpoint; nothing is lost.
- **Earth stops a tile short of the mark and waits.** The bridge slides back out and carries Earth
  into the curtain. Same as above, which is exactly the lesson.
- **Water tries to get down by standing on the mark.** Nothing happens: Water is light. Water has to
  be thrown in by a weight.
- **Fire waits on the far half of the bridge.** When the stone goes on the mark Fire is dropped with
  Water and drowns. Fire should be in the keep before Earth does anything.
- **Earth goes down before the pool is frozen.** Drowns. Water has to be on the pad first.
- **Fire turns the winch off before the stone is out of the stall.** The stall shuts again. Turn it
  back on: nothing is lost.
- **Fire raises the hoist with two on it, Water on Earth's head.** It jams under the lintel; Fire
  turns the winch off, the pair come back down, and they ride one at a time.
- **A body under the descending hoist** stops it while it is there (measured), and it carries on
  once they step clear. Nothing in the level can jam it for good: the stone cannot climb the step
  to reach the shaft.

## Shortcuts that were closed

- **Earth walks over the bridge.** The curtain covers the whole far part of the bridge, three rows
  deep. A plate only senses an 8 px strip at the bottom of its tile (measured: the `h` field does
  not change that), so a single row could simply be hopped; with three rows the gaps between strips
  are 24 px, less than any body, so anything heavy past x=14 is always touching a plate. *Script:
  "Earth walks over the bridge to the keep": Earth drowns at x=23.4.*
- **Earth hops over the bridge.** Same curtain. *Script: "Earth hops over the bridge to the keep":
  Earth drowns at x=23.0.*
- **The stone is pushed fast enough to cross, or dropped straight onto the gate plate.** The edge
  comes back at 4 px a tick and Earth pushes at about 2.6, so a stone pushed from the mark meets
  the edge at about x=21, over the pool. The gate plate is at x=29 and can never be reached from
  above. *Script: "Earth follows the stone down before the pool is frozen": Earth drowns at x=21.2.*
- **Earth follows the stone down at once.** Drowns, because the pool is not yet frozen (same script).
- **Two riders on the one-rider hoist.** A stone lintel at x=33 over the hoist's top stop leaves
  exactly one body of headroom: the upper rider of a stack hits it while the platform is still
  inside the grating, and the hoist stops there. *Script: "Water rides the one-rider hoist on
  Earth's head": the hoist never reaches the keep.*
- **Earth on a partner's head across the bridge.** A heavy plate reads the heaviest thing
  overlapping it, and Earth on a head still overlaps the curtain, so this is the walking case.
- **The way back.** There is none, and none is needed: the hoist only delivers upward (it rises
  through a one-way grating and leaves its rider on top on the way down), so nobody can ride down
  into the hall from the keep, and the hall is reached only through the bridge.

## Kinship with the campaign

The nearest campaign levels are **Floodgate** (a frozen tunnel and a bridge that exists only while
someone holds it) and **Relay** (each of you holds a bridge for someone, then runs). In both, a
bridge is either there or not, and the question is who holds it. Here nobody holds the bridge. It is
always there, and the puzzle is the *direction* it disappears in: from the far end back, faster than
anyone runs, and stopping at the weight. That turns one bridge into a trapdoor for whoever is beyond
the mark, a wall for anything heavy, and a conveyor that carries you back into the mark if you
dawdle. The nearest level in this repo is **Thermal Stair**, whose one-seat lift is ridden twice;
the one-rider hoist here is the closing errand, not the idea.

Before settling on this I tried two other things nobody has built on: the height of a short hop as
a choice (a full jump trips a hanging plate, a tap clears the hurdle under it), which measured as
too narrow a band to be fair, and riding a rolling boulder across sludge, which the campaign's Ferry
already does.
