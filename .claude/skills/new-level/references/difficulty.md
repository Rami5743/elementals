# How hard, and hard at what

## The cognitive bar

Aim at the hardest third of the campaign — Interlock, Elementarium, Eclipse, Brake, Avalanche — and
past it. The levels already in this repo are easier than that; do not take them as the standard.

### The shape to avoid

Almost every weak level in this repo has the same shape: **a corridor with one barrier per player,
cleared in the only possible order, ending in a door.** Fire melts the ice, Water puts out the
flames, Air spins the turbine, Earth breaks the floor, everybody walks right. There is nothing to
work out — the map tells you the order and there is only one thing to do at each step. If your
design can be written as *"each player clears their own barrier, then everyone walks to the exit"*,
it is a corridor, not a puzzle, and it has to be thrown away rather than decorated.

Element barriers are scaffolding for making a player necessary. **Use at most one of them in a
level.** Everybody else's necessity has to come out of the central mechanism itself: the one who
can move the weight, the one the draught lifts, the one who can be in two places because the other
is holding something.

### Hard requirements

A level clears the bar when all of these are true. Write the answers down in NOTES.md before
building, and if one of them is missing the design is not finished.

0. **Size.** The recorded solution runs for at least **20 seconds** of simulated play (`check`
   prints it), and 30 or more is the mark to aim at. Duration is only a smell test — the
   requirements below are the real bar — but a solution under 20 seconds has never yet been
   anything but a corridor. Par is at least 2.5× the solution.

1. **Eight or more steps that depend on each other**, in **at least three distinct states of the
   map** — after step 3 the level is a different place from the one you started in, and again later.
   Not eight tasks: eight steps where doing one in a different order would be impossible or
   pointless.
2. **Two mechanisms whose interaction is the puzzle.** Two locks in series, one per element, is the
   shape most of this repo already has. What is wanted is one machine whose use changes what the
   other machine can do.
3. **An interlock.** At least one step that *costs* something: it shuts a way you came by, strands
   a player who then has to be freed from the other side, takes a weight off a switch that was
   holding something open, or spends a resource that has to be won back the long way. A level where
   every action only ever adds is not hard.
4. **A counter-intuitive step.** At least one of: something has to be switched off again; a machine
   is used for the opposite of what it looks like it is for; a player has to give up a position
   that feels safe; the obvious order is exactly wrong.
5. **One resource, several claims on it.** The single boulder, the single crate, the one ride, the
   one window — wanted in two places, so the plan has to decide which claim comes first.
6. **Two plausible wrong plans**, each failing for a reason you can state in one sentence, and each
   recoverable at a real cost in time. If you cannot name the traps, players will not feel there
   were any.
7. **The order is forced and not readable off the map.** A player should have to work out who goes
   first, not see it. A corridor whose barriers can only be cleared in one order does not count:
   that order is written on the wall.
8. **The whole thing is explainable in one sentence afterwards.** Difficulty from a tangle of small
   errands is not the same as difficulty from one idea that takes a while to see.

Things that make a level long rather than hard, and are not worth points: more barriers of the same
kind, more distance, more gems, more players doing the same errand in parallel.

## The motor parameter

The user chooses this per level. It is a design constraint, not a difficulty dial — a `motor: off`
level is still meant to be very hard to *think* about.

### motor: off

Nothing in the level may need accurate timing or accurate jumping.

- No gap wider than **2 tiles** from a standing start, and no jump whose landing is narrower than
  three tiles.
- Every mechanism that opens is **latched, held by an object, or open for 300+ ticks**. No window a
  player has to run.
- No input that must land inside a window shorter than about **30 ticks**.
- No chain of jumps where missing one costs anything.
- Nothing irreversible can happen because of a mistimed press.
- Moving platforms are fine as transport, as long as missing one only means waiting for it again.

### motor: on

Precision is allowed and wanted, within a tolerance a person can actually hit.

- Windows of **90 ticks (1.5 s) or more**. Below that it stops being a skill and becomes a retry
  loop.
- Landing targets **2 tiles or wider**; jumps with at least half a tile of margin at both ends.
- **Every attempt repeatable**: loops that come round again, a lift that returns, a checkpoint near
  the hard bit. Never a state where a missed input makes the level unwinnable.
- **At most two** separate moments that demand precision. One good one is usually better.
- The hard bit should be legible before it is attempted: a player should be able to see what they
  are about to have to do.

In both modes: **a mistake costs time, never the level.** Anything that can destroy a route for good
— melted ice on the critical path, an object dropped somewhere unreachable, a one-way drop into a
dead end — is a bug in the design, not a difficulty.

## Par

Set `parTicks` generously: roughly twice what the solution script takes, rounded up. The third star
is for understanding the level, not for executing it fast. A `motor: off` level with a tight par is
a contradiction.
