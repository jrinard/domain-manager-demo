import { EnvironmentVariables } from '@spacedock/tricorder'
import { makePathFullyQualified } from '@tyto/assets'
import type { LinkSection } from '@domain/configs'
import { Icon } from '@falcon/icons'

import type { LinkProps } from './LinkCard'
import { LinkCard } from './LinkCard'
import { mergeClasses } from '@falcon/style'

export interface AppLinkProps {
  section?: LinkSection
  iconDisplay: LinkSection['section_data']['icon_display']
  iconPath?: string
  iconPathLarge?: string
  isExternal?: boolean
  href: string
  title?: string
  width?: 'auto' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  disabled?: boolean
  target?: string
  hideIcon?: boolean
  hideArrow?: boolean
  itemBgColor?: LinkProps['itemBgColor']
  itemTextColor?: LinkProps['itemTextColor']
  cardSize?: LinkProps['cardSize']
  inGrid?: LinkProps['inGrid']
  stretchWithRow?: LinkProps['stretchWithRow']
  iconBoxSize?: number
  parentAlignment?: string
  rounding?: string
  mockMinWidthClass?: string
  /** Non-interactive display (e.g. external-link without a URL). */
  staticDisplay?: boolean
}

export const AppLink = ({
  iconDisplay,
  iconPath,
  iconPathLarge,
  isExternal,
  title,
  href,
  width,
  disabled,
  target,
  hideIcon,
  hideArrow,
  itemBgColor,
  itemTextColor,
  cardSize,
  inGrid,
  stretchWithRow,
  iconBoxSize,
  parentAlignment,
  rounding,
  mockMinWidthClass,
  staticDisplay,
}: AppLinkProps) => {
  const safeIconPath = iconPath || iconPathLarge
  const safeIconPathLarge = iconPathLarge || iconPath
  const fallbackTitle = disabled ? 'Permission Required' : 'Link'
  const roundingClassMap: Record<string, string> = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  }

  const getInlineIconClass = (w?: AppLinkProps['width']) => {
    switch (w) {
      case 'sm':
        return 'h-8 w-8'
      case 'md':
        return 'h-10 w-10'
      case 'lg':
        return 'h-12 w-12'
      case 'xl':
        return 'h-14 w-14'
      case '2xl':
        return 'h-16 w-16'
      case 'full':
        return 'h-[72px] w-[72px]'
      default:
        return 'h-12 w-12'
    }
  }
  return (
    <LinkCard
      title={staticDisplay ? title || '' : title || fallbackTitle}
      link={href}
      target={target}
      isExternal={isExternal}
      variant={iconDisplay === 'background' ? 'stacked' : undefined}
      hideIcon={hideIcon ?? iconDisplay === 'background'}
      hideArrow={hideArrow}
      itemBgColor={itemBgColor}
      itemTextColor={itemTextColor}
      cardSize={cardSize}
      inGrid={inGrid}
      stretchWithRow={stretchWithRow}
      alignVerticalClass={
        parentAlignment?.includes('bottom')
          ? 'justify-end'
          : parentAlignment?.includes('center')
            ? 'justify-center'
            : parentAlignment?.includes('top')
              ? 'justify-start'
              : undefined
      }
      alignHorizontalClass={
        parentAlignment?.includes('left')
          ? 'justify-start text-left'
          : parentAlignment?.includes('center')
            ? 'justify-center text-center'
            : parentAlignment?.includes('right')
              ? 'justify-end text-right'
              : undefined
      }
      mockMinWidthClass={mockMinWidthClass}
      disabled={disabled}
      staticDisplay={staticDisplay}
      topRender={
        (iconDisplay === 'above' || iconDisplay === 'background') &&
        (safeIconPathLarge || disabled) ? (
          <div className="flex h-full w-full flex-row items-center justify-center">
            <div
              className={`${mergeClasses(
                `flex items-center justify-center overflow-hidden ${
                  iconBoxSize
                    ? `h-[${iconBoxSize}px] w-[${iconBoxSize}px]`
                    : 'h-[170px] w-[170px]'
                }`,
                roundingClassMap[rounding || ''] || '',
              )}`}
            >
              {safeIconPathLarge && !disabled ? (
                <img
                  className="h-full w-full object-contain"
                  src={makePathFullyQualified({
                    baseURL: EnvironmentVariables.ASSETS_BASE_URL,
                    relativePath: safeIconPathLarge,
                  })}
                  alt="Icon"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Icon icon="lock" color={'muted'} size="xl" />
                </div>
              )}
            </div>
          </div>
        ) : null
      }
      width={width}
      isPreview={disabled}
      titleRender={
        iconDisplay === 'inline' && (safeIconPath || disabled) ? (
          safeIconPath && !disabled ? (
            <img
              className={`${getInlineIconClass(width)} object-contain`}
              src={makePathFullyQualified({
                baseURL: EnvironmentVariables.ASSETS_BASE_URL,
                relativePath: safeIconPath,
              })}
              alt="Icon"
            />
          ) : (
            <Icon icon="lock" color={'muted'} size="sm" />
          )
        ) : null
      }
      // app={getAppForLinkType(sectionData.link_type || 'teamboards')}
    />
  )
}
