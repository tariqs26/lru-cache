import type { CacheValue } from "../types"
import { LRUCache } from "./lru-cache"

export class FIFOCache extends LRUCache {
  set(key: PropertyKey, value: CacheValue) {
    const currentNode = this.cache[key]

    if (currentNode === undefined) {
      this.cache[key] = this.list.insert({ key, value })
      this._capacity++
    } else {
      currentNode.data.value = value
      this.cache[key] = currentNode
    }

    this.evict()
  }

  get(key: PropertyKey) {
    const currentNode = this.cache[key]
    if (currentNode !== undefined) return currentNode.data.value
  }
}
