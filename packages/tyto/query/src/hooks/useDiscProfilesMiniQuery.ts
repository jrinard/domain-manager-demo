import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, DiscProfilesMini } from '@tyto/client'

type ResponseProps = Awaited<ReturnType<typeof DiscProfilesMini.prototype.get>>
type RequestProps = Parameters<typeof DiscProfilesMini.prototype.get>[0]
export interface UseDiscProfilesMiniQueryProps extends RequestProps {
  disabled?: boolean
}

type UseUseDiscProfilesMiniQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useDiscProfilesMiniQuery = ({
  disabled,
  ...props
}: UseDiscProfilesMiniQueryProps = {}): UseUseDiscProfilesMiniQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()
  const queryKey: QueryKey = [
    tytoClient.DiscProfilesMini.endpoint,
    { ...props },
  ]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () => tytoClient.DiscProfilesMini.get({ ...props }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useDiscProfilesMiniQuery
