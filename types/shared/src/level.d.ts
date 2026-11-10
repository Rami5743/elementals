import { type Element } from './constants.js';
export declare const ENTITY_TYPES: readonly ["plate", "button", "lever", "door", "elevator", "fan", "belt", "box", "boulder", "seesaw", "ice", "firewall", "cracked", "torch", "turbine", "freezepad", "pool", "gem", "exit", "checkpoint", "sign"];
export type EntityType = (typeof ENTITY_TYPES)[number];
/** Entities that drive wiring. */
export declare const TRIGGER_TYPES: readonly EntityType[];
/** Entities that can be wired to. */
export declare const TARGET_TYPES: readonly EntityType[];
export interface EntityDef {
    id?: string;
    type: EntityType;
    /** Tile coordinates of the top-left corner. */
    x: number;
    y: number;
    w?: number;
    h?: number;
    targets?: string[];
    requiresElements?: Element[];
    /** Entity is removed when any of these elements is playing. */
    excludesElements?: Element[];
    weight?: 'light' | 'heavy';
    /** Buttons: toggle (press on/off), timed (on for `duration` ticks), hold (on only while held). Elevators: powered/loop. Belts: reverse (always runs, backwards while on). */
    mode?: 'toggle' | 'timed' | 'hold' | 'powered' | 'loop' | 'reverse';
    duration?: number;
    on?: boolean;
    lit?: boolean;
    required?: number;
    invert?: boolean;
    /** Doors/elevators/fans: stay on once the signal has been satisfied once. */
    latch?: boolean;
    path?: [number, number][];
    /** Elevators: pixels a tick. Belts: pixels a tick they carry riders, negative to the left. */
    speed?: number;
    /** Loop elevators: ticks to wait at each end of the path. */
    pause?: number;
    strength?: number;
    range?: number;
    element?: Element | 'neutral';
    text?: string;
}
export interface LevelDef {
    id: string;
    name: string;
    order: number;
    supports: Element[][];
    tiles: string[];
    spawns: Partial<Record<Element, [number, number]>>;
    entities: EntityDef[];
    /** Ticks for a 3-star time. */
    parTicks?: number;
    dark?: boolean;
    hints?: string[];
    description?: string;
}
export type ValidationResult = {
    ok: true;
    level: LevelDef;
} | {
    ok: false;
    errors: string[];
};
export declare function entityId(e: EntityDef, index: number): string;
/** Whether an entity exists for a given set of active elements. */
export declare function entityActive(e: EntityDef, elements: readonly Element[]): boolean;
export declare function sameSet(a: readonly Element[], b: readonly Element[]): boolean;
export declare function levelSupports(level: LevelDef, elements: readonly Element[]): boolean;
/**
 * Validate untrusted level JSON. Error messages name the level, entity and field so
 * level authors can fix them without reading code.
 */
export declare function validateLevel(raw: unknown): ValidationResult;
