# Three-Way Imprint

**Introduces:** A hoist writes a physical memory by depositing a stone above a grate, and a closing press erases it. A third operator must relinquish a recorded permission and return to the starting room before the next erasure can open the onward route.

## The intended solution

1. Fire raises the hoist; both Water and Earth gain access to their first relays from the upper heavy contact.
2. Both operate those relays. Fire lowers the hoist; Earth closes the press to push the retained stone through the grate. The low contact plus both relays latch Fire's first gate.
3. Fire sets its first relay. Earth uses the low contact to reach its second relay, returns to the press, and reopens it.
4. Fire raises the stone again. Water's second gate now has all three inputs: the upper contact and Fire's and Earth's relays.
5. Water sets its middle relay, which enables Fire's next passage and closes Water's own return gate. After Fire sets its next relay, Water releases the middle relay and returns to the first room to set the return permission. This relinquishment is necessary because Earth's last passage requires that permission.
6. Fire lowers the hoist; Earth closes the press again. With the low contact, the return permission and Fire's middle relay, Earth reaches its last relay.
7. Water can now pass its last gate and set the final relay. Earth returns to open the press. Fire raises the stone once more and passes its last gate.
8. All collect their gems and reach their exits.

## Why each player is needed

Fire writes the high state with the hoist. Earth erases it using the press and supplies the low-phase relays. Water supplies the complementary permissions and must physically return to its first room after relinquishing the middle relay. The stone is inaccessible to all three galleries; nobody can push it or replace its heavy contacts.

## The insight

The two height contacts are not simply two switch states. The stone remains high after the hoist withdraws, and the press cannot be replaced by a return trip of the hoist. The third operator must store permission in a latch and undo the live relay before returning to grant the next permission.

## Likely failures and how players recover

Leaving the press open after lowering the hoist keeps the stone upstairs: close the press from Earth's starting room. Leaving Water's middle relay on closes its return gate; return to the relay from the same room and turn it off, after Fire's gate latches. The gates retain achieved permissions, all control rooms remain reachable by reversing a local relay, and there are no lethal gaps or timed crossings. Arbitrary continuous-physics states have not been exhaustively searched.

## Shortcuts that were closed

Direct walking fails at a closed gate. The omitted-press test fails waiting for the bottom contact. The leave-relay-on test fails at Water's inverted gate. All three fail in the actual engine. Galleries are separated by rock and the heavy stone is sealed away; the vertical gates reach the ceiling.

## Kinship with the campaign

The cargo delivery and closing-door press mechanisms are combined into a reusable memory rather than an irreversible delivery. Grate Register introduced this mechanism for two players; here a separate third operator and a deliberately relinquished permission determine the order.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 33.86 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 52.15 s; par: 131 s. All kit simulation checks passed without warnings.

