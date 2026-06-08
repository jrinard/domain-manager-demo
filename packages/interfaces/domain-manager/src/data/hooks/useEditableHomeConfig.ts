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

interface AreaPlacementUpdate {
  areaName: string
  colStart?: number
  rowStart?: number
}

// Default config to use when initialConfig is undefined
const DEFAULT_CONFIG: HomeConfig = {
  config_version: '1',
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

/**
 * Hook to manage editable home configuration state
 * Provides methods to modify config, sections, and layout
 * @param initialConfig - Optional initial HomeConfig to edit
 * @returns Object with current config and mutation methods
 */
export function useEditableHomeConfig(initialConfig?: HomeConfig) {
  const configRef = useRef<HomeConfig>(
    initialConfig || cloneDeep(DEFAULT_CONFIG),
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
  const mergeConfig = useCallback((newConfig: Partial<HomeConfig>) => {
    updateCallback((prev) => ({ ...prev, ...newConfig }))
  }, [])

  // Replace config entirely
  const overrideConfig = useCallback((newConfig: HomeConfig) => {
    updateCallback(newConfig)
  }, [])

  // Update area placement in layout
  const updateAreaPlacement = useCallback(
    ({ areaName, colStart, rowStart }: AreaPlacementUpdate) => {
      updateCallback((prev) => {
        // This is a simplified implementation
        // You may need to expand this based on your specific layout requirements
        return {
          ...prev,
          layout: {
            ...prev.layout,
            areas_by_name: prev.layout.areas_by_name || [],
          },
        }
      })
    },
    [],
  )

  // Remove a section by ID
  const removeSection = useCallback((sectionID: string) => {
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
  }, [])

  // Add a new section
  /**
   * If no `section.id` is provided, one will be generated, and the section will be appended to the end of the config on a new row.
   */
  const addSection = useCallback(
    (
      section_type: string,
      _configSection: Partial<HomeSection>,
      activeLayout: DevicePreview,
      coordinates?: { x: number; y: number; w: number; h: number },
    ) => {
      const { x, y, w, h } = coordinates || {
        x: 0,
        y: config.layout.areas_by_name?.length || 0,
        w: 6,
        h: 1,
      }

      updateCallback((prev) => {
        const configSection = cloneDeep(_configSection)
        const sectionID =
          configSection.id || `${section_type}-${pullLastCharactersFromNow()}`
        let setAreaName = false

        // * Generate ID is not present
        if (!configSection.id) {
          configSection.id = sectionID
          setAreaName = true
        }

        // * Set Aear Name if not present, or id was not present
        if (!configSection.layout_position?.areaName || setAreaName) {
          if (!configSection.layout_position) {
            configSection.layout_position = { areaName: sectionID }
          } else {
            configSection.layout_position.areaName = sectionID
          }
        }

        // * Update present Layouts to include the new Section
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
    [],
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
    [],
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
    [],
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
    [],
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

/**
 * Find the areaName of the Section that has been removed and make it empty.
 * However, if it is the ony item in the row, on the row will now contain only empty items, remove the ROW altogether.
 */
function replaceLayoutNameOrRemoveRow(
  layout: ScreenSizeLayout,
  areaName: string,
  replacementName?: string,
) {
  if (!layout || !replacementName) {
    return layout
  }

  let matchingRowIndex = -1

  // * Find matching row, and as a side-effect, set the matchingRowIndex if found.
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

  // * Determine if the row has any other non-empty sections in it.
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
      // * Clamp the x position to be either the desired x position, or the maximum x position allowed, whichever is smaller.
      x: Math.max(0, Math.min(maxXPosition, coordinates.x)),
      y: coordinates.y,
    }

    // * Create Empty Area to fill left, if placed with an x value greater than 0.
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

    // * No ROWs, *or* targeting a new ROW at to be created at the end of the Layout
    mutatedLayout.areas_by_name!.push([
      ...fillLeft,
      {
        name: areaName,
        columnSpan: typeSafeColumnSpan(repectedCoordinates.w, layout.columns),
      },
    ])
  } else {
    // else if (mutatedLayout.areas_by_name!.length && coordinates.y === 0) {
    //   // ! FIXME! One could be adding an item to the end of an existing first row with items in it...???
    //   // * Targeting Very First ROW, so we need to insert the new Section at the beginning of the ROW
    //   mutatedLayout.areas_by_name![0].unshift({
    //     name: areaName,
    //     columnSpan: typeSafeColumnSpan(coordinates.w, layout.columns),
    //   })
    // }
    // * Targeting a Specific row by Area Name, based off of adding to the middle of a another screen size layout.
    // * We want to:
    // * 1. Find which ROW first has an item matching the area name (account that it might be `string` or `object.areaName`)
    // * 2. Find the Column Start in that ROW of the areaName
    // * 3. See if the current width of the areaName + the coordinates.w is less than or equal to the total columns in the layout.
    // * 4. If it fits, insert the `areaName` into the row at the column start, and return the mutated layout.
    // * 5. If it doesn't fit, Take the area's in the row staring with the `itemAfterAreaName` as well as any after it and create a new ROW below the target ROW. with those items.

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
      console.error(error)

      mutatedLayout.areas_by_name!.push([
        {
          name: areaName,
          columnSpan: typeSafeColumnSpan(coordinates.w, layout.columns),
        },
      ])
    } else {
      // * Build the items to insert: [emptyBefore?, newItem, emptyAfter?]
      const itemsToInsert: AreaNamesItem[] = []

      // * Add empty space before if needed
      if (shouldReplaceEmptyItem && emptySpacesBefore > 0) {
        itemsToInsert.push(
          createEmptyAreaNameObject({
            areaName: `EMPTY-${pullLastCharactersFromNow()}`,
            columnSpan: emptySpacesBefore,
            layoutColumnsCount: layout.columns,
          }),
        )
      }

      // * Add the new item
      itemsToInsert.push({
        name: areaName,
        columnSpan: typeSafeColumnSpan(coordinates.w, layout.columns),
      })

      // * Add empty space after if needed
      if (shouldReplaceEmptyItem && emptySpacesAfter > 0) {
        itemsToInsert.push(
          createEmptyAreaNameObject({
            areaName: `EMPTY-${pullLastCharactersFromNow()}`,
            columnSpan: emptySpacesAfter,
            layoutColumnsCount: layout.columns,
          }),
        )
      }

      // * Replace the empty item (1 item) with the new items (1-3 items)
      // * or simply insert if not replacing an empty item (0 items removed)
      const itemsToRemove = shouldReplaceEmptyItem ? 1 : 0

      mutatedLayout.areas_by_name![coordinates.y].splice(
        columnInsertIndex,
        itemsToRemove,
        ...itemsToInsert,
      )

      if (moveFollowingItemsToNewRow) {
        // * Pull all items after the inserted item(s) from the row, then create a new ROW containing those items below this
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

    // * insert the new Section at the beginning of that ROW
    // mutatedLayout.areas_by_name = [
    //   ...(mutatedLayout.areas_by_name || []),
    //   [{ name: areaName, columnSpan: typeSafeColumnSpan(coordinates.w, layout.columns) }],
    // ]
  }

  return consolidateEmptyItems(mutatedLayout)
}

/**
 * Iterates over `layout.areas_by_name` and consolidates any empty items into a single item.
 * As in, if there are 2 consecutive empty items, they are consolidated into a single item by removing all but the first empty item and adding the `columnSpan` values of the items being removed to the first empty item that is kept.
 * @param layout
 * @returns
 */
function consolidateEmptyItems(layout: ScreenSizeLayout) {
  if (!layout.areas_by_name) {
    return layout
  }

  const areasByName: AreaNamesItem[][] = []

  layout.areas_by_name.forEach((row) => {
    const rowCopy: AreaNamesItem[] = []

    row.forEach((item) => {
      if (typeof item === 'string') {
        // TODO I hate this paradigm and will handle converting on file parse instead, to always be objects.
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

/**
 * Pull the item after the coordinates from the layout.
 * If `null` is returned, it means something was wrong and it ought to
 * safely appended to the end of the layout on a new row.
 */
function pullItemAfterFromCoordinates(
  coordinates: { x: number; y: number; w: number; h: number },
  layout: ScreenSizeLayout,
  sections: HomeSection[],
) {
  const { x, y } = coordinates
  // ! WARNING: Does not currently account for Sections that require or are somehow being place across multiple ROWs.
  // ! -------> `coordinates` *does* contain an `h` value, but it is not currently being used below in calculating the item after the coordinates.

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

      // * Handle name string
      if (typeof itemInRow === 'string') {
        if (colIndex === x) {
          areaNameOfItemInSpace = itemInRow
          colIndex += 1
        } else {
          colIndex += 1
          return
        }
      } else {
        // * Handle expected case of object syntax
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

    // * If this item is an empty item, lets use it so that it can be replaced (there is no matching section in the sections Array)
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

  // * First pass: find the target item and collect metadata
  targetRow.forEach((item) => {
    if (typeof item === 'string') {
      // * If column is a areaName string, check if it matches the target areaName
      if (targetColumnStart < 0) {
        if (item === itemAfterAreaName) {
          targetColumnStart = activeColIndex

          // * Check if this is an empty item we're inserting into
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
      // * If column is a areaName object, check if it matches the target item.name
      if (targetColumnStart < 0) {
        if (item.name === itemAfterAreaName) {
          targetColumnStart = activeColIndex

          // * Check if this is an empty item we're inserting into
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

  // * Calculate empty space handling if we're inserting into an empty item
  let shouldReplaceEmptyItem = false

  if (emptyItemName && emptyItemColumnSpan > 0) {
    shouldReplaceEmptyItem = true

    // * Calculate how the item fits within the empty space
    // * The item starts at coordinates.x relative to the row start
    const itemStartInEmptySpace = coordinates.x - emptyItemColumnStart
    const itemEndInEmptySpace = itemStartInEmptySpace + coordinates.w

    // * Empty space before the item (if item doesn't start at beginning of empty space)
    emptySpacesBefore = Math.max(0, itemStartInEmptySpace)

    // * Empty space after the item (if item doesn't fill the empty space)
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

function calculateRowColumnsData(
  row: AreaNamesItem[],
  targetColumnIndex: number,
) {
  let emptyColumnsCount = 0
  let areaNameAtIndex: string | null = null
  let nearestAreaColStart = 0
  let currentColIndex = 0

  const columnStatuses: Array<0 | 1> = []

  row.forEach((item) => {
    if (typeof item === 'string') {
      if (isEmptyItemName(item)) {
        emptyColumnsCount += 1
        columnStatuses.push(0)

        if (targetColumnIndex === currentColIndex) {
          areaNameAtIndex = null
          nearestAreaColStart = targetColumnIndex
        }
      } else {
        if (targetColumnIndex === currentColIndex) {
          areaNameAtIndex = item
          nearestAreaColStart = currentColIndex
        }

        columnStatuses.push(1)
      }

      currentColIndex += 1
    } else if (isEmptyItemName(item.name)) {
      emptyColumnsCount += item.columnSpan
      columnStatuses.push(
        ...Array.from({ length: item.columnSpan }, () => 0 as const),
      )

      if (
        targetColumnIndex >= currentColIndex &&
        targetColumnIndex <= currentColIndex + item.columnSpan
      ) {
        areaNameAtIndex = null
        targetColumnIndex = currentColIndex
        nearestAreaColStart = currentColIndex
      }

      currentColIndex += item.columnSpan
    } else {
      columnStatuses.push(
        ...Array.from({ length: item.columnSpan }, () => 1 as const),
      )

      if (
        targetColumnIndex >= currentColIndex &&
        targetColumnIndex <= currentColIndex + item.columnSpan
      ) {
        areaNameAtIndex = item.name
        nearestAreaColStart = currentColIndex
      }

      currentColIndex += item.columnSpan
    }
  })

  return {
    emptyColumnsCount,
    areaNameAtIndex,
    nearestAreaColStart,
    columnStatuses,
  }
}

function pullLastCharactersFromNow(length = 9) {
  return Date.now().toString().slice(-length)
}
