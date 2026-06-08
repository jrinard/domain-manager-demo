import { useMemo } from 'react'

export const useBaseFontSize = () => {
  return useMemo(() => {
    const fontSizeStr = window.getComputedStyle(document.body).fontSize
    const matches = fontSizeStr.match(/\d{1,3}/gi)
    return matches && matches[0] ? Number(matches[0] as string) : 16
  }, [])
}
