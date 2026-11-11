# Elementals Levels

Thirty fan-made co-op levels for **Elementals**, built with the Elementals Level Kit —
ten for two players, ten for three and ten for all four. Every one of them passes
`node kit.mjs check`: it is solvable by the recorded solution, every gem is taken within par,
nobody dies, and the level cannot be finished while any one player waits in their door.

About a third of them are tagged **Puzzle + hands**: the solution still has to be worked out,
but a jump, a boost or a timed window also has to be hit. The rest are tagged **Puzzle** — the
moves in those are comfortable and the difficulty is all in the plan.

The published index is **[index.html](index.html)** — serve it with GitHub Pages
(*Settings → Pages → Deploy from a branch → `main` / `/ (root)`*) and every level gets a
play link people can open straight into their own *My Levels*.

## Layout

| Path | What it is |
|---|---|
| `index.html` | The generated catalogue page (do not edit by hand) |
| `levels/<id>/` | One level: `level.json`, `solution.mjs`, `NOTES.md`, `meta.json`, generated `replays/` and `play-link.txt` |
| `levels/_lib.mjs` | Helpers shared by the solution scripts |
| `packed/<id>.elementals.json` | The packed bundle players import in *My Levels → Import file* |
| `tools/build.mjs` | Checks and packs every level, then regenerates `index.html` |
| `tools/catalog.mjs` | Regenerates `catalog/` from `levels/` and `catalog/campaign.json` |
| `tools/novelty.mjs` | How close a level is to everything else for the same player count |
| `tools/roll-features.mjs` | A random set of ingredients for the next level |
| `catalog/LEVELS.md` | Every level — these 30 and the campaign's 75 — with its idea and features |
| `catalog/MAPS.md` | The map and wiring of each of these 30 levels |
| `catalog/levels.json` | The same data for scripts; `campaign.json` is the built-in levels' fingerprints |
| `.claude/skills/new-level/` | The skill that designs, checks and publishes a new level |
| `kit.mjs`, `docs/`, `examples/`, `types/` | The Level Kit, unchanged |

## Working on a level

```bash
node kit.mjs show <id>
node kit.mjs check <id>
node kit.mjs play <id>
```

`check` validates the level, runs the solution script for every supported group, records the
replays and verifies that the level cannot be finished while any one player waits in their door.
A level counts as finished only when `check` reports no problems.

## Rebuilding the site

```bash
node tools/build.mjs
```

That re-checks and re-packs every level, refreshes each play link, and rewrites `index.html`.
Use `--fast` to rebuild the page from the existing links without re-running the checks.

## Per-level `meta.json`

```json
{
  "order": 101,
  "challenge": "mind",
  "core": "crate-substitutes-for-the-plate-holder",
  "ideas": ["object-as-permanent-switch", "hold-switch"]
}
```

`challenge` is `mind` (solved by thinking; comfortable moves) or `motor` (also asks you to hit a
window or a jump). `order` sorts the cards on the page: 1xx for two players, 2xx for three, 3xx for
four. `core` is a short tag for the level's central idea and must be unique among the levels for the
same player count. `ideas` lists what the level is built from, in the vocabulary of
`tools/ideas.mjs`. The aim is to invent an idea for each new level and add its key to that table;
failing that, use one no level of the same player count has used; and only failing that, a new
pairing of old ideas. Repeating *ingredients* — the same ice walls, turbines and cracked floors —
is free. `tools/novelty.mjs` checks this and says which of the three a level managed.

## Adding a level

Invoke the `new-level` skill, or follow `.claude/skills/new-level/SKILL.md` by hand. In short: read
`catalog/LEVELS.md` for the player count you are building for, roll ingredients with
`node tools/roll-features.mjs <n>`, design the core before the map, build and `check` it, clear
`node tools/novelty.mjs <id>`, then run `tools/build.mjs` and `tools/catalog.mjs` so the level
reaches both the page and the catalogue.
