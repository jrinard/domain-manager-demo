import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
export function useParamNumber(key: string): number | undefined {
  const params = useParams()
  return useMemo(() => {
    const result = Number(params[key])
    return !Number.isNaN(result) ? result : undefined
  }, [params, key])
}
