# Simple Cache

A simple lightweight LRU cache implementation using a doubly linked list and hashmap.

## Implementation

Implementation utilizes a hashmap to associate keys with doubly linked list nodes, and doubly linked list to arrange entries accordingly. This structure enables a constant running time complexity for all methods, `get`, `set`, `remove`, and `clear`.

- New entries are inserted at the head of the list
- Least recently used entries are removed
- When the cache reaches its maximum capacity the last node accessed by the tail pointer is removed
- Subsequent access to entries results in their relocation to the head of the list, ensuring a continuous update of access recency

## Installation

```bash
npm i simple-kv-cache
```

## Usage

```ts
import { LRUCache } from "simple-kv-cache"

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
