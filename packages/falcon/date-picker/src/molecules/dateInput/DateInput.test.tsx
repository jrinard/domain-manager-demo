import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { DateInput } from './DateInput'

describe('DateInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DateInput />)
    expect(baseElement).toBeTruthy()
  })
})
