# Cargo (`cargo`) — Fire + Water + Earth + Air

## The intended solution

The right half of the map is a belt running at 5 px a tick. Nobody runs faster
than 3.4, so on the belt you are cargo: you go where it goes, and the roof over
it is one tile high, so you cannot even jump while you are under it. The belt's
default direction is **left**, back into the loading chamber. It only runs
**right**, toward the three alcoves, while Air stands on the turbine.

1. **Earth** shoves the boulder one tile right, onto the heavy plate. The plate
   is latched, so the three hatches in the belt's roof stay open from then on.
2. **Fire** melts the ice that shuts the loading corridor.
3. **Water** puts out the flames behind the ice, then steps back out of the
   corridor.
4. **Air** walks onto the turbine. The belt reverses and now runs right.
5. Fire, then Water, then Earth walk onto the belt one at a time and are carried
   right. Each jumps as it passes under its own hatch, holding right, and comes
   down on the alcove floor just past the opening. Their gems sit on the belt on
   the way.
6. Air leaves the turbine last — the belt goes back to running left, which no
   longer matters — walks to the shaft above its own corner of the chamber and
   jumps. Only Air's 120 px jump reaches that shaft; it takes its gem on the way
   up and steps right into its door.

## Why each player is needed

- **Earth** is the only one who can move the boulder, and the plate is heavy, so
  no one else can hold it. Without it the hatches never open and the belt is just
  a corridor with a roof.
- **Fire** melts the ice; **Water** puts out the flames. Both barriers are three
  tiles tall under a rock ceiling, so neither can be jumped.
- **Air** is the drive. The belt only runs toward the alcoves while Air is on the
  turbine, and all three hatches are to the right of the boarding point, so a
  belt running left never reaches any of them. Air's own shaft is four tiles up,
  past everyone else's jump.

## The insight

The belt is not a floor you walk on, it is a vehicle you ride — and the one who
decides where it takes you is standing still at the other end of the level. The
second half of the insight is that you cannot jump off wherever you like: the
roof is one tile high everywhere except at the three hatches, so the only
question that matters is *when* you jump.

## Likely failures and how to recover

- **Jumping too early or too late.** You stay on the belt and are carried to the
  far end, where it holds you against the wall. Air steps off the turbine, the
  belt runs left, and it brings you back to the chamber for another go. Nothing
  is lost but time.
- **Pressing jump while still under the roof.** Nothing happens — the jump is
  blocked. Wait until you are under the opening.
- **Jumping straight up.** You come back down through the same hatch. Hold the
  direction you are travelling so you drift onto the alcove floor.
- **Earth pushing the boulder too far.** The plate is two tiles wide, and the
  boulder has nowhere else to go but into the corridor, where everyone hops over
  it.

## Shortcuts that were closed

- The ice and the flames are both three tiles tall with rock above them, so
  neither can be jumped from the chamber floor.
- The hatches are doors, not holes: with the boulder off the plate they are shut,
  and the latch means the plate only has to be pressed once.
- The plate is heavy, so no player except Earth can hold it — and Earth standing
  on it would be standing in the chamber, not in its own door.
- The alcoves have no floor connecting them to anything. The only way in is up
  through a hatch, and the only way out is back down onto the belt.
- Air's shaft is one tile wide and four tiles above the chamber floor. Nobody can
  be stacked under it, because the tile under it is the one you have to jump from.

## Kinship with the campaign

The campaign's belts (Furnace Line, Sorting Yard, Last Shift, Express) all use a
belt to move a *load* past the players. Here the players are the load, and the
belt's direction is a fifth player's job.
