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

Nothing yet — design only. Measured facts the design rests on (probed in this session):

- A 1.5 fan gives Fire a **140-tick, 14-tile flight**: jump from a ledge at feet-row T, apex at
  T-2.7 about 2 tiles out, then a slow sink (vy grows ~0.1/tick), back to T at ~10 tiles out.
- The fan must not reach below **row 11** or Earth gets lift from the shaft floor (row 16):
  Earth's jump puts its body top at y=406, row 11 ends at y=384.
- A seesaw tips **instantly** at its midpoint and drops a lone walker; not used here.

## What fails and the exact error

Nothing run yet.

## The next thing to try

1. Write the generator in the scratchpad and emit `levels/flyover/level.json` (geometry below),
   then `node kit.mjs check flyover` until it validates.
2. Geometry: cellar floor row 20, open 17–19, ceiling row 16; gate at x=18 (h=3). Shaft x=15–22,
   open rows 2–15, floor row 16 with a one-way hatch at x=15. Fan x=15–22 rows 2–11, strength 1.5.
   Low launch ledge surface row 13 (x=4–14), plate `lo` rows 9–10 over x=15–22. High launch ledge
   surface row 8 (x=8–14), plate `hi` rows 4–5 over x=15–22. Loft floor row 3 (x=23–34), open rows
   1–2, grating at (34,3) with the boulder on it and `clamp` (door, h=2, invert, from `crank`)
   above; `crank` turbine on the loft floor. Chimney x=34 rows 4–19 into a notch at (34,20) holding
   `weight_b`. Right landing ledge surface row 15 (x=23–32) with Fire's and Water's exits on it;
   Earth's and Air's exits in the right cellar. `weight_a` in the left cellar.
3. Then the solution scripts, then the two shortcut scripts named in NOTES.md.
