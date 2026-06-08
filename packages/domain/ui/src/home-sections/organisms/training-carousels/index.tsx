import {
  useCatalogCurriculumPublicationQuery,
  useTrainingQuery,
} from '@tyto/query'
import { keyBy, orderBy } from 'lodash'
import type {
  Catalog,
  ChildItem,
  EnrolledBlock,
  EnrolledSubBlock,
} from '@tyto/client'
import { HomeSectionWrapper } from '../home-section-wrapper'
import type {
  SectionRenderMode,
  TrainingCarouselsSection,
} from '@domain/configs'
import { useSession } from '@spacedock/cargo-bay'
import { useMemo } from 'react'
import { Carousel, SkeletonSquare, TextBody } from '@spacedock/falcon-ui'
import { BACatalogCarousel } from '../../../business-academy/organisms/ba-catalog-carousel/BACatalogCarousel'
import { BACourseCarousel } from '../../../business-academy/organisms/ba-course-carousel/BACourseCarousel'
import type { TrainingCarouselsSectionData } from '@domain/schemas'

type CategoryIdentifier =
  | number
  | { catalogID: number; include?: 'all-children' | 'matching-children' }
  | { categoryName: string }

type ContinueWatchingScope =
  | 'present-in-categories'
  | 'not-present-in-categories'
  | 'direct-enrollments'
  | 'all-enrolled-training'
  | 'hidden'

type StatusFilter =
  | 'ocINCOMPLETE'
  | 'ocNOTATTEMPTED'
  | 'ocINPROGRESS'
  | 'ocCOMPLETE'

// * Constants so we don't inline them and cause useMemos to re-run every render
const DEFAULT_STATUS_FILTERS: StatusFilter[] = ['ocINCOMPLETE', 'ocINPROGRESS']
const DEFAULT_CATEGORIES: CategoryIdentifier[] = []
const DEFAULT_CONTINUE_WATCHING_SCOPE: ContinueWatchingScope =
  'present-in-categories'

export interface CarouselsSectionProps {
  section: TrainingCarouselsSection | null
  dynamic_section_data?: TrainingCarouselsSection['dynamic_section_data']
  renderMode?: SectionRenderMode
}

export const CarouselsSection = ({
  section,
  dynamic_section_data,
  renderMode = 'prod',
}: CarouselsSectionProps) => {
  if (!section) {
    return null
  }

  const sectionData: TrainingCarouselsSectionData = {
    ...section.section_data,
    ...dynamic_section_data,
  }

  // TODO: Implement mock data for carousels
  // For now, render production version for all modes
  return <CarouselsDataComponent section={section} sectionData={sectionData} />
}

interface CarouselsDataComponentProps {
  section: TrainingCarouselsSection
  sectionData: TrainingCarouselsSection['section_data']
}

function CarouselsDataComponent({
  section,
  sectionData,
}: CarouselsDataComponentProps) {
  const user = useSession()
  const catalogQuery = useCatalogCurriculumPublicationQuery()
  const trainingQuery = useTrainingQuery({
    memberID: user.userID,
    isEnabled: !!user.userID,
  })

  const targetCategories = sectionData?.categories || DEFAULT_CATEGORIES
  const statusFilters = sectionData?.status_filters ?? DEFAULT_STATUS_FILTERS
  const continueWatchingScope =
    sectionData?.continue_watching_scope ?? DEFAULT_CONTINUE_WATCHING_SCOPE

  const { allCatalogItems, coursesMatchingStatusFilters, title } =
    useTargetCategoriesData({
      catalog: catalogQuery.data?.catalogs,
      statusFilters,
      targetCategories: targetCategories as CategoryIdentifier[],
      continueWatchingScope: continueWatchingScope as ContinueWatchingScope,
      trainingData: trainingQuery.data,
    })

  const contentLoading = catalogQuery.isPending || trainingQuery.isPending

  return (
    <HomeSectionWrapper
      section={section}
      padding={section.metadata.padding ?? 'sm'}
      fallbackLayoutPosition={{
        columnSpan: 'full',
      }}
    >
      <div className="flex flex-col gap-8 px-6">
        {contentLoading ? (
          <Carousel
            carouselItems={[
              <div key="1">
                <SkeletonSquare className="h-60 w-full" />
              </div>,
              <div key="2">
                <SkeletonSquare className="h-60 w-full" />
              </div>,
              <div key="3">
                <SkeletonSquare className="h-60 w-full" />
              </div>,
              <div key="4">
                <SkeletonSquare className="h-60 w-full" />
              </div>,
            ]}
          />
        ) : (
          <>
            {coursesMatchingStatusFilters &&
              !!coursesMatchingStatusFilters.length && (
                <BACourseCarousel
                  startedCourses={coursesMatchingStatusFilters}
                  isPreview={false}
                />
              )}

            {allCatalogItems && allCatalogItems.length ? (
              <BACatalogCarousel
                title={section.metadata?.display_name || title}
                nonStartedTopLevelCourses={allCatalogItems}
                isPreview={false}
              />
            ) : (
              <TextBody className="h-32">No courses found</TextBody>
            )}
          </>
        )}
      </div>
    </HomeSectionWrapper>
  )
}

