# Resume — Doorstop (order 156, Earth + Air, motor off)

**Design:** each home is behind a zero-room airlock (outer door open only while the inner is shut,
inner only while both levers are ON), so you shut the outer door on your wedge on purpose and push it
home ahead of you — the stone holds Earth's door at 30 px, the crate holds Air's at 28. The crate's
pen opens only with Earth ON + Air OFF, the stone's only with Air ON + Earth OFF, forcing E:ON, A:ON,
E:OFF, E:ON.

**Passes:** `check` says No problems (23.8 s, 2/2 gems, both necessary). Generator lives in the
scratchpad (a80b/gen.mjs); level.json is the source of truth if that is gone.

**Fails:** nothing; still to do: shortcut scripts, par (9000 is too generous), final NOTES.md,
meta.json, the new idea key in tools/ideas.mjs, novelty, build, catalog.

**Next:** shortcuts — Earth as its own doorstop; throw without a wedge; Earth pushes the stone in with
its lever still ON; then the publishing steps.
