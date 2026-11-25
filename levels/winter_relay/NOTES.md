# Winter Relay

Batch-90: 32/90

**Introduces:** A single Water pad exchanges the frozen roads of two isolated travelers. Each must return home with a first certificate before either can earn its final far-bank certificate.

## The intended solution
1. Earth crosses the frozen inverted eastern pool, reaches the island and authorizes Water's pad access.
2. Water stands on the pad, freezing the western pools. Fire crosses its first pool and authorizes Earth's western route.
3. Earth crosses to its western far bank, records the first certificate and returns to the island.
4. Water leaves the pad. Fire crosses the eastern pool, records the first far certificate and returns to its island. Earth crosses home and records its return certificate.
5. Water stands on the pad again. Fire crosses back home, records its return certificate and returns to the island.
6. Water steps off. Both return certificates grant access to the final far workshops. Fire crosses east, registers its final certificate and returns to the island; Earth crosses west to its own island.
7. Water returns to the pad. Earth crosses west to the last certificate, registers it and returns to the island. Fire crosses its first pool home.
8. Water leaves the pad for the last time. Earth crosses home. Both far certificates allow Water to reach the last workshop, register the final key and return to the exit.

## Why each player is needed
Water alone can select which pair of pools is frozen. Fire and Earth have separate first, return and final certificates in separated galleries, and their movements require opposite selections. All three idle-at-exit checks fail.

## The insight
The far bank is not a destination but an errand, twice. The first trip has to be undone by both travelers before the second trip is possible; the same ice selector must be exchanged seven times.

## Likely failures and how players recover
Keeping the western pools frozen blocks the eastern trip; leave the pad. Skipping the return home blocks the last far gates. All intermediate permissions latch, and the pad is always reachable after its first authorization. A simulated premature reversal on the island, followed by restoring and then correctly changing the selection, completes in 49.75 seconds. Checkpoints protect the starting banks, islands and far banks if a player enters thawed water accidentally. Normal operation requires no timing or jumping: each selected pool remains frozen indefinitely while Water maintains the appropriate position. Arbitrary death states have not been exhaustively tested.

## Shortcuts that were closed
Direct travel to exits, retaining the first ice state, and trying the far workshop without returning home all fail in simulation. The pools are six tiles wide, beyond Fire's and Earth's jumps; solid separators prevent using another gallery. All doors fill their passages.

## Kinship with the campaign
Tidewater exchanges two frozen pools. The two-player Thaw uses that exchange for a single return trip. Winter Relay requires two travelers on complementary schedules, with three independent certificates per traveler and a second trip unlocked by the first return. No previous three-player level in this repository used freeze-invert as its central idea.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 43.81 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 49.10 s; par: 123 s. All kit simulation checks passed without warnings.
Reversal recovery and explicit-import evaluation passed.
