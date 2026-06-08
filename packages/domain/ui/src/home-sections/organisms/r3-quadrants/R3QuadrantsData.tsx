import type { HomeSection } from '@domain/configs'
import type { R3QuadrantsSectionData } from '@domain/schemas'
import { useDiscProfilesMiniQuery } from '@tyto/query'
import { useSession } from '@spacedock/cargo-bay'
import { R3Quadrants } from './R3Quadrants'

export interface R3QuadrantsDataProps {
  section?: HomeSection<R3QuadrantsSectionData>
  sectionData: R3QuadrantsSectionData
}

export const R3QuadrantsDataComponent = ({
  section,
  sectionData,
}: R3QuadrantsDataProps) => {
  const user = useSession()

  const queryDiscProfiles = useDiscProfilesMiniQuery({
    personIDs: [user.userID],
    disabled: !user.userID,
  })

  return (
    <R3Quadrants
      section={section}
      sectionData={sectionData}
      discProfile={queryDiscProfiles.data?.discProfiles?.[0]}
      isLoading={queryDiscProfiles.isPending}
    />
  )
}
