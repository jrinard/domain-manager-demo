import * as LF from 'localforage'
import { LOCAL_FORAGE_CONFIG } from './constants'

// ! NOTE: There is currently no way of creating and managing multiple Tables.
// TODO: If the need arises, update the methods to allow an additional argument for the Table Name.

// TODO: Update all methods to be async, since the methods they wrap are Async. (getItemAsync, setItemAsync, etc.)

// * Set Config
LF.config?.(LOCAL_FORAGE_CONFIG)

// * Self explanatory methods
/**
 * Sets an Item to `indexedDB` via the **localForage** NPM Package
 * @param {String} key - The key to set
 * @param {Any} value - The value to set (since it is not BrowserStorage, it can be anything)
 * @returns `False` if no key is supplied, or a `Promise` of the Attempt.
 */
export async function setItemAsync(key: string, value: unknown) {
  try {
    if (!key) {
      return false
    }

    return await LF.setItem(key, value)
  } catch (err) {
    return false
  }
}

/**
 * Reads an Item from `indexedDB` via the **localForage** NPM Package
 * @param {String} key - The key to read from `indexedDB`
 * @returns `False` if no key is supplied, or a `Promise` that resolves to the value of the key.
 */
export async function getItemAsync(key: string) {
  try {
    if (!key) {
      return false
    }

    return await LF.getItem(key)
  } catch (err) {
    return false
  }
}

/**
 * Deletes an Item from `indexedDB` via the **localForage** NPM Package
 * @param {String} key - The key to delete from `indexedDB`
 * @returns `False` if no key is supplied, or a `Promise` that resolves when deletion is complete.
 */
export async function removeItemAsync(key: string) {
  try {
    if (!key) {
      return false
    }

    return await LF.getItem(key)
  } catch (err) {
    return false
  }
}

/**
 * !!! Exhaustively Clears ***all*** Items from `indexedDB` via the **localForage** NPM Package
 * @returns A `Promise` that resolves when the Table is cleared.
 */
export async function clearAsync() {
  try {
    return await LF.clear()
  } catch (err) {
    return false
  }
}

/**
 * Reads an Item from `indexedDB` via the **localForage** NPM Package
 * @returns A `Promise` that resolves to an `Array of Strings` representing all currently existing `propertyNames` in the `indexedDB` `Table`.
 */
export async function keys() {
  try {
    return await LF.keys()
  } catch (err) {
    return false
  }
}

/**
 * Reads all Items from `indexedDB` via the **localForage** NPM Package
 * @returns A `Promise` that, leveraging the `keys()` function, returns all `Properties` (both `key` and `value`) currently within the `indexedDB` `Table`.
 */
export async function allItems() {
  try {
    const items: {
      key: string
      value: unknown
      iterationNumber: number
    }[] = []

    await LF.iterate((value, key: string, iterationNumber: number) => {
      items.push({
        key,
        value,
        iterationNumber,
      })
    })

    return items
  } catch (err) {
    console.error('Error: ', err)
    return []
  }
}
