/**
 * Visual preview of menu config. Two modes:
 * - Default (compact): nav strip for Menu Builder; light/dark theme toggle.
 * - showShell: full TopV3-style bar (logo, nav, widget placeholders) for
 *   Version Control dialog. TopV3 itself lives in apps/tryyb — this stays a
 *   portable simulation driven by the same MenuConfig (Tailwind fallbacks;
 *   config hex colors use inline styles only).
 */
import React, { useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import _ from 'lodash'
import { mergeClasses } from '@falcon/style'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  TextBody,
  TextHeading,
} from '@spacedock/falcon-ui'
import { Icon } from '@falcon/icons'
import { getEncoding } from '@tyto/assets'
import type { MenuConfig } from '@domain/configs'
import { createFileURL } from '../../../data/utils/file-path'

export type DeviceMode = 'desktop' | 'tablet' | 'mobile'

export interface MenuBuilderPreviewProps {
  config: MenuConfig
  theme: 'light' | 'dark'
  libraryImages?: any[]
  libraryLessons?: any[]
  showShell?: boolean
  deviceMode?: DeviceMode
  logoURL?: string
  /** Menu Preview (Beta): shell tokens follow `theme` + domain menu colors when set. */
  syncShellToPreviewTheme?: boolean
}

type ToggleSection = MenuConfig['toggleSections'][number]

const SHELL_BAR_BG_FALLBACK = 'bg-neutral-900'
const SHELL_BAR_FG_FALLBACK = 'text-neutral-100'

const DROP_PANEL_BASE =
  'w-max min-w-[380px] max-w-[calc(100%-24px)] rounded-lg border shadow-xl'

type ShellStyles = {
  rootClass: string
  rootStyle: CSSProperties
  topBtnHover: string
  sectionOpenBg: string
  widgetDivider: string
  logoPlaceholder: string
  avatarWrap: string
  dropPanelClass: string
  dropPanelStyle: CSSProperties
  dropRowHover: string
  mobileTopBorder: string
  mobileRowHover: string
}

function barStyles(barBg?: string, barFg?: string): CSSProperties {
  return {
    ...(barBg ? { backgroundColor: barBg } : {}),
    ...(barFg ? { color: barFg } : {}),
  }
}

function buildShellStyles(args: {
  syncShellToPreviewTheme: boolean
  theme: 'light' | 'dark'
  barBg?: string
  barFg?: string
}): ShellStyles {
  const { syncShellToPreviewTheme, theme, barBg, barFg } = args

  if (syncShellToPreviewTheme) {
    const isDark = theme === 'dark'
    const hasBarBg = Boolean(barBg)
    const hasBarFg = Boolean(barFg)
    const rootClass = mergeClasses(
      'relative flex w-full flex-col',
      !hasBarBg && (isDark ? 'bg-neutral-950' : 'bg-white'),
      !hasBarFg && (isDark ? 'text-neutral-100' : 'text-neutral-900'),
    )
    const topBtnHover = isDark ? 'hover:bg-white/10' : 'hover:bg-black/[0.06]'
    const sectionOpenBg = isDark ? 'bg-white/10' : 'bg-black/[0.06]'
    const widgetDivider = isDark ? 'bg-white/20' : 'bg-black/15'
    const logoPlaceholder = isDark
      ? 'bg-grayscale-700 text-neutral-300'
      : 'bg-neutral-200 text-neutral-500'
    const avatarWrap = isDark ? 'bg-neutral-600' : 'bg-neutral-200'
    const dropPanelClass = mergeClasses(
      DROP_PANEL_BASE,
      isDark ? 'border-white/10' : 'border-neutral-200',
      !hasBarBg &&
        (isDark ? 'bg-neutral-950 text-neutral-100' : 'bg-white text-neutral-900'),
    )
    const dropRowHover = isDark
      ? 'hover:bg-white/[0.08]'
      : 'hover:bg-black/[0.05]'
    const mobileTopBorder = isDark
      ? 'border-t border-white/10'
      : 'border-t border-neutral-200'
    const mobileRowHover = isDark
      ? 'hover:bg-white/10'
      : 'hover:bg-black/[0.06]'

    return {
      rootClass,
      rootStyle: barStyles(barBg, barFg),
      topBtnHover,
      sectionOpenBg,
      widgetDivider,
      logoPlaceholder,
      avatarWrap,
      dropPanelClass,
      dropPanelStyle: barStyles(barBg, barFg),
      dropRowHover,
      mobileTopBorder,
      mobileRowHover,
    }
  }

  return {
    rootClass: mergeClasses(
      'relative flex w-full flex-col',
      !barBg && SHELL_BAR_BG_FALLBACK,
      !barFg && SHELL_BAR_FG_FALLBACK,
    ),
    rootStyle: barStyles(barBg, barFg),
    topBtnHover: 'hover:bg-white/10',
    sectionOpenBg: 'bg-white/10',
    widgetDivider: 'bg-white/20',
    logoPlaceholder: 'bg-grayscale-700 text-neutral-300',
    avatarWrap: 'bg-grayscale-600',
    dropPanelClass: mergeClasses(
      `${DROP_PANEL_BASE} border-white/[0.08]`,
      !barBg && SHELL_BAR_BG_FALLBACK,
      !barFg && SHELL_BAR_FG_FALLBACK,
    ),
    dropPanelStyle: barStyles(barBg, barFg),
    dropRowHover: 'hover:bg-white/[0.08]',
    mobileTopBorder: 'border-t border-white/10',
    mobileRowHover: 'hover:bg-white/10',
  }
}

