# Chockstone

**Introduces:** a runaway boulder that only a body can stop, coming to rest in the cell *uphill* of
whoever stands in its path — so a heavy plate hung in that cell, over a walkway, is a key nobody can
forge: the person holding the stone there is too light to press it, and the person who pushed the
stone can never be the one holding it, because you push from above and hold from below.

## The intended solution

1. The stone is lying at the bottom of the hill in the spoil run, and only **Earth** can shift a
   boulder a single pixel. Earth walks down the hill, goes over the stone's back and down its far
   side, and pushes it the whole length of the hill up onto the flat top shelf, where it will stay
   put. (On a slope it would only roll back.)
2. Earth gets round it again — you cannot push a stone downhill from behind it — and waits.
3. **Water** can only now go down: anybody standing on the hill while Earth is pushing is a wall the
   stone cannot be got past. Water goes round the parked stone and down to the walkway cell under
   the **high berth**, where its gem is lying. That is the hint: the brake's post.
4. **Fire** walks to the far end of the shelf, takes its gem and holds the **grip** — a hold button,
   on only while somebody stands there pressing Interact.
5. Earth pushes the stone over the lip. It is gone the moment it tips: a runaway holds 4 px a tick
   and the fastest element runs 3.4, so nobody can ever get in front of it afterwards. It runs down
   the hill and comes to rest against Water, in the cell immediately uphill — which is the high
   berth.
6. That opens the **hatch** at the top of the shelf, and keeps it open, because the stone is
   genuinely standing still. Earth walks back along the shelf, through the hatch, and onto the
   **anvil** — a heavy plate only a mass-2 body or the stone itself can hold down — taking its gem.
   Earth is now shut in: the bay has no other way out, and Earth's own door is in there.
7. Water steps one post downhill. The stone follows it down and comes to rest at the **low berth**.
   The hatch shuts behind Earth for good.
8. Low berth, anvil and grip are the **wicket's** three contacts, and with all three on at once it
   latches open: the only way out of the spoil run into the exit hall, and it never shuts again.
9. Water steps aside and walks down — the stone follows and runs out in the spoil run, where it
   stays — and on through the wicket. Fire lets go of the grip and follows. Earth steps off the
   anvil into its door in the bay.

## Why each player is needed

- **Earth** is the only element that can move a boulder, so only Earth can fetch the stone up the
  hill and only Earth can loose it; and Earth is the only body heavy enough to hold the anvil down.
  Those two jobs are why Earth can never be the brake: the brake has to be standing on the hill
  before the stone is let go.
- **Water** is the brake, twice: once high, to hold the hatch open long enough for somebody to walk
  through it, and once low, for the wicket. The berths are heavy plates hanging a tile above the
  walkway, so the body under them can never press one itself.
- **Fire** holds the grip. The wicket wants three contacts in one instant; the brake cannot let go
  of the stone and Earth cannot leave the bay, so the third post needs a third body.
- The gems pin the three roles: Earth's is on the anvil, Fire's on the grip, Water's on the high
  post.

## The insight

You cannot chase a runaway — you have to be standing in front of it before you let it go. And the
switches that want the stone hang where no person can reach them, so the stone has to be stopped
*under* one rather than pushed onto it; which means the brake stands one tile below the very switch
it is closing, unable to press it. Then, because the stone rolls on the instant the brake moves and
can only ever be walked *downhill*, having the high berth is exactly what you have to give up to get
the low one — and the thing the high berth buys has to be spent before you give it up.

## Likely failures and how players recover

- **"Push the stone over, then run down and stop it."** Nothing in the game catches a runaway from
  behind. It runs out at the bottom of the spoil run. Recovery: Earth goes down, round it, and walks
  it back up the hill, which costs most of a minute and loses nothing.
- **Sending the brake down first.** Anybody standing on the hill is a wall, so Earth cannot push the
  stone up past them. Recovery: the brake walks up and over the lip onto the shelf and waits.
- **"Stand on the hanging plate."** Both berths are heavy: a light body cannot press one, and they
  hang a tile above the walkway anyway. Earth *can* press the high berth with its own body, by
  standing a tile up the slope from the brake's post — but then nobody is on the anvil, and the
  wicket wants all three.
- **Going through the hatch as the wrong player.** A light body in the bay cannot hold the anvil, so
  the wicket can never be certified — but the hatch is open for as long as the brake holds the stone
  high, so they can simply walk out again.
- **Brake posted on the wrong tile.** The stone rests one tile uphill of whoever stops it, so a tile
  too low parks it beside the plate instead of under it. Stepping uphill is impossible (the stone is
  there); stepping downhill looses it, and then Earth has to walk it up again.
- Nothing in the level can be destroyed. The stone always rolls on when the brake moves, Earth can
  always push it back up, and the only irreversible step — Earth shut in the bay — ends in Earth's
  own doorway.

## Shortcuts that were closed

- **The rolling pass.** Every plate on the stone's road is pressed for about eight ticks as it rolls
  over it. The high berth is therefore pressed on a free roll — but all it drives is the hatch, with
  no latch, and eight ticks opens a door one tile at the bottom for a sixth of a second, six tiles
  away from where Earth has to be standing to have pushed the stone at all. `shortcuts` has
  *No brake: Earth looses the stone and sprints for the hatch*, which fails with Earth stuck outside
  the closed hatch.
- **The low berth on a free roll.** It cannot happen: to reach the low berth the stone has to have
  come to a standstill at the high one first, because a free roll carries it past both and out into
  the spoil run. That is what makes the wicket's latch safe. `shortcuts` has *Water brakes at the
  low berth only, skipping the hatch*, which fails with the wicket never latching.
- **Earth as the brake.** Earth standing a tile up the slope presses the high berth with its own
  mass-2 body, but then the anvil is unheld for ever. `shortcuts` has
  *Earth brakes the stone and presses the high berth with its own body*.
- **The stone on the anvil.** A boulder would hold the anvil down, but the only road into the bay is
  through the hatch, and the hatch is open only while the stone is parked at the high berth — that
  is, somewhere else. Earth pushing the stone along the shelf simply jams it against a shut door.
- **Over the top of the wicket.** The spoil run has a rock roof and the wicket reaches it.

## Motor load

Deliberately none: every window is a body standing still, nothing has to be timed, and the only
jumps are hops over a boulder standing on flat ground, onto landings three tiles and more wide —
which the engine treats as unremarkable ("a boulder in open ground is hopped over without a
thought"). Missing one costs a step backwards and nothing else.

## Kinship with the campaign

**Flash** (`l73_flash`) also rolls a boulder over a plate nobody can reach, but there the gate opens
for the moment the stone passes and the puzzle is to be ready for it. Here the passing press is
deliberately useless — it drives an unlatched hatch that has to stand open long enough to walk
through — so the stone has to be brought to a standstill under the plate instead. **Ore Run**
(`l52_ore_run`) and **Hoist** (`l72_hoist`) use a boulder as a weight fetched to a plate; the stone
here can never be fetched to either of its plates, only stopped under them by somebody standing a
tile below. **Headlong** (`headlong`, this repo) is the nearest neighbour at three players and the
closest by ingredients: it is also built on nothing being able to catch a runaway, but its answer is
to dive down after the stone and its plate is pressed by the stone rolling across it. Chockstone's
answer is the opposite — stop the stone and keep it stopped — and its keys are switches a person is
standing underneath and physically cannot press.
