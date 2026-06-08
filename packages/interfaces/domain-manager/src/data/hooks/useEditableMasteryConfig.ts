import { useState, useEffect, useCallback, useRef } from 'react'
import { cloneDeep } from 'lodash'
import type {
  HomeConfig,
  HomeSection,
  ExpectedColumnCounts,
  HomeSectionTyped,
  ScreenSizeLayout,
  AreaNamesItem,
} from '@domain/configs'
import { DevicePreview } from '../../presentation/organisms/layoutBuilder/state/useLayoutEditingState'
import { DEFAULT_CONFIGS } from '@domain/configs'

interface AreaPlacementUpdate {
  areaName: string
  colStart?: number
  rowStart?: number
}

/**
 * Hook to manage editable mastery configuration state
 * Provides methods to modify config, sections, and layout
 * Uses the same structure as HomeConfig but for mastery configs
 * @param initialConfig - Optional initial HomeConfig to edit
 * @returns Object with current config and mutation methods
 */
export function useEditableMasteryConfig(initialConfig?: HomeConfig) {
  const defaultConfig = DEFAULT_CONFIGS.MASTERY_CONFIG || {
    config_version: '1' as const,
    id: '1',
    layout: {
      columns: 12,
      areas_by_name: [],
    },
    tablet_layout: {
      columns: 9,
      areas_by_name: [],
    },
    mobile_layout: {
      columns: 6,
      areas_by_name: [],
    },
    sections: [],
  }

  const configRef = useRef<HomeConfig>(
    initialConfig || cloneDeep(defaultConfig),
  )
  const [config, setConfig] = useState<HomeConfig>(() => configRef.current)

  // Update state when initialConfig changes
  useEffect(() => {
    if (initialConfig) {
      configRef.current = initialConfig
      setConfig(initialConfig)
    }
  }, [initialConfig])

  /**
   * Update the config while utilizing a redundant `ref` value so other parts of the code are not stuck with a stale value between re-renders.
   */
  const updateCallback = useCallback(
    (newConfig: HomeConfig | ((prev: HomeConfig) => HomeConfig)) => {
      setConfig((prev) => {
        const nextConfig =
          typeof newConfig === 'function' ? newConfig(prev) : newConfig

        // * Gross Side-Effect to update the ref value
        configRef.current = nextConfig
        return nextConfig
      })
    },
    [],
  )

  // Shallow merge new config with existing
  const mergeConfig = useCallback(
    (newConfig: Partial<HomeConfig>) => {
      updateCallback((prev) => ({ ...prev, ...newConfig }))
    },
    [updateCallback],
  )

  // Replace config entirely
  const overrideConfig = useCallback(
    (newConfig: HomeConfig) => {
      updateCallback(newConfig)
    },
    [updateCallback],
  )

  // Update area placement in layout
  const updateAreaPlacement = useCallback(
    ({ areaName, colStart, rowStart }: AreaPlacementUpdate) => {
      updateCallback((prev) => {
        return {
          ...prev,
          layout: {
            ...prev.layout,
            areas_by_name: prev.layout.areas_by_name || [],
          },
        }
      })
    },
    [updateCallback],
  )

  // Remove a section by ID
  const removeSection = useCallback(
    (sectionID: string) => {
      updateCallback((prev) => {
        const curSection = prev.sections.find((s) => s.id === sectionID)

        if (!curSection) {
          return prev
        }

        const areaName = curSection.layout_position.areaName

        if (!areaName) {
          return prev
        }

        const mutatedConfig = makeAreaNameEmpty(prev, areaName)

        return {
          ...prev,
          ...mutatedConfig,
          sections: prev.sections.filter((s) => s.id !== sectionID),
        }
      })
    },
    [updateCallback],
  )

  // Add a new section
  const addSection = useCallback(
    (
      section_type: string,
      _configSection: Partial<HomeSection>,
      activeLayout: DevicePreview,
      coordinates?: { x: number; y: number; w: number; h: number },
    ) => {
      updateCallback((prev) => {
        const configSection = cloneDeep(_configSection)
        const sectionID =
          configSection.id || `${section_type}-${pullLastCharactersFromNow()}`

        if (!configSection.id) {
          configSection.id = sectionID
        }

        if (!configSection.layout_position?.areaName) {
          if (!configSection.layout_position) {
            configSection.layout_position = { areaName: sectionID }
          } else {
            configSection.layout_position.areaName = sectionID
          }
        }

        const { x, y, w, h } = coordinates || {
          x: 0,
          y: prev.layout.areas_by_name?.length || 0,
          w: 6,
          h: 1,
        }

        const mutatedConfig = appendSectionToLayouts(
          prev,
          configSection as HomeSection,
          activeLayout,
          { x, y, w, h },
        )

        return {
          ...prev,
          ...mutatedConfig,
          sections: [
            ...prev.sections,
            {
              id: sectionID,
              section_type: section_type as any,
              metadata: configSection.metadata || {
                display_name: section_type,
                bgColor: 'transparent',
              },
              section_data: configSection.section_data || {},
              layout_position: configSection.layout_position || {
                areaName: sectionID,
              },
              ...configSection,
            } as HomeSectionTyped,
          ],
        }
      })
    },
    [updateCallback],
  )

  // Update section metadata (shallow merge)
  const updateSectionMetadata = useCallback(
    (sectionID: string, updates: Partial<HomeSection['metadata']>) => {
      updateCallback((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.id === sectionID
            ? {
                ...section,
                metadata: {
                  ...section.metadata,
                  ...updates,
                },
              }
            : section,
        ),
      }))
    },
    [updateCallback],
  )

  // Update section data (shallow merge)
  const updateSectionData = useCallback(
    (sectionID: string, updates: Partial<HomeSection['section_data']>) => {
      updateCallback(
        (prev) =>
          ({
            ...prev,
            sections: prev.sections.map((section) =>
              section.id === sectionID
                ? {
                    ...section,
                    section_data: {
                      ...section.section_data,
                      ...updates,
                    },
                  }
                : section,
            ),
          }) as HomeConfig,
      )
    },
    [updateCallback],
  )

  const updateSection = useCallback(
    (sectionID: string, updates: Partial<HomeSection>) => {
      updateCallback(
        (prev) =>
          ({
            ...prev,
            sections: prev.sections.map((section) =>
              section.id === sectionID ? { ...section, ...updates } : section,
            ),
          }) as HomeConfig,
      )
    },
    [updateCallback],
  )

  return {
    config,
    configRef,
    mergeConfig,
    overrideConfig,
    updateAreaPlacement,
    removeSection,
    addSection,
    updateSectionMetadata,
    updateSectionData,
    updateSection,
  }
}

