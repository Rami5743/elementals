import { type Element } from './constants.js';
import { type Rect, type WEnt, type World } from './world.js';
export interface PlayerState {
    slot: number;
    element: Element;
    x: number;
    y: number;
    rx: number;
    ry: number;
    vx: number;
    vy: number;
    grounded: number;
    coyote: number;
    buffer: number;
    prevIn: number;
    facing: number;
    glide: number;
    pound: number;
    pushing: number;
    dead: number;
    deadT: number;
    inDoor: number;
    drop: number;
    cp: number;
}
/** Mutable per-entity state. Every field is a number so state hashes and serializes trivially. */
export interface EntState {
    on: number;
    t: number;
    x: number;
    y: number;
    ry: number;
    vy: number;
    gone: number;
    open: number;
    d: number;
    rd: number;
    dir: number;
    melt: number;
}
export type GameEventType = 'jump' | 'land' | 'gem' | 'plate' | 'lever' | 'button' | 'death' | 'door' | 'win' | 'melt' | 'douse' | 'torch' | 'smash' | 'freeze' | 'checkpoint' | 'pound' | 'respawn';
export interface GameEvent {
    type: GameEventType;
    slot: number;
    x: number;
    y: number;
}
export type Difficulty = 'restart' | 'checkpoint';
export interface GameState {
    levelId: string;
    elements: Element[];
    difficulty: Difficulty;
    tick: number;
    /** Ticks spent in the current attempt (resets on restart). */
    time: number;
    rng: number;
    phase: 'play' | 'dying' | 'won';
    phaseT: number;
    deaths: number;
    players: PlayerState[];
    ents: EntState[];
    gems: Record<Element | 'neutral', number>;
    events: GameEvent[];
}
export interface StateOptions {
    seed?: number;
    difficulty?: Difficulty;
}
export declare function createState(world: World, opts?: StateOptions): GameState;
/** Restart the attempt while keeping session-level counters. */
export declare function restartState(world: World, prev: GameState): GameState;
/** Deterministic PRNG (mulberry32) stored in state. */
export declare function nextRandom(state: GameState): number;
export declare function overlaps(a: Rect, b: Rect): boolean;
/** Actor reference: players are 0..3, movable entities (box/boulder) are 100 + entity index. */
type Ref = number;
interface SolidPart {
    r: Rect;
    dx: number;
    dy: number;
}
type Blocker = {
    k: 'tile';
} | {
    k: 'solid';
    i: number;
} | {
    k: 'actor';
    ref: Ref;
};
export declare function playerRect(p: PlayerState): Rect;
/** Is the water tile (tx, ty) frozen, under a pool entity that is on? */
export declare function poolFrozenAt(world: World, ents: readonly EntState[], tx: number, ty: number): boolean;
/**
 * The liquid tile that kills an elemental of `element` occupying `r`, and where it is, or null.
 * Liquids are solid floors with a deadly surface, so two probes look just past the body: one a
 * pixel above and below it (head and feet), one a pixel to each side. Frozen water is a safe floor.
 */
export declare function deadlyLiquidHit(world: World, ents: readonly EntState[], element: Element, r: Rect): {
    tile: number;
    tx: number;
    ty: number;
} | null;
/** The tile code of the liquid that kills an elemental occupying `r`, or null (see `deadlyLiquidHit`). */
export declare function deadlyLiquidAt(world: World, ents: readonly EntState[], element: Element, r: Rect): number | null;
export declare function doorRect(e: WEnt, s: EntState): Rect;
export declare function seesawRects(e: WEnt, s: EntState): [Rect, Rect];
/** Rect of a solid entity, or null if it is not currently solid. */
export declare function solidRect(e: WEnt, s: EntState): Rect | null;
/** Signal for a target: how many of its inputs are on, compared with "required". */
export declare function targetSignal(world: World, state: GameState, e: WEnt): boolean;
export declare class Sim {
    readonly world: World;
    readonly state: GameState;
    readonly movables: number[];
    readonly solids: number[];
    constructor(world: World, state: GameState);
    actorRect(ref: Ref): Rect;
    actorMass(ref: Ref): number;
    /** Living players and present movables. Reuses one array: callers must not hold on to it. */
    actors(): Ref[];
    tileBlocks(r: Rect): boolean;
    /** One-way platforms block an actor whose bottom row would enter the platform's top row. */
    oneWayBlocks(r: Rect, dy: number): boolean;
    collide(r: Rect, self: Ref | -1, dy?: number, ignoreOneWay?: boolean): Blocker | null;
    /** Actors standing directly on top of rect r. */
    ridersOf(r: Rect, exclude: Ref | -1): Ref[];
    groundedAt(ref: Ref, r: Rect): Blocker | null;
    /**
     * Move an actor by one pixel. Horizontal moves may climb 1px (slopes), may push movables and
     * carry riders. Upward moves lift riders first so stacks move together.
     */
    moveActorPx(ref: Ref, dx: number, dy: number, push: boolean, depth?: number): boolean;
    /** Move an actor by a float amount along one axis. Returns the blocker if stopped. */
    moveActor(ref: Ref, axis: 'x' | 'y', amount: number, push: boolean, rem: {
        r: number;
    }): boolean;
    /**
     * Move a solid by one pixel (via apply/revert callbacks) pushing overlapped actors and
     * carrying riders. Each part of the solid has its own delta (seesaw halves move in opposite
     * directions). If an actor cannot be pushed out of the way, the move is reverted so nothing is
     * ever crushed into a wall.
     */
    moveSolidPx(parts: () => SolidPart[], apply: () => void, revert: () => void): boolean;
    emit(type: GameEventType, slot: number, x: number, y: number): void;
    step(inputs: readonly number[]): void;
    updatePlayer(p: PlayerState, inp: number): void;
    /**
     * Effective updraft on a player. Whoever stands on them is lifted too, so the fan has to carry
     * the whole stack: sum every member's push from this fan against every member's weight.
     * Air alone rises; Air carrying Fire or Water rises slowly; Air under Earth, a box or a boulder
     * only falls more slowly.
     */
    /** Every actor resting on rect r, directly or on top of others (each once). */
    updateMovable(i: number): void;
    interactions(inputs: readonly number[]): void;
    /** Whether a living player of this element overlaps (or touches within `pad` px) the entity. */
    touchedBy(e: Rect, element: Element, pad?: number): boolean;
    updateSignals(): void;
    updateMechanisms(): void;
    /**
     * A running belt carries whatever stands on it (and whatever stands on them) `speed` pixels a
     * tick. It doesn't touch anyone's velocity, so walking against it is walking at run speed minus
     * the belt's, and a jump leaves the belt behind. A belt runs while its signal is on, or, in
     * "reverse" mode, always, backwards while the signal is on. `d` counts the pixels run, for drawing.
     */
    /** Pixel delta for moving one unit along an axis-aligned path from distance d. */
    /** Liquid tile kind the player is touching with feet (below) or sides, or null. */
    touchingLiquid(p: PlayerState): number | null;
    frozenAt(tx: number, ty: number): boolean;
    hazards(): void;
    respawns(): void;
    checkWin(): void;
}
/**
 * Advance the game one tick. Handles the death→restart cycle so callers (client, server,
 * tests) all share identical behaviour. Returns the (possibly replaced) state.
 */
export declare function stepGame(world: World, state: GameState, inputs: readonly number[]): GameState;
export {};
