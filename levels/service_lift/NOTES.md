# Service Lift (`service_lift`) — Fire + Water

**Introduces:** a plate that powers a lift, and a crate used as a permanent substitute for the
player who would otherwise have to stay behind holding it.

1. **Solution.** Water hops up for the neutral gem. Fire walks onto the parked lift; Water stands
   on the plate at the far right and the lift carries Fire nine tiles up to the gallery. Fire steps
   off; Water steps off the plate and the empty lift comes back down. Water takes the lift's berth
   and waits on it, collecting its own gem on the way up later. Fire melts the ice that shuts the
   gallery, walks to the crate behind it and rolls it the length of the gallery and off the right
   edge, where it drops onto the plate. The plate stays down for good, the lift rises with Water
   aboard, and both walk to their doors past the melted ice.

2. **Roles.** Water is the first weight on the plate and the second passenger. Fire is the first
   passenger and the only one who can melt the ice and so reach the crate.

3. **Why each is necessary.** The gallery is nine tiles above the floor. A jump reaches 2.8 tiles,
   a head-stand 3.6 and even a two-player boost only about 6.3, so the lift is the only way up and
   the lift only runs while the plate is held. One player alone can hold the plate or ride, never
   both. `check` confirms it: with Water in its door Fire is never lifted, and with Fire in its
   door the ice is never melted, so Water reaches the gallery but not its own side of it.

4. **The insight.** The plate does not care who holds it. A crate weighs the same as a player and
   never needs to leave, so the job of the player left behind can be handed to an object — but the
   crate is on the wrong side of the ice, which is why the first ride has to be Fire's.

5. **Likely failures and recovery.** Nothing in the level is deadly and the lift can be sent up
   and down as often as the pair like. The one thing to get right is that Water should be standing
   on the lift before the crate goes over the edge: if the crate lands first the lift leaves
   without Water, and Water simply steps on the plate again to bring it back. A crate pushed left
   off the gallery lands on the one-way hatch over the lift shaft rather than in the shaft, so it
   can always be pushed back.

- **Shortcuts considered and blocked.** Nothing on the ground floor is tall enough to climb from:
  the crate, once it is on the plate, is a one-tile step nine tiles short of the gallery. The ice
  is two tiles with rock from row 7 to the roof above it, so it cannot be jumped, and the gallery
  closes the only route past it. The lift shaft is capped by a one-way hatch, which a lift passes
  through but a crate does not fall into.
