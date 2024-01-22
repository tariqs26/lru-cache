import { CacheSync } from "../abstract-classes"
import { DLLNode } from "../data-structures/dll-node"
import { DLL } from "../data-structures/dll"
import type { CacheDLLData, CacheValue } from "../types"

type FrequencyData = CacheDLLData & {
  hits: number
  frequencyNode: DLLNode<FrequencyListData>
}

type FrequencyListData = {
  frequency: number
  list: DLL<FrequencyData>
}

export class LFUCache extends CacheSync {
  protected cache: Record<PropertyKey, DLLNode<FrequencyData>> = {}
  protected frequencyList: DLL<FrequencyListData> = new DLL()

  set(key: PropertyKey, value: CacheValue) {
    const currentNode = this.cache[key]

    if (currentNode !== undefined) {
      currentNode.data.value = value
      this.updateFrequencyList(currentNode)
    } else {
      this._capacity++

      this.evict()

      let currentFrequency = this.frequencyList.head

      if (currentFrequency === null || currentFrequency.data.frequency !== 1) {
        currentFrequency = this.frequencyList.insert({
          frequency: 1,
          list: new DLL(),
        })
      }

      const newNode = currentFrequency.data.list.insert({
        key,
        value,
        hits: 1,
        frequencyNode: currentFrequency,
      })

      this.cache[key] = newNode
    }
  }

  protected evict() {
    if (this.capacity > this.options.maxCapacity) {
      const minFrequency = this.frequencyList.head

      if (minFrequency === null) return

      const minFrequencyList = minFrequency.data.list

      const removalData = minFrequencyList.removeTail()

      if (minFrequencyList.head === null) this.frequencyList.removeHead()

      if (removalData !== undefined) {
        delete this.cache[removalData.key]
        this._capacity--
      }
    }
  }

  get(key: PropertyKey) {
    const currentNode = this.cache[key]

    if (currentNode !== undefined) {
      this.updateFrequencyList(currentNode)
      return currentNode.data.value
    }
  }

  private updateFrequencyList(currentNode: DLLNode<FrequencyData>) {
    const currentNodeFrequencyNode = currentNode.data.frequencyNode

    currentNodeFrequencyNode.data.list.remove(currentNode)

    currentNode.data.hits++

    const nextFrequencyNode = currentNodeFrequencyNode.next

    let newParentFrequencyNode: DLLNode<FrequencyListData> | undefined

    if (nextFrequencyNode === null) {
      currentNode.next = currentNode.prev = null
      newParentFrequencyNode = this.frequencyList.insertAtTail({
        frequency: currentNode.data.hits,
        list: new DLL(currentNode, currentNode),
      })
    } else if (nextFrequencyNode.data.frequency !== currentNode.data.hits) {
      currentNode.next = currentNode.prev = null

      newParentFrequencyNode = new DLLNode<FrequencyListData>(
        {
          frequency: currentNode.data.hits,
          list: new DLL(currentNode, currentNode),
        },
        currentNodeFrequencyNode,
        nextFrequencyNode
      )

      nextFrequencyNode.prev = newParentFrequencyNode

      currentNodeFrequencyNode.next = newParentFrequencyNode
    } else {
      const newNode = nextFrequencyNode.data.list.insert(currentNode.data)
      currentNodeFrequencyNode.data.list.remove(currentNode)
      this.cache[currentNode.data.key] = newNode
      newNode.data.frequencyNode = nextFrequencyNode
    }

    this.removeEmptyFrequencyNode(currentNodeFrequencyNode)

    if (newParentFrequencyNode)
      currentNode.data.frequencyNode = newParentFrequencyNode
  }

  remove(key: PropertyKey) {
    const currentNode = this.cache[key]
    if (currentNode !== undefined) {
      const currentNodeFrequencyNode = currentNode.data.frequencyNode
      currentNodeFrequencyNode.data.list.remove(currentNode)
      this.removeEmptyFrequencyNode(currentNodeFrequencyNode)
      delete this.cache[key]
      this._capacity--
    }
  }

  private removeEmptyFrequencyNode(node: DLLNode<FrequencyListData>) {
    if (node.data.list.head === null) this.frequencyList.remove(node)
  }

  clear() {
    this.cache = {}
    this.frequencyList = new DLL()
    this._capacity = 0
  }
}
