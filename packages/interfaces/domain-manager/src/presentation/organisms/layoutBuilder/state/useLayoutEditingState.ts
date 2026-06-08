import { useCallback, useMemo, useState } from 'react'
import type { HomeConfig, ScreenSizeLayout } from '@domain/configs'

export type BreakpointKey = 'layout' | 'tablet_layout' | 'mobile_layout'
export type DevicePreview = 'desktop' | 'tablet' | 'mobile'

export function useLayoutEditingState(
  config: HomeConfig,
  mergeConfig?: (partial: Partial<HomeConfig>) => void,
) {
  const [activeLayout, setActiveLayout] = useState<DevicePreview>('desktop')

  const currentLayout: ScreenSizeLayout = useMemo(() => {
    if (activeLayout === 'desktop') return config.layout
    if (activeLayout === 'tablet') return config.tablet_layout || config.layout
    return config.mobile_layout || config.layout
  }, [activeLayout, config])

  const updateLayout = useCallback(
    (next: ScreenSizeLayout) => {
      if (mergeConfig) {
        if (activeLayout === 'desktop') mergeConfig({ layout: next })
        else if (activeLayout === 'tablet') mergeConfig({ tablet_layout: next })
        else mergeConfig({ mobile_layout: next })
      } else {
        if (activeLayout === 'desktop') Object.assign(config, { layout: next })
        else if (activeLayout === 'tablet')
          Object.assign(config, { tablet_layout: next })
        else Object.assign(config, { mobile_layout: next })
      }
    },
    [activeLayout, config, mergeConfig],
  )

  return { activeLayout, setActiveLayout, currentLayout, updateLayout }
}
