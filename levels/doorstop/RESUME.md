# Resume — Doorstop (order 156, Earth + Air, motor off)

**Design:** each home is behind a zero-room airlock (outer door open only while the inner is shut),
so you shut the outer door on your wedge on purpose and push it home ahead of you — the boulder holds
Earth's door at 30 px, the crate holds Air's at 28. Each lever frees the partner's wedge (Y, Z), so
the levers must be thrown, undone and thrown again in a forced order.

**Passes:** design written (NOTES.md). Probes (scratchpad) confirmed: door rests on crate at 28 /
boulder at 30; Air pushes a wedged crate, Earth a wedged boulder; Earth cannot pass a crate wedge;
Air cannot push a boulder; objects ride mud/mist floors.

**Fails:** level.json not written yet.

**Next:** write the generator (scratchpad a80b/gen.mjs), produce level.json, `node kit.mjs show doorstop`.
