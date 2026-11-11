# Windlass — notes

**Brings together:** an airlock whose two gates are never open together, a turbine you can
only reach from the wrong side of it, and a boulder that has to be inside the lock with you
*and* is the only thing that will hold the last gate open for two.

## The intended solution

The map is three rooms. Left room (1–9): Earth, the boulder, the turbine at (3,16), the air
gem at (8,16). The lock (11–23), entered through `g1` at 10 and left through `g2` at 24.
Right room (25–32): a light plate at 28–29 wired to `g3` at 33, and both exits beyond it.

`spinner` drives both gates, `g2` inverted: while the turbine spins, `g1` is open and `g2` is
shut; when it runs down (360 ticks) they swap, for good — the turbine cannot be touched from
inside the lock.

1. Air leaps left over the boulder, hops the turbine. `g1` opens, `g2` slams.
2. Air leaps back, takes the air gem at (8,16) — **the last moment it is reachable** — and
   runs into the lock, jumping the two mud strips (mud kills Air; Earth wades it).
3. Earth pushes the boulder from 4 through `g1` into the lock, and follows it in, taking the
   earth gem in the first mud strip. Everything that has to end up past the lock must be
   inside it before the 360 ticks are out.
4. The turbine runs down. `g1` drops, `g2` rises. Nobody and nothing can be fetched now.
5. Air clears the plate corridor; Earth pushes the boulder onto the plate at 28. `g3` opens
   and stays open because the boulder stays on it.
6. Air walks out; Earth jumps over the boulder (it must not be pushed off the plate) and out.

## Roles

- **Air** — the only one who can spin the turbine, the only one who can take the air gem on
  its ledge, and the only one the mud will kill. It opens the window and must spend it on
  itself.
- **Earth** — the only one who can push the boulder, and the only one who can walk the mud.
  It spends the same window on the boulder.

## Why each is necessary

Earth cannot spin a turbine, so without Air no gate ever moves. Air cannot push the boulder,
so without Earth the plate at 28 is never held and `g3` never stays open. Neither can hold
the plate for the other: the plate is 5 tiles from `g3`, which shuts in 24 ticks, and nobody
crosses 5 tiles in 24 ticks.

## The insight

The turbine is a one-way door in time, not in space. Everything you will ever need on the far
side — the gem, the boulder, your partner — has to be inside the lock before it runs down,
and the thing you push in is the thing that lets you both out at the end.

## Likely failures and recovery

- **Air spins and runs in alone.** Earth and the boulder are locked out; `g1` never reopens.
  Restart. The sign at (1,13) and the pairing of the two gates are the warning.
- **Earth pushes the boulder in and stays outside** to "guard" the turbine. Same dead end.
- **Going back for the air gem.** Once `g1` drops, the ledge at (8,16) is gone: a two-star
  finish. This is the gem decision the level is built around.
- **Pushing the boulder past the plate.** Earth jumps *over* it at the end rather than
  walking through it; overshooting costs `g3` and strands both.
- **Air walking the mud.** Both strips are jumps with a full run-up; the lock is long enough
  to line one up without precision.
