import type { SectionRenderMode, ButtonSection } from '@domain/configs'
import type {
  ButtonMenuItemSectionData,
  ButtonCustomTabSectionData,
  ButtonExternalLinkSectionData,
} from '@domain/schemas'
import { ButtonCard } from './ButtonCard'
import { useMenuItem } from '../../hooks/useMenuItem'
import { useSafeDestinationPath } from '../../hooks/useSafeDestinationPath'

export interface ButtonSectionProps {
  sectionData: ButtonSection['section_data'] | null
  dynamic_section_data?: ButtonSection['dynamic_section_data'] & {
    buttonWidth?: 'auto' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
    inGrid?: boolean
    stretchWithRow?: boolean
  }
  renderMode?: SectionRenderMode
}

export const ButtonDataWrapper = ({
  sectionData,
  dynamic_section_data,
  renderMode = 'prod',
}: ButtonSectionProps) => {
  const { menuItem } = useMenuItem({
    functionID: menuItemTypeNarrower(sectionData)?.functionID,
    traitID: customTabTypeNarrower(sectionData)?.traitID,
    utilizeAdminEndponts: renderMode === 'mock',
    domainID: (dynamic_section_data as any)?.domainID,
  })

  const safeDestinationPath = useSafeDestinationPath(
    (sectionData && externalLinkSafeProperty(sectionData, 'url')) ||
      menuItem?.href ||
      '',
  )

  if (
    !sectionData ||
    (renderMode !== 'mock' &&
      sectionData.sub_type !== 'external-link' &&
      !menuItem)
  ) {
    return null
  }

  const disabled =
    (!!menuItemTypeNarrower(sectionData).functionID && !menuItem?.href) ||
    (!!customTabTypeNarrower(sectionData).traitID && !menuItem?.href)

  // No data layer needed - this is a simple link component
  // Mock, prod, and error modes all render the same
  return (
    <ButtonCard
      href={safeDestinationPath}
      title={sectionData?.textOverride || menuItem?.title || ''}
      variant={sectionData?.buttonVariant}
      buttonWidth={dynamic_section_data?.buttonWidth}
      inGrid={dynamic_section_data?.inGrid}
      stretchWithRow={dynamic_section_data?.stretchWithRow}
      target={sectionData?.target || menuItem?.targetPref}
      size={sectionData?.buttonSize}
      disabled={disabled}
    />
  )
}

function externalLinkSafeProperty<
  Key extends keyof ButtonExternalLinkSectionData,
>(
  sectionData:
    | ButtonMenuItemSectionData
    | ButtonCustomTabSectionData
    | ButtonExternalLinkSectionData,
  property: Key,
): ButtonExternalLinkSectionData[Key] | '' {
  if (!sectionData || sectionData.sub_type !== 'external-link') {
    return ''
  }

  return sectionData[property] || ''
}

function menuItemTypeNarrower(sectionData: unknown): ButtonMenuItemSectionData {
  return sectionData as ButtonMenuItemSectionData
}

function customTabTypeNarrower(
  sectionData: unknown,
): ButtonCustomTabSectionData {
  return sectionData as ButtonCustomTabSectionData
}
