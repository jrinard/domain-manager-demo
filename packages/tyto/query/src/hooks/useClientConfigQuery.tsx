import { useQuery } from '@tanstack/react-query'
import { useTytoClient } from '@tyto/client'
import type { Endpoints } from '@tyto/client'

export const useClientConfigQuery = ({
  isEnabled = true,
}: {
  isEnabled?: boolean
}) => {
  const tytoClient = useTytoClient()

  return useQuery<Endpoints.Tyto.Configuration.Client.Get.Response, Error>({
    enabled: isEnabled,
    queryKey: [tytoClient.ConfigurationClient.endpoint],
    queryFn: () => tytoClient.ConfigurationClient.get({}),
  })
}

export default useClientConfigQuery
