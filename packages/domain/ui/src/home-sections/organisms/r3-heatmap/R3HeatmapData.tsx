import type { HomeSection } from '@domain/configs'
import type { R3HeatmapSectionData } from '@domain/schemas'
import { useDiscProfilesMiniQuery, useTeamQuery } from '@tyto/query'
import { useSession } from '@spacedock/cargo-bay'
import { R3Heatmap } from './R3Heatmap'

export interface R3HeatmapDataProps {
  section?: HomeSection<R3HeatmapSectionData>
  sectionData: R3HeatmapSectionData
}

export const R3HeatmapDataComponent = ({
  section,
  sectionData,
}: R3HeatmapDataProps) => {
  const session = useSession()
  const teamID =
    typeof sectionData.teamID === 'number'
      ? sectionData.teamID
      : session.teamRootID || -1

  const teamQuery = useTeamQuery({
    teamID,
    isEnabled: !!teamID,
  })

  const queryDiscProfiles = useDiscProfilesMiniQuery({
    teamID: teamID,
    disabled: !teamID,
  })

  return (
    <R3Heatmap
      section={section}
      sectionData={sectionData}
      discProfiles={queryDiscProfiles.data?.discProfiles ?? []}
      teamName={teamQuery.data?.team.teamName ?? ''}
      isLoading={queryDiscProfiles.isPending || teamQuery.isPending}
    />
  )
}
