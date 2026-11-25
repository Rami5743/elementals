# Strip and Reload

**Introduces:** A low shutter strips a stone from an overhead moving shuttle but does not stop the shuttle itself. A reversible lower belt and a loading stop recover the stripped cargo. The same far destination has two different height contacts, and intentionally unloading the cargo is as important as delivering it.

## The intended solution

1. Water reverses the lower belt toward the closed loading stop. The stone parks on the stationary shuttle at its left loading berth.
2. Fire starts the shuttle. It rises and travels right. The closed upper shutter blocks the cargo but not its platform; the stone drops to the lower belt and travels to the lower-right contact.
3. That contact latches Water's first gate. Water opens the stripper, then reverses the belt left to bring the stone home. Fire returns the empty shuttle to its loading berth.
4. Water reverses the belt to load the stone again. Fire starts the shuttle and this time the cargo passes the open stripper to reach the upper-right contact.
5. Fire's first gate latches. Its relay lets Water obtain the next permission. Water then returns to close the stripper deliberately.
6. Fire returns the shuttle. The closed stripper removes the stone on the return trip, which activates the lower-right contact again. Fire crosses the middle gate and sets its next relay.
7. Water reverses the belt to send the stone to the left contact. That contact and Fire's relay latch Water's last gate. Water obtains the last relay, opens the stripper and returns to the loading control.
8. Load once more, deliver the stone to the upper-right contact, and cross Fire's last gate. Both collect their gems and enter their exits.

## Why both players are needed

Fire controls the shuttle and the relays in its own gallery. Water controls the stripper, lower belt and loading stop, and the return permissions. The heavy cargo is sealed away; neither player can stand on its contacts. Both idle-at-exit checks fail.

## The insight

The shutter is not a gate for the moving platform; it is a gate for its load. It must sometimes stay closed precisely to deliver the stone to the lower contact, and the resulting empty shuttle is not sufficient for subsequent upper delivery. The lower belt and stop are a physical reloading mechanism.

## Likely failures and recovery

Leaving the stripper open delivers cargo high, rather than to the lower contact. Close it and return the shuttle to strip the load. An empty shuttle cannot activate the upper contact; return it home, reverse the belt left until the stone reaches the left contact, and reverse right to park it at the loading stop. The normal solution itself verifies stripping, reloading, intact delivery, stripping on return, and reloading again. All passage gates latch; the machinery can be reset repeatedly. No timed crossing, lethal terrain or precision jump is required. Arbitrary continuous-physics states have not been exhaustively searched.

## Shortcuts that were closed

Direct walking, returning the empty shuttle without reloading, and keeping the stripper open on the return trip fail in the actual engine. The two latter attempts fail to obtain the required contacts. Rock separates the galleries and isolates the cargo; vertical gates reach their ceilings.

## Kinship with earlier levels

Dumbwaiter and Grate Register leave cargo behind by lowering a platform through one-way terrain. Here the platform passes horizontally under an obstruction, the load falls onto a different transport mechanism, and the loading berth restores it. This is a different physical handoff, not a second grating or piston memory.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 36.05 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 104.78 s; par: 262 s. All kit simulation checks passed without warnings.

