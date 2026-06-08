import { useMemo } from 'react'
import { useMenuQuery, useCustomTabsReadQuery } from '@tyto/query'
import type { TytoData } from '@spacedock/manifest'
import { FUNCTIONS_BY_NAME } from '@spacedock/manifest'

interface Props {
  functionID?: number | string
  traitID?: number | string
  utilizeAdminEndponts?: boolean
  domainID?: number
}

export function useMenuItem({
  functionID,
  traitID,
  utilizeAdminEndponts,
  domainID,
}: Props) {
  const { data, isLoading, error } = useMenuQuery({
    disabled: !functionID && !traitID,
  })
  const customTabsQuery = useCustomTabsReadQuery({
    isEnabled: !!utilizeAdminEndponts && !!domainID && !!traitID,
    domainID: domainID || 0,
  })

  const menuItem = useMemo(() => {
    let item: TytoData.MenuItemParsed | undefined = undefined
    if (functionID) {
      item = data?.menuItems.find(
        (item) => item.functionID === Number(functionID),
      )
    } else if (traitID) {
      const assignedCustomTabs = data?.menuItems.find(
        (menuItem) =>
          menuItem.functionID === FUNCTIONS_BY_NAME['Page Portal']?.functionID,
      )?.subMenu

      if (assignedCustomTabs?.length) {
        item = assignedCustomTabs.find(
          (item) => item.functionName === `traitID=${traitID}`,
        )
      }

      if (!item && customTabsQuery.data?.tabs?.length) {
        item = matchingTab(
          customTabsQuery.data?.tabs.find(
            (item) => `${item.traitID}` === `${traitID}`,
          ),
        )
      }
    }

    return item
  }, [data ?? null, customTabsQuery.data ?? null, functionID ?? null, traitID])

  return {
    menuItem,
    isLoading,
    error,
  }
}

function matchingTab(
  tab?: NonNullable<
    ReturnType<typeof useCustomTabsReadQuery>['data']
  >['tabs'][number],
): TytoData.MenuItemParsed | undefined {
  if (tab) {
    return {
      displayName: tab.name,
      functionID: 60,
      functionName: 'Page Portal',
      hideMenu: false,
      href: '#',
      iconPath: pullPathFromURL(tab.iconUrl),
      iconPathLarge: pullPathFromURL(tab.iconPathFull),
      targetPref: '_self',
      title: tab.name,
    }
  }

  return undefined
}

function pullPathFromURL(_url: string) {
  const url = new URL(_url, window.location.origin)

  return url?.pathname || ''
}
