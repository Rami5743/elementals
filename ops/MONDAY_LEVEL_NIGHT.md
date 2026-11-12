# Monday level night — runbook for the orchestrator

A scheduled task fires a fresh session every Monday at 17:39 Israel time. That session is the
**orchestrator**. Its job is to keep three level-building agents running until 23:00, merge
their work into `main` as it lands, and write a short summary at the end. This file is the
whole procedure; follow it in order.

The repo is `rami5743/elementals`, normally already cloned at `/home/user/elementals`. If it is
not, clone it there first and work from it.

## 0. Preflight (a few minutes, before 18:00)

```
cd /home/user/elementals
git checkout main && git pull --ff-only origin main
node tools/catalog.mjs >/dev/null && node tools/audit.mjs --fast | tail -3
```

Read, in this order: `CLAUDE.md`, `AGENTS.md`, `catalog/LEVELS.md` (at least the sections for
the three player counts), and `.claude/skills/new-level/SKILL.md`. Everything the agents build
must go through that skill; you are not inventing a different procedure here.

Then set the two clocks, with the `send_later` tool of the claude-code-remote server:

- **23:00 Israel time** — message: `WIND DOWN: stop spawning, follow section 5 of ops/MONDAY_LEVEL_NIGHT.md`.
- **every 30 minutes** — message: `HEARTBEAT: check the three chains (section 4)`. Re-arm the
  next heartbeat each time one fires; stop re-arming after the wind-down message.

The heartbeats are what keep you alive between agent completions, so do not skip them.

## 1. The three chains

One chain per player count. They run independently and in parallel.

| chain | players | branch | `order` band |
|---|---|---|---|
| 2p | a 2-element group | `claude/levels-2p` | 400–499 |
| 3p | a 3-element group | `claude/levels-3p` | 500–599 |
| 4p | all four | `claude/levels-4p` | 600–699 |

Each chain builds levels one after another in a fixed cycle of three:

1. motor challenge **off**
2. motor challenge **off**
3. motor challenge **on**

then back to the start. Keep a counter per chain (`built[2p] = 0, 1, 2, …`); the level about to
be built has motor **on** exactly when `built % 3 == 2`. Keep the counters in this conversation
and restate them at every heartbeat so they survive a context compaction.

The order bands keep `meta.json` `order` values from colliding between chains. Within a band,
the agent takes the next free number.

## 2. Spawning one level

One agent invocation builds **one** level and then returns. As soon as it returns you merge and
spawn the next one for that chain, so the chain never idles for more than a minute.

Spawn with the `Agent` tool: `subagent_type: "claude"`, `run_in_background: true`,
`isolation: "worktree"` (each agent gets its own checkout, so three can build at once), and a
prompt built from this template:

> You are building one new Elementals level in this repo, for **{N} players**, with the motor
> challenge **{on|off}**.
>
> Invoke the `new-level` skill (`Skill` tool, `skill: "new-level"`) and follow it to the letter:
> it has the whole procedure, the novelty rules and the measured engine facts in
> `.claude/skills/new-level/references/engine-facts.md`. Read `catalog/LEVELS.md` before you
> design anything, and `node tools/novelty.mjs <id>` must pass before you finish.
>
> Work on branch `{branch}`, cut fresh from the latest `main`:
> `git fetch origin main && git checkout -B {branch} origin/main`.
> Give the level an `order` in the band {band} that nothing else in `levels/` uses.
>
> Done means all of: `node kit.mjs check <id>` reports **no problems**; NOTES.md written as the
> skill requires; `node tools/novelty.mjs <id>` passes; `node tools/build.mjs` and
> `node tools/catalog.mjs` both run; everything committed; and the branch pushed with
> `git push -u origin {branch} --force-with-lease`.
>
> Then stop and report back: the level id, its name, the element group, the solve time from
> `check`, the novelty tier, and one line on the idea. Do not start a second level.
>
> Never touch `kit.mjs`, `kit.d.mts`, `types/` or `docs/`. Never push to `main`. If you cannot
> make a level work after a genuine effort, say so plainly in your report rather than lowering
> the bar or leaving a broken level behind.

