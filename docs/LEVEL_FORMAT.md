# Elementals level format

This is the contract between the game, the in-game Level Editor and the Level Kit. A level is one JSON file. A **level bundle** wraps a level together with the solution replays that prove it can be solved. Bundles are what the kit packs, what players import into **My Levels**, and what play links carry.

Coordinates are in tiles: the grid is 40 columns (x = 0–39, left to right) by 22 rows (y = 0–21, top to bottom). A tile is 32 px. Times are in ticks: 60 ticks = 1 second.

## 1. The level file

```json
{
  "id": "sunken_forge",
  "name": "Sunken Forge",
  "order": 1000,
  "description": "Each of you opens the other one's way home.",
  "supports": [["fire", "water"], ["fire", "water", "earth"]],
  "parTicks": 2400,
  "dark": false,
  "hints": ["Fire melts ice.", "Water puts out flames."],
  "tiles": ["########################################", "... 22 rows of 40 characters ..."],
  "spawns": { "fire": [9, 19], "water": [11, 19], "earth": [13, 19] },
  "entities": [{ "id": "gate", "type": "door", "x": 20, "y": 17, "h": 3 }]
}
```

| Field | Required | Meaning |
|---|---|---|
| `id` | yes | Unique id, lowercase letters, digits and `_`. Ids that start with `t` or `l` followed by a digit belong to the built-in levels. |
| `name` | yes | Shown in menus. |
| `order` | yes | A number. Built-in levels use it for their place in the campaign; for your own levels any number works. |
| `supports` | yes | Every group of elements the level is made for: 2 to 4 of `fire`, `water`, `earth`, `air`, each at most once. Every group needs a tested solution. |
| `tiles` | yes | 22 strings of exactly 40 characters (section 2). |
| `spawns` | yes | Where each element starts: `[x, y]` is the tile the character stands **in** (the floor is the tile below). Needed for every element in any supported group. |
| `entities` | yes | Everything else (section 3). |
| `parTicks` | no | Finishing within this many ticks earns the "under par" star. Default 3600 (60 s). |
| `description` | no | One line shown with the level. |
| `hints` | no | Shown one at a time when players seem stuck (if hints are on). |
| `dark` | no | `true`: everything is dark except around the characters and lit torches. |

## 2. Tiles

