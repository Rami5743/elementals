// Generator for levels/headlong/level.json — rebuild with: node gen.mjs
import fs from 'node:fs';

const W = 40, H = 22;
const OUT = '/home/user/elementals/.claude/worktrees/agent-adf900f3ac5036fbe/levels/headlong/level.json';

// ---- tunables -------------------------------------------------------------
const GALLERY_ROW = 8;         // gallery floor tile row (walking surface 8*32)
const LEDGE_ROW = 16;          // landing ledge tile row
const BAY_ROW = 20;            // bay floor tile row
const CAT_ROW = 4;             // catwalk floor tile row
const CHUTE = 15;              // first chute column
// 'S' = slope tile (drops one row across the column), 'F' = flat shelf tile.
// Eight S take the surface from row 8 to row 16; the F shelves lengthen the run
// without lowering it, which is what buys Water time to get down the shaft.
const PROFILE = 'SSSSFFSSFFSS';
const PEN_X = CHUTE + 1;       // pen door across the chute, so the stone parks on a slope
const LIFT_X = 12;             // hoist shaft, columns LIFT_X..LIFT_X+LIFT_W-1
const LIFT_W = 3;              // wide enough for Earth to ride beside the stone with room
const LADDER = 9;              // people's climbing shaft, columns LADDER..LADDER+1
const CAT_START = 5;           // first solid catwalk column (the stair well is west of it)
const CAT_END = 29;            // last solid catwalk column
const GATE_X = CAT_END;        // catwalk gate, at the catwalk's east end

// ---- work out the chute ---------------------------------------------------
const chute = [];              // {x, row, kind}
{
  let r = GALLERY_ROW;
  for (let i = 0; i < PROFILE.length; i++) {
    const kind = PROFILE[i];
    chute.push({ x: CHUTE + i, row: r, kind });
    if (kind === 'S') r += 1;
  }
  if (r !== LEDGE_ROW) throw new Error(`profile lands on row ${r}, want ${LEDGE_ROW}`);
}
const CHUTE_END = chute[chute.length - 1].x;      // last chute column
const LEDGE = [CHUTE_END + 1, CHUTE_END + 3];     // the three-tile landing
const VOID = [LEDGE[1] + 1, LEDGE[1] + 3];        // open columns down to the bay
const WALL = VOID[1] + 1;                         // east wall / exit block starts here
const GATE2_X = WALL;                             // the exit gate column
const EXITS = [WALL + 1, WALL + 2, WALL + 3];
const BAY_END = EXITS[2];

// ---- grid -----------------------------------------------------------------
const g = Array.from({ length: H }, () => Array(W).fill('#'));
const set = (x0, x1, y, ch) => { for (let x = x0; x <= x1; x++) g[y][x] = ch; };

// catwalk headroom, reaching back west over the staircase so each step is jumpable
for (let y = 1; y <= CAT_ROW - 1; y++) set(2, VOID[1], y, '.');
// catwalk floor: the stair well is open to its west, the dive gap to its east
set(2, CAT_START - 1, CAT_ROW, '.');
set(CAT_START, CAT_END, CAT_ROW, '#');
// A pool a tile along the catwalk. Three tiles is wider than Earth can jump and
// Earth cannot wade it, so the catwalk -- and with it the ledge below -- belongs
// to Water. It is the one element barrier in the level.
set(CAT_START + 1, CAT_START + 3, CAT_ROW - 1, 'W');

set(CAT_END + 1, VOID[1], CAT_ROW, '.');

// gallery headroom. The way up to the catwalk is a one-way ledge in the stair
// well at the gallery's west end: you jump up through it and stand on it, and
// unlike a step it does not block the gallery corridor underneath.
for (let y = CAT_ROW + 1; y <= GALLERY_ROW - 1; y++) set(2, VOID[1], y, '.');
set(2, CAT_START - 2, GALLERY_ROW - 2, '=');
// A single step between that ledge and the catwalk, so the climb is two
// comfortable one-tile hops rather than one awkward diagonal.
g[CAT_ROW + 1][CAT_START - 1] = '#';

// gallery floor, hoist gap, then the chute
set(2, LIFT_X - 1, GALLERY_ROW, '#');
set(LIFT_X, LIFT_X + LIFT_W - 1, GALLERY_ROW, '.');
set(LIFT_X + LIFT_W, CHUTE - 1, GALLERY_ROW, '#');

// solid block under the gallery, split by the hoist shaft
for (let y = GALLERY_ROW + 1; y <= LEDGE_ROW; y++) {
  set(2, LIFT_X - 1, y, '#');
  set(LIFT_X, LIFT_X + LIFT_W - 1, y, '.');
  set(LIFT_X + LIFT_W, CHUTE - 1, y, '#');
}


// the chute itself: its tile, rock beneath it, open air above
for (const { x, row, kind } of chute) {
  for (let y = CAT_ROW + 1; y < row; y++) g[y][x] = '.';
  g[row][x] = kind === 'S' ? '\\' : '#';
  for (let y = row + 1; y <= LEDGE_ROW; y++) g[y][x] = '#';
}

