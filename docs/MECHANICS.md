# How the game plays, and what makes a good level

Elementals is a co-op puzzle platformer for 2–4 players. Each player is one element: Fire, Water, Earth or Air. If anyone dies, the whole level restarts, so players solve it together. The level is won when everyone stands in their own exit door at the same time.

## Elements

| Element | Safe liquid | Ability | Body |
|---|---|---|---|
| Fire | lava `L` | melts ice by touching it; lights torches | normal |
| Water | water `W` | puts out fire walls by touching them; standing on a freeze pad freezes pools | normal |
| Earth | mud `M` | heavy (mass 2): holds heavy plates alone, pushes boulders, breaks cracked floors with a ground pound (Down in mid-air) | slower, lower jump, 26 px wide |
| Air | void mist `V` | glides (hold Jump while falling); rides fans; spins turbines | lighter, higher jump, 20 × 28 px |

Each element dies in the other three liquids. Sludge `S` kills everyone. Fire, Water and Earth are 30 px tall; tiles are 32 px. Characters are solid to each other: they stand on each other's heads (human ladders), and whatever stands on a player moves with them.

Controls are Left, Right, Up = Jump, Down (drop through ledges; Earth's ground pound) and Interact (levers, buttons). Jump height depends on how long Jump is held.

**Movement facts the designs rely on**:

| | jump apex | crosses a liquid strip on open floor | under a 2-tile ceiling |
|---|---|---|---|
| Fire / Water | 86 px: 2-tile ledges, not 3 | up to 3 tiles | 1 tile |
| Earth | 76 px: 2-tile ledges | up to 2 tiles | none |
| Air | 120 px: 3-tile ledges, glides about 10 tiles | almost anything | 2 tiles |
| Standing on a partner | +30 px: a normal player reaches 3-tile ledges | | |
| Jumping off a partner while they jump (a "boost") | two players: the rider's feet reach about 6–7.4 tiles; three players: about 10.7 tiles | | |
| Riding on a partner's head | the carrier's own liquid is safe for the rider (it rides above the surface); Air can glide with up to two riders stacked on it; in a fan, Air carrying Fire or Water rises slowly, and Air carrying Earth (or two riders) doesn't rise | | |
| Carrying a crate or boulder | anything that falls on a player's head stays there and goes where they go, even in a glide. A low ceiling or wall scrapes it off | | |
| Jumping off Air in flight | a passenger can jump in mid-glide: its feet reach about 3 tiles above the takeoff 13 tiles out, and about 4 tiles 11 out | | |
| Three players jumping in turn (any order) | the top player's feet reach about 11 tiles. The timing is forgiving: 470 of 676 pairs of press timings reached 9.5 tiles | | |
| Fan strength (Fire / Water) | default 0.9: a little extra hang time. 1.2: a jump stays at takeoff height for about 5 tiles. 1.5: about 10. 1.54: about 14. From about 1.6 Fire and Water rise. Earth doesn't notice at these strengths (about 3 tiles). At 1.54, Air carrying Earth rises | | |
| Fan looks | breeze (default): grey, pale streaks, Air's icon when on. Thermal (above the default, below about 1.6): amber, slow warm streaks. Gale (about 1.6 and up): orange, fast streaks, and the Fire, Water and Air icons, shown dimly while off. `fanKind` picks the look from the same numbers the sim uses | | |
| Gale | from 2.0 Fire and Water rise alone. From 2.6 they can also carry Earth on their heads (Earth alone never rises, and Earth under them doesn't help: they fly off). Below that they can't carry Earth | | |
| Belts | a belt carries what stands on it without changing anyone's speed, so a jump leaves its push behind. Walking against it gains run speed minus belt speed (Earth runs 2.6, Fire and Water 3.2, Air 3.4), but hopping beats any belt, even under a 1-tile roof (Earth gains about 14 tiles in 5 s against 3.3). A belt is a carrier, never a barrier. Crates and boulders can't hop: a belt takes them where it runs | | |
| Closing doors | a closing door rests on the head of whoever is under it and waits. Someone up to a tile behind them slips through too. It stops at the height of who holds it, so under Air (28 px) nobody else fits, and a stack of two holds it twice as high | | |
| Rolling boulders | a boulder with `rolls` reaches its top speed of 4 px a tick after about 2 tiles of slope and rolls on about 3 tiles over level ground (liquids too: they are floors to it). Whoever stands in its way stops it: it pushes nobody and never rolls onto a head, so a player below it on a slope holds it there. Earth pushes it back up a slope. It can't be caught up with: Earth runs 2.6 | | |
| One-way tiles | a lift or seesaw goes through them, but what it carries stops on them on the way down. A closing door pushes whatever is under it through them, and nothing else gets a crate or boulder through | | |
| Plates | a plate only sees what overlaps it, and it needn't be on the ground. A floating plate is touched by anyone standing on a boulder under it, so make such plates heavy | | |

More facts found while building the 75 built-in levels:

- **Barriers must reach the roof.** Fire and Water jump about 2.8 tiles, Earth 2.5 and Air 3.9. A 2-tall door, ice block or fire wall with open air above it is decoration: someone jumps it and the partner who should open it isn't needed. Put rock above every barrier that must stop someone, up to the ceiling or a roof. `check` warns about barriers it can jump from the floor; also think about ledges and partners' heads.
- **Gates can be held open.** A closing door rests on whoever stands under it, and a partner up to a tile behind slips through. So if a gate is opened by a plate a *player* can stand on, two players can skip the puzzle: one holds the plate, another stands under the gate, the first runs in behind. Where that must not work, put one tile of sludge `S` under the gate (an easy hop through while it is open, but nobody can stand there), or use plates only an object can reach, or latching gates. Air (28 px) holds a gate too low for the others; a stack of two holds it twice as high.
- **Plates see what overlaps them**, even in mid-air: anyone standing on a boulder under a floating plate touches it. Make such plates heavy.
- **A heavy plate reads the heaviest single thing on it, and Earth counts.** If a boulder is meant to hold a plate, check that Earth standing on it doesn't do the job just as well (Earth can step off later). And a door that latches from a plate only has to be pressed once: anyone who can reach that plate opens it for good.
- **Switches show how they behave.** In the game, every switch carries a small badge: it stays on, runs out (a timed button or turbine, whose ring is its clock), or needs holding. Players can see that for themselves, so signs and hints needn't spell it out.
- **Timed buttons can be pressed again** to keep a gate open; put a trapdoor (a wide door) under the button if that must not work.
- **Lifts** should sit in a notch in the floor so they are flush with it. Riders stay on a one-way ledge when a lift goes down through it.
- **Lifts never crush: they stop on whatever is in their way.** A boulder or crate left in a lift's path, or under its lowest stop, blocks it for good. Leave room under the lowest stop (two tiles) and keep objects from being pushed into the shaft. A rider standing half off a lift, under a low ceiling, stalls it until they step on properly. A lift as wide as two tiles carries a player beside a boulder: make it one tile wide if the boulder must ride alone.
- **A door with no inputs never opens**: a permanent plug, for example in a seesaw's wall slit.
- **Belts carry, never block.** Hopping beats any belt, even under a 1-tile roof. Crates and boulders can't hop, so a belt takes them where it runs.
- **Rolling boulders** (`"rolls": true`) reach their top speed of 4 px a tick after about two tiles of slope (faster than anyone runs: Earth 2.6) and roll on about three tiles over level ground, liquids included, since liquids are floors to them. Nobody can catch one, but whoever stands in its way stops it (it pushes nobody and never rolls onto a head), so a player below it on a slope holds it there; released from low on the slope it starts slowly. Earth pushes it back up a slope. Riders go with it, even through sludge, and under a 2-tile roof only a boulder with one rider fits. Air is short enough that a boulder held on a slope rests partly over its head, and Air's jump then carries it off: don't make Air the brake.
- **Fans:** the default strength 0.9 lifts only Air. Fire and Water float from about 1.6 and rise alone from 2.0; from 2.6 they can carry Earth. Earth alone never rises. At 1.54, Air carrying Earth rises. Where two fans touch, a player in both feels only the stronger. Prefer the strengths the built-in levels use (0.9, 1.54, 2.7): players learn how each looks and behaves.
- **A button or plate in a 3-wide pool under a 1-tile roof** can only be used by the pool's element (others can't press it mid-jump).
- **Signs** go in open air, 4–6 tiles above the floor, where gates, players and walls don't cover them. The text runs right about 6 px a character; split long text into two signs a row apart.
- **Spawn points** must stand on ground that is safe for that element. Exits must stand on solid ground.
- **Save points** (`checkpoint`) are two tiles tall, from `y` down, like exits: for a post on a floor at row r, use y = r - 2. `check` reports one inside rock.
- **Short windows.** A gate that stays open for less than about 0.75 s, however patiently everyone else waits (a timed button, a boulder rolling over a plate, a lift going past a switch), is easy for people to miss even when the scripted solution makes it. `check` warns about each one: lengthen it, or say in NOTES.md that it's meant to be tight.

## What makes a good level

- **Every player is essential.** Each player has a job the others can't do: an ability, holding a switch, moving an object, being a platform, timing. `check` tests it: for each player, that player waits in their own door from the start and the others follow the solution, and the level must *not* be finishable.
- **One idea, clearly shown.** The best levels teach or combine one or two mechanics with a satisfying "aha". Avoid long, empty corridors and repeated plate-and-gate puzzles.
- **Reasoning, not precision.** Jumps should be comfortable (leave margin: if a gap is crossable only with a perfect running jump, widen the landing). Puzzles come from planning and teamwork, not reflexes.
- **Recoverable.** A mistake should kill (restart) or be undoable; never leave players stuck with no way to win except restarting by hand. Avoid one-shot objects that can be lost (a crate pushed into a pit) unless the level resets it or a lever can undo it. Good practice: let players try a timed part again after a miss (a lift that comes round again, a turbine that can be touched again, a boulder that can be sent back). A one-time chance is fine when it's the point of the level, but say so in a sign or hint.
- **Fair hazards.** Liquids show which element survives them. Don't hide deadly tiles behind things or at the edge of the screen.
- **Three stars are possible:** finish, finish within `parTicks`, take every gem. Gems should reward a small detour or a clever move, not be impossible. The solution must take every gem within par.
- **Every supported group is a complete design.** If the level supports Fire + Water and Fire + Water + Earth, Earth needs a real job in the second; use `requiresElements` / `excludesElements` to add or remove parts per group.
- Use the whole 40 × 22 screen, keep a rock border, and leave headroom: players are about one tile tall and jump about three.
