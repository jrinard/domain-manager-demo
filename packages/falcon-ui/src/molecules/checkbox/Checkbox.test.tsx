import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Checkbox />)
    expect(baseElement).toBeTruthy()
  })
})
