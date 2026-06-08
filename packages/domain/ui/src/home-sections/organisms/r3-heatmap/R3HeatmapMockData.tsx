import type { HomeSection } from '@domain/configs'
import type { R3HeatmapSectionData } from '@domain/schemas'
import { R3Heatmap } from './R3Heatmap'

export interface R3HeatmapMockDataProps {
  section?: HomeSection<R3HeatmapSectionData>
  sectionData: R3HeatmapSectionData
}

const FAKE_DISC_PROFILES = [
  {
    d1: 45,
    i1: 65,
    s1: 35,
    c1: 55,
    d2: 50,
    i2: 70,
    s2: 30,
    c2: 50,
    d3: 55,
    i3: 75,
    s3: 25,
    c3: 45,
    styleKey3: 'I',
    personID: 1,
    personName: 'John Doe',
  },
  {
    d1: 60,
    i1: 40,
    s1: 50,
    c1: 50,
    d2: 65,
    i2: 35,
    s2: 55,
    c2: 45,
    d3: 70,
    i3: 30,
    s3: 60,
    c3: 40,
    styleKey3: 'D',
    personID: 2,
    personName: 'Jane Smith',
  },
  {
    d1: 30,
    i1: 50,
    s1: 70,
    c1: 50,
    d2: 25,
    i2: 45,
    s2: 75,
    c2: 55,
    d3: 20,
    i3: 40,
    s3: 80,
    c3: 60,
    styleKey3: 'S',
    personID: 3,
    personName: 'Bob Johnson',
  },
]

export const R3HeatmapMockData = ({
  section,
  sectionData,
}: R3HeatmapMockDataProps) => {
  return (
    <R3Heatmap
      section={section}
      sectionData={sectionData}
      discProfiles={FAKE_DISC_PROFILES as any}
      teamName="Preview Team"
      isLoading={false}
    />
  )
}
