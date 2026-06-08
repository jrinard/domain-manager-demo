import { useMemo } from 'react'
import { get, keyBy, orderBy } from 'lodash'
import type { HomeSection } from '@domain/configs'
import {
  Badge,
  ProgressBar,
  SkeletonText,
  Timestamp,
} from '@spacedock/falcon-ui'
import { Table } from '@falcon/table'
import { TYTO_NULL_DATE, isTytoNullDate } from '@spacedock/tardis'
import { getTrainingStatusLabel } from '@tyto/query'

// Note: This import will need to be resolved - the hook is still in the home app
// import { useMatchingCourseIDsFromCatalog } from '../../hooks/useMatchingCourseIDsFromCatalog'

import type { ActivityTableSectionData } from '@domain/schemas'
import { useMappedTraining } from '../../hooks/useMappedTraining'
import { mergeClasses } from '@falcon/style'
// // import { mergeClasses } from '@falcon/style'

export const TrainingProgress = ({
  section,
  sectionData,
  dynamic_section_data,
}: {
  section?: HomeSection<ActivityTableSectionData>
  sectionData: ActivityTableSectionData
  dynamic_section_data?: Partial<ActivityTableSectionData>
}) => {
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
    dynamic_section_data,
  })

  if (
    trainingQuery.isPending ||
    (!dynamic_section_data?.memberID && !sectionData.memberID)
  ) {
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
        <div className="gp-2 mb-4 flex flex-row justify-between border-b border-gray-200/10 px-4 pb-6">
          <h3 className="text-grayscale-800 dark:text-grayscale-200 text-lg font-medium">
            {section?.metadata?.display_name ?? 'Course Completion Activity'}
          </h3>
        </div>

        {/* Table */}
        <div className="overflow-hidden">
          <Table
            columns={[
              {
                accessorKey: 'curriculumName',
                header: 'Course Name',
              },
              {
                accessorKey: 'completeStatus',
                header: 'Status',
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
                accessorKey: 'progress',
                header: 'Progress',
                cell: ({ cell }) => {
                  return (
                    <div className="flex flex-row items-center gap-2">
                      <ProgressBar
                        size="md"
                        className="w-24"
                        color={cell.getValue() === 1 ? 'success' : 'accent'}
                        progress={cell.getValue() as number}
                      />

                      <span>{(cell.getValue() as number).toFixed(0)}%</span>
                    </div>
                  )
                },
              },
              {
                accessorKey: 'coursesBelowCount',
                header: 'Courses',
                cell: ({ cell }) => {
                  return (
                    <span
                      className={mergeClasses(
                        cell.getValue() === 0 ? 'opacity-40' : undefined,
                      )}
                    >
                      {cell.getValue()}
                    </span>
                  )
                },
              },
              {
                accessorKey: 'startedDate',
                header: 'Date Started',
                cell: ({ cell }) => {
                  if (isTytoNullDate(cell.getValue() as string)) {
                    return <span>-</span>
                  }

                  return <Timestamp date={cell.getValue() as string} />
                },
              },
              {
                accessorKey: 'completionDate',
                header: 'Date Completed',
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
  curriculumName: string
  curriculumID: number
  completeStatus: string
  progress: number
  coursesBelowCount: number
  completionDate: string
  startedDate: string
  lastActivityDate: string
}

function useDisplayData({
  trainingQuery,
  keyedTraining,
  dynamic_section_data,
}: {
  trainingQuery: ReturnType<typeof useMappedTraining>
  keyedTraining: ReturnType<typeof useKeyedTraining>
  dynamic_section_data?: Partial<ActivityTableSectionData>
}) {
  return useMemo(() => {
    if (!trainingQuery.data) {
      return []
    }

    if (dynamic_section_data?.curriculumIDs?.length) {
      // * Normalize Data and sort
      return orderBy(
        dynamic_section_data.curriculumIDs.map((curriculumData) => {
          const curriculumID =
            typeof curriculumData === 'number'
              ? curriculumData
              : curriculumData.curriculumID

          const matchingCourse = keyedTraining[curriculumID]

          if (!matchingCourse) {
            return {
              ...generateEmptyDisplayData(),
              curriculumName: get(
                curriculumData,
                'curriculumName',
                '(Missing Course Name)',
              ),
            }
          }

          const completedCount =
            matchingCourse.recursiveRequiredCompleteCount ?? 0
          const requiredCount = matchingCourse.recursiveRequiredCount ?? 1

          return {
            curriculumName: matchingCourse.curriculumName,
            curriculumID: matchingCourse.curriculumID,
            completeStatus: getTrainingStatusLabel(
              matchingCourse.completeStatus,
            ),
            progress: Math.min(1, completedCount / requiredCount) * 100,
            coursesBelowCount: matchingCourse.coursesBelowCount ?? 0,
            startedDate: matchingCourse.startedDate,
            completionDate:
              matchingCourse.completeStatus === 'ocCOMPLETE'
                ? matchingCourse.statusDate
                : TYTO_NULL_DATE,
            lastActivityDate: matchingCourse.modifiedDate,
          }
        }),
        ['completeStatus', 'progress', 'lastActivityDate'],
        ['asc', 'desc', 'desc'],
      )
    }

    return trainingQuery.data?.training?.map((courseEnrollment) => {
      const completedCount =
        courseEnrollment.recursiveRequiredCompleteCount ?? 0
      const requiredCount = courseEnrollment.recursiveRequiredCount ?? 1

      return {
        curriculumName: courseEnrollment.curriculumName,
        curriculumID: courseEnrollment.curriculumID,
        completeStatus: getTrainingStatusLabel(courseEnrollment.completeStatus),
        progress: Math.min(1, completedCount / requiredCount) * 100,
        coursesBelowCount: courseEnrollment.coursesBelowCount ?? 0,
        startedDate: courseEnrollment.startedDate,
        completionDate:
          courseEnrollment.completeStatus === 'ocCOMPLETE'
            ? courseEnrollment.statusDate
            : TYTO_NULL_DATE,
        lastActivityDate: courseEnrollment.modifiedDate,
      }
    })
  }, [trainingQuery.data, keyedTraining, dynamic_section_data?.curriculumIDs])
}

function generateEmptyDisplayData(): DisplayData {
  return {
    curriculumName: '',
    curriculumID: Math.floor(Math.random() * 1_000_000) * -1,
    completeStatus: getTrainingStatusLabel('ocNOTSTARTED'),
    progress: 0,
    coursesBelowCount: 0,
    startedDate: TYTO_NULL_DATE,
    completionDate: TYTO_NULL_DATE,
    lastActivityDate: TYTO_NULL_DATE,
  }
}
