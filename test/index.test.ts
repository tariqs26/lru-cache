import { type CacheOptions, LRUCache } from "../src"

const cacheOptions: CacheOptions = {
  maxCapacity: 3,
}

describe("Cache module", () => {
  let cache: LRUCache

  beforeEach(() => {
    cache = new LRUCache(cacheOptions)
  })

  it("set", () => {
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
    expect(cache.capacity).toBe(3)

    cache.set("list", null)
    expect(cache.get("list")).toBeNull()

    expect(cache.get("users")).toBeUndefined()
    expect(cache.capacity).toBe(3)
  })

  it("get", () => {
    expect(cache.get("user")).toBeUndefined()
    cache.set("count", 0)
    expect(cache.get("count")).toBe(0)
  })

  it("remove", () => {
    cache.set("count", 0)

    cache.remove("count")
    expect(cache.get("count")).toBeUndefined()
    expect(cache.capacity).toBe(0)

    cache.remove("key_not_in_cache")
    expect(cache.capacity).toBe(0)
  })

  it("clear", () => {
    cache.set("count", 0)
    cache.set("name", "Test Name")
    cache.clear()

    expect(cache.get("count")).toBeUndefined()
    expect(cache.get("name")).toBeUndefined()
    expect(cache.capacity).toBe(0)
  })
})
