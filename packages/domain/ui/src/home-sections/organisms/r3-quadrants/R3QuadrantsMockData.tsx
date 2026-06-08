import type { HomeSection } from '@domain/configs'
import type { R3QuadrantsSectionData } from '@domain/schemas'
import { R3Quadrants } from './R3Quadrants'

export interface R3QuadrantsMockDataProps {
  section?: HomeSection<R3QuadrantsSectionData>
  sectionData: R3QuadrantsSectionData
}

export const R3QuadrantsMockData = ({
  section,
  sectionData,
}: R3QuadrantsMockDataProps) => {
  const mockDiscProfile = {
    permitMatrix: {} as any,
    personID: 1,
    primaryElementID: 1,
    teamRoot: 1,
    personName: 'Preview User',
    profileImageID: 1,
    d1: 85,
    d2: 80,
    d3: 75,
    i1: 45,
    i2: 40,
    i3: 35,
    s1: 30,
    s2: 25,
    s3: 20,
    c1: 40,
    c2: 45,
    c3: 50,
    styleKey3: 'D',
    styleName3: 'Dominance',
    emails: ['preview@example.com'],
    jobTitle: 'Preview Role',
    phone1: '555-0123',
    lastActivity: new Date(),
    isTeamLeader: false,
    teamToolsPermit: {} as any,
  }

  return (
    <R3Quadrants
      section={section}
      sectionData={sectionData}
      discProfile={mockDiscProfile as any}
      isLoading={false}
    />
  )
}
