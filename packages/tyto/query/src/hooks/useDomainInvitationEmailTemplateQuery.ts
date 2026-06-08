import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { useTytoClient, DomainInvitationEmailTemplate } from '@tyto/client'

export interface UseDomainInvitationEmailTemplateQueryProps {
  domainID: number // <-- REPLACE / EXAMPLE
  disabled?: boolean
}

type ResponseProps = Awaited<
  ReturnType<typeof DomainInvitationEmailTemplate.prototype.get>
>

type UseUseDomainInvitationEmailTemplateQueryQueryResult = UseQueryResult<
  ResponseProps,
  Error
> & {
  queryKey: QueryKey
  invalidate: () => Promise<void>
}

export const useDomainInvitationEmailTemplateQuery = ({
  domainID,
  disabled,
}: UseDomainInvitationEmailTemplateQueryProps): UseUseDomainInvitationEmailTemplateQueryQueryResult => {
  const queryClient = useQueryClient()
  const tytoClient = useTytoClient()
  const queryKey: QueryKey = [
    tytoClient.DomainInvitationEmailTemplate.endpoint,
    { domainID },
  ]

  return {
    ...useQuery<ResponseProps, Error>({
      enabled: !disabled,
      queryKey,
      queryFn: () => tytoClient.DomainInvitationEmailTemplate.get({ domainID }),
    }),
    queryKey,
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      })
    },
  }
}

export default useDomainInvitationEmailTemplateQuery
