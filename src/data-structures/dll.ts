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

    if (this.head === null) this.head = this.tail = newNode
    else {
      const next = this.head
      newNode.next = next
      next.prev = newNode
      this.head = newNode
    }

    return newNode
  }

  insertAtTail(data: T) {
    const newNode = new DLLNode<T>(data)

    if (this.head === null) this.head = this.tail = newNode
    else if (this.tail !== null) {
      const prev = this.tail
      newNode.prev = prev
      prev.next = newNode
      this.tail = newNode
    }

    return newNode
  }

  remove(node: DLLNode<T>) {
    if (this.head === null) return

    if (this.head === this.tail) {
      this.head = this.tail = null
    } else if (node === this.head) {
      const nextNode = this.head.next
      this.head = nextNode
    } else if (node === this.tail) {
      const prevNode = this.tail.prev
      if (prevNode) {
        prevNode.next = null
        this.tail = prevNode
      }
    } else {
      const prevNode = node.prev
      const nextNode = node.next

      if (prevNode) prevNode.next = nextNode
      if (nextNode) nextNode.prev = prevNode
    }

    return node.data
  }

  removeHead() {
    if (this.head !== null) return this.remove(this.head)
  }

  removeTail() {
    if (this.tail !== null) return this.remove(this.tail)
  }

  get size() {
    let [current, size] = [this.head, 0]

    while (current !== null) {
      size++
      current = current.next
    }

    return size
  }
}
