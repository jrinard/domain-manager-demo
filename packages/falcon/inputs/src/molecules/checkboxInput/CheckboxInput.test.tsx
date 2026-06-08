import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { CheckboxInput } from './CheckboxInput'

describe('CheckboxInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CheckboxInput />)
    expect(baseElement).toBeTruthy()
  })
})
