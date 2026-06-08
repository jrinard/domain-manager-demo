import { isString } from 'lodash'
import { useEffect, useState } from 'react'
import { useSyync } from '@spacedock/syyncronyyzed'

export const useLinkByFunctionID = (
  id: number,
  params?: Record<string, string | number | undefined>,
): { value: string | undefined; isLoading: boolean } => {
  const syync = useSyync()
  const [value, setValue] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (syync) {
      syync
        .sendMessage('get-url-by-constant', {
          constant: id,
          params: params,
        })
        .then((result) => {
          if (result && 'value' in result && isString(result.value)) {
            setValue(result.value)
          } else {
            setValue(undefined)
          }
          setIsLoading(false)
        })
        .catch((err) => {
          setIsLoading(false)
          // eslint-disable-next-line no-console
          console.error(err)
        })
    }
    return undefined
  }, [syync, id, params])

  return { value, isLoading }
}
