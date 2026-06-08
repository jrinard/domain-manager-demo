import { BROWSER_STORAGE_KEY_RING } from './constants'
import { Storage } from './typings'

type Values<T> = T[keyof T]
type KeyRingType = typeof BROWSER_STORAGE_KEY_RING
type AllowedKeys =
  | Values<KeyRingType>
  | `${KeyRingType['INPUT_TEXT']}::${string}`

function getStorage(type: Storage.StorageType) {
  return type === 'session' ? sessionStorage : localStorage
}

function getItem({
  key,
  storageType = 'local',
  onError,
}: {
  key: AllowedKeys
  storageType: Storage.StorageType
  onError?: (errorMsg: string) => void
}): undefined | string | null {
  try {
    const browserStore = getStorage(storageType)

    if (!key) {
      return
    }

    return browserStore.getItem(key)
  } catch (err: unknown) {
    if (onError) {
      onError(err as string)
    }
    return
  }
}

function setItem({
  key,
  storageType = 'local',
  value,
  onError,
}: {
  key: AllowedKeys
  value: string
  storageType: Storage.StorageType
  onError?: (errorMsg: string) => void
}) {
  try {
    const browserStore = getStorage(storageType)

    if (!key) {
      return undefined
    }

    browserStore.setItem(key, value)

    return true
  } catch (err: unknown) {
    if (onError) {
      onError(typeof err === 'string' ? err : `${err}`)
    }

    return false
  }
}

function removeItem({
  key,
  storageType = 'local',
  onError,
}: {
  key: AllowedKeys
  storageType: Storage.StorageType
  onError?: (errorMsg: string) => void
}) {
  try {
    const browserStore = getStorage(storageType)

    if (!key) {
      return undefined
    }

    browserStore.removeItem(key)

    return true
  } catch (err: unknown) {
    if (onError) {
      onError(typeof err === 'string' ? err : `${err}`)
    }

    return false
  }
}

function clear({
  storageType = 'local',
  onError,
}: {
  storageType: Storage.StorageType
  onError?: (errorMsg: string) => void
}) {
  try {
    const browserStore = getStorage(storageType)

    browserStore.clear()

    return true
  } catch (err: unknown) {
    if (onError) {
      onError(typeof err === 'string' ? err : `${err}`)
    }

    return false
  }
}

export const LOC_STOR = {
  clear(opts?: Storage.Methods.Opts) {
    const { onError } = opts || {}

    return clear({ onError, storageType: 'local' })
  },
  get(key: AllowedKeys, opts?: Storage.Methods.Opts) {
    const { onError } = opts || {}

    return getItem({ key, onError, storageType: 'local' })
  },
  set(key: AllowedKeys, value: string, opts?: Storage.Methods.Opts) {
    const { onError, returnValue } = opts || {}

    const wasSuccessful = setItem({
      key,
      value,
      onError,
      storageType: 'local',
    })

    if (wasSuccessful && returnValue) {
      return getItem({ key, onError, storageType: 'local' })
    }

    return wasSuccessful
  },
  remove(key: AllowedKeys, opts?: Storage.Methods.Opts) {
    const { onError } = opts || {}

    removeItem({ key, storageType: 'local', onError })
  },
}

export const SES_STOR = {
  clear(opts?: Storage.Methods.Opts) {
    const { onError } = opts || {}

    return clear({ onError, storageType: 'session' })
  },
  get(key: AllowedKeys, opts?: Storage.Methods.Opts) {
    const { onError } = opts || {}

    return getItem({ key, onError, storageType: 'session' })
  },
  set(key: AllowedKeys, value: unknown, opts?: Storage.Methods.Opts) {
    const { onError, returnValue } = opts || {}

    const wasSuccessful = setItem({
      key,
      value: typeof value === 'string' ? value : `${value}`,
      onError,
      storageType: 'session',
    })

    if (wasSuccessful && returnValue) {
      return getItem({ key, onError, storageType: 'session' })
    }

    return wasSuccessful
  },
  remove(key: AllowedKeys, opts?: Storage.Methods.Opts) {
    const { onError } = opts || {}

    removeItem({ key, storageType: 'session', onError })
  },
}
