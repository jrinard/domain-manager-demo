import { it, expect } from 'vitest'
import { formatFallbackText } from './internals'

it('getFallbackText', () => {
  expect(formatFallbackText('Lorem Ipsum')).toBe('LI')
  expect(formatFallbackText('Lorem')).toBe('Lo')
})
