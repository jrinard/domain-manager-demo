import { useMemo } from 'react'
import { useTrainingQuery } from '@tyto/query'

type TrainingGetResponse = NonNullable<
  ReturnType<typeof useTrainingQuery>['data']
>

export function useMappedTraining(
  params: Parameters<typeof useTrainingQuery>[0],
) {
  const trainingQuery = useTrainingQuery(params)

  const mutatedTraining = useMemo(() => {
    if (!trainingQuery.data) {
      return trainingQuery.data
    }

    const data = trainingQuery.data

    recursivelySetCourseLadderCountsAndPaths(
      data,
      createCourseParentsLadder(data),
    )

    return data
  }, [trainingQuery.data])

  return {
    ...trainingQuery,
    data: mutatedTraining,
  }
}

function createCourseParentsLadder(
  resp: NonNullable<ReturnType<typeof useTrainingQuery>['data']>,
) {
  const { subBlocks } = resp

  const parentChildIDsMap: {
    [curriculumID: number]: Array<number>
  } = {}

  subBlocks.forEach((subBlock) => {
    subBlock.parentBlocks?.forEach((parentBlock) => {
      if (!parentChildIDsMap[parentBlock.blockID]) {
        parentChildIDsMap[parentBlock.blockID] = []
      }

      parentChildIDsMap[parentBlock.blockID]?.push(subBlock.curriculumID)
    })

    subBlock.parentTasks?.forEach((parentPlanInfo) => {
      if (!parentChildIDsMap[parentPlanInfo.rootTaskID]) {
        parentChildIDsMap[parentPlanInfo.rootTaskID] = []
      }

      parentChildIDsMap[parentPlanInfo.rootTaskID]?.push(subBlock.curriculumID)
    })
  })

  return parentChildIDsMap
}

function recursivelySetCourseLadderCountsAndPaths(
  resp: Pick<TrainingGetResponse, 'subBlocks' | 'training'>,
  parentsLadder: ReturnType<typeof createCourseParentsLadder>,
) {
  const { subBlocks, training } = resp

  const indexByCurriculumID = subBlocks.reduce<Record<number, number>>(
    (accum, subBlock, curIndex) => {
      accum[subBlock.curriculumID] = curIndex
      return accum
    },
    {},
  )

  // * Initialize the map to track all possible paths for each course
  const allPathsMap = new Map<number, Set<string>>()

  training.forEach((directlyEnrolledCourse) => {
    if (!parentsLadder[directlyEnrolledCourse.curriculumID]?.length) return

    if (!directEnrollmentIsBlock(directlyEnrolledCourse)) return

    const countsDown = recursivelyDescendParentsLadderAndMutateData({
      curriculumID: directlyEnrolledCourse.curriculumID,
      parentsLadder,
      subBlocks,
      curPath: [directlyEnrolledCourse.curriculumID],
      indexByCurriculumID,
      allPathsMap,
    })

    // * Account for, and otherwise do not redundantly count courses below this course as a step,
    // * since their respective steps are counted and are what actually will be completed
    directlyEnrolledCourse.recursiveRequiredCompleteCount =
      directlyEnrolledCourse.subTaskRequiredCompleteCount +
      countsDown.totalRequiredCompleteCount -
      countsDown.completedCoursesBelowCount

    directlyEnrolledCourse.recursiveRequiredCount =
      directlyEnrolledCourse.subTaskRequiredCount +
      countsDown.totalRequiredCount -
      countsDown.coursesBelowCount

    directlyEnrolledCourse.coursesBelowCount = countsDown.coursesBelowCount
    directlyEnrolledCourse.completedCoursesBelowCount =
      countsDown.completedCoursesBelowCount

    // * Create percentage from recursive values
    const adjustedPercent =
      (directlyEnrolledCourse.recursiveRequiredCompleteCount /
        directlyEnrolledCourse.recursiveRequiredCount) *
      100

    // * [3] - Adjusted Required Percent
    directlyEnrolledCourse.recursiveRequiredCompletePercent = Math.min(
      Math.max(adjustedPercent, 0),
      100,
    )
  })

  return resp
}

function directEnrollmentIsBlock(
  enrollment: TrainingGetResponse['training'][number],
): enrollment is TrainingGetResponse['training'][number] {
  return enrollment.curriculumType === 'ocBLOCK'
}

interface CountsDown {
  coursesBelowCount: number
  completedCoursesBelowCount: number
  totalRequiredCompleteCount: number
  totalRequiredCount: number
}

