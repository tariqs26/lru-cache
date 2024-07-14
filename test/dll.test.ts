import { DLL, DLLNode } from "../src/dll"

describe("DLL module", () => {
  let list: DLL<number>

  beforeEach(() => {
    list = new DLL()
  })

  test("insert", () => {
    list.insert(10)
    expect(list.size).toBe(1)
    expect(list.head?.data).toBe(10)
    expect(list.tail?.data).toBe(10)

    list.insert(20)
    expect(list.size).toBe(2)
    expect(list.head?.data).toBe(20)
    expect(list.tail?.data).toBe(10)
  })

  test("remove", () => {
    // removing node from empty list
    expect(list.remove(new DLLNode(20))).toBeUndefined()

    const tail = list.insert(10)
    const toRemove = list.insert(20)
    const head = list.insert(30)

    // removing node between head and tail
    expect(list.remove(toRemove)).toBe(20)
    expect(list.head).toStrictEqual(head)
    expect(list.tail).toStrictEqual(tail)
    expect(list.size).toBe(2)

    // removing tail node
    expect(list.remove(tail)).toBe(10)
    expect(list.head).toStrictEqual(head)
    expect(list.tail).toStrictEqual(head)
    expect(list.size).toBe(1)

    // removing head node
    expect(list.remove(head)).toEqual(30)
    expect(list.head).toBeNull()
    expect(list.size).toBe(0)
  })

  test("removeTail", () => {
    list.insert(10)
    const tail = list.insert(20)

    expect(list.removeTail()).toBe(10)
    expect(list.tail).toStrictEqual(tail)
    expect(list.size).toBe(1)

    expect(list.removeTail()).toBe(20)
    expect(list.size).toBe(0)
    expect(list.removeTail()).toBeUndefined()
  })

  test("clear", () => {
    list.insert(10)
    list.insert(20)
    list.clear()

    expect(list.size).toBe(0)
    expect(list.head).toBeNull()
    expect(list.tail).toBeNull()
  })
})
