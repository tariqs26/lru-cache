export class DLLNode<T> {
  constructor(
    public data: T,
    public prev: DLLNode<T> | null = null,
    public next: DLLNode<T> | null = null
  ) {}
}

export class DLL<T> {
  constructor(
    public head: DLLNode<T> | null = null,
    public tail: DLLNode<T> | null = null
  ) {}

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
    if (this.head === this.tail) this.head = this.tail = null
    else if (node === this.head) this.head = this.head.next
    else if (node === this.tail) {
      this.tail = this.tail.prev
      this.tail!.next = null
    } else {
      if (node.prev) node.prev.next = node.next
      if (node.next) node.next.prev = node.prev
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

  clear() {
    this.head = this.tail = null
  }
}
