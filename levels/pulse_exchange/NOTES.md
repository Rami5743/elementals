# Pulse Exchange

**Introduces:** A single boulder is a moving electrical contact: send it to opposite ends to dispatch two relay chains, then jump through the short contact pulse on its return.

## The intended solution

1. The inaccessible belt carries the heavy stone to the right contact. This lets Fire through the first gate.
2. Fire throws its first relay. Each following player crosses its first gate and throws its own relay, in order Fire, Water, Earth. The last relay enables Fire's second gate, but the stone is at the wrong end.
3. Fire has to return to the original dispatch button and press it. This reverses the belt, taking the only power token away from the right contact.
4. Wait for the left contact; Fire can cross the second gate. Fire throws its second relay, then each following player crosses and throws the next one. The last relay arms the final gates.
5. The timed reverse signal expires. The stone starts rightward again. Everyone prepares at their final gate. The middle heavy plate opens the gates only while the stone is on it. Earth must jump the recovery pocket and cross the gate while the pulse is present; the other players walk through their gates during the same pulse.
6. Collect the gems and enter the exits. The tested replay takes 46.4 seconds, with par 117 seconds. The middle contact intervals measured in the replay were 157, 156, 156 ticks (the last may end when the replay ends).

## Why each player is needed

- **Fire:** operates the dispatch and repeat buttons, and starts both relay chains; only this player can enter its gallery.
- **Water:** passes both relay signals to the next gallery; only this player can enter its gallery.
- **Earth:** closes both relay chains and is the runner who jumps the pulse pocket; only this player can enter its gallery.

The stone is physically separated from players, so a player (including Earth) cannot hold a heavy contact or push the stone. The idle-at-exit simulation fails for each element.

## The insight

The belt, latch gates and relay quorum together are a stateful machine. The only resource is one heavy stone and the endpoint contacts cannot be held simultaneously. Rather than stay near the next gate, Fire must go back to dispatch the stone. Once the left relays are set, the same stone that was held still becomes a clock pulse on its return.

## Likely failures and how players recover

- Sending the stone left too soon prevents the right relay chain completing; the timer expires automatically and it returns. Right and left relay gates latch once opened, so progress is not lost.
- Leaving the stone at the right contact blocks the second chain. Fire can go back to dispatch it.
- Missing the middle pulse: Fire can press a repeat button from either side of the final gate. The recessed jump has a solid floor instead of a lethal liquid, and players may jump out and try again. A separate replay deliberately fell to the pocket floor, climbed back to the bank, requested a repeat pulse, and won in 47.7 s without dying.

## Shortcuts that were closed

The straight walk, omitting the reversal, and walking across the pulse pocket without jumping are scripted and fail in the real simulation. Every door reaches its ceiling. The cargo track is sealed in rock, so head-stacking, body pressure, Earth on a heavy plate, and manual pushing cannot replace the token. A closing door can rest on the runner, but a runner still has to reach it; each gallery holds only one player, so no partner can use it as a doorstop.

## Kinship with the campaign

Compare the timed crossing of Brake and the shared-weight mechanisms of Weighbridge. Here the cargo does not transport a player: it moves the only electrical contact, creating a mutually exclusive pair of sustained signals and a third, transient one. Two dependent relay chains have to be armed before the crossing pulse; the clock is a physical object rather than a second timed gate switch.
