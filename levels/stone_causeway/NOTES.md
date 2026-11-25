# Stone Causeway

Batch-90: 67/90

**Introduces:** a boulder floated into a single-tile sludge channel is simultaneously the persistent floor of a three-crossing route and the electrical input that vetoes a different player's passage. Establishing the physical route therefore costs an electrical permission.

## The intended solution
1. Water authorizes Fire's control station.
2. Fire enables Earth's approach to the boulder.
3. Earth pushes the stone into the sludge channel. It becomes walkable floor and energizes the heavy contact.
4. Fire enters the eastern workshop and records the first certificate.
5. Earth crosses the stone and enters its eastern workshop, completing the two-input authorization of Water's central gate.
6. Fire withdraws the original permit, reopening the inverted gate so Water can obtain the western certificate. Earth's initial approach closes.
7. Fire restores the permit so Earth can return across the stone and obtain the western certificate; the last two workshops are now accessible.
8. Earth crosses the stone a third time, moving clear of the approach gate. Fire withdraws the permit again, allowing Water to reach its eastern certificate.
9. Fire and Water record the final eastern certificates, which combine with Earth's west certificate to authorize Earth's exit.
10. Earth sets the final release; Water returns west and both remaining players exit.

## Why each player is needed
Earth pushes the stone, which is blocked from further horizontal movement by the raised banks; neither light player can move it. Fire controls the approach and inverted veto and has two independent certificates. Water must authorize the first control station and obtain both western and eastern certificates.

## The insight
Creating the bridge turns off the other route. The same stone is both physical support and the persistent heavy signal. Instead of trying to remove it, withdraw the original permit, restore it for the runner's return, then withdraw it a second time.

## Likely failures and how players recover
Withdrawing the permit before Earth pushes the stone closes the approach. Fire can always re-enable it; the recovery simulation explicitly closes it, waits and restores it. Leaving the permit on blocks Water indefinitely, but the Fire station remains reachable. The stone fits between the raised banks and remains in the channel. The approach's one-tile roof prevents jumping over the unplaced boulder; once the stone floats the only bank mismatch is two pixels and an ordinary jump input while walking clears the lip. The route requires no timed switch or precise landing. The gates at the certificate chambers latch and all other gates can be reopened by Fire. The sludge is covered by the stone before the first crossing.

## Shortcuts that were closed
Retaining the original permit, omitting the western certificate, and leaving the boulder on the bank were scripted and do not complete.

## Kinship with the campaign
Ferry (campaign) uses a boulder to carry one player through a tunnel. Here the stone is an immovable, reusable causeway and simultaneously a persistent switch that makes a different route unavailable. This player count has not previously used a floating boulder as a bridge. Queue Dispatcher is about changing a single-file order of players; there is no queue exchange here, nor is there any floating floor in that level. The initially proposed generic permit-related core label triggered a lexical similarity review, so the final label identifies the actual physical floor/contact duality.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 12.93 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 44.37 s; par: 111 s. All kit simulation checks passed without warnings.
Recovery simulation explicitly verified premature permit withdrawal and restoration, then won.
