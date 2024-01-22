import { DLLNode } from "./dll-node"

export class DLL<T> {
  constructor(
    public head: DLLNode<T> | null = null,
    public tail: DLLNode<T> | null = null
  ) {
    this.head = head
    this.tail = tail
  }

  insert(data: T) {
    const newNode = new DLLNode<T>(data)

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

  remove(node: DLLNode<T>) {
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
    if (this.tail !== null) {
      const prevNode = this.tail.prev
      const prevData = this.tail.data
      this.tail = null
      if (prevNode !== null) {
        prevNode.next = null
        this.tail = prevNode
      }
      return prevData
    }
  }

  removeHead() {
    if (this.head !== null) {
      const nextNode = this.head.next
      const headData = this.head.data
      this.head = null
      if (nextNode !== null) {
        nextNode.prev = null
        this.head = nextNode
      }
      return headData
    }
  }
}
