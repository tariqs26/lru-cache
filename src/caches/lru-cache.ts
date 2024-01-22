import { CacheSync } from "../abstract-classes"
import { DLL, DLLNode } from "../data-structures/dll"
import type { CacheValue } from "../types"

export class LRUCache extends CacheSync {
  private readonly cache: Record<PropertyKey, DLLNode> = {}
  private readonly list: DLL = new DLL()

  get(key: PropertyKey) {
    const currentNode = this.cache[key]
    if (currentNode !== undefined) {
      this.list.remove(currentNode)
      this.list.insert(key, currentNode.value)
      return currentNode.value
    }
  }

  set(key: PropertyKey, value: CacheValue) {
    const currentNode = this.cache[key]

    if (currentNode !== undefined) this.list.remove(currentNode)
    else this._capacity++

    this.cache[key] = this.list.insert(key, value)

    if (this.capacity > this.options.maxCapacity) {
      const removalKey = this.list.removeTail()

      if (removalKey) {
        delete this.cache[removalKey]
        this._capacity--
      }
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
}
