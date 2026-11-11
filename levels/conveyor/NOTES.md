# Conveyor — notes

**Introduces:** a boulder in a group with no Earth in it. Fire and Water cannot shift a boulder
at all — it is a wall with a handle on it, and the belt is the only hand in the level.

## The intended solution

A tunnel one tile high (x 17–29, row 19) joins the two halls. The belt is its floor from 19 to
29 and runs **left only**, and only while someone holds the button at 10, in the left hall.
A boulder sits in the tunnel at 27, which is why the two halls are cut off from each other
from the first tick: nobody climbs over a boulder in a one-tile tunnel.

Above the tunnel runs a shelf (rows 16–17), with a door at its right end, x=29.

- `trip` — the wide plate at 20–24, in the tunnel — opens that shelf door.
- `weigh` — the plate at 17–18, where the belt ends — is one half of the exit gate.
- the torch in the right hall, which only Fire can light, is the other half.

1. Water takes the gem **inside the tunnel at 25 first**. Once the boulder has been moved it
   is behind the boulder for good.
2. Water holds the button and watches the boulder come left. Let go while it is over the wide
   plate: the shelf door opens.
3. Fire — sealed in the right hall all this time — lights the torch, then climbs onto the
   shelf at 29 and walks over the tunnel into the left hall.
4. Only once Fire is across does Water hold the button again. The boulder runs off the end of
   the belt onto `weigh`, the shelf door shuts behind it, and the gate — torch and plate both
   on — opens.

## Roles

- **Water** — the only one who can reach the button, so the only one who can move the boulder
  at all, and the only one who can take the tunnel gem.
- **Fire** — the only one who can light the torch, and the torch is half the gate.

## Why each is necessary

The button is in the left hall and Fire starts sealed in the right one; the torch is in the
right hall and Water can never get there. Neither can do the other's half.

## The insight

The belt runs one way and stops where you let go, so the boulder's journey is a sequence of
stops, not a destination: the first stop is for your partner, the last is for the gate. And
the same boulder that opens the shelf is what makes the shelf necessary.

## Likely failures and recovery

- **Holding the button too long on the first run.** The boulder goes straight to the end plate,
  the shelf never opens and Fire is sealed in for the rest of the game. The belt has no reverse
  — this one is a restart, and it is what the sign at 7 is for.
- **Letting go before the wide plate.** Harmless: hold again, the boulder goes on.
- **Forgetting the tunnel gem.** Two stars. It is the first thing to do, not the last.
- **Letting go while Fire is still on the shelf.** Nothing happens — the shelf door only shuts
  when the boulder leaves the wide plate, and Fire has a long walk, so wait for the word.
