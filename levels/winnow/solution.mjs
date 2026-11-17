import { IN_LEFT, IN_RIGHT, IN_JUMP, TILE, go, until, interact, waitFlag, drop } from '../../kit.mjs';

/** A hopping walk: clears the one-tile ledges the drum and the pad stand on. */
function* bound(c, x, hold = 14, max = 1500) {
  const goal = x * TILE + TILE / 2;
  let h = 0;
  for (let t = 0; t < max; t++) {
    const d = goal - c.cx;
    if (Math.abs(d) < 10 && c.me.grounded === 1) return;
    if (c.me.grounded === 1) h = hold;
    yield (d > 0 ? IN_RIGHT : IN_LEFT) | (h-- > 0 ? IN_JUMP : 0);
  }
  throw new Error(`${c.me.element} could not bound to ${x} (at ${c.tx.toFixed(1)})`);
}

/** Air springs the two tiles out of the cellar, through the open shaft mouth. */
function* climbOut(c, max = 600) {
  for (let t = 0; t < max; t++) {
    if (c.me.grounded === 1 && c.bottom <= 18 * TILE) return;
    yield (t % 40 < 20) ? IN_JUMP : 0;
  }
  throw new Error(`air could not climb out of the cellar (at ${c.tx.toFixed(1)},${(c.bottom / TILE).toFixed(1)})`);
}

const cageUp = (c) => c.ent('hoist').s.y <= 10.2 * TILE;
const cageHome = (c) => c.ent('hoist').s.y >= 17.9 * TILE;
const gateOpen = (c) => c.ent('gate').s.open >= 180;

/** @type {import('../../kit.mjs').Script} */
const earth = function* (c) {
  // Roll the stone along the hall floor until it stands in the parked cage.
  yield* until(c, () => c.ent('stone').s.x >= 18 * TILE, IN_RIGHT, 1800, 'the stone to the shaft mouth');
  yield* bound(c, 14);
  yield* bound(c, 6);
  c.flag('earth_on_drum');

  // The cage is up with the stone in it. Wait until Air is under it in the cellar,
  // then step off: letting the cage fall is the only way the stone is ever set down.
  yield* waitFlag(c, 'air_on_turbine');
  yield* bound(c, 11);
  yield* until(c, () => c.ent('vault').s.open > 0, 0, 1800, 'the vault to latch');
  c.flag('vault_open');

  // Raise it again to unseal the mouth so Air can climb out.
  yield* bound(c, 6);
  yield* waitFlag(c, 'air_out');
  // And drop it again so the two riders can board.
  yield* bound(c, 11);
  yield* waitFlag(c, 'riders_ready');
  yield* bound(c, 6);

  // Everyone is up. Stepping off now drops the cage one last time, which is what
  // puts the stone back on the shelf and opens the hall gate.
  // Everyone is up. Stepping off drops the cage one last time, which is what puts
  // the stone back on the shelf and opens both gates. Earth's own door is west, so
  // he never has to cross the shaft at all.
  yield* waitFlag(c, 'riders_up');
  yield* bound(c, 11);
  yield* until(c, () => c.ent('gate_w').s.open >= 180, 0, 3000, 'the west gate to open');
  yield* bound(c, 4);
  yield* go(c, 2);
  yield* go(c, 1);
};

/** @type {import('../../kit.mjs').Script} */
const fire = function* (c) {
  yield* bound(c, 32);
  c.flag('fire_on_pad');
  yield* waitFlag(c, 'riders_up');
  yield* until(c, () => gateOpen(c), 0, 3000, 'the hall gate to open');
  yield* bound(c, 34);
  yield* go(c, 38);
  c.flag('fire_home');
};

/** @type {import('../../kit.mjs').Script} */
const air = function* (c) {
  yield* waitFlag(c, 'earth_on_drum');
  yield* until(c, () => cageUp(c), 0, 3000, 'the cage to leave the mouth');
  yield* bound(c, 19);
  yield* drop(c);
  yield* until(c, () => c.me.grounded === 1 && c.bottom > 18 * TILE, 0, 240, 'the cellar floor');
  yield* go(c, 26);
  yield* go(c, 13);
  c.flag('air_on_turbine');

  yield* until(c, () => c.ent('vault').s.open > 0, 0, 3000, 'the vault to latch');
  yield* waitFlag(c, 'vault_open');
  yield* until(c, () => cageUp(c), 0, 3000, 'the cage to rise again');
  yield* go(c, 19);
  yield* climbOut(c);
  yield* go(c, 26);
  c.flag('air_out');

  yield* until(c, () => cageHome(c), 0, 3000, 'the cage to come home');
  yield* go(c, 19);
  c.flag('air_aboard');

  yield* until(c, () => cageUp(c), 0, 3000, 'the ride up');
  yield* waitFlag(c, 'water_home');
  yield* go(c, 28);
  c.flag('riders_up');
};

/** @type {import('../../kit.mjs').Script} */
const water = function* (c) {
  yield* waitFlag(c, 'air_out');
  yield* until(c, () => cageHome(c), 0, 3000, 'the cage to come home');
  yield* waitFlag(c, 'air_aboard');
  yield* go(c, 20);
  c.flag('riders_ready');

  yield* until(c, () => cageUp(c), 0, 3000, 'the ride up');
  yield* go(c, 23);
  yield* go(c, 37);
  yield* interact(c);
  yield* go(c, 34);
  yield* go(c, 31);
  c.flag('water_home');
};

/** @type {import('../../kit.mjs').Solutions} */
export const solutions = {
  level: 'winnow',
  sets: [{ elements: ['fire', 'water', 'earth', 'air'], scripts: { fire, water, earth, air } }],
  roles: {
    'fire,water,earth,air': {
      fire: 'Holds the pad. The cage takes two hands, and his is the one that is never free.',
      water: 'Rides up and throws the winch, which with the stone back on the shelf opens the hall gate for the two left below.',
      earth: 'The only weight the drum answers to. Loads the stone and works the cage, and so can never ride it.',
      air: 'The only one the turbine answers to, and he has to be shut in the cellar before the stone is set down.',
    },
  },
};
