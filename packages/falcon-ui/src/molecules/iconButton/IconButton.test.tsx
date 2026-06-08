import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { IconButton } from './IconButton'

describe('IconButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IconButton icon="search" />)
    expect(baseElement).toBeTruthy()
  })
})
