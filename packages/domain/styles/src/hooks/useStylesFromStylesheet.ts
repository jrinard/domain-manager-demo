import { useMemo } from 'react'
import { ParsedStylesheet } from '../format/css'
import { formatOklchCss, formatCSSVariable } from '../color/oklch'
import { isRawColor, isRawRef } from '../schema/raw-values'

/**
 * Takes a Parsed Stylesheet and returns an Object of properties that can be inlined on DOM elements, accounting for the value type of each given token.
 * @param theme - The theme to get the styles from (light or dark)
 * @param stylesheet - The Parsed Stylesheet to use to get the styles from
 * @returns An Object of properties that can be inlined on DOM elements
 */
export function useStylesFromStylesheet(
  theme: 'light' | 'dark',
  stylesheet: ParsedStylesheet,
) {
  return useMemo(() => {
    const themeStyles = stylesheet[theme]

    const styles: Record<string, string> = {}

    Object.entries(themeStyles).map(([key, tokenData]) => {
      if (tokenData.type === 'dimension') {
        styles[key] = tokenData.value
      } else if (isRawColor(tokenData)) {
        if (tokenData.value.mode !== 'oklch') {
          return
        }
        styles[key] = formatOklchCss(tokenData.value)
      } else if (isRawRef(tokenData)) {
        styles[key] = formatCSSVariable(tokenData.target)
      } else {
        console.error(`Unknown value type for ${key}: ${tokenData}`)
      }
    })

    return styles
  }, [theme, stylesheet])
}