function recursivelyDescendParentsLadderAndMutateData({
  curriculumID,
  parentsLadder,
  subBlocks,
  curPath,
  indexByCurriculumID,
  allPathsMap = new Map(),
}: {
  curriculumID: number
  parentsLadder: ReturnType<typeof createCourseParentsLadder>
  subBlocks: TrainingGetResponse['subBlocks']
  curPath: number[]
  indexByCurriculumID: Record<number, number>
  allPathsMap?: Map<number, Set<string>>
}): CountsDown {
  const summaryForParentCourse: CountsDown = {
    // * Courses Below
    coursesBelowCount: 0,
    completedCoursesBelowCount: 0,
    // * Totals
    totalRequiredCompleteCount: 0,
    totalRequiredCount: 0,
  }

  // * If this course has no children, return counts of 0 (parent will already have numbers for it's own steps)
  if (!curriculumID || !parentsLadder[curriculumID]?.length) {
    return summaryForParentCourse
  }

  summaryForParentCourse.coursesBelowCount +=
    parentsLadder[curriculumID].length || 0

  // * For each direct child of this course, recursively descend and add counts to the current course
  parentsLadder[curriculumID].forEach((childCurriculumID) => {
    const indirectEnrolledCourse =
      subBlocks[indexByCurriculumID[childCurriculumID]]

    // * Shouldn't ever happen, but just in case...
    if (
      !indirectEnrolledCourse ||
      indirectEnrolledCourse.curriculumID !== childCurriculumID
    ) {
      return
    }

    // * Find the parent block relationship for this course
    const parentBlockIndex = indirectEnrolledCourse.parentBlocks?.findIndex(
      (rel) => rel.blockID === curriculumID,
    )

    if (
      parentBlockIndex === -1 ||
      parentBlockIndex === undefined ||
      !indirectEnrolledCourse.parentBlocks
    ) {
      return
    }

    const currentPath = [...curPath, childCurriculumID]

    // * Track this path for the child course
    if (!allPathsMap.has(childCurriculumID)) {
      allPathsMap.set(childCurriculumID, new Set())
    }
    allPathsMap.get(childCurriculumID)?.add(curPath.join(','))

    // * Set the path of this course to the current path (backward compatibility)
    if (indirectEnrolledCourse.parentBlocks[parentBlockIndex]?.parentIDsPath) {
      indirectEnrolledCourse.parentBlocks[parentBlockIndex].parentIDsPath = [
        ...curPath,
      ]
    }

    // * Set all paths for this parent relationship
    const pathsSet = allPathsMap.get(childCurriculumID) || new Set<string>()
    const allPathsForChild = Array.from(pathsSet).map((pathStr: string) =>
      pathStr
        .split(',')
        .map((idStr: string) => Number(idStr))
        .filter((id: number) => !isNaN(id)),
    )
    if (indirectEnrolledCourse.parentBlocks[parentBlockIndex]?.allParentPaths) {
      indirectEnrolledCourse.parentBlocks[parentBlockIndex].allParentPaths =
        allPathsForChild
    }

    const childCounts = recursivelyDescendParentsLadderAndMutateData({
      curriculumID: childCurriculumID,
      parentsLadder,
      subBlocks,
      curPath: currentPath,
      indexByCurriculumID,
      allPathsMap,
    })

    // * THESE ARE FOR THE PARENT COURSE
    summaryForParentCourse.coursesBelowCount += childCounts.coursesBelowCount

    summaryForParentCourse.completedCoursesBelowCount +=
      childCounts.completedCoursesBelowCount

    summaryForParentCourse.totalRequiredCompleteCount +=
      childCounts.totalRequiredCompleteCount +
      indirectEnrolledCourse.subTaskRequiredCompleteCount

    summaryForParentCourse.totalRequiredCount +=
      childCounts.totalRequiredCount +
      indirectEnrolledCourse.subTaskRequiredCount

    if (indirectEnrolledCourse.completeStatus === 'ocCOMPLETE') {
      summaryForParentCourse.completedCoursesBelowCount += 1
    }

    // * MUTATE TARGET COURSE
    // * [1] - Total Complete Required Steps Count
    indirectEnrolledCourse.recursiveRequiredCompleteCount = Math.max(
      0,
      indirectEnrolledCourse.subTaskRequiredCompleteCount +
        childCounts.totalRequiredCompleteCount -
        childCounts.completedCoursesBelowCount,
    )

    // * [2] - Adjusted Required Steps Count
    indirectEnrolledCourse.recursiveRequiredCount = Math.max(
      0,
      indirectEnrolledCourse.subTaskRequiredCount +
        childCounts.totalRequiredCount -
        childCounts.coursesBelowCount,
    )

    // * Create percentage from recursive values
    const adjustedPercent =
      (indirectEnrolledCourse.recursiveRequiredCompleteCount /
        indirectEnrolledCourse.recursiveRequiredCount) *
      100

    // * [3] - Adjusted Required Percent
    indirectEnrolledCourse.recursiveRequiredCompletePercent = Math.min(
      Math.max(adjustedPercent, 0),
      100,
    )

    // * [4] - Courses Below Count
    indirectEnrolledCourse.coursesBelowCount = childCounts.coursesBelowCount

    // * [5] - Completed Courses Below Count
    indirectEnrolledCourse.completedCoursesBelowCount =
      childCounts.completedCoursesBelowCount
  })

  // * Return counts for everything below this course
  return summaryForParentCourse
}
