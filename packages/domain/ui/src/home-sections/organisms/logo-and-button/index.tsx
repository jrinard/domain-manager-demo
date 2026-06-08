import type { SectionRenderMode, HomeSection } from '@domain/configs'
import type { LogoAndButtonSectionData } from '@domain/schemas'
import { LogoAndButton } from './LogoAndButton'
import { useKeyedDomainImages } from '../../hooks/useKeyedDomainImages'
import { makePathFullyQualified } from '@tyto/assets'
import type { DomainUI } from '@spacedock/manifest'
import { useBaseOrigins } from '@spacedock/origins'

import { useMatchingAttachment } from '../../hooks/useMatchingAttachment'

export interface LogoAndButtonSectionProps {
  section: HomeSection<LogoAndButtonSectionData> | null
  attachments?: DomainUI.Attachment[]
  renderMode?: SectionRenderMode
  domainID?: number
}

export const LogoAndButtonSection = ({
  section,
  attachments,
  renderMode = 'prod',
  domainID = 0,
}: LogoAndButtonSectionProps) => {
  //* Get the correct assets base origin based on the current environment
  const { assetsBaseOrigin } = useBaseOrigins()

  //* Get Domain UI Logos - Must be called before any conditional returns
  const { keyedImages, domainUI } = useKeyedDomainImages({
    domainID: domainID || 0,
  })
  const { pathURL: attachmentPathURL } = useMatchingAttachment(
    section?.section_data.logoOverride ?? 0,
    attachments,
  )

  if (!section) return null

  //* Determine which Logo to use based on set dark or light scheme
  //TODO Investigate a way to handle the light,dark dual cases for which logo - right now just grabbing the first one.
  const colorSchemeKeyValue = domainUI?.domainUI?.keyValues?.find(
    (kv) => kv.uiKey === 'colorSchemes',
  )
  const colorScheme = colorSchemeKeyValue?.uiValue || 'dark'
  const primaryScheme = colorScheme.split(',')[0].trim().toLowerCase()
  const isDark = primaryScheme === 'dark'
  const preferredLogoByScheme = isDark ? 'logo_link_DARK' : 'logo_link'

  const section_data = section.section_data as LogoAndButtonSectionData
  let logoPathURL: string =
    keyedImages[preferredLogoByScheme as keyof typeof keyedImages]?.pathURL ??
    ''

  //*
  //* If Override Logo Image, Use matching attachment pathURL (already fully qualified via createFileURL),
  //* otherwise use the domainUI logo based on scheme with the correct environment-specific origin
  if (attachmentPathURL) {
    logoPathURL = attachmentPathURL
  } else if (logoPathURL) {
    // Make the path fully qualified for rendering using the correct environment-specific origin
    logoPathURL = makePathFullyQualified({
      baseURL: assetsBaseOrigin,
      relativePath: logoPathURL,
    })
  }

  return (
    <LogoAndButton
      section={section}
      sectionData={section_data}
      attachments={attachments}
      logoPathURL={logoPathURL}
    />
  )
}
