import { type Element } from './constants.js';
import { type LevelDef } from './level.js';
import { type Replay } from './replay.js';
/**
 * A level bundle: one level, the solution replays that prove it can be solved, and who made it.
 * This is the file the Level Kit writes, players import into "My Levels" and play links carry.
 * See docs/LEVEL_FORMAT.md.
 */
export interface LevelBundle {
    format: typeof BUNDLE_FORMAT;
    /** Version of the bundle wrapper itself. */
    version: number;
    /** The level format a game must read to play it (see format.ts). */
    requires: number;
    level: LevelDef;
    /** At most one per supported element set, players in the order of `elements`. */
    solutions: Replay[];
    author?: string;
    /** The design notes: intended solution, each player's role, why each is needed. */
    notes?: string;
    /** What made the bundle, e.g. "elementals-kit 1". */
    tool?: string;
}
export declare const BUNDLE_FORMAT = "elementals-level";
export declare const BUNDLE_VERSION = 1;
/** Limits for untrusted bundles. */
export declare const MAX_SOLUTION_TICKS = 36000;
export declare const MAX_AUTHOR = 60;
export declare const MAX_NOTES = 20000;
export declare const MAX_BUNDLE_CHARS = 400000;
export type BundleResult = {
    ok: true;
    bundle: LevelBundle;
} | {
    ok: false;
    errors: string[];
};
export declare function makeBundle(level: LevelDef, solutions?: Replay[], meta?: {
    author?: string;
    notes?: string;
    tool?: string;
}): LevelBundle;
/**
 * Read an untrusted bundle (or a bare level file, which becomes a bundle with no solutions).
 * Rejects anything this game would not play exactly as its maker did.
 */
export declare function parseBundle(raw: unknown): BundleResult;
/** The solution replay for a group of elements (any order), if the bundle has one. */
export declare function bundleSolution(bundle: LevelBundle, elements: readonly Element[]): Replay | null;
export interface SolutionCheck {
    elements: Element[];
    won: boolean;
    /** Ticks to win (or how far the replay got). */
    ticks: number;
    deaths: number;
    gems: number;
    gemsTotal: number;
    parTicks: number;
    /** Gems the replay left behind, as "element gem at x,y" (tile coordinates). */
    gemsLeft: string[];
    /** With `necessity`: for each player, whether the level can't be finished while they wait at their own exit. */
    necessary?: boolean[];
}
/** Ticks a replay may run past its recorded completion (the level tests allow the same). */
export declare const TICK_SLACK = 5;
/** Play a solution against the level: does it win with no deaths, take every gem, beat par; is everyone needed? */
export declare function checkSolution(level: LevelDef, replay: Replay, opts?: {
    necessity?: boolean;
}): SolutionCheck;
/** Whether a check earns all three stars: a clean win, every gem, within par. */
export declare function threeStars(c: SolutionCheck): boolean;
/** Pack a bundle into a short text code for a play link. */
export declare function encodeBundle(bundle: LevelBundle): string;
/** Unpack a play-link code into untrusted JSON (give it to parseBundle). Throws on a broken code. */
export declare function decodeBundle(code: string): unknown;