// Re-export helper functions from useEditableHomeConfig
// These are shared utilities for layout manipulation
function makeAreaNameEmpty(config: HomeConfig, areaName: string) {
  const replacementName = `EMPTY-${pullLastCharactersFromNow()}`

  const mutatedConfig = { ...config }

  if ('layout' in mutatedConfig && mutatedConfig.layout) {
    mutatedConfig.layout = replaceLayoutNameOrRemoveRow(
      mutatedConfig.layout,
      areaName,
      replacementName,
    )
    mutatedConfig.layout = consolidateEmptyItems(mutatedConfig.layout)
  }

  if ('tablet_layout' in mutatedConfig && mutatedConfig.tablet_layout) {
    mutatedConfig.tablet_layout = replaceLayoutNameOrRemoveRow(
      mutatedConfig.tablet_layout,
      areaName,
      replacementName,
    )
    mutatedConfig.tablet_layout = consolidateEmptyItems(
      mutatedConfig.tablet_layout,
    )
  }

  if ('mobile_layout' in mutatedConfig && mutatedConfig.mobile_layout) {
    mutatedConfig.mobile_layout = replaceLayoutNameOrRemoveRow(
      mutatedConfig.mobile_layout,
      areaName,
      replacementName,
    )
    mutatedConfig.mobile_layout = consolidateEmptyItems(
      mutatedConfig.mobile_layout,
    )
  }

  return mutatedConfig
}

function appendSectionToLayouts(
  config: HomeConfig,
  section: HomeSection,
  activeLayout: DevicePreview,
  coordinates: { x: number; y: number; w: number; h: number },
) {
  const areaName = section.layout_position.areaName

  if (!areaName) {
    return config
  }

  let layout = config.layout

  if (activeLayout === 'tablet' && config.tablet_layout) {
    layout = config.tablet_layout
  } else if (activeLayout === 'mobile' && config.mobile_layout) {
    layout = config.mobile_layout
  }

  const itemAfterAreaName = pullItemAfterFromCoordinates(
    coordinates,
    layout,
    config.sections,
  )

  const mutatedConfig = cloneDeep(config)

  if ('layout' in mutatedConfig && mutatedConfig.layout) {
    mutatedConfig.layout = spliceSectionIntoLayout(
      mutatedConfig.layout,
      areaName,
      coordinates,
      itemAfterAreaName,
    )
  }

  if ('tablet_layout' in mutatedConfig && mutatedConfig.tablet_layout) {
    mutatedConfig.tablet_layout = spliceSectionIntoLayout(
      mutatedConfig.tablet_layout,
      areaName,
      coordinates,
      itemAfterAreaName,
    )
  }

  if ('mobile_layout' in mutatedConfig && mutatedConfig.mobile_layout) {
    mutatedConfig.mobile_layout = spliceSectionIntoLayout(
      mutatedConfig.mobile_layout,
      areaName,
      coordinates,
      itemAfterAreaName,
    )
  }

  return mutatedConfig
}

