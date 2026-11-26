// The vocabulary a level's design is described in.
//
// An IDEA is something a player could notice and describe: what the level is *about*. Ingredients
// — ice walls, turbines, cracked floors, liquids — are not ideas, and repeating them freely is
// fine. Two levels for the same player count may share ideas, but not the whole combination.
//
// Coining a new key is allowed and welcome: a key that is not in this table is, by definition, an
// idea nothing else has used. Add it here when you do, with a one-line note.
export const IDEAS = {
  // --- things a level can be about -------------------------------------------------------------
  'belt-filter': { kind: 'spine', note: "A belt whose speed sits between two elements' run speeds, so some can walk against it and some never can." },
  'belt-reverse': { kind: 'spine', note: 'One player decides which way everyone else is carried.' },
  'belt-cargo': { kind: 'spine', note: 'The belt moves an object, not a person: it has to be loaded, intercepted or let go at the right place.' },
  'hop-beats-belt': { kind: 'spine', note: 'A hop breaks contact with a belt that cannot be walked against.' },
  'lift-as-floor': { kind: 'spine', note: 'The lift platform is also the floor of a corridor, so sending it away takes the road with it.' },
  'lift-press': { kind: 'spine', note: 'A lift used as a jack: it raises an object into a switch hanging in mid-air.' },
  'lift-loop': { kind: 'spine', note: 'A loop lift that will not wait: boarding and unloading inside the pause.' },
  'lift-corner-path': { kind: 'spine', note: 'A shuttle whose path turns a corner, so it is bridge and lift at once.' },
  'fan-band': { kind: 'spine', note: 'One updraft that does something different to each element.' },
  'fan-passenger': { kind: 'spine', note: 'An updraft strong enough only if it carries the right pair.' },
  'glide-dismount': { kind: 'spine', note: 'Stepping off Air in mid-glide, which reaches a place Air itself cannot.' },
  'glide-passenger': { kind: 'spine', note: 'Air carries somebody across a gap nobody else can cross.' },
  'seesaw-balance': { kind: 'spine', note: 'A plank whose heavier half sinks: weight has to be arranged, and moving changes it.' },
  'pound-chain': { kind: 'spine', note: 'Several cracked floors stacked or offset, broken in one descent.' },
  'pound-to-move': { kind: 'spine', note: 'Pounding the floor out from under an object instead of under yourself.' },
  'boulder-float': { kind: 'spine', note: 'A boulder rests on the surface of a liquid; pushed in, it becomes floor.' },
  'rope-keeps-the-jumper': { kind: 'spine', note: 'A pulley goes on counting the weight of whoever jumped off it until they land somewhere else, so a draught that stops them landing keeps the rope loaded with nobody aboard.' },
  'boulder-carry': { kind: 'spine', note: 'Something that falls on a player rides on their head until a low roof scrapes it off.' },
  'one-way-press': { kind: 'spine', note: 'A closing door is the only thing that pushes an object through a one-way tile.' },
  'one-way-drop': { kind: 'spine', note: 'Down drops you through a ledge: a route that only runs one way.' },
  'freeze-bridge': { kind: 'spine', note: 'A pool frozen for a set time: the crossing is a countdown.' },
  'freeze-invert': { kind: 'spine', note: 'Ice until Water stands on the pad, and ice again the moment Water steps off.' },
  'invert-door': { kind: 'spine', note: 'A switch that shuts something as it opens something else.' },
  'quorum': { kind: 'spine', note: 'A gate that needs several keys on at once, so the holders cannot also be the runners.' },
  'shared-switch-two-gates': { kind: 'spine', note: 'One switch drives two barriers, so the ground between them has to be run.' },
  'timed-window': { kind: 'spine', note: 'A timed trigger and a distance: the window is the puzzle.' },
  'hold-switch': { kind: 'spine', note: 'A switch somebody has to keep holding, so that player cannot be the one who goes.' },
  'object-as-permanent-switch': { kind: 'spine', note: 'A crate or boulder stands in for the player who would otherwise have to stay put.' },
  'head-stack': { kind: 'spine', note: "A human ladder: a jump from a partner's head reaches a tile higher than any jump." },
  'turbine-out-of-reach': { kind: 'spine', note: 'A switch only one element answers to, placed where that element cannot get on its own.' },
  'torch-bridge': { kind: 'spine', note: 'A torch wired to something that exists only while it burns.' },
  'wide-door': { kind: 'spine', note: 'A door that opens sideways: a wall that becomes a bridge, or the reverse.' },
  'dark': { kind: 'spine', note: 'The level is dark; lit torches are the only light, and the map has to be learned.' },
  'liquid-lane': { kind: 'spine', note: "Each element wades its own liquid to something the others need." },
  'lock-per-element': { kind: 'spine', note: 'One barrier per element, each opened by exactly one of them.' },
  'crate-step': { kind: 'spine', note: 'A crate pushed into place as the step that makes a height reachable.' },
  'low-roof-no-jump': { kind: 'spine', note: 'A corridor one tile high: nobody can jump in it at all, so the answer must be a floor.' },
  'trigger-from-above': { kind: 'spine', note: 'A switch worked from one storey to open a route on another.' },
  'machine-strands-operator': { kind: 'spine', note: 'Whoever works a machine cannot leave the place they worked it from.' },

  // --- what makes it hard to think about -------------------------------------------------------
  'twist-stranding': { kind: 'twist', note: 'Whoever is stranded has to be freed by what their own work opened.' },
  'twist-undo': { kind: 'twist', note: 'Something switched on has to be switched off again before the level can end.' },
  'twist-sacrifice': { kind: 'twist', note: 'A resource is spent: once used, that route or object is gone for good.' },
  'twist-two-clocks': { kind: 'twist', note: 'Two timers that only work if they overlap.' },
  'twist-backwards': { kind: 'twist', note: 'A machine has to be used for the opposite of what it looks like it is for.' },
  'twist-order': { kind: 'twist', note: 'The order is forced and not obvious: one step makes an earlier one impossible.' },
  'twist-self-block': { kind: 'twist', note: 'The thing that helps you is also what is in your way.' },
  'twist-setup': { kind: 'twist', note: 'Nothing can be attempted until a long setup is finished, and it cannot be undone.' },
};

