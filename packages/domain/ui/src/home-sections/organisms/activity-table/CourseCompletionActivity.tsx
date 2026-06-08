import { useMemo, useState } from 'react'
import type { HomeSection } from '@domain/configs'
import { Dialog, SkeletonText } from '@spacedock/falcon-ui'
import { Table } from '@falcon/table'
import { Button } from '@falcon/buttons'

// Note: This import will need to be resolved - the hook is still in the home app
import { useDynamicSummaryReport } from '../../hooks/useDynamicSummaryReport'

import type { ActivityTableSectionData } from '@domain/schemas'
import { orderBy } from 'lodash'
// // import { mergeClasses } from '@falcon/style'

export const CourseCompletionActivity = ({
  section,
  sectionData,
  dynamic_section_data,
}: {
  section?: HomeSection<ActivityTableSectionData>
  sectionData: ActivityTableSectionData
  dynamic_section_data?: Partial<ActivityTableSectionData>
}) => {
  const [viewAllActivityDialogOpen, setViewAllActivityDialogOpen] =
    useState(false)

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
    return orderBy(
      query.data.results.curriculum.map((courseActivity) => {
        const completed_count =
          courseActivity.statusSummary.find(
            (status) => status.completeStatus === 'ocCOMPLETE',
          )?.participantCount ?? 0

        return {
          id: courseActivity.curriculumID,
          name: courseActivity.name,
          completed: completed_count,
        }
      }),
      ['completed'],
      ['desc'],
    )
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

  const displayData =
    recentActivities.length > 8
      ? recentActivities.slice(0, 8)
      : recentActivities

  return (
    <div className="h-full">
      <div className="text-site-fg overflow-hidden rounded-lg bg-transparent shadow-sm">
        {/* Header */}
        <div className="gp-2 mb-4 flex flex-row justify-between border-b border-gray-200/10 px-4 pb-6">
          <h3 className="text-grayscale-800 dark:text-grayscale-200 text-lg font-medium">
            {section?.metadata?.display_name ?? 'Course Completion Activity'}
          </h3>

          {recentActivities.length > 8 ? (
            <>
              <Button
                variant="primary"
                onClick={() => setViewAllActivityDialogOpen(true)}
              >
                View All Activity
              </Button>

              <Dialog
                className="w-full max-w-[800px]"
                open={viewAllActivityDialogOpen}
                onOpenChange={setViewAllActivityDialogOpen}
                title="All Progress"
              >
                <Table
                  columns={[
                    {
                      accessorKey: 'name',
                      header: 'Name',
                    },
                    {
                      accessorKey: 'completed',
                      header: 'Users have Completed',
                    },
                  ]}
                  data={recentActivities}
                />
              </Dialog>
            </>
          ) : null}
        </div>

        {/* Table */}
        <div className="overflow-hidden">
          {recentActivities.length === 0 ? (
            <div className="text-grayscale-800 dark:text-grayscale-200 px-6 py-8 text-center">
              No recent learning activity found
            </div>
          ) : (
            <Table
              columns={[
                {
                  accessorKey: 'name',
                  header: 'Name',
                },
                {
                  accessorKey: 'completed',
                  header: 'Users have Completed',
                },
              ]}
              data={displayData}
            />
          )}
        </div>
      </div>
    </div>
  )
}
