import { pick } from 'lodash'
import type { ParsedStylesheet } from '@domain/styles'

export const pickStyles = (
  styles: ParsedStylesheet['light' | 'dark'],
  ...keys: string[]
): Record<string, string> => {
  return pick(styles, keys) as Record<string, string>
}
