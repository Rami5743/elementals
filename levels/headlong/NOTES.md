# Headlong

**Introduces:** a runaway nobody can overtake, and a way down that only opens at the instant it is
loosed — so the only way to get in front of the stone is to throw yourself off the catwalk after it.

## The intended solution

The stone starts in the bay, at the bottom of everything.

1. **Earth** walks round behind the stone and shunts it the length of the bay, past the hoist, up
   towards the west wall. Earth's gem is on the way.
2. Earth **hops over the stone** and shunts it back east on to the hoist's deck. The hop is the
   whole point of going past: from here on Earth pushes eastward, and so ends up on the uphill side
   of the stone — which is the side it has to be pushed from at the top.
3. Earth keeps a hand on the hoist's control rail for the whole climb and rides up beside the
   stone to the gallery.
4. Earth shoves the stone off the deck on to the **head of the chute**. It runs away down the
   stepped slope of its own accord and parks against the **pen door**, four tiles down. Letting go
   of the rail, Earth rides back down to the bay.
5. **Air** climbs the people's ladder to the gallery, takes its gem, and waits *beside* the
   turbine — not on it.
6. **Water** climbs the ladder too, goes west to the stair well, hops up the one-way ledge and the
   step on to the **catwalk**, wades the pool at its mouth, and runs the whole length of the
   catwalk to the gate at its east end.
7. Air steps on to the **turbine**. That one touch opens the pen door *and* the catwalk gate
   together: the stone is away down the chute, and the only way down to the ledge has just opened.
8. Water goes through the gate, runs off the end of the catwalk, and **pulls back west in mid-air**
   to land on the three-tile ledge at the foot of the chute.
9. The stone arrives, runs on to the heavy pad, and is **stopped dead by Water standing beyond
   it**. Its weight holds the pad, and the pad holds the way gate in the bay open.
10. Air leaves the turbine; Air and Earth come down the ladder, Water steps off the ledge into the
    void, and all three walk through the open gate to their doors.

`check`: solved in **38.5 s**, par 120 s, 3/3 gems, no deaths, no warnings.

## Why each player is needed

- **Earth** — the only thing in the game that can move a boulder at all (measured: Fire pressed into
  one for 600 ticks and it did not shift a pixel). Earth is the whole of the setup, and the only one
  who can put the stone back on the hoist after a miss. Earth also cannot do anything else: its 76 px
  jump will not carry it up the stair well to the catwalk, and the pool at the catwalk's mouth would
  stop it even if it did.
- **Air** — the only thing a turbine answers to, wherever it is placed, so this cannot be faked by
  height, a head-stack or a crate. Air starts everybody's clock. And Air cannot then be the brake:
  the gate it opened shuts the moment it steps off the turbine, which is proved by a shortcut.
- **Water** — the only one who can be on the catwalk at all (the pool at its mouth is three tiles
  wide: too wide for Earth to jump and lethal to anyone but Water), and therefore the only one who
  can reach the ledge. Water is also mass 1, far too light to hold the heavy pad, so Water cannot
  stand in for the stone.

## The insight

The stone is loose before anybody can be in front of it, so the dive has to be part of the plan
rather than a reaction to it. A rolling boulder holds 4 px a tick and the fastest player manages
3.4, so it can never be caught from behind; and the single turbine that looses it is the same
turbine that opens the catwalk. The way to get ahead of the stone is to let it go first and then
fall, because falling is quicker than any road in the level.

## The motor challenge

One precision moment, and it is the whole level: from the tick Air touches the turbine, Water has to
clear the gate, run off the end of the catwalk and pull back west on to the ledge before the stone
finishes the chute.

- **Measured forgiveness: about two seconds.** Up to 90 ticks of hesitation still makes it; 120
  ticks loses the stone. Both are scripted — "Water strolls the catwalk instead of running" is in
  `shortcuts` and proves the clock is load-bearing.
- **The landing is three tiles wide** (the whole ledge), and a brake that lands on the wrong tile
  can simply walk along: the stone follows a body down the last of the slope and stops wherever
  that body stops.
- **No door window to run.** The catwalk gate stays open for exactly as long as Air stands on the
  turbine, so there is nothing to sprint but the stone itself — and players can watch it coming
  down the chute.
- **Legible before it is attempted.** From the catwalk you can see the chute, the ledge, the pad and
  the drop beyond it all at once.
