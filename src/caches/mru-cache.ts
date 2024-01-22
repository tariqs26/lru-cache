import { CacheValue, LRUCache } from ".."

export class MRUCache extends LRUCache {
  set(key: PropertyKey, value: CacheValue) {
    const currentNode = this.cache[key]

    if (currentNode !== undefined) this.list.remove(currentNode)
    else {
      this._capacity++
      this.evict()
    }

    this.cache[key] = this.list.insert({ key, value })
  }

  protected evict() {
    if (this.capacity > this.options.maxCapacity) {
      const removalData = this.list.removeHead()

      if (removalData !== undefined) {
        delete this.cache[removalData.key]
        this._capacity--
      }
    }
  }
}
