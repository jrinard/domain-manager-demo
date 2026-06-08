import type {
  ActiveEmployeesData,
  CoursesCompletedData,
  LessonCompletionsData,
} from '@domain/schemas'

export interface ActiveUsersMockProps {
  isLoading: boolean
  value: number
  subtitle: string
}

export function getActiveUsersMockData(
  _sectionData: ActiveEmployeesData,
): ActiveUsersMockProps {
  return {
    isLoading: false,
    value: 47,
    subtitle: '152 Total Employees',
  }
}

export interface CourseCompletionsMockProps {
  isLoading: boolean
  value: number
}

export function getCourseCompletionsMockData(
  _sectionData: CoursesCompletedData,
): CourseCompletionsMockProps {
  return {
    isLoading: false,
    value: 28,
  }
}

export interface LessonCompletionsMockProps {
  isLoading: boolean
  value: number
}

export function getLessonCompletionsMockData(
  _sectionData: LessonCompletionsData,
): LessonCompletionsMockProps {
  return {
    isLoading: false,
    value: 156,
  }
}
