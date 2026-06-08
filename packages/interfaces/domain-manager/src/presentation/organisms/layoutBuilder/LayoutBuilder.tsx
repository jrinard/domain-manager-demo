import React, { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid } from '@spacedock/bento'
import { mergeClasses } from '@falcon/style'
import { exportToJSON } from '@spacedock/file-download'
import { FILE_NAMES, DEFAULT_CONFIGS } from '@domain/configs'
import { useToast } from '@spacedock/falcon-ui'

import { GridLayoutEditor } from './GridLayoutEditor'
import { useLayoutEditingState } from './state/useLayoutEditingState'
import { getClonedConfigName } from './helpers'
import type { HomeSectionType, ScreenSizeLayout } from '@domain/configs'
import { SchemaSectionEditorWrapper } from '../schemaSectionEditor/SchemaSectionEditor'
import { LayoutControlSwitches } from './LayoutControlSwitches'
import {
  useHomeConfig,
  useEditableHomeConfig,
  useMasteryConfig,
  useEditableMasteryConfig,
} from '../../../data/hooks'
import {
  useHomeConfigs,
  useMasteryConfigs,
} from '../../../data/hooks/useEditableUIConfig'
import { PreviewSectionRouter } from './PreviewSectionRouter'
import { LayoutSectionCard } from './LayoutSectionCard'
import _ from 'lodash'

interface LayoutBuilderProps {
  configID?: string
  className?: string
  domainID?: number
  configType?: 'tryyb' | 'mastery'
}

// DnD legacy helpers removed in favor of controlled GridStack editor

