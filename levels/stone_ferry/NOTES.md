# Stone Ferry

**Introduces:** a rolling boulder as a one-seat boat over sludge (`stone-ferry`), and a turbine's
run-down as the self-timer that lets the last operator also be the passenger (`turbine-self-timer`).

Four players, motor challenge on. Fire, Water and Air start on the west plateau; Earth starts in the
high gallery on the east side. Everybody's door is on the east bank, beyond a three-tile moat of
sludge under a two-tile roof.

## The intended solution

The stone is the only thing that crosses the moat. Liquids are floors to a rolling boulder and its
rider goes with it, so a rider standing on it when it rolls down the slope is carried over the sludge
and dropped in the landing notch on the far bank. It seats one, and it only ever goes downhill.

1. **Air spins the turbine** at the far west end. That opens the trapdoor in the gallery floor and
   shuts the gate on the slope (the gate is wired backwards). The stone, which starts on the
   trapdoor, falls down the chute, rolls and stops against the **chock**, a door that opens only
   when somebody stands on a stone resting against it.
2. **Fire hops aboard.** That unlatches the chock for good, and the stone rolls one tile further, to
   the gate. Fire gets back on top. Air keeps spinning.
3. **Air lets go.** About three seconds later the turbine stops, the gate opens, and Fire is carried
   down the slope, over the sludge and into the notch, which is the bottom of a one-tile lift.
4. **Fire hops onto the bank and stands on the call plate.** The lift carries the stone up to the
   gallery. **Earth**, waiting on the ladder top, rolls it off the lift and west along the gallery
   until it stops against the step over the trapdoor. Earth comes back over the shaft, and Fire
   steps off the plate.
5. Air spins again: the stone drops and rolls to the gate (the chock stays open now). **Water**
   climbs on, Air lets go, and Water crosses.
6. Water holds the call plate, Earth rolls the stone to the trapdoor again, and Water steps off.
7. **Air's own crossing.** Air spins, the stone drops and settles against the gate, and Air lets go
   and runs: eleven tiles along the plateau and down the slope, then a hop onto the stone, all
   inside the turbine's 200-tick run-down. The gate opens under Air and Air rides across.
8. Earth drops down the ladder ledges, and everyone walks to their door (Air, last in, has the
   nearest).

The recorded solution takes 44.3 s; par is 120 s.

## Why each player is needed

- **Air** is the only one who can spin the turbine, and the turbine is the only thing that opens the
  trapdoor. Every stone that comes back has to be dropped by Air from the west, so Air must stay
  behind until everybody else has crossed. Air can never be a brake for the stone either: a
  boulder held by Air ends up on Air's head.
- **Earth** is the only one who can push the stone, and the stone only comes back west if it is
  rolled off the lift top and along the gallery to the trapdoor.
- **Fire and Water** are passengers who each become the lift operator. The lift rises only while
  someone stands on the call plate, and Earth cannot both stand on it and push. So the player who
  has just crossed must hold the lift up while Earth takes the stone off: Fire for the second stone,
  Water for the third. `check` confirms the level cannot be finished with any one of the four idle
  in its door.

## The insight

