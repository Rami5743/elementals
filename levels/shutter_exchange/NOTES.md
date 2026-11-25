# Shutter Exchange

**Introduces:** Two wide horizontal shutters are complementary. Each is simultaneously a floor for the upper gallery and a wall for the lower gallery. The players must hand over the live selector and exchange which gallery can cross which gap.

## The intended solution

1. With both selector keys off, shutter A is a bridge and B is open. Fire crosses A on top and enables the upper middle key.
2. A retracts and B closes. Water crosses A through the lower gallery and enables the lower middle key. Fire releases the upper key while Water keeps B closed.
3. Fire crosses B above and operates the far relay. Water releases the lower key, opening B below, crosses it and operates the far return permission.
4. Water returns across B below, enables the lower key, and Fire crosses B above. Fire enables the upper key; Water releases its key and crosses A below to obtain the left key.
5. Fire releases the upper key, crosses A above, and obtains the other left key. Those two permissions latch the final upper gate.
6. Repeat the outward handoff: Fire crosses A and enables the upper key, Water crosses A below and takes over, Fire releases the upper key and crosses B above. Fire passes the final gate and opens Water's last passage.
7. Water releases the lower key and crosses B to reach its exit. The exit contact latches Fire's final home gate.
8. Water must leave its own exit and return to the lower selector. Enable it to allow Fire to cross B above, then release it once Fire reaches the middle. Fire crosses A above to its exit; Water crosses B below and returns to its own exit.

## Why both players are needed

The selector's live state controls both layers in opposite ways. Each player must relinquish a key while its partner retains the appropriate bridge. Fire's far relay and both left keys are required, and Water's exit contact provides Fire's last permission. Both idle-at-exit tests fail.

## The insight

An open door is not necessarily a useful passage: opening a shutter destroys the bridge above it while opening the route beneath it. The two shutters are one shared resource with complementary uses. The live selector must be handed over rather than just switched on once.

## Likely failures and recovery

Releasing the upper selector too early removes the bridge needed by Fire. Keep the lower key on until Fire crosses. Retaining the lower key blocks Water's crossing below B; switch it off after Fire is safe. Falling through an open shutter is not lethal. The lower gallery has a solid floor, and the one-way ledges near the left bank permit returning to the upper gallery. Both shutters can be repeatedly reset and all recorded permissions latch. The complete continuous-physics state space has not been exhaustively explored.

## Shortcuts

Direct walking, releasing the upper key without the lower handoff, and retaining the lower key during the lower crossing all fail in the engine. The five-tile-high shutter spans the lower route while closed; neither closed shutter is a passage below. No timed crossing or precision jump is required by the intended solution.

## Kinship with the campaign

Wide doors and complementary gates are familiar components, but the same physical object here is a traversable floor above and a blocking wall below. The key handoff, reverse traversal, and temporary departure from an already reached exit distinguish this from a simple inverted-door relay.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 52.87 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 48.07 s; par: 121 s. All kit simulation checks passed without warnings.

