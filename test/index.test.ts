import { SimpleCache, LRUCache } from "../src"
import { CacheSync } from "../src/abstract-classes"

describe("Cache module", () => {
  let caches: CacheSync[]

  beforeEach(() => {
    caches = [new SimpleCache(), new LRUCache()]
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
