# Steelyard — design (written before any level.json)

2 players, **fire + earth**, motor challenge **off** (`"challenge": "mind"`), order 114.

## The invented idea

`mass-adds-on-the-beam` — **a seesaw compares the summed mass on each pan; a plate compares only
the heaviest single thing on it.** Measured in `kit.mjs`: `updateSeesaw` calls `stackMass`, which
*adds* `actorMass` over every rider and recurses into riders standing on riders; a `plate` with
`weight: "heavy"` takes `max(mass)`. Nothing in the repo or the campaign is built on that
difference, and no level in the repo uses a seesaw at all (only campaign `l16_riverbed` has one,
as scenery).

Masses: Fire 1, Earth 2, crate 1, boulder 3.

## The machine, as measured

A `seesaw` of width `w` is **two pans of `w/2` tiles**, rigidly coupled: the heavier pan goes down
by `range/2` tiles and the lighter rises by the same, so the two are `range` tiles apart. `range: 4`
→ ±2 tiles. The pan surface is flush with a floor whose tile row is the pan's row, and riders and
cargo ride it. Equal loads — including **both empty** — park it dead level.

With `y = 14, range = 4` the pans sit at **row 16 (down, flush with the hall floor), row 14 (level,
two tiles above the hall), row 12 (up, flush with the gallery floor)**.

### The invariant that shapes the whole level

*The pan at hall level is always the heavier one.* So from the hall a player can only ever board
the pan that is already down (or, when the beam hangs level, either pan — a two-tile hop up). Every
load the players add goes on the **down** pan, which keeps it down. The far pan hangs four tiles up
at the gallery and **cannot be loaded from below at all.**

Three consequences, and they are the puzzle:

1. **You cannot lift yourself.** A lone player on a pan always sinks it; both players on one pan
   sink it too. The only way up is for weight to *leave* your own pan.
2. **The only counterweight you ever get is the one the level starts with.** Hence the opening
   state: the boulder on one pan, the crate on the other. The beam settles in the first second —
   the stone sinks to the hall floor, the crate is carried up out of reach — and that is the whole
   machine taught without a word.
3. **Only one of you can be up at a time.** The last player up needs the far pan to outweigh them,
   and the only thing that can be *put* on the far pan is a body already at the gallery. So the
   exits cannot both be upstairs: one player finishes in the hall, and sending the other up is paid
   for by coming down.

## The core, in one sentence

**You do not get lifted by what your partner adds — you get lifted by what your partner takes away,
and the two of you together weigh exactly what the stone weighs.**

`core`: `the-beam-weighs-you-both-the-plate-weighs-the-heavier`
`ideas`: `mass-adds-on-the-beam` (new), plus `twist-backwards` (the beam is unloaded, not loaded),
`machine-strands-operator`, `object-as-permanent-switch` (to be confirmed against novelty).

## The intended chain (draft — being checked with a reachability solver)

1. The beam settles: stone down in the hall on pan A, crate aloft on pan B.
2. Fire steps onto A beside the stone (A = 4, still down).
3. Earth pushes the **stone off A** onto the hall floor. A is now Fire (1) against the crate (1):
   **dead level** — the beam rises two tiles and stops with Fire in mid-shaft.
4. Fire jumps the last two tiles onto the gallery. The moment Fire leaves, the crate's pan sinks
   and delivers the crate to the hall: the counterweight is spent.
5. Fire, now the only one who can load the far pan, works the gallery; Earth works the hall with
   the stone (the heavy plate reads Earth as well as the stone, so wherever the stone must hold
   something, Earth must be unable to stand there).
6. The finish: Earth is sent up by Fire riding the far pan down — *the only way to send your
   partner up is to come down yourself* — or Earth finishes below, depending on what the solver
   says is forced.

## Hard requirements, answered

- **Two mechanisms, one interaction**: the beam (sums) and the heavy plate (max). The same two
  bodies are worth 3 on the beam and 2 on the plate.
- **Interlock**: taking the stone off the pan is both the only way to lift anybody and the act that
  gives the hall its weight back; spending the crate strands whoever is upstairs.
- **Counter-intuitive step**: the beam is *unloaded* to make it lift, and the rider must be aboard
  before the unloading.
- **One resource, several claims**: the stone is the beam's ballast and the only permanent weight
  for a heavy plate.
- **Order forced, not readable**: nothing on the map says the rider must board before the stone is
  shoved off.

## Motor-off compliance

Pans are parked by arithmetic, not timing: every position is stable until someone changes a weight.
The only jumps are two tiles onto a three-tile pan or a wide floor. A pan always comes back — any
mistake costs a walk, never the level.
