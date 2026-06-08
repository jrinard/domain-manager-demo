import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { ToggleIcon } from './ToggleIcon'

describe('ToggleIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ToggleIcon selected icon="star" />)
    expect(baseElement).toBeTruthy()
  })
})
