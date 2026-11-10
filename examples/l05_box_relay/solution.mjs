// From the built-in level l05_box_relay, as an example of solution scripts.
import { IN_JUMP, IN_LEFT, IN_RIGHT, TILE } from '../../kit.mjs';
import { go, interact, jump, until, wait, waitFlag } from '../../kit.mjs';
const H1_TOP = 17 * TILE;
function* pushUntilStuck(c) {
    let last = -1;
    let still = 0;
    while (still < 20) {
        yield IN_LEFT;
        const bx = c.ent('box').s.x;
        still = bx === last ? still + 1 : 0;
        last = bx;
    }
}
const water = function* (c) {
    yield* go(c, 19.4); // wade across the pool
    yield* jump(c, 1, { steerUntil: 23.5 }); // hop over the box
    yield* go(c, 30);
    yield* interact(c); // lever: opens fire's gate on the ledge
    yield* go(c, 23);
    // push the box back across the pool: first until it bumps into fire...
    yield* pushUntilStuck(c);
    c.flag('box_stuck');
    yield* waitFlag(c, 'f_on_box');
    // ...then, with fire riding on top, all the way to the ledge
    yield* pushUntilStuck(c);
    c.flag('box_placed');
    yield* go(c, 13.5);
    yield* until(c, () => c.ent('g2').s.open >= 96, 0, 2000, 'hut gate');
    yield* go(c, 36);
};
const fire = function* (c) {
    // wait for the box to bump into you, then hop onto it (clear of water pushing on its right)
    yield* waitFlag(c, 'box_stuck');
    for (let t = 0; t < 3 || !c.me.grounded; t++) {
        const d = c.ent('box').s.x + 10 - c.cx;
        yield (t < 14 ? IN_JUMP : 0) | (Math.abs(d) < 2 ? 0 : d > 0 ? IN_RIGHT : IN_LEFT);
        if (t > 200)
            throw new Error('fire never landed');
    }
    if (c.bottom !== c.ent('box').s.y)
        throw new Error(`fire did not land on the box: fire x=${c.me.x} bottom=${c.bottom} box=${c.ent('box').s.x},${c.ent('box').s.y}`);
    c.flag('f_on_box');
    yield* until(c, () => c.has('box_placed'), 0, 1000, 'box placed');
    yield* wait(c, 5);
    yield* jump(c, -1, { steerUntil: 7 }); // box step up onto the ledge
    if (c.bottom !== H1_TOP)
        throw new Error(`fire missed the ledge (${c.bottom})`);
    yield* go(c, 7); // hold the plate so water can get home
    yield* until(c, () => c.player('water').inDoor === 1, 0, 3000, 'water home');
    yield* go(c, 2);
};
export const solutions = {
    level: 'l05_box_relay',
    sets: [{ elements: ['fire', 'water'], scripts: { fire, water } }],
    roles: {
        'fire,water': {
            water: 'Wades across the pool, pulls the lever that opens Fire’s gate and pushes the box back across the pool.',
            fire: 'Uses the box as a step up the ledge and holds the plate that opens Water’s hut.',
        },
    },
};
