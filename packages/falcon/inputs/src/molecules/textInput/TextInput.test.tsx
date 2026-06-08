import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { TextInput } from './TextInput'

describe('TextInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextInput />)
    expect(baseElement).toBeTruthy()
  })
  it('does not render children text', () => {
    expect(() => {
      render(<TextInput>Send</TextInput>)
    }).toThrow(
      'input is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.'
    )
  })
})
