# Ratio Tribunal

Batch-90: 22/90

**Introduces:** Three operators jointly select the heavier side of a loaded rope; two must finish on one paired contact state and the third must relinquish that state to finish.

## The intended solution

1. Engage all three ratio inputs. The left stone outweighs the mechanically advantaged right pan: the left descends four tiles and the right rises two.
2. Each operator passes the first gate and registers an acknowledgment.
3. Fire returns to disengage A. The right side now outweighs the left, giving the opposite contacts; the earlier acknowledgments jointly authorize the second workshops.
4. Earth and Fire register the second permissions, while Water crosses the live middle gate and registers its western permission.
5. Fire re-engages A. Water is stranded west of the live middle gate, but all third workshops become accessible.
6. All three register the third certificates; Water's certificate opens the east return workshop.
7. Fire disengages A again, so Water can reverse through its middle gate to the east workshop.
8. Water registers the east certificate and crosses back west; Fire engages A again. Fire and Water pass their final gates and operate the acknowledgment levers on the far sides.
9. Earth returns to C and disengages it. The high-left and low-right contacts then jointly permit Earth to pass the final gate.

## Why each player is needed

The ratio requires three independent inputs. Each gallery is physically separate and contains distinct certificates. Fire and Water must complete their high-state exit acknowledgments before Earth can leave on the complementary state. All three idle-at-exit tests fail.

## The insight

Mechanical advantage changes the sign of the imbalance. Two loaded pans move through unequal distances, and the correct final state for the first two operators is precisely the wrong one for the third.

## Likely failures and how players recover

Keeping the block engaged stalls the second workshops; return to A and disengage it. Prematurely re-engaging A closes Water's return gate; Fire can restore the previous state. Intermediate gates other than Water's middle gate latch, and both A and C remain reachable. A recovery variant cycles the ratio incorrectly before restoring it and finishes in 58.52 seconds. No timed input or jump is required.

## Shortcuts that were closed

Direct walking, never reversing the rope, omitting the east workshop, and leaving all three inputs engaged at the final exit fail in simulation. The cargo chamber cannot be entered. The final acknowledgment levers beyond Fire's and Water's final gates prevent Earth from exiting during an earlier reversal.

## Kinship with the campaign and novelty review

Counterpoise uses added weight to lift a load. Here the cargo weights are fixed and the ratio reverses the direction. The novelty tool notes a lexical resemblance between the core tag and Memory Loom's tag (the words three and party). The actual mechanisms differ: Memory Loom uses a balanced rope as height memory and a rider to write it; this rope is deliberately unbalanced in both states, uses two separate cargo contacts, and requires complementary exit certificates. Ratio Exchange shares the physical idea at two players, but does not require the third operator's opposite final state.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 72.68 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 57.78 s; par: 145 s. All kit simulation checks passed without warnings.

