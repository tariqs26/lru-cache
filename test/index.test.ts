import Cache from "../src"

const keyNotFoundErrorMessage = "CacheError: key not found"

describe("Cache module", () => {
  let cache: Cache

  beforeEach(() => {
    cache = new Cache()
  })

  it("set", () => {
    cache.set("users", [{ id: 1, name: "John doe" }])
    expect(cache.get("users")).toStrictEqual([{ id: 1, name: "John doe" }])
  })

  it("get", () => {
    expect(() => cache.get("user")).toThrow(keyNotFoundErrorMessage)
    cache.set("count", 0)
    expect(cache.get("count")).toBe(0)
  })

  it("remove", () => {
    expect(() => cache.remove("foo")).toThrow(keyNotFoundErrorMessage)
    cache.set("isAdmin", true)
    cache.remove("isAdmin")
    expect(() => cache.get("isAdmin")).toThrow(keyNotFoundErrorMessage)
  })
})
