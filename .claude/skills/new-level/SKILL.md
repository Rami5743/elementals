---
name: new-level
description: Design, build, verify and publish a new Elementals level in this repo. Use when the user asks for a new level, another level, one more level, a level for 2/3/4 players, a level with a particular element group, or a harder level. Takes the player count and a motor-challenge parameter (motor on = some precision or time pressure, motor off = nothing but thinking).
---

# Build a new Elementals level

A level is finished when `node kit.mjs check <id>` reports no problems for every supported group,
`node tools/novelty.mjs <id>` does not fail, and the level appears on the index page and in the
catalogue. Work on `main`; do not open a branch.

## 1. Settle the parameters

- **Player count** (2, 3 or 4) and, if the user named one, the element group.
- **Motor challenge: on or off.** If the user did not say, ask once — this changes the design, not
  just the tuning. See `references/difficulty.md`.
- Everything else is yours to choose.

## 2. Read what already exists

Read the sections of `catalog/LEVELS.md` for **this player count** — both this repo's levels and
the campaign's. That is the bar for novelty. `catalog/MAPS.md` has the maps of this repo's levels
if you want to see how a shape was laid out.

The rule the user set: **levels for the same player count must differ materially from each other.**
A 2-player level may be very close to a 3-player level; two 3-player levels may not be close to
each other. Reusing an old idea is fine; reusing an old *combination* is not.

## 3. Roll the ingredients

```bash
node tools/roll-features.mjs <players>
```

It picks a spine, two supports, a terrain and a twist, biased away from what this player count has
already seen, and lists the core tags already taken. Re-roll as often as you like before you commit
to one; you may swap at most one rolled ingredient for a reason you state in NOTES.md. The point of
the roll is that the feature mix should not be chosen by habit — this repo's early levels nearly all
used ice + flames + turbine + cracked floor, and that is exactly what to stop doing.

## 4. Design on paper, before any JSON

Write these down first:

1. **The core, in one sentence** — what a player could tell a friend after finishing. Then a short
   kebab-case `core` tag for it. Check the tag against the taken cores for this player count; if it
   is a rephrasing of one of them, the design is not new, whatever the feature list says.
2. **Each player's job**, and why no one else could do it.
3. **The forced order**, and why it is not readable off the map.
4. **The twist**: the step that is counter-intuitive — something must be undone, given up, used
   backwards, or done in an order that looks wrong.
5. **The plausible wrong plan** and the stateable reason it fails.

Hold the design to `references/difficulty.md`. The target is the hardest levels of the campaign and
beyond: these are not meant to be a gentle addition to the set.

## 5. Build it

Read `references/engine-facts.md` **before** writing tiles or a solution script. It is the measured
behaviour of this simulation, and most of it is not guessable; skipping it costs many wasted
check-and-fix loops. `references/building.md` has the practical recipe: the generator-script
pattern, the layout shapes that work, and the failures that come up every time.

```bash
node kit.mjs new "<Name>"      # scaffolds levels/<id>/
node kit.mjs show <id>         # the map with a ruler and every entity
node kit.mjs check <id>        # validate, run the solutions, record replays
```

Ids are lowercase with `_`; ids starting with `t` or `l` and a digit are reserved. Only edit files
under `levels/` (plus this repo's own `tools/`, `catalog/` and `index.html` at the publish step) —
never `kit.mjs`, `kit.d.mts`, `types/` or `docs/`.

## 6. Hunt your own shortcuts

`check` only catches a player who is never needed and a barrier jumpable from the floor. Before you
call it done, walk through each of these and write the answer in NOTES.md:

- Could somebody jump the barrier **from a partner's head**? That is a tile higher than any jump.
- Could Air **glide** past it, or reach a ledge nobody else can?
- Could a **crate or boulder** be used as the step you did not intend?
- Could a player **hold a gate open with their body** instead of the mechanism you built?
- Does every barrier reach the **ceiling**? A 2-tile door under a 3-tile roof is a doorway.
- Is the way back **open** when it should not be, or shut when a player still needs it?
- Can the level reach a state where it **cannot be finished**? If yes, redesign — a mistake must
  cost time, never the level. Where a loss is possible anyway, place a `checkpoint`.

## 7. The novelty gate

```bash
node tools/novelty.mjs <id>
```

It reports the weighted feature overlap with every level of the same player count, the features
that are new at this player count, and a verdict.

- **FAIL** — change the design. Do not reword the description to get past it.
- **REVIEW** — allowed, but say in NOTES.md why the core is not the neighbour's core.
- It cannot judge ideas, only parts. You still have to answer honestly: *if someone played this
  straight after the nearest level, would it feel like the same puzzle?*
- Most of the levels already in the repo do **not** pass this gate: their ideas differ but their
  ingredients repeat. That is the bar being raised, not a bug in the tool.

## 8. Publish

1. `levels/<id>/NOTES.md` — the format every level here uses: a one-line `**Introduces:** …`, then
   `## The intended solution`, `## Why each player is needed`, `## The insight`, `## Likely failures
   and how players recover`, `## Shortcuts that were closed`, and `## Kinship with the campaign`
   naming the nearest campaign level and what is different about this one.
2. `levels/<id>/meta.json` — `{ "order": N, "challenge": "mind"|"motor", "core": "<tag>" }`.
   Order numbering: 1xx for two players, 2xx for three, 3xx for four; take the next free number.
3. Regenerate and commit:

```bash
node kit.mjs check <id>
node tools/build.mjs
node tools/catalog.mjs
git add -A && git commit && git push -u origin main
```

`tools/build.mjs` rebuilds `index.html`, the packed bundle and the thumbnail; `tools/catalog.mjs`
rebuilds `catalog/LEVELS.md`, `catalog/MAPS.md` and `catalog/levels.json`. Both must be run, or the
level is invisible to the page and to the next novelty check.

Tell the user the level's name, its core in one line, its play link
(`levels/<id>/play-link.txt`), and what the novelty check said.
