// From the built-in level l09_updraft, as an example of solution scripts.
import { IN_RIGHT, TILE } from '../../kit.mjs';
import { go, interact, run, jump, steerTo, until } from '../../kit.mjs';
const gateOpen = (c) => c.ent('gate').s.open >= 128;
const air = function* (c) {
    yield* go(c, 6.6);
    yield* run(c, 8.4);
    yield* jump(c, 1, { steerUntil: 16 }); // glide over the pool (holding jump)
    yield* until(c, () => c.ent('fan').s.on === 1, 0, 2000, 'fan on');
    yield* go(c, 19.6); // into the updraft
    yield* until(c, () => c.me.y < 3 * TILE, 0, 400, 'lifted');
    yield* steerTo(c, 26);
    yield* go(c, 27);
    yield* interact(c); // opens the exit gate
    yield* go(c, 30.6);
    yield* until(c, () => !c.me.grounded, IN_RIGHT, 30, 'walk off');
    yield* steerTo(c, 29.5); // glide down in front of the exit hall
    yield* until(c, () => c.ent('fw').s.gone === 1 && c.player('water').inDoor === 1, 0, 2000, 'water doused the flames');
    yield* go(c, 37);
};
const water = function* (c) {
    yield* go(c, 7); // freeze pad: the pool becomes a bridge
    yield* until(c, () => c.player('fire').x > 15 * TILE, 0, 2000, 'fire across');
    yield* until(c, () => gateOpen(c), 0, 3000, 'gate');
    yield* go(c, 34.5);
    yield* until(c, () => c.ent('fw').s.gone === 1, IN_RIGHT, 200, 'douse'); // free air's exit
    yield* go(c, 35);
};
const fire = function* (c) {
    yield* until(c, () => c.ent('pool').s.on === 1, 0, 600, 'pool frozen');
    yield* go(c, 16); // light the torch: the fan starts
    yield* until(c, () => gateOpen(c), 0, 3000, 'gate');
    yield* until(c, () => c.player('air').inDoor === 1, 0, 3000, 'air home');
    yield* go(c, 34);
};
export const solutions = {
    level: 'l09_updraft',
    sets: [{ elements: ['fire', 'water', 'air'], scripts: { fire, water, air } }],
    roles: {
        'fire,water,air': {
            water: 'Holds the freeze pad so Fire can cross the pool, then douses the flames in front of Air’s exit.',
            fire: 'Lights the torch that powers the fan.',
            air: 'Rides the fan to the high ledge and pulls the lever that opens the exit gate.',
        },
    },
};
