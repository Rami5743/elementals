# RESUME — makeweight (4p, motor OFF, order 316)

This chain's motor counter: **built[4p] = 3** (this level OFF, the next one OFF, then ON).

## The design in two sentences

A balance plank (`seesaw`) adds up the masses standing on each half while a heavy plate reads only
the heaviest single body, so three light players are worth 3 to the plank and 1 to the plate: the
party can stand in for the stone on the scales but never on the lock. The stone starts *on* the pan
and so jams the machine with the seat six tiles up out of reach, so the opening move is to take the
weight off the scale and spend it on the cellar's heavy plate — after which the only makeweight left
is the whole rest of the party, who must all ride the pan six tiles down to lift Earth up to the
loft's heavy plate, the gate's second key.

## What already passes

- The mechanism is **measured, not guessed** (probe against `kit.mjs`, see "engine facts" below).
- NOTES.md written in full (design, roles, insight, failures, shortcuts, kinship).

## What fails / not done yet

- `level.json` does not exist yet. No `check` has been run.

## Next thing to try

Write `/tmp/.../gen_makeweight.mjs` (generator-script pattern) producing the map below, then
`node kit.mjs show makeweight`, then `solution.mjs`.

## Engine facts measured tonight that are NOT in references/engine-facts.md

The repo has **no seesaw level**, so all of this was unknown:

- A seesaw's halves are `w/2` tiles each: left = `{x, y+d}`, right = `{x+w/2, y-d}`, each **16 px
  thick**, and `d` moves **2 px/tick**.
- It is a **comparator, not a scale**: target is `+range*32/2` if left-sum > right-sum, `-range*32/2`
  if right > left, and **0 when the two sums are exactly equal**. The margin is irrelevant — 1 vs 2
  gives the same full swing as 1 vs 5. So the three states are `left down / level / right down`.
- It reads **`stackMass`, i.e. the SUM of everything resting on that half, recursively through
  heads** — unlike a plate, which reads `max(mass)`. Measured: Earth(2) vs Fire+Water(2) → stays dead
  level for 200+ ticks; Fire+Water+Air(3) vs Earth(2) → full swing.
- `range: 6` → each half swings **±3 tiles** (±96 px) from its rest row; `range: 12` → ±6 tiles.
- **The swing stops on whatever is in its way, like a lift.** With rock 3 rows above the rising
  half, the plank stopped at `d=68` instead of 96 — the *rider's head* hitting the ceiling jams the
  whole plank (both halves move in one `moveSolidPx`, so if either is blocked nothing moves). Put
  rock under one half and that half can never descend; the plank then jams level instead.
- A half carries its riders both up and down; three players fit side by side on a 3-tile half.
- Full ±6-tile swing takes ~96 ticks (1.6 s).

## The map (40×22) — build this

Rows, with `#` rock, `.` air, `=` one-way:

- 0 rock. 1: loft air, cols 17–27 open. 2: **loft floor**, cols 17–19 open (seat's top), cols 20–27
  rock. 3–7: seat shaft cols 17–19 open; hall headroom cols 1–13 rows 5–7 open (rows 3,4 rock);
  cols 20–27 rock.
- 8: **hall floor** — cols 1–9 rock, **10–11 `=`** (stair mouth), 12–13 rock, **14–19 open** (the
  plank), 20+ rock.
- 9–11: rock at cols 1–13 except the stair shaft cols 10–11 (one-ways at rows 9 and 11); cols 14–16
  open (vault); 17+ rock.
- 12–14: cellar, cols 1–16 open; one-way at row 13 cols 10–11; cols 17+ rock.
- 15: cellar floor rock cols 1–13 and 17+; **cols 14–16 rock too** (so the pan's lowest row 14 sits
  one tile *above* the floor — this is what stops the stone being pushed back into the vault and
  lost). 16–21 rock.

Entities:

- `scale` seesaw `x:14, y:8, w:6, range:12` — pan = cols 14–16, seat = cols 17–19. Rest row 8 (flush
  with the hall floor); pan's low = row 14; seat's high = row 2 (flush with the loft floor).
- `stone` boulder at (15,7) — starts on the pan, so the plank sinks in the first 96 ticks.
- `hp` plate `weight:"heavy"` at about (12,14) in the cellar → `gate`.
- `beam` plate `weight:"heavy"` at (24,1) in the loft → `gate`. Sensor strip is `y*32+24 = 56`;
  Earth on the loft floor spans y 34–64, so it reads.
- `gate` door at col 7, `h:3`, rows 12–14, `required:2`, `latch:true`, inputs `hp` + `beam`.
  (Keep ≥5 tiles from `hp` or `check` cries "can jump over door".)
- Four exits in the cellar at cols 2–5, `y:13` (floor row 15 → `y = 15-2`).
- Gems: earth in the loft, fire/water in the hall at row 7, air in the cellar at row 14.
- Two signs in the hall: "Boulder 3.  Earth 2.  Fire, Water, Air 1 each." and "The plank is level
  only when both ends weigh the same."

Why **six** tiles of lift and not five: a four-high tower (Water+Fire+Air under Earth) puts Earth's
feet at y=168, Earth jumps 76 px → y=92. A loft at row 3 has its surface at y=96 and Earth **gets in
by 4 px**; at row 2 the surface is y=64 and Earth is 28 px short. The loft must be row 2.

## Shortcut scripts to write (solution.mjs `shortcuts`)

1. `Earth climbs a human ladder to the loft` — four-high tower under the plank shaft.
2. `Two on the pan` — Fire + Water on the pan, Earth on the seat; the plank never moves.
3. `Earth holds the cellar plate` — the gate's other key is in the loft and only Earth can press it.
