import { useState } from 'react'

export function useSet<T>(data?: {
  initialList?: Array<T> | Set<T> | (() => Array<T> | Set<T>)
  onChange?: (newSet: Set<T>) => void
}) {
  const [set, _updateSet] = useState((): Set<T> => {
    return getInitialValue<T>(data?.initialList)
  })

  const updateSet = (val: typeof set) => {
    _updateSet(val)

    data?.onChange?.(val)
  }

  return {
    /**
     * @dangerous
     * Should not be used unless you *really* know what you are doing
     */
    __dangerousSetReference: set,
    /**
     * @deprecated Not actually deprecated, just shouldn't be used outside of `useSetPersisted` Hook
     */
    _overrideQuietly: (values: Array<T> | Set<T>) => {
      const newSet = new Set(values)

      // ! This is a private method that should only be used by useSetPersisted
      _updateSet(newSet)
    },
    add: (value: T) => {
      const newSet = new Set(set)
      newSet.add(value)

      updateSet(newSet)
    },
    delete: (value: T) => {
      const newSet = new Set(set)
      newSet.delete(value)

      updateSet(newSet)
    },
    deleteMany: (values: Array<T> | Set<T>) => {
      const newSet = new Set(set)

      values.forEach((value) => {
        newSet.delete(value)
      })

      updateSet(newSet)
    },
    /**
     * Remove item if it is already present in the `Set`, or Add it if is not.
     *
     * *NOTE*: This is primarily for when using a `Set` to track selected items,
     * and you want to toggle the selection of an item by adding or removing the `id` from the `Set`.
     */
    toggle: (value: T) => {
      const newSet = new Set(set)

      if (set.has(value)) {
        newSet.delete(value)
      } else {
        newSet.add(value)
      }

      updateSet(newSet)
    },
    has: (value: T) => set.has(value),
    /**
     * Adds supplied values on top of the current Set values
     * @param values - `Array<T>` or `Set<T>`
     * @equivalent `.addMany(values)`
     */
    merge: (values: Array<T> | Set<T>) => {
      const newSet = new Set(set)

      values.forEach((value) => {
        newSet.add(value)
      })

      updateSet(newSet)
    },
    /**
     * Replace the set with a new Set (equivalent of calling `.clear()` and then `.merge(values)`
     * @param values - `Array<T>` or `Set<T>`
     */
    override: (values: Array<T> | Set<T>) => {
      const newSet = new Set(values)
      updateSet(newSet)
    },
    replaceAll: (values: Array<T> | Set<T>, silent = false) => {
      const newSet = new Set(values)
      if (!silent) {
        updateSet(newSet)
      }
    },
    clear: () => {
      updateSet(new Set())
    },
    map: <RT>(
      iteratorFunction: (item: T, curIdx: number, setRef: Set<T>) => RT
    ): RT[] => {
      const newArr: RT[] = []
      let idx = 0

      set.forEach((item) => {
        newArr.push(iteratorFunction(item, idx, set))
        idx++
      })

      return newArr
    },
    reduce: <AccumType>(
      iteratorFunction: (
        accumulator: AccumType,
        item: T,
        curIdx: number,
        setRef: Set<T>
      ) => AccumType,
      initialValueRef: AccumType
    ) => {
      let idx = 0

      set.forEach((item) => {
        iteratorFunction(initialValueRef, item, idx, set)
        idx++
      })

      return initialValueRef
    },
    filter: (
      iteratorFunction: (item: T, curIdx: number, setRef: Set<T>) => boolean
    ) => {
      const newArr: T[] = []
      let idx = 0

      set.forEach((item) => {
        if (iteratorFunction(item, idx, set)) {
          newArr.push(item)
        }
        idx++
      })

      return newArr
    },
    toArray: () => Array.from(set),
    size: set.size,
    forEach: (
      callbackfn: (value: T, value2: T, set: Set<T>) => void,
      thisArg?: unknown
    ) => {
      set.forEach(callbackfn, thisArg)
    },
    entries: set.entries,
    keys: set.keys,
    values: set.values,
  }
}

function getInitialValue<T>(
  initialList?: Array<T> | Set<T> | (() => Array<T> | Set<T>)
) {
  if (
    initialList &&
    (Array.isArray(initialList) || initialList instanceof Set)
  ) {
    return new Set(initialList)
  } else if (typeof initialList === 'function') {
    const returnVal = initialList()

    if (returnVal instanceof Set || Array.isArray(returnVal)) {
      return new Set(returnVal)
    }
  }

  return new Set<T>()
}

export default useSet
