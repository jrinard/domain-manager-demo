import { expect, describe, it } from 'vitest'
import {sanitizeCell} from "./helpers"
describe('sanitizeCell', () => {
  it('should convert a number or string to a string', () => {
    expect(sanitizeCell(1)).toMatch("1")
  })
})
