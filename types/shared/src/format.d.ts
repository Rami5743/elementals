import { type EntityDef, type EntityType, type LevelDef } from './level.js';
/**
 * Versions of the level format, so levels made outside the repo (the Level Kit, the editor) keep
 * working as the game grows, and a game that is too old says so instead of playing them wrong.
 *
 * Every part of the format (level field, entity type, entity field, mode, tile) is registered
 * with the format version that introduced it. A level needs the newest version among the parts
 * it uses, so a level that uses no new feature still plays in older games.
 *
 * Adding a feature (see docs/ADDING_FEATURES.md):
 * 1. Add it as a new entity type, a new optional field, a new mode or a new tile. Its absence
 *    must mean exactly the old behaviour: never change a default or what an existing field does.
 * 2. Raise LEVEL_FORMAT by one and register the new part here with that number. The typed
 *    tables below stop compiling until a new type, field or mode is registered.
 */
export declare const LEVEL_FORMAT = 1;
/** Top-level level fields. */
export declare const LEVEL_FIELD_SINCE: Record<keyof LevelDef, number>;
export declare const ENTITY_TYPE_SINCE: Record<EntityType, number>;
export declare const ENTITY_FIELD_SINCE: Record<keyof EntityDef, number>;
export declare const MODE_SINCE: Record<NonNullable<EntityDef['mode']>, number>;
/** Tile characters (both "." and " " are empty). */
export declare const TILE_SINCE: Record<string, number>;
export interface FormatNeeds {
    /** The level format a game must read to play this level. */
    version: number;
    /** Parts this game doesn't know at all (most likely from a newer game). */
    unknown: string[];
}
/** Which format version a level (untrusted JSON) needs, and anything in it this game doesn't know. */
export declare function formatNeeds(raw: unknown): FormatNeeds;
/** Every entity type and tile the game knows is registered (checked by the tests). */
export declare function unregisteredParts(): string[];
