# RESUME — flyover (4p, motor)

Motor counter for this chain: **built[4p] = 2** — this level is the ON step of the OFF/OFF/ON cycle
(`winnow` and `single_file` were both `mind`). After this level the cycle restarts at OFF.

## The design in two sentences

Two plates hang in a thermal-filled shaft, one five rows above the other, where nobody can stand:
each is on only while a body is off the ground inside it, so the gate in the cellar below is open
exactly while two players are in flight at two different heights (plus Air holding the turbine in
the loft). Earth, the only mass-2 body, is the only one who can start the thermal and the only one
the thermal will never lift, so Earth is both the reason the gate exists and the one player who
cannot open it — until a closing door posts the boulder down a grating onto a second heavy plate
and takes Earth's place.

## What already passes

- `node kit.mjs check flyover`: **`level.json` is valid**, every spawn is safe.
- Generator: `/tmp/claude-0/-home-user-elementals/21399c47-b54e-59c4-b8d3-8866955cc1ed/scratchpad/gen_flyover.mjs`
  (re-run it after every geometry tweak; it writes `levels/flyover/level.json`).
- Probed facts this design rests on (all measured against `kit.mjs` in this session):
  - **Fire/Water in a 1.5 fan**: jump from feet-row T, apex T−2.7 about 2 tiles out, then sink at
    only ~0.025 px/tick² — back to T after ~84 more ticks and 8.4 more tiles. A ~105-tick,
    ~11-tile flight.
  - **Earth in a 1.5 fan**: nothing. 47 ticks airborne, ~4 tiles, normal fall. So Earth can never
    drift across the shaft, which is what makes the gate safe.
  - **Air in a 1.5 fan**: rises at a flat 5 px/tick and then hovers at the fan's top row, so the
    loft floor is one row below where Air comes to rest.
  - Plates accept `w` **and** `h` (shown as `9x2` by `kit.mjs show`).

## What fails and the exact error

`✗ no solution.mjs: every supported group needs a solution script` — nothing else.

## The next thing to try

1. Write `levels/flyover/solution.mjs`: Earth → `weight_a`; Air jumps into the draught from the
   cellar floor at x≈14, rides to the loft, walks to `crank` at x=32; the `clamp` shuts and posts
   `stone` down the chimney onto `weight_b`; Earth walks to x≈21 under the gate; Fire climbs to the
   high ledge (row 8) and Water to the low one (row 13) via the one-way shelves at x=1..3; both
   launch within ~10 ticks of each other; Earth crosses; Fire/Water land on the ledge at row 14 and
   take their doors at x=25/28; Air leaves the crank, drops through (36,3) and walks to x=33.
2. Verify the one risky interaction with a trace: does the closing `clamp` actually push `stone`
   down through the grating at (36,3), and is the door open at tick 0 (invert, crank off) rather
   than closed on top of the boulder?
3. Then the two shortcut scripts named in NOTES.md (Earth holds the plate; the fliers go in series).
