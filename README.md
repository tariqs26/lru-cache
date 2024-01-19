# Simple Cache

> A very basic key-value pair cache

## Installation

```
npm i simple-kv-cache
```

## Usage

```ts
import Cache from "simple-kv-cache"

const cache = new Cache()

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
