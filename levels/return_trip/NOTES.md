# Return Trip

Batch-90: 12/90

**Introduces:** A heavy rider turns a moving lift into a periodic switch. The runner needs the upper trip contact before the lower one, so the rider cannot get off at the first upper berth.

## The intended solution

1. Fire records the starting relay, allowing Earth access to the lift shaft.
2. Earth boards the looping lift at the lower berth. Fire positions itself at the first gate.
3. Earth passes the upper heavy contact. Fire crosses while that contact is active and records its acknowledgment.
4. The second gate requires both that acknowledgment and the lower contact. Since Earth has already passed the lower contact, the team must use a subsequent passage.
5. Earth stays aboard. Fire waits for the lower contact and crosses during its next active window.
6. Fire records the second acknowledgment, releasing Earth's loft.
7. Earth remains on the shuttle until it next reaches the upper berth, dismounts, and records the loft relay.
8. Fire's final gate opens. Both collect their gems and reach their exits.

## Why each player is needed

Only Earth's weight activates the heavy contacts; Fire owns the starting, upper-stage and lower-stage acknowledgments. Earth also owns the final loft relay. Both idle-at-exit simulations fail.

## The insight

The ride is the switch, not just transportation. The two contacts occur in the opposite spatial order from the permission sequence, so reaching the upper berth is not permission to finish riding.

## Likely failures and how players recover

A missed trip window costs another pass, not a life. The 0.5 px/tick lift traverses each 32px contact over at least 120 ticks of body overlap; both berths have a 240-tick pause. A recovery simulation intentionally missed both crossings and waited for repeat windows; it solved in 104.00 seconds. If Earth dismounts early, it can return to the shaft from the loft when the lift arrives. There are no lethal tiles. The lift continues looping without requiring a player to hold a control.

## Shortcuts that were closed

The empty lift cannot activate either heavy sensor; leaving it at the first upper berth prevents the second gate opening. Both counterfactual scripts fail. The shaft is enclosed, and all gates span their gallery ceilings.

## Kinship with the campaign

Catch the Lift requires boarding a moving vehicle. Here the main motor demand is instead a runner's crossing during the rider's passage. Tripwire uses a single shaft contact in a four-player puzzle; this two-player variant requires two contacts in reverse spatial order, making early dismount a tempting but wrong solution.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 24.78 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 104.00 s; par: 260 s. All kit simulation checks passed without warnings.

