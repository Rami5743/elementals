# Crossed Signals

**Introduces:** A reversible switch maze: the same remote lever is both a key and a lock, so you must deliberately rewind the circuit to finish.

## The intended solution

The state is the room occupied by each player and the on/off setting of the levers. Gates use AND, OR and their inverses. Neither a permanently increasing collection of keys nor a simple relay in one direction will work. The planned route was obtained by breadth-first search over room and switch states: 48 actions, including 22 lever operations. There are no timed gates. Each lever is labelled with a letter in the map; gate IDs below are zero-based gallery/position numbers, in the order from spawn to exit. The two galleries are folded over two storeys each; ride the lift in either direction as needed. The lift dwells at each end, and a missed trip is recoverable.

1. Water: flip lever D.
2. Fire: flip lever E.
3. Water: cross gate 1/0.
4. Fire: flip lever E.
5. Fire: cross gate 0/0.
6. Fire: flip lever A.
7. Water: flip lever I.
8. Fire: cross gate 0/1.
9. Fire: flip lever C.
10. Fire: cross gate 0/1.
11. Water: flip lever I.
12. Fire: cross gate 0/0.
13. Fire: flip lever E.
14. Water: cross gate 1/1.
15. Fire: flip lever E.
16. Water: flip lever G.
17. Fire: cross gate 0/0.
18. Fire: cross gate 0/1.
19. Fire: flip lever C.
20. Fire: cross gate 0/1.
21. Water: flip lever G.
22. Fire: cross gate 0/0.
23. Fire: flip lever E.
24. Water: cross gate 1/2 using the shuttling lift.
25. Water: cross gate 1/3.
26. Water: flip lever B.
27. Fire: flip lever E.
28. Fire: cross gate 0/0.
29. Water: cross gate 1/3.
30. Water: cross gate 1/2 using the shuttling lift.
31. Water: flip lever G.
32. Fire: cross gate 0/1.
33. Fire: cross gate 0/2 using the shuttling lift.
34. Water: flip lever G.
35. Water: cross gate 1/2 using the shuttling lift.
36. Water: cross gate 1/3.
37. Water: flip lever B.
38. Fire: cross gate 0/3.
39. Water: flip lever B.
40. Fire: flip lever H.
41. Water: cross gate 1/3.
42. Water: cross gate 1/2 using the shuttling lift.
43. Water: flip lever G.
44. Fire: cross gate 0/4.
45. Water: flip lever G.
46. Water: cross gate 1/2 using the shuttling lift.
47. Water: cross gate 1/3.
48. Water: cross gate 1/4.

Finally, go to the exits and collect the gems on the way. The tested replay takes 94.3 seconds; par is 236 seconds.

## Why each player is needed

- **Fire:** controls levers A, C, E, H in its isolated gallery; the other elements cannot enter that gallery.
- **Water:** controls levers B, D, G, I in its isolated gallery; the other elements cannot enter that gallery.

The real simulation's idle-at-exit test fails for every element. No player is a passenger. The rock between galleries reaches both ends, so a partner cannot substitute for a lever operator.

## The insight

Opening a gate is not progress if the new state closes the gate you will need next. The complementary and quorum gates form a single distributed memory: cross, return, change the key, and cross again. The shared resource is the circuit state; different players need incompatible settings. The solution changes the map repeatedly, rather than clearing independent obstacles in sequence.

## Likely failures and how players recover

- Walking straight to the exits fails at a closed gate. Return to a reachable lever and trace its wires.
- Leaving every lever on fails at an inverted gate. Undo a previous switch, sometimes after returning through an earlier chamber.
- The abstract room moves and lever flips are reversible; return to an earlier circuit state. A lift that leaves before boarding comes back. There is no lethal terrain.

## Shortcuts that were closed

Two scripts attempt the obvious bypasses: go straight to the exit, and perform the intended route without undoing any lever. Both fail at a closed gate. A door reaches from floor to ceiling; separate galleries exclude head stacks and partner doorstops. Standing in one's own door cannot help another actor cross the rock. The levers are away from the gate threshold, so holding a closing gate under one's own body cannot allow operation of a lever from both sides.

## Kinship with the campaign

Compare the gate interlocks of Interlock and Eclipse. Those levels combine physical jobs; here the puzzle is the reversible global circuit itself, with a non-monotone plan across isolated galleries. The novelty is not the number of gates, but a switch state which must be undone and reconstructed to let others reach the next state.
