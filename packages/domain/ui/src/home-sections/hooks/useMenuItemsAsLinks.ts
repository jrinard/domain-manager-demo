import { useMemo } from 'react'
import type { TytoData } from '@spacedock/manifest'
import type { LinkSection } from '@domain/configs'

interface Props {
  menuItems: TytoData.MenuItemParsed[]
  icon_display: LinkSection['section_data']['icon_display']
}

export function useMenuItemsAsLinks({
  menuItems,
  icon_display,
}: Props): Array<LinkSection['section_data']> {
  return useMemo(() => {
    return menuItems.map((item) => {
      return {
        sub_type: 'custom-tab',
        traitID: pullTraitID(item.functionName),
        href: item.href,
        icon_display: icon_display,
        targetPref: item.targetPref,
      }
    })
  }, [menuItems ?? null, icon_display])
}

function pullTraitID(functionName: string) {
  return Number(functionName.split('=')[1]) ?? -1
}
