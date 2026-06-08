import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, CurriculumSummaryReport } from '@tyto/client'

type EndpointArgs = Parameters<typeof CurriculumSummaryReport.prototype.get>[0]

export interface UseCurriculumSummaryReportQueryProps extends EndpointArgs {
  disabled?: boolean
}

type ResponseProps = Awaited<
  ReturnType<typeof CurriculumSummaryReport.prototype.get>
>

type UseUseCurriculumSummaryReportQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useCurriculumSummaryReportQuery = ({
  disabled,
  ...args
}: UseCurriculumSummaryReportQueryProps): UseUseCurriculumSummaryReportQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  const params: EndpointArgs = {
    ...args,
  }

  const queryKey: QueryKey = [
    tytoClient.CurriculumSummaryReport.endpoint,
    params,
  ]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () => tytoClient.CurriculumSummaryReport.get({ ...params }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useCurriculumSummaryReportQuery
