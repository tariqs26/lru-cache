import { CacheValue } from "../types"

export class DLLNode {
  constructor(
    public key: PropertyKey,
    public value: CacheValue,
    public prev: DLLNode | null = null,
    public next: DLLNode | null = null
  ) {
    this.key = key
    this.value = value
    this.prev = prev
    this.next = next
  }
}

export class DLL {
  constructor(
    private head: DLLNode | null = null,
    private tail: DLLNode | null = null
  ) {
    this.head = head
    this.tail = tail
  }

  insert(key: PropertyKey, value: CacheValue) {
    const newNode = new DLLNode(key, value)

    if (this.head === null && this.tail === null) {
      this.head = this.tail = newNode
    } else if (this.head !== null) {
      const next = this.head
      newNode.next = next
      next.prev = newNode
      this.head = newNode
    }

    return newNode
  }

  remove(node: DLLNode) {
    if (this.head === null || this.tail === null) return

    if (this.head === this.tail) {
      this.head = this.tail = null
      return
    }

    if (node === this.head) {
      const nextNode = this.head.next
      this.head = nextNode
      return
    }

    if (node === this.tail) {
      const prevNode = this.tail.prev
      if (prevNode) {
        prevNode.next = null
        this.tail = prevNode
      }
      return
    }

    const prevNode = node.prev
    const nextNode = node.next
    if (prevNode) prevNode.next = nextNode
    if (nextNode) nextNode.prev = prevNode
  }

  removeTail() {
    if (this.tail !== null && this.head !== this.tail) {
      const prevNode = this.tail.prev
      const prevKey = this.tail.key
      this.tail = null
      if (prevNode !== null) {
        prevNode.next = null
        this.tail = prevNode
      }
      return prevKey
    }
  }

  toString() {
    let current = this.head
    let str = ""

    while (current !== null) {
      str += `(${String(current.key)}:${current.value}) <-> `
      current = current.next
    }

    return str + "null"
  }
}