function replaceLayoutNameOrRemoveRow(
  layout: ScreenSizeLayout,
  areaName: string,
  replacementName?: string,
) {
  if (!layout || !replacementName) {
    return layout
  }

  let matchingRowIndex = -1

  const matchingRow = layout.areas_by_name?.find((row, rowIndex) => {
    const foundInRow = row.some((item) => {
      if (typeof item === 'string') {
        return item === areaName
      }
      return item.name === areaName
    })

    if (foundInRow) {
      matchingRowIndex = rowIndex
    }

    return foundInRow
  })

  const rowContainsNonEmptyOtherItems = matchingRow?.some((item) => {
    if (typeof item === 'string') {
      return !isEmptyItemName(item) && item !== areaName
    }
    return !isEmptyItemName(item.name) && item.name !== areaName
  })

  if (!rowContainsNonEmptyOtherItems) {
    return {
      ...layout,
      areas_by_name: layout.areas_by_name?.filter(
        (__, rowIndex) => rowIndex !== matchingRowIndex,
      ),
    }
  } else {
    return {
      ...layout,
      areas_by_name: layout.areas_by_name?.map((row) =>
        row.map((seg) => {
          if (typeof seg === 'string') {
            return seg === areaName ? replacementName : seg
          }
          return seg.name === areaName ? { ...seg, name: replacementName } : seg
        }),
      ),
    }
  }
}

function createEmptyAreaNameObject({
  areaName,
  columnSpan,
  layoutColumnsCount,
}: {
  areaName?: string
  columnSpan: number
  layoutColumnsCount: number
}) {
  if (columnSpan < 1) {
    columnSpan = 0
  }

  if (!areaName) {
    areaName = `EMPTY-${pullLastCharactersFromNow()}`
  }

  return {
    name: areaName,
    columnSpan: typeSafeColumnSpan(columnSpan, layoutColumnsCount),
  }
}

function spliceSectionIntoLayout(
  layout: ScreenSizeLayout,
  areaName: string,
  coordinates: { x: number; y: number; w: number; h: number },
  itemAfterAreaName?: string | null,
) {
  if (!layout) {
    return layout
  }

  const mutatedLayout = cloneDeep(layout)

  if (!layout.areas_by_name) {
    mutatedLayout.areas_by_name = []
  }

  if (
    !mutatedLayout.areas_by_name!.length ||
    mutatedLayout.areas_by_name!.length <= coordinates.y ||
    !itemAfterAreaName
  ) {
    const maxWidth = Math.max(1, Math.min(layout.columns, coordinates.w))
    const maxXPosition = Math.max(0, layout.columns - maxWidth)

    const repectedCoordinates = {
      h: coordinates.h,
      w: maxWidth,
      x: Math.max(0, Math.min(maxXPosition, coordinates.x)),
      y: coordinates.y,
    }

    const fillLeft =
      repectedCoordinates.x > 0
        ? [
            createEmptyAreaNameObject({
              areaName: `EMPTY-${pullLastCharactersFromNow()}`,
              columnSpan: repectedCoordinates.x,
              layoutColumnsCount: layout.columns,
            }),
          ]
        : []

    mutatedLayout.areas_by_name!.push([
      ...fillLeft,
      {
        name: areaName,
        columnSpan: typeSafeColumnSpan(repectedCoordinates.w, layout.columns),
      },
    ])
  } else {
    const {
      columnInsertIndex,
      moveFollowingItemsToNewRow,
      emptySpacesBefore,
      emptySpacesAfter,
      shouldReplaceEmptyItem,
      error,
    } = calculateItemFit(
      mutatedLayout,
      areaName,
      coordinates,
      itemAfterAreaName,
    )

    if (error) {
      mutatedLayout.areas_by_name!.push([
        {
          name: areaName,
          columnSpan: typeSafeColumnSpan(coordinates.w, layout.columns),
        },
      ])
    } else {
      const itemsToInsert: AreaNamesItem[] = []

      if (shouldReplaceEmptyItem && emptySpacesBefore > 0) {
        itemsToInsert.push(
          createEmptyAreaNameObject({
            areaName: `EMPTY-${pullLastCharactersFromNow()}`,
            columnSpan: emptySpacesBefore,
            layoutColumnsCount: layout.columns,
          }),
        )
      }

      itemsToInsert.push({
        name: areaName,
        columnSpan: typeSafeColumnSpan(coordinates.w, layout.columns),
      })

      if (shouldReplaceEmptyItem && emptySpacesAfter > 0) {
        itemsToInsert.push(
          createEmptyAreaNameObject({
            areaName: `EMPTY-${pullLastCharactersFromNow()}`,
            columnSpan: emptySpacesAfter,
            layoutColumnsCount: layout.columns,
          }),
        )
      }

      const itemsToRemove = shouldReplaceEmptyItem ? 1 : 0

      mutatedLayout.areas_by_name![coordinates.y].splice(
        columnInsertIndex,
        itemsToRemove,
        ...itemsToInsert,
      )

      if (moveFollowingItemsToNewRow) {
        const itemsInsertedCount = itemsToInsert.length
        const followingItems = mutatedLayout.areas_by_name![
          coordinates.y
        ].splice(columnInsertIndex + itemsInsertedCount, 10_000)

        mutatedLayout.areas_by_name!.splice(
          coordinates.y + 1,
          0,
          followingItems,
        )
      }
    }
  }

  return consolidateEmptyItems(mutatedLayout)
}

