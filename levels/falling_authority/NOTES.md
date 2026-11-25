# Falling Authority

Batch-90: 90/90

**Introduces:** A timed launch that removes the operator's floor, and must be rearmed for a second crossing after the first traveller's receipt changes who is authorized to use that same clock.

## The intended solution
1. Earth walks east to arm Fire's gate and admit Air to the launch pad. Fire and Water approach their separate gates.
2. Air presses the timed button while standing on its own trapdoor; the floor opens and Air drops to the lower gallery. Only Fire's gate is armed. Fire runs east through the five-second window and pulls the far receipt.
3. Fire's receipt releases Air's lower inspection. Air issues the inspection receipt for Earth.
4. Earth must switch off the first permit to reach the western authorization. It now arms both runner gates, including the one Water could not use during the first launch.
5. Air rides the repeating return lift and comes back to the restored launch pad. Fire approaches its gate from the east, Water from the west.
6. Air drops through the pad a second time. Fire and Water cross their gates in opposite directions during the same pulse. Water's receipt opens Fire's home gate and Earth's eastern gate.
7. Earth crosses back east and issues the final inspection; Air can now reach the lower far receipt. That receipt releases Water's final exit. Everyone goes home.

## Why each player is needed
Air is the only occupant of the launch and inspection galleries; its own return lift is essential. Earth holds the initial authorization, then relinquishes it to reach the second. Fire obtains the first remote receipt, without which Air cannot enable Earth's second authorization. Water obtains the second remote receipt, which releases the final chain of three permissions. Each player has a gem in its own gallery, and every idle-at-exit counterfactual fails.

## The insight
The clock consumes the operator's position. The first launch changes the authorization graph via the lower receipt; to rearm the very same button, Air must return to the top and Earth must revoke its old permission. The second launch has two runners moving in opposite directions. Unlike a permanent trapdoor release, the floor and the clock are reusable and can be restored independently of the travellers' progress.

## Likely failures and how players recover
If Fire misses the first pulse, Air can ride the continuously cycling return lift without the first receipt and repeat the launch; the button resets and the hatch closes. If Water misses the second pulse, Fire can remain at home while Air returns and repeats the same launch under the retained second authorization. Earth must not retain the first key, which blocks its own return path. Both missed-window recoveries and a 90-tick delayed departure on the two timed crossings were simulated without deaths. There are no lethal tiles. The 300-tick window is comfortably longer than the walk from the waiting positions to clear the gates.

## Shortcuts that were closed
Keeping the first authorization active traps Earth east of the inverse gate. Omitting the second launch prevents the two runners from crossing; omitting Water's receipt prevents the final inspections. All three fail in simulation. Full-height doors and physically separate galleries prevent jumping around the gates.

## Kinship with the campaign
The Drop used a self-removing floor at three players; in that level the press is the descent and there is no requirement to repeat the clock. Here a reversible descent and return elevator are essential to repeated dispatch, with revocation and independent authorization between runs. The four-player catalogue has not used twist-self-block.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 14.65 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 41.72 s; par: 105 s. All kit simulation checks passed without warnings.
Simulated recoveries: first missed pulse 4080 ticks; second missed pulse 3292 ticks; 90-tick delayed starts 2593 ticks. All four gems and no deaths in each.
