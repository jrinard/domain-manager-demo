import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Domain, useTytoClient } from '@tyto/client'

interface UseDomainQueryProps {
  domainID: number
  isEnabled?: boolean
}
export const useDomainQuery = ({
  isEnabled = true,
  domainID,
}: UseDomainQueryProps): UseQueryResult<
  Awaited<ReturnType<typeof Domain.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()
  return useQuery<Awaited<ReturnType<typeof Domain.prototype.get>>, Error>({
    enabled: isEnabled,
    queryKey: [tytoClient.Domain.endpoint, { domainID }],
    queryFn: () => tytoClient.Domain.get({ domainID }),
  })
}

export default useDomainQuery
