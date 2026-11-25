# Half-Unit Escrow

Batch-90: 82/90

**Introduces:** A half-unit rider holds a ballasted pulley in its high-contact state after a full-unit rider leaves; the full-unit rider must ignite high, low and high-again certificates, in that order.

## The intended solution
1. Air boards the first pan; with the ballast, it exactly balances the opposing stone divided by the snatch block.
2. Fire adds a full unit, sending the stone up to the high contact.
3. Fire steps off and reaches the first torch. Air alone keeps the rope stationary and the permission active. Lighting the torch preserves access to the first chamber.
4. Air unloads entirely, which is the only way to return the stone to its low contact. The first torch and this contact release the west chamber.
5. Fire crosses the recall shaft with the lift at floor level, enters the western chamber and lights the second torch. Air cannot light it.
6. Air recalls to the upper gallery first and boards the pan; Fire uses the next recall trip from the western bank and joins Air.
7. The restored high contact and second torch admit Fire to the final eastern chamber. Fire operates the final lever.
8. Air gives up the high state again. The low contact plus the final lever unlock both exits; Air recalls to the upper west exit, Fire uses the lower east exit.

## Why each player is needed
Fire alone ignites the two torches and adds the full unit that moves the pan. Air's half unit is exactly what maintains the raised cargo while Fire leaves. Without that balancing rider Fire cannot reach the first torch. Two idle-at-exit checks fail.

## The insight
The rope has three useful states: moving with both riders, stationary with Air alone, and reversing with neither. The two torches require the high state and the low state in succession. The same machine must be restored a second time, not simply left in a working state.

## Likely failures and how players recover
Unloading after Fire enters the first chamber closes its entrance; Fire can light the torch from inside to reopen it. A recovery replay deliberately tested the closure before ignition. Unloading too early leaves the first gate closed; both players can use the independent recall lift and board the pan again. The low gallery has a safe floor, including beneath the recall shaft. Wait for the lift to be flush before crossing; a missed lift can be caught on its next cycle. No timed switch or narrow landing is required; all permissions are stable until deliberately changed.

## Shortcuts that were closed
Fire without the balancing rider cannot enter the first chamber. Leaving Air on the pan indefinitely keeps the western chamber closed. Refusing to unload after the second high state keeps both exits closed. Three corresponding scripts fail; both players are required.

## Kinship with the campaign
Counterpoise uses a heavy group to raise cargo; Ballast retains the load while a jumper is airborne. Here a stationary half-weight keeper balances the loaded rope while the full-weight operator walks away to light a torch, and the opposite low state is then required for a separate Fire-only ignition. Half-Weight Keeper uses this balance at four players with separate inspectors; here the same Fire player must personally alternate both high and low workshops and the recall lift is also the crossing between them. No prior two-player level uses the fractional-rider-keeper idea.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 36.66 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 50.03 s; par: 126 s. All kit simulation checks passed without warnings.
Recovery replay: deliberately unloaded the keeper after entering the first chamber, waited for the door to close, then lit the first torch and finished in 50.03 s.
