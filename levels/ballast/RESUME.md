# Ballast — resume notes

**Chain motor counter: built[2p]=2 (this level ON, the next two OFF).**

## The design in two sentences

A pulley keeps counting the weight of whoever jumped off it until they land somewhere else, so a
player hanging in an updraft still holds the pan down with nobody aboard. The gate that guards the
gallery is open only while the pan is down, so Water has to jump off the pan and ride the draught
through the gate without ever touching down — the one thing that shuts the gate is landing.

- Group: **Water + Earth**. `order` 146, `challenge` motor.
- Core tag: `airborne-weight-holds-the-rope`.
- Invented idea key: `rope-keeps-the-jumper` (to be added to `tools/ideas.mjs`).

## What passes

- Nothing yet — design milestone only, no level JSON written.

## What fails

- Nothing yet.

## Measured facts this design rests on (probed today, not in PHYSICS.md)

1. **A jumper's weight stays on a pulley rope until they land somewhere else.** Probed: Fire rode
   platform 1 down (`d` 0 → 128 px), jumped off at tick 150, and the rope's `ry` picked up its
   weight (0 → 128). `d` stayed at 128 and platform 2 stayed at y=10 for all 540 ticks Fire hung in
   a strength-2.0 updraft. The rope does not move while the jumper is airborne.
2. **The rope releases the weight on landing, not on leaving.** Same rig without the fan: Fire
   landed on the floor at tick ~203 and `d` immediately ran back 128 → 83 by tick 230.
3. **A pulley platform does NOT press a plate.** A plate hanging at the pan's bottom stop stayed
   `on=0` with the platform parked on it. So the pan's position can only be read through an
   *object* riding it — hence the boulder.

## The next thing to try

Write `level.json`: the two shafts, the draught, the boulder on the pan, and the two plates. Then
probe the weights arithmetic (below) before writing any solution script.

## The machine

Two platforms on one rope.

- **The pan** (platform 1), 2 tiles wide, in the left shaft. Rest position: flush with the gallery
  floor at the top, with **the boulder** standing on it.
- **The counterweight** (platform 2), in a sealed niche nobody can reach, with a weight of its own.

`weights: [0, 3.5]`, boulder mass on a rope = 3:

| on the pan | pan side | counterweight side | result |
|---|---|---|---|
| boulder only | 3 | 3.5 | pan **up** — the rest state |
| boulder + Water standing | 4 | 3.5 | pan **sinks** to the bottom |
| boulder + Water airborne after jumping off | 4 | 3.5 | pan **stays down** — the whole idea |
| boulder, Water landed anywhere else | 3 | 3.5 | pan **rises**, the gate shuts |

Two wires:

1. **Heavy plate `bellows`** on the ground floor → the **draught** (fan). Mass 2 or more, so only
   Earth holds it. The wind blows while Earth stands there and dies when Earth steps off.
2. **Heavy plate `pad`** hanging in mid-air at the pan's bottom stop → the **gate** in the gallery,
   eleven tiles above. Pressed by the boulder that rides the pan down, and by nothing else.

## The intended solution

1. Earth walks onto `bellows`. The draught starts to blow.
2. Water climbs the draught into the gallery. The gate is shut: the pan is up, so is the boulder.
3. Water steps onto the pan beside the boulder.
4. The pan sinks eight tiles. The boulder settles over `pad`; the gate opens, eleven tiles up.
5. Water is now at the bottom of the pan shaft, holding open a gate it cannot reach.
6. **Water jumps off the pan straight into the draught.** The rope keeps counting Water, so the
   boulder stays on `pad` and the gate stays open for the whole climb.
7. Water climbs, steers out of the column into the gallery and lands **beyond** the gate.
8. Landing takes Water's weight off the rope at last: the pan rises, the boulder leaves `pad`, the
   gate shuts behind Water.
9. Beyond the gate Water throws the `release` lever, which opens Earth's door on the ground floor.
10. Earth steps off `bellows` — the wind dies, it is no longer needed — and walks into its door.

## Why each player is needed

- **Earth** is the only body of mass 2: nothing else holds `bellows` down, so there is no wind
  without Earth, and a crate would not do. Earth is pinned there for every second Water is in the
  air.
- **Water** is the only one the draught lifts (Earth's `fanFactor` is 0.15 and it manages three
  tiles), and Water is the tipping weight on the rope: the boulder alone is 3 against 3.5.
- Earth cannot free itself: its door is opened by the lever beyond the gate, which only Water
  reaches.

## The forced order

Not readable off the map. The wind must be on before Water can go up at all; Water must go up
*before* riding the pan down, because the pan is only boardable from the gallery; and the flight
can only be attempted from the pan, not from the floor. The step that looks like the end of the
journey — stepping off the pan onto solid ground — is the one move that undoes everything.

## The twist

You keep the switch pressed by **jumping off it**. The pan is held down by a player who is not on
it, and the only state that releases it is the safe one: standing on the floor.

## The plausible wrong plans

1. *"Climb up and walk through the gate."* — The gate is shut until the pan is down, and the pan is
   only down while Water weighs on it, which happens eleven tiles below the gate.
2. *"Ride the pan down, step off, then climb the draught again."* — Touching the floor takes
   Water's weight off the rope; the pan rises and the gate is shut long before Water is halfway up.
3. *"Let Earth ride the pan, or push the boulder off it."* — Earth cannot reach the gallery: the
   draught will not lift it, and the pan is the gallery's only other floor.

## Shortcuts to close and prove

- Water climbs the draught straight from the floor and tries to enter the gallery with the gate
  shut (must fail: no way past).
- Water rides the pan down, steps off onto the floor, and runs for the draught (must fail: gate
  shut on arrival).
- Earth stands on `pad` instead of the boulder (must fail: Earth cannot get into the pan shaft, and
  standing in it would be in the pan's path).
- Earth tries to reach the gallery (must fail: the draught gives Earth three tiles).
