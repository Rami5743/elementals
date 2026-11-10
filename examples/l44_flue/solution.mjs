// From the built-in level l44_flue, as an example of solution scripts.
import { IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, leap, until, waitFlag } from '../../kit.mjs';
const earth = function* (c) {
    yield* until(c, () => c.ent('hp').s.on === 1, IN_RIGHT, 300, 'boulder on the plate');
    yield* go(c, 5, { noHop: true }); // step back off the boulder
    yield* waitFlag(c, 'torch');
    yield* until(c, () => c.ent('gate').s.open >= 60, 0, 200, 'gate open');
    yield* until(c, () => c.me.x > 5.6 * TILE, IN_RIGHT, 60, 'run up');
    yield* leap(c, 8.5); // over the boulder
    yield* go(c, 13);
    yield* waitFlag(c, 'f_ready');
    yield* leap(c, (c.player('fire').x + 11) / TILE - 0.5, 16); // onto Fire's head
    yield* until(c, () => c.me.y + 30 === c.player('fire').y, 0, 60, 'aboard');
    c.flag('aboard');
    yield* until(c, () => c.me.y < 4 * TILE, 0, 900, 'up the flue');
    yield* waitFlag(c, 'f_landed');
    yield* go(c, 23.5, { noHop: true }); // the plate opens Fire's gate
    c.flag('e_off');
    c.flag('on_plate');
    yield* waitFlag(c, 'f_home');
    yield* go(c, 30);
};
const fire = function* (c) {
    yield* until(c, () => c.ent('hp').s.on === 1, 0, 400, 'fan on');
    yield* go(c, 19, { noHop: true }); // into the fan
    yield* until(c, () => c.me.y < 4 * TILE, 0, 300, 'up the fan');
    yield* until(c, () => c.me.x < 16 * TILE, IN_LEFT, 120, 'out of the fan');
    yield* until(c, () => c.me.grounded === 1, 0, 200, 'on the ledge');
    yield* until(c, () => c.ent('torch').s.on === 1, IN_LEFT, 120, 'torch');
    c.flag('torch');
    yield* until(c, () => c.me.x < 12.5 * TILE, IN_LEFT, 200, 'over the gap');
    yield* until(c, () => c.me.grounded === 1 && c.bottom === 20 * TILE, 0, 200, 'landed');
    yield* go(c, 16, { noHop: true });
    c.flag('f_ready');
    yield* waitFlag(c, 'aboard');
    yield* until(c, () => c.cx > 19 * TILE, IN_RIGHT, 200, 'into the fan');
    yield* until(c, () => c.me.y < 5 * TILE, 0, 900, 'carrying Earth up');
    yield* until(c, () => c.me.x > 21.5 * TILE, IN_RIGHT, 200, 'off the flue');
    yield* until(c, () => c.me.grounded === 1 && c.bottom === 8 * TILE, 0, 120, 'on the top floor');
    c.flag('f_landed');
    yield* waitFlag(c, 'e_off');
    yield* go(c, 25.5); // melts the ice
    yield* until(c, () => c.ent('ice').s.gone === 1, IN_RIGHT, 100, 'melt');
    yield* waitFlag(c, 'on_plate');
    yield* go(c, 37);
    c.flag('f_home');
};
export const solutions = {
    level: 'l44_flue',
    sets: [{ elements: ['fire', 'earth'], scripts: { fire, earth } }],
    roles: {
        'fire,earth': {
            fire: 'Rides the fan alone to the torch that opens Earth’s gate, carries Earth up the fan on its head and melts the ice.',
            earth: 'Parks the boulder on the plate that runs the fan and holds the top plate while Fire goes through its gate.',
        },
    },
};
