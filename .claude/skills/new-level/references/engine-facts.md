# What this simulation actually does

Measured against `kit.mjs` itself, not guessed from the docs. Everything here cost at least one
failed `check` to learn. Read it before laying out tiles or writing a solution script.

A tile is 32 px; 60 ticks is a second. Tile `y` grows downward. A player's "bottom" is its feet in
pixels: standing on a floor whose tile row is `r` means `bottom === r * 32`.

## Bodies

| | w | h | run px/tick | jump px | jump tiles | mass | fanFactor | gravity |
|---|---|---|---|---|---|---|---|---|
| Fire, Water | 22 | 30 | 3.2 | 86 | 2.7 | 1 | 0.35 | 0.55 |
| Earth | 26 | 30 | 2.6 | 76 | 2.4 | 2 | 0.15 | 0.55 |
| Air | 20 | 28 | 3.4 | 120 | 3.75 | 1 | 1.0 | 0.50 |

A standing bounce carries about **2.2 tiles** horizontally, a jump with a run-up about **2.6**. Do
not design a gap on the assumption that anyone clears three tiles on the flat. Jumping *down* onto
a lower bank buys roughly another tile.

## Jumping

- **Jump is edge-triggered.** Holding the jump bit gives exactly one jump; to jump again you must
  release first. A script that holds jump for twenty ticks in the hope of a second hop gets one.
- A press of **1 tick gives a low hop**; **10 ticks or more gives the full height**.
- A jump is **blocked outright when the ceiling is one tile above the floor**. In a corridor one
  tile high nobody jumps, nobody climbs on anybody, and nobody passes anybody. This is the cleanest
  way to forbid a shortcut — and it also forbids everything else, so use it deliberately.
- While airborne you keep **only your own input-driven horizontal speed**. Nothing you were standing
  on carries over: jump off a moving belt without holding a direction and you go straight up and
  come straight back down onto it.

## Players as scenery

- Players are **solid to each other**. `go` hops over one partner; a queue of three blocks it.
  Hopping over somebody needs **three tiles of headroom**; in two it is marginal, in one impossible.
  Plan the order of movement, or you will spend the afternoon debugging a traffic jam.
- You can **stand on a partner's head**, and a jump from a head reaches about **one tile higher**
  than that player's own jump. Every barrier has to be checked against this.
- A **stack is not heavy**. A plate's load is `max(mass)` over the actors overlapping it and riders
  are ignored, so two crates or a player on a head will not hold a heavy plate. Only Earth (2) or a
  boulder (3) does.

## Steps, lips and ledges

- There is **no auto step-up**. A lip of two pixels stops a walk dead. Objects resting in a notch,
  and anything floating slightly below a bank, are walls.
- One-way tiles (`=`): solid from above, open from below. Press **Down to drop through** one.
- A lift or a seesaw passes through a one-way tile, but **whatever it carries is left on top** on
  the way down.
- A **closing door pushes a crate or boulder down through a one-way tile**. Nothing else does.

## Belts

- A belt displaces whatever **stands** on it by `speed` px a tick, on top of that actor's own
  movement: walking against it nets `run - speed`. Airborne actors are untouched.
- Therefore the speed is a filter on *who*: below 2.6 everyone advances; 2.6–3.2 stops Earth;
  3.2–3.4 stops Fire and Water too; above 3.4 nobody walks against it.
- `mode: "reverse"` runs always and flips direction while its signal is on. Without `reverse` it
  runs only while on, and a stopped belt is an ordinary floor.
- Crates and boulders ride belts, and an object on a belt stops the tick the belt stops — so a
  belt wired to a `hold` button is a way of parking cargo on a chosen tile.
- **Only Earth can push a boulder.** Measured: Fire pressed into one for 600 ticks and it did
  not move a pixel. In a group without Earth a boulder is pure wall — and a machine (belt,
  lift, closing door) is then the only thing that can move it at all. Crates, by contrast,
  anybody pushes.
- **A boulder in a one-tile-high corridor is an absolute barrier**, even to a hopping player:
  measured, Fire could not get past one with jump held. A boulder in open ground is hopped over
  without a thought, so if a boulder is meant to block, put a roof one tile above it.

## Fans

