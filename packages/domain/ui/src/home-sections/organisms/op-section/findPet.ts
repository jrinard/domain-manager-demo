import { useEffect, useState } from 'react'
import type { LibraryLegacy } from '@tyto/client'

type LibraryItem = Awaited<
  ReturnType<typeof LibraryLegacy.prototype.get>
>['items'][number]

type ItemWithYear = LibraryItem & { extractedYear: number }

/**
 * Finds the most recent Pet item from library items
 * Looking for items with "Pet" in the lessonName
 * Year is optional - items with years are preferred and sorted by most recent year first
 * If multiple items have the same year (or no year), prefer item with "final" override
 */
export function findPetLabelingGuide(
  items: LibraryItem[] | undefined,
): LibraryItem | undefined {
  if (!items) return undefined

  // Filter for items with "Pet" keyword, extract year if present
  const itemsWithYear: ItemWithYear[] = []
  const itemsWithoutYear: LibraryItem[] = []

  items.forEach((item) => {
    const hasPet = /pet/i.test(item.lessonName)
    const hasGuide = /guide/i.test(item.lessonName)

    if (hasPet && hasGuide) {
      // Extract 4-digit year from the lessonName (optional)
      const yearMatch = item.lessonName.match(/\b(\d{4})\b/)
      const year = yearMatch ? parseInt(yearMatch[1], 10) : 0

      if (year) {
        itemsWithYear.push({ ...item, extractedYear: year })
      } else {
        itemsWithoutYear.push(item)
      }
    }
  })

  // Sort items with years by most recent first
  itemsWithYear.sort((a, b) => b.extractedYear - a.extractedYear)

  // Prefer items with years over items without years
  if (itemsWithYear.length > 0) {
    // Get items with the highest year
    const highestYear = itemsWithYear[0].extractedYear
    const itemsWithHighestYear = itemsWithYear.filter(
      (item) => item.extractedYear === highestYear,
    )

    // If multiple items share the highest year, prefer one with "final" override
    return itemsWithHighestYear.length > 1
      ? itemsWithHighestYear.find((item) => /final/i.test(item.lessonName)) ||
          itemsWithHighestYear[0]
      : itemsWithHighestYear[0]
  }

  // No items with years, use items without years
  if (itemsWithoutYear.length === 0) return undefined

  // If multiple items without years, prefer one with "final" override
  return itemsWithoutYear.length > 1
    ? itemsWithoutYear.find((item) => /final/i.test(item.lessonName)) ||
        itemsWithoutYear[0]
    : itemsWithoutYear[0]
}

export function usePetLabelingGuide(
  libraryItems: LibraryItem[] | undefined,
): LibraryItem | undefined {
  const [pet, setPet] = useState<LibraryItem | undefined>(undefined)

  useEffect(() => {
    setPet(findPetLabelingGuide(libraryItems ?? undefined))
  }, [libraryItems])

  return pet
}
