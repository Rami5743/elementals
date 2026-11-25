# Falling Dispatch

Batch-90: 36/90

## Introduces
A weak draught turns a descending player into a prolonged, temporary contact across a column of suspended plates. Two separate recipients must use successive descents of the same sender, and the second phase requires the fan to be turned off and restored.

## Intended solution
1. Earth waits at the first pulse gate and Air enables the shaft.
2. Fire walks off the top bank and slowly falls past the contact column.
3. Earth crosses during the pulse, records E1 to keep its return route open, and goes back to record Eback.
4. Fire lands, records F1 and boards the return lift. Water can now access the lift, even if Earth has missed the pulse.
5. Water raises Fire to the top and lowers the lift again.
6. Air disables the shaft, crosses the inverse gate and issues A2, then returns to restore the shaft.
7. Water records Wmode; with Eback and A2 this opens the second approach.
8. Fire falls a second time; Water crosses the second live pulse gate and records Wcert.
9. Fire lands; Air withdraws the fan authorization and crosses the final inverse gate to record Ahome.
10. All four exits are now reachable.

## Roles and insight
Fire supplies both temporary contacts. Earth must cross and return before the second approach is authorized. Water owns the return lift and the second recipient gate. Air must give up the draught to certify the second phase, then restore it. The pulse is the same physical resource with two successive claims.

## Failures and recovery
Both live gates have generous windows: a simulation delaying each recipient by 90 ticks after its gate fully opens succeeds (41.65 s). Missing either window blocks progress but does not destroy a route. The lift is accessible on F1 alone, and the phase approach is latched. A recovery simulation deliberately misses both pulses and uses the lift to send Fire through each again; completes in 75.92 s without deaths. Retaining the fan enable blocks A2.

## Shortcut tests
Direct walk, missing the first pulse without retry, missing the second pulse without retry, and never withdrawing the fan all fail. All four idle-player necessity tests pass.

## Kinship
Flyover uses two simultaneous airborne contacts; Windfall Quartet interrupts an upward wind to reach side balconies. Here a single slow fall supplies a prolonged live pulse to two recipients, with a return lift permitting retries. No previous four-player level uses sink-as-a-timer.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 126.87 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 41.65 s; par: 105 s. All kit simulation checks passed without warnings.
Both 90-tick delayed crossings and both missed-pulse retries verified.
