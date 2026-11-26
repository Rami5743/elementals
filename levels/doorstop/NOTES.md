# Doorstop — design (draft, before JSON)

Group: Earth + Air. Motor challenge off.

**Core:** each home is behind an airlock with no room in it: the outer door is open only while
the inner one is shut, so the only way through is to shut the outer door on something on purpose
and push it ahead of you. The door stops at that thing's height: a boulder (30 px) lets Earth under
it, a crate (28 px) lets only Air.

**New idea key:** `airlock-with-no-room`.

## Parts

- Earth's home (west) behind Do_E (outer, open while Earth's lever is OFF) and Di_E (inner,
  open only while BOTH levers are ON), at the end of a one-tile mud tunnel. Earth's lever L_E is in
  that tunnel, six tiles from the doors, so only Earth can throw it.
- Air's home (upper east) behind Do_A / Di_A, wired the same way to Air's lever L_A, at the end of a
  one-tile mist tunnel. L_A is on Air's upper floor, reached only by a 0.9 updraft.
- The boulder is in a pen behind gate Z (open while L_A is ON) and rolls out when it opens.
- The crate is in Air's tunnel behind gate Y (open while L_E is ON).

## Intended order

1. Earth throws L_E ON: gate Y frees Air's crate (Earth's own outer door shuts — harmless now).
2. Air rides the draught up, pushes the crate along the mist tunnel into its outer doorway (it stops
   against the shut inner door, exactly in the slot).
3. Air throws L_A ON: Z frees the boulder; Air's outer door shuts on the crate (28 px).
4. Earth's outer door is shut (its lever is ON). Earth throws L_E OFF again (the undo), pushes the
   boulder down the mud tunnel into its doorway, throws L_E ON: the door shuts on the boulder at 30 px.
5. Both levers ON: both inner doors open. Each pushes its wedge home ahead of it.

The mirror order (Air throws first, Earth goes home first, Air undoes its lever) also works.

## Why each is needed

Earth: the only one who can enter mud, throw L_E (Air's crate and Air's inner door), push the boulder.
Air: the only one who can ride the draught, enter mist, throw L_A (the boulder and Earth's inner door).

## Wrong plans

- Throw your lever before your wedge is in the slot: the outer door shuts on nothing. Throw it back.
- Leave Earth's lever ON after freeing the crate and try to wedge: Earth's outer door is shut. The
  lever that freed the crate has to be undone before Earth can use its own door.
- Stand in your own doorway as the doorstop: your lever is six tiles away; your partner cannot
  reach it (it is in your liquid).
