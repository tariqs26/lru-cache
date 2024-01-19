import type { CacheValue } from "./types"

/**
 * Class representing a cache
 */
export default class Cache {
  private readonly cache: Record<PropertyKey, CacheValue> = {}

  /**
   * Retrieve entry from cache
   * @param {PropertyKey} key - Key associated with the entry
   * @returns {CacheValue} - Value stored in the entry
   */
  get(key: string): CacheValue {
    const value = this.cache[key]

    if (value === undefined) throw new Error("CacheError: key not found")

    return value
  }

  /**
   * Create or update entry in cache
   * @param {PropertyKey} key - Key for the entry
   * @param {CacheValue} value - Value to be stored
   */
  set(key: PropertyKey, value: CacheValue) {
    this.cache[key] = value
  }

  /**
   * Remove entry from cache
   * @param {PropertyKey} key - Key for the entry
   */
  remove(key: PropertyKey) {
    delete this.cache[key]
  }
}
