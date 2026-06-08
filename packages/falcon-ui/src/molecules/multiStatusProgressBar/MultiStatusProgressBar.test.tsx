import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { MultiStatusProgressBar } from './MultiStatusProgressBar'

describe('MultiStatusProgressBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MultiStatusProgressBar
        items={[
          { color: 'success', label: 'Passed', percent: 32 },
          { color: 'warn', label: 'Inprogress', percent: 11 },
          { color: 'error', label: 'Failed', percent: 5 },
        ]}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
