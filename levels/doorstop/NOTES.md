# Doorstop

**Introduces:** an airlock with no room in it. Each home is behind two doors back to back: the
outer one is open only while your lever is off, the inner one only while both levers are on, so the
two are never open together and nobody can stand between them. The only way through is to shut the
outer door on purpose on something lying in its doorway, and push that thing home ahead of you. A
door that shuts on something stops at its height: the stone (30 px) lets Earth under it, the crate
(28 px) only Air.

Group: Earth + Air. Motor challenge: off (every door is latched by a lever; there is no window and
no jump that matters).

## The intended solution

The hall is in the middle. To the west, a mud tunnel one tile high runs to Earth's home; Earth's
lever is in that tunnel, six tiles before Earth's two doors. Up the draught (the only way up, and it
lifts only Air) is Air's floor, and from it a mist tunnel one tile high runs to Air's home; Air's
lever is inside that tunnel, past the crate's two gates and six tiles before Air's two doors. The
stone sits on a slope behind two gates at the east end of the hall.

- The crate's gates: one opens while Earth's lever is ON, the other while Air's lever is OFF.
- The stone's gates: one opens while Air's lever is ON, the other while Earth's lever is OFF.
- Each outer door: open while its owner's lever is OFF. Each inner door: open while BOTH are ON.

1. **Earth throws its lever ON.** That frees the crate (Air's lever is still off). It also shuts
   Earth's own outer door, which does not matter yet.
2. Air rides the draught up, walks through the crate's gates into its tunnel, and pushes the crate
   along the mist to its doors. The outer door is open; the crate runs into the shut inner door and
   stops there, exactly in the outer doorway. Air takes its gem on the way.
3. **Air throws its lever ON** (it is behind Air, inside the tunnel). The outer door comes down on
   the crate and stops 28 px up. Both levers are on, so the inner door opens. Air — 28 px tall —
   walks under the outer door pushing the crate, through the inner door, and home.
4. The stone has not moved: its second gate wants Earth's lever OFF. **Earth throws its lever back
   OFF** — the undo. The stone rolls out of its pen into the hall, and Earth's outer door opens.
5. Earth hops over the stone and pushes it west down the mud tunnel, past the lever, taking its gem.
   It runs into Earth's shut inner door and stops in the outer doorway.
6. **Earth throws its lever ON again.** The outer door comes down on the stone at 30 px; both levers
   are on, so the inner door opens. Earth pushes the stone home ahead of it.

The levers go through four states, each needed for something: (off, off) → Earth on (crate free)
→ both on (Air's doors) → Earth off (stone free, Earth's outer door open) → both on (Earth's doors).

## Why each player is needed

- **Earth** is the only one who can enter the mud, so the only one who can throw Earth's lever: it
  frees Air's crate and is half of Air's inner door. Earth is also the only one who can push the
  stone.
- **Air** is the only one the draught lifts and the only one who can enter the mist, so the only one
  who can throw Air's lever: it frees the stone and is half of Earth's inner door.
- Neither can work the other's lever, so neither can hold the other's door with their body (see
  Shortcuts).

## The insight

You cannot be your own doorstop — your lever is six tiles from your door — and your partner cannot
reach your lever. So the door has to be held by something, and the something has to be in the
doorway *before* you throw the lever that shuts it. Shutting the door is how you get through it.
Then the order: each lever frees the other's wedge, so Earth must go first, Air finishes first, and
Earth has to undo its own lever to get the stone out and its door open before throwing it again.

The heights are what make each wedge belong to one player: the crate's 28 px is exactly Air's
height, and the stone, which only Earth can push, holds a door at Earth's.

## Likely failures and how players recover

- **Throwing your lever before your wedge is in the doorway.** The outer door shuts on nothing; the
  inner door, if it opens, opens onto a shut door. Throw the lever back off and put the wedge in.
- **Air tries to throw its lever first.** It cannot: Air's lever is behind the crate's gates, which
  stay shut until Earth's lever is on.
- **Earth leaves its lever on and waits for the stone.** The stone's second gate wants Earth's lever
  OFF. Nothing moves until Earth undoes it, and that also opens Earth's outer door.
- **Earth pushes the stone into the tunnel while its lever is still on.** The stone stops against the
  shut outer door. Earth walks back to the lever (behind the stone) and throws it off; the stone can
  then go the last tile.
- **Air pushes the crate while its own lever is on.** The crate stops against the shut outer door;
  throw the lever off and push it the last tile.
- **Earth throws its lever off while Air is still in its tunnel.** The crate's gate shuts behind
  Air; Air is not stuck for good — Earth throws it on again.
- Nothing in the level can be lost: both wedges can only be pushed toward their doors, the shut inner
  door stops each wedge in the doorway rather than past it, the stone rolls back out of its pen if
  pushed in, and each player can always reach their own lever.

## Shortcuts that were closed

Each is a script in `solution.mjs` that `check` runs and that fails:

- **Earth stands in its own doorway; Air throws Earth's lever.** Air dies in the mud on the way to
  the lever. (With a lever Air could reach, Earth's body would hold the door at 30 px and Earth would
  walk in without the stone.)
- **Earth throws its lever back on with nothing in the doorway.** The outer door is shut; Earth
  never gets past it.
- **Air waits in its own doorway; Earth rides the draught to Air's lever.** The 0.9 draught does not
  lift Earth. Earth on the stone, or on Air, jumps nowhere near Air's floor, which is eight tiles up.
- Not scripted, because the geometry makes them impossible rather than unlikely: holding a door
  open with a body (the two doors are never open at once, so there is nothing to hold); the crate in
  Earth's doorway (the crate never leaves Air's floor); the stone in Air's doorway (it never leaves
  the hall and the mud tunnel); hopping a wedge (both tunnels are one tile high).

## Kinship with the campaign

Nearest is **Low Bow** ("a gate stops at the height of whoever holds it up"), and **Portcullis**,
where somebody has to keep a gate from shutting. In both, a body holds a gate that is open. Here no
body ever can — your partner cannot reach your lever and you cannot be at your lever and in your
doorway — and the gate is never open when you need it: you shut it on purpose, on an object, so that
it stops at the object's height. The two doors of each airlock are wired never to be open together,
which is new; so is having each wedge's release tied to the partner's lever.

## Novelty and size

Coined `airlock-with-no-room` (no level used it). Combined with `twist-undo` (Earth's lever goes on,
off and on again) and `twist-order` (Earth must start, Air must finish its home first). The
recorded solution runs 23.8 s, above the 20 s floor but under the 30 s aim; most of a human solve is
working out the order rather than walking, and par (70 s) is about three times the script.
