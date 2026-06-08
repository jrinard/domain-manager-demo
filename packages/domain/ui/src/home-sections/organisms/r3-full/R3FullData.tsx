import type { HomeSection } from '@domain/configs'
import type { R3FullSectionData } from '@domain/schemas'
import { useDiscProfilesMiniQuery } from '@tyto/query'
import { useSession } from '@spacedock/cargo-bay'
import { R3Full } from './R3Full'

export interface R3FullDataProps {
  section?: HomeSection<R3FullSectionData>
  sectionData: R3FullSectionData
}

export const R3FullDataComponent = ({
  section,
  sectionData,
}: R3FullDataProps) => {
  const user = useSession()

  const queryDiscProfiles = useDiscProfilesMiniQuery({
    personIDs: [user.userID],
    disabled: !user.userID,
  })

  return (
    <R3Full
      section={section}
      sectionData={sectionData}
      discProfile={queryDiscProfiles.data?.discProfiles?.[0]}
      isLoading={queryDiscProfiles.isPending}
      renderMode="prod"
    />
  )
}
