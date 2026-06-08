import { useState } from 'react'
import { SetExtended } from './SetExtended'

export function useSetExtended<T>(data?: {
  initialList?: Array<T> | Set<T> | (() => Array<T> | Set<T>)
  onChange?: (newSet: Set<T>) => void
}): SetExtended<T> {
  const [set, _updateSet] = useState<SetExtended<T>>(
    new SetExtended<T>(data?.initialList)
  )
  set.onChange = (value: SetExtended<T>) => {
    _updateSet(value)
    data?.onChange?.(value)
  }

  return set
}

export default useSetExtended
