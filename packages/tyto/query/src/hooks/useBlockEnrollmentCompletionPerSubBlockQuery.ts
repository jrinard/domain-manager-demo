import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import {
  useTytoClient,
  BlockEnrollmentCompletionPerSubBlock,
} from '@tyto/client'

export interface UseBlockEnrollmentCompletionPerSubBlockQueryProps {
  blockID: number
  teamID: number
  disabled?: boolean
}

type ResponseProps = Awaited<
  ReturnType<typeof BlockEnrollmentCompletionPerSubBlock.prototype.get>
>

type UseUseBlockEnrollmentCompletionPerSubBlockQueryQueryResult =
  UseQueryResult<ResponseProps, Error> & {
    queryKey: QueryKey
    invalidate: () => Promise<void>
  }

export const useBlockEnrollmentCompletionPerSubBlockQuery = ({
  teamID,
  blockID,
  disabled,
}: UseBlockEnrollmentCompletionPerSubBlockQueryProps): UseUseBlockEnrollmentCompletionPerSubBlockQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()
  const queryKey: QueryKey = [
    tytoClient.BlockEnrollmentCompletionPerSubBlock.endpoint,
    { teamID, blockID },
  ]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () =>
        tytoClient.BlockEnrollmentCompletionPerSubBlock.get({
          blockID,
          teamID,
        }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useBlockEnrollmentCompletionPerSubBlockQuery
