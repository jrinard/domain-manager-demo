import { useMemo } from 'react'
import { keyBy, orderBy } from 'lodash'
import type { HomeSection } from '@domain/configs'
import {
  Badge,
  ProgressBar,
  SkeletonText,
  Timestamp,
} from '@spacedock/falcon-ui'
import { Table } from '@falcon/table'
import { isTytoNullDate } from '@spacedock/tardis'
import { getTrainingStatusLabel, useTrainingDetailQuery } from '@tyto/query'

import type { ActivityTableSectionData } from '@domain/schemas'
import { useMappedTraining } from '../../hooks/useMappedTraining'
import { useDateByDaysInPastCounts } from '../../hooks/useDateByDaysInPastCounts'

export const LessonActivity = ({
  section,
  sectionData,
  dynamic_section_data,
}: {
  section?: HomeSection<ActivityTableSectionData>
  sectionData: ActivityTableSectionData
  dynamic_section_data?: Partial<ActivityTableSectionData>
}) => {
  const { dateInPastString } = useDateByDaysInPastCounts(
    dynamic_section_data?.daysCount ?? sectionData.daysCount ?? 30,
  )

  const trainingDetailQuery = useTrainingDetailQuery({
    personID: dynamic_section_data?.memberID ?? sectionData.memberID ?? 0,
    beginDate: dateInPastString,
    catalogID: 0,
    completeStatus: 'ocCOMPLETE,ocINPROGRESS',
  })

  const trainingQuery = useMappedTraining({
    memberID: dynamic_section_data?.memberID ?? sectionData.memberID ?? 0,
    isEnabled: !!dynamic_section_data?.memberID || !!sectionData.memberID,
  })

  const keyedTraining = useKeyedTraining({
    trainingQuery,
  })

  const displayData = useDisplayData({
    trainingQuery,
    keyedTraining,
    trainingDetailQuery,
    dynamic_section_data,
  })

  if (trainingQuery.isPending || trainingDetailQuery.isPending) {
    return (
      <div className="h-full">
        <div className="text-site-fg overflow-hidden rounded-lg bg-transparent shadow-sm">
          {/* Header */}
          <div className="gp-2 mb-4 flex flex-row justify-between border-b border-gray-200/10 px-4 pb-6">
            <h3 className="text-grayscale-800 dark:text-grayscale-200 text-lg font-medium">
              <SkeletonText size="lg" length="medium" />
            </h3>
          </div>

          {/* Table */}
          <div className="overflow-hidden">
            <ul className="space-y-4 duration-[2200ms]">
              <li className="flex flex-row gap-2 bg-neutral-800 px-2 py-4">
                <div className="w-3/4">
                  <SkeletonText size="base" length="short" />
                </div>
                <SkeletonText size="base" length="short" />
              </li>
              <li className="flex flex-row gap-2 px-2">
                <div className="w-3/4">
                  <SkeletonText size="base" length="1/2" />
                </div>
                <SkeletonText size="base" length="short" />
              </li>
              <li className="flex flex-row gap-2 px-2">
                <div className="w-3/4">
                  <SkeletonText size="base" length="3/4" />
                </div>
                <SkeletonText size="base" length="short" />
              </li>
              <li className="flex flex-row gap-2 px-2">
                <div className="w-3/4">
                  <SkeletonText size="base" length="short" />
                </div>
                <SkeletonText size="base" length="short" />
              </li>
              <li className="flex flex-row gap-2 px-2">
                <div className="w-3/4">
                  <SkeletonText size="base" length="2/3" />
                </div>
                <SkeletonText size="base" length="short" />
              </li>
              <li className="flex flex-row gap-2 px-2">
                <div className="w-3/4">
                  <SkeletonText size="base" length="1/4" />
                </div>
                <SkeletonText size="base" length="short" />
              </li>
              <li className="flex flex-row gap-2 px-2">
                <div className="w-3/4">
                  <SkeletonText size="base" length="short" />
                </div>
                <SkeletonText size="base" length="short" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full">
      <div className="text-site-fg overflow-hidden rounded-lg bg-transparent shadow-sm">
        {/* Header */}
        <div className="mb-4 flex flex-row justify-between gap-2 border-b border-gray-200/10 px-4 pb-6">
          <h3 className="text-grayscale-800 dark:text-grayscale-200 text-lg font-medium">
            {section?.metadata?.display_name ?? 'Lesson Video Activity'}
          </h3>
        </div>

        {/* Table */}
        <div className="overflow-hidden">
          <Table
            columns={[
              {
                accessorKey: 'directParentCourseName',
                header: 'Course Containing Step',
                cell: ({ cell, row }) => {
                  return (
                    <div className="flex flex-col items-start">
                      <span>{row.original.parentCourseName}</span>
                      <span className="text-xs opacity-40">
                        {cell.getValue()}
                      </span>
                    </div>
                  )
                },
              },
              {
                accessorKey: 'parentProgressPercent',
                header: 'Top Level Course Progress',
                cell: ({ cell }) => {
                  return (
                    <ProgressBar
                      progress={cell.getValue() as number}
                      hasLabel
                      size="md"
                      color={cell.getValue() === 100 ? 'success' : 'accent'}
                    />
                  )
                },
              },
              {
                accessorKey: 'stepName',
                header: 'Step Name',
              },
              {
                accessorKey: 'minutesWatched',
                header: 'Minutes Watched',
              },
              {
                accessorKey: 'completeStatus',
                header: 'Complete Status',
                cell: ({ cell }) => {
                  return (
                    <Badge
                      variant={
                        cell.getValue() === 'Completed' ? 'success' : 'default'
                      }
                    >
                      {cell.getValue()}
                    </Badge>
                  )
                },
              },
              {
                accessorKey: 'stepType',
                header: 'Type',
                cell: ({ cell }) => {
                  const type = (cell.getValue() as string).replace('oc', '')
                  return <span>{type}</span>
                },
              },
              {
                accessorKey: 'activityDate',
                header: 'Activity Date',
                cell: ({ cell }) => {
                  if (isTytoNullDate(cell.getValue() as string)) {
                    return <span>-</span>
                  }

                  return <Timestamp date={cell.getValue() as string} />
                },
              },
            ]}
            data={displayData}
          />
        </div>
      </div>
    </div>
  )
}

function useKeyedTraining({
  trainingQuery,
}: {
  trainingQuery: ReturnType<typeof useMappedTraining>
}) {
  return useMemo(() => {
    return keyBy(
      [
        ...(trainingQuery.data?.training ?? []),
        ...(trainingQuery.data?.subBlocks ?? []),
      ],
      'curriculumID',
    )
  }, [trainingQuery?.data])
}

interface DisplayData {
  completeStatus: string
  curriculumID: number
  completedDate: string
  stepType: string // * cSubType
  activityDate: string
  stepName: string
  minutesWatched: string
  directParentCourseName: string
  directParentCurriculumID: number
  parentCurriculumID: number
  parentCourseName: string
  parentCoursesBelowCount: number
  parentCourseProgressCount: number
  parentProgressPercent: number
}

function useDisplayData({
  trainingQuery,
  keyedTraining,
  trainingDetailQuery,
  dynamic_section_data,
}: {
  trainingQuery: ReturnType<typeof useMappedTraining>
  keyedTraining: ReturnType<typeof useKeyedTraining>
  trainingDetailQuery: ReturnType<typeof useTrainingDetailQuery>
  dynamic_section_data?: Partial<ActivityTableSectionData>
}) {
  return useMemo(() => {
    if (!trainingDetailQuery.data?.trainingSummary) {
      return []
    }

    // 1. Filter for video activities only
    const videoActivities = trainingDetailQuery.data.trainingSummary.filter(
      (item) => item.cSubType === 'ocVideo',
    )

    // 2. Map each video activity to DisplayData
    const displayDataItems = videoActivities
      .map((videoActivity) => {
        // 3. Get the matching course enrollment
        const directCourse = keyedTraining[videoActivity.blockID]

        const parentMostCourse = recursivelyClimbParentsLadder(
          videoActivity.blockID,
          keyedTraining,
        )

        if (!parentMostCourse) {
          return null
        }

        // 5. Create DisplayData object
        return {
          completeStatus: getTrainingStatusLabel(videoActivity.completeStatus),
          curriculumID: videoActivity.blockID,
          completedDate: videoActivity.completedDate,
          stepType: videoActivity.cSubType,
          activityDate: videoActivity.lastDate,
          minutesWatched: (videoActivity.minutesVidPlayThrough ?? 0).toFixed(2),
          stepName: videoActivity.stepName,
          directParentCourseName: directCourse?.curriculumName ?? '',
          directParentCurriculumID: directCourse?.curriculumID ?? 0,
          parentCurriculumID: parentMostCourse.curriculumID,
          parentCourseName: parentMostCourse.curriculumName,
          parentCoursesBelowCount: parentMostCourse.coursesBelowCount ?? 0,
          parentCourseProgressCount:
            parentMostCourse.recursiveRequiredCompleteCount ?? 0,
          parentProgressPercent: Math.floor(
            (parentMostCourse.recursiveRequiredCompletePercent ?? 0) * 100,
          ),
        }
      })
      .filter((item): item is DisplayData => item !== null)

    // Sort by activity date (most recent first)
    return orderBy(displayDataItems, ['activityDate'], ['desc'])
  }, [trainingDetailQuery.data, keyedTraining])
}

function recursivelyClimbParentsLadder(
  curriculumID: number,
  keyedTraining: ReturnType<typeof useKeyedTraining>,
) {
  const parentCourse = keyedTraining[curriculumID]

  if (!parentCourse) {
    return null
  } else if (
    !('parentBlocks' in parentCourse) ||
    !parentCourse.parentBlocks?.length
  ) {
    return parentCourse
  }

  return recursivelyClimbParentsLadder(
    parentCourse.parentBlocks[0].blockID,
    keyedTraining,
  )
}

