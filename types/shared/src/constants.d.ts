export declare const TILE = 32;
export declare const LEVEL_W = 40;
export declare const LEVEL_H = 22;
export declare const TICK_RATE = 60;
export declare const DT_MS: number;
export declare const ELEMENTS: readonly ["fire", "water", "earth", "air"];
export type Element = (typeof ELEMENTS)[number];
/** Input bits, one byte per player per tick. */
export declare const IN_LEFT = 1;
export declare const IN_RIGHT = 2;
export declare const IN_UP = 4;
export declare const IN_DOWN = 8;
export declare const IN_JUMP = 16;
export declare const IN_INTERACT = 32;
/** Sent by a client along with its input bits: the device holds its restart control (never reaches the simulation). */
export declare const IN_RESTART_HELD = 64;
export declare const COYOTE_TICKS = 6;
export declare const JUMP_BUFFER_TICKS = 6;
export declare const DEATH_TICKS = 60;
export declare const LOST_TICKS = 60;
export declare const DYING_TICKS: number;
export declare const WIN_HOLD_TICKS = 1;
export declare const HEAVY_MASS = 2;
export declare const POUND_VY = 15;
export declare const MELT_TICKS = 20;
export declare const DOOR_SPEED = 4;
export declare const PUSH_SPEED = 1.6;
export declare const GLIDE_TERMINAL = 1.6;
export declare const RESTART_HOLD_TICKS = 60;
export interface Physique {
    w: number;
    h: number;
    run: number;
    accelGround: number;
    accelAir: number;
    decelGround: number;
    decelAir: number;
    jumpV: number;
    jumpCut: number;
    gravity: number;
    terminal: number;
    mass: number;
    fanFactor: number;
}
export declare const PHYSIQUE: Record<Element, Physique>;
/** Liquid each element survives in. */
export declare const SAFE_LIQUID: Record<Element, LiquidKind>;
export type LiquidKind = 'lava' | 'water' | 'mud' | 'mist' | 'sludge';
export declare const LIQUIDS: readonly LiquidKind[];
/** Tile codes */
export declare const T_EMPTY = 0;
export declare const T_SOLID = 1;
export declare const T_SLOPE_R = 2;
export declare const T_SLOPE_L = 3;
export declare const T_ONEWAY = 4;
export declare const T_LAVA = 10;
export declare const T_WATER = 11;
export declare const T_MUD = 12;
export declare const T_MIST = 13;
export declare const T_SLUDGE = 14;
export declare const TILE_CHARS: Record<string, number>;
export declare const LIQUID_OF_TILE: Record<number, LiquidKind>;
export declare function isLiquidTile(t: number): boolean;
/** Liquid tiles are solid floors with a deadly surface; touching the surface checks the element. */
export declare function liquidKills(element: Element, liquid: LiquidKind): boolean;
