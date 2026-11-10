# Cistern (`cistern`) — Fire + Water + Earth

**Introduces:** a gate that wants two plates down at the same time, so neither of them can be a
player — both have to be held by something that stays.

1. **Solution.** Water hops over the boulder that blocks the west end of the hall and shoves the
   crate behind it onto the light plate, then hops back over the boulder and stands clear. Earth
   takes its gem and rolls the boulder the other way onto the heavy plate. Fire melts the ice in
   the middle of the hall. Water wades the cistern — a single tile of water, deadly to the other
   two — takes the gem in it and puts out the flames beyond; with both plates down the gate
   stands open, and the three hop the cistern and walk to their doors.

2. **Roles.** Water fetches the crate and clears the flames. Earth is the only mass the heavy
   plate accepts. Fire is the only one who can melt the ice.

3. **Why each is necessary.** The gate's `required` is two: one plate alone does nothing, and the
   two weights are a crate and a boulder, so no player can substitute for either and still walk
   through. The ice and the flames are each one element's business. `check` confirms all three
   counterfactuals.

4. **The insight.** The boulder is not only a weight, it is a wall: it stands between the hall and
   the crate, so the crate has to be fetched before the boulder is moved, and the order cannot be
   reversed.

5. **Likely failures and recovery.** The cistern is one tile wide and plainly drawn; walking into
   it drowns Fire or Earth and restarts. Neither weight can be lost — both are pushed into a
   dead end at the west wall — and if the crate is left short of its plate anybody can hop the
   boulder and push it the rest of the way.

- **Shortcuts considered and blocked.** The ice, the flames and the gate all run from the floor to
  the roof. A player can stand on either plate, but then that player is not going through the
  gate, and with two plates to hold at once a three-player team would need both of the others to
  stay behind. Neither the crate nor the boulder ends up in the corridor, so neither can be used
  as a step.
