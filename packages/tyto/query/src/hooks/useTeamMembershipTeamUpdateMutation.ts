import { useMutation } from '@tanstack/react-query'
import { useTytoClient, TeamMembershipTeam } from '@tyto/client'
import { omit, get } from 'lodash'

interface MoveTeamError {
  sts: number
  msg: string
  technical: string
  performanceOpsTimes: string[]
  totalPerfMs: number
}

interface UseMutationProps {
  cacheKey?: string
  onSuccess: (
    responseData: Omit<
      Awaited<ReturnType<typeof TeamMembershipTeam.prototype.put>>,
      'session' | 'links' | 'error'
    > | null,
  ) => void
  onError?: (error: MoveTeamError) => void
}

function useTeamMembershipTeamUpdateMutation<TypeOverrides>({
  cacheKey,
  onSuccess,
  onError,
}: UseMutationProps) {
  const tytoClient = useTytoClient()

  return useMutation({
    mutationKey: [tytoClient.TeamMembershipTeam.endpoint, cacheKey],
    mutationFn: async (
      props: Parameters<typeof TeamMembershipTeam.prototype.put>[0] &
        TypeOverrides,
    ) => {
      return await tytoClient.TeamMembershipTeam.put(props)
    },
    onSettled(data, error) {
      if (
        !error &&
        data &&
        ['initialized', ''].includes(get(data, 'error.msg'))
      ) {
        onSuccess(omit(data, 'error', 'links', 'session') || null)
      } else if (error) {
        onError?.(pullMeaningfulError(error))
      } else {
        const errorData = get(data, 'error') as MoveTeamError
        onError?.(errorData)
      }
    },
  })
}

function pullMeaningfulError(error: unknown): MoveTeamError {
  if (error instanceof Error) {
    return {
      sts: -1,
      msg: 'msg' in error ? (error.msg as string) : 'Unknown Error',
      technical: '',
      performanceOpsTimes: [],
      totalPerfMs: -1,
    }
  }

  return {
    sts: -1,
    msg: 'Unknown Error',
    technical: '',
    performanceOpsTimes: [],
    totalPerfMs: -1,
    ...(typeof error === 'object' && error !== null ? error : {}),
  }
}

export { useTeamMembershipTeamUpdateMutation }
export default useTeamMembershipTeamUpdateMutation
