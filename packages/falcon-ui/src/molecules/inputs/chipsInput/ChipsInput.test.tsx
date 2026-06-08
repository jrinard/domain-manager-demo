import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { ChipsInput } from './ChipsInput'

describe('ChipsInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChipsInput />)
    expect(baseElement).toBeTruthy()
  })
})