export const LayoutBuilder = ({
  className = '',
  domainID,
  configID = '',
  configType = 'tryyb',
}: LayoutBuilderProps) => {
  const navigate = useNavigate()
  const toast = useToast()

  // Conditionally use home or mastery hooks based on configType
  const isMastery = configType === 'mastery'

  const homeConfigHook = useHomeConfig({ configID, disabled: isMastery })
  const masteryConfigHook = useMasteryConfig({ configID, disabled: !isMastery })
  // Use the appropriate hook data based on configType
  const activeHook = isMastery ? masteryConfigHook : homeConfigHook

  const remoteUIConfig = activeHook.data
  const configData = isMastery
    ? masteryConfigHook.masteryConfig
    : homeConfigHook.homeConfig
  const saveConfigChanges = activeHook.saveConfigChanges
  const publishConfig = activeHook.publishConfig
  const attachments = activeHook.attachments
  const refetchUIConfig = activeHook.refetch
  const isSavingConfig = activeHook.isPending
  const effectiveDomainID = remoteUIConfig?.domainID ?? domainID ?? 0

  const homeConfigsQuery = useHomeConfigs({
    domainID: effectiveDomainID,
    disabled: isMastery || !effectiveDomainID, // Disable when on mastery tab or no domainID
  })
  const masteryConfigsQuery = useMasteryConfigs({
    domainID: effectiveDomainID,
    disabled: !isMastery || !effectiveDomainID, // Disable when on tryyb tab or no domainID
  })

  const editableHome = useEditableHomeConfig(
    !isMastery ? (configData ?? DEFAULT_CONFIGS.HOME_CONFIG) : undefined,
  )
  const editableMastery = useEditableMasteryConfig(
    isMastery ? (configData ?? DEFAULT_CONFIGS.MASTERY_CONFIG) : undefined,
  )
  const editable = isMastery ? editableMastery : editableHome

  const configsQuery = isMastery ? masteryConfigsQuery : homeConfigsQuery
  const {
    currentLayout,
    updateLayout,
    activeLayout: activeLayoutType,
    setActiveLayout,
  } = useLayoutEditingState(editable.config, editable.mergeConfig)
  const [refreshTick, setRefreshTick] = React.useState(0)

  // Listen for external refresh events (e.g., section saved in modal) to force re-render
  React.useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent | Event
      const detail = (ev as any).detail
      if (detail && detail.sectionId) {
        // update the specific section in editable config if possible
        try {
          // editable is in scope
          editable.updateSection(detail.sectionId, {
            section_data: {
              ...(editable.config.sections.find(
                (s) => s.id === detail.sectionId,
              )?.section_data || {}),
              ...(detail.sectionData || {}),
            },
          } as any)
        } catch {
          setRefreshTick((t) => t + 1)
        }
      } else {
        setRefreshTick((t) => t + 1)
      }
    }
    window.addEventListener(
      'spacedock:section-updated',
      handler as EventListener,
    )
    return () =>
      window.removeEventListener(
        'spacedock:section-updated',
        handler as EventListener,
      )
  }, [])

  const [previewModeDark, setPreviewModeDark] = useState(true)
  // For mastery, always use edit mode since preview isn't available because we are not using the home app for mastery
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>(
    isMastery ? 'edit' : remoteUIConfig ? 'preview' : 'edit',
  )
  const [showAddNew, setShowAddNew] = React.useState(false)
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null,
  )
  const [controlBarMode, setControlBarMode] = useState<'sidebar' | 'bottom'>(
    'sidebar',
  )
  // local editing state is handled by SchemaSectionEditor; placeholder kept for future
  const [verticalAlignment, setVerticalAlignment] = useState<'top' | 'center'>(
    currentLayout?.vertical_alignment || 'top',
  )

  // Sync vertical alignment when layout changes
  React.useEffect(() => {
    setVerticalAlignment(currentLayout?.vertical_alignment || 'top')
  }, [currentLayout?.vertical_alignment])

  // Listen for select-section events triggered by inline Edit buttons
  React.useEffect(() => {
    const selectHandler = (e: Event) => {
      const ev = e as CustomEvent
      const sectionId = ev?.detail?.sectionId
      if (sectionId) {
        setSelectedSectionId(sectionId)
        setShowAddNew(false)
      }
    }
    window.addEventListener(
      'spacedock:select-section',
      selectHandler as EventListener,
    )
    return () =>
      window.removeEventListener(
        'spacedock:select-section',
        selectHandler as EventListener,
      )
  }, [setSelectedSectionId])

  // Auto-show "Add New Section" when there are no sections
  React.useEffect(() => {
    if (editable.config.sections.length === 0 && !showAddNew) {
      setShowAddNew(true)
    }
  }, [editable.config.sections.length, showAddNew])

  // local editing state is handled by SchemaSectionEditor; placeholder kept for future
  const selectedSectionIndex = useMemo(() => {
    if (!selectedSectionId) return -1
    return editable.config.sections.findIndex((s) => s.id === selectedSectionId)
  }, [editable.config.sections, selectedSectionId])

  const selectedSection = useMemo(() => {
    if (selectedSectionIndex >= 0) {
      return editable.config.sections[selectedSectionIndex]
    }
    return null
  }, [editable.config.sections, selectedSectionIndex])

  // Get the appropriate layout based on active layout setting
  const previewLayout = useMemo((): ScreenSizeLayout | undefined => {
    const config = editable.config
    if (!config) return undefined

    switch (activeLayoutType) {
      case 'desktop':
        return config.layout
      case 'tablet':
        return config.tablet_layout
      case 'mobile':
        return config.mobile_layout
      default:
        return config.layout
    }
  }, [editable.config, activeLayoutType])

  const onSelect = useCallback((sectionId: string | null) => {
    setSelectedSectionId(sectionId)
    setShowAddNew(false)
  }, [])

  const onAddSection = useCallback(
    (
      sectionType: HomeSectionType,
      sectionData: Record<string, unknown>,
      columnSpan: number,
      coordinates: { x: number; y: number; w: number; h: number },
    ) => {
      // Generate a unique ID for the new section
      // debugger
      const sectionId = `${sectionType}-${Date.now()}`

      // Create the section with the generated data
      editable.addSection(
        sectionType,
        {
          id: sectionId,
          section_data: sectionData,
          metadata: {
            display_name: '',
            bgColor: 'transparent',
          },
          layout_position: {
            areaName: sectionId,
            columnSpan: columnSpan as any,
          },
        },
        activeLayoutType,
        coordinates,
      )

      // Select the newly added section
      // setSelectedSectionId(sectionId)
      // setShowAddNew(false)
    },
    [editable, activeLayoutType],
  )

  const renderItem = useCallback(
    (name: string) => {
      const configSection = editable.config.sections.find((s) => {
        const areaName = s.layout_position.areaName
        return areaName === name || s.id === name
      })

      return (
        <LayoutSectionCard
          sectionLabel={name}
          section={configSection}
          attachments={attachments}
          isSelected={
            !!selectedSectionId && selectedSectionId === configSection?.id
          }
          domainID={domainID}
          renderMode="mock"
          key={String(refreshTick) + (configSection?.id ?? name)}
        />
      )
    },
    [
      editable.config.sections,
      domainID ?? null,
      attachments ?? null,
      selectedSectionId,
      refreshTick,
    ],
  )

  // Background Image styles for Preview - uses previewLayout to support device-specific backgrounds
  const backgroundImageStyles = useMemo(() => {
    const hasBackgroundImage = !!previewLayout?.background_image_url
    return {
      backgroundImage: hasBackgroundImage
        ? `url(${previewLayout.background_image_url})`
        : 'none',
      backgroundSize:
        previewLayout?.background_image_styles?.backgroundSize || 'cover',
      backgroundPosition:
        previewLayout?.background_image_styles?.backgroundPosition || 'center',
      backgroundRepeat:
        previewLayout?.background_image_styles?.backgroundRepeat || 'no-repeat',
      backgroundColor: hasBackgroundImage
        ? 'transparent'
        : 'var(--site-bg, #000)',
    }
  }, [previewLayout])

  // For mastery, always use edit mode. For tryyb, respect the draft status
  const view_mode = isMastery
    ? 'edit'
    : remoteUIConfig?.activeStatus !== 'ocDRAFT'
      ? 'preview'
      : viewMode

  // Controlled editor handles DnD & key interactions
  return (
    <div className={`flex gap-4 ${className} focus:outline-none`} tabIndex={0}>
      {/* <LayoutBuilderSectionOptions
        onSelect={() => {
          return void 0
        }}
      /> */}

      <div className="flex w-full flex-col">
        <LayoutControlSwitches
          domainID={domainID}
          previewModeDark={previewModeDark}
          setPreviewModeDark={setPreviewModeDark}
          setDevicePreview={(device) => setActiveLayout(device)}
          activeLayout={activeLayoutType as 'desktop' | 'tablet' | 'mobile'}
          viewMode={view_mode}
          activeStatus={remoteUIConfig?.activeStatus}
          setViewMode={setViewMode}
          configType={configType}
          verticalAlignment={verticalAlignment}
          setVerticalAlignment={(value) => {
            setVerticalAlignment(value)
            updateLayout({
              ...currentLayout,
              vertical_alignment: value,
            })
          }}
          currentLayout={currentLayout}
          updateLayout={updateLayout}
          config={editable.config}
          mergeConfig={editable.mergeConfig}
          isSavingConfig={isSavingConfig}
          onSave={() => {
            saveConfigChanges(editable.configRef.current, {})
              .then(() => {
                toast.toastSuccess({
                  description: 'Changes saved successfully',
                })
              })
              .finally(refetchUIConfig)
          }}
          onPublish={async () => {
            await saveConfigChanges(editable.configRef.current, {})
            await publishConfig()
            await configsQuery.refetch()
            refetchUIConfig()
            toast.toastSuccess({
              description: 'Config published successfully',
            })
          }}
          onClone={async () => {
            // Get the original config name (backend will append number if duplicate)
            const newConfigName = getClonedConfigName(
              configID,
              configsQuery.all_configs,
            )

            // Clone the config and pass the name (backend handles duplicate numbering)
            const cloneResult = await saveConfigChanges(
              editable.configRef.current,
              {
                configName: newConfigName,
              },
            )

            if (cloneResult?.UIconfigGUID) {
              // Refetch the configs list so version control page refreshes
              await configsQuery.refetch()

              toast.toastSuccess({
                description: 'Config cloned successfully',
              })

              // Navigate to the new cloned config
              navigate(`../${cloneResult.UIconfigGUID}`, { relative: 'path' })
            }
          }}
        />

        <div
          className="border-grayscale-400 dark:border-grayscale-600 flex-1 rounded-lg border p-2"
          data-id="layout-manipulator"
        >
          {view_mode === 'edit' ? (
            <div className="min-h-[520px] w-full">
              <GridLayoutEditor
                deviceSize={activeLayoutType}
                layout={currentLayout}
                sections={editable.config.sections}
                onLayoutChange={updateLayout}
                onSelect={onSelect}
                onAddSection={onAddSection}
                renderItem={renderItem}
              />
            </div>
          ) : (
            <div
              className={mergeClasses('mx-auto min-h-[520px] overflow-hidden', {
                'max-w-[552px]': activeLayoutType === 'tablet',
                'max-w-[448px]': activeLayoutType === 'mobile',
              })}
              style={backgroundImageStyles}
            >
              <div data-surface="dark" className="group min-h-full">
                <div
                  className="flex min-h-[520px] flex-col gap-2"
                  style={{
                    justifyContent:
                      verticalAlignment === 'center' ? 'center' : 'flex-start',
                  }}
                >
                  <article
                    className="flex w-full flex-col p-4"
                    style={{
                      height: currentLayout?.grid_height_minimum || '75%',
                    }}
                  >
                    <Grid
                      areasByName={previewLayout?.areas_by_name}
                      columns={previewLayout?.columns}
                      gutter="standard"
                    >
                      {editable.config.sections?.map((section) => (
                        <PreviewSectionRouter
                          key={section.id}
                          section={section}
                          domainID={domainID}
                          attachments={attachments}
                        />
                      ))}
                    </Grid>
                  </article>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {view_mode === 'edit' && (
        <SchemaSectionEditorWrapper
          onAttachmentsChange={(newAttachmentsList, lastModifiedOfstDate) =>
            saveConfigChanges(editable.configRef.current, {
              attachmentsOverride: newAttachmentsList,
              lastModifiedOfstDate,
            }).finally(refetchUIConfig)
          }
          configID={configID}
          domainID={domainID}
          configType={configType}
          section={selectedSection}
          onSectionChange={(updatedSection) => {
            if (!updatedSection?.id) return
            editable.updateSection(updatedSection.id, updatedSection)
          }}
          showAddNew={showAddNew}
          setShowAddNew={() => {
            setShowAddNew(true)
            setSelectedSectionId(null)
          }}
          onSave={
            remoteUIConfig?.activeStatus !== 'ocDRAFT'
              ? _.noop
              : (opts) =>
                  saveConfigChanges(editable.configRef.current, {
                    attachmentsOverride: opts?.attachmentsOverride,
                    lastModifiedOfstDate: opts?.lastModifiedOfstDate,
                  })
                    .then(() => {
                      toast.toastSuccess({
                        description: 'Section changes saved successfully',
                      })
                    })
                    .finally(refetchUIConfig)
          }
          onDownload={() => {
            exportToJSON(editable.config, FILE_NAMES.HOME_CONFIG)
          }}
          duplicateSection={(section) => {
            editable.addSection(
              section.section_type,
              section,
              activeLayoutType,
              {
                ...pullCoordinatesForAreaName(
                  section.layout_position.areaName || section.id || '',
                  currentLayout,
                ),
                x: 0,
                y: currentLayout.areas_by_name?.length || 0,
              },
            )
          }}
          removeSection={(sectionId) => {
            editable.removeSection(sectionId)
          }}
          controlBarMode={controlBarMode}
          setControlBarMode={setControlBarMode}
          removeAllSections={() => {
            editable.config.sections.forEach((section) => {
              if (section.id) {
                editable.removeSection(section.id)
              }
            })
            setSelectedSectionId(null)
          }}
        />
      )}
    </div>
  )
}

function pullCoordinatesForAreaName(
  areaName: string,
  layout: ScreenSizeLayout,
) {
  let rowIndex = -1
  let columnIndex = 0
  let itemWidth = 0
  const itemHeight = 1

  let strMatchFound = false

  // * Cheating and using `some` to top early when match is found
  layout.areas_by_name?.some((row, curRowIdx) => {
    // * Reset on Row since it was not found last row.
    columnIndex = 0

    const foundInRow = row.some((item) => {
      if (typeof item === 'string') {
        if (!strMatchFound) {
          columnIndex += 1
        }

        if (item === areaName) {
          strMatchFound = true
          itemWidth += 1
          return false
        } else {
          return strMatchFound
        }
      }

      if (item.name === areaName) {
        itemWidth += item.columnSpan
        return true
      }

      columnIndex += item.columnSpan
      return false
    })

    if (foundInRow) {
      rowIndex = curRowIdx
    }

    return foundInRow
  })

  return {
    x: columnIndex,
    y: rowIndex,
    w: itemWidth,
    h: itemHeight,
  }
}
