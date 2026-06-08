function convert<T>(
  initialList?: Array<T> | Set<T> | (() => Array<T> | Set<T>)
): Iterable<T> {
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

export class SetExtended<T> extends Set<T> {
  onChange?: (newSet: SetExtended<T>) => void
  constructor(
    values?: Array<T> | Set<T> | (() => Array<T> | Set<T>),
    options?: {
      onChange?: (newSet: SetExtended<T>) => void
    }
  ) {
    super(convert(values))
    if (options?.onChange) {
      this.onChange = options?.onChange
    }
  }
  add(value: T) {
    super.add(value)
    this.onChange?.(this)
    return this
  }
  delete(value: T): boolean {
    const result = super.delete(value)
    if (result) {
      this.onChange?.(this)
    }
    return result
  }
  deleteMany(values: Array<T> | Set<T>) {
    values.forEach((value) => super.delete(value), this)
    this.onChange?.(this)
  }
  /**
   * Remove item if it is already present in the `Set`, or Add it if is not.
   *
   * *NOTE*: This is primarily for when using a `Set` to track selected items,
   * and you want to toggle the selection of an item by adding or removing the `id` from the `Set`.
   */
  toggle(value: T) {
    if (this.has(value)) {
      this.delete(value)
    } else {
      this.add(value)
    }
  }
  /**
   * Adds supplied values on top of the current Set values
   * @param values - `Array<T>` or `Set<T>`
   * @equivalent `.addMany(values)`
   */
  merge(values: Array<T> | Set<T>) {
    values.forEach((value) => super.add(value), this)
    this.onChange?.(this)
  }
  /**
   * Replace all values of the set (equivalent of calling `.clear()` and then `.merge(values)`
   * @param values - `Array<T>` or `Set<T>`
   * @param silent do not trigger onChange
   */
  replaceAll(values: Array<T> | Set<T>, silent = false) {
    super.clear()
    values.forEach((value) => super.add(value), this)
    if (!silent) {
      this.onChange?.(this)
    }
  }
  clear() {
    super.clear()
    this.onChange?.(this)
  }
  map<RT>(
    iteratorFunction: (item: T, curIdx: number, setRef: Set<T>) => RT
  ): RT[] {
    const newArr: RT[] = []
    let idx = 0

    this.forEach((item) => {
      newArr.push(iteratorFunction(item, idx, this))
      idx++
    })

    return newArr
  }
  reduce<AccumType>(
    iteratorFunction: (
      accumulator: AccumType,
      item: T,
      curIdx: number,
      setRef: Set<T>
    ) => AccumType,
    initialValueRef: AccumType
  ) {
    let idx = 0

    this.forEach((item, key, set) => {
      iteratorFunction(initialValueRef, item, idx, set)
      idx++
    }, this)

    return initialValueRef
  }
  filter(
    iteratorFunction: (item: T, curIdx: number, setRef: Set<T>) => boolean
  ) {
    const newArr: T[] = []
    let idx = 0
    this.forEach((item, key, set) => {
      if (iteratorFunction(item, idx, set)) {
        newArr.push(item)
      }
      idx++
    }, this)

    return newArr
  }
  toArray(): Array<T> {
    return Array.from(this)
  }
  notify() {
    this.replaceAll(this.toArray())
  }
}
