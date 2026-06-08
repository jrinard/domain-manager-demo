import { useDomainQuery } from '@tyto/query'
import { useParamNumber } from '@spacedock/use-param-number'

export function useDomainFromURL() {
  const domainID = useParamNumber('domainID')
  const domain = useDomainQuery({ domainID: domainID ?? 551 })

  return {
    data: domain.data,
    isLoading: domain.isLoading,
    error: domain.error,
    refetch: domain.refetch,
  }
}

export default useDomainFromURL
