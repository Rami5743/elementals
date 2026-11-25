# Crawlspace

**Introduces:** a ground pound needs room to get airborne, so a cracked panel in a corridor one
tile high cannot be broken at all — the roof has to be taken away first, and the roof is the
bridge the rest of the party is standing on.

## The intended solution

The gallery is one long floor three tiles high. Six tiles of it, in the middle, are a sliding
slab, held shut by the weight of a boulder on a heavy pad at the left end. Under the slab is a
crawl one tile high, reached by dropping through the wooden ledge at its left mouth; the crawl's
floor has the cracked panel, and under that is the lower hall where all four doors are.

1. Earth drops through the ledge into the crawl, takes its gem there, and finds the panel. With the
   slab shut the crawl is one tile high: Earth cannot jump, so Earth cannot pound. Nothing Earth
   does in there will break that floor.
2. Earth climbs back out. Fire, Water and Air walk right across the slab to the far end of the
   gallery — the only crossing there is.
3. Fire lights the torch at the far end. It stays lit for good: that is the first of the lower
   gate's two keys.
4. Air touches the turbine. Both keys are on at once, so the gate in the lower hall latches open
   for good. (Touching the turbine before the torch is lit does nothing — the gate wants both at
   the same moment.)
5. Air jumps for the gem in the gallery roof, which is three tiles up and so Air's alone.
6. Earth walks back down the gallery to the boulder and pushes it **left**, off the heavy pad —
   and then has to step off the pad itself, because Earth is heavy too. The slab slides away. The gallery is now cut in two by a six-tile hole: Fire and Water cannot cross
   it any more, and the only way off the far end is to drop in.
7. Everyone drops into the crawl. It is two tiles high now, so Earth can get airborne: Earth
   pounds the panel and falls through into the lower hall, landing on the pedestal under the hole.
8. The rest follow down. Water takes its gem on the way, everyone files through the latched gate.
9. Water stands on the freeze pad and the pool turns to ice. Fire, Earth and Air cross to their
   doors; Water steps off and follows, well inside the fifteen seconds the ice lasts.

## Why each player is needed

- **Earth** is the only one who can push the boulder off the pad, and the only one who can break
  the cracked panel. Both, and they cannot be done at the same time — which is the level.
- **Fire** is the only one who can light the torch, and the torch is one of the two keys the lower
  gate wants together.
- **Air** is the only one the turbine answers to, and the only one who can reach the roof gem. Air
  is also the only one who can re-cross the six-tile hole once the slab has gone, which is how the
  party recovers from doing things in the wrong order.
- **Water** is the only one who can freeze the pool, and the pool is the last stretch of floor
  between the gate and the four doors.

## The insight

A ground pound is a jump first. In a corridor one tile high nobody jumps at all, so Earth standing
on a cracked floor with its head against the rock is as helpless as anybody else. The floor cannot
be broken until the ceiling is gone — and the ceiling of the crawl is the floor of the gallery. The
party has to pull their own road out from under themselves, and they only get one chance to be on
the right side of it when they do, because the far end of the gallery can be entered over the slab
and left only by falling.

The second turn is that the weight holding the slab shut is a boulder, and the boulder is sitting
on the heavy pad already. Nothing has to be fetched. What has to be done is the opposite: a weight
that is doing its job has to be taken off, and the obvious instinct — put Earth on the pad so
everyone can cross in comfort — is exactly the plan that makes the level unsolvable while it lasts,
because Earth is the only one who can break the panel and Earth cannot be on the pad and in the
crawl at once.

## Likely failures and how players recover

- **Earth stands on the pad to hold the bridge.** The slab stays shut, everyone crosses happily,
  and then there is nobody to pound the panel. Earth steps off and the party is back where it was;
  it costs the walk.
- **The boulder comes off the pad before Fire has lit the torch.** The gallery is severed and Fire
  cannot get back to the far end. Recovery: Earth stands on the pad to close the slab again, Fire
  crosses and lights the torch, Air touches the turbine, everybody comes back, Earth steps off.
  Nothing is lost but time — and Air can cross the hole at any time regardless.
- **Air touches the turbine before the torch is lit.** The gate does not latch. Air can jump the
  six-tile hole and come back for a second touch.
- **Somebody walks onto the pool before Water is on the pad.** They drown; the checkpoint by the
  gate puts them back in the lower hall.
- **Somebody drops into the lower hall early.** The pedestal under the panel hole is exactly two
  tiles below it, so anyone can climb back up into the crawl and out through the wooden ledge. No
  descent in this level is final.

## Shortcuts that were closed

- **Earth pounds the panel with the slab shut.** Measured, not asserted: with one tile of headroom
  Earth cannot leave the ground, so there is never an airborne Down press and the panel never
  breaks. Scripted as `Earth pounds under the closed slab`.
- **Earth holds the pad and somebody else breaks the floor.** Only Earth breaks cracked floors, and
  only Earth moves a boulder. Scripted as `Earth holds the pad for the others`.
- **Fire jumps the six-tile hole once the slab has gone.** Fire's widest gap is three tiles.
  Scripted as `Fire jumps the slab hole`.
- **Standing on the heavy pad instead of the boulder** is not a cheat here but a recovery, and it
  is a dead end on purpose: whoever stands there cannot also be in the crawl.
- **Holding the lower gate open with a body** cannot arise: the gate latches, so it never closes on
  anybody.
- **Riding the slab down** is allowed and harmless — the crawl is two tiles high by the time the
  slab has gone, and the mouth at its left end lets anybody climb back out.

## Kinship with the campaign

The nearest campaign level is **Grand Works** (`l43_grand_works`), which also asks the party to
build and then dismantle a route, and **Eclipse** (`l31_eclipse`), which hides a vault under a
floor Earth has to break. Both of those break the floor the moment Earth arrives at it. Here the
floor refuses, and refuses for a reason nothing in the campaign turns on: the roof is too low for a
pound. The repo's own `headroom` level is about a low roof scraping a carried boulder off a head;
this one is about a low roof forbidding the jump that a pound is made of.
