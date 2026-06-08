import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, PeopleByFunction } from '@tyto/client'
import type { FunctionName, OperationName } from '@tyto/client'

export interface UsePeopleByFunctionQueryProps {
  functionName: FunctionName
  operation?: OperationName
  teamID: number
  exposeLookingUp?: boolean
  exposeLookingDown?: boolean
}

type ResponseProps = Awaited<ReturnType<typeof PeopleByFunction.prototype.get>>

type UsePeopleByFunctionQueryResult = UseQueryResult<ResponseProps, Error> & {
  invalidate: () => Promise<void>
}

export const usePeopleByFunctionQuery = ({
  functionName,
  teamID,
  operation,
  exposeLookingUp,
  exposeLookingDown,
}: UsePeopleByFunctionQueryProps): UsePeopleByFunctionQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()
  const params = {
    functionName,
    teamID,
    operation,
    exposeLookingUp,
    exposeLookingDown,
  }
  const queryKey: QueryKey = [tytoClient.PeopleByFunction.endpoint, params]

  return {
    ...useQuery<ResponseProps, Error>({
      queryKey,
      queryFn: () => tytoClient.PeopleByFunction.get(params),
      enabled: !!teamID,
    }),
    invalidate: async () => {
      await queryClient.invalidateQueries({ queryKey })
    },
  }
}

export default usePeopleByFunctionQuery
