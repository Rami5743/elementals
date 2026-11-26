# Drawbridge: where the work stands

**Design.** A drawbridge (a wide door) with a heavy "mark" plate across its full headroom: anything
heavy on the mark makes the bridge retract from its free end back toward its hinge at 4 px a tick,
faster than anyone runs, until the weight falls through, so everything beyond the mark drops into
the flooded hall below and everything short of it stays. Only Water survives the water, so Water
has to ride the first drop down to freeze the pool before Earth can follow the stone down, push it
onto the gate plate, and ride the one-way hoist up to the keep with Water while Fire works the lever.

**Group:** Fire + Water + Earth. Motor on: Earth backing off the mark before the edge reaches it.

**Passes:** level.json validates; every spawn point is safe (milestone 2).

**Fails:** solution.mjs has no scripts for fire+water+earth yet.

**Next:** write the generator (`/tmp/.../scratchpad/gen.mjs`), probe (1) stone on the mark drops
and the bridge regrows, (2) a floating stone on a frozen pool can be pushed to dry floor, (3) a lift
whose top stop is a one-way grating row.
