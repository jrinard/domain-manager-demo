import { Endpoints, useTytoClient } from '@tyto/client'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import { SANE_REACT_QUERY_DEFAULTS } from '../constants'

interface Props {
  enabled?: boolean
  args?: Endpoints.Tyto.CatalogInbox.Get.Parameters
}
export const useUserCreatedInboxCategoriesQuery = ({
  enabled = true,
  args = {},
}: Props): UseQueryResult<Endpoints.Tyto.CatalogInbox.Get.Response, Error> => {
  const tytoClient = useTytoClient()

  return useQuery<Endpoints.Tyto.CatalogInbox.Get.Response, Error>({
    ...SANE_REACT_QUERY_DEFAULTS,
    enabled,
    queryKey: [tytoClient.Inbox.Catalog.endpoint, args],
    // * ReactQuery is expected the getter function returns some sort of Promise,
    // * and implicitly decides the query's `data` type as the `Awaited` type of the getter's returned Promise (what a mouthfull).
    // * TLDR the `queryFn` is expected to return a Promise and Internally is knows what to do with it.
    queryFn: () => tytoClient.Inbox.Catalog.get({ ...args }),
  })
}
