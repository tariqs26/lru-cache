import { DLL, type DLLNode } from "./dll"
import type { CacheOptions } from "./types"

export class LRUCache<TKey = unknown, TValue = unknown> {
  private _capacity = 0
  private cache = new Map<TKey, DLLNode<{ key: TKey; value: TValue }>>()
  private list = new DLL<{ key: TKey; value: TValue }>()

  constructor(private options: CacheOptions = { maxCapacity: 1000 }) {
    this.options = {
      ...options,
      maxCapacity: Math.min(
        Number.MAX_SAFE_INTEGER,
        Math.max(1, options.maxCapacity)
      ),
    }
  }

  get capacity() {
    return this._capacity
  }

  set(key: TKey, value: TValue) {
    const currentNode = this.cache.get(key)
    if (currentNode !== undefined) this.list.remove(currentNode)
    else this._capacity++
    this.cache.set(key, this.list.insert({ key, value }))
    this.evict()
  }

  private evict() {
    if (this.capacity <= this.options.maxCapacity) return
    if (this.list.tail === null) return
    const removalData = this.list.remove(this.list.tail)
    if (removalData === undefined) return
    this.cache.delete(removalData.key)
    this._capacity--
  }

  get(key: TKey) {
    const currentNode = this.cache.get(key)
    if (currentNode === undefined) return
    this.list.remove(currentNode)
    const newNode = this.list.insert(currentNode.data)
    this.cache.set(key, newNode)
    return newNode.data.value
  }

  remove(key: TKey) {
    const currentNode = this.cache.get(key)
    if (currentNode === undefined) return
    this.list.remove(currentNode)
    this.cache.delete(key)
    this._capacity--
  }

  clear() {
    this.cache.clear()
    this.list.clear()
    this._capacity = 0
  }
}
