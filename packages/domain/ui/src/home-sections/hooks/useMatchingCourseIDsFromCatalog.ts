import { useMemo } from 'react'
import * as _ from 'lodash'

import { useCatalogCurriculumPublicationQuery } from '@tyto/query'

const EMPTY_ARR: number[] = []

export interface Props {
  domainIDFilters?: number[]
  teamIDFilters?: number[]
  categoryNameMatch?: string
  categoryNameNotMatch?: string
}

export function useMatchingCourseIDsFromCatalog(props: Props) {
  const catalogCurPubQuery = useCatalogCurriculumPublicationQuery()

  const {
    curriculumIDs,
    categories,
    curriculumIDsCategoryMap,
    curriculumsData,
  } = useMemo(() => {
    const _curriculumIDs: number[] = []
    const _curriculumsData: Array<{
      curriculumID: number
      curriculumName: string
    }> = []
    const _categories: NonNullable<
      ReturnType<typeof useCatalogCurriculumPublicationQuery>['data']
    >['catalogs'] = []
    const _curriculumIDsCategoryMap: Record<number, number> = {}

    const categoryNameMatch = new RegExp(
      _.escapeRegExp(props.categoryNameMatch ?? ''),
      'gi',
    )
    const categoryNameNotMatch = new RegExp(
      _.escapeRegExp(props.categoryNameNotMatch ?? ''),
      'gi',
    )

    const domainIDFilters = new Set(props.domainIDFilters ?? [])
    const teamIDFilters = new Set<number>(props.teamIDFilters ?? [])

    if (catalogCurPubQuery.data?.catalogs?.length) {
      catalogCurPubQuery.data?.catalogs.forEach((category) => {
        if (domainIDFilters.size && !domainIDFilters.has(category.domainID)) {
          return
        } else if (
          teamIDFilters.size &&
          !teamIDFilters.has(category.primaryElementID)
        ) {
          return
        }

        // * If not name filters just add the items
        if (!props.categoryNameMatch && !props.categoryNameNotMatch) {
          _categories.push(category)
          category.childItems?.forEach((catalogItem) => {
            if (catalogItem.about?.curriculum?.blockID) {
              _curriculumIDs.push(catalogItem.about.curriculum.blockID)
              _curriculumIDsCategoryMap[catalogItem.about.curriculum.blockID] =
                category.catalogItemID
              _curriculumsData.push({
                curriculumID: catalogItem.about.curriculum.blockID,
                curriculumName: catalogItem.about.curriculum.name,
              })
            }
          })
        } else {
          const passedNameMatch = props.categoryNameMatch
            ? categoryNameMatch.test(category.name)
            : true
          const passesNameNotMatch = props.categoryNameNotMatch
            ? !categoryNameNotMatch.test(category.name)
            : true

          if (passedNameMatch && passesNameNotMatch) {
            _categories.push(category)
            category.childItems?.forEach((catalogItem) => {
              if (catalogItem.about?.curriculum?.blockID) {
                _curriculumIDs.push(catalogItem.about.curriculum.blockID)
                _curriculumIDsCategoryMap[
                  catalogItem.about.curriculum.blockID
                ] = category.catalogItemID
                _curriculumsData.push({
                  curriculumID: catalogItem.about.curriculum.blockID,
                  curriculumName: catalogItem.about.curriculum.name,
                })
              }
            })
          }
        }
      })
    }

    return {
      curriculumIDs: _curriculumIDs.length
        ? _.sortBy(_curriculumIDs)
        : EMPTY_ARR,
      curriculumsData: _curriculumsData,
      categories: _categories,
      curriculumIDsCategoryMap: _curriculumIDsCategoryMap,
    }
  }, [
    catalogCurPubQuery.data?.catalogs ?? null,
    props.categoryNameNotMatch ?? '',
    props.categoryNameMatch ?? '',
    props.domainIDFilters ?? null,
    props.teamIDFilters ?? null,
  ])

  return {
    curriculumIDs,
    curriculumsData,
    categories,
    curriculumIDsCategoryMap,
    isLoading: catalogCurPubQuery.isLoading,
    isError: catalogCurPubQuery.isError,
    isSuccess: catalogCurPubQuery.isSuccess,
    isPending: catalogCurPubQuery.isPending,
    isFetching: catalogCurPubQuery.isFetching,
    isRefetching: catalogCurPubQuery.isRefetching,
    isStale: catalogCurPubQuery.isStale,
    error: catalogCurPubQuery.error,
    refetch: catalogCurPubQuery.refetch,
  }
}
