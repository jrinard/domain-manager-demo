import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient, PersonSubordinates } from '@tyto/client'

export type UsePersonSubordinatesReadQueryProps = Parameters<
  typeof PersonSubordinates.prototype.get
>[0]

export const usePersonSubordinatesReadQuery = (
  props: UsePersonSubordinatesReadQueryProps
): UseQueryResult<
  Awaited<ReturnType<typeof PersonSubordinates.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()

  return useQuery<
    Awaited<ReturnType<typeof PersonSubordinates.prototype.get>>,
    Error
  >({
    queryKey: [tytoClient.PersonSubordinates.endpoint, props],
    queryFn: () => tytoClient.PersonSubordinates.get(props),
  })
}

export default usePersonSubordinatesReadQuery
