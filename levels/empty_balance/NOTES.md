# Empty Balance

Batch-90: 29/90

**Introduces:** Independent hoists lift the cargo off either half of a seesaw; the unweighted plank recenters when the loads are equal or absent. Opposite imbalances and the two loaded middle contacts authorize distinct phases.

## The intended solution
1. Fire raises the left stone off the plank; the right stone sinks.
2. Both operators cross the first paired-contact gates and register separate permissions.
3. Water raises the right stone and Fire lowers the left one. The opposite imbalance opens the second workshops.
4. Both register their second permissions.
5. Water lowers its stone onto the plank, so the two loaded halves balance at the middle height. Both middle contacts and the second permissions open the third workshops.
6. Both register the third permissions.
7. Fire raises the left stone again. Fire's final gate latches in this state and permits access to the far certificate.
8. Fire records the far certificate and returns to lower the stone again. The two centered contacts together with all final certificates grant Water's exit.
9. Fire crosses its remembered gate and returns to its own exit.

## Why each player is needed
Each hoist has a separate operator and each phase requires acknowledgments in separate galleries. Fire additionally has to reverse the final delivery state. Both idle-at-exit checks fail.

## The insight
Raising a weight off a scale does not raise the pan beneath it. Removing one load creates an imbalance, removing both leaves the plank empty, and returning both creates two live centered contacts. The empty centered plank is not the same signal state as the loaded centered plank.

## Likely failures and how players recover
Retaining the first hoist blocks the opposite contacts; lower it. Retaining the second blocks the centered contacts; lower it. Retaining the first after Fire's final certificate blocks Water's exit; Fire can return to the original lever through latched gates. A recovery variant deliberately raises both stones completely before restoring the needed load and solves in 50.50 seconds. No timed input or required jump is present.

## Shortcuts that were closed
Walking straight, retaining either hoist in the middle phases, and retaining the first hoist after the final certificate all fail in simulation. Both cargo loads are confined to a separated machinery chamber. Full-height doors prevent jumps over gates.

## Kinship with the campaign
Counterpoise uses a seesaw to raise a rider or load; Empty Balance uses a seesaw as a reversible comparator with independently removable loads. In Ratio Exchange, two fixed loads on a pulley are made unequal by altering the ratio; here both hoists physically remove their loads from a seesaw, and equal loaded pans give a third contact state. The new idea is hoist-unloads-comparator.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 44.19 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 48.72 s; par: 122 s. All kit simulation checks passed without warnings.
Both-loads-raised recovery simulation passed.
