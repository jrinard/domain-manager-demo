import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import {
  useTytoClient,
  CurriculumSubcomponentSummaryReport,
} from '@tyto/client'

type EndpointArgs = Parameters<
  typeof CurriculumSubcomponentSummaryReport.prototype.get
>[0]

export interface UseCurriculumSubcomponentSummaryReportQueryProps
  extends EndpointArgs {
  disabled?: boolean
}

type ResponseProps = Awaited<
  ReturnType<typeof CurriculumSubcomponentSummaryReport.prototype.get>
>

type UseUseCurriculumSubcomponentSummaryReportQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useCurriculumSubcomponentSummaryReportQuery = ({
  disabled,
  ...args
}: UseCurriculumSubcomponentSummaryReportQueryProps): UseUseCurriculumSubcomponentSummaryReportQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()

  const params: EndpointArgs = {
    ...args,
  }

  const queryKey: QueryKey = [
    tytoClient.CurriculumSubcomponentSummaryReport.endpoint,
    params,
  ]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () =>
        tytoClient.CurriculumSubcomponentSummaryReport.get({ ...args }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useCurriculumSubcomponentSummaryReportQuery
