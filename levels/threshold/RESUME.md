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

- Probed and confirmed: a `plate` may sit on the same tile as an `exit`, and a body standing in the
  doorway presses it (`/tmp/.../scratchpad/probe1.mjs`).
- Design written (NOTES.md) before any JSON.

## What fails, and the exact error

Nothing built yet — no level.json beyond the scaffold.

## Next thing to try

Write the generator script in the scratchpad that emits `levels/threshold/level.json` with the map
described in NOTES.md, then `node kit.mjs show threshold`.
