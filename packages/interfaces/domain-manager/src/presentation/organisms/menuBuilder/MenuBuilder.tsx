import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { DomainUI } from '@spacedock/manifest'
import {
  ComboButton,
  ComboButtonMain,
  ComboButtonMenu,
  ComboButtonMenuItem,
  ProgressCircular,
  Switch,
  TextBody,
  useToast,
} from '@spacedock/falcon-ui'
import { Button } from '@falcon/buttons'
import { MenuConfig, ToggleSection } from '@domain/configs'
import { MenuBuilderPreview } from './MenuBuilderPreview'
import { MenuBuilderEditor } from './MenuBuilderEditor'
import { DomainManagerConfigDialogMenu } from '../domainManagerConfigDialogMenu/DomainManagerConfigDialogMenu'
import { DomainManagerConfigDialogSubSection } from '../domainManagerConfigDialogMenu/DomainManagerConfigDialogSubSection'
import {
  menuDataFallbackCV,
  menuDataFallbackCTTI,
  EMPTY_MENU_CONFIG,
} from './MenuDataFallback'
import { useGetDomainTopMenuConfig } from '../../../data/utils/getDomainTopMenuConfig'
import { useTopMenuConfigs } from '../../../data/hooks/useEditableUIConfig'
import { useKeyedDomainImages } from '../../../data/hooks/useKeyedDomainImages'
import { createFileURL } from '../../../data/utils/file-path'
import { getClonedConfigName } from '../layoutBuilder/helpers'

/** Fallback when domain Color Scheme is not loaded yet (matches `#App` resolved theme). */
function previewThemeFromSiteShell(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'light'
  const app = document.getElementById('App')
  return app?.dataset.sitetheme === 'dark' ? 'dark' : 'light'
}

/**
 * Tryyb General → Color Scheme: `domainProperties.colorSchemes` (comma list;
 * first value is the domain default, same as `colorSchemes.split(',')` in tryyb `applyDomainProperties`).
 */
function previewThemeFromDomainColorSchemes(
  colorSchemes: string,
): 'light' | 'dark' {
  const ordered = colorSchemes
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const first = ordered[0]
  if (first === 'dark') return 'dark'
  if (first === 'light') return 'light'
  return previewThemeFromSiteShell()
}

interface MenuBuilderProps {
  domainID?: number
  className?: string
  configID?: string
  initialConfig: MenuConfig
  isLoading: boolean
  isPublished: boolean
  menuOrientation?: string
  saveConfig: (
    topMenu: MenuConfig,
    opts: {
      lastModifiedOfstDate?: string
      attachmentsOverride?: DomainUI.UIConfigurationRequestAttachment[]
    },
  ) => Promise<unknown> // TODO: Fix return type here
  cloneConfig: (
    topMenu: MenuConfig,
    opts: {
      lastModifiedOfstDate?: string
      attachmentsOverride?: DomainUI.UIConfigurationRequestAttachment[]
      configName?: string
      configDescription?: string
    },
  ) => Promise<unknown>
  publishConfig: (configID: string) => Promise<unknown> // TODO: Fix return type here
  reloadConfig: () => Promise<unknown> // TODO: Fix return type here
  reloadConfigsList: () => Promise<unknown> // TODO: Fix return type here
  saveMetadata?: (
    fields: {
      configName?: string
      configDescription?: string
    },
    targetUIconfigGUID?: string,
  ) => Promise<unknown>
  currentConfigName?: string
  libraryImages?: any[]
  libraryLessons?: any[]
  colorSchemes?: string
}

