import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
export function useSearchParamNumber(key: string): number | undefined {
  const [params] = useSearchParams()
  return useMemo(() => {
    const raw = Number(Object.fromEntries(params.entries())[key])
    return !Number.isNaN(raw) ? raw : undefined
  }, [params, key])
}
