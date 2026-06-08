import type {
  SectionRenderMode,
  ButtonSection as ButtonSectionType,
} from '@domain/configs'
import { ButtonDataWrapper } from './ButtonDataWrapper'
import { HomeSectionWrapper } from '../home-section-wrapper'

export interface ButtonSectionProps {
  section: ButtonSectionType | null
  dynamic_section_data?: ButtonSectionType['dynamic_section_data'] & {
    domainID?: number
  }
  renderMode?: SectionRenderMode
}

export const ButtonSection = ({
  section,
  dynamic_section_data,
  renderMode = 'prod',
}: ButtonSectionProps) => {
  if (!section) {
    return null
  }

  return (
    <HomeSectionWrapper
      section={section}
      fallbackLayoutPosition={{
        columnSpan: 3,
      }}
      padding={section.metadata.padding ?? 'sm'}
    >
      <ButtonDataWrapper
        sectionData={section?.section_data}
        dynamic_section_data={dynamic_section_data}
        renderMode={renderMode}
      />
    </HomeSectionWrapper>
  )
}