// the landing ledge and the void beyond it
for (let y = CAT_ROW + 1; y <= LEDGE_ROW - 1; y++) set(LEDGE[0], VOID[1], y, '.');
set(LEDGE[0], LEDGE[1], LEDGE_ROW, '#');
set(VOID[0], VOID[1], LEDGE_ROW, '.');

// the bay
for (let y = LEDGE_ROW + 1; y <= BAY_ROW - 1; y++) set(2, BAY_END, y, '.');
set(2, BAY_END, BAY_ROW, '#');
// The hoist's bottom stop sits flush in the bay floor. The hoist is "powered"
// with no signal, so it is parked here whenever nobody is riding it: the mouth
// is plugged by the platform itself.
set(LIFT_X, LIFT_X + LIFT_W - 1, BAY_ROW, '.');

// The people's ladder: a two-tile-wide shaft from the bay up to the gallery with
// a one-way ledge every other row. Anybody can climb it; a boulder cannot be
// pushed up it, so the hoist stays the stone's only road.
for (let y = GALLERY_ROW; y <= BAY_ROW - 1; y++) {
  set(LADDER, LADDER + 1, y, (y - GALLERY_ROW) % 2 === 0 ? '=' : '.');
}

// ---- checks ---------------------------------------------------------------
const tiles = g.map((r, y) => {
  const s = r.join('');
  if (s.length !== W) throw new Error(`row ${y} len ${s.length}`);
  return s;
});
if (tiles.length !== H) throw new Error('rows ' + tiles.length);

// ---- entities -------------------------------------------------------------
const entities = [
  { id: 'spin', type: 'turbine', x: 8, y: GALLERY_ROW - 1, targets: ['pen', 'catgate'] },
  { id: 'pen', type: 'door', x: PEN_X, y: GALLERY_ROW - 2, h: 3 },
  { id: 'catgate', type: 'door', x: GATE_X, y: 1, h: 3 },
  {
    id: 'hoist', type: 'elevator', x: LIFT_X, y: BAY_ROW, w: LIFT_W,
    path: [[LIFT_X, BAY_ROW], [LIFT_X, GALLERY_ROW]], mode: 'powered', speed: 4,
  },
  // The hoist's control runs the height of the shaft: a hold button that only
  // somebody inside the shaft can work, and that the rider has to keep down for
  // the whole climb. So the shaft mouth is never open unattended -- the stone
  // cannot be shoved into an empty shaft and lost -- and because it reaches into
  // the pit under the deck, anybody who does fall in can call the platform up
  // off themselves.
  {
    id: 'call', type: 'button', mode: 'hold', x: LIFT_X, y: GALLERY_ROW, w: LIFT_W,
    h: BAY_ROW - GALLERY_ROW + 1, targets: ['hoist'],
  },
  { id: 'stone', type: 'boulder', x: LEDGE[0], y: BAY_ROW - 1, rolls: true },
  { id: 'pad', type: 'plate', x: LEDGE[0], y: LEDGE_ROW - 1, w: 3, weight: 'heavy', targets: ['way'] },
  { id: 'way', type: 'door', x: GATE2_X, y: BAY_ROW - 3, h: 3 },
  { type: 'gem', element: 'earth', x: 18, y: BAY_ROW - 1 },
  { type: 'gem', element: 'water', x: CAT_END - 2, y: CAT_ROW - 1 },
  { type: 'gem', element: 'air', x: 10, y: GALLERY_ROW - 1 },
  { type: 'checkpoint', x: 5, y: BAY_ROW - 2 },
  { type: 'exit', element: 'water', x: EXITS[0], y: BAY_ROW - 2 },
  { type: 'exit', element: 'earth', x: EXITS[1], y: BAY_ROW - 2 },
  { type: 'exit', element: 'air', x: EXITS[2], y: BAY_ROW - 2 },
];

const level = {
  id: 'headlong',
  name: 'Headlong',
  order: 215,
  description: 'You cannot catch the stone. You can only jump down after it.',
  supports: [['water', 'earth', 'air']],
  parTicks: 7200,
  hints: [
    'Only Earth can move the stone at all, and the hoist is the only way up out of the bay.',
    'The turbine looses the stone and opens the catwalk at the same moment. Nothing can reach the ledge before then.',
    'Run the catwalk, step off the end, and pull back west onto the ledge before the stone gets there.',
  ],
  tiles,
  spawns: { water: [6, BAY_ROW - 1], earth: [LEDGE[1] + 2, BAY_ROW - 1], air: [8, BAY_ROW - 1] },
  entities,
};

fs.writeFileSync(OUT, JSON.stringify(level, null, 1) + '\n');
console.log('wrote', OUT);
console.log('chute', CHUTE, '-', CHUTE_END, ' ledge', LEDGE, ' void', VOID, ' wall', WALL, ' exits', EXITS);
