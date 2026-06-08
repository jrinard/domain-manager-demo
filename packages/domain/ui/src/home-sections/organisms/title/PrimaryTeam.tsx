import type { HomeSection } from '@domain/configs'
import { useSession } from '@spacedock/cargo-bay'

import { TeamSection } from './Team'

export type PrimaryTeamSectionData = {
  title: string
}

export const PrimaryTeamSection = ({
  section,
  isPreviewMode = false,
}: {
  section: HomeSection
  isPreviewMode?: boolean
}) => {
  const user = useSession()

  return (
    <TeamSection
      section={section}
      teamID={user.teamRootID ?? 0}
      isPreviewMode={isPreviewMode}
    />
  )
}
