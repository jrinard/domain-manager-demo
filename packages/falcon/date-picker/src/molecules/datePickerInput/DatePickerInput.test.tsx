import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { DatePickerInput } from './DatePickerInput'

describe('DatePickerInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DatePickerInput />)
    expect(baseElement).toBeTruthy()
  })
})