/** Ingredients, as opposed to ideas: repeating these is free and is never a novelty problem. */
export const SUPPORTS = [
  ['icewall', ['ent:ice'], 'Ice three tiles tall under rock: Fire only.'],
  ['firewall', ['ent:firewall'], 'Flames three tiles tall under rock: Water only.'],
  ['cracked-floor', ['ent:cracked'], 'A cracked floor: Earth only.'],
  ['turbine', ['ent:turbine'], 'A turbine: Air only, wherever it is.'],
  ['heavy-plate', ['opt:heavy-plate', 'ent:plate'], 'A heavy plate: Earth, a boulder, nothing lighter.'],
  ['own-liquid', ['tile:lava', 'tile:mud', 'tile:mist'], "A stretch of one element's own liquid."],
  ['crate-weight', ['ent:box', 'ent:plate'], 'A crate holding something down.'],
  ['torch-trigger', ['ent:torch'], 'A torch as a trigger only Fire can set off.'],
  ['lever-relay', ['ent:lever'], 'A lever somewhere only one player can reach.'],
];

export const TERRAIN = [
  ['sludge-pit', ['tile:sludge'], 'Sludge: lethal to everyone, so a fall is a real loss.'],
  ['water-channel', ['tile:water'], 'Open water: Water wades it, everyone else drowns.'],
  ['lava-moat', ['tile:lava'], 'Lava: Fire wades it.'],
  ['mud-bed', ['tile:mud'], 'Mud: Earth wades it.'],
  ['mist-shaft', ['tile:mist'], 'Mist: Air wades it.'],
  ['slopes', ['tile:slope'], 'Slopes: things roll, and a run-up gets longer.'],
  ['one-way-ledges', ['tile:one-way'], 'One-way ledges: up through them freely, down only on purpose.'],
  ['low-roof', [], 'A corridor one tile high.'],
  ['tall-shaft', [], 'A vertical shaft several storeys deep.'],
  ['two-storeys', [], 'An upper and a lower route that see each other but do not connect.'],
];