The turbine holds the stone and letting go launches it. It looks like a starter ("spin it and the
stone goes"), but wired backwards it is a brake, and its run-down is a fuse. That is what makes the
puzzle work. Whoever drops the stones must stay behind to drop the next one, so Air has to be the
last across, and the last across has nobody to release the stone for them. The answer is that Air
releases it for Air: wind the turbine, let go, run, and be standing on the stone before it stops.
Said in one sentence: *the stone only goes downhill and only Air can let it go, so Air rows last,
racing the turbine.*

What the level asks for, against `references/difficulty.md`:

- **Dependent steps across changing states.** There are ten dependent steps over three map states:
  stone in the gallery with the chock shut; chock latched open with one passenger east; then the
  last state, where nobody but Air is west.
- **Two interacting machines.** The ferry and the return loop. The return loop needs one body on
  each bank: the next lift operator is whoever the ferry just delivered.
- **Interlock.** Every crossing spends the stone. Every return takes two people east (the operator
  and Earth) and one west (Air).
- **Counter-intuitive step.** Spinning the turbine shuts the gate, so the launch is the moment Air
  lets go, not the moment Air touches it. And the player who looks least able to cross (Air cannot
  brake, cannot be left behind) is the one who must go last.
- **One resource, several claims.** One stone and three people waiting for it.

## Likely failures and how players recover

- **Air crosses early** (it looks generous to "go first and help"). Nobody left west can spin the
  turbine, so no more stones can come back. Recovery: Air walks back up the ladder, along the
  gallery, hops up the step at its west end and drops through the hole onto the plateau. That costs
  about twenty seconds.
- **Air lets go before the rider is on.** On the first trip the chock holds the stone until somebody
  stands on it, so nothing is lost. On later trips the stone crosses empty and lands in the notch,
  and whoever is east holds the lift while Earth brings it back. It costs one return.
- **The final dash is too slow.** The gate opens with nobody aboard and the stone crosses empty.
  Fire or Water holds the lift, Earth returns it, and Air tries again. Each attempt costs one
  return, about twelve seconds.
- **Earth pushes the stone the wrong way at the lift top.** The gallery is three tiles high around
  the lift top, so Earth can hop over the stone, and the ramp at the east end rolls a stone pushed
  that far back towards the lift. Probed: pushed east onto the ramp, it rolled back, and Earth hopped
  over and walked it to the trapdoor.
- **Earth falls through the trapdoor or takes the drop hole west.** Earth's mud crawl (a one-way
  drop on the plateau, a one-tile-high tunnel with a mud floor, and two ledges up to the bank) takes
  it back east. Mud kills everyone else, and nobody can jump in a one-tile tunnel.
- **Someone stands on the landing, or holds the call plate, while a stone waits at the gate.** The
  gate will not open while anybody is on the landing or the call plate. The lift travels at 8 px a
  tick, so it is down again long before a stone that has just been let go can reach the notch.
- **Earth walks into the parked stone on the bank.** The bank is a tile higher than the landing
  notch, so Earth meets the stone's top, not its side, and cannot push it into the moat. Probed.
- **A rider falls off the slope into the sludge.** Checkpoints on the plateau and the east bank.

## Shortcuts that were closed

Each is a script in `solution.mjs` that `check` runs and that must fail:

- **Air glides the moat**, from the top of the slope and from the gate, in the window when the gate
  stands open. The two-tile roof keeps Air too low to glide three tiles of sludge; Air dies at
  x≈17.5.
- **Water jumps the moat** while the gate stands open between trips. The low roof stops the jump,
  and she comes down on the slope at x≈15.75.
- **Two riders on one stone** (Water on Fire's head). The roof over the moat leaves room for the
  stone and one rider; the gate's top scrapes Water off onto the slope.
- **Climbing to the gallery** (and so to the east) from the west: the drop hole is seven tiles
  above the plateau and the trapdoor about six and a half above the slope at the chute's foot.
  Air on one partner reaches 4.75 tiles and Air on a stack of two reaches 5.75, so neither gets
  there. Even if a stack did, it would need two partners still in the west, and they need Air to
  stay and drop stones for them anyway.
- **Standing on the stone's spot instead of the stone**: the chock needs both a heavy plate (only the
  stone or Earth) under the resting stone and a body at rider height above it. Earth is never west
  before the first trip, and the stone alone never reaches the rider-height plate.

## Kinship with the campaign

The nearest campaign level is **Ferryman** (l33): a one-seat gondola that crosses while enough
switches are on, with people starting on the wrong side. This level shares the one-seat crossing
and nothing else. Ferryman's gondola goes back and forth under power; here the boat is a boulder
that only rolls downhill and has to be hauled back by hand (Earth) through a machine on the far
side. The constraint that decides the order is not a switch count but who can release the stone:
the releaser is always left behind, and only Air's turbine can release it for Air. **Avalanche**
(l75) and this repo's Chute Council also roll a stone down a slope, but there someone runs ahead of
it or brakes it; here someone rides it.

What was tried first: a pendulum ferry, a stone in a V-shaped valley that would swing back and
forth across the moat. Measured: the stone climbs only about a tile up the far slope, swings back
once and settles floating in the sludge, so it would strand its rider. A "the brake rides last"
twist (jump straight up and the stone rolls in under you) also works in the engine, for every element
but Air. But it let anyone cross alone and removed the ordering, so the turbine took its place.
