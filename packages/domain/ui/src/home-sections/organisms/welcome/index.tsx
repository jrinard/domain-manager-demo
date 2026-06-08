import type { SectionRenderMode, HomeSection } from '@domain/configs'
import type { WelcomeSectionData } from '@domain/schemas'
import { Welcome } from './Welcome'

export interface WelcomeSectionProps {
  section: HomeSection<WelcomeSectionData> | null
  renderMode?: SectionRenderMode
}

export const WelcomeSection = ({
  section,
  renderMode = 'prod',
}: WelcomeSectionProps) => {
  if (!section) return null

  // Prefer stored buttons array; fall back to legacy action/url/functionID/buttonLabel
  const storedButtons = (section.section_data as any).buttons
  let buttons = Array.isArray(storedButtons) ? storedButtons : undefined

  const storedAction = (section.section_data as any).action
  const legacyFunctionID = (section.section_data as any).functionID
  const legacyURL = (section.section_data as any).url
  const legacyLabel = (section.section_data as any).buttonLabel
  const legacyVariant = (section.section_data as any).buttonVariant

  if (!buttons || buttons.length === 0) {
    if (storedAction) {
      buttons = [storedAction]
    } else if (legacyFunctionID || legacyURL || legacyLabel) {
      if (legacyFunctionID) {
        buttons = [
          {
            sub_type: 'menu-item',
            functionID: legacyFunctionID,
            buttonVariant: legacyVariant ?? 'primary',
            textOverride: legacyLabel ?? undefined,
          },
        ]
      } else {
        buttons = [
          {
            sub_type: 'external-link',
            url: legacyURL,
            buttonVariant: legacyVariant ?? 'primary',
            textOverride: legacyLabel ?? undefined,
          },
        ]
      }
    }
  }

  const data: WelcomeSectionData = {
    welcomeText: section.section_data.welcomeText,
    // If hidePersonName is explicitly set in stored config, it should take precedence
    welcomeUser:
      (section.section_data as any).hidePersonName !== undefined
        ? !((section.section_data as any).hidePersonName)
        : section.section_data.welcomeUser,
    flow: (section.section_data as any).flow ?? 'forward',
    description: section.section_data.description,
    buttons,
    // buttonLabel/buttonVariant removed; buttons array should be used instead
    direction: (section.section_data as any).direction ?? 'row',
  }

  return <Welcome section={section} sectionData={data} />
}

export const WelcomeMockData = ({
  section,
  sectionData,
}: {
  section?: HomeSection<WelcomeSectionData>
  sectionData?: Partial<WelcomeSectionData>
}) => {
  const defaults: WelcomeSectionData = {
    welcomeText: 'Welcome,',
    welcomeUser: true,
    flow: 'forward',
    description: 'Welcome to your resource hub.',
    // no default buttonLabel/buttonVariant; use buttons array instead
    direction: 'row',
  }

  const effective: WelcomeSectionData = {
    ...defaults,
    ...(section?.section_data || {}),
    ...(sectionData || {}),
  }

  return <Welcome section={section as any} sectionData={effective} />
}
