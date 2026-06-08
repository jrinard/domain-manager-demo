import { PlacedSection, SectionConfig } from './types'
import type { DomainUI } from '@spacedock/manifest'

//* ============================================================================
//* SPACE FINDING UTILITIES
//* ============================================================================

/**
 * Finds the first available space in the grid for a new section
 * Checks rows from top to bottom, looking for gaps that fit the section
 */
export const findAvailableSpace = (
  placedSections: PlacedSection[],
  sectionConfig: SectionConfig,
): { y: number; x: number } => {
  const maxY = Math.max(...placedSections.map((s) => s.y + s.rowSpan), 0)

  for (let y = 0; y <= maxY; y++) {
    const sectionsInRow = placedSections.filter(
      (s) => s.y <= y && y < s.y + s.rowSpan,
    )

    // Empty row - use it
    if (sectionsInRow.length === 0) {
      return { y, x: 0 }
    }

    // Sort sections by x position to find gaps
    const sortedSections = [...sectionsInRow].sort((a, b) => a.x - b.x)

    // Check gap at the start (before first section)
    if (sortedSections[0].x >= sectionConfig.defaultColumnSpan) {
      return { y, x: 0 }
    }

    // Check for gaps between sections
    for (let i = 0; i < sortedSections.length - 1; i++) {
      const currentEnd = sortedSections[i].x + sortedSections[i].columnSpan
      const nextStart = sortedSections[i + 1].x
      const gapSize = nextStart - currentEnd

      if (gapSize >= sectionConfig.defaultColumnSpan) {
        return { y, x: currentEnd }
      }
    }

    // Check space after the last section
    const lastSection = sortedSections[sortedSections.length - 1]
    const lastSectionEnd = lastSection.x + lastSection.columnSpan
    if (12 - lastSectionEnd >= sectionConfig.defaultColumnSpan) {
      return { y, x: lastSectionEnd }
    }
  }

  // No space found anywhere, use bottom
  return { y: maxY, x: 0 }
}

//* ============================================================================
//* CONFIG GENERATION UTILITIES
//* ============================================================================

/**
 * Generates Bento-compatible areas array from placed sections
 */
export const generateBentoAreas = (placedSections: PlacedSection[]) => {
  const maxY = Math.max(...placedSections.map((s) => s.y + s.rowSpan - 1), 0)
  const areasByName: Array<(string | { name: string; columnSpan: number })[]> =
    []

  for (let y = 0; y <= maxY; y++) {
    const rowSections = placedSections.filter(
      (s) => s.y <= y && y < s.y + s.rowSpan,
    )
    const row: (string | { name: string; columnSpan: number })[] = []

    // Sort by x position
    rowSections.sort((a, b) => a.x - b.x)

    rowSections.forEach((section) => {
      const areaName = section.label.toLowerCase().replace(/\s+/g, '-')
      row.push({ name: areaName, columnSpan: section.columnSpan })
    })

    areasByName.push(row)
  }

  return areasByName
}

//* ============================================================================
//* CONFIG NAME UTILITIES
//* ============================================================================

/**
 * Gets the original config name for cloning
 * The backend will automatically append a number if a duplicate name exists
 * @param configID - The GUID of the config being cloned
 * @param allConfigs - All configs from the domain
 * @returns The original config name (backend handles numbering)
 */
export function getClonedConfigName(
  configID: string,
  allConfigs: DomainUI.ListUIConfiguration[] | undefined,
): string {
  // Find the current config from all_configs to get its name
  const currentConfig = allConfigs?.find((c) => c.UIconfigGUID === configID)
  return currentConfig?.configName || 'Untitled Config'
}
