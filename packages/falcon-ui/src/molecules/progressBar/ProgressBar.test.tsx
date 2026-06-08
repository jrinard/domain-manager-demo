import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { ProgressBar } from './ProgressBar'

describe('ProgressBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ProgressBar color="primary" progress={25} hasLabel={false} />
    )
    expect(baseElement).toBeTruthy()
  })
})
