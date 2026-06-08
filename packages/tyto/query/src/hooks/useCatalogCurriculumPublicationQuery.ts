import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useTytoClient, CatalogCurriculumPublication } from '@tyto/client'

export const useCatalogCurriculumPublicationQuery = (): UseQueryResult<
  Awaited<ReturnType<typeof CatalogCurriculumPublication.prototype.get>>,
  Error
> => {
  const tytoClient = useTytoClient()

  return useQuery<
    Awaited<ReturnType<typeof CatalogCurriculumPublication.prototype.get>>,
    Error
  >({
    queryKey: [tytoClient.CatalogCurriculumPublication.endpoint],
    queryFn: () => tytoClient.CatalogCurriculumPublication.get({}),
  })
}

export default useCatalogCurriculumPublicationQuery
