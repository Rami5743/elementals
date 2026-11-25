# Three Votes

Batch-90: 25/90

**Introduces:** A two-deck crossing needs three independent votes to rise, and two voters must revoke their approvals to reach the middle acknowledgment before all three votes are reassembled.

## The intended solution
1. Fire crosses the lower bridge to authorize Water's access to the voting lever.
2. Fire boards; all three isolated operators approve ascent.
3. Fire reaches the upper east relay, authorizing the lower west berth, then boards.
4. Earth and Air withdraw their votes, restoring the lower crossing and opening their respective inverse gates.
5. Fire descends and reaches the lower west relay, enabling Air's access to its acknowledgment and contributing one of two inputs to Earth's acknowledgment door.
6. Air reaches the middle certificate and returns. Earth can now reach its own acknowledgment and must return to vote again.
7. All three votes are reassembled, and Fire reaches the upper west certificate.
8. Fire boards for the final descent. All three operators withdraw their votes; Water certifies the return, and all four reach their respective exits.

## Why each player is needed
Fire traverses the two decks. Water, Earth and Air control distinct votes and route permissions from physically separated galleries. Air and Earth jointly certify the middle stage; Water certifies the final return. Every idle-at-exit check fails.

## The insight
The lift is also the only bridge. Voting to raise it simultaneously forfeits access to the voting operator's own passage; the quorum must be dismantled for the middle work, reassembled, then dismantled again.

## Likely failures and how players recover
Premature ascent can be reversed by revoking any vote. Simulation verified an entire premature ascent/descent followed by a successful solution in 54.85 s. Retaining either middle vote blocks the respective inverse passage; retaining Water's vote blocks the final certificate. Every vote can be reversed from its original lever. A lower-bank checkpoint protects the pit. Arbitrary death states were not exhaustively tested. No timed input or precision jump is needed.

## Shortcuts that were closed
Walking directly or retaining any of the three votes fails at the corresponding door in simulation. The independent galleries are separated by solid rock, the doors fill their passages, and the seven-tile gap is wider than Fire's jump.

## Kinship with the campaign
Gondola has a transport quorum. This puzzle develops the two-player Double Deck and three-player Bridge Assembly: the same platform is the sole bridge on two decks, and the two middle acknowledgments form a dependent pair with separate vote withdrawals. No four-player level previously used the lift-as-floor idea. The novelty checker flags the words 'triple' and 'vote' shared with Counterflow Council. That level uses reversible opposing conveyors and direction-dependent motion; this level has no conveyors and instead changes which deck has a physical floor. The shared vocabulary describes the number of voters, not the central mechanism.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 55.80 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 45.43 s; par: 114 s. All kit simulation checks passed without warnings.

