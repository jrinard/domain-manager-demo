export type StatsCountSubType =
  | 'active-employees'
  | 'courses-completed'
  | 'lesson-completions'

export interface DashboardFilters extends Record<string, unknown> {
  domainIDFilters?: number[]
  teamIDFilters?: number[]
  categoryNameMatch?: string
  categoryNameNotMatch?: string
  daysCount?: number
  teamID?: number
  icon_name?: string
  memberID?: number
  iconColorScheme?:
    | 'blue'
    | 'green'
    | 'purple'
    | 'yellow'
    | 'orange'
    | 'red'
    | 'gray'
    | null
    | undefined
}

export interface StatsCountSectionData extends DashboardFilters {
  sub_type: StatsCountSubType
  lessonTypeFilters?: string[]
}