// Coined while building the six levels of 2026-11-11.
Object.assign(IDEAS, {
  'two-is-not-heavy': { kind: 'spine', note: 'A heavy plate takes max(mass), not the sum: two light players standing on it together do nothing, so the weight has to be fetched.' },
  'switch-in-mid-flight': { kind: 'spine', note: 'A plate hanging in the air over a gap, armed only by passing through it mid-jump.' },
  'door-pushes-you-through': { kind: 'spine', note: 'A closing door pushes a player down through a one-way tile — the only way down there, and you cannot do it to yourself.' },
  'climb-then-steer': { kind: 'spine', note: 'In an updraft you rise only while you do not steer, so leaving at the right floor means giving up the climb at the right moment.' },
  'trip-plate-in-the-shaft': { kind: 'spine', note: 'A plate hanging in a lift shaft, pressed by the rider for as long as the lift takes to carry them past it.' },
  'partner-builds-your-landing': { kind: 'spine', note: 'The place you are going to does not exist yet: a partner has to put it there while you are already in the air.' },
  'counterweight-you-must-remove': { kind: 'spine', note: 'A gate held open by the weight of the very thing the rest of the level needs, so going on means shutting it.' },
  'no-hands-for-cargo': { kind: 'spine', note: 'A boulder in a group with no Earth: nobody can push it, so a machine is the only thing that can move it, and where it stops is decided by a switch.' },
  'sink-as-a-timer': { kind: 'spine', note: 'A draught too weak to lift but strong enough to slow a fall: the long sink past a column of switches is the window a partner crosses in. (Campaign: Slow Fall.)' },
  'feed-the-engine-mid-ride': { kind: 'spine', note: 'A machine that runs only for a moment after each touch, so the rider has to keep leaving it and coming back to keep it going. (Campaign: Keep It Spinning.)' },
  'tower-presses-a-column': { kind: 'spine', note: 'Switches stacked up a wall that nothing but a tower of players reaches, with the order of the tower forced by what stands at the bottom. (Campaign: Totem.)' },
  'lift-sorts-by-weight': { kind: 'spine', note: 'A lift that can be told to stop for heavy loads and carry light ones past, so who gets off where is a setting rather than a choice. (Campaign: Weighbridge.)' },
  'stock-before-it-seals': { kind: 'spine', note: 'A timed airlock whose two gates are never open together: everything that will be needed on the far side — partner, cargo, gems — has to be inside before the clock runs out, and the switch cannot be reached from in there.' },
  'send-one-through': { kind: 'spine', note: 'A lock that needs every hand but one held on it, so exactly one player can pass — and has to open the way back for the rest from the far side.' },
});

// Coined while building Dumbwaiter (2026-11-16).
Object.assign(IDEAS, {
  'hoist-one-way-for-cargo': { kind: 'spine', note: 'A lift that runs up through a one-way grating: whatever it carries is scraped off on the grating when the lift goes back down, so the hoist delivers upward and only upward. People can drop back through after it; cargo never can, so anything sent up is up for good, and every job it still owed the floor below has to have been done first.' },
  'lift-sheds-its-load': { kind: 'spine', note: 'A lift that rises through a one-way grating is a delivery chute, not a shuttle: it cannot put anything down while it is holding it, and only the trip back down leaves the load standing on the grating. People step off at the top and drop back through at will, so the route is two-way for them and one-way for cargo — and raising the lift again picks the cargo straight back up off whatever it was resting on.' },
  'single-file-stone': { kind: 'spine', note: 'A boulder in a corridor one tile high is an absolute wall that only Earth can move and only ever forwards, so the one stretch of raised roof is the only place anybody can get past it: where the stone is parked decides who can be on which side of it.' },
  'stand-aside-is-the-switch': { kind: 'spine', note: 'In a corridor where nobody can pass anybody, the one place to get out of the walking line is a shelf above it \u2014 and that shelf is the switch, so standing aside and holding the far door open are the same act, and whoever does it cannot be the one who goes.' },
});

// Coined while building Single File (2026-11-16).
Object.assign(IDEAS, {
  'no-overtaking': { kind: 'spine', note: 'A corridor one tile high is one body wide as well: nobody can jump in it and nobody can hop over anybody, so a party inside it is a queue. The order you file in is the order you are stuck with; the only way to change it is to walk the whole corridor back out; and anyone who comes round from the far end can only ever join at the back. That decides who can reach which switch in the corridor, and so who holds and who goes.' },
});

