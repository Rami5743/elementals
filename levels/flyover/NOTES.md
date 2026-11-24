# Flyover

**Introduces:** a lock that counts bodies off the ground. Its two plates hang in the draught five
rows apart, where nobody can stand, so each is on only while somebody is in flight inside it — and
both the loft above and the gate in the cellar want the pair of them at the same moment. The
draught is what makes that fair: in it a jump lasts a second and a half instead of half a second,
so "both of us in the air at once" is a window a fourth player can walk through.

## The intended solution

1. Everyone starts in the cellar. The shaft above is dead: the fan is wired to two heavy plates
   and nothing is on either of them.
2. **Earth** stands on `weight_a` in the cellar. The draught starts. Earth is the only mass-2 body
   in the party, so Earth is the only one who can start it — and standing there is now all Earth
   can do.
3. **Air** jumps into the shaft from the cellar floor. Fire and Water get no lift from a 1.54
   draught, only hang time; Air climbs it at 5 px a tick, and parks itself at the top of the shaft,
   against the shut `hatch` that is the loft's only mouth.
4. **Fire** climbs the one-way shelves in the well on the left to the **high** ledge (row 8);
   **Water** follows to the **low** one (row 13). One at a time: the well is a single file.
5. On a count, **both launch**. Each sails out over the shaft and holds its own plate — Fire `hi`,
   Water `lo` — for about 65 ticks. With both on, the hatch opens and **Air slips into the loft**.
   The two fliers land on the ledge across the shaft.
6. In the loft, Air stands on the **crank** (a turbine: Air only). The crank is wired, inverted, to
   the `clamp` — a door standing open over the stone in the hopper at the far end. The crank
   *shuts* it, and the closing door pushes the stone down through the one-way grating it is
   resting on. Nothing else in this game moves a boulder through a grating.
7. The stone falls the whole chimney and lands in the notch on `weight_b`. **The draught is now
   powered for good, and Earth can leave the plate.** Earth walks to the gate and waits under it.
8. The two fliers come back round — step off the landing ledge into the shaft, sink to the cellar
   floor, walk back and climb the well again — and take up their ledges a second time.
9. On a second count, **both launch again**. `hi`, `lo` and the crank are all on at once, the gate
   opens, and **Earth walks through** into the far cellar while the two of them are still in the
   air over its head.
10. Fire and Water land beside their own doors on the ledge; Earth takes the gem beyond the gate
    and its door; Air steps off the crank into its door in the loft.

## Why each player is needed

- **Earth** — the only mass-2 body: the only one who can start the draught, and (because a 1.54
  draught does nothing for Earth at all — measured: 47 ticks airborne, four tiles, a normal fall)
  the only one who can never be one of the two bodies in the air. So Earth is both the reason the
  gate exists and the one player who can never open it.
- **Air** — the only element a turbine answers to, and the only one the draught lifts. Without Air
  the stone stays in the hopper, so Earth never gets off `weight_a`, and the gate is always one key
  short of three.
- **Fire** and **Water** — the hatch wants two plates at once and so does the gate. The plates are
  five rows apart and one body cannot be in both, so it takes two fliers; and with the draught off
  neither of them can cross the shaft at all.

## The insight

Every switch in the level is in the air, so standing still anywhere is worth nothing to it — and
the one player heavy enough to turn the wind on is the one player the wind will never carry. The
stone has to take Earth's place on the plate before Earth can be anywhere else, and the only thing
that can post the stone is a door being *shut*.

## Likely failures and how players recover

- **"Earth holds the plate and the rest of us get on with it."** The draught runs, the hatch opens,
  the stone gets posted, the gate even opens — but Earth is twelve tiles away at the plate, and the
  moment Earth steps off, the wind dies, both fliers drop out of their plates and the gate shuts in
  Earth's face. (Scripted; it gets to x=21.6 and no further.) Nothing is lost: Earth steps back on
  and the party goes again.
- **Flying one after the other.** Both the hatch and the gate want the two plates at the same
  moment; a relay never opens either. The fix is a countdown, not better flying.
- **A missed launch, or Air not yet parked at the hatch.** A flight that falls short drops you into
  the shaft, which has no floor of its own: you land on the cellar floor, walk back to the well and
  climb again. A flier already on the far ledge steps back into the shaft and comes round the same
  way. Once the stone is on `weight_b` the draught never stops, so every attempt can be made again
  as often as you like.
- **Air goes up before anyone can let it in.** Harmless: Air waits at the top for as long as it
  likes. Before the stone is posted Air can also come back down (with the wind off it simply
  falls); afterwards it cannot, which is why Air's door is up there with it.
- Nothing in the level is lethal — there is no liquid anywhere — and nothing can be spent. The
  stone's notch is one tile deep and its top sits below the cellar floor, so once posted it can
  never be pushed off the plate, by anyone, in any order.

## Shortcuts that were closed

- **Standing on the heavy plate instead of fetching the stone** is the first move, and the whole
  point is that it strands Earth. Scripted (`Earth holds the draught on and runs for the gate when
  it opens`): the gate shuts while Earth is still a tile short of it.
- **Two flights in series.** Scripted (`The two fliers cross one after the other`): Fire goes
  straight off the lip without waiting, and the gate never opens.
- **Air ferrying Earth across.** Scripted (`Air ferries Earth up the shaft`): with Earth on Air's
  head nothing is holding a heavy plate, so there is no draught to ride. And after the stone is
  posted, Air cannot come down to fetch anybody. Even granted the ride, the draught at 1.54 lifts a
  loaded Air *upward* — a column that only goes up, and up is the loft, whose floor is solid and
  whose hopper is walled in.
- **Reaching the plates from the floor.** They hang over the shaft only: the launch ledges stop at
  x=12 and the plates start at x=13, so bouncing on a ledge never touches one. A plate's sensor is
  an 8 px strip, placed at the apex of a jump from its own ledge, and a standing player's head is a
  whole tile below it.
- **Climbing into the shaft from the cellar.** You can walk into the bottom of the shaft freely,
  but the draught's lowest row is four above the cellar floor: only Air's jump reaches it. Fire and
  Water fall back, and Earth gets nothing from the wind at any height.
- **Walking round the gate.** The shaft has no floor of its own, so everything that falls in it
  lands on the near side of the gate; the landing ledge on the far side is sealed from the cellar
  below it by three rows of rock, and Earth's door is in the cellar, not on the ledge. The only way
  from one cellar to the other is through the gate.
- **Propping the gate with a body.** A closing door rests on whoever is under it, so Earth can take
  the gate on its head and walk on at leisure — that is deliberate, and it is the slack that makes
  the countdown fair. It skips nothing: the gate still had to be opened by two people in the air.

## Kinship with the campaign

Nearest are **Windmill** (`l11_windmill`), which hangs a chain of machines off one updraught, and
**Last Word** (`l55_last_word`), whose gale carries people across a gap; both treat wind as
transport. Here the wind is not transport but *duration*: the switch is the bare fact of being
airborne, and the draught exists only to make a jump last long enough for that to be a door.
**Lofts**, the nearest level in this repo by ingredients, is about one wind doing three different
things to three elements; this one is about what a wind does to a *clock*. **Tripwire** also hangs
a plate where nobody can stand, but there the window is a lift carrying one rider past it, and here
it is two players' own hang time, held at the same moment.
