import { useMemo } from 'react'
import type { TytoData } from '@spacedock/manifest'

export interface MenuSearchResult {
  displayName: string
  description?: string
  functionID: number
  href: string
  iconPath?: string
  keyPhrases?: string[]
}

/**
 * Hook to search through menu items from the Menu API
 * Based on legacy SearchInput logic from Tryyb
 */
export function useMenuItemsSearch(
  searchTerm: string,
  menuItems: TytoData.MenuItemParsed[] | undefined,
  options: {
    enabled?: boolean
    maxResults?: number
  } = {},
): MenuSearchResult[] {
  const { enabled = true, maxResults = 5 } = options

  return useMemo(() => {
    if (!enabled || !searchTerm || searchTerm.length <= 1 || !menuItems) {
      return []
    }

    // Flatten all menu items including subMenus
    const allMenuItems: MenuSearchResult[] = []

    const flattenMenuItems = (items: TytoData.MenuItemParsed[]) => {
      items.forEach((item) => {
        allMenuItems.push(mapMenuItemToSearchResult(item))

        // Recursively add submenu items
        if (item.subMenu && item.subMenu.length > 0) {
          flattenMenuItems(item.subMenu)
        }
      })
    }

    flattenMenuItems(menuItems)

    // Search logic from legacy code
    const cleanedSearchTerm = searchTerm.replace(/(how do i|how to)/i, '')
    const searchWords = Array.from(
      new Set(cleanedSearchTerm.split(' ').filter((word) => word.length > 2)),
    )
    const searchRegExp = new RegExp(cleanedSearchTerm, 'i')

    // Filter items based on search term
    const matches = allMenuItems
      .filter((item) => {
        const displayName = item.displayName || ''
        const description = item.description || ''
        const keyPhrases = item.keyPhrases || []

        // Direct match in display name or description
        if (searchRegExp.test(displayName) || searchRegExp.test(description)) {
          return true
        }

        // Check key phrases
        if (keyPhrases.some((phrase) => searchRegExp.test(phrase))) {
          return true
        }

        return false
      })
      .slice(0, maxResults)

    return matches
  }, [searchTerm, menuItems, enabled, maxResults])
}

function mapMenuItemToSearchResult(
  item: TytoData.MenuItemParsed,
): MenuSearchResult {
  return {
    displayName: item.displayName,
    description: item.description,
    functionID: item.functionID,
    href: item.href,
    iconPath: item.iconPath,
    keyPhrases: (item as any).keyPhrases, // keyPhrases might not be in type but exists in API
  }
}
