# Drawbridge: where the work stands

**Design.** A drawbridge (a wide door) with a heavy "mark" (three heavy plates hung in one column)
across its headroom: anything heavy on the mark makes the bridge retract from its free end back to
its hinge at 4 px a tick until the weight falls through, and when it grows back it slides out and
carries whoever is on it into the mark again. Only Water survives the flooded hall, so Water rides
the first drop down and freezes the pool; then Earth follows the stone down, pushes it on to the
gate plate and rides the one-way hoist up with Water while Fire works the lever.

**Group:** Fire + Water + Earth. Motor on: Earth getting off the bridge before it grows back.

**Passes:** `node kit.mjs check drawbridge`: No problems. Solved in 33.8 s, par 120 s, 3/3 gems.

**Fails:** nothing in check. Still to do: the skill wants 40 s or more (add a phase, not a walk);
shortcut scripts; NOTES.md final; meta.json; ideas.mjs key; novelty; build; catalog.

**Next:** add a phase. Generator is kept in the scratchpad as gen.mjs (copy below if lost: the
level.json itself is the source of truth).

Facts measured here: a plate senses only an 8 px strip at the bottom of its tile, whatever `h`
says; a closing wide door carries riders outward at 4 px a tick, an opening one leaves them.
