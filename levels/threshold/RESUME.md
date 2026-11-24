# Threshold — resume notes

Motor counter for this chain: **built[3p]=3** (this level OFF, the next one OFF, then ON).

## The design in two sentences

A plate under an exit: the draught that is the only way from the hall up to the gallery is powered
by Fire standing in its own doorway, which Fire can only reach by wading a one-tile-high lava tunnel
and climbing a sealed chamber, so the first player home becomes the level's power station and can
never step out again. Earth is the only mass 2 in the level and its weight is claimed twice — the
hall plate that opens the tunnel hatch for Fire, then the landing plate that opens Air's gate — and
the last move is to *give up* that second plate, letting the gate shut on Air, who is already home.

3 players, fire + earth + air, order 216, challenge "mind" (motor OFF).
New idea key coined: `threshold-is-a-switch`.

## What already passes

`node kit.mjs check threshold` reports **No problems**: solved in 18.3 s, 3/3 gems, no deaths, and
all three co-op "waits at its exit" tests pass.

- Probed: a `plate` may share a tile with an `exit`, and a body in the doorway presses it.
- Probed: the 1.54 draught lifts Air alone, and Air **carrying Earth**, the eight tiles from the hall
  floor to the gallery (`docs/MECHANICS.md` says Air+Earth does not rise — that is at the default
  0.9; at 1.54 it does, as `engine-facts.md` says).

## What fails, and the exact error

Nothing fails. Two things still to do:

1. **Solve time is 18.3 s, under the 20 s floor** the skill sets. It needs another phase of puzzle,
   not a longer walk.
2. `shortcuts` in solution.mjs is still empty. The cheats to script: Air or Earth walking into the
   lava tunnel; Earth going for the landing plate without ever holding the hall plate; Air trying to
   ride the draught before Fire is home.

## Next thing to try

Add the extra phase, then write the three shortcut scripts, then NOTES/meta/novelty/build/catalog.

## Gotchas already paid for

- Liquids go in the **floor** row, not the body row: a liquid tile is a solid wall from the side.
  A strip you wade is `L` at row 20 with row 19 open above it.
- `check` fails a level that can be finished while a player idles in its own door, so a player whose
  only job is to *be* in its doorway is rejected by construction. Fire therefore lights a lamp on the
  stairwell landing on the way up, and `earth_gate` wants that lamp **and** Air's threshold
  (`required: 2`).
- `go()` hops over a partner standing in the way, so the carrier must park on the far side of the
  rider (Air comes from the east and stops east of Earth) or the mount happens mid-hop.
- Earth must step off the draught on the side its own cell is on: the column's mouth is a hole in
  the gallery floor and walking over it drops you back to the hall.
