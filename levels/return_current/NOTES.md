# Return Current

**Introduces:** A reversible switch maze: the same remote lever is both a key and a lock, so you must deliberately rewind the circuit to finish.

## The intended solution

The state is the room occupied by each player and the on/off setting of the levers. Gates use AND, OR and their inverses. Neither a permanently increasing collection of keys nor a simple relay in one direction will work. The planned route was obtained by breadth-first search over room and switch states: 44 actions, including 19 lever operations. There are no timed gates. Each lever is labelled with a letter in the map; gate IDs below are zero-based gallery/position numbers, in the order from spawn to exit.

1. Fire: flip lever D.
2. Fire: cross gate 0/0.
3. Fire: cross gate 0/1.
4. Fire: flip lever A.
5. Earth: cross gate 2/0.
6. Fire: flip lever A.
7. Fire: cross gate 0/1.
8. Fire: cross gate 0/0.
9. Fire: flip lever D.
10. Fire: cross gate 0/0.
11. Fire: cross gate 0/1.
12. Earth: cross gate 2/1.
13. Fire: flip lever A.
14. Earth: flip lever F.
15. Water: cross gate 1/0.
16. Fire: flip lever A.
17. Water: flip lever E.
18. Earth: flip lever F.
19. Fire: cross gate 0/1.
20. Fire: cross gate 0/0.
21. Earth: cross gate 2/1.
22. Fire: flip lever D.
23. Fire: cross gate 0/0.
24. Fire: cross gate 0/1.
25. Fire: flip lever A.
26. Earth: cross gate 2/0.
27. Earth: flip lever C.
28. Water: cross gate 1/1.
29. Water: flip lever B.
30. Earth: flip lever C.
31. Earth: cross gate 2/0.
32. Fire: flip lever A.
33. Fire: cross gate 0/1.
34. Fire: cross gate 0/0.
35. Fire: flip lever D.
36. Earth: cross gate 2/1.
37. Fire: flip lever D.
38. Fire: cross gate 0/0.
39. Earth: flip lever F.
40. Fire: cross gate 0/1.
41. Fire: flip lever A.
42. Fire: cross gate 0/2.
43. Water: cross gate 1/2.
44. Earth: cross gate 2/2.

Finally, go to the exits and collect the gems on the way. The tested replay takes 54.8 seconds; par is 137 seconds.

## Why each player is needed

- **Fire:** controls levers A, D in its isolated gallery; the other elements cannot enter that gallery.
- **Water:** controls levers B, E in its isolated gallery; the other elements cannot enter that gallery.
- **Earth:** controls levers C, F in its isolated gallery; the other elements cannot enter that gallery.

The real simulation's idle-at-exit test fails for every element. No player is a passenger. The rock between galleries reaches both ends, so a partner cannot substitute for a lever operator.

## The insight

Opening a gate is not progress if the new state closes the gate you will need next. The complementary and quorum gates form a single distributed memory: cross, return, change the key, and cross again. The shared resource is the circuit state; different players need incompatible settings. The solution changes the map repeatedly, rather than clearing independent obstacles in sequence.

## Likely failures and how players recover

- Walking straight to the exits fails at a closed gate. Return to a reachable lever and trace its wires.
- Leaving every lever on fails at an inverted gate. Undo a previous switch, sometimes after returning through an earlier chamber.
- The abstract room moves and lever flips are reversible; return to an earlier circuit state. All rooms have continuous floors and there is no lethal terrain.

## Shortcuts that were closed

Two scripts attempt the obvious bypasses: go straight to the exit, and perform the intended route without undoing any lever. Both fail at a closed gate. A door reaches from floor to ceiling; separate galleries exclude head stacks and partner doorstops. Standing in one's own door cannot help another actor cross the rock. The levers are away from the gate threshold, so holding a closing gate under one's own body cannot allow operation of a lever from both sides.

## Kinship with the campaign

Compare the gate interlocks of Interlock and Eclipse. Those levels combine physical jobs; here the puzzle is the reversible global circuit itself, with a non-monotone plan across isolated galleries. The novelty is not the number of gates, but a switch state which must be undone and reconstructed to let others reach the next state.