- **Every attempt repeats.** A missed stone runs off the ledge into the bay, and Earth hauls it
  round again. Nothing is destroyed and nobody dies doing it.

## Likely failures and how players recover

- **Water dives late.** The stone runs the length of the ledge, drops into the bay, and the haul
  starts again: Earth shunts it back to the hoist, Water and Air climb back up. About half a minute,
  and nothing is lost.
- **Water forgets to steer west and lands in the void.** Water drops to the bay — the same cost, and
  Water has to climb back up with everyone else.
- **Somebody tries to follow the stone down the chute.** The chute is only reachable from the hoist
  deck, and the stone is faster than anybody; they arrive at an empty ledge.
- **Earth knocks the stone off the pad afterwards.** It falls into the bay. Haul it round again.
- **Somebody falls into the hoist shaft.** The control rail runs the height of the shaft, so anyone
  caught in the pit under the deck can call the platform up off themselves.
- There is a **checkpoint** in the bay, beside the spawns.

## Shortcuts that were closed

All four are scripted in `shortcuts` in `solution.mjs`, and `check` prints the reason each one
fails.

1. **"Water waits on the ledge before the stone is loosed."** This is the central claim, so it is
   the central proof. Air stays off the turbine; Water climbs to the catwalk and walks east.
   *Fails:* `water could not reach x=31` — the catwalk gate is shut, and the only switch that opens
   it is the same one that looses the stone. The chute is no use either: it is reachable only from
   the hoist deck, and the pen door blocks it.
2. **"Water strolls the catwalk instead of running."** Everything done right but two seconds late.
   *Fails:* `earth could not reach x=35` — the stone was never braked, so it went into the bay and
   the way gate never opened. This is what makes the motor demand real rather than decorative.
3. **"Air looses the stone and goes to brake it itself, so Water is not needed."** *Fails:*
   `air died` in the pool at the mouth of the catwalk. Behind that lies a second block: the gate
   shuts the moment Air steps off the turbine, so Air could not have got past it either.
4. **"Earth goes to hold the heavy pad itself instead of fetching the stone."** Earth is mass 2 and
   would hold a heavy plate perfectly well. *Fails:* `earth timed out waiting to stand on the stair
   ledge` — Earth's 76 px jump will not take it up the stair well, so Earth can never reach the
   catwalk, and the three-tile pool is behind that. The cheat carries an assertion that would fire
   if Earth ever did reach the pad, so the block cannot quietly stop working.

Hunted and answered without needing a script:

- **Could somebody jump the barriers from a partner's head?** The catwalk pool is a liquid, not a
  height; a head-stack does not help. The pen door and the catwalk gate are both three tiles under a
  solid roof.
- **Could a player stand on the heavy pad instead of the stone?** Only Earth is heavy enough and
  Earth cannot get to the ledge (above). And the pad does not latch, so even if Earth were standing
  on it, Earth could not also be in its door — the level would not finish.
- **Could someone ride the hoist beside the cargo?** Yes, deliberately: Earth has to, in order to
  push the stone off at the top. The deck is three tiles wide for exactly that.
- **Can the level reach a state it cannot be finished from?** No, and this took work. The hoist's
  control is a hold button running the height of the shaft: the mouth is never open unattended, so
  the stone cannot be shoved into an empty shaft and lost, and anybody who does fall into the pit
  under the deck can call the platform up off themselves. (With an ordinary button on the deck, a
  player in that pit was pinned under the returning platform for good — found by probing, and the
  reason the control is a rail.)
- **Is the way back open when it should not be?** The gallery is cut off from the chute whenever the
  platform is away, and the ledge drains one way into the bay, so nobody can loiter where the stone
  is going to be.

## Kinship with the campaign

Nearest campaign level: **Flash** (`l73_flash`) — a boulder rolled over a heavy plate nobody else
can reach, opening a gate for a moment. There the roll *is* the window and the players stand beside
the gate waiting for it; here the roll is the thing you have to beat to a place you are not allowed
to be standing yet, and the stone has to be stopped dead on the plate instead of merely crossing it.
**Ferry** (`l67_ferry`) and **Hoist** (`l72_hoist`) also send a stone down a slope — as transport
and as a weight — but in neither is the stone something you have to get *ahead* of. Nothing in the
campaign makes the switch that releases the runaway also be the switch that opens the only road to
where it is going.
