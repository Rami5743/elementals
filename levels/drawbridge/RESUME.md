# Drawbridge: where the work stands

**Design.** A drawbridge (a wide door) with a curtain of heavy plates over its far part: anything
heavy past the mark makes the bridge vanish from its free end back to its hinge at 4 px a tick until
the weight falls through, and then the bridge slides back out carrying whoever stands on it. Only
Water survives the flooded hall, so Water is thrown in first to freeze the pool; then Earth follows
the stone down, pushes it onto the gate plate, and rides the one-rider hoist up while Fire works the
winch.

**Group:** Fire + Water + Earth. Motor on: Earth getting off the bridge before it slides back out
(about 100 ticks of slack, measured).

**Passes:** `node kit.mjs check drawbridge`: No problems. Solved in 43.4 s, par 120 s, 3/3 gems,
four shortcut scripts all fail for the intended reason. `node tools/novelty.mjs drawbridge`:
PASS (invented), key `drawbridge-eaten-back-to-the-mark` added to `tools/ideas.mjs`.

**Fails:** nothing.

**Next:** finished, once `tools/build.mjs` and `tools/catalog.mjs` have run and been committed.

Facts measured here: a plate senses only an 8 px strip at the bottom of its tile, whatever `h`
says; a closing wide door carries riders outward at 4 px a tick, an opening one leaves them; a body
under a descending powered lift stops it only while it is there.
