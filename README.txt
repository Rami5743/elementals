ELEMENTALS LEVEL KIT
====================

Make new Elementals levels with your own AI coding agent, play them, and share them.

You need:
  - Node.js 20 or newer (https://nodejs.org)
  - An AI agent that can work in a folder and run commands, with your own account:
    Claude Code, Codex, Gemini CLI, Cursor, GitHub Copilot or similar.

How to use it:
  1. Unzip this folder somewhere.
  2. Open the folder in your agent (for example, run "claude" in it) and ask:
       "Make me an Elementals level for Fire and Water about a sinking platform."
     The agent reads AGENTS.md, designs the level, writes a solution for it and
     checks it with the game's own rules.
  3. Ask it to "play" the level: the game opens in your browser with your level
     in My Levels. Tell the agent what to change.
  4. When you like it, ask the agent to "pack" it. In the game, open
     Main menu > My Levels > Import file and choose packed/<level>.elementals.json.
     From My Levels you can also copy a play link to send to friends.

The commands (the agent runs them for you):
  node kit.mjs help

Your levels are in levels/. Nothing is sent anywhere until you share a link or a file.
