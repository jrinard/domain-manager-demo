import { useDomainQuery } from '@tyto/query'
import { useParamNumber } from '@spacedock/use-param-number'

export function useDomainFromURL() {
  const domainID = useParamNumber('domainID')
  const domainQuery = useDomainQuery({ domainID: domainID ?? 551 })

  return domainQuery
}

export default useDomainFromURL
