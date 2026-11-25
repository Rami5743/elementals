# Queue Dispatcher

Batch-90: 41/90

**Introduces:** The single-file throat needs both a traveler holding a plate and a third player's dispatch permission. The dispatcher cannot certify the first exchange without withdrawing that permission.

## The intended solution
1. Water enables the throat. Fire lets Air lead and holds the west plate.
2. Air crosses, powers the weak return fan and uses the upper gallery to certify the first trip.
3. Air descends behind Fire; Water switches the route off, enters the inspection alcove and certifies the exchange.
4. Water restores the permission. Fire moves ahead while Air holds the west plate, then crosses and records F1.
5. Fire holds the east plate; Air crosses again and records A2 in the upper east workshop.
6. Air returns to the west plate while Fire crosses back.
7. The returning Fire cannot overtake Air. Air withdraws into the west yard, letting Fire reach F2.
8. Air takes the lead a third time; Fire holds the plate.
9. Air crosses and records A3 in the upper final gallery, then reaches its exit.
10. Water withdraws permission and reaches its own exit; Fire returns home.

## Why each player is needed
Air uses the return fan, which cannot lift the other two. Fire replaces Air on the throat and works the lower workshops. Water owns the isolated dispatch control; its inspection certificate requires closing the route.

## The insight
The plate holder must get out of the returning traveler's way. In addition to exchanging their physical order, the travelers need a dispatcher whose inspection temporarily removes their ability to use the throat.

## Likely failures and recovery
Sending Fire first leaves the first inspection locked: retreat and exchange the lead. Staying upstairs leaves the lower throat without a holder: return via the west shaft. Keeping the permit on blocks Water's inspection. Water can switch the permit on and off repeatedly; the early withdrawal and restart were simulated. No timed crossing is needed. The fan has a reachable selector; all shafts have solid landings.

## Shortcuts that were closed
Direct travel, Air staying upstairs, Fire leading first, and Water retaining permission are tested. The one-tile throat rules out jumping and passing, and the dispatcher gallery has no connection to either traveler gallery.

## Kinship with the campaign
Queue Reversal uses a two-player return path. This three-player variant makes route authorization a second, revocable resource and places the inspector in a separate gallery. No-overtaking and send-one-through are both new at three players.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 7.36 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 50.65 s; par: 127 s. All kit simulation checks passed without warnings.
Dispatcher early withdrawal and restart verified.
