type CachePrimitives = string | number | boolean | null

type CacheArray = Array<CachePrimitives | CacheArray | CacheObject>

type CacheObject = {
  [key: PropertyKey]: CachePrimitives | CacheArray | CacheObject
}

export type CacheValue = CachePrimitives | CacheArray | CacheObject
