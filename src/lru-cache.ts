import { DLL, type DLLNode } from "./dll"
import type { CacheDLLData, CacheOptions, CacheValue } from "./types"

const MIN_MAX_CAPACITY = 1
const MAX_MAX_CAPACITY = 1000000

export class LRUCache {
  protected cache: Record<PropertyKey, DLLNode<CacheDLLData>> = {}
  protected list: DLL<CacheDLLData> = new DLL()

  protected _capacity = 0
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

  set(key: PropertyKey, value: CacheValue) {
    const currentNode = this.cache[key]

    if (currentNode !== undefined) this.list.remove(currentNode)
    else this._capacity++

    this.cache[key] = this.list.insert({ key, value })

    this.evict()
  }

  private evict() {
    if (this.capacity > this.options.maxCapacity) {
      const removalData = this.list.removeTail()

      if (removalData !== undefined) {
        delete this.cache[removalData.key]
        this._capacity--
      }
    }
  }

  get(key: PropertyKey) {
    const currentNode = this.cache[key]
    if (currentNode !== undefined) {
      this.list.remove(currentNode)
      this.list.insert(currentNode.data)
      return currentNode.data.value
    }
  }

  remove(key: PropertyKey) {
    const currentNode = this.cache[key]
    if (currentNode !== undefined) {
      this.list.remove(currentNode)
      delete this.cache[key]
      this._capacity--
    }
  }

  clear() {
    this.cache = {}
    this.list = new DLL()
    this._capacity = 0
  }
}
