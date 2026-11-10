import { type Element } from './constants.js';
import { type EntityDef, type EntityType, type LevelDef } from './level.js';
export interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
}
/** Static (immutable) per-entity data, resolved to pixels. */
export interface WEnt {
    i: number;
    id: string;
    type: EntityType;
    def: EntityDef;
    x: number;
    y: number;
    w: number;
    h: number;
    /** Indices of entities this trigger drives. */
    targets: number[];
    /** Indices of triggers that drive this entity. */
    inputs: number[];
    /** Elevator path in pixels (axis-aligned segments). */
    path: {
        x: number;
        y: number;
    }[];
    pathLen: number;
}
/** Static world built from a level for one specific element set. */
export interface World {
    level: LevelDef;
    elements: Element[];
    tiles: Uint8Array;
    ents: WEnt[];
    spawns: Record<Element, {
        x: number;
        y: number;
    }>;
    exitOf: Partial<Record<Element, number>>;
}
export declare const ELEVATOR_H = 16;
export declare const PLATE_H = 8;
export declare const SEESAW_H = 12;
export declare function tileIndex(tx: number, ty: number): number;
export declare function buildWorld(level: LevelDef, elements: readonly Element[]): World;
export declare function tileAt(world: World, tx: number, ty: number): number;
