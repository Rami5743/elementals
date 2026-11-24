# RESUME — steelyard (2p, fire+earth, order 114, challenge: mind)

Motor counter for this chain: **built[2p] = 1** (this level has motor OFF; the next one is ON).

## The design in two sentences

A weighing beam (`seesaw`, `y: 15, range: 8`) is the only route between three storeys, each flush
with one of its positions — gallery 11, hall 15, cellar 19 — and because only the heavier pan is
ever at floor level, the far pan can never be loaded from below. So Earth rolls the stone onto its
own pan to send the far pan up to Fire in the gallery, Fire loads three crates onto it there, and
Earth then shoves that same stone off the pan it is standing on: three crates outweigh Earth alone,
and the stone lands on the heavy pad that unlocks Earth's door.

## What passes

`node kit.mjs check steelyard` → **No problems. Ready to pack.**

- solved in 28.4 s (par 120 s), 3/3 gems, no deaths;
- both co-op necessity tests pass (neither player can idle in its door);
- four shortcut scripts all fail for the right reason: Earth holding the pad itself, Fire trying to
  shift the stone, Earth riding with the stone still aboard (5 against 4), and two crates instead of
  three (2 against 2 only levels the beam).

`node tools/novelty.mjs steelyard` → **PASS (invented)** for `unload-the-pan-you-ride` and
`mass-adds-on-the-beam`, both coined in `tools/ideas.mjs`. The honest caveat is written into
NOTES.md and into the keys' own notes: the campaign's **Assay** (3p) and **Counterpoise** (4p)
already sum weights on a seesaw, so the tool's "nothing anywhere" is partly an artefact of untagged
campaign data. What is genuinely new is the seesaw as a three-storey route, which no 2-player level
anywhere uses.

`node tools/build.mjs` and `node tools/catalog.mjs` have both been run.

## What fails and the exact error

Nothing. The one residual risk, documented in NOTES.md: if Fire walks off the gallery's west lip
before any crate is aboard it cannot get back to its post. The latched chute (three studs, one per
crate) is what stops every other premature descent.

## The next thing to try

Nothing for this level — it is finished and pushed. If it is reopened: the generator that writes
`level.json` is `gen_steelyard.py` in the session scratchpad (regenerate rather than hand-editing
tiles), and `solution.mjs` keeps the map's geometry in its comments.