// Coined while building Steelyard (2026-11-24).
Object.assign(IDEAS, {
  'unload-the-pan-you-ride': { kind: 'spine', note: "A seesaw used as the only route between three storeys, one flush with each of its positions. Only the heavier pan is ever at floor level, so the far pan can never be loaded from below: a weight has to be put on your OWN pan to send theirs up to the storey where it can be loaded at all, and that same weight has to be shed again before your pan will carry you anywhere. You rise by what is taken off, never by what is added. (The campaign's scales — Assay, Counterpoise — sum weights too, but to balance a pan under a floating plate or to hoist cargo past a ledge; here the sum decides which storey each of you can reach, and the beam has no switch and no wiring at all.)" },
  'mass-adds-on-the-beam': { kind: 'spine', note: "A seesaw compares the SUM of everything on each pan — bodies, cargo, riders standing on other riders — while a heavy plate reads only max(mass), the heaviest single thing on it. The same two bodies are worth 3 to the beam and 2 to the plate; two crates weigh exactly what Earth weighs; and the stone that is merely one side of a sum on the beam is an unforgeable key on the pad. (Campaign: Assay, Counterpoise.)" },
});

// Coined while building Backshunt (2026-11-16).
Object.assign(IDEAS, {
  'two-stops-no-middle': { kind: 'spine', note: 'A conveyor with no off switch, only a direction: the one load it carries is always being driven against one buffer stop or the other and is never anywhere in between. Each stop is a switch, so the two machines wired to them can never both be powered — the lever does not turn anything on, it decides which end of the level has power. Everything one end owes has to be finished before the stone can be spent on the other, and the end the level has to finish in is not the end it has to be worked in.' },
});

// Coined while building Flyover (2026-11-24).
Object.assign(IDEAS, {
  'two-in-the-air-at-once': { kind: 'spine', note: "A lock that counts bodies off the ground: its plates hang in a draught where nobody can stand, one above the other, so each is on only while somebody is in flight inside it, and the door wants both at the same moment. Nobody can be in two of them, so the party has to launch together on a count \u2014 and because a draught turns a jump from half a second into a slow sail, their overlap is a window a fourth player can walk through. The weight that starts the draught is the one body the draught will never lift, so the player who needs the door is the player who can never be one of the two in the air." },
});

// Coined while building Headlong (2026-11-24).
Object.assign(IDEAS, {
  'dive-ahead-of-the-runaway': { kind: 'spine', note: 'A rolling boulder holds 4 px a tick and nobody runs faster than 3.4, so once it is loose it can never be caught from behind: whoever is going to stop it has to already be standing in its path. And the one switch that looses it is the same switch that opens the only way down to that path, so nobody can be waiting there in advance \u2014 the way to get in front of the stone is to let it go first and then throw yourself down after it, arriving by falling because falling beats any road.' },
});

// Coined while building Threshold (2026-11-24).
Object.assign(IDEAS, {
  'threshold-is-a-switch': { kind: 'spine', note: "A plate under an exit, so standing in your own front door is a switch. Arriving home is not the end of a player's job but the start of it: the one machine in the level is powered by a body in a doorway, that body can never step out again, and the party has to work out who is going to spend the level being the power supply \u2014 and has to get that player to that doorway by a route only they can take before anybody else can move at all. Turned round at the end: the last thing to do is to give up the switch holding a partner's gate open, because a door that shuts on somebody already standing in their own exit costs nothing." },
});

// Coined while building Makeweight (2026-11-24).
Object.assign(IDEAS, {
  'plank-sums-plate-maxes': { kind: 'spine', note: "The game's two weighing machines disagree about what a crowd weighs. A heavy plate reads max(mass) and ignores riders, so two light players on it are worth one light player; a balance plank reads the sum of each half, recursively through heads, so two of them weigh exactly what Earth weighs and three outweigh Earth. The same bodies are therefore interchangeable with the stone on the scales and worthless on the lock, which decides which of the two jobs the one heavy player has to do in person. And because inequality gives the same full swing whatever the margin, the plank has only three states, of which 'level' is an exact arithmetic coincidence rather than anything a switch can cause." },
});

