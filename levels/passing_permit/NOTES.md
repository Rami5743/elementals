# Passing Permit

Batch-90: 85/90

**Introduces:** single-file-stone and stand-aside-is-the-switch at three players, with a separate inspector who cannot replace the shelf holder and whose authorization is obtained only by a runner on the other side of the stone.

## Solution
Earth pushes the boulder into the unique high-roof niche and stands on its shelf. Fire authorizes the hatch from the isolated upper corridor. Water passes the boulder, extinguishes the far firewall and operates the inspection lever. Fire can now cross its corridor to authorize the vault. Water climbs the far ladder and returns over the gallery, but the shelf closes the gallery gate. Earth steps off; Water returns through the near shaft, takes over the shelf, and Earth pushes the boulder through the hatch and into the heavy notch. Earth enters the newly authorized vault and pulls the permanent release, freeing Water from shelf duty and opening Fire's exit. Earth returns over the gallery while Water descends to the far exit and Fire returns west.

## Necessity, shortcuts and recovery
Earth alone pushes the stone; Water alone extinguishes the firewall. Fire alone can reach the upper permits. Omitting either permit is separately simulated and fails. The shelf and gallery gate exchange their roles whenever someone steps off: both sides have safe waiting places and the ladder and upper gallery form the return path. No timed mechanism. Fire can revoke and reissue the first permit before the crossing; the recovery script does exactly that. All four gems are collected.

## Novelty
Passing Place at two players established the geometry, but its direct shelf-to-hatch wire and direct stone-to-vault wire are replaced by two independent authorizations and a three-party causal loop: Water must inspect before Fire can authorize the vault, and Fire cannot leave before Earth certifies the permanent release. No three-player core has used a single-file stone with the unique passing shelf as the necessary exchange location.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 18.81 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 42.85 s; par: 108 s. All kit simulation checks passed without warnings.
Recovery replay: revoking and reissuing Fire's permit before crossing, 2571 ticks; stable untimed gates.
