# Elementals Level Kit: instructions for AI agents

You are helping a player make a new level for **Elementals**, a 2–4 player co-op puzzle platformer (Fire, Water, Earth, Air). A finished level is a folder with the level file, a solution script for every supported group of players, the recorded replays and design notes, all passing `node kit.mjs check`. The player plays it in the game and may send it to the game's author for consideration.

Everything runs locally with Node.js 20 or newer. There is nothing to install. `kit.mjs` contains the game's real simulation, so what passes here plays exactly the same in the game.

## Read first

- `docs/MECHANICS.md`: elements, movement numbers, and the design rules learned from the 65 built-in levels. **Read it before designing.**
- `docs/LEVEL_FORMAT.md`: the level JSON (tiles, every entity type and field, wiring).
- `docs/SOLUTIONS.md`: how to write solution scripts, debug them and probe the physics.
- `examples/`: four built-in levels with their solutions and design notes. `node kit.mjs show l05_box_relay` and read `examples/l05_box_relay/` to see a complete level.

## Commands (run from this folder)

```
node kit.mjs new "Level Name"     # levels/<id>/ with a small working level to build on
node kit.mjs show <id>            # the map with a ruler and every entity with its wiring
node kit.mjs check <id>           # validate, run the solutions, record replays, run the tests
node kit.mjs play <id>            # open it in the game in the browser (a play link)
node kit.mjs pack <id>            # check, then write packed/<id>.elementals.json
node kit.mjs list                 # levels and examples
```

## Workflow

1. **Agree on the idea** with the player: which groups (e.g. Fire + Water, or Fire + Water + Earth), the mechanic or "aha" at its heart, the difficulty. If they leave it to you, propose one short concept and go.
2. `node kit.mjs new "<name>"`, then design the level in `levels/<id>/level.json`. Plan on paper first: each player's job, why nobody else can do it, and how the barriers stop shortcuts. Run `show` often to see the map.
3. Write `levels/<id>/NOTES.md`: (1) the intended solution, (2) each player's role, (3) why each player is necessary, (4) the main insight, (5) likely failures and how players recover. The game's author reads these notes when reviewing.
4. Write `levels/<id>/solution.mjs`: scripts that solve the level the intended way, for **every** group in `supports`, taking every gem within par.
5. `node kit.mjs check <id>` and fix every ✗ problem. Treat ! warnings seriously: they usually mean a shortcut. If a script fails, the level may be wrong, or the script: trace it, probe the physics, and fix whichever is wrong.
6. **Look for shortcuts yourself.** The checks catch a player who is never needed and barriers jumpable from the floor, but not everything: could someone jump from a partner's head, hold a gate up, carry a crate over, glide past? Where a shortcut must not work, block it and say how in NOTES.md.
7. `node kit.mjs play <id>` so the player can try it (it opens the browser; the link is in `levels/<id>/play-link.txt`). Adjust with their feedback and check again.
8. When the player is happy: `node kit.mjs pack <id> --author "<their name>"`. They import `packed/<id>.elementals.json` in the game (Main menu → My Levels → Import file).

## Rules

- Only edit files in `levels/` (and your own probe scripts). Don't change `kit.mjs`, `kit.d.mts`, `types/` or `docs/`: the game uses its own copy of the simulation, so changes there won't carry over.
- A level is done only when `check` reports **no problems** for every supported group.
- The solution must play the level as intended, not through a loophole. If your script finds an easier way than the design, the design has a hole: fix the level.
- Ids are lowercase with `_`; ids starting with `t` or `l` and a digit are reserved.
- Keep it fun for people: comfortable jumps, readable layout, recoverable mistakes, a clear idea. See "What makes a good level" in `docs/MECHANICS.md`.
