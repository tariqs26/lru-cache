export class DLLNode<T> {
  constructor(
    public data: T,
    public prev: DLLNode<T> | null = null,
    public next: DLLNode<T> | null = null
  ) {
    this.data = data
    this.prev = prev
    this.next = next
  }
}

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

  remove(node: DLLNode<T>) {
    if (this.head === null) return

    if (this.head === this.tail) {
      this.head = this.tail = null
    } else if (node === this.head) {
      const nextNode = this.head.next
      this.head = nextNode
    } else if (node === this.tail) {
      const prevNode = this.tail.prev
      prevNode!.next = null
      this.tail = prevNode
    } else {
      const prevNode = node.prev
      const nextNode = node.next

      if (prevNode) prevNode.next = nextNode
      if (nextNode) nextNode.prev = prevNode
    }

    return node.data
  }

  removeTail() {
    if (this.tail !== null) return this.remove(this.tail)
  }

  get size() {
    let size = 0
    for (let current = this.head; current !== null; current = current.next)
      size++

    return size
  }
}