- Lift depends on `strength` against the element's `fanFactor` and gravity. Measured at **1.5** in
  an open shaft: **Air climbs about 15 tiles**; **Fire and Water get no lift at all but hang for
  about 10 tiles of travel**; **Earth manages 3 tiles and comes down**. The default 0.9 lifts only
  Air; from about 1.6 Fire and Water start to rise; 1.54 is enough for Air carrying Earth.
- A rider only rises **while inside the fan's rectangle**. Holding a direction walks you out of the
  column, so steering is what stops you climbing — a usable puzzle in itself.
- A fan's area must be open tiles.

## Doors

- `h >= w`: **opens upward**, shrinking from the bottom while the top edge stays put. A player
  standing on a closed door is *not* carried up when it opens.
- `h < w`: **wide**, and opens to the left.
- 4 px a tick, so a three-tile door takes 24 ticks to clear.
- A closing door **rests on whoever is under it** — a body is a doorstop.
- `latch` keeps it open once it has opened. `invert` flips the signal. `required: n` wants n inputs
  on at once. A door with no inputs never opens.
- Keep a door **five tiles or more from the trigger that opens it**, or `check` reports a false
  "can jump over door" warning.
- A barrier must reach the ceiling. Three tiles of door under a four-tile roof is a doorway.

## Switches

- `plate`: anything overlapping it, including in mid-air — a plate can hang in a shaft.
  `weight: "heavy"` needs mass 2 or more.
- `turbine`: **Air only**, wherever it is placed, so height never makes one exclusive. On for
  `duration` ticks after Air leaves (default 0: only while touched).
- `freezepad`: **Water only**, and it may only target a pool.
- `lever` toggles; `button` has `toggle`, `timed` (`duration`) and `hold`.

## Pools

- `on` means **frozen and walkable**. While the (possibly inverted) signal is true the countdown is
  recharged to `duration + 1`; otherwise it ticks down, and the pool thaws at zero.
- So a normal pool stays frozen `duration` ticks **after** Water leaves the pad — and an **inverted**
  pool refreezes the instant Water steps off, which makes "Water opens it and dives in" impossible.
- Freezing changes nothing for objects: see below.

## Liquids and objects

- lava / water / mud / mist each belong to one element; **sludge belongs to nobody**. The wrong
  liquid kills on contact, and contact means overlap — standing on the row above a liquid is safe.
- **A boulder or crate rests on the surface of a liquid.** Its top ends up 30 px above the liquid
  tile's top, which is 2 px *below* a bank one tile higher — and that 2 px lip blocks a walk. To
  make a floating boulder into a bridge, put the far bank a tile lower so you step down onto it.

## Ice, flames, cracked floor

- **ice**: Fire melts it after **20 ticks of contact**, counted per block and never reset. Walking
  across a two-tile block is about 27 ticks and destroys it; landing on it for four ticks does not.
  A melted block is gone for good, so an ice bridge on the critical path can make a level unwinnable
  — do not build one.
- **firewall**: Water puts it out by touching it.
- **cracked**: Earth breaks it with a ground pound — a **new Down press while airborne**, resolving
  when Earth lands on the cracked tile. Earth is 26 px wide: if half of it is resting on the stone
  beside the panel the pound lands on stone and nothing happens. A pound needs about three tiles of
  headroom to get airborne first. After a smash Earth is falling again and can pound again, so
  stacked cracked floors can be drilled in one descent.

## Elevators

- `powered`: travels to the end of the path while on and back while off. `loop`: shuttles while on,
  waiting `pause` at each end. With no inputs an elevator is always on.
- The platform is **16 px thick** and sits at the top of its tile row, so it is flush with a floor
  whose tile row is the same. Players walk straight on and off.
- A platform parked in a gap is a floor; send it away and the gap is open.

## Entities and tiles

- An entity may **not overlap a solid or liquid tile** — turbines, plates, doors, gems, all of them.
  Plates and gems may float in open air.
- A gem is taken by body overlap and only by its own element. A standing player's body is in the row
  **above** the floor, so a gem for someone walking past goes at `floorRow - 1`.
- An exit is 1×2 and must stand on solid ground: one per element in every supported group.

## What `check` does and does not catch

- It validates, runs every supported group's script, records replays, and fails on a death, a missed
  gem, or a level that can still be finished while one player idles in its own door.
- It does **not** find head-stacking, gliding, body-doorstops, or an unwinnable state you can walk
  into. Those are yours to find.
- Debug with `node kit.mjs check <id> --trace 10 --ents gate,lift`. The trace prints every player's
  tile position and those entities' state.
