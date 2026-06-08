import { UnauthenticatedException } from '@tyto/client'
import { timeInMS } from '../utils'

/**
 * ReactQuery has a few default values that don't make sense to me for our applications
 * These are overrides that make sense for our use case.
 *
 * This Object can optionally be extended (merged) into any usage of `useQuery`
 */
export const SANE_REACT_QUERY_DEFAULTS = {
  refetchOnWindowFocus: false,
  retry: (_failureCount: number, error: unknown) => {
    if (error instanceof UnauthenticatedException) {
      return false
    }

    // * Only retry if server busy
    return false
  },
  throwOnError: false,
  staleTime: timeInMS({ timeQuantity: 30, timeType: 'min' }),
}