function SectionCategories({
  section,
  resolveLibraryURL,
  gapClass,
  paddingClass,
  textClassName,
  rowHoverClass,
}: {
  section: ToggleSection
  resolveLibraryURL: (courseItemID?: number) => string | null
  gapClass: string
  paddingClass: string
  textClassName?: string
  rowHoverClass?: string
}) {
  return (
    <div className={mergeClasses('flex flex-row flex-wrap', gapClass, paddingClass)}>
      {section.categories.map((category, catIndex) => {
        const layout = category._layout || 'default'
        const catBgColor = category.backgroundColor
        const featuredContent = category.featuredContent

        return (
          <div
            key={catIndex}
            className={mergeClasses(
              'flex gap-3',
              layout === 'featured'
                ? 'w-full rounded-md p-3'
                : layout === 'compact'
                  ? 'min-w-[120px]'
                  : 'min-w-[140px]',
            )}
            style={
              layout === 'featured' && catBgColor
                ? { backgroundColor: catBgColor }
                : undefined
            }
          >
            {(() => {
              const resolvedURL =
                resolveLibraryURL(featuredContent?.courseItemID) ||
                featuredContent?.url
              if (!resolvedURL) return null
              return (
                <div className="flex max-h-20 shrink-0 items-center">
                  <img
                    src={resolvedURL}
                    alt=""
                    className="max-h-16 rounded object-contain"
                  />
                </div>
              )
            })()}

            <div className="flex flex-col gap-1">
              {category.title && (
                <span className="text-xs font-semibold uppercase tracking-[0.05em] text-primary">
                  {category.title}
                </span>
              )}
              <div
                className={mergeClasses(
                  'flex flex-col gap-0.5',
                  layout === 'compact' && 'max-h-[100px] flex-wrap gap-x-4',
                )}
              >
                {category.buttons?.map((button, btnIndex) => {
                  const displayTitle =
                    button.title || button.__NAME || button.type
                  const isTextOnly =
                    button.type === 'text-only' ||
                    (button as any).displayAs === 'text-only'
                  const isTitleStyle =
                    button.asTitle || (button as any).displayAs === 'title'
                  const rowPad =
                    layout === 'compact' ? 'px-2 py-1' : 'px-2.5 py-2'

                  return (
                    <div
                      key={btnIndex}
                      className={mergeClasses(
                        'flex items-center gap-1.5 rounded-md text-inherit no-underline transition-colors duration-150',
                        rowPad,
                        !isTextOnly && rowHoverClass,
                        isTextOnly
                          ? 'cursor-default opacity-50'
                          : 'cursor-pointer',
                      )}
                    >
                      {!button.hideIcon && button.ccIconName && (
                        <Icon
                          icon={button.ccIconName}
                          size="xs"
                          color="current"
                        />
                      )}
                      {isTitleStyle ? (
                        <TextHeading
                          size={6}
                          uppercase={false}
                          className={mergeClasses(
                            'whitespace-nowrap text-[15px] font-normal leading-[18px] no-underline',
                            textClassName,
                          )}
                        >
                          {displayTitle}
                        </TextHeading>
                      ) : (
                        <TextBody
                          className={mergeClasses(
                            'whitespace-nowrap text-[15px] leading-[18px] no-underline',
                            isTextOnly && 'opacity-60',
                            textClassName,
                          )}
                          size="xs"
                          weight="normal"
                        >
                          {displayTitle}
                        </TextBody>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function MenuBuilderPreviewShell({
  config,
  libraryImages,
  libraryLessons,
  deviceMode,
  logoURL,
  theme,
  syncShellToPreviewTheme = false,
}: Pick<
  MenuBuilderPreviewProps,
  | 'config'
  | 'libraryImages'
  | 'libraryLessons'
  | 'deviceMode'
  | 'logoURL'
  | 'theme'
  | 'syncShellToPreviewTheme'
>) {
  const isMobile = deviceMode === 'mobile'
  const isDesktop = deviceMode === 'desktop'
  const [openSection, setOpenSection] = useState<string | null>(null)

  const barBg = config.backgroundColor?.trim()
  const barFg = config.color?.trim()

  const shellStyles = useMemo(
    () =>
      buildShellStyles({
        syncShellToPreviewTheme,
        theme,
        barBg,
        barFg,
      }),
    [syncShellToPreviewTheme, theme, barBg, barFg],
  )

  const resolveLibraryURL = useMemo(() => {
    return (courseItemID?: number): string | null => {
      if (!courseItemID) return null
      const img = libraryImages?.find(
        (i: any) => i.courseItemID === courseItemID,
      )
      if (img?.item?.pathURL) return createFileURL(img.item.pathURL)
      const lesson = libraryLessons?.find(
        (l: any) => l.courseItemID === courseItemID,
      )
      if (lesson) {
        const pathURL =
          getEncoding(_.get(lesson, 'item.assets[0].encodings'), 'ocTHUMBNAIL')
            ?.pathURL ?? ''
        if (pathURL) return createFileURL(pathURL)
      }
      return null
    }
  }, [libraryImages, libraryLessons])

  const activeSection = useMemo(() => {
    if (!openSection) return null
    return config.toggleSections.find(
      (s, i) => (s._id || s.title || `section-${i}`) === openSection,
    )
  }, [openSection, config.toggleSections])

  return (
    <div
      className={shellStyles.rootClass}
      style={shellStyles.rootStyle}
      onMouseLeave={() => setOpenSection(null)}
    >
      <header
        className={mergeClasses(
          'flex w-full items-center px-6',
          isDesktop ? 'h-[84px]' : 'h-16',
        )}
      >
        <div className="flex w-[250px] max-w-[250px] shrink-0 items-center gap-3">
          {isMobile && (
            <Icon icon="bars" size="lg" color="current" className="opacity-60" />
          )}
          {logoURL ? (
            <img
              src={logoURL}
              alt="Domain Logo"
              className="max-h-[46px] max-w-[200px] object-contain"
            />
          ) : (
            <div
              className={mergeClasses(
                'flex h-8 w-28 items-center justify-center rounded text-xs opacity-80',
                shellStyles.logoPlaceholder,
              )}
            >
              LOGO
            </div>
          )}
        </div>

        {!isMobile ? (
          <nav className="flex flex-1 items-center justify-center">
            <ul className="flex list-none items-center gap-1">
              {config.topButtons.map((button, index) => {
                const displayTitle =
                  button.title || button.__NAME || button.type
                const isTextOnly =
                  button.type === 'text-only' ||
                  (button as any).displayAs === 'text-only'
                const isTitle =
                  button.asTitle || (button as any).displayAs === 'title'

                return (
                  <li key={index}>
                    <div
                      className={mergeClasses(
                        'flex items-center gap-1.5 rounded px-3 py-1.5 text-sm',
                        isTextOnly
                          ? 'cursor-default opacity-60'
                          : mergeClasses('cursor-pointer', shellStyles.topBtnHover),
                      )}
                    >
                      {!button.hideIcon && button.ccIconName && (
                        <Icon
                          icon={button.ccIconName}
                          size="sm"
                          color="current"
                        />
                      )}
                      {isTitle ? (
                        <TextHeading size={6} uppercase={false}>
                          {displayTitle}
                        </TextHeading>
                      ) : (
                        <TextBody size="s">{displayTitle}</TextBody>
                      )}
                    </div>
                  </li>
                )
              })}

              {config.toggleSections.map((section, index) => {
                const sectionKey =
                  section._id || section.title || `section-${index}`
                const isOpen = openSection === sectionKey

                return (
                  <li
                    key={index}
                    onMouseEnter={() => setOpenSection(sectionKey)}
                  >
                    <div
                      className={mergeClasses(
                        'inline-flex h-auto cursor-pointer items-center justify-center rounded bg-transparent px-3 py-1.5 text-sm font-semibold transition-colors hover:text-primary',
                        shellStyles.topBtnHover,
                        isOpen && mergeClasses('text-primary', shellStyles.sectionOpenBg),
                      )}
                    >
                      {!section.hideIcon && section.ccIconName && (
                        <Icon
                          icon={section.ccIconName}
                          size="sm"
                          color="current"
                          className="mr-1.5"
                        />
                      )}
                      {section.title}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={mergeClasses(
                          'relative top-px ml-1 size-3 transition duration-200',
                          isOpen && 'rotate-180',
                        )}
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </li>
                )
              })}
            </ul>
          </nav>
        ) : (
          <div className="flex-1" />
        )}

        <div className="flex min-w-[250px] shrink-0 items-center justify-end gap-3">
          <Icon
            icon="search"
            size="lg"
            color="current"
            className="cursor-pointer opacity-60 hover:opacity-100"
          />
          <div className={mergeClasses('h-6 w-px', shellStyles.widgetDivider)} />
          <Icon icon="bell" size="lg" color="current" className="opacity-60" />
          <div
            className={mergeClasses(
              'flex h-8 w-8 items-center justify-center rounded-full text-xs opacity-80',
              shellStyles.avatarWrap,
            )}
          >
            <Icon icon="person" size="sm" color="current" />
          </div>
        </div>
      </header>

      {activeSection && (
        <div
          className="absolute left-0 z-50 flex w-full justify-center px-3"
          style={{ top: isDesktop ? '84px' : '64px' }}
        >
          <div
            className={shellStyles.dropPanelClass}
            style={shellStyles.dropPanelStyle}
          >
            <SectionCategories
              section={activeSection}
              resolveLibraryURL={resolveLibraryURL}
              gapClass="gap-8"
              paddingClass="p-6 px-8"
              rowHoverClass={shellStyles.dropRowHover}
            />
          </div>
        </div>
      )}

      {isMobile && (
        <div className={mergeClasses('p-4', shellStyles.mobileTopBorder)}>
          <div className="flex flex-col gap-1">
            {config.topButtons.map((button, index) => {
              const displayTitle = button.title || button.__NAME || button.type
              return (
                <div
                  key={index}
                  className={mergeClasses(
                    'flex items-center gap-2 rounded px-3 py-2',
                    shellStyles.mobileRowHover,
                  )}
                >
                  {!button.hideIcon && button.ccIconName && (
                    <Icon icon={button.ccIconName} size="sm" color="current" />
                  )}
                  <TextBody size="s">{displayTitle}</TextBody>
                </div>
              )
            })}
            {config.toggleSections.map((section, index) => (
              <div key={index} className="flex flex-col">
                <div
                  className={mergeClasses(
                    'flex items-center gap-2 rounded px-3 py-2 font-semibold',
                    shellStyles.mobileRowHover,
                  )}
                >
                  {!section.hideIcon && section.ccIconName && (
                    <Icon
                      icon={section.ccIconName}
                      size="sm"
                      color="current"
                    />
                  )}
                  <TextBody size="s" className="font-semibold">
                    {section.title}
                  </TextBody>
                  <Icon
                    icon="chevron-down"
                    size="xs"
                    color="current"
                    className="ml-auto opacity-50"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export const MenuBuilderPreview = ({
  config,
  theme,
  libraryImages,
  libraryLessons,
  showShell = false,
  deviceMode = 'desktop',
  logoURL,
  syncShellToPreviewTheme = false,
}: MenuBuilderPreviewProps) => {
  const resolveLibraryURL = useMemo(() => {
    return (courseItemID?: number): string | null => {
      if (!courseItemID) return null
      const img = libraryImages?.find(
        (i: any) => i.courseItemID === courseItemID,
      )
      if (img?.item?.pathURL) return createFileURL(img.item.pathURL)
      const lesson = libraryLessons?.find(
        (l: any) => l.courseItemID === courseItemID,
      )
      if (lesson) {
        const pathURL =
          getEncoding(_.get(lesson, 'item.assets[0].encodings'), 'ocTHUMBNAIL')
            ?.pathURL ?? ''
        if (pathURL) return createFileURL(pathURL)
      }
      return null
    }
  }, [libraryImages, libraryLessons])

  if (showShell) {
    return (
      <MenuBuilderPreviewShell
        config={config}
        libraryImages={libraryImages}
        libraryLessons={libraryLessons}
        deviceMode={deviceMode}
        logoURL={logoURL}
        theme={theme}
        syncShellToPreviewTheme={syncShellToPreviewTheme}
      />
    )
  }

  const isDark = theme === 'dark'
  const textColor = isDark ? 'text-white' : 'text-black'
  const bgClass = isDark ? 'bg-neutral-900' : 'bg-white'
  const triggerBg = isDark
    ? 'hover:bg-white/10 data-[state=open]:bg-white/10'
    : 'hover:bg-black/5 data-[state=open]:bg-black/5'
  const contentBg = isDark ? 'bg-neutral-800' : 'bg-gray-50'
  const contentBorder = isDark ? 'border-white/10' : 'border-black/10'
  const triggerAccent =
    'hover:text-primary data-[state=open]:text-primary'

  return (
    <div
      className={`flex min-h-[70px] w-full flex-col rounded border ${contentBorder} px-4 py-3 ${bgClass}`}
    >
      <NavigationMenu
        className="domain-manager-preview-menu max-w-none"
        viewport={false}
      >
        <NavigationMenuList className="flex flex-1 list-none items-center justify-center gap-1">
          {config.topButtons.map((button, index) => {
            const displayTitle = button.title || button.__NAME || button.type
            const isTextOnly =
              button.type === 'text-only' ||
              (button as any).displayAs === 'text-only'
            const isTitle =
              button.asTitle || (button as any).displayAs === 'title'

            return (
              <NavigationMenuItem key={index}>
                <div
                  className={`flex items-center gap-1.5 rounded px-3 py-1.5 ${textColor} ${
                    isTextOnly ? 'cursor-default opacity-60' : 'cursor-pointer'
                  }`}
                >
                  {!button.hideIcon && button.ccIconName && (
                    <Icon icon={button.ccIconName} size="sm" color="current" />
                  )}
                  {isTitle ? (
                    <TextHeading size={6} uppercase={false}>
                      {displayTitle}
                    </TextHeading>
                  ) : (
                    <TextBody size="m" className={textColor}>
                      {displayTitle}
                    </TextBody>
                  )}
                </div>
              </NavigationMenuItem>
            )
          })}

          {config.toggleSections.map((section, index) => {
            const sectionValue =
              section._id || section.title || `section-${index}`

            return (
              <NavigationMenuItem key={index} value={sectionValue}>
                <NavigationMenuTrigger
                  className={`group inline-flex h-auto items-center justify-center rounded px-3 py-1.5 text-sm font-semibold ${textColor} ${triggerBg} bg-transparent ${triggerAccent}`}
                >
                  {!section.hideIcon && section.ccIconName && (
                    <Icon
                      icon={section.ccIconName}
                      size="sm"
                      color="current"
                      className="mr-1.5"
                    />
                  )}
                  {section.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  className={`absolute left-0 top-full z-50 mt-1 w-max min-w-[320px] max-w-[600px] rounded-lg border shadow-lg ${contentBg} ${contentBorder} ${textColor}`}
                >
                  <SectionCategories
                    section={section}
                    resolveLibraryURL={resolveLibraryURL}
                    gapClass="gap-6"
                    paddingClass="p-5"
                    textClassName={textColor}
                    rowHoverClass={
                      isDark
                        ? 'hover:bg-white/[0.08]'
                        : 'hover:bg-black/[0.05]'
                    }
                  />
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
