import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient, PersonProfilePhoto } from '@tyto/client'

type GetArgs = Parameters<typeof PersonProfilePhoto.prototype.get>[0]

export type UsePersonProfilePhotoQueryProps = GetArgs

export const usePersonProfilePhotoURLQuery = ({
  personID,
  silhouette,
}: UsePersonProfilePhotoQueryProps): UseQueryResult<
  Awaited<ReturnType<typeof PersonProfilePhoto.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()

  const params: GetArgs = {
    personID,
    silhouette,
  }

  return useQuery<
    Awaited<ReturnType<typeof PersonProfilePhoto.prototype.get>>,
    Error
  >({
    queryKey: [tytoClient.PersonProfilePhoto.endpoint, params],
    queryFn: () => tytoClient.PersonProfilePhoto.get({ ...params }),
  })
}

export default usePersonProfilePhotoURLQuery
