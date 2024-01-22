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
  