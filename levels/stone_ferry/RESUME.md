# Stone Ferry — resume notes

**Design in two sentences.** A rolling boulder is the only boat across a sludge moat: liquids are
floors to it and riders go with it, so it carries one rider per trip, only downhill, and only Earth
can haul it back up (east lift + high gallery + trapdoor chute). The trapdoor and the slope gate both
hang on Air's turbine (spinning opens the trapdoor and *shuts* the gate), so Air must stay behind to
drop every stone, and crosses last by winding the turbine and getting aboard before it runs down.

## Plan (4p, motor on, order 356)
- West plateau (F, W, A spawn), turbine at the far west end, chute from the gallery trapdoor onto a
  4-cell slope; GateB (latched; heavy plate under the stone + light plate at rider height) stops the
  first stone from crossing empty; GateA (inverted, turbine) holds every later stone.
- Moat: 3 sludge tiles under a 2-tile roof (stone + one rider fit, a stack is scraped off).
- East: stone stops on a one-tile lift (bottom stop a `=` so an early stone cannot jam it), raised
  by a light plate the last arrival holds; Earth (spawns in the gallery) pushes it west to the
  trapdoor. A drop hole from the gallery lets anyone walk back west (recovery).

## Status
- Milestone 1: design written, no JSON yet.

## Next
- Write the generator (scratchpad a4f/gen.mjs), validate, probe Air's glide over the moat.
