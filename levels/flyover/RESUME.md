# RESUME — flyover (4p, motor) — FINISHED

Motor counter for this chain: **built[4p] = 2** — this level is the ON step of the OFF/OFF/ON cycle
(`winnow` and `single_file` were both `mind`). After this level the cycle restarts at OFF.

## The design in two sentences

Two plates hang in a 1.54 draught five rows apart, where nobody can stand: each is on only while a
body is in flight inside it, and both the loft's hatch and the cellar's gate want the pair of them
at the same moment, so the party has to launch two fliers on a count. Earth, the only mass-2 body,
is the only one who can start the draught and the only one it never lifts, so Earth is both the
reason the gate exists and the one player who can never open it — until the crank shuts a door onto
the stone and posts it down a grating onto the second heavy plate, taking Earth's place.

## What already passes

Everything. `node kit.mjs check flyover` reports **no problems**:

- solved in **29.7 s** (par 100 s), 4/4 gems, no deaths;
- all four co-op necessity tests pass;
- all three shortcut scripts fail, each for the thing it was meant to prove:
  Earth sprinting from the plate (`could not reach x=26 (at 21.59)`), the fliers in series
  (`earth timed out waiting for the gate`), Air ferrying Earth
  (`timed out waiting for a draught, with the only heavy body aboard`).
- `node tools/novelty.mjs flyover` → **PASS (invented)**: `two-in-the-air-at-once`, used by no other
  level anywhere (added to `tools/ideas.mjs`).
- `node tools/build.mjs` and `node tools/catalog.mjs` both run; the level is on the index page
  (42 levels, 15 at 4p) and in `catalog/LEVELS.md`.

Generator (for any further geometry tweak):
`/tmp/claude-0/-home-user-elementals/21399c47-b54e-59c4-b8d3-8866955cc1ed/scratchpad/gen_flyover.mjs`

Measured facts the design rests on, all probed against `kit.mjs` in this session:

- **A plate's sensor is an 8 px strip** at `y*32 + 24`; `h` is stored but ignored. So a hanging
  plate is held only while a body overlaps those 8 px — feet within a 38 px band.
- **Fire/Water in a 1.54 draught** sink at ~0.011 px/tick² (0.025 at 1.50), so a plate placed at the
  apex of a jump from its own ledge is held for about **65 ticks**; at 1.58 they slowly rise instead.
- **Earth gets nothing** from a 1.54 draught: 47 ticks airborne, four tiles, a normal fall.
- **Air** climbs at a flat 5 px/tick and hovers at the draught's top row, so the loft floor is one
  row below where Air comes to rest; once the stone powers the draught for good, Air can never come
  back down, which is why its door is in the loft.
- 1.54 is the strength at which **Air carrying Earth rises**, which is what stops Air ferrying Earth
  *across*: in the column the pair can only go up, and up is the loft.
- A **boulder in a one-tile notch** rests with its top 3 px below the surrounding floor, so it can
  never be pushed off the plate again (and a player who lands on one has to hop off).

## What fails and the exact error

Nothing. The recorded gate window is ~65 ticks, above `check`'s 45-tick floor, so there is no
short-window warning.

## The next thing to try

Nothing is outstanding. If the author wants it harder, the obvious knob is the second launch: give
the gate a `required: 4` with a fourth hanging plate and no crank, so all four have to be off the
ground — but that was judged unfair (the presses would have to overlap three ways).
