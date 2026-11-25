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
    /**
     * The pulley platform this player last stood on (directly or on top of others), as entity index * 2
     * + side, or -1. A jump doesn't take a player's weight off the rope: they count on that platform
     * until they land somewhere else, so hopping can't pump a pulley up.
     */
    ride: number;
}
/** Mutable per-entity state. Every field is a number so state hashes and serializes trivially. */
export interface EntState {
    on: number;
    t: number;
    x: number;
    y: number;
    ry: number;
    vy: number;
    /** Rolling boulders: sideways speed and its sub-pixel remainder. */
    vx: number;
    rx: number;
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
/**
 * Change what a death does in the middle of a go. Anyone already dead under "respawn" would wait
 * forever under "restart level", so their fall becomes the level's: it restarts once their death
 * animation has played and the "was lost" banner shown, just as if they had died under it.
 */
export declare function setDifficulty(state: GameState, difficulty: Difficulty): void;
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
/**
 * The two platforms of a pulley: the first, `d` pixels below where it starts, and the second, at the
 * state's x and y. Both are as wide as the pulley and as thick as a lift.
 */
export declare function pulleyRects(e: WEnt, s: Pick<EntState, 'x' | 'y' | 'd'>): [Rect, Rect];
/** The second platform's width in pixels: `to`'s third number, in tiles, or as wide as the first. */
export declare function pulleyFarW(e: WEnt): number;
/**
 * Where a pulley's two wheels hang, for drawing its rope: over the middle of each platform, under
 * the first rock above the highest point that platform reaches (or the top of the level).
 */
export declare function pulleyWheels(world: World, e: WEnt): [{
    x: number;
    y: number;
}, {
    x: number;
    y: number;
}];
/**
 * The rope between a pulley's two wheels runs square: across and up (or up and across), round a
 * third wheel at the corner. Of the two corners, the one whose rope crosses less rock. Null when the
 * wheels hang at the same height.
 */
export declare function pulleyCorner(world: World, a: {
    x: number;
    y: number;
}, b: {
    x: number;
    y: number;
}): {
    x: number;
    y: number;
} | null;
/** The snatch block's ratio a pulley works with now: its `ratio` while its signal is on (always, if nothing is wired to it), else 1. */
export declare function pulleyRatio(e: WEnt, s: EntState): number;
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
    /** A crate standing on a wooden ledge (and nothing solid), which a player jumping up under it lifts. */
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
    /** Which pulley platform (entity index * 2 + side) standing on `ground` puts a body at `r` on, or -1. */
    updateMovable(i: number): void;
    /**
     * A rolling boulder speeds up down a slope, keeps rolling on level ground until friction stops it,
     * and flies on when it rolls off a ledge. Anything in its way stops it dead: it pushes nobody, so
     * whoever stands below it on a slope holds it there.
     */
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
    /**
     * What weighs on one side of a pulley, in half-units (see PULLEY_WEIGHT): the platform's own weight,
     * everything stacked on it, and whoever jumped off it and hasn't landed yet.
     */
    /**
     * A pulley: two platforms on one rope. The heavier side goes down and lifts the other, `speed`
     * pixels a tick, until the first platform has dropped `range` tiles or is back where it started.
     * Balanced, it stays where it is, empty or not. A platform can weigh something itself (`weights`).
     * A jump off a platform kicks it down a little (`vy` ticks left, `vx` the direction, one pixel a
     * tick); while the pulley is balanced, it then springs back to where the jumper left it (`ry`, while
     * `rx` is set) and waits there.
     * A snatch block (`ratio` k) under the second platform halves (or thirds...) the pull of its load
     * and its travel: it rises one pixel for every k the first platform drops. `t` counts the first
     * platform's pixels towards the second's next one, so going back retraces the same steps.
     */
    /** A jump off side `side` of pulley `i` kicks that platform down a few pixels. */
    /**
     * Move a pulley `n` pixels (of its first platform) in direction `sign`. On the way out it stops as
     * soon as either platform is at its end. After the snatch block is put in or taken out mid-way, the
     * two may get back at different times: then the other one carries on alone, so a pulley going back
     * to the start gets all the way there. Like lifts, it stops on whatever is in its way.
     */
    /** Liquid tile kind the player is touching with feet (below) or sides, or null. */
    touchingLiquid(p: PlayerState): number | null;
    frozenAt(tx: number, ty: number): boolean;
    hazards(): void;
    respawns(): void;
    /**
     * A place to respawn near (x, y) that nothing occupies, so a player never comes back inside
     * someone standing on the save point (or someone who respawned there the same tick). Prefers
     * the nearest spot on the same floor, then any free spot beside it, then on top of whoever is
     * in the way.
     */
    freeSpot(ref: Ref, x: number, y: number, w: number, h: number): {
        x: number;
        y: number;
    };
    checkWin(): void;
}
/**
 * Advance the game one tick. Handles the death→restart cycle so callers (client, server,
 * tests) all share identical behaviour. Returns the (possibly replaced) state.
 */
export declare function stepGame(world: World, state: GameState, inputs: readonly number[]): GameState;
export {};
