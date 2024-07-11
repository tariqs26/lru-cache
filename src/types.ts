type CachePrimitives = string | number | boolean | null  | bigint | symbol | Date | undefined

type CacheArray = Array<CachePrimitives | CacheArray | CacheObject>

type CacheObject = {
  [key: PropertyKey]: CachePrimitives | CacheArray | CacheObject
}

export type CacheValue = CachePrimitives | CacheArray | CacheObject

export type CacheOptions = {
  maxCapacity: number
}

export type CacheDLLData = {
  key: PropertyKey
  value: CacheValue
}
