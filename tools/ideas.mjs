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
  'send-one-through': { kind: 'spine', note: 'A lock that needs every hand but one held on it, so exactly one player can pass — and has to open the way back for the rest from the far side.' },
});