function consolidateEmptyItems(layout: ScreenSizeLayout) {
  if (!layout.areas_by_name) {
    return layout
  }

  const areasByName: AreaNamesItem[][] = []

  layout.areas_by_name.forEach((row) => {
    const rowCopy: AreaNamesItem[] = []

    row.forEach((item) => {
      if (typeof item === 'string') {
        // TODO handle string items
      } else if (isEmptyItemName(item.name)) {
        const prevItem = rowCopy[rowCopy.length - 1]
        const prevItemIsEmpty =
          !!prevItem &&
          typeof prevItem !== 'string' &&
          isEmptyItemName(prevItem.name)

        if (prevItemIsEmpty) {
          prevItem.columnSpan += item.columnSpan
        } else {
          rowCopy.push(item)
        }
      } else {
        rowCopy.push(item)
      }
    })

    areasByName.push(rowCopy)
  })

  layout.areas_by_name = areasByName

  return layout
}

function pullItemAfterFromCoordinates(
  coordinates: { x: number; y: number; w: number; h: number },
  layout: ScreenSizeLayout,
  sections: HomeSection[],
) {
  const { x, y } = coordinates

  if (!layout.areas_by_name || layout.areas_by_name.length <= coordinates.y) {
    return null
  }

  let areaNameOfItemInSpace: string | null = null

  if (layout.areas_by_name[y]) {
    let colIndex = 0
    layout.areas_by_name[y].forEach((itemInRow) => {
      if (areaNameOfItemInSpace) {
        return
      }

      if (typeof itemInRow === 'string') {
        if (colIndex === x) {
          areaNameOfItemInSpace = itemInRow
          colIndex += 1
        } else {
          colIndex += 1
          return
        }
      } else {
        if (colIndex <= x && colIndex + itemInRow.columnSpan > x) {
          areaNameOfItemInSpace = itemInRow.name
        }

        colIndex += itemInRow.columnSpan
        return
      }
    })

    if (!areaNameOfItemInSpace) {
      return null
    }

    if (isEmptyItemName(areaNameOfItemInSpace)) {
      return areaNameOfItemInSpace
    }

    const section = sections.find(
      (s) => s.layout_position.areaName === areaNameOfItemInSpace,
    )

    if (!section) {
      return null
    }

    return section.layout_position?.areaName ?? null
  }

  return null
}

function isEmptyItemName(itemName: string) {
  return /^(empty)/i.test(itemName)
}

function typeSafeColumnSpan(
  columnSpan: number,
  columnsCount: number,
): ExpectedColumnCounts {
  const safeColSpan = Math.max(1, Math.min(columnsCount, columnSpan))

  if (typeof safeColSpan !== 'number' || safeColSpan < 1 || safeColSpan > 12) {
    return 6
  }

  switch (safeColSpan) {
    case 1:
      return 1
    case 2:
      return 2
    case 3:
      return 3
    case 4:
      return 4
    case 5:
      return 5
    case 6:
      return 6
    case 7:
      return 7
    case 8:
      return 8
    case 9:
      return 9
    case 10:
      return 10
    case 11:
      return 11
    case 12:
      return 12
    default:
      return 6
  }
}

