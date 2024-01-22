# Simple Cache

Collection of key-value pair cache implementations

Implementations include:

- Simple cache using hashmap
- LRU cache implemented using a hashmap with doubly linked list

## Installation

```
npm i simple-kv-cache
```

## Usage

```ts
import { SimpleCache, LRUCache } from "simple-kv-cache"

const cache = new SimpleCache()

const lruCache = new LRUCache({
  maxCapacity: 5000, // specify options
})

// Store value in cache
cache.set("users", [
  {
    id: 1,
    name: "John Doe",
  },
])

// Retrieve value from cache
cache.get("users")

// Remove value from cache
cache.remove("users")
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
