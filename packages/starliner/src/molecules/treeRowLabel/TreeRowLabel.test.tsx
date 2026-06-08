import { render } from '@spacedock/holoprojector'
import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './TreeRowLabel.stories'
const { BasicUsage } = composeStories(stories)

describe('TreeRowLabel', () => {
  it('should render RowLabel', () => {
    const { baseElement } = render(<BasicUsage {...BasicUsage.args} />)
    expect(baseElement).toBeTruthy()
  })
})
