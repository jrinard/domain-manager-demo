import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { Popover } from './Popover'

describe('Popover', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Popover />)
    expect(baseElement).toBeTruthy()
  })
})
