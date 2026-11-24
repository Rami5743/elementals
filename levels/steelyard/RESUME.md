# RESUME — steelyard (2p, fire+earth, order 114, challenge: mind)

Motor counter for this chain: **built[2p] = 1** (this level has motor OFF; the next one is ON).

## The design in two sentences

A weighing beam (`seesaw`) whose two pans compare the **summed** mass on each side — bodies, cargo,
and riders on heads — while every plate reads only the **heaviest single thing**, so Fire and Earth
together are worth 3 on the beam and only 2 on a plate. Because only the heavier pan is ever at
hall level, you cannot lift yourself: you rise when your partner shoves the stone **off** your pan,
and the two of you together weigh exactly what the stone weighs.

## What already passes

- Engine measured in a throwaway probe (`levels/zz_probe/`, deleted before the finish):
  `range: 4` validates and gives ±2 tiles (`d = ±64 px`); a pan is flush with a floor of its own
  row; a boulder can be pushed from a flush shelf onto a pan; riders and cargo ride the pan;
  `stackMass` **sums** and recurses into stacked riders.
- Order 114 is free (checked every `levels/*/meta.json`).
- `catalog/LEVELS.md` 2p sections read: no level of any player count is built on seesaw mass
  arithmetic, and the repo has no seesaw at all.

## What fails / what is open

Nothing is built yet — no `level.json` exists. The open question is the back half of the chain:
the beam's invariant (only the heavier pan is reachable from below) means the far pan can never be
loaded from the hall, so **only one player can be at the gallery at a time**. A reachability solver
(`scratchpad/beam.py`) is enumerating states to find the longest forced chain and to prove no
reachable state is unwinnable.

## Next thing to try

Run the solver over the three candidate start states (stone on pan A + crate on pan B is the
favourite), pick the longest forced chain, then write the generator script for the map:
hall floor row 16, gallery floor row 12, shaft x 20..25, beam `y: 14, w: 6, range: 4`.
