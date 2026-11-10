/**
 * What solution scripts (and probe scripts) can import from kit.mjs: the game's constants,
 * level types and simulation, and the director helpers that drive players tick by tick.
 * Imports name the modules they need: the kit's type files are generated from everything
 * imported here, and must not include online play (shared/src/net.ts).
 */
export { ELEMENTS, LEVEL_H, LEVEL_W, PHYSIQUE, TICK_RATE, TILE, IN_DOWN, IN_INTERACT, IN_JUMP, IN_LEFT, IN_RIGHT, type Element } from '../../shared/src/constants.js';
export { validateLevel, type EntityDef, type LevelDef } from '../../shared/src/level.js';
export { buildWorld, type World } from '../../shared/src/world.js';
export { createState, stepGame, type GameState, type PlayerState } from '../../shared/src/sim.js';
export { runReplay, type Replay } from '../../shared/src/replay.js';
export { checkSolution } from '../../shared/src/bundle.js';
export { BITS, Ctl, Director, drop, go, holdAt, interact, jump, leap, pound, run, runJump, steerTo, until, wait, waitFlag, type Detour, type Script } from '../../tools/director.js';
import type { Element } from '../../shared/src/constants.js';
import type { Script } from '../../tools/director.js';
/** What a level's solution.mjs exports as `solutions`. */
export interface Solutions {
    /** One entry per supported element set: a script for each player. */
    sets: {
        elements: Element[];
        scripts: Partial<Record<Element, Script>>;
    }[];
    /** Per element set ("fire,water"), what each player contributes (shown to reviewers). */
    roles?: Record<string, Partial<Record<Element, string>>>;
}
export declare const KIT_VERSION = 1;
