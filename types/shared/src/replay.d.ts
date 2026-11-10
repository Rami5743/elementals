import { type Element } from './constants.js';
import { type Difficulty, type GameState } from './sim.js';
import type { World } from './world.js';
/** Run-length encoded inputs: [ticks, bits] pairs. */
export type InputRuns = [number, number][];
export interface Replay {
    level: string;
    elements: Element[];
    seed: number;
    /** Tick on which the recording completed the level. */
    ticks: number;
    /** One run list per player slot, in the order of `elements`. */
    inputs: InputRuns[];
}
export declare function encodeRuns(frames: number[]): InputRuns;
export declare function decodeRuns(runs: InputRuns): number[];
/** Records per-tick inputs for each slot while playing (debug replay recorder). */
export declare class ReplayRecorder {
    readonly level: string;
    readonly elements: Element[];
    readonly seed: number;
    constructor(level: string, elements: Element[], seed?: number);
    push(inputs: readonly number[]): void;
    get length(): number;
    finish(ticks?: number): Replay;
}
export interface ReplayResult {
    won: boolean;
    tick: number;
    deaths: number;
    state: GameState;
}
export interface RunOptions {
    /** Extra ticks with no input after the recorded inputs end. */
    grace?: number;
    difficulty?: Difficulty;
    /** Player slot placed at its own exit with no input (co-op necessity counterfactual). */
    idleAtExit?: number;
    /** Optional hook to mutate the initial state (e.g. disable a passive contribution). */
    setup?: (state: GameState, world: World) => void;
    /** Stop at the first death. */
    stopOnDeath?: boolean;
}
export declare function placeAtExit(world: World, state: GameState, slot: number): void;
export declare function runReplay(world: World, replay: Replay, opts?: RunOptions): ReplayResult;
