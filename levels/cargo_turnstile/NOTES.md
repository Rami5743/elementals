# Cargo Turnstile

Batch-90: 39/90

**Introduces:** A timed two-chamber cargo lock controlled from an isolated gallery. Heavy contacts grant the operator access to successive controls, and a permanent cargo contact must replace the carrier at the end.

## The intended solution
1. Earth moves the boulder onto the initial heavy contact, allowing Water to reach the timer.
2. Water triggers the pulse; Earth loads the first chamber.
3. The pulse expires: the inlet closes and the outlet opens.
4. Earth moves the load onto the middle contact, releasing Water's selector.
5. Water arms the selector and returns to the timer; Earth waits at the second inlet.
6. Water triggers the same timer again; Earth stocks the second chamber before it seals.
7. After expiry, Earth parks the boulder on the last heavy contact.
8. Water revokes the selector (which otherwise blocks the certificate), crosses the now authorized last gate, and records the certificate.
9. Earth jumps over the parked stone, which keeps the distant final gate open, and both return to their exits.

## Why each player is needed
Only Earth can push this boulder; Water is isolated in the controller gallery. Earth cannot hold the final contact while reaching the distant exit. Water cannot obtain the certificate without the heavy contact.

## The insight
The timer does not open a through-route: it admits stock and closes the outlet. Expiry is the useful event. The middle heavy contact gives access to the second cycle's selector. Its authorization must later be revoked, not accumulated.

## Motor challenge and recovery
Two 360-tick windows, each remotely repeatable. The carrier must get the cargo into the chamber before closure. A script delaying entry by 90 ticks on both cycles completed successfully. Another intentionally missed both pulses and successfully retriggered them. The controller remains reachable. Arbitrary intermediate cargo positions have not been exhaustively enumerated.

## Shortcuts that were closed
The direct route, trying one pulse only, and leaving the selector on were tested in the original engine. The gallery is physically separate; all doors reach the ceiling. The final heavy contact is distant from the final gate. The body substitution script also fails.

## Kinship with the campaign
Windlass uses a single timed airlock. Lock Train (three players) uses a two-chamber clock but a separate traveler grants the relay. Here the two-player adaptation replaces the third traveler's relays with heavy contacts operated by the cargo handler. The timed shared-gate and permanent-switch combination is new at this player count. The idea was selected after considering a falling contact, which overlaps prior two-player levels.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 6.09 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 42.50 s; par: 107 s. All kit simulation checks passed without warnings.
90-tick delayed-entry and missed-pulse recovery scripts completed for both chambers in the original simulation.
