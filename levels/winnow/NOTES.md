# Winnow (`winnow`) — Fire + Water + Earth + Air

**Introduces:** a cage that rises through a one-way grating cannot put anything down while it is
still holding it — only the trip back down leaves the load standing on the grating, so the cage
delivers upward and never returns anything, while people step off at the top and drop back through
at will.

## The intended solution

Three storeys, joined by one shaft at x=18–20. The **hall** (floor row 18) is where everyone
starts. The **loft** (floor row 11) is sealed from it by rock except for three one-way grating
tiles over the shaft. The **cellar** (floor row 20) is under the hall, and its only opening is the
shaft mouth — three more one-way tiles in the hall floor, which the parked cage plugs completely.

The cage runs between the hall floor and one tile above the loft floor. It moves only while
**both** the `drum` (a heavy plate on a one-tile ledge at x=5–7) and the `pad` (a light plate on a
one-tile ledge at x=31–32) are held. The drum is heavy, so only Earth can work it, and the stone
cannot be pushed up onto its ledge — so Earth, and nobody else, is the engine.

1. **Earth** rolls the stone east along the hall floor until it stands on the parked cage, then
   walks back and climbs onto the drum.
2. **Fire** climbs onto the pad. With both held the cage rises, carrying the stone up through the
   grating — and the shaft mouth it was plugging is now open.
3. **Air** drops through the open mouth into the cellar, walks its length for his gem, and stands
   on the turbine at the far west end.
4. **Earth steps off the drum.** The cage falls. The grating combs the stone off it and leaves it
   standing on the `shelf` plate; at the same moment the cage plugs the mouth again, shutting Air
   in. Shelf and turbine are now both on, and the **vault** in the loft latches open.
5. Earth climbs back on the drum. The cage rises, which unplugs the mouth — and incidentally lifts
   the stone straight back off the shelf, which no longer matters now the vault has latched.
   **Air** springs the two tiles out of the cellar.
6. Earth steps off again; the cage comes home. **Air** boards it, then **Water**. Earth and Fire
   take the controls and the two of them ride up, stepping off onto the loft floor.
7. **Water** walks the loft to the `winch` at x=37 and throws it, collecting her gem on the way
   back to her door. Air takes his.
8. The two hall gates want the winch **and** the stone back on the shelf. So Earth and Fire have to
   let go of the controls one last time and let the cage fall, which puts the stone back down. Both
   gates latch open, and Earth walks west to his door while Fire walks east to his.

## Why each player is needed

- **Earth** is the only mass-2 body, so he is the only thing the heavy drum answers to. The stone
  would do instead, but it cannot be pushed up the one-tile ledge the drum sits on, so there is no
  substitute. He is also the only one who can move the stone at all.
- **Fire** is the second hand on the cage. Nothing moves with only the drum held, and the pad is
  twenty-five tiles from the drum, so the holder cannot also be the one at the shaft.
- **Air** is the only element a turbine answers to, and the turbine is the vault's second key.
- **Water** is the one who reaches the winch. Both hall gates are opened from the loft, so the two
  who stay below depend on someone who went up — and the two who went up got there on the backs of
  the two who stayed.

## The insight

The cage is a chute, not a lift. While it is holding the stone, the stone is not *on* anything —
it is two feet above the plate it is meant to press, riding a platform. The only way to set it
down is to send the cage away, and sending the cage away is also the only thing that shuts the
cellar. So the one moment that can open the vault — stone on the shelf, Air on the turbine — is a
moment nobody can arrange after the fact: **Air has to be already in the hole before you let the
cage fall.** Try it the natural way round, deliver the stone and then go and fetch Air, and you
find that opening the mouth means raising the cage, and raising the cage picks the stone straight
back off the shelf. The two halves of the lock are driven by the same lever in opposite phases.

The second turn of the same screw is the ending: the hall gates want the stone on the shelf too,
so the last thing the two at the controls do is let go.

## Likely failures and how players recover

- **"Send the stone up, then put Air down the hole."** The commonest plan, and it never closes:
  every time the mouth opens the shelf goes off. Costs a cycle to discover, nothing else.
- **Air touches the turbine while the stone is still in the air.** The vault takes two inputs at
  once and only latches when both are on, so nothing happens. Air waits where he is and it comes
  good on the next descent.
- **Parking the stone somewhere useless.** It cannot be pushed up either ledge and it cannot be
  pushed down through the mouth's one-way tiles, so the worst case is a long shove back.
- **Standing in the shaft when the cage comes down.** The cage shoves whoever is under it through
  the mouth into the cellar. Air, Fire and Water climb back out the two tiles as soon as the mouth
  is open again, which Earth can always arrange. Earth himself has no reason to be there — his
  door, his gem and the stone's whole route are all west of the shaft — but if a player walks him
  in anyway he is the one person who cannot be let out, since he is the only thing the drum
  answers to. A `checkpoint` in the hall at x=24 is there for exactly that, so the cost is a
  respawn rather than the level.
- **Riding up before the vault has latched.** Harmless: drop back through the grating into the
  hall and start again.

## Shortcuts that were closed

- **Jumping to the loft.** Seven tiles from the hall floor to the grating. Air's jump is measured
  at 3.75 tiles and a jump from a partner's head buys about one more.
- **A tower in the shaft.** The worst case is the stone parked on the mouth, Water on the stone,
  Fire on Water and Air on top. Simulated: Air's head pokes through the grating but his feet stop
  14 px below its surface, so he cannot land in the loft. Both ledges are only one tile, so no
  higher platform exists.
- **The stone as a key to the wrong lock.** Both the drum and the pad sit on one-tile ledges.
  Measured: a boulder pressed into a one-tile step does not climb it, so the stone can never hold
  the cage's own switches and strand the level with the cage aloft.
- **Getting into the cellar without the cage.** The mouth is the cellar's only opening, and the
  parked cage plugs all three tiles of it — tested: pressing Down on a parked cage does nothing.
- **Bypassing the vault or the gates.** The vault fills rows 8–10 between the loft's rock ceiling
  and its floor; each hall gate fills rows 12–17 between the hall's ceiling and floor. No gaps.
- **Holding a gate open with a body.** Unnecessary — all three latch — and a body cannot help
  anyway, since what they are waiting for is the stone, not a passage.
- **Earth riding up after all.** He cannot: the drum is heavy, the stone cannot reach it, and the
  cage does not move with the drum unheld. His door is in the hall for that reason, and working
  that out is half the level.

## Kinship with the campaign

Nearest is **Weighbridge** (`l90_weighbridge`), the other level about a lift that treats cargo and
passengers differently. There the lift *sorts*: with the lever on it stops at the middle floor for
anything heavy and carries light riders past, so who gets off where is a setting. Here the lift
cannot stop for anybody — it has two ends and nothing in between — and the difference between
cargo and passenger is not a rule the machine applies but a fact about bodies: a person steps off
the platform at the top, and a stone cannot, so a stone is only ever delivered by the platform
leaving. **Tripwire** (`tripwire`, this repo) also hangs a plate in a lift shaft, but there the
plate is pressed by a rider passing it and the puzzle is the length of the window; here the plate
is at the top of the shaft, is pressed only by what the lift abandons, and there is no window at
all — the level is motor-free and every mechanism latches or is held by the stone.
