import type { SectionRenderMode, LinkSection } from '@domain/configs'
import type {
  LinkMenuItemSectionData,
  LinkCustomTabSectionData,
  LinkExternalLinkSectionData,
} from '@domain/schemas'
import type { DomainUI } from '@spacedock/manifest'

import { AppLink } from './AppLink'
import { useMenuItem } from '../../hooks/useMenuItem'
import { useMatchingAttachment } from '../../hooks/useMatchingAttachment'
import { useSafeDestinationPath } from '../../hooks/useSafeDestinationPath'

export interface AppLinkSectionProps {
  sectionData: LinkSection['section_data'] | null
  metadata: LinkSection['metadata'] | null
  dynamic_section_data?: LinkSection['dynamic_section_data'] & {
    domainID?: number
    linkWidth?: 'auto' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
    itemBgColor?: string
    itemTextColor?: string
    cardSize?: 'section-card' | 'none'
    inGrid?: boolean
    stretchWithRow?: boolean
  }
  attachments?: DomainUI.Attachment[]
  renderMode?: SectionRenderMode
}

export const LinkDataWrapper = ({
  sectionData,
  metadata,
  dynamic_section_data,
  attachments,
  renderMode = 'prod',
}: AppLinkSectionProps) => {
  const { menuItem } = useMenuItem({
    functionID: menuItemTypeNarrower(sectionData).functionID,
    traitID: customTabTypeNarrower(sectionData).traitID,
    utilizeAdminEndponts: renderMode === 'mock',
    domainID: dynamic_section_data?.domainID,
  })

  const { pathURL: iconPathURL } = useMatchingAttachment(
    sectionData?.iconOverride ?? 0,
    attachments,
  )

  const safeDestinationPath = useSafeDestinationPath(
    (sectionData && externalLinkSafeProperty(sectionData, 'url')) ||
      menuItem?.href ||
      '',
  )

  const externalUrl =
    sectionData?.sub_type === 'external-link'
      ? externalLinkSafeProperty(sectionData, 'url')
      : ''
  const isDecorativeExternal =
    sectionData?.sub_type === 'external-link' && !externalUrl?.trim()

  if (!sectionData) {
    return null
  }

  const disabled =
    (!!menuItemTypeNarrower(sectionData).functionID && !menuItem?.href) ||
    (!!customTabTypeNarrower(sectionData).traitID && !menuItem?.href)

  // If disabled and hideWhenNoPermission is enabled, don't render the section at all
  if (disabled && metadata?.hideWhenNoPermission) {
    return null
  }

  // Data Layer To Allow use in other sections Without HomeSectionWrapper
  // this is a simple link component:
  // Mock, prod, and error modes all render the same
  return (
    <AppLink
      isExternal={!isDecorativeExternal && sectionData.sub_type === 'external-link'}
      href={isDecorativeExternal ? '' : safeDestinationPath}
      staticDisplay={isDecorativeExternal}
      title={
        metadata?.display_name ||
        sectionData?.textOverride ||
        menuItem?.title ||
        ''
      }
      iconDisplay={sectionData?.icon_display || 'inline'}
      iconPath={iconPathURL || menuItem?.iconPath || ''}
      iconPathLarge={iconPathURL || menuItem?.iconPathLarge || ''}
      width={dynamic_section_data?.linkWidth}
      hideArrow={(dynamic_section_data as any)?.hideArrow}
      iconBoxSize={renderMode === 'mock' ? 120 : 170}
      itemBgColor={(dynamic_section_data as any)?.itemBgColor}
      itemTextColor={(dynamic_section_data as any)?.itemTextColor}
      cardSize={(dynamic_section_data as any)?.cardSize}
      inGrid={(dynamic_section_data as any)?.inGrid}
      stretchWithRow={(dynamic_section_data as any)?.stretchWithRow}
      mockMinWidthClass={renderMode === 'mock' ? 'min-w-[188px]' : undefined}
      parentAlignment={(dynamic_section_data as any)?.parentAlignment}
      rounding={(dynamic_section_data as any)?.rounding}
      target={sectionData?.target || menuItem?.targetPref}
      disabled={disabled}
    />
  )
}

export function externalLinkSafeProperty<
  Key extends keyof LinkExternalLinkSectionData,
>(
  sectionData:
    | LinkMenuItemSectionData
    | LinkCustomTabSectionData
    | LinkExternalLinkSectionData,
  property: Key,
): LinkExternalLinkSectionData[Key] | '' {
  if (!sectionData || sectionData.sub_type !== 'external-link') {
    return ''
  }

  return sectionData[property] || ''
}

export function menuItemTypeNarrower(
  sectionData: unknown,
): LinkMenuItemSectionData {
  return sectionData as LinkMenuItemSectionData
}

export function customTabTypeNarrower(
  sectionData: unknown,
): LinkCustomTabSectionData {
  return sectionData as LinkCustomTabSectionData
}
