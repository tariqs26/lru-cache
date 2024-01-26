# Simple Cache

Collection of key-value pair cache implementations

## Implementations

All implementations primarily utilize a hashmap to associate keys with doubly linked list nodes, and doubly linked lists to arrange entries according to the respective strategy. This structure enables a constant running time complexity for all methods, `get`, `set`, `remove`, and `clear`.

- **FIFO**
  - Entries are removed in order of insertion regardless of their access frequency
  - New entries are inserted at the head of the list
  - When the cache reaches its maximum capacity the last node accessed by the tail pointer is removed
- **LRU**
  - Least recently used entries are removed
  - Same initial insertion and removal approach as FIFO
  - Subsequent access to entries results in their relocation to the head of the list, ensuring a continuous update of access recency
- **MRU**
  - Shares initial insertion and update approach with LRU
  - When the cache is full, the first node accessed by the head pointer is removed
- **LFU**
  - Uses a nested doubly linked list, with first level for organizing entries by frequency sorted low to high and with the nested list at each frequency node storing the cache entry nodes
  - Initial insertion assigns entries to the list of the node with frequency 1, accessible via the head pointer
  - Subsequent access increments the hit count of cache entry nodes, moving them to the next list associated with that frequency
  - When the cache reaches maximum capacity, the last node in the list of the lowest frequency node accessed by the tail pointer is removed

## Installation

```
npm i simple-kv-cache
```

## Usage

```ts
import { FIFOCache, LRUCache, MRUCache, LFUCache } from "simple-kv-cache"

const cache = new LRUCache({
  maxCapacity: 5000, // Specify options
})

// Store value
cache.set("users", [
  {
    id: 1,
    name: "John Doe",
  },
])

// Retrieve value
cache.get("users")

// Remove value
cache.remove("users")

// Remove all values
cache.clear()
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