export const MenuBuilder = ({
  domainID,
  className = '',
  configID = 'menu-config',
  initialConfig,
  isLoading: configDataIsLoading,
  isPublished,
  menuOrientation = 'top',
  reloadConfig,
  reloadConfigsList,
  saveConfig,
  publishConfig,
  cloneConfig,
  saveMetadata,
  currentConfigName,
  libraryImages,
  libraryLessons,
  colorSchemes,
}: MenuBuilderProps) => {
  const navigate = useNavigate()
  const toast = useToast()
  const getDomainTopMenuConfig = useGetDomainTopMenuConfig()
  const topMenuConfigsQuery = useTopMenuConfigs({
    domainID: domainID || 0,
  })
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>(() =>
    colorSchemes != null && colorSchemes !== ''
      ? previewThemeFromDomainColorSchemes(colorSchemes)
      : previewThemeFromSiteShell(),
  )
  const { keyedImages } = useKeyedDomainImages({ domainID: domainID ?? 0 })

  useEffect(() => {
    if (colorSchemes != null && colorSchemes !== '') {
      setPreviewTheme(previewThemeFromDomainColorSchemes(colorSchemes))
    } else {
      setPreviewTheme(previewThemeFromSiteShell())
    }
  }, [domainID, colorSchemes])
  const menuPreviewLogoURL = useMemo(() => {
    const isDark = previewTheme === 'dark'
    const lightLogoPath = keyedImages?.logo_link?.pathURL
    const darkLogoPath = keyedImages?.logo_link_DARK?.pathURL
    const selectedPath = isDark
      ? darkLogoPath || lightLogoPath
      : lightLogoPath || darkLogoPath
    if (!selectedPath) return undefined
    return createFileURL(selectedPath)
  }, [keyedImages, previewTheme])
  const [menuItemDialog, setMenuItemDialog] = useState<boolean>(false)
  const [subSectionDialog, setSubSectionDialog] = useState<boolean>(false)
  const [editingItem, setEditingItem] = useState<{
    type: 'topButton' | 'toggleSection'
    index: number
    data: any
  } | null>(null)
  const [editingSubSection, setEditingSubSection] = useState<{
    sectionIndex: number
    subSectionIndex: number | null
    data: any
  } | null>(null)
  const [addingButtonTo, setAddingButtonTo] = useState<{
    sectionIndex: number
    subSectionIndex: number
    buttonIndex?: number // For editing existing buttons in sub sections
  } | null>(null)

  // Initialize menuConfig state from initialConfig prop
  const [menuConfig, setMenuConfig] = useState<MenuConfig>(initialConfig)
  const [localConfig, setLocalConfig] = useState<MenuConfig>(initialConfig)
  const [hasChanges, setHasChanges] = useState<boolean>(false)
  const [sampleProfile, setSampleProfile] = useState<
    'CV' | 'CTTI' | 'EMPTY' | 'UNSELECTED'
  >('UNSELECTED')
  // Store original config to restore when unselected
  const [originalConfig, setOriginalConfig] =
    useState<MenuConfig>(initialConfig)
  const [isSyncing, setIsSyncing] = useState<boolean>(false)

  // Check if Manage section exists in the config
  const hasManageSection = menuConfig.toggleSections.some(
    (section) => section.title === 'Manage',
  )

  const [includeManageTab, setIncludeManageTab] =
    useState<boolean>(hasManageSection)

  // Update originalConfig whenever initialConfig changes (so "Current Config" is always up to date)
  useEffect(() => {
    if (initialConfig) {
      setOriginalConfig(initialConfig)
    }
  }, [initialConfig])

  const lastSyncedConfigJSON = useRef<string>(JSON.stringify(initialConfig))

  useEffect(() => {
    if (!initialConfig) return

    const incomingJSON = JSON.stringify(initialConfig)
    if (incomingJSON === lastSyncedConfigJSON.current) return

    lastSyncedConfigJSON.current = incomingJSON

    if (!hasChanges) {
      setMenuConfig(initialConfig)
      setLocalConfig(initialConfig)
      const manageExists = initialConfig.toggleSections.some(
        (s) => s.title === 'Manage',
      )
      setIncludeManageTab(manageExists)
    }
  }, [initialConfig, hasChanges])

  const handlePreviewThemeChange = (checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light'
    setPreviewTheme(newTheme)
  }

  const handleIncludeManageTabChange = (checked: boolean) => {
    setIncludeManageTab(checked)
    setHasChanges(true)

    if (checked) {
      // Add Manage section back if it doesn't exist
      const manageSection: ToggleSection = {
        _id: '',
        _type: 'manage',
        title: 'Manage',
        ccIconName: 'list-ul',
        hideIcon: true,
        description: '',
        categories: [],
        ifMenuItemsArePresent: [55],
      }

      setMenuConfig((prev) => ({
        ...prev,
        toggleSections: [...prev.toggleSections, manageSection],
      }))
    } else {
      // Remove Manage section
      setMenuConfig((prev) => ({
        ...prev,
        toggleSections: prev.toggleSections.filter(
          (section) => section.title !== 'Manage',
        ),
      }))
    }
  }

  const stageLocalMenuChanges = async () => {
    try {
      await saveConfig(menuConfig, {})
      setLocalConfig(menuConfig)
      lastSyncedConfigJSON.current = JSON.stringify(menuConfig)

      toast.toastSuccess({
        description: 'Menu config saved successfully',
      })
      await reloadConfig()
      setHasChanges(false)
    } catch (err) {
      toast.toastError({
        description: `Failed to save Config Update.`,
      })
      throw err
    }
  }

  const handlePublishMenuConfig = async () => {
    try {
      await saveConfig(menuConfig, {})
      setLocalConfig(menuConfig)
      lastSyncedConfigJSON.current = JSON.stringify(menuConfig)

      // Then publish it (PUT call to set activeStatus to ocENABLED)
      await publishConfig(configID || '')

      // Refetch both the single config and the list of all configs
      // This ensures the version control page shows fresh data when navigating back
      await Promise.all([reloadConfig(), reloadConfigsList()])

      setHasChanges(false)
      toast.toastSuccess({
        description: 'Menu config published successfully',
      })
    } catch (err) {
      toast.toastError({
        description: `Failed to publish Config.`,
      })
    }
  }

  const isLeftSide = menuOrientation === 'left'

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {isLeftSide ? (
        <div className="flex min-h-[50px] items-center justify-center">
          <TextBody className="text-grayscale-400 text-center">
            Legacy Menu is not supported in this editor.
          </TextBody>
        </div>
      ) : (
        <>
          {/* Sample config selector */}
          <div className="flex items-center gap-3">
            <TextBody size="s" className="text-grayscale-400">
              Config Templates
            </TextBody>
            <select
              className="border-grayscale-700 bg-grayscale-900 rounded border px-2 py-1 text-sm text-white"
              value={sampleProfile}
              onChange={(e) => {
                const val = e.target.value as
                  | 'CV'
                  | 'CTTI'
                  | 'EMPTY'
                  | 'UNSELECTED'
                setSampleProfile(val)
                const cfg =
                  val === 'CV'
                    ? menuDataFallbackCV
                    : val === 'CTTI'
                      ? menuDataFallbackCTTI
                      : val === 'EMPTY'
                        ? EMPTY_MENU_CONFIG
                        : originalConfig
                setMenuConfig(cfg)
                // Mark as changed so user can save the template config
                // Only set hasChanges to false if reverting to original config
                setHasChanges(val !== 'UNSELECTED')
                // Keep Manage toggle in sync
                const manageExists = cfg.toggleSections.some(
                  (s) => s.title === 'Manage',
                )
                setIncludeManageTab(manageExists)
              }}
            >
              <option value="UNSELECTED">Current Config</option>
              <option value="CV">Basic CV</option>
              <option value="CTTI">Basic CTTI</option>
              <option value="EMPTY">Custom (Empty)</option>
            </select>
            {domainID && (
              <Button
                size="tiny"
                variant="secondary"
                disabled={isSyncing}
                onClick={async () => {
                  try {
                    setIsSyncing(true)
                    const config = await getDomainTopMenuConfig(domainID)

                    const normalizedConfig: MenuConfig = {
                      version: config.version || '3',
                      type: config.type || 'desktop',
                      // Only include core supported fields
                      topButtons: config.topButtons || [],
                      toggleSections: config.toggleSections || [],
                      userMenuItems: config.userMenuItems || [],
                    }
                    //* Excluded deprecated/legacy fields:
                    // iconOverrides, primaryThemeColor, backgroundColor,
                    // color, topBarStyleOverrides, activeSectionStyles, betaLinkBehavior

                    setMenuConfig(normalizedConfig)
                    setHasChanges(true)
                    setSampleProfile('UNSELECTED')
                    const manageExists = normalizedConfig.toggleSections.some(
                      (s) => s.title === 'Manage',
                    )
                    setIncludeManageTab(manageExists)
                  } catch (error: any) {
                    console.log('=== error', error)
                    // Check if it's a 404 error (file not found)
                    const is404 =
                      error?.status === 404 ||
                      error?.response?.status === 404 ||
                      (error?.message &&
                        error.message.includes('404') &&
                        error.message.includes('Not Found'))

                    if (is404) {
                      toast.toastError({
                        description:
                          'Menu config file not found. The domain does not have a legacy top-menu-config.json to get.',
                      })
                    } else {
                      toast.toastError({
                        description:
                          'Failed to load menu config from domain. Please try again.',
                      })
                    }
                  } finally {
                    setIsSyncing(false)
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <ProgressCircular
                    size="md"
                    color="primary"
                    isVisible={isSyncing}
                    minimumTime={1000}
                  />
                  Sync From Legacy Menu
                </div>
              </Button>
            )}
          </div>

          {/* Menu Preview */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <TextBody>
                Menu Preview{' '}
                <span className="text-grayscale-400 opacity-50">(Beta)</span>
              </TextBody>
              <div className="flex items-center gap-2">
                <TextBody size="s" className="text-grayscale-400">
                  View in {previewTheme}
                </TextBody>
                <Switch
                  checked={previewTheme === 'dark'}
                  onCheckedChange={handlePreviewThemeChange}
                />
              </div>
            </div>
            <MenuBuilderPreview
              config={menuConfig}
              theme={previewTheme}
              libraryImages={libraryImages}
              libraryLessons={libraryLessons}
              showShell
              syncShellToPreviewTheme
              deviceMode="desktop"
              logoURL={menuPreviewLogoURL}
            />
          </div>

          {/* Menu Editor */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <TextBody>Menu Editor</TextBody>
                <Button
                  variant="primary"
                  size="text"
                  className="aspect-square w-auto"
                  disabled={configDataIsLoading || isPublished}
                  onClick={() => {
                    setEditingItem(null) // Clear editing state for new item
                    setMenuItemDialog(true)
                  }}
                >
                  +
                </Button>

                <div className="flex flex-wrap items-center gap-2">
                  {!isPublished && (
                    <ComboButton variant="primary" size="text">
                      <ComboButtonMain
                        variant={
                          !hasChanges || configDataIsLoading
                            ? 'disabled'
                            : 'primary'
                        }
                        disabled={
                          (!isPublished && !hasChanges) || configDataIsLoading
                        }
                        onClick={stageLocalMenuChanges}
                      >
                        Save Changes
                      </ComboButtonMain>
                      <ComboButtonMenu icon="chevron-down">
                        <ComboButtonMenuItem
                          icon="content-save"
                          disabled={!hasChanges || configDataIsLoading}
                          onClick={stageLocalMenuChanges}
                        >
                          Save Changes
                        </ComboButtonMenuItem>
                        <ComboButtonMenuItem
                          icon="publish"
                          disabled={configDataIsLoading}
                          onClick={handlePublishMenuConfig}
                        >
                          Publish
                        </ComboButtonMenuItem>
                      </ComboButtonMenu>
                    </ComboButton>
                  )}

                  {isPublished && (
                    <Button
                      variant="fill"
                      size="small"
                      className="min-w-28"
                      disabled={configDataIsLoading}
                      onClick={async () => {
                        try {
                          // Determine a sensible clone name based on existing configs
                          const originalName = getClonedConfigName(
                            configID || '',
                            topMenuConfigsQuery.all_configs,
                          )
                          const res = await cloneConfig(menuConfig, {
                            configName: originalName,
                            configDescription: `Cloned from ${originalName}`,
                          })
                          if (
                            !res ||
                            typeof res !== 'object' ||
                            !('UIconfigGUID' in res)
                          ) {
                            return
                          }

                          // Refetch the configs list so version control page refreshes
                          await reloadConfigsList()

                          toast.toastSuccess({
                            description: 'Config cloned successfully',
                          })

                          // Navigate to the new cloned config
                          navigate(`../${res.UIconfigGUID}`, {
                            relative: 'path',
                          })
                        } catch (err) {
                          toast.toastError({
                            description: 'Failed to clone config',
                          })
                        }
                      }}
                    >
                      Clone as Draft
                    </Button>
                  )}
                </div>

                <DomainManagerConfigDialogMenu
                  id={0}
                  domainID={domainID}
                  open={menuItemDialog}
                  onOpenChange={(val) => {
                    setMenuItemDialog(val)
                    if (!val) {
                      // Clear editing and adding state when dialog closes
                      setEditingItem(null)
                      setAddingButtonTo(null)
                    }
                  }}
                  initialData={editingItem?.data}
                  editingType={editingItem?.type}
                  buttonOnly={!!addingButtonTo}
                  onSuccess={(newButton) => {
                    if (addingButtonTo) {
                      if (
                        addingButtonTo.buttonIndex !== undefined &&
                        addingButtonTo.buttonIndex >= 0
                      ) {
                        // Edit existing button in sub section
                        setMenuConfig((prev) => ({
                          ...prev,
                          toggleSections: prev.toggleSections.map(
                            (section, sIdx) =>
                              sIdx === addingButtonTo.sectionIndex
                                ? {
                                    ...section,
                                    categories: section.categories.map(
                                      (sub, subIdx) =>
                                        subIdx ===
                                        addingButtonTo.subSectionIndex
                                          ? {
                                              ...sub,
                                              buttons: sub.buttons.map(
                                                (btn, btnIdx) =>
                                                  btnIdx ===
                                                  addingButtonTo.buttonIndex
                                                    ? newButton
                                                    : btn,
                                              ),
                                            }
                                          : sub,
                                    ),
                                  }
                                : section,
                          ),
                        }))
                        toast.toastSuccess({
                          description: 'Button updated successfully',
                        })
                      } else {
                        // Add button to specific sub section
                        setMenuConfig((prev) => ({
                          ...prev,
                          toggleSections: prev.toggleSections.map(
                            (section, sIdx) =>
                              sIdx === addingButtonTo.sectionIndex
                                ? {
                                    ...section,
                                    categories: section.categories.map(
                                      (sub, subIdx) =>
                                        subIdx ===
                                        addingButtonTo.subSectionIndex
                                          ? {
                                              ...sub,
                                              buttons: [
                                                ...sub.buttons,
                                                newButton,
                                              ],
                                            }
                                          : sub,
                                    ),
                                  }
                                : section,
                          ),
                        }))
                        toast.toastSuccess({
                          description:
                            'Button added to sub section successfully',
                        })
                      }
                      setHasChanges(true)
                      setAddingButtonTo(null)
                      setEditingItem(null) // Clear editing state
                    } else if (editingItem) {
                      // Edit existing item
                      if (editingItem.type === 'topButton') {
                        setMenuConfig((prev) => ({
                          ...prev,
                          topButtons: prev.topButtons.map((btn, idx) =>
                            idx === editingItem.index ? newButton : btn,
                          ),
                        }))
                      } else {
                        // Toggle section
                        setMenuConfig((prev) => ({
                          ...prev,
                          toggleSections: prev.toggleSections.map(
                            (section, idx) =>
                              idx === editingItem.index
                                ? {
                                    _id: section._id,
                                    title: newButton.title,
                                    description: newButton.description,
                                    ccIconName: newButton.ccIconName,
                                    hideIcon: newButton.hideIcon,
                                    categories: section.categories,
                                    ...(newButton.iconPath && {
                                      iconPath: newButton.iconPath,
                                    }),
                                    ...(newButton.iconPathLarge && {
                                      iconPathLarge: newButton.iconPathLarge,
                                    }),
                                    ...(newButton.iconRightPath && {
                                      iconRightPath: newButton.iconRightPath,
                                    }),
                                    ...(section.ifMenuItemsArePresent && {
                                      ifMenuItemsArePresent:
                                        section.ifMenuItemsArePresent,
                                    }),
                                    ...(section._type && {
                                      _type: section._type,
                                    }),
                                  }
                                : section,
                          ),
                        }))
                      }
                      toast.toastSuccess({
                        description: 'Menu item updated successfully',
                      })
                    } else {
                      // Add new item - route based on location property
                      if (newButton.location === 'section') {
                        // Add as toggle section
                        setMenuConfig((prev) => ({
                          ...prev,
                          toggleSections: [
                            ...prev.toggleSections,
                            {
                              _id: newButton._id || '',
                              title: newButton.title,
                              description: newButton.description,
                              ccIconName: newButton.ccIconName,
                              hideIcon: newButton.hideIcon,
                              categories: newButton.categories || [],
                              ...(newButton.iconPath && {
                                iconPath: newButton.iconPath,
                              }),
                              ...(newButton.iconPathLarge && {
                                iconPathLarge: newButton.iconPathLarge,
                              }),
                              ...(newButton.iconRightPath && {
                                iconRightPath: newButton.iconRightPath,
                              }),
                            },
                          ],
                        }))
                        toast.toastSuccess({
                          description: 'Toggle section added successfully',
                        })
                      } else {
                        // Add as top button
                        setMenuConfig((prev) => ({
                          ...prev,
                          topButtons: [...prev.topButtons, newButton],
                        }))
                        toast.toastSuccess({
                          description: 'Button added successfully',
                        })
                      }
                    }
                    setHasChanges(true)
                    setEditingItem(null)
                    setAddingButtonTo(null)
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <TextBody size="s" className="text-grayscale-400">
                  Include Manage Tab
                </TextBody>
                <Switch
                  checked={includeManageTab}
                  disabled={configDataIsLoading || isPublished}
                  onCheckedChange={handleIncludeManageTabChange}
                />
              </div>
            </div>
            <MenuBuilderEditor
              config={menuConfig}
              disabled={configDataIsLoading || isPublished}
              onConfigChange={(newConfig) => {
                setMenuConfig(newConfig)
                setHasChanges(true)
              }}
              onEditTopButton={(index) => {
                setEditingItem({
                  type: 'topButton',
                  index,
                  data: menuConfig.topButtons[index],
                })
                setMenuItemDialog(true)
              }}
              onEditToggleSection={(index) => {
                setEditingItem({
                  type: 'toggleSection',
                  index,
                  data: menuConfig.toggleSections[index],
                })
                setMenuItemDialog(true)
              }}
              onDeleteTopButton={(index) => {
                setMenuConfig((prev) => ({
                  ...prev,
                  topButtons: prev.topButtons.filter((_, idx) => idx !== index),
                }))
                setHasChanges(true)
                toast.toastSuccess({
                  description: 'Button deleted successfully',
                })
              }}
              onDeleteToggleSection={(index) => {
                setMenuConfig((prev) => ({
                  ...prev,
                  toggleSections: prev.toggleSections.filter(
                    (_, idx) => idx !== index,
                  ),
                }))
                setHasChanges(true)
                toast.toastSuccess({
                  description: 'Toggle section deleted successfully',
                })
              }}
              onAddSubSection={(sectionIndex) => {
                setEditingSubSection({
                  sectionIndex,
                  subSectionIndex: null,
                  data: null,
                })
                setSubSectionDialog(true)
              }}
              onEditSubSection={(sectionIndex, subSectionIndex) => {
                setEditingSubSection({
                  sectionIndex,
                  subSectionIndex,
                  data: menuConfig.toggleSections[sectionIndex].categories[
                    subSectionIndex
                  ],
                })
                setSubSectionDialog(true)
              }}
              onDeleteSubSection={(sectionIndex, subSectionIndex) => {
                setMenuConfig((prev) => ({
                  ...prev,
                  toggleSections: prev.toggleSections.map((section, idx) =>
                    idx === sectionIndex
                      ? {
                          ...section,
                          categories: section.categories.filter(
                            (_, subIdx) => subIdx !== subSectionIndex,
                          ),
                        }
                      : section,
                  ),
                }))
                setHasChanges(true)
                toast.toastSuccess({
                  description: 'Sub section deleted successfully',
                })
              }}
              onAddButtonToSubSection={(sectionIndex, subSectionIndex) => {
                setAddingButtonTo({ sectionIndex, subSectionIndex })
                setEditingItem(null) // Clear any editing state
                setMenuItemDialog(true)
              }}
              onEditButtonInSubSection={(
                sectionIndex,
                subSectionIndex,
                buttonIndex,
              ) => {
                const buttonData =
                  menuConfig.toggleSections[sectionIndex].categories[
                    subSectionIndex
                  ].buttons[buttonIndex]
                // For buttons in sub sections, only use addingButtonTo, not editingItem
                setAddingButtonTo({
                  sectionIndex,
                  subSectionIndex,
                  buttonIndex,
                })
                setEditingItem({
                  type: 'topButton',
                  index: -1,
                  data: buttonData,
                })
                setMenuItemDialog(true)
              }}
              onDeleteButtonInSubSection={(
                sectionIndex,
                subSectionIndex,
                buttonIndex,
              ) => {
                setMenuConfig((prev) => ({
                  ...prev,
                  toggleSections: prev.toggleSections.map((section, sIdx) =>
                    sIdx === sectionIndex
                      ? {
                          ...section,
                          categories: section.categories.map((sub, subIdx) =>
                            subIdx === subSectionIndex
                              ? {
                                  ...sub,
                                  buttons: sub.buttons.filter(
                                    (_, btnIdx) => btnIdx !== buttonIndex,
                                  ),
                                }
                              : sub,
                          ),
                        }
                      : section,
                  ),
                }))
                setHasChanges(true)
                toast.toastSuccess({
                  description: 'Button deleted successfully',
                })
              }}
            />

            {/* Sub Section Dialog */}
            <DomainManagerConfigDialogSubSection
              id={0}
              domainID={domainID}
              configID={configID}
              open={subSectionDialog}
              onOpenChange={(val) => {
                setSubSectionDialog(val)
                if (!val) {
                  setEditingSubSection(null)
                }
              }}
              initialData={editingSubSection?.data}
              onSuccess={(newSubSection) => {
                if (
                  editingSubSection &&
                  editingSubSection.subSectionIndex !== null
                ) {
                  // Edit existing sub section
                  setMenuConfig((prev) => ({
                    ...prev,
                    toggleSections: prev.toggleSections.map((section, idx) =>
                      idx === editingSubSection.sectionIndex
                        ? {
                            ...section,
                            categories: section.categories.map((sub, subIdx) =>
                              subIdx === editingSubSection.subSectionIndex
                                ? newSubSection
                                : sub,
                            ),
                          }
                        : section,
                    ),
                  }))
                  toast.toastSuccess({
                    description: 'Sub section updated successfully',
                  })
                } else if (editingSubSection) {
                  // Add new sub section
                  setMenuConfig((prev) => ({
                    ...prev,
                    toggleSections: prev.toggleSections.map((section, idx) =>
                      idx === editingSubSection.sectionIndex
                        ? {
                            ...section,
                            categories: [...section.categories, newSubSection],
                          }
                        : section,
                    ),
                  }))
                  toast.toastSuccess({
                    description: 'Sub section added successfully',
                  })
                }
                setHasChanges(true)
                setEditingSubSection(null)
              }}
            />
          </div>

          {/* Save and Download Buttons */}
          {/* <div className="flex justify-end gap-2">
            <Button
              variant="primary"
              disabled={!hasChanges || configDataIsLoading}
              onClick={handleSaveConfig}
            >
              Save Changes
            </Button>
            <Button variant="shadow" onClick={handleDownloadConfig}>
              Download Menu Config
            </Button>
          </div> */}
        </>
      )}
    </div>
  )
}
