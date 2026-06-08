import { useMemo } from 'react'
import { keyBy } from 'lodash'

import type { PeopleData } from '../types'

export function usePeopleByID(people?: PeopleData['people']) {
  return useMemo(() => keyBy(people ?? [], 'userID'), [people])
}
