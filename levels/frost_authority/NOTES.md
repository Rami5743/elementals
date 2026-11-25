# Frost Authority

Batch-90: 35/90

## Introduces
An ice selector with two mutually exclusive approaches: Water controls the ice, but Air controls which side of the pad Water can leave through. The two travelers must return before the approach can be reversed.

## Intended solution
1. Earth crosses the initially frozen east pool and issues E1; Water enters the pad from the west.
2. Air enables the east approach. Fire crosses west and issues F1; Earth crosses west and records E2.
3. Water steps east off the pad; Fire crosses east and records F2, and both travelers prepare to return.
4. Earth records Eback at its home bank. Water returns to the pad; Fire records Fback at its home bank.
5. Air crosses the two certificate gates, returns to consent, and switches it off. The east approach closes, the west opens, and Air crosses the inverse gate to A2.
6. Water leaves to the west; Fire collects F3 on the east and both travelers return to their middle islands.
7. Water re-enters the pad from the west; Air restores the east approach. Earth collects E3 on the west; Fire returns home.
8. Water steps east off the pad again, letting Earth return home.
9. Water visits Wcert on the east; Air withdraws consent for the final inverse crossing and issues Ahome.
10. Water and Air take their east exits.

## Roles and insight
Water is the sole ice selector. Air never controls a pool directly: its reversible pair of gates changes the permitted route around the pad, and its independent A2 and Ahome certificates force both reversals. Fire and Earth collect opposing certificates in separate flood corridors.

## Failures and recovery
Leaving before the return certificates blocks both final far workshops. Keeping the initial ice state blocks the east crossing; keeping the east approach open blocks Air's A2. An erroneous first selection was tested by stepping off east, waiting 100 ticks, returning to the pad, waiting 100 ticks, and then restoring the required ice state (57.68 s). Travelers have safe islands and checkpoints; wait for the selected ice before crossing.

## Shortcut tests
Direct walk, retaining the first ice state, skipping return certificates and retaining the east approach all fail. Four idle-player necessity tests pass.

## Kinship
Winter Relay uses a single selector operator at three players. Here the fourth player independently controls opposed approaches and must reverse them between certificates; no prior four-player level uses freeze-invert.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 60.21 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 53.70 s; par: 135 s. All kit simulation checks passed without warnings.
Extra off/on/off selector cycle verified.
