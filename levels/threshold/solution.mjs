// Threshold — the plate under Fire's doorway is the draught's only input.
import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE, go, until, wait, waitFlag } from '../../kit.mjs';
import { climbOnto, rideAlong } from '../_lib.mjs';

/** Jump straight up through the one-way ledge overhead and land on it. */
function* upThrough(c, row, max = 180) {
  const top = row * TILE;
  for (let t = 0; t < max; t++) {
    yield t < 20 ? IN_JUMP : 0;
    if (t > 12 && c.me.grounded === 1 && c.bottom <= top) return;
  }
  throw new Error(`${c.me.element} could not climb to row ${row} (bottom=${c.bottom})`);
}

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  // nothing is possible until Earth's weight opens the hatch at the mouth of the tunnel
  yield* until(c, () => c.ent('tunnel_gate').s.open >= 30, 0, 3000, 'the hatch to open');
  yield* go(c, 36);                       // east through the hatch and the six tiles of lava
  yield* upThrough(c, 18);                // the east chamber: three one-way ledges
  yield* go(c, 37);
  yield* upThrough(c, 16);                // (Fire's gem is in the body row here)
  yield* upThrough(c, 14);
  yield* upThrough(c, 12);                // through the grating in the gallery floor
  yield* go(c, 38);                       // into its own doorway: the draught starts
  if (c.me.inDoor !== 1) throw new Error('fire is not in its door');
  yield* until(c, () => c.ent('draught').s.on === 1, 0, 120, 'the draught to start');
  c.flag('draught_on');
  yield* wait(c, 20000);                  // and there Fire stays
};

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  yield* go(c, 10);                       // the hall's heavy plate
  yield* until(c, () => c.ent('tunnel_gate').s.open >= 30, 0, 300, 'the hatch to open');
  c.flag('hatch');
  yield* waitFlag(c, 'draught_on');       // hold it until Fire is home
  yield* go(c, 16);                       // the earth gem
  yield* go(c, 15.6);
  yield* waitFlag(c, 'air_ready');
  yield* climbOnto(c, 'air');             // onto Air's head
  c.flag('aboard');
  yield* rideAlong(c, 'air', () => c.bottom <= 11 * TILE, 2400);
  yield* until(c, () => c.me.grounded === 1 && c.bottom === 12 * TILE, IN_LEFT, 300, 'the gallery floor');
  c.flag('earth_up');
  yield* go(c, 13);                       // the landing's heavy plate: Air's gate opens
  yield* until(c, () => c.ent('air_gate').s.on === 1, 0, 300, 'air_gate to open');
  c.flag('gate_up');
  yield* waitFlag(c, 'air_home');
  yield* go(c, 23);                       // let go of the plate and walk into its own cell
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* go(c, 25);                       // the air gem, at the east end of the hall
  yield* waitFlag(c, 'draught_on');
  yield* go(c, 16);                       // park beside Earth, clear of the column
  c.flag('air_ready');
  yield* waitFlag(c, 'aboard');
  yield* go(c, 18.9, { noHop: true });    // carry Earth into the draught
  yield* waitFlag(c, 'earth_up');
  yield* until(c, () => c.me.grounded === 1 && c.bottom === 12 * TILE, IN_LEFT, 600, 'the gallery floor');
  yield* waitFlag(c, 'gate_up');
  yield* go(c, 12);                       // the hole in the gallery floor is at 10-11
  yield* leapGap(c, 7);
  yield* go(c, 2);                        // through the gate and into its own doorway
  if (c.me.inDoor !== 1) throw new Error('air is not in its door');
  c.flag('air_home');
};

/** Jump west over the hole in the gallery floor, landing on the far side. */
function* leapGap(c, x) {
  const goal = x * TILE + TILE / 2;
  for (let t = 0; t < 200; t++) {
    yield (t < 20 ? IN_JUMP : 0) | (c.cx > goal ? IN_LEFT : 0);
    if (t > 12 && c.me.grounded === 1) break;
  }
  if (c.bottom !== 12 * TILE) throw new Error(`air missed the far side (bottom=${c.bottom})`);
}

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'threshold',
  sets: [
    {
      elements: ['fire', 'earth', 'air'],
      scripts: { fire, earth, air },
      shortcuts: [],
    },
  ],
  roles: {
    'air,earth,fire': {
      fire: 'Wades the tunnel, climbs the east chamber and then stands in its own doorway for the rest of the level: that plate is the draught.',
      earth: 'The only weight in the level. Holds the hall plate so Fire can start, is carried up, then holds the landing plate so Air can get home.',
      air: 'The only thing the draught lifts. Carries Earth eight tiles up to the gallery.',
    },
  },
};
