import { useEffect, useState } from 'react'
import type { LibraryLegacy } from '@tyto/client'

type LibraryItem = Awaited<
  ReturnType<typeof LibraryLegacy.prototype.get>
>['items'][number]

type ItemWithYear = LibraryItem & { extractedYear: number }

/**
 * Finds the most recent Official Publication from library items
 * Looking for Most recent Year with "Official" and "Publication" in the lessonName
 * Then return the item with the most recent year
 * If there are multiple items with the same year, return the item with the "final" override
 * If there are multiple items with the same year and no "final" override, return the item with the "v2" or "r2" override
 * If there are multiple items with the same year and no "v2" or "r2" override, return the first item
 */
export function findOfficialPublication(
  items: LibraryItem[] | undefined,
): LibraryItem | undefined {
  if (!items) return undefined

  // Filter for items with year, "Official", and "Publication", extract year, then sort
  const sortedByYear = items
    .map((item) => {
      // Extract 4-digit year from the lessonName
      const yearMatch = item.lessonName.match(/\b(\d{4})\b/)
      const year = yearMatch ? parseInt(yearMatch[1], 10) : 0
      const hasOfficial = /official/i.test(item.lessonName)
      const hasPublication = /publication/i.test(item.lessonName)

      // Only include items with valid year, "Official", and "Publication"
      if (year && hasOfficial && hasPublication) {
        return { ...item, extractedYear: year }
      }
      return null
    })
    .filter((item): item is ItemWithYear => item !== null)
    .sort((a, b) => b.extractedYear - a.extractedYear) // Most recent year first

  // Get items with the highest year (already sorted, so first item's year is highest)
  const highestYear = sortedByYear[0]?.extractedYear
  const itemsWithHighestYear =
    highestYear !== undefined
      ? sortedByYear.filter((item) => item.extractedYear === highestYear)
      : []

  // If multiple items share the highest year, determine the best one
  return itemsWithHighestYear.length > 1
    ? // First check for "final" override
      itemsWithHighestYear.find((item) => /final/i.test(item.lessonName)) ||
        // Then prefer items with revision indicators (v2, r2, etc.) as they're newer
        itemsWithHighestYear.find((item) =>
          /\s+(v|r)\d+/i.test(item.lessonName),
        ) ||
        // Fallback to first item
        itemsWithHighestYear[0]
    : itemsWithHighestYear[0]
}

export function useOP(
  libraryItems: LibraryItem[] | undefined,
): LibraryItem | undefined {
  const [op, setOp] = useState<LibraryItem | undefined>(undefined)

  useEffect(() => {
    setOp(findOfficialPublication(libraryItems ?? undefined))
  }, [libraryItems])

  return op
}
