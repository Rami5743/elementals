// Generator for levels/ballast/level.json. Run: node levels/ballast/make.mjs
import { writeFileSync } from 'node:fs';

const W = 40, H = 22;
const R = (s) => { if (s.length !== W) throw new Error(`row len ${s.length}: ${s}`); return s; };

// Columns
//  0      border rock
//  1      counterweight shaft (sealed, rows 6..15)
//  2      rock wall
//  3,4    pan shaft (rows 6..15); solid rock below, so nobody can stand in the pan's path
//  5,6    the void: sheer rows 13..18, so a missed leap drops to the hall; gallery ledge at row 6
//  7,8    draught shaft (rows 3..18) — the fan
//  9      the gate's column (rows 3..6), sill at row 7
//  10..38 the far gallery, floor at row 7 — one step down from the ledge at row 6
const t = [];
const put = (spec) => {
  const a = '#'.repeat(W).split('');
  for (const [from, to, ch] of spec) for (let x = from; x <= to; x++) a[x] = ch;
  t.push(R(a.join('')));
};

put([]);                                       // 0  rock
put([]);                                       // 1  rock
put([]);                                       // 2  roof over everything
for (let y = 3; y <= 5; y++)                   // 3..5 left bay, draught shaft, gate column, gallery
  put([[3, 4, '.'], [5, 6, '.'], [7, 8, '.'], [9, 9, '.'], [10, 38, '.']]);
// 6  ledge at 5,6; the pan's berth at 3,4; shaft mouth at 7,8; gate column at 9; gallery air at 10+
put([[1, 1, '.'], [3, 4, '.'], [7, 8, '.'], [9, 9, '.'], [10, 38, '.']]);
// 7  the far gallery's floor, and the gate's sill at 9
put([[1, 1, '.'], [3, 4, '.'], [7, 8, '.']]);
for (let y = 8; y <= 12; y++)                  // 8..12 rock, bar the three shafts
  put([[1, 1, '.'], [3, 4, '.'], [7, 8, '.']]);
for (let y = 13; y <= 15; y++)                 // 13..15 pan shaft + the void + the draught
  put([[1, 1, '.'], [3, 4, '.'], [5, 6, '.'], [7, 8, '.']]);
for (let y = 16; y <= 18; y++)                 // 16..18 the hall
  put([[5, 6, '.'], [7, 8, '.'], [9, 38, '.']]);
put([]);                                       // 19 hall floor
put([]);
put([]);
if (t.length !== H) throw new Error('rows ' + t.length);

const level = {
  id: 'ballast',
  name: 'Ballast',
  order: 146,
  description: 'The rope keeps counting you until you land. So do not land.',
  supports: [['water', 'earth']],
  parTicks: 4200,
  hints: [
    'The draught blows only while the bellows plate is held, and only Earth is heavy enough to hold it.',
    'The gate is open while the boulder rests on the pad, and the pan sinks only while your weight is on the rope.',
    'A pulley goes on counting whoever jumped off it until they land somewhere else.',
  ],
  tiles: t,
  spawns: { water: [6, 18], earth: [10, 18] },
  entities: [
    // --- the rope ---------------------------------------------------------------------------
    { id: 'rope', type: 'pulley', x: 3, y: 6, w: 2, to: [1, 15, 1], range: 9, weights: [0, 3.5] },
    { id: 'stone', type: 'boulder', x: 3, y: 5 },
    { id: 'pad', type: 'plate', x: 3, y: 14, weight: 'heavy', targets: ['gate'] },
    // --- the draught ------------------------------------------------------------------------
    { id: 'bellows', type: 'plate', x: 20, y: 18, w: 2, weight: 'heavy', targets: ['draught'] },
    { id: 'draught', type: 'fan', x: 7, y: 3, w: 2, h: 16, strength: 2 },
    // --- the gate and what lies beyond ------------------------------------------------------
    { id: 'gate', type: 'door', x: 9, y: 3, h: 4 },
    { id: 'release', type: 'lever', x: 16, y: 6, targets: ['hatch'] },
    { id: 'hatch', type: 'door', x: 28, y: 16, h: 3 },
    // --- gems, doors, furniture ---------------------------------------------------------------
    { type: 'gem', element: 'water', x: 4, y: 14 },
    { type: 'gem', element: 'earth', x: 24, y: 18 },
    { type: 'exit', element: 'water', x: 19, y: 5 },
    { type: 'exit', element: 'earth', x: 33, y: 17 },
    { type: 'checkpoint', x: 11, y: 5 },
    { type: 'sign', x: 12, y: 4, text: 'The rope counts you till you land' },
  ],
};

writeFileSync(new URL('./level.json', import.meta.url), JSON.stringify(level, null, 2) + '\n');
console.log('wrote level.json');
