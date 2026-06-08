import { useMemo } from 'react'
import type { HomeSection } from '@domain/configs'
import { SkeletonCircle, SkeletonText } from '@spacedock/falcon-ui'
import { Button } from '@falcon/buttons'
import { Icon } from '@falcon/icons'

// Note: This import will need to be resolved - the hook is still in the home app
import { useDynamicSummaryReport } from '../../hooks/useDynamicSummaryReport'

import type { ActivityTableSectionData } from '@domain/schemas'
import { mergeClasses } from '@falcon/style'

export const LearningActivity = ({
  section,
  sectionData,
  dynamic_section_data,
}: {
  section?: HomeSection<ActivityTableSectionData>
  sectionData: ActivityTableSectionData
  dynamic_section_data?: Partial<ActivityTableSectionData>
}) => {
  const query = useDynamicSummaryReport({
    domainIDFilters: sectionData.domainIDFilters,
    teamIDFilters: sectionData.teamIDFilters,
    categoryNameMatch: sectionData.categoryNameMatch,
    categoryNameNotMatch: sectionData.categoryNameNotMatch,
    reportTeamID: dynamic_section_data?.teamID ?? 0,
  })

  const recentActivities = useMemo(() => {
    if (!query.data?.results?.recentMemberCompletions) {
      return []
    }

    // Limit to recent activities (e.g., last 10)
    return query.data.results.recentMemberCompletions.map((completion) => ({
      id: `${completion.memberID}-${completion.curriculumID}-${completion.taskID}`,
      description: `${completion.memberName} completed ${completion.curriculumName}`,
      status: completion.completeStatus,
      date: new Date(completion.statusDate).toLocaleDateString(),
      memberName: completion.memberName,
      curriculumName: completion.curriculumName,
    }))
  }, [query.data?.results?.recentMemberCompletions])

  if (query.isLoading) {
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
              <li className="flex w-full flex-row gap-1 px-2">
                <SkeletonCircle size="6" />
                <div className="flex w-full flex-col gap-1">
                  <div className="w-3/4">
                    <SkeletonText size="base" length="1/2" />
                  </div>
                  <SkeletonText size="sm" length="short" />
                </div>
              </li>
              <li className="flex w-full flex-row gap-1 px-2">
                <SkeletonCircle size="6" />
                <div className="flex w-full flex-col gap-1">
                  <div className="w-3/4">
                    <SkeletonText size="base" length="3/4" />
                  </div>
                  <SkeletonText size="sm" length="short" />
                </div>
              </li>
              <li className="flex w-full flex-row gap-1 px-2">
                <SkeletonCircle size="6" />
                <div className="flex w-full flex-col gap-1">
                  <div className="w-3/4">
                    <SkeletonText size="base" length="1/4" />
                  </div>
                  <SkeletonText size="sm" length="short" />
                </div>
              </li>
              <li className="flex w-full flex-row gap-1 px-2">
                <SkeletonCircle size="6" />
                <div className="flex w-full flex-col gap-1">
                  <div className="w-3/4">
                    <SkeletonText size="base" length="2/3" />
                  </div>
                  <SkeletonText size="sm" length="short" />
                </div>
              </li>
              <li className="flex w-full flex-row gap-1 px-2">
                <SkeletonCircle size="6" />
                <div className="flex w-full flex-col gap-1">
                  <div className="w-3/4">
                    <SkeletonText size="base" length="1/6" />
                  </div>
                  <SkeletonText size="sm" length="short" />
                </div>
              </li>
              <li className="flex w-full flex-row gap-1 px-2">
                <SkeletonCircle size="6" />
                <div className="flex w-full flex-col gap-1">
                  <div className="w-3/4">
                    <SkeletonText size="base" length="1/4" />
                  </div>
                  <SkeletonText size="sm" length="short" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  const displayData =
    recentActivities.length > 10
      ? recentActivities.slice(0, 10)
      : recentActivities

  return (
    <div className="h-full">
      <div className="text-site-fg overflow-hidden rounded-lg bg-transparent shadow-sm">
        {/* Header */}
        <div className="mb-4 border-b border-gray-200/10 px-4 pb-6">
          <h3 className="text-grayscale-800 dark:text-grayscale-200 text-lg font-medium">
            {section?.metadata?.display_name ?? 'Recent Learning Activity'}
          </h3>

          {recentActivities.length > 10 ? (
            <Button>View All Activity</Button>
          ) : null}
        </div>

        {/* Table */}
        <div className="overflow-hidden">
          {recentActivities.length === 0 ? (
            <div className="text-grayscale-800 dark:text-grayscale-200 px-6 py-8 text-center">
              No recent learning activity found
            </div>
          ) : (
            <ul className="flex w-full min-w-full flex-col gap-4">
              {displayData.map((activity, index) => (
                <li
                  key={activity.id}
                  className={mergeClasses('flex flex-row gap-2 px-2')}
                >
                  <div>
                    <ActivityIcon
                      type={
                        activity.status === 'ocCOMPLETE'
                          ? 'completed'
                          : 'progress'
                      }
                    />
                  </div>
                  <div className="text-grayscale-800 dark:text-grayscale-200 flex flex-col gap-1 whitespace-nowrap text-sm">
                    <div>{activity.description}</div>

                    <div className="text-grayscale-700 dark:text-grayscale-300 whitespace-nowrap text-sm">
                      {activity.date}
                    </div>
                  </div>

                  <div></div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

interface ActivityIconProps {
  type: 'completed' | 'progress'
}

const ActivityIcon = (props: ActivityIconProps) => {
  switch (props.type) {
    case 'completed':
      return (
        <Icon
          className="fill-current"
          color="success"
          size="2xl"
          icon="check-circle"
        />
      )
    default:
      return null
  }
}
