# Descent Exchange

Batch-90: 42/90

**Introduces:** A near-neutral updraft turns one player's descent into a temporary electrical contact. Water must reverse the draught setting between two crossings and finally withdraw it.

## The intended solution
1. Earth waits at the first receiving gate; Water powers the draught.
2. Fire enters the shaft, slowly falls past the suspended contact strip and opens Earth's gate.
3. Earth certifies the first delivery and returns to the authorization switch.
4. Fire lands, enabling Water's return-lift and inspection controls.
5. Water turns off the draught, records the inspection and raises Fire back to the upper landing.
6. Water resets the lift, turns the draught on, and reaches the second receiving gate.
7. Fire repeats the slow descent; Water crosses and records Wcert.
8. Water turns the draught off again to reach its own exit. Fire and Earth use the recorded permissions to go home.

## Why each player is needed
Fire physically produces the timed contact. Earth must receive and record the first pulse, then enable the second receiver. Water controls the wind and repeatable lift, receives the second pulse, and records the final certificate.

## The insight
The fan is not a lift: it is tuned to slow a fall, and the falling body is the temporary contact. The same machine must be switched off to permit the inspection before the second pulse and again before the final exit.

## Motor challenge and recovery
The contact is a seven-tile vertical strip, providing a generous crossing window. A 90-tick delayed crossing on both deliveries passed the simulation. A recovery script deliberately misses both receiving windows, sends Fire back to the launch level, and repeats the descent, finishing successfully. The operator can always reach the return-lift switch after the first landing. The shaft has a solid bottom and no hazards.

## Shortcuts that were closed
Direct travel, retaining the first wind setting, and missing either pulse without a retry were tested and fail. The receiving galleries are isolated by solid rock, and the gates reach the ceilings. No other player can touch the suspended contacts.

## Kinship with the campaign
Slow Fall uses the descent of one player to generate a timed contact. Here a second recipient is also the wind operator; the intermediate inspection requires the opposite wind state, and both deliveries share a repeatable return lift. Falling Dispatch uses a separate fourth operator. Sink-as-a-timer is new for three players.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 8.82 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 41.80 s; par: 105 s. All kit simulation checks passed without warnings.
Both 90-tick delayed crossings and deliberately missed and retried first and second pulses completed in the engine.
