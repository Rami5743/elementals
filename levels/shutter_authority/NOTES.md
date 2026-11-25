# Shutter Authority

Batch-90: 89/90

**Introduces:** Independent wide shutters create two additional physical states that complementary shutters cannot: both bridges present and both lower passages open. Each state is a key to one of the controller's certificates.

## The intended solution
Fire crosses A above and releases Earth's control. Earth opens A, Water crosses below and releases Air's control. Air closes B to carry Fire across above. Fire issues the far receipt, then Air opens B for Water, who obtains the far lower receipt and returns. With both shutters open, Air obtains its own certificate behind the inverse and Earth-controlled doors. Air closes B again for Fire's return. Earth closes A for Fire's return; now both shutters are closed, so Earth obtains its certificate. Earth alternates A to allow Water's return, Fire's second outbound crossing, and Water's second outbound crossing. Fire now has all four permissions for the final gate. Air opens B for Water's exit contact and reverses it for Fire's return; Earth closes A for Fire's final crossing. Air reopens B and Water returns to the exit; the final receipt bypasses the cross-controlled doors and both controllers can exit.

## Why each player is needed
Fire and Water provide geographically separate certificates above and below, and Earth and Air each operate an independent shutter and provide a separate certificate behind a pair of doors reading both controller states. All four idle-at-exit tests fail.

## The insight
The two shutters need not be complementary. Both being floors (Earth's receipt), or both being open passages (Air's receipt), is itself the useful state. Each controller's certificate corridor excludes its own active control state and requires the other active control, so neither can simply leave its bridge available.

## Likely failures and how players recover
Leaving a bridge selected prevents the opposite traveller crossing and prevents a controller reaching its own certificate. Reverse the control after the traveller is safely on a bank; all controls are toggle levers, the certificate gates latch, and the lower gallery has a solid floor with return ledges. Return the controller to its lever before changing the partner's state. A premature reversal and reissue of Air's first dispatch was tested. No timed crossing is required.

## Shortcuts that were closed
Omitting either controller certificate and retaining the first bridge state were independently tested; all three attempts fail. The controllers' galleries are physically isolated, and the shutters span the full lower gallery height.

## Kinship with the campaign
Interlock uses mutually controlled airlocks. Shutter Council is the nearest local level, but its single selector and quorum can only produce complementary bridge states. Here the two additional states, both floors and both passages, are independently reachable and required by the two receipt circuits. There is no handoff of a common selector or shared quorum enabling key.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 20.19 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 55.95 s; par: 140 s. All kit simulation checks passed without warnings.
Recovery simulation: Air reverses the initial dispatch after 10 ticks, waits 90 ticks, then restores it; 3461 ticks, four gems, zero deaths.
