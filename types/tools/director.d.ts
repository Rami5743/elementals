/**
 * Scripted "director" used to author solution replays. Each player gets a generator script
 * that yields one input byte per tick while reading the live simulation state. Running the
 * scripts drives the real /shared simulation; the resulting raw inputs are saved as replays,
 * which the level tests then play back open-loop.
 */
import { type Element } from '../shared/src/constants.js';
import type { LevelDef } from '../shared/src/level.js';
import { type Replay } from '../shared/src/replay.js';
import { type GameState, type PlayerState } from '../shared/src/sim.js';
import { type World } from '../shared/src/world.js';
export type Script = (c: Ctl) => Generator<number, void, void>;
/** The scripts stop at script tick `tick` while these inputs (one list per player) are played. */
export interface Detour {
    tick: number;
    inputs: number[][];
}
export declare class Ctl {
    readonly slot: number;
    readonly dir: Director;
    constructor(slot: number, dir: Director);
    get state(): GameState;
    get world(): World;
    get me(): PlayerState;
    get cx(): number;
    get bottom(): number;
    /** Tile column of the player's centre. */
    get tx(): number;
    ent(id: string): {
        def: import("../shared/src/world.js").WEnt;
        s: import("../shared/src/sim.js").EntState;
    };
    player(el: Element): PlayerState;
    playing(el: Element): boolean;
    flag(name: string): void;
    has(name: string): boolean;
}
/**
 * Walk until the player's centre is at tile x (fractional tiles allowed). Like a human player,
 * it hops over a partner standing in the way (unless `noHop`).
 */
export declare function go(c: Ctl, xTile: number, opts?: {
    tol?: number;
    hold?: number;
    max?: number;
    noHop?: boolean;
}): Generator<number, void, unknown>;
/** Walk without stopping until the centre passes tile x. */
export declare function run(c: Ctl, xTile: number, max?: number): Generator<1 | 2, void, unknown>;
/** Jump in a direction, holding jump for `hold` ticks and steering until landing. */
export declare function jump(c: Ctl, dir: -1 | 0 | 1, opts?: {
    hold?: number;
    steerUntil?: number;
    delay?: number;
}): Generator<number, void, unknown>;
/** Back up to `from`, run to `takeoff` and jump at full speed (for clearing pools). */
export declare function runJump(c: Ctl, from: number, takeoff: number, steerUntil?: number): Generator<number, void, unknown>;
/** While airborne, steer toward tile x (optionally gliding) until landing. */
export declare function steerTo(c: Ctl, xTile: number, glide?: boolean, max?: number): Generator<number, void, unknown>;
/** Jump and steer to land with the centre at tile x. */
export declare function leap(c: Ctl, xTile: number, hold?: number): Generator<number, void, unknown>;
export declare function wait(_c: Ctl, n: number, bits?: number): Generator<number, void, unknown>;
export declare function until(c: Ctl, pred: () => boolean, bits?: number, max?: number, what?: string): Generator<number, void, unknown>;
/**
 * Keep the player's centre at x = `xTile` tiles (on the ground or hovering in an updraft) until
 * pred() holds, e.g. to keep a turbine spinning while others use what it powers.
 */
export declare function holdAt(c: Ctl, xTile: number, pred: () => boolean, max?: number, what?: string): Generator<1 | 2 | 0, void, unknown>;
export declare function interact(_c: Ctl): Generator<32 | 0, void, unknown>;
/** Drop through the one-way ledge we stand on (press Down) and wait to land. */
export declare function drop(c: Ctl): Generator<number, void, unknown>;
/** Earth ground-pound from the current jump. */
export declare function pound(c: Ctl): Generator<number, void, unknown>;
export declare function waitFlag(c: Ctl, name: string, bits?: number): Generator<number, void, unknown>;
export declare const BITS: {
    IN_LEFT: number;
    IN_RIGHT: number;
    IN_DOWN: number;
    IN_JUMP: number;
    IN_INTERACT: number;
};
export declare class Director {
    readonly level: LevelDef;
    readonly elements: Element[];
    world: World;
    state: GameState;
    flags: Set<string>;
    constructor(level: LevelDef, elements: Element[]);
    /** Plays the scripts until the level is won, stopping them for each detour. `onTick` sees the state before each script tick. */
    run(scripts: Partial<Record<Element, Script>>, opts?: {
        maxTicks?: number;
        detours?: readonly Detour[];
        onTick?: (scriptTick: number) => void;
    }): {
        replay: Replay;
    };
}
