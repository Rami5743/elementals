# RESUME — steelyard (2p, fire+earth, order 114, challenge: mind)

Motor counter for this chain: **built[2p] = 1** (this level has motor OFF; the next one is ON).

## The design in two sentences

A weighing beam (`seesaw`) in a central shaft compares the **summed** mass on each pan — bodies,
cargo, riders on heads — while every plate reads only the **heaviest single thing**, so Earth and
a crate are worth 3 on the beam and only 2 on a plate. Fire starts in the gallery across the shaft
and is the only one who can load the far pan; Earth must climb aboard the near pan down in the
cellar and shove the stone off it before any number of crates can lift him.

## What already passes

- `node kit.mjs check steelyard` → `level.json is valid`, `every spawn point is safe`.
- Engine measured by probe: `range: 8` gives ±4 tiles; a pan is flush with a floor of its own row;
  `stackMass` **sums** and recurses into stacked riders; a boulder can be pushed on and off a pan.
- The beam's invariant, worked out and designed around: only the heavier pan is ever at floor
  level, so the far pan can only be loaded by a player standing level with it — hence Fire starts
  in the gallery (row 11, right of the shaft) and Earth in the hall (row 15, left of it).
- Geometry: beam `y:15, range:8` → pan rows 11 / 15 / 19. Gallery floor 11, hall floor 15, cellar
  floor 20 (one tile BELOW the pans' cellar position, so anything shoved off a pan down there lands
  on the cellar floor and can never be lost down the shaft).

## What fails and the exact error

`✗ no solution.mjs: every supported group needs a solution script` — nothing is written yet.

## The next thing to try

Write `solution.mjs` for fire+earth, following the intended chain:
1. the beam settles at t=0 (stone on pan A → pan A to the cellar, pan B up to gallery-right);
2. Earth: hall → west stairwell → cellar → hop onto pan A → hop over the stone → shove it west off
   the pan → push it onto the heavy plate `hp` (opens `gate_e` and arms `store`);
3. Earth hops back onto pan A (presses `rp`; `store` needs `hp` + `rp`);
4. Fire: pushes crates west out of `store` onto pan B — two only level the beam, the third sends
   pan A up to gallery-left with Earth aboard;
5. Earth walks west along gallery-left, takes the neutral gem, through `gate_e` into its exit;
   Fire takes its gem and its own exit in gallery-right.
