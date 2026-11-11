# Thermal Stair (`thermal_stair`) — Fire + Water + Air

**Introduces:** climbing a draught you can only leave sideways. In this simulation a rider gains
height only while they are not steering, so pressing a direction is both how you get out of the
shaft and how you stop going up. The two ways out are at different heights, and one of them is a
window you have to take.

## The intended solution

1. **Air** walks into the shaft and lets go of the controls. The draught lifts it a tile every ten
   ticks.
2. Four tiles of the left wall — rows 10 to 13 — are the mouth of the lower chamber. Air presses
   left while its feet are inside those four tiles and drifts out onto the chamber floor. Press too
   early and it bumps the wall and keeps rising; too late and it sails past.
3. Air throws the lever there: the first gate in the hall opens and latches.
4. Air steps back into the shaft and lets go again. This time it rides to the very top, where the
   draught holds it under the roof with nothing to time at all, and steers right into the upper
   chamber for the second lever and the second gate.
5. Air walks to the chute at the far side of the upper chamber and drops back into the hall.
6. Meanwhile **Fire** has melted the ice across the hall and **Water** has hopped over it and put
   out the flames behind. With both gates latched, all three walk to their doors.

## Why each player is needed

- **Air** is the only one the draught lifts — its fan factor is three times Fire's and Water's and
  this draught is set to the gentle 0.9 — so both levers are its alone, and the gates they open are
  the only way down the hall.
- **Fire** melts the ice and **Water** puts out the flames; both barriers are three tiles tall under
  rock and sit in series in front of the gates.

## Likely failures and how players recover

- **Missing the lower chamber.** You keep going up. Take the top chamber instead, walk to the chute,
  drop into the hall, and ride again — the draught never stops and nothing is lost but the trip.
- **Steering the moment you enter the shaft.** You never leave the floor. Let go and start again.
- **Trying to come back down the shaft.** You cannot: the draught is stronger than you are. The
  chute from the upper chamber is the only way down, which is why it is there.
- The window at the lower chamber is four tiles — about two thirds of a second — and missing it has
  no cost beyond a second lap.

## Shortcuts that were closed

- The shaft is walled from row 6 to row 14 on both sides apart from the two chamber mouths, so there
  is nothing to jump to and no way to climb it without the draught.
- Fire and Water are not lifted at 0.9 at all, so neither can follow Air up, with or without a boost
  from the other's head.
- Both gates are latched, so Air does not have to be anywhere in particular once it has thrown them.
- The chute is one tile wide and seven deep: from the hall floor its lip is far beyond any jump.

## Kinship with the campaign

Updraft and Thermals both put a player in a draught, and both are about getting *up*. This one is
about getting *out*, and about the fact that the control that steers you is the same control that
stops you climbing.
