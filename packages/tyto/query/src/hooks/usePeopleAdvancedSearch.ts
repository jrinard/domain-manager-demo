import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient } from '@tyto/client'
import type { Endpoints } from '@tyto/client'

export const usePeopleAdvancedSearch = (
  generalName: NonNullable<
    Endpoints.Tyto.PeopleAdvancedSearch.Get.Parameters['generalName']
  >,
  top?: Endpoints.Tyto.PeopleAdvancedSearch.Get.Parameters['top']
): UseQueryResult<Endpoints.Tyto.PeopleAdvancedSearch.Get.Response, Error> => {
  const tytoClient = useTytoClient()

  const params: Endpoints.Tyto.PeopleAdvancedSearch.Get.Parameters = {
    functionName: 'Notices Person',
    operation: 'ocADD',
    generalName,
    top: top || 10,
  }

  return useQuery<Endpoints.Tyto.PeopleAdvancedSearch.Get.Response, Error>({
    enabled: generalName.length > 0,
    queryKey: [tytoClient.People.AdvancedSearch.endpoint, params],
    queryFn: () => tytoClient.People.AdvancedSearch.get({ ...params }),
  })
}

export default usePeopleAdvancedSearch
