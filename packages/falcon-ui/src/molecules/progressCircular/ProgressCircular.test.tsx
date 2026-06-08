import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { ProgressCircular } from './ProgressCircular'

describe('ProgressCircular', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProgressCircular />)
    expect(baseElement).toBeTruthy()
  })
})
