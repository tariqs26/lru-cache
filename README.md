# Simple Cache

LRU cache implemented with a hashmap and doubly linked list.

## Implementation

- **Hashmap**: Associates keys with doubly linked list nodes.
- **Doubly Linked List**: Manages entries by access recency.
  - New entries are inserted at the head.
  - When the cache is full, the tail (least recently used) entry is removed.
  - Accessing an entry moves it to the head, updating its recency.

## Installation

```bash
npm i simple-kv-cache
```

## Usage

```ts
import { LRUCache } from "simple-kv-cache"

const cache = new LRUCache({
  maxCapacity: 5000, // default is 1000
})

// store value
cache.set("users", [
  {
    id: 1,
    name: "John Doe",
  },
])

// retrieve value
cache.get("users")

// remove value
cache.remove("users")

// remove all values
cache.clear()
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
