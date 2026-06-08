import { HomeSectionWrapper } from '../home-section-wrapper'
import type { HomeSection } from '@domain/configs'
import type { R3FullSectionData } from '@domain/schemas'

export interface R3FullProps {
  section?: HomeSection<R3FullSectionData>
  sectionData?: R3FullSectionData
  renderMode?: 'prod' | 'mock'
}

export const R3Full = ({ section, renderMode = 'prod' }: R3FullProps) => {
  if (!section) {
    return null
  }

  return (
    <HomeSectionWrapper
      section={section}
      fallbackLayoutPosition={{
        columnSpan: 12,
      }}
      padding={section.metadata.padding}
    >
      <div className="p-8">
        <h2 className="mb-4 text-2xl font-bold">R3 Full Section</h2>
        <p className="text-gray-600">
          This is the R3 Full section. Design coming soon. This section spans 12
          columns.
        </p>
      </div>
    </HomeSectionWrapper>
  )
}
