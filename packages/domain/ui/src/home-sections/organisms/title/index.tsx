import type {
  TitleSection as TitleSectionType,
  SectionRenderMode,
  HomeSection,
} from '@domain/configs'
import type {
  TitleSectionData,
  TeamTitleData,
  PrimaryTeamTitleData,
  PersonTitleData,
} from '@domain/schemas'
import { TeamTitleDataComponent } from './TeamTitleData'
import { TeamTitleMockData } from './TeamTitleMockData'
import { PersonTitleDataComponent } from './PersonTitleData'
import { PersonTitleMockData } from './PersonTitleMockData'
import { PrimaryTeamTitleDataComponent } from './PrimaryTeamTitleData'
import { PrimaryTeamTitleMockData } from './PrimaryTeamTitleMockData'

export interface TitleSectionProps {
  section: TitleSectionType | null
  dynamic_section_data?: Partial<TitleSectionData>
  renderMode?: SectionRenderMode
}

export const TitleSection = ({
  section,
  dynamic_section_data,
  renderMode = 'prod',
}: TitleSectionProps) => {
  if (!section) {
    return null
  }

  return (
    <TitleSectionRouter
      section={section}
      dynamic_section_data={dynamic_section_data}
      renderMode={renderMode}
    />
  )
}

function TitleSectionRouter(props: {
  section: TitleSectionType
  // sectionData: TitleSectionData
  dynamic_section_data?: TitleSectionType['dynamic_section_data']
  renderMode: SectionRenderMode
}) {
  const section = props.section
  // if (section.section_data.sub_type === "primary-team") {
  //   section.section_data.
  // }

  const teamSection = section as HomeSection<TeamTitleData, 'title'>
  const primaryTeamSection = section as HomeSection<
    PrimaryTeamTitleData,
    'title'
  >
  const personSection = section as HomeSection<PersonTitleData, 'title'>

  switch (section.section_data.sub_type) {
    case 'primary-team':
      if (props.renderMode === 'mock') {
        return (
          <PrimaryTeamTitleMockData
            section={primaryTeamSection}
            sectionData={section.section_data}
          />
        )
      }
      return (
        <PrimaryTeamTitleDataComponent
          section={primaryTeamSection as any}
          sectionData={section.section_data}
        />
      )

    case 'person':
      if (props.renderMode === 'mock') {
        return (
          <PersonTitleMockData
            section={personSection}
            sectionData={section.section_data}
          />
        )
      }
      return (
        <PersonTitleDataComponent
          section={personSection}
          sectionData={section.section_data}
          dynamic_section_data={
            props.dynamic_section_data as Partial<PersonTitleData>
          }
        />
      )
    case 'team':
    default:
      if (props.renderMode === 'mock') {
        return (
          <TeamTitleMockData
            section={teamSection}
            sectionData={section.section_data}
          />
        )
      }

      return (
        <TeamTitleDataComponent
          section={teamSection}
          sectionData={section.section_data}
          dynamic_section_data={
            section.dynamic_section_data as Partial<TeamTitleData>
          }
        />
      )
  }
}
