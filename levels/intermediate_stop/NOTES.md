# Intermediate Stop

Batch-90: 02/90

**Introduces:** A binary hoist can be made into a three-state machine by deliberately blocking its upward travel with a retractable ceiling. The obstruction is not a failure: it provides a stable middle reading that a passing stone cannot maintain.

## The intended solution

1. Fire turns on the hoist. With the ceiling closed the rising stone stops against the ceiling and holds the middle contact. This latches Fire's first gate.
2. Fire operates the first relay; Water opens the ceiling. The still-powered lift resumes motion and reaches the high contact, permitting Water's first gate.
3. Water enables Fire's second gate. Fire sets the second relay and returns to lower the hoist. Wait for the low contact.
4. Water closes the ceiling. Fire starts the hoist again; it stops at the middle contact, supplying Water's live middle gate.
5. Water passes the gate and turns its middle relay on. That relay retains permission after the stone leaves the middle position.
6. Fire lowers the stone to the bottom, opens its low-contact passage, sets the next relay and returns to raise the hoist. Water opens the ceiling, releasing the high route.
7. Water reaches the final relay, which needs the stone at the middle position again. Fire lowers the stone. Water returns to close the ceiling and crosses its last gate on the low contact.
8. Fire starts the hoist for the last time. It stalls at the middle contact, holding Fire's final passage open. Both collect their gems and exit.

## Why both players are needed

Fire controls the vertical motion and its relays; Water controls the obstruction and the other relays. Both idle-at-exit counterfactuals fail. Rock isolates the cargo and separates the galleries.

## The insight

The hoist command has only two states, but a physical stop gives it a third stable position. Opening the obstruction does not change the hoist's command: it releases an already powered machine. The middle contact is useful as a stable output, not as a timed pulse.

## Likely failures and how players recover

Leaving the ceiling open causes the stone to pass the middle contact instead of parking there. Close the ceiling with the stone low and raise again. Leaving the hoist up when the low contact is needed blocks the next passage; return to the accessible hoist control and lower it. Early passage permissions latch; the nonlatched middle passage is retained by the far relay or reopened by restoring the middle state. The cargo cannot be pushed sideways in its narrow shaft, and the ceiling may be opened to release an obstruction. No lethal terrain, precision jumps or timer windows are required. The replay exercises repeated lowering, re-raising and ceiling release; arbitrary continuous-physics recovery is not exhaustively proven.

## Shortcuts that were closed

Direct walking fails. The alternate script leaves the ceiling open, waits near Water's middle gate, and attempts to pass during the transient middle contact instead of using the stop. The actual engine rejects the route. Both galleries are sealed with full-height doors, and players cannot reach the heavy sensors or substitute for the cargo.

## Kinship with earlier levels

Jackshaft presses an object into a switch; Grate Register stores a load on a one-way floor. Here neither depositing a load nor changing its support is the key. A deliberate obstruction produces a stable intermediate lift position, then opening it lets the same powered motion continue. The novelty checker warns about identical ingredient vocabulary to Cascade Relay. This is expected: both use doors, heavy plates and elevators, but Cascade Relay has two interacting electrical supplies and no physical obstruction, while this puzzle has a single hoist with an externally controlled physical limit. The actual blocked-transit shortcut test distinguishes the central mechanic.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 130.75 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 52.83 s; par: 133 s. All kit simulation checks passed without warnings.

