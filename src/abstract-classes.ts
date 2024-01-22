import { CacheOptions, CachePromise, CacheValue } from "./types"

const MIN_MAX_CAPACITY = 1
const MAX_MAX_CAPACITY = 1000000

export class BaseCache {
  protected _capacity: number = 0
  constructor(
    protected options: CacheOptions = {
      maxCapacity: 1000,
    }
  ) {
    this.options = {
      ...options,
      maxCapacity: Math.min(
        MAX_MAX_CAPACITY,
        Math.max(MIN_MAX_CAPACITY, options.maxCapacity)
      ),
    }
  }

  get capacity() {
    return this._capacity
  }
}

export abstract class CacheSync extends BaseCache {
  /**
   * Create or update entry in cache
   * @param {PropertyKey} key - Key for the entry
   * @param {CacheValue} value - Value to be stored
   */
  abstract set(key: PropertyKey, value: CacheValue): void

  /**
   * Retrieve entry from cache
   * @param {PropertyKey} key - Key associated with the entry
   * @returns {CacheValue} - Value stored in the entry
   */
  abstract get(key: PropertyKey): CacheValue | undefined

  /**
   * Remove entry from cache
   * @param {PropertyKey} key - Key for the entry
   */
  abstract remove(key: PropertyKey): void
}

export abstract class CacheAsync extends BaseCache {
  /**
   * Create or update entry in cache
   * @param {PropertyKey} key - Key for the entry
   * @param {CacheValue} value - Value to be stored
   * @returns {Promise}
   */
  abstract set(key: PropertyKey, value: CacheValue): Promise<void>

  /**
   * Retrieve entry from cache
   * @param {PropertyKey} key - Key associated with the entry
   * @returns {Promise<CacheValue | undefined>} Stored value if found otherwise undefined
   */
  abstract get(key: PropertyKey): CachePromise

  /**
   * Remove entry from cache
   * @param {PropertyKey} key - Key for the entry
   * @returns {Promise}
   */
  abstract remove(key: PropertyKey): Promise<void>
}
