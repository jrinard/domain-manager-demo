import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { Image } from './Image'

describe('Image', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Image src="" alt="" />)
    expect(baseElement).toBeTruthy()
  })
})
