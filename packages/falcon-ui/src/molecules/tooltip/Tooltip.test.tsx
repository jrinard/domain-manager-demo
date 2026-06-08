import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { Tooltip, TooltipProvider } from './Tooltip'

describe('Tooltip', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TooltipProvider>
        <Tooltip content={'Tooltip is cool'} />
      </TooltipProvider>
    )
    expect(baseElement).toBeTruthy()
  })
})