function calculateItemFit(
  mutatedLayout: ScreenSizeLayout,
  _areaName: string,
  coordinates: { x: number; y: number; w: number; h: number },
  itemAfterAreaName: string | null,
): {
  columnInsertIndex: number
  moveFollowingItemsToNewRow: boolean
  actualRowIndex: number
  emptySpacesBefore: number
  emptySpacesAfter: number
  shouldReplaceEmptyItem: boolean
  emptyItemName?: string
  error?: string
} {
  let rowIndex = coordinates.y

  const targetRow = mutatedLayout.areas_by_name!.find((row, curIdx) => {
    const foundInRow = row.some((item) => {
      if (typeof item === 'string') {
        return item === itemAfterAreaName
      }
      return item.name === itemAfterAreaName
    })

    if (foundInRow) {
      rowIndex = curIdx
    }

    return foundInRow
  })

  if (!targetRow) {
    return {
      columnInsertIndex: -1,
      moveFollowingItemsToNewRow: false,
      actualRowIndex: coordinates.y,
      emptySpacesBefore: 0,
      emptySpacesAfter: 0,
      shouldReplaceEmptyItem: false,
      error: 'Could not find target row for item after the coordinates',
    }
  }

  let targetColumnStart = -1
  let activeColIndex = 0
  let actualAreaByNameIndex = 0
  let totalColumnsFilled = 0
  let emptySpacesBefore = 0
  let emptySpacesAfter = 0
  let emptyItemName: string | undefined = undefined
  let emptyItemColumnSpan = 0
  let emptyItemColumnStart = -1

  targetRow.forEach((item) => {
    if (typeof item === 'string') {
      if (targetColumnStart < 0) {
        if (item === itemAfterAreaName) {
          targetColumnStart = activeColIndex

          if (isEmptyItemName(item)) {
            emptyItemName = item
            emptyItemColumnSpan = 1
            emptyItemColumnStart = activeColIndex
          }
        } else {
          actualAreaByNameIndex += 1
        }
      }

      activeColIndex += 1

      if (!isEmptyItemName(item)) {
        totalColumnsFilled += 1
      }
    } else {
      if (targetColumnStart < 0) {
        if (item.name === itemAfterAreaName) {
          targetColumnStart = activeColIndex

          if (isEmptyItemName(item.name)) {
            emptyItemName = item.name
            emptyItemColumnSpan = item.columnSpan
            emptyItemColumnStart = activeColIndex
          }
        } else {
          actualAreaByNameIndex += 1
        }
      }

      activeColIndex += item.columnSpan

      if (!isEmptyItemName(item.name)) {
        totalColumnsFilled += item.columnSpan
      }
    }
  })

  if (targetColumnStart === -1) {
    return {
      columnInsertIndex: -1,
      moveFollowingItemsToNewRow: false,
      actualRowIndex: rowIndex,
      emptySpacesBefore: 0,
      emptySpacesAfter: 0,
      shouldReplaceEmptyItem: false,
      error:
        'Could not find target column start for item after the coordinates',
    }
  }

  const emptySpaceInRow = mutatedLayout.columns - totalColumnsFilled

  if (!emptySpaceInRow || emptySpaceInRow < coordinates.w) {
    return {
      columnInsertIndex: actualAreaByNameIndex,
      actualRowIndex: rowIndex,
      emptySpacesBefore: 0,
      emptySpacesAfter: 0,
      shouldReplaceEmptyItem: false,
      moveFollowingItemsToNewRow: true,
    }
  }

  let shouldReplaceEmptyItem = false

  if (emptyItemName && emptyItemColumnSpan > 0) {
    shouldReplaceEmptyItem = true

    const itemStartInEmptySpace = coordinates.x - emptyItemColumnStart
    const itemEndInEmptySpace = itemStartInEmptySpace + coordinates.w

    emptySpacesBefore = Math.max(0, itemStartInEmptySpace)
    emptySpacesAfter = Math.max(0, emptyItemColumnSpan - itemEndInEmptySpace)
  }

  return {
    columnInsertIndex: actualAreaByNameIndex,
    actualRowIndex: rowIndex,
    moveFollowingItemsToNewRow: false,
    emptySpacesBefore,
    emptySpacesAfter,
    shouldReplaceEmptyItem,
    emptyItemName,
  }
}

function pullLastCharactersFromNow(length = 9) {
  return Date.now().toString().slice(-length)
}
