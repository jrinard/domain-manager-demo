import {
  IconSet,
  convertSVGToMask,
  isEmptyColor,
  parseColorsSync,
  removeFigmaClipPathFromSVG,
} from '@iconify/tools'

export const parseEachFigmaIconSet = (iconSet: IconSet) => {
  // Two-tone color
  const twoToneColor = '#808080' // 50% opacity
  iconSet.forEachSync((name, type) => {
    if (type !== 'icon') {
      return
    }
    const svg = iconSet.toSVG(name)
    if (!svg) {
      return
    }
    const backup = svg.toString()

    // Remove clip path
    removeFigmaClipPathFromSVG(svg)

    // Check colors
    let hasWhite = false
    let hasDuotone = false
    parseColorsSync(svg, {
      callback: (attr, colorString, color) => {
        if (color && isEmptyColor(color)) {
          return color
        }
        switch (colorString.toLowerCase()) {
          case '#000':
          case 'black':
          case '#1c274c':
          case '#1c274d':
            return '#000'

          case '#8e93a6':
            hasDuotone = true
            return twoToneColor

          case '#fff':
          case 'white':
            hasWhite = true
            return '#fff'
          case 'currentcolor':
            return 'currentcolor'
        }

        throw new Error(`Bad color in ${name}: ${colorString}`)
      },
    })

    // Mask icon
    if (hasWhite || hasDuotone) {
      if (
        !convertSVGToMask(svg, {
          color: '#000',
          custom: (color) => {
            switch (color) {
              case twoToneColor:
                return color
            }
          },
        })
      ) {
        throw new Error(`Failed to convert "${name}" to mask`)
      }
    }

    if (svg.toString() !== backup) {
      iconSet.fromSVG(name, svg)
    }
  })
  return iconSet
}
