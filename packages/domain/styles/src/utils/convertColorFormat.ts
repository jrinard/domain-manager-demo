import { formatRgb, formatHex } from 'culori'

/**
 * Convert a color such as oklch to another format such as rgb
 * @param color
 * @param from
 * @param to
 * @returns
 */
export function convertColorFormat(
  color: string,
  from: 'oklch',
  to: 'rgb' | 'hex',
) {
  let converter = formatRgb

  if (to === 'hex') {
    converter = formatHex
  }

  return converter(color)
}
