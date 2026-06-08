import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, ClientServiceNote } from '@tyto/client'

export interface UseClientServiceNoteQueryProps {
  clientServiceNoteID: number
  isDraft?: boolean
  disabled?: boolean
}

type ResponseProps = Awaited<ReturnType<typeof ClientServiceNote.prototype.get>>

type UseClientServiceNoteQueryResult = UseQueryResult<ResponseProps, Error> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useClientServiceNoteQuery = ({
  clientServiceNoteID,
  isDraft = false,
  disabled,
}: UseClientServiceNoteQueryProps): UseClientServiceNoteQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  const queryKey: QueryKey = [
    tytoClient.ClientServiceNote.endpoint,
    { clientServiceNoteID, isDraft },
  ]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: async () =>
        tytoClient.ClientServiceNote.get({ clientServiceNoteID }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({ queryKey })
    },
  }
}

export default useClientServiceNoteQuery