function useTargetCategoriesData({
  catalog,
  statusFilters,
  targetCategories,
  continueWatchingScope,
  trainingData,
}: {
  catalog?: Catalog[]
  statusFilters?: StatusFilter[]
  targetCategories: CategoryIdentifier[]
  continueWatchingScope: ContinueWatchingScope
  trainingData?: {
    subBlocks: EnrolledSubBlock[]
    training: EnrolledBlock[]
  }
}): {
  allCatalogItems?: ChildItem[]
  coursesMatchingStatusFilters?: (EnrolledBlock | EnrolledSubBlock)[]
  title: string | undefined
} {
  // * [1] - Create Array of `ChildItems` from `Catalog`s that match the `targetCategories`
  const { childItems, title } = useMemo(() => {
    if (!catalog || !catalog.length || !targetCategories.length) {
      return { childItems: [] }
    }

    let title = ''

    const filterData = createFilterData(targetCategories)

    const catalogItems: ChildItem[] = []

    catalog.forEach((category) => {
      if (
        !filterData.categoryIDs.has(category.catalogID) &&
        !filterData.categoryNames.has(category.name)
      ) {
        return
      }

      // * No clue what we would do with multiple Categories besides use 1 of the title arbitrarily
      // * (it would be too long to combine all of them, I would think)
      if (!title) {
        title = category.name || ''
      }

      catalogItems.push(...category.childItems)
    })

    return { childItems: orderBy(catalogItems, ['siblingSeq'], ['asc']), title }
  }, [targetCategories, catalog])

  // * [2] - Create List of Blocks and SubBlocks keyed by `curriculumID`
  const keyedTraining = useMemo(() => {
    if (!trainingData) {
      return {}
    }

    return keyBy(
      [...trainingData.training, ...trainingData.subBlocks],
      'curriculumID',
    )
  }, [trainingData])

  // * [3] - Create List of Blocks and SubBlocks that are in the `ChildItems` and match the `statusFilters`
  const coursesMatchingStatusFilters = useMemo(() => {
    if (
      !Object.keys(keyedTraining).length ||
      !childItems.length ||
      continueWatchingScope === 'hidden'
    ) {
      return []
    }

    const statusFilterSet = new Set<StatusFilter>(statusFilters)

    if (continueWatchingScope === 'direct-enrollments') {
      return (
        trainingData?.training?.filter(
          (enrollment) =>
            enrollment.curriculumType === 'ocBLOCK' &&
            statusFilterSet.has(enrollment.completeStatus),
        ) ?? []
      )
    } else if (continueWatchingScope === 'all-enrolled-training') {
      return [
        ...(trainingData?.training || []),
        ...(trainingData?.subBlocks || []),
      ]?.filter(
        (enrollment) =>
          enrollment.curriculumType === 'ocBLOCK' &&
          statusFilterSet.has(enrollment.completeStatus),
      )
    } else if (continueWatchingScope === 'not-present-in-categories') {
      // TODO
      const curriculumIDsInCategories = new Set()

      childItems.forEach((childItem) => {
        if (
          !childItem.about?.curriculumID ||
          curriculumIDsInCategories.has(childItem.about.curriculumID)
        ) {
          return
        }

        curriculumIDsInCategories.add(childItem.about.curriculumID)
      })

      return (
        trainingData?.training?.filter(
          (enrollment) =>
            enrollment.curriculumType === 'ocBLOCK' &&
            statusFilterSet.has(enrollment.completeStatus) &&
            !curriculumIDsInCategories.has(enrollment.curriculumID),
        ) ?? []
      )
    }

    // * continueWatchingScope === "present-in-categories"
    const courses: (EnrolledBlock | EnrolledSubBlock)[] = []

    childItems.forEach((childItem) => {
      const trainingItem = childItem.about?.curriculumID
        ? keyedTraining[childItem.about?.curriculumID]
        : undefined

      // * We only want Courses that match the `statusFilters`
      if (!trainingItem || !statusFilterSet.has(trainingItem.completeStatus)) {
        return
      }

      courses.push(trainingItem)
    })

    return courses
  }, [keyedTraining, childItems, statusFilters, trainingData])

  return {
    allCatalogItems: childItems,
    coursesMatchingStatusFilters,
    title,
  }
}

function createFilterData(targetCategories: CategoryIdentifier[]) {
  const categoryIDs = new Set<number>()
  const categoryNames = new Set<string>()

  targetCategories.forEach((category) => {
    if (typeof category === 'number') {
      categoryIDs.add(category)
    } else if (typeof category === 'object') {
      if ('catalogID' in category) {
        categoryIDs.add(category.catalogID)
      } else if ('categoryName' in category) {
        categoryNames.add(category.categoryName)
      }
    }
  })

  return {
    categoryIDs,
    categoryNames,
  }
}
