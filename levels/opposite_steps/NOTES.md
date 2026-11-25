# Opposite Steps

Batch-90: 49/90

**Introduces:** A shared conveyor selector moves two portable steps in opposite directions. Both climbers must finish their bank tasks before the shared configuration can be changed productively.

## Intended solution
1. Water unlocks the first banks in both galleries.
2. Fire uses the crate to climb east; Earth uses its crate to climb west.
3. Both issue initial certificates, unlocking Water's shared selector.
4. Water reverses both conveyors. The climbers drop into their trenches and follow the crates to the opposite banks.
5. Both climb out and issue the first reciprocal certificates.
6. Water obtains the paired authorization and reverses both belts again. Both climbers earn the second initial-side certificates.
7. Water unlocks and selects the second opposite-bank workshops. Both climbers collect their gems and issue the joint certificate.
8. Water obtains the last authorization, returns to the selector and restores both initial banks. Both climbers reach their final workshops; the joint final certificate releases Water.

## Why each player is needed
Fire and Earth each have their own physically separate trench and certificate chain. Water controls both belts and must authorize each successive workshop. No certificate pair can be supplied by one climber.

## The insight
A box is an extra step, not an electrical switch. One shared control changes the accessible geometry of both galleries, and these changes run in opposite directions. Complete both jobs before selecting the other configuration.

## Likely failures and recovery
A wrong selection can always be reversed: the crates are retained by the trench walls. Jumping straight from the bare trench fails; move the crate to that bank. If a climber misses a hop, the trench is safe and they can retry. A partial reversal followed by restoration was simulated successfully. No timed input or precise landing is required.

## Shortcuts
Retaining the wrong orientation or attempting the bare-bank jump without moving the crate fails in simulation. The wide trenches and full-height workshop doors prevent direct bank-to-bank or over-door travel.

## Kinship
Travelling Step uses a single movable step at two players. Here two opposing steps are coupled by the same selector, and paired certificates lock the authorization chain. Unlike Ratio Tribunal, which weighs two rope platforms against each other, the defining constraint here is movable jump geometry; no pulley or weighing mechanism is present. Crate-step is new at three players.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 15.91 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 49.33 s; par: 124 s. All kit simulation checks passed without warnings.
Interrupted orientation change and restoration verified.