Record, for each running agent: chain, agent name/id, the level it is on, and the time you
spawned it.

## 3. Merging a finished level

The moment an agent reports success, before spawning the next one for that chain:

```
cd /home/user/elementals
git checkout main && git pull --ff-only origin main
git fetch origin {branch}
git merge --no-ff origin/{branch} -m "Level night: <id> (<N>p)"
```

Three agents branch from different commits, so the **generated** files conflict often. They are
all regenerable, so never hand-resolve them:

```
# on conflict in index.html, catalog/LEVELS.md, catalog/MAPS.md or catalog/levels.json:
git checkout --ours index.html catalog/ 2>/dev/null
node tools/build.mjs && node tools/catalog.mjs
git add -A && git commit --no-edit
```

`tools/ideas.mjs` can also conflict when two agents coin a new idea key in the same place: keep
**both** keys, then `git add` and commit.

A conflict anywhere else — two levels with the same id or the same `order`, a change to a file
outside `levels/`, `tools/ideas.mjs`, `catalog/` and `index.html` — is a real problem: abort
(`git merge --abort`), look at what the agent did, and fix it on its branch before retrying.

Then verify and push:

```
node kit.mjs check <id> | tail -3     # must still say: No problems
git push origin main
```

If `check` fails after the merge, the merge broke something — fix it on `main` before pushing,
and say so in the summary.

## 4. Heartbeat: is anything stuck?

At every heartbeat, for each chain:

- **Idle chain** (no agent running) → spawn the next level at once. A chain must never be idle.
- **Agent running under 50 minutes** → leave it alone. A level legitimately takes 20–40 minutes.
- **Agent running over 50 minutes** → look before acting: `TaskGet` for its progress, and
  `git log --oneline -3 origin/{branch}` to see whether it has pushed anything. If it is clearly
  still working (recent tool calls, commits appearing), give it one more heartbeat.
- **Agent over 80 minutes, or plainly stuck** (no progress between two heartbeats, repeating the
  same failing command, waiting on something that will not come) → `TaskStop` it, read enough of
  its transcript to see *why* (a solution script that cannot be made to pass is the usual cause),
  then spawn a replacement for the same chain with a short note in the prompt saying what the
  previous attempt got stuck on and that it should pick a different idea. Record the incident for
  the summary.
- **Agent returned a failure** → do not merge; spawn a fresh one for that chain with the same
  note, and record it.

Never leave a chain without an agent while the window is open.

## 5. Wind-down at 23:00

1. Stop spawning. Do not start a level after the wind-down message, however much time seems left.
2. Let the in-flight agents finish, with a grace of **30 minutes**. At 23:30 `TaskStop` anything
   still running; its branch is left as it is, unmerged, and named in the summary so it can be
   picked up next week.
3. Merge every finished branch as in section 3, one at a time.
4. Final check on `main`:
   ```
   git checkout main && git pull --ff-only origin main
   node tools/build.mjs && node tools/catalog.mjs
   for d in levels/*/; do id=$(basename "$d"); node kit.mjs check "$id" | grep -q "^No problems" || echo "BROKEN: $id"; done
   git status --porcelain      # expect nothing, or commit the regenerated files
   git push origin main
   node tools/audit.mjs --fast | tail -3
   ```
5. Write the user a short summary in the chat: how many levels each chain built and their names
   and ideas, the motor on/off pattern that actually came out, anything that got stuck and what
   was done about it, any branch left unmerged, and the audit line before and after.

## Rules that hold all night

- `main` is never force-pushed and nothing is ever deleted from `levels/`.
- A level that does not pass `kit.mjs check` cleanly is not merged, however late it is.
- Quantity never buys quality: the bar is the one in the `new-level` skill, and a night with
  four good levels beats a night with nine thin ones.
