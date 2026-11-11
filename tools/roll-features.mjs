#!/usr/bin/env node
// Roll a random set of ingredients for a new level, biased away from whatever this player count
// has already seen a lot of.
//
//   node tools/roll-features.mjs 3            # three-player level
//   node tools/roll-features.mjs 4 --seed 17  # reproducible roll
//
// The roll is a starting point, not a specification: build the level's core out of the SPINE,
// use the SUPPORTS to make the other players necessary, and let the TWIST decide what makes it
// hard to think about. Re-roll freely if a roll cannot be made into a level that makes sense.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const players = Number(process.argv[2]);
if (![2, 3, 4].includes(players)) { console.error('usage: node tools/roll-features.mjs <2|3|4> [--seed N]'); process.exit(2); }
const seedArg = process.argv.indexOf('--seed');
let seed = seedArg > 0 ? Number(process.argv[seedArg + 1]) : (Date.now() ^ (Math.random() * 1e9)) >>> 0;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);

// kind: spine (the level is about this) | support (makes one player necessary) | terrain | twist
const INGREDIENTS = [
  ['belt-filter', 'spine', ['ent:belt'], 'A belt whose speed sits between two elements\' run speeds, so some can walk against it and some never can.'],
  ['belt-reverse', 'spine', ['ent:belt', 'opt:belt:reverse'], 'mode:"reverse" + a trigger: one player decides which way everyone else is carried.'],
  ['belt-cargo', 'spine', ['ent:belt', 'ent:box'], 'The belt carries an object, not a person: it has to be loaded, intercepted or let go at the right place.'],
  ['lift-as-floor', 'spine', ['ent:elevator'], 'The lift platform is also the floor of a corridor, so sending it away takes the road with it.'],
  ['lift-press', 'spine', ['ent:elevator', 'opt:heavy-plate'], 'A lift used as a jack: it raises an object into a switch hanging in mid-air.'],
  ['lift-loop', 'spine', ['ent:elevator', 'opt:elevator:loop'], 'A loop lift that will not wait: boarding and unloading inside the pause.'],
  ['fan-band', 'spine', ['ent:fan'], 'One updraft, tuned so it lifts some elements, only gives hang time to others, and ignores Earth.'],
  ['seesaw', 'spine', ['ent:seesaw', 'opt:seesaw-range'], 'A plank whose heavier half sinks: weight has to be arranged, and moving changes it.'],
  ['pound-chain', 'spine', ['ent:cracked'], 'Several cracked floors stacked or offset, broken in one descent.'],
  ['pound-to-move', 'spine', ['ent:cracked', 'ent:boulder'], 'Pounding the floor out from under an object instead of under yourself.'],
  ['boulder-float', 'spine', ['ent:boulder'], 'A boulder rests on the surface of a liquid; pushed in, it becomes floor.'],
  ['boulder-carry', 'spine', ['ent:boulder'], 'Something that falls on a player rides on their head until a low roof scrapes it off.'],
  ['one-way-press', 'spine', ['tile:one-way', 'ent:door'], 'A closing door is the only thing that pushes a crate or boulder through a one-way tile.'],
  ['one-way-drop', 'spine', ['tile:one-way'], 'Down drops you through a ledge: a route that only runs one way.'],
  ['freeze-bridge', 'spine', ['ent:pool', 'ent:freezepad'], 'A pool frozen for a set time after the pad is left: the crossing is a countdown.'],
  ['freeze-invert', 'spine', ['ent:pool', 'ent:freezepad', 'opt:invert:pool'], 'An inverted pool: ice until Water stands on the pad, and ice again the moment Water steps off.'],
  ['invert-door', 'spine', ['ent:door', 'opt:invert:door'], 'A switch that shuts something as it opens something else — including the way you came in.'],
  ['quorum', 'spine', ['opt:required:2', 'opt:required:3'], 'A gate that needs several keys on at once, so the holders cannot also be the runners.'],
  ['timed-window', 'spine', ['ent:button', 'opt:button-timed'], 'A timed button and a distance: the window is the puzzle.'],
  ['hold-switch', 'spine', ['ent:button', 'opt:button:hold'], 'A switch somebody has to keep holding, so that player cannot be the one who goes.'],
  ['head-stack', 'spine', [], 'A human ladder: a jump from a partner\'s head reaches a tile higher than any jump.'],
  ['glide-dismount', 'spine', [], 'Stepping off Air in mid-glide, which reaches a place Air itself cannot.'],
  ['wide-door', 'spine', ['ent:door', 'opt:wide-door'], 'A wide door opens sideways instead of upward: a wall that becomes a bridge, or the reverse.'],
  ['dark', 'spine', ['dark', 'ent:torch'], 'The level is dark; lit torches are the only light, and the map has to be learned.'],

  ['icewall', 'support', ['ent:ice'], 'Ice three tiles tall under rock: Fire only.'],
  ['firewall', 'support', ['ent:firewall'], 'Flames three tiles tall under rock: Water only.'],
  ['cracked-floor', 'support', ['ent:cracked'], 'A cracked floor: Earth only.'],
  ['turbine', 'support', ['ent:turbine'], 'A turbine: Air only, wherever it is.'],
  ['heavy-plate', 'support', ['opt:heavy-plate', 'ent:plate'], 'A heavy plate: Earth, a boulder or a stack of crates, and nothing lighter.'],
  ['own-liquid-lane', 'support', ['tile:lava', 'tile:mud', 'tile:mist'], 'A stretch of one element\'s own liquid: only that element wades it.'],
  ['crate-weight', 'support', ['ent:box', 'ent:plate'], 'A crate as a permanent substitute for a player who would otherwise have to stand still.'],
  ['torch-trigger', 'support', ['ent:torch'], 'A torch as a trigger that only Fire can set off.'],
  ['lever-relay', 'support', ['ent:lever'], 'A lever somewhere only one player can reach.'],

  ['sludge-pit', 'terrain', ['tile:sludge'], 'Sludge: lethal to everyone, so a fall is a real loss.'],
  ['water-channel', 'terrain', ['tile:water'], 'Open water: Water wades it, everyone else drowns.'],
  ['lava-moat', 'terrain', ['tile:lava'], 'Lava: Fire wades it.'],
  ['mud-bed', 'terrain', ['tile:mud'], 'Mud: Earth wades it.'],
  ['mist-shaft', 'terrain', ['tile:mist'], 'Mist: Air wades it.'],
  ['slopes', 'terrain', ['tile:slope'], 'Slopes: things roll, and a run-up gets longer.'],
  ['one-way-ledges', 'terrain', ['tile:one-way'], 'One-way ledges: up through them freely, down only on purpose.'],
  ['low-roof', 'terrain', [], 'A corridor one tile high: nobody can jump in it at all.'],
  ['tall-shaft', 'terrain', [], 'A vertical shaft several storeys deep, with ledges that only some can reach.'],
  ['two-storeys', 'terrain', [], 'An upper and a lower route that see each other but do not connect.'],

  ['twist-stranding', 'twist', [], 'Whoever works a machine is stranded by it, and has to be freed by what it opened.'],
  ['twist-undo', 'twist', [], 'Something that was switched on has to be switched off again before the level can end.'],
  ['twist-sacrifice', 'twist', [], 'A resource is spent: once used, that route or object is gone for good.'],
  ['twist-two-clocks', 'twist', [], 'Two timers that only work if they overlap.'],
  ['twist-backwards', 'twist', [], 'A machine has to be used for the opposite of what it looks like it is for.'],
  ['twist-order', 'twist', [], 'The order is forced and not obvious: one step makes an earlier one impossible.'],
  ['twist-self-block', 'twist', [], 'The thing that helps you is also what is in your way.'],
  ['twist-setup', 'twist', [], 'Nothing can be attempted until a long setup is finished, and the setup cannot be undone.'],
];