// New ideas developed on the gpt branch.
Object.assign(IDEAS, {
  'reversible-switch-maze': { kind: 'spine', note: 'A distributed switch circuit is itself the puzzle: an on/off key opens one route while closing another, so the players must rewind a prior circuit state and move back through the maze to reconstruct the next one.' },
  'cargo-as-clock-contact': { kind: 'spine', note: 'A single moving heavy object is the electrical contact: its endpoints are mutually exclusive sustained signals, and crossing the intermediate contact is a physical clock pulse. Two relay chains must be armed before that pulse can be used.' },
});

Object.assign(IDEAS, { "position-as-volatile-key": {kind:'spine',note:"Player position is a temporary key, whereas a jointly activated latch retains permission after the players leave. The puzzle is to trade temporary occupancy for permanent permission and recover the earlier positions."} });

Object.assign(IDEAS, { "balanced-rope-memory": {kind:'spine',note:"With the snatch block engaged, a stone alone balances the rope at whichever height was previously written. A rider adds weight to write the low state, and removing mechanical advantage erases it. Restoring the ratio after unloading retains the high state."} });

Object.assign(IDEAS, { "expiry-order-is-key": {kind:'spine',note:"Timers overlap to record permission, then one expires while the other remains active. A complementary signal and a live timed signal are the two halves of the exit key."} });

Object.assign(IDEAS, { "grating-memory-with-erase": {kind:'spine',note:"An elevator writes a stone onto a one-way grate; a separate closing press erases it by pushing the stone through after the elevator is removed. Two heavy contacts alternate, storing the previous physical state rather than merely following a switch."} });

Object.assign(IDEAS, { "two-stage-piston-handoff": {kind:'spine',note:"Two adjacent sideways doors form a sequential ram: the short piston must transfer the cargo into the long piston's range while it is retracted. Closing the long piston prematurely blocks the transfer. A returning belt makes the three stationary contact states reusable."} });

Object.assign(IDEAS, { "transport-power-excludes-workshop": {kind:'spine',note:"One switch powers a ferry and closes the workshop gate on its far bank. Dock, stop the machine to enter, relinquish the far position, and restart the machine to get back; the transport and access permissions are incompatible."} });

Object.assign(IDEAS, { "shutter-floor-wall-duality": {kind:'spine',note:"A wide horizontal shutter is a floor above and a wall below; complementary shutters require a live key handoff so a bridge for one gallery does not obstruct the other gallery's route."} });

Object.assign(IDEAS, { "shuttle-strips-cargo-to-belt": {kind:'spine',note:"An overhead shuttle passes under a closed shutter which blocks its cargo, stripping the load onto a lower belt. The belt and loading stop recover the cargo for a subsequent intact delivery; high and low deliveries serve distinct requests."} });

Object.assign(IDEAS, { "wind-off-enables-descent": {kind:'spine',note:"A running upward fan prevents reaching a side balcony; temporarily disable it, then restore it for return ascent."} });

Object.assign(IDEAS, { "cargo-power-cascade": {kind:'spine',note:"A physical cargo contact supplies another independently enabled cargo lift. Raising the upstream load cuts power to the downstream lift, and lowering the upstream load automatically restarts it. The alternating high and low contacts become different permissions."} });

Object.assign(IDEAS, { "obstruction-as-third-state": {kind:'spine',note:"A retractable obstruction deliberately stalls a powered cargo hoist at an intermediate sensor. Releasing the obstruction, without changing the lift command, resumes its travel. The binary command becomes a three-state machine."} });

Object.assign(IDEAS, { "brake-makes-transit-contact-stable": {kind:'spine',note:"A controllable loop shuttle with a heavy cargo must be braked in two intermediate contact zones. Gates require both braking and the contact, so merely passing through is useless. The final complementary gate demands releasing the second parked state."} });

Object.assign(IDEAS, { "convergent-belt-seam": {kind:'spine',note:"Independent reversible conveyors meet at a seam. Inward currents gather one cargo token at the seam, outward currents retain its previous endpoint, and aligned currents transfer it to the opposite endpoint."} });

Object.assign(IDEAS, { "ratio-reverses-paired-cargo": {kind:'spine',note:"Fixed cargo on both rope pans is unequal in weight. A selectable snatch block reverses which pan is heavier, producing two complementary pairs of stationary sensor permissions with unequal excursions; no rider or balance memory is needed."} });

