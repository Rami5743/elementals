# Windfall Quartet

**Introduces:** separate operators for two temporary wind interruptions, with the first operator's certification needed before the second is released.

## The intended solution
Fire starts the circuit and rises through the left shaft. Water enables the upper selector and unlocks Air's booth. When Fire is ready, Air temporarily stops the right wind. Fire lands on the right balcony and operates the contact. Air certifies that descent and exits. Fire uses the restored wind to return across the top passage. Water now releases the selector and unlocks Earth's booth. Earth stops the left wind when Fire is ready, then certifies the left balcony contact. Water collects the acknowledgment, operates the finish switch, restores the selector to release Fire's exit, and returns to its own exit.

## Why each player is needed
Fire traverses the shafts and obtains the two balcony contacts. Water manages the selector and unlocks the interruption operators. Air controls and certifies the first descent. Earth controls and certifies the second descent. Their permissions are serially dependent.

## The insight
The fans are both transport and obstruction. They must be stopped temporarily, then restored for ascent. The second operator cannot act before the first descent is certified and Fire returns through the upper selector.

## Likely failures and how players recover
Each stop lasts 360 ticks. Signal readiness before interrupting a fan. Safe shaft floors and balconies permit retrying missed descents after the wind restarts. If the selector was released prematurely, restore it to let Fire return.

## Shortcuts that were closed
Direct walking, leaving the wind running, and releasing the selector before Fire returns fail the scripted checks.

## Kinship with the campaign
Extends Windfall Relay by giving each interruption its own gated operator and certification, rather than assigning extra parallel timed tasks.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 24.63 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 49.25 s; par: 124 s. All kit simulation checks passed without warnings.

