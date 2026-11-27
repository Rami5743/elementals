// Generator for levels/caryatid/level.json
import fs from 'node:fs';
const OUT = '/home/user/elementals/.claude/worktrees/agent-ae7eff60eba84d064/levels/caryatid/level.json';
const g = Array.from({ length: 22 }, () => Array(40).fill('#'));
const open = (x0, x1, y0, y1, ch = '.') => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) g[y][x] = ch; };

// top hall: rows 5-8, floor row 9
open(1, 27, 5, 8);
g[9][6] = 'S';                       // sludge under the exit gate
open(8, 11, 9, 9, '=');              // stairwell cap
g[9][15] = '=';                      // hatch into the counterweight room
open(24, 25, 9, 9);                  // the lift docks here
// stairwell cols 8-11, rows 10-18, floor row 19
open(8, 11, 10, 18);
for (const r of [11, 13, 15, 17]) open(8, 11, r, r, '=');
// counterweight room: row 10 cols 14-16
open(14, 16, 10, 10);
// shaft
open(24, 25, 10, 18);
open(24, 25, 19, 19, '=');           // the pad
open(24, 25, 20, 20);                // pocket under the pad
// west tunnel
open(18, 23, 15, 16);
// east tunnel
open(26, 34, 15, 16);
// cellar crawl
open(12, 23, 18, 18);

const tiles = g.map((r) => r.join(''));
for (const t of tiles) if (t.length !== 40) throw new Error('row ' + t);

const level = {
  id: 'caryatid',
  name: 'Caryatid',
  order: 259,
  description: 'The lift only comes down onto something heavy carried on somebody\'s shoulders.',
  supports: [['fire', 'water', 'earth']],
  parTicks: 9000,
  hints: [
    'The plate hanging in the shaft is heavy, and it is at shoulder height. The lift comes down while it is pressed, and stops on whoever is underneath.',
    'Earth on Water\'s shoulders calls the lift. Fire rides down with a crate and pushes it off into a tunnel.',
    'The east door needs Earth on the plate upstairs. Something else heavy has to call the lift: jump up under the stone on the grating and carry it.',
  ],
  tiles,
  spawns: { fire: [13, 8], water: [12, 8], earth: [16, 8] },
  entities: [
    { id: 'lift', type: 'elevator', x: 24, y: 9, w: 2, path: [[24, 9], [24, 18]], speed: 2 },
    { id: 'call', type: 'plate', x: 24, y: 17, w: 2, weight: 'heavy', targets: ['lift'] },
    { id: 'lintelW', type: 'elevator', x: 23, y: 15, w: 1, path: [[23, 15], [23, 15]] },
    { id: 'lintelE', type: 'elevator', x: 26, y: 15, w: 1, path: [[26, 15], [26, 15]] },
    { id: 'plateW', type: 'plate', x: 20, y: 16, targets: ['gate'] },
    { id: 'plateE', type: 'plate', x: 32, y: 16, targets: ['gate'] },
    { id: 'door', type: 'door', x: 28, y: 15, h: 2 },
    { id: 'weight', type: 'plate', x: 14, y: 10, weight: 'heavy', targets: ['door'] },
    { id: 'gate', type: 'door', x: 6, y: 5, h: 4, required: 2 },
    { id: 'stone', type: 'boulder', x: 24, y: 18 },
    { id: 'crateA', type: 'box', x: 21, y: 8 },
    { id: 'crateB', type: 'box', x: 19, y: 8 },
    { type: 'exit', element: 'fire', x: 2, y: 7 },
    { type: 'exit', element: 'water', x: 3, y: 7 },
    { type: 'exit', element: 'earth', x: 4, y: 7 },
  ],
};
fs.writeFileSync(OUT, JSON.stringify(level, null, 2) + '\n');
console.log(tiles.map((t, i) => String(i).padStart(2) + ' ' + t).join('\n'));