// how much has each player count already seen of a given ingredient?
const catalogue = JSON.parse(fs.readFileSync(path.join(ROOT, 'catalog', 'levels.json'), 'utf8'));
const here = catalogue.filter((l) => l.sizes.includes(players));
const mineHere = here.filter((l) => l.source === 'mine');
const uses = (tokens) => (tokens.length === 0 ? 0 : here.filter((l) => tokens.some((t) => l.tokens.includes(t))).length);

function pick(kind, n) {
  const pool = INGREDIENTS.filter((i) => i[1] === kind).map((i) => ({ key: i[0], tokens: i[2], note: i[3], n: uses(i[2]) }));
  const out = [];
  for (let k = 0; k < n && pool.length; k++) {
    const weights = pool.map((p) => 1 / (1 + p.n));
    const total = weights.reduce((a, b) => a + b, 0);
    let r = rnd() * total, i = 0;
    while (r > weights[i] && i < pool.length - 1) r -= weights[i++];
    out.push(pool.splice(i, 1)[0]);
  }
  return out;
}

const roll = { spine: pick('spine', 1), support: pick('support', 2), terrain: pick('terrain', 1), twist: pick('twist', 1) };
const seenHere = new Set(here.flatMap((l) => l.tokens));

console.log(`roll for a ${players}-player level  (seed ${seed >>> 0}; ${mineHere.length} of this repo's levels and ${here.length - mineHere.length} campaign levels play at ${players})\n`);
for (const [kind, items] of Object.entries(roll)) {
  for (const it of items) {
    const fresh = it.tokens.filter((t) => !seenHere.has(t));
    const tally = it.tokens.length === 0 ? '  (not visible in the feature tokens — check the cores below yourself)'
      : it.n ? `  (${it.n} level(s) at ${players}p already use it)` : '  (unused at this player count)';
    console.log(`${kind.toUpperCase().padEnd(8)} ${it.key}${tally}`);
    console.log(`         ${it.note}`);
    if (fresh.length) console.log(`         new here: ${fresh.join(' ')}`);
  }
}
console.log(`\ncores already taken at ${players} players:`);
for (const l of mineHere) console.log(`  ${l.core ?? '?'}`);
console.log(`\nIf this roll cannot become a level that makes sense, roll again. If it can, the SPINE is the
thing a player should be able to describe in one sentence after finishing, and the TWIST is what
should make them stop and think before they move.`);
