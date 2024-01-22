import { MRUCache } from "./../src/caches/mru-cache"
import type { CacheOptions } from "../src"
import { SimpleCache, LRUCache, FIFOCache } from "../src"
import { CacheSync } from "../src/abstract-classes"

const cacheOptions: CacheOptions = {
  maxCapacity: 2,
}

describe("Cache module", () => {
  let caches: CacheSync[]

  beforeEach(() => {
    caches = [
      new SimpleCache(),
      new FIFOCache(cacheOptions),
      new LRUCache(cacheOptions),
      new MRUCache(cacheOptions),
    ]
  })

  it("set", () => {
    for (const cache of caches) {
      cache.set("users", [{ id: 1, name: "John doe" }])
      expect(cache.get("users")).toStrictEqual([{ id: 1, name: "John doe" }])
      expect(cache.capacity).toBe(1)
      
      cache.set("users", [])
      expect(cache.get("users")).toStrictEqual([])
      
      cache.set("enabled", true)
      expect(cache.get("enabled")).toBe(true)
      expect(cache.capacity).toBe(2)
      
      cache.set("gpu", "RTX 4090")
      expect(cache.get("gpu")).toBe("RTX 4090")

      if (cache instanceof MRUCache) {
        expect(cache.get("enabled")).toBeUndefined()
        expect(cache.get("users")).toStrictEqual([])
        expect(cache.capacity).toBe(2)
      } else if (cache instanceof LRUCache) {
        expect(cache.get("enabled")).toBe(true)
        expect(cache.get("users")).toBeUndefined()
        expect(cache.capacity).toBe(2)
      }
    }
  })

  it("get", () => {
    for (const cache of caches) {
      expect(cache.get("user")).toBeUndefined()
      cache.set("count", 0)
      expect(cache.get("count")).toBe(0)
    }
  })

  it("remove", () => {
    for (const cache of caches) {
      cache.set("count", 0)
      cache.remove("count")
      expect(cache.get("count")).toBeUndefined()
      expect(cache.capacity).toBe(0)
      cache.remove("key_not_in_cache")
      expect(cache.capacity).toBe(0)
    }
  })
})
