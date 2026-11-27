# Straddle

**Introduces:** a plate is pressed by anything that overlaps it, and its sensor stops 2 px short of
each edge of its tile, so one body standing on the join of two adjacent plates presses both. A door
that counts presses counts feet, not people: here a four-key door is held by two bodies, the stone
starts out as two of the keys, and a heavy plate beside a light one is two keys for Earth and one
for anybody else.

## The map

- **Home** (west, x1–13): the three of you start here. At its far west end is the **home plate**,
  heavy, wired to the exit. In the middle of the room is the **home pair** (x8|9), two light plates
  side by side, wired to door A.
- **Door A** (x14) wants **four** presses. Its plates are three pairs: the home pair, the **hall
  pair** (x19|20, heavy|light) in the middle hall, and the **crawl pair** (x24|25) inside a
  one-tile-high crawl on a pedestal.
- **The stone** starts lying across the crawl pair, so at the start A already has two of its four.
  In the crawl nobody can jump or pass, and the only way in is from the west, so the stone can only
  ever be pushed east. East of the crawl is a one-tile **slot** with a heavy plate at its bottom.
  The stone plugs the crawl: nobody reaches the east hall until it has gone into the slot.
- **Door F** (x33), the exit, **latches**. It wants the slot plate (the stone) and the home plate
  (heavy: Earth) at the same moment.

## The intended solution

1. **Fire stands on the join of the home pair.** Both plates light: two presses, plus the stone's
   two, and A opens.
2. **Water and Earth go through A** into the middle hall. Water waits there.
3. **Earth crawls in behind the stone and pushes it east** until it drops into the slot. The slot
   plate is pressed for good, and the crawl is open. But the stone has left the crawl pair: A is
   down to Fire's two presses and shuts. *This is the step that costs something.*
4. **Earth comes back out of the crawl and waits by A. Water climbs into the crawl and stands on
   the join of the crawl pair, where the stone was.** Fire's two and Water's two: A opens again.
5. **Earth walks all the way home to the heavy home plate** (the earth gem is there). The stone is
   in the slot, so the exit **latches open**.
6. **Earth walks back out through A** (still held by Fire and Water) and stands on the **join of the
   hall pair**. The heavy half reads Earth, the light half reads Earth: two presses.
7. **Fire steps off the home pair.** Earth's two and Water's two keep A open, and Fire walks out.
8. **Water leaves the crawl first** (nobody passes anybody in there), hops over the stone in its
   slot, and Fire and then Earth follow. All three walk through the open exit to their doors.

The recorded solution takes about 24 s; par is 100 s.

## Why each player is needed

- **Earth** is the only one who can push the stone, the only one heavy enough for the home plate,
  and the only one who is two keys on the hall pair. Those three jobs are in three different rooms.
- **Fire (or Water)** has to be at home, on the home pair, when the stone leaves the crawl pair.
  Otherwise nobody can ever let Earth back in to the home plate.
- **Water (or Fire)** has to replace the stone on the crawl pair. At the end, two bodies in the
  middle are needed to make four presses for whoever is last out of home, and only Earth counts
  twice on the hall pair, so the other one has to be on the crawl pair.

With any two players the last one out of home is stuck. `check` confirms that the level cannot be
finished while any one player stays in its door.

## The insight

Six plates, four keys, three people, and every one of you needed somewhere else: the door looks
impossible until somebody stands on the line between two plates and both of them light. After that
it is a counting puzzle with a cost in it. The stone is worth two keys where it lies, and the exit
needs it in the slot, so you have to give up the door's free half to get the exit, and pay that
half back with seams. And because the heavy half of the hall pair ignores Fire and Water, *who* is
the last one out of home is not a free choice: never Earth.

Two orders look right and are wrong:

- **Earth stands on the home plate first.** It is right next to where Earth starts and it is
  plainly the exit's key. But the exit latches only while the stone is in the slot too, and the
  stone needs Earth. Earth has to leave home, spend the stone, and come *back*.
- **Everybody goes through A while the stone holds it.** It feels like progress, but once the stone
  is spent, A can only be opened from the middle hall by two people on seams, so Earth can go home
  only if somebody is already at home to let it back out.

## Likely failures and how players recover

- **Nobody finds the seam.** Each body only lights one plate; four keys need four bodies. The hints
  say it in two steps ("even half a body", then "the line between two plates").
- **The stone is spent with nobody at home.** All three are in the middle; A shuts. Earth stands on
  the hall pair (two), somebody on the crawl pair (two), and the third walks home. That costs one
  walk.
- **Earth is the last one out of home.** Fire or Water on the hall pair is only one key (the heavy
  half ignores them), so the middle makes three presses and A stays shut. Recovery: the one on the
  crawl pair stays, the other walks back in while Earth holds the home pair, and they swap. That is
  a shortcut script below, and it fails.
- **Water stands on the crawl pair before Earth is out of the crawl.** Earth is then stuck behind
  Water in a corridor where nobody passes; Water steps back out to let Earth through.
- **A body is half a plate off.** The plates light up, so a player can see whether they have one or
  both.

Nothing can be lost for good. The stone only goes east and only into its slot. It is impossible
for all three to be shut in at home once the stone is spent, because the last one in would have
needed the other two in the middle. From two at home and one in the middle, or one at home and two
in the middle, there is always a way out (worked through above).

## Shortcuts that were closed

- **Holding A with your body and walking through it**: impossible, a body on a plate is not in the
  door.
- **Jumping A or F from a partner's head**: both doors reach the roof. Script: *Water vaults door A
  from Fire's head*. It fails with Water standing on Fire's head against the door.
- **Pushing the stone back west, or getting past it to the slot plate**: the crawl is one tile
  high, so nobody jumps or passes in it, and its only entrance is west of the stone.
- **Standing on the slot plate instead of the stone**: the slot is behind the stone until the stone
  is in it.
- **Earth last out of home**: script *Earth is the last one out of home*. After the exit has
  latched, Earth takes over the home pair from Fire, Fire goes out to the hall pair, and Earth is
  left at x=13.6 against a shut A (crawl pair two, hall pair one) with the exit already open.
- **Two players**: the checker's idle-player test.
- **Motor**: nothing in the level is timed. The doors are held by bodies, the exit latches, the
  only jumps are a one-tile step onto the pedestal and a hop over the stone in its slot (it rests
  2 px below the floor on either side).

## Kinship with the campaign

The nearest campaign level is **Totem**, where each gate opens for a tower of all three players in
the right order. There, three bodies stacked are still three keys. Here two bodies side by side are
four. Among this repo's levels, **Cistern** and **Weight of Two** also hold quorum plates. Cistern
uses objects instead of players, and Weight of Two shows a heavy plate taking the heaviest single
body. Neither has one body counting for two plates, which is the whole of this level. **Draught**
shares the counterweight that must be removed, but there the weight powers a climb; here it is two
keys of the door you came in by.

## What I tried to invent first

This is the invented tier: `seam-is-two-keys` is new to the vocabulary. Before it I looked at a
boulder in a trough of plates as a five-position selector. Every wall at the end of an object's
track is a trap, because nobody can get behind it to push it back. I also considered a crate making
a second phase, but the same trap appeared at the far end of its track. The crawl keeps the stone
moving one way, and the slot is the only place it can end up.
