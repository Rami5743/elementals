# Grate Register

**Introduces:** The hoist writes a physical bit by placing a stone above a one-way grate. Lowering the hoist does not erase it; only a separate closing press can send the stone down through the grate. The high and low contacts therefore have incompatible jobs, and the two operators must deliberately relinquish a permission to exchange them.

## The intended solution

1. Fire raises the hoist with the press open. The boulder reaches the top contact and latches Water's first gate.
2. Water crosses it and operates the first relay, requesting the bottom contact. Fire returns the hoist to the bottom; the grate leaves the stone above.
3. Water returns to the press and closes it. The stone falls through the grate onto the hoist, activating the low contact and latching Fire's first gate.
4. Fire crosses and sets its first relay. Water reopens the press. Fire goes back to the hoist control and raises the stone again.
5. The high contact and Fire's relay latch Water's second gate. Water sets the next relay; the high contact latches Fire's second gate. Water's relay also closes an inverted gate behind Water.
6. Fire crosses and sets the next relay. Water must turn its relay off again to return to the press; Fire has already retained the permission in its latch.
7. Fire lowers the hoist; Water closes the press again. The low contact and Fire's second relay latch Water's last gate. Water crosses and sets the final relay.
8. Water returns to reopen the press, then goes to its exit. Fire raises the stone once more; the high contact and final relay latch its last gate. Both collect their gems and exit.

## Why each player is needed

Fire controls the hoist and two low/high-dependent relays; Water controls the press and the three return permissions. The stone is in a sealed chamber. No operator can supply its heavy contacts or reach the other gallery.

## The insight

Neither switch alone controls the position of the stone. The grate keeps the previous state when the hoist is removed. To erase it, remove the hoist and use the press, which acts on cargo rather than a player. The single stone is successively needed high, low, high, low and high. The inverted gate also requires giving up a previously used relay.

## Likely failures and how players recover

Lowering the lift alone leaves the stone upstairs; close the press. Closing the press too early while the hoist is high can be resolved by lowering the hoist. The alternative replay deliberately closes the press before the hoist finishes lowering and still succeeds. Leaving Water's second relay on blocks Water's return; turn it off from the same room. Latched doors retain achieved permissions, so earlier work need not be repeated. No timed doors, gaps or precision jumps are required.

## Shortcuts that were closed

Direct walking and leaving the press open after the lift is lowered are tested. The latter fails at the bottom contact. Doors reach the ceiling; the isolated machinery prevents player substitution and head-stacking.

## Kinship with the campaign

Stamp Mill uses a press to push cargo through a grate; Dumbwaiter uses a hoist to leave cargo on one. Here the two mechanisms are a reversible register: use the same stone and grate to alternate between two persistent contact states. Unlike the pulley-based Rope Register, the memory is stored by one-way terrain, not equal masses.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 35.42 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 47.12 s; par: 118 s. All kit simulation checks passed without warnings.

