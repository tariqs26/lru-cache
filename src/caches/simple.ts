import { CacheSync } from "../abstract-classes"
import { CacheValue } from "../types"

export class SimpleCache extends CacheSync {
  private readonly cache: Record<PropertyKey, CacheValue> = {}
  

  get(key: string): CacheValue | undefined {
    return this.cache[key]
  }

  set(key: PropertyKey, value: CacheValue) {
    const exists = this.cache[key]

    if (exists === undefined) this._capacity++

    this.cache[key] = value
  }

  remove(key: PropertyKey) {
    if (this.cache[key] !== undefined) this._capacity--

    delete this.cache[key]
  }
}
