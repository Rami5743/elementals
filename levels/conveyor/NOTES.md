# Conveyor (`conveyor`) — Fire + Water

**Introduces:** a belt as a one-way street for objects. People beat a belt by hopping; a crate
cannot hop, so the belt decides where the crate goes.

1. **Solution.** Fire melts the ice in the middle of the hall and takes its gem. Water follows as
   far as the hold button and leans on it: while Interact is held the belt reverses and runs
   right. With the belt running the right way Fire shoves the crate off the floor onto it, and the
   belt carries the crate the length of the trench and out onto the plate at the far end. Water
   keeps holding until the crate is completely clear of the belt, then lets go — the plate stays
   down, the gate at the left end of the hall stands open, and both walk home, Water picking up the
   two gems on its way.

2. **Roles.** Water is the button. Fire is the ice and the shove. Neither job can wait for the
   other to finish.

3. **Why each is necessary.** The button is a hold button, on only while someone is standing at it
   pressing Interact, and it is twelve tiles from the crate. Left alone the belt runs left, so a
   crate pushed onto it is carried straight back off; and a crate sitting on the floor beside the
   belt is not on the belt, so turning the belt on afterwards does nothing to it. The two jobs
   have to happen at the same moment, which takes two players. `check` confirms it: with either
   one parked in its door the crate never reaches the plate and the gate never opens.

4. **The insight.** The belt is not an obstacle to walk past, it is a tool — and a tool that only
   works while somebody else is holding the switch.

5. **Likely failures and recovery.** Letting go of the button too early sends the crate back down
   the belt, which costs a few seconds and nothing else: push it on again. The crate cannot be
   lost — the belt's left end runs out onto solid floor, not into a pit — and there is no liquid
   or deadly tile anywhere in the level.

- **Shortcuts considered and blocked.** The plate is a light one, so a player can stand on it and
  open the gate, but then that player is the one left behind: the crate is needed for whoever
  goes last, which is the whole point. Pushing the crate against a running belt is hopeless, since
  a push moves it 1.6 pixels a tick against the belt's 2. The ice is two tiles with rock to the
  roof above it, and the gate is three.
