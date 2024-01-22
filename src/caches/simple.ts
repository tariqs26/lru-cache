import { CacheSync } from "../abstract-classes"
import { CacheValue } from "../types"

export class SimpleCache extends CacheSync {
  private readonly cache: Record<PropertyKey, CacheValue> = {}

  set(key: PropertyKey, value: CacheValue) {
    const exists = this.cache[key]

    if (exists === undefined) this._capacity++

    this.cache[key] = value
  }

  evict() {}

  get(key: string): CacheValue | undefined {
    return this.cache[key]
  }

  remove(key: PropertyKey) {
    if (this.cache[key] !== undefined) {
      this._capacity--
      delete this.cache[key]
    }
  }
}
