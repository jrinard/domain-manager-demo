import { StatsCount } from '../../../business-academy/molecules/stats-count/StatsCount'
import type { HomeSection } from '@domain/configs'
import { Icon } from '@falcon/icons'
import type { ActiveEmployeesData } from '@domain/schemas'

export interface ActiveUsersProps {
  isLoading: boolean
  value: number
  subtitle: string
  section?: HomeSection<ActiveEmployeesData>
  sectionData: ActiveEmployeesData
}

export const ActiveUsers = ({
  isLoading,
  value,
  subtitle,
  section,
  sectionData,
}: ActiveUsersProps) => {
  return (
    <StatsCount
      className="h-full"
      isLoading={isLoading}
      value={value}
      title={section?.metadata?.display_name ?? 'Active Employees'}
      subtitle={subtitle}
      icon={
        <Icon
          className="text-2xl"
          icon={sectionData.icon_name ?? 'people-outline'}
          color="current"
        />
      }
      iconColorScheme={sectionData.iconColorScheme}
    />
  )
}
