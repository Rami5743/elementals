// From the built-in level l53_counterpoise, as an example of solution scripts.
import { IN_RIGHT, TILE } from '../../kit.mjs';
import { drop, go, jump, leap, until, waitFlag } from '../../kit.mjs';
const b = (c) => c.ent('boulder').s;
const crate = (c) => c.ent('crate').s;
const lifted = (c) => b(c).y + 30 < 14 * TILE;
const onLedge = (c) => b(c).y + 30 === 14 * TILE && crate(c).y + 28 === 14 * TILE;
const SPOT = { earth: 15.4, fire: 14.4, water: 13.4, air: 12.4 };
const FLOOR = { earth: 10, fire: 8, water: 6, air: 4 };
/** Up onto the bridge, along it, and through it onto the left pan. */
function* onto(c) {
    yield* go(c, 10.8);
    yield* leap(c, 12.5);
    yield* go(c, SPOT[c.me.element], { noHop: true });
    yield* drop(c);
}
/** Back to the left floor, out of the way. */
function* offScale(c) {
    yield* go(c, 12.3, { noHop: true });
    yield* leap(c, 10.5);
    yield* go(c, FLOOR[c.me.element]);
    c.flag(`${c.me.element}_off`);
}
/** Along the bridge to its end. */
function* toBridgeEnd(c) {
    yield* go(c, 10.8);
    yield* leap(c, 12.5);
    yield* go(c, 15.5, { noHop: true });
}
const earth = function* (c) {
    yield* onto(c);
    c.flag('e_on');
    yield* waitFlag(c, 'a_on');
    yield* until(c, () => lifted(c), 0, 300, 'boulder and crate past the ledge');
    c.flag('lifted');
    yield* offScale(c);
    yield* waitFlag(c, 'on_ledge');
    yield* toBridgeEnd(c);
    yield* leap(c, 18); // onto the crate
    yield* leap(c, 19.6); // between the crate and the boulder
    c.flag('e_ledge');
    yield* waitFlag(c, 'ice');
    yield* until(c, () => b(c).x >= 23 * TILE, IN_RIGHT, 300, 'boulder at the mouth of the tunnel');
    c.flag('at_mouth');
    yield* waitFlag(c, 'frozen');
    yield* until(c, () => b(c).x >= 30 * TILE, IN_RIGHT, 900, 'boulder on the far plate');
    c.flag('boulder_in');
    yield* go(c, 29, { noHop: true });
    yield* until(c, () => c.ent('gate').s.on === 1, 0, 900, 'gate');
    yield* jump(c, 1, { steerUntil: 32 });
    yield* go(c, 37);
};
const fire = function* (c) {
    yield* waitFlag(c, 'e_on');
    yield* onto(c);
    c.flag('f_on');
    yield* waitFlag(c, 'lifted');
    yield* offScale(c);
    yield* waitFlag(c, 'e_ledge');
    yield* toBridgeEnd(c);
    yield* leap(c, 18); // onto the crate
    yield* until(c, () => Math.abs(c.me.vx) < 0.1, 0, 30, 'still');
    yield* leap(c, 21); // onto the boulder, against the ice
    yield* until(c, () => c.ent('ice').s.gone === 1, IN_RIGHT, 60, 'melt');
    yield* go(c, 21, { noHop: true });
    c.flag('ice'); // and stays on the boulder: Earth's push carries it down the tunnel
    yield* until(c, () => c.ent('gate').s.on === 1, 0, 1800, 'gate');
    yield* until(c, () => c.tx > 32.2, IN_RIGHT, 120, 'through the gate');
    yield* go(c, 35);
};
const water = function* (c) {
    yield* waitFlag(c, 'f_on');
    yield* onto(c);
    c.flag('w_on');
    yield* waitFlag(c, 'lifted');
    yield* offScale(c);
    yield* waitFlag(c, 'at_mouth');
    yield* toBridgeEnd(c);
    yield* go(c, 15, { noHop: true }); // the freeze pad
    c.flag('frozen');
    yield* waitFlag(c, 'crate_in');
    yield* go(c, 27); // through the water: it is Water's own
    yield* until(c, () => c.ent('gate').s.on === 1, 0, 600, 'gate');
    yield* jump(c, 1, { steerUntil: 29.5 });
    yield* go(c, 36);
};
const air = function* (c) {
    yield* waitFlag(c, 'w_on');
    yield* onto(c);
    c.flag('a_on');
    yield* waitFlag(c, 'lifted');
    yield* offScale(c);
    yield* waitFlag(c, 'earth_off');
    yield* waitFlag(c, 'fire_off');
    yield* waitFlag(c, 'water_off');
    yield* until(c, () => onLedge(c), 0, 300, 'on the ledge');
    c.flag('on_ledge');
    yield* waitFlag(c, 'boulder_in');
    yield* go(c, 10.8);
    yield* leap(c, 12.5);
    yield* go(c, 14);
    yield* leap(c, 16.6); // over Water
    yield* until(c, () => c.bottom === 14 * TILE, IN_RIGHT, 60, 'on the ledge, behind the crate');
    yield* until(c, () => crate(c).x >= 28 * TILE, IN_RIGHT, 900, 'crate on the plate');
    c.flag('crate_in');
    yield* until(c, () => c.ent('gate').s.on === 1, 0, 600, 'gate');
    yield* jump(c, 1, { steerUntil: 30 });
    yield* go(c, 38);
};
export const solutions = {
    level: 'l53_counterpoise',
    sets: [{ elements: ['fire', 'water', 'earth', 'air'], scripts: { fire, water, earth, air } }],
    roles: {
        'fire,water,earth,air': {
            fire: 'Weighs in on the left pan and melts the ice at the mouth of the tunnel.',
            water: 'Weighs in on the left pan and freezes the strip in the tunnel.',
            earth: 'Weighs in on the left pan and pushes the boulder to the far plate.',
            air: 'Weighs in on the left pan and pushes the crate to the near plate.',
        },
    },
};
