# Thaw — notes

**Brings together:** two pools fed by one pad, one of them inverted, so they are never ice at
the same time — and an errand at the far end that has to be run and then *undone*, because the
way out is back where you started.

## The intended solution

Left to right: the exit gate at 8 with both exits behind it, the starting hall, pool A (14–21),
the island with the pad at 23, pool B (26–33), and the far hall with the torch at 36.

The pad is Water's alone. Standing on it freezes A; stepping off it freezes B (B is inverted,
and refreezes the instant the pad is released). A keeps its ice for 240 ticks after the pad is
left; B loses its ice 60 ticks after the pad is pressed.

The gate needs two things at once: the plate at 29 — out on pool B — and the torch at 36. It
**latches**, so it only has to be true once.

1. Water crosses A (its own water, it does not need ice) and stands on the pad. A freezes.
2. Fire crosses A to the island.
3. Water steps off onto the neutral gem at 24. B freezes.
4. Fire crosses B to the far hall, lights the torch and takes the fire gem — there will be no
   second trip out here. Water walks out onto the ice of B and stands on the plate at 29.
5. Torch and plate together: the gate latches open, four screens away.
6. Fire comes back over B while it is still ice. Only then does Water go back to the pad, which
   freezes A again and thaws B behind Fire.
7. Fire crosses A home; Water follows over the ice, and both go out through the gate.

## Roles

- **Water** — the pad answers to nobody else, so every change of state is Water's, and Water
  is the only one who can wait out on pool B holding the plate.
- **Fire** — the only one who can light the torch, and the only one for whom ice is the
  difference between a floor and a death.

## Why each is necessary

Without Water no pool is ever ice and Fire never leaves the starting hall. Without Fire the
torch is never lit and the gate never latches, however long Water stands on the plate.

## The insight

One pad, two pools, and they are opposites: every step Water takes opens one road and closes
the other. So the far end is not a destination but an errand — the gate has to be made to latch
while you are out there, because the way home is the way you came.

## Likely failures and recovery

- **Going back to the pad while Fire is still in the far hall.** B thaws and Fire is cut off.
  Step off the pad again and it refreezes: nothing is lost.
- **Coming home before the torch is lit.** The gate never latched, so the whole trip has to be
  made again. The sign at 10 says where the way out is, before anyone sets off.
- **Leaving the fire gem.** It is in the far hall, and the far hall is visited once.
- **Waiting on the island for the ice to come back.** It will not: A is ice only while the pad
  is pressed, and the pad is four tiles away across the island.
