# Resume — Doorstop (order 156, Earth + Air, motor off)

**Design:** each home is behind a zero-room airlock (outer door open only while the inner is shut),
so you shut the outer door on your wedge on purpose and push it home ahead of you — the boulder holds
Earth's door at 30 px, the crate holds Air's at 28. Each lever frees the partner's wedge (Y, Z), so
the levers must be thrown, undone and thrown again in a forced order.

**Passes:** level.json validates; the solution script runs and `check` says No problems (26.5 s, 2/2 gems, both necessary).
boulder at 30; Air pushes a wedged crate, Earth a wedged boulder; Earth cannot pass a crate wedge;
Air cannot push a boulder; objects ride mud/mist floors.

**Fails:** nothing yet; no shortcut scripts, solve time under 30 s, par 9000 too generous, NOTES not final.

**Next:** write shortcut scripts (wrong wedge, no wedge, no undo), lengthen if possible, set par, final NOTES + meta + ideas key.
