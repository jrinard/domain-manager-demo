import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, ClientServiceNotesByElement } from '@tyto/client'

export interface UseClientServiceNotesByElementQueryProps {
  elementID: number
  disabled?: boolean
}

type ResponseProps = Awaited<
  ReturnType<typeof ClientServiceNotesByElement.prototype.get>
>

type UseClientServiceNotesByElementQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useClientServiceNotesByElementQuery = ({
  elementID,
  disabled,
}: UseClientServiceNotesByElementQueryProps): UseClientServiceNotesByElementQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()
  const queryKey: QueryKey = [
    tytoClient.ClientServiceNotesByElement.endpoint,
    { elementID },
  ]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () => tytoClient.ClientServiceNotesByElement.get({ elementID }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useClientServiceNotesByElementQuery