Object.assign(IDEAS, { "hoist-unloads-comparator": {kind:'spine',note:"Two independent hoists lift loads away from a seesaw, so either imbalance and the loaded centered state give distinct paired contacts; an empty centered plank is not equivalent to a loaded one."} });

Object.assign(IDEAS, { "direction-qualified-transit-contact": {kind:'spine',note:"The same physical mid-track sensor supplies different permissions on the outward and return strokes of a powered shuttle: the first is qualified by the live power pulse and the second by a far-bank certificate and the expired power. No second sensor or brake can substitute."} });

Object.assign(IDEAS, { "three-load-rope-control": {kind:'spine',note:"A ballasted pulley has three rider-load regimes: two light riders lower it, one balances it, and no riders reverse it. The middle regime retains the elevated contact while one operator works remotely; unloading transfers the same counterweight to a complementary contact."} });

Object.assign(IDEAS, { "spatial-clock-phase-rendezvous": {kind:'spine',note:"Two independently launched cargo shuttles with different travel times must overlap their physical contacts; their relative launch phase is the key, and both must eventually return home."} });

Object.assign(IDEAS, { "causeway-as-veto": {kind:'spine',note:"A floating boulder is both a reusable physical bridge and an electrical veto that closes another route, forcing the original approach permit to be repeatedly withdrawn and restored without removing the bridge."} });
// Coined while building Crawlspace (2026-11-25).
Object.assign(IDEAS, {
  'pound-needs-headroom': { kind: 'spine', note: "A ground pound is a jump first: measured, Earth standing on a cracked panel with one tile of roof cannot leave the ground at all, so there is never an airborne Down press and the floor is simply unbreakable, while two tiles are enough. A cracked panel in a crawl therefore cannot be opened by the player who owns it, only by whoever can take the ceiling away — and when that ceiling is the floor of the storey above, giving Earth the room to pound means pulling the party's own road out from under them. The barrier is neither the floor nor the roof but the distance between them." },
});

Object.assign(IDEAS, { "drop-reconfigures-circuit": {kind:'spine',note:"A cracked floor permanently transfers a cargo from a stationary upper contact to a separate reversible lower conveyor register, so the old permissions must be recorded before the circuit is reconfigured."} });

Object.assign(IDEAS, { "moving-veto-silence": {kind:'spine',note:"A gate is closed by any of several spatial veto contacts and opens only in the intersection of two cargo objects' contact-free intervals; a third participant crosses during that temporary silence."} });

Object.assign(IDEAS, { "fractional-rider-keeper": {kind:'spine',note:"Air's half-unit rope weight exactly balances a ballasted pan; Fire's full unit moves it and then leaves to perform a Fire-only task, while Air alone retains the mechanical permission."} });
// Coined while building Doorstop (2026-11-26).
Object.assign(IDEAS, {
  'airlock-with-no-room': { kind: 'spine', note: "Two doors back to back with no room between them: the outer one is open only while the inner one is shut, so nobody can ever stand between them and nobody can hold either one open for a partner. The only way through is to shut the outer door on purpose on something lying in its doorway and push that thing ahead of you when the inner door opens — and a door that closes on something stops at its height: a boulder's 30 px lets Earth under, a crate's 28 px only Air, and only someone who fits under it can push the wedge on. The shut inner door is also the stop that keeps the wedge from being pushed too far in." },
});
// Coined while building Chockstone (2026-11-25).
Object.assign(IDEAS, {
  'stone-held-from-below': { kind: 'spine', note: "A rolling boulder holds 4 px a tick and nobody runs faster than 3.4, so the only thing that ever stops one is a body already standing in its path \u2014 and it comes to rest in the cell immediately UPHILL of that body, one row up, never on their head. A heavy plate hung in that cell is therefore an unforgeable key: the body standing under it is too light to press it and cannot climb to it, and the one who pushed the stone can never park it there, because you push from above and hold from below and nobody can be both. The eight ticks a free-rolling stone spends crossing the cell are far too few for anything that has to stay open long enough to walk through. And because the stone rolls on the instant the brake steps aside, and follows the brake downhill, one stone can be walked from a high berth to a lower one but never back up without Earth: gravity fixes the order of the berths, and giving up the high one is the price of the low." },
});
