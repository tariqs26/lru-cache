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
    // Removing node from empty list
    expect(list.remove(new DLLNode(20))).toBeUndefined()

    const tail = list.insert(10)
    const toRemove = list.insert(20)
    const head = list.insert(30)

    // Node removed is between head and tail
    const middleNodeData = list.remove(toRemove)

    expect(middleNodeData).toBe(20)
    expect(list.head).toStrictEqual(head)
    expect(list.tail).toStrictEqual(tail)
    expect(list.size).toBe(2)

    // Node removed is the tail
    const tailData = list.remove(tail)

    expect(tailData).toBe(10)
    expect(list.head).toStrictEqual(head)
    expect(list.tail).toStrictEqual(head)
    expect(list.size).toBe(1)

    // Node removed is the head
    const headData = list.remove(head)

    expect(headData).toEqual(30)
    expect(list.head).toBeNull()
    expect(list.size).toBe(0)
  })

  test("removeTail", () => {
    list.insert(10)
    const tail = list.insert(20)
    const removedData = list.removeTail()
    expect(list.tail).toStrictEqual(tail)
    expect(list.size).toBe(1)
    expect(removedData).toBe(10)
  })
})
