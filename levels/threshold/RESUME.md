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

- `level.json` validates; spawns safe.
- Fire's whole journey works: waits for the hatch, wades the six-tile lava tunnel (one tile high, no
  jumping), climbs the three one-way ledges of the east chamber, jumps the grating into its cell,
  stands in its doorway, and the draught comes on.
- Probed: a `plate` may share a tile with an `exit`, and a body in the doorway presses it.
- Probed: the 1.54 draught lifts Air alone from the hall floor to the gallery (8 tiles).

## What fails, and the exact error

`earth is not on air (bottom=640, air top=536)` — Earth's `climbOnto` fired while Air was mid-hop:
Air, walking west to its parking tile, hopped over Earth which was standing there. Fix: park Air
*east* of Earth (Air arrives from the east with its gem) so they never cross.

## Next thing to try

Park Earth at 16 and Air at 17, then `climbOnto` + `rideAlong`. Then find out whether the 1.54
draught really lifts Air *carrying Earth* — `engine-facts.md` says 1.54 is enough, `docs/MECHANICS.md`
says Air carrying Earth does not rise (probably at the default 0.9). If it does not, raise the
strength until it lifts Air+Earth but still not Fire alone (Fire starts rising around 1.6).

## Gotchas already paid for

- Liquids go in the **floor** row, not the body row: a liquid tile is a solid wall from the side.
  A strip you wade is `L` at row 20 with row 19 open above it.