| Char | Tile |
|---|---|
| `.` (or space) | air |
| `#` | rock (solid) |
| `/` | 45° slope rising to the right |
| `\` | 45° slope rising to the left |
| `=` | one-way ledge: jump up through it, stand on it, press Down to drop through |
| `L` | lava: safe for Fire only |
| `W` | water: safe for Water only |
| `M` | mud: safe for Earth only |
| `V` | void mist: safe for Air only |
| `S` | toxic sludge: kills everyone |

Liquids are flush with the floor: a liquid tile is solid underneath, and touching its surface checks your element. Anyone may stand in their own liquid. The border of the level should be rock.

## 3. Entities

Every entity has `type`, `x` and `y` (its top-left tile). These fields are optional for every type:

| Field | Meaning |
|---|---|
| `id` | Needed when something is wired to it or a solution script refers to it. Defaults to `<type>_<index>`. |
| `w`, `h` | Size in tiles (default 1 × 1). |
| `requiresElements` | The entity exists only when all of these elements are playing. |
| `excludesElements` | The entity is removed when any of these elements is playing. |

With these two, one layout can serve several groups: a gate that only exists when Earth plays, or a plate for the 2-player group that the 4-player group doesn't get.

### Triggers (they have `targets`)

| Type | On while | Fields |
|---|---|---|
| `plate` | something stands on it (players, crates, boulders, even mid-air: it sees whatever overlaps it) | `weight`: `"light"` (default: anything) or `"heavy"` (mass 2 or more: Earth, a boulder, a stack). `w` for wider plates. |
| `button` | pressed with Interact | `mode`: `"toggle"` (default: each press flips it), `"timed"` (on for `duration` ticks, default 180), `"hold"` (on only while someone at it holds Interact). |
| `lever` | flipped with Interact (each pull toggles it) | `on`: starts on. |
| `torch` | lit by Fire touching it (stays lit; lights up dark levels) | `lit`: starts lit. |
| `turbine` | Air touches it, and for `duration` ticks after (default 0) | |
| `freezepad` | Water stands on it. Targets **pools only**. | |

Every trigger needs `"targets": ["<id>", ...]`.

### Targets (things triggers drive)

A target's signal is on when at least `required` (default 1) of its inputs are on. `"invert": true` flips the signal. `"latch": true` keeps it on once it has been on. A door with no inputs never opens; an elevator, fan or belt with no inputs is always on.

| Type | What it does | Fields |
|---|---|---|
| `door` | A solid gate. Upright (`h` ≥ `w`) doors open upward, wide ones open to the left, at 4 px a tick. A closing door rests on whoever is under it. | `w`, `h` (usually `h: 2`–`4`), `required`, `invert`, `latch` |
| `elevator` | A platform `w` tiles wide and 16 px thick that moves along `path`. | `path`: `[[x, y], ...]` tile positions of its top-left, each step horizontal or vertical. `mode`: `"powered"` (default: travels to the end of the path while on, back while off) or `"loop"` (shuttles end to end while on, waiting `pause` ticks at each end). `speed` px a tick (default 1.5). |
| `fan` | An updraft filling its `w` × `h` area while on. | `strength` (default 0.9: lifts Air only; see docs/MECHANICS.md for heavier winds). |
| `belt` | A solid conveyor that carries whatever stands on it. | `speed` px a tick (default 2, negative runs left). Wired, it runs while on; with `mode: "reverse"` it always runs and turns back while on. |
| `pool` | Covers a row of `W` tiles; while frozen, everyone can walk on it. | `w`; `duration`: ticks it stays frozen after its freeze pad is left (default 300); `invert`. |

### Objects and obstacles

| Type | What it is |
|---|---|
| `box` | A crate anyone can push (mass 1). Stands on plates, rides lifts, can be carried on a head. |
| `boulder` | Only Earth can push it (mass 3: holds heavy plates). |
| `seesaw` | A plank `w` tiles wide in two halves: the heavier side goes down by `range` tiles in all (default 2). |
| `ice` | Solid; Fire melts it by touching it for a third of a second. |
| `firewall` | Solid to everyone, Fire included; Water puts it out by touching it. |
| `cracked` | A solid floor that Earth breaks with a ground pound (Down in mid-air). |
| `gem` | `element`: `fire`/`water`/`earth`/`air` (only that element takes it) or `neutral` (anyone). Taking every gem is one of the three stars. |
| `exit` | `element`: whose door it is. 1 tile wide and 2 tall, standing on solid ground. Exactly one per element in every supported group. The level is won when everyone stands in their own door at once. |
| `checkpoint` | Respawn point, used only when players choose "respawn at checkpoint". |
| `sign` | `text`: a short line drawn starting at its tile, about 6 px a character. |

## 4. The level bundle (`.elementals.json`)

```json
{
  "format": "elementals-level",
  "version": 1,
  "requires": 1,
  "level": { "...": "the level file" },
  "solutions": [
    { "level": "sunken_forge", "elements": ["fire", "water"], "seed": 1, "ticks": 930, "inputs": [[[120, 2], [30, 18]], [[50, 1]]] }
  ],
  "author": "Ada",
  "notes": "# Sunken Forge\n1. **Solution:** ...",
  "tool": "elementals-kit 1"
}
```

- `version` is the version of this wrapper. `requires` is the **level format** version a game must read to play the level (section 5).
- `solutions` holds at most one replay per supported group. A replay lists, for each player in the order of `elements`, run-length encoded inputs: `[ticks, bits]` pairs, where bits are Left 1, Right 2, Down 8, Jump 16, Interact 32. The game plays replays back exactly: the simulation is deterministic.
- `author` (at most 60 characters), `notes` (the design notes, at most 20 000) and `tool` are optional.
- A bare level file is accepted wherever a bundle is; it counts as a bundle with no solutions.

A **play link** is the game's address followed by `#level=` and the bundle packed into text: `e1.` and then the deflate-compressed JSON in base64url. The `e1.` prefix names that packing.

## 5. Versions

Everything in this document is **level format 1**. As the game gains features, later formats add to it; they never change what an existing field means.

- A bundle's `requires` is the format its level needs. The kit sets it from what the level actually uses.
- A level that uses only format 1 keeps working in every version of the game.
- A game that is older than a level it is given refuses it with "made for a newer version of Elementals" (update the game, or reload the page). It never plays a level while ignoring parts of it.
- Fields, entity types or tiles not listed here are errors: the game would not know what they mean.
