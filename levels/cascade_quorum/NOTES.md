# Cascade Quorum

Batch-90: 07/90

**Introduces:** Two independent operators share a supply hoist, whose low cargo contact powers the second hoist. The fourth operator owns the reversible half of the supply quorum.

## The intended solution

1. Water enables Earth and Air's initial access. Earth enables B. A is low, so B receives power and rises.
2. B's high position gives Fire and Air access to their separate A controls. Both must enable A before it rises.
3. A rising disconnects B. Water's first passage requires A high and B low. Water records a relay, allowing Fire to record the first acknowledgment.
4. Air can now cross its second gate and record its independent acknowledgment while A is high.
5. Air must return to disable its own A input, even though Fire's input remains on. A drops and B automatically rises again.
6. Earth records its B-high acknowledgment; Water can proceed only with Fire, Earth and Air's acknowledgments and B high. Air obtains its next relay while B is high.
7. Fire and Water record the next relays while A is low. Earth provides a final acknowledgment. Air returns to restore the missing A input.
8. A rises, B drops, and the final gates open on the correct contact and acknowledgment combinations. All four collect their gems and exit.

## Why each player is needed

Earth controls B and records two permissions. Fire and Air jointly control A, with Air responsible for interrupting and restoring the supply. Water connects the two phases through its relays. Every individual idle-at-exit simulation fails. Separate galleries and sealed cargo shafts prevent substitution.

## The insight

Even when three machine controls remain enabled, releasing one member of a quorum changes both machines' actual states. A mechanical contact is a power dependency rather than just an indication.

## Likely failures and how players recover

Leaving A high blocks renewed B-high access. Air can return to its control and remove the missing quorum input. Raising A prematurely interrupts a needed B-high stage; reverse it and try again. A recovery simulation deliberately interrupted and restored A before the first exchange was complete, then finished in 57.88 s. All intermediate gates latch, controllers stay accessible, and no hazardous tile or timed action is required.

## Shortcuts that were closed

Direct walking and never restoring B power fail in simulation. Doors span both tiles of their galleries. Neither the cargo nor its sensors can be accessed directly.

## Kinship with the campaign

Windmill uses ordinary sequential relays. This version uses physical position as a power supply and separates the supply quorum across two people. Cascade Triad uses the same physical dependency but a single A operator; here relinquishing a single member of the two-input supply is the necessary operation.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 32.55 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 47.68 s; par: 120 s. All kit simulation checks passed without warnings.

