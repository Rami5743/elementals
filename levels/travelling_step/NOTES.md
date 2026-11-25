# Travelling Step

Batch-90: 47/90

**Introduces:** The crate is a travelling step: it gives access to either three-tile bank, but cannot provide both steps at once.

## Intended solution
1. Water opens the initial bank doors.
2. Fire climbs onto the crate and from it onto the right bank, unlocking Water's conveyor selector.
3. Water reverses the conveyor; Fire drops into the trench and follows the crate to the left.
4. Fire uses the crate to ascend the left bank and grants Water access to the first reciprocal certificate.
5. Water obtains it, returns to the selector and sends the crate right. Fire earns the second right certificate.
6. Water obtains the second reciprocal certificate and sends the crate back left.
7. Fire climbs into the newly available left workshop and obtains the gem and its certificate.
8. Water grants the final right access and moves the crate right once more. Fire climbs out, operates the final control and both exit.

## Why each player is needed
Water alone accesses the conveyor selector and lower authorization chain. Fire alone accesses the two banks, with the crate providing the extra height. The distinct gems and exits are locked behind this chain.

## The insight
A crate is not just a pressure-plate weight: it is portable geometry. Return to the trench and reposition it each time the opposite bank becomes necessary. A jump from the trench floor cannot reach either bank.

## Likely failures and recovery
If the crate moves to the wrong side, reverse the selector; walls retain the crate within the trench. If Fire misses the first hop, land safely and hop again with the crate still at the bank. The short intermediate reversal and restoration were tested. There is no expiry, no hazard in the trench, and no narrow timing requirement.

## Shortcuts
Keeping the crate at the left after the first left certificate fails; trying to jump from the bare trench to the left bank fails. The trench is too broad to cross directly from bank to bank, the doors reach the ceiling, and Water is isolated by rock.

## Kinship
Unlike conveyor cargo-contact puzzles, the crate never acts as an electrical key. Its location changes the reachable height. Crate-step is new at two players.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 7.09 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 47.58 s; par: 119 s. All kit simulation checks passed without warnings.
Intermediate reversal and restoration succeeded in simulation.
