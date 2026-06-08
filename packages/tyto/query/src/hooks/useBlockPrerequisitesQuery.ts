import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, BlockPrerequisites } from '@tyto/client'

export interface UseBlockPrerequisitesQueryProps {
  blockID: number
  disabled?: boolean
}

type ResponseProps = Awaited<
  ReturnType<typeof BlockPrerequisites.prototype.get>
>

type UseUseBlockPrerequisitesQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useBlockPrerequisitesQuery = ({
  blockID,
  disabled,
}: UseBlockPrerequisitesQueryProps): UseUseBlockPrerequisitesQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()
  const queryKey: QueryKey = [
    tytoClient.BlockPrerequisites.endpoint,
    { blockID },
  ]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () => tytoClient.BlockPrerequisites.get({ blockID }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}
