import { CacheSync } from "../abstract-classes"
import { DLLNode } from "../data-structures/dll-node"
import { DLL } from "../data-structures/dll"
import type { CacheDLLData, CacheValue } from "../types"

export class LRUCache extends CacheSync {
  protected cache: Record<PropertyKey, DLLNode<CacheDLLData>> = {}
  protected list: DLL<CacheDLLData> = new DLL()

  set(key: PropertyKey, value: CacheValue) {
    const currentNode = this.cache[key]

    if (currentNode !== undefined) this.list.remove(currentNode)
    else this._capacity++

    this.cache[key] = this.list.insert({ key, value })

    this.evict()
  }

  protected evict() {
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
