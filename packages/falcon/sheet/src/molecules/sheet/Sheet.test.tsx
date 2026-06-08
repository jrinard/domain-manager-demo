import { render } from '@spacedock/holoprojector'

import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './Sheet.stories'
const { RightSide } = composeStories(stories)

describe('Sheet', () => {
  it('RightSide', () => {
    const { baseElement } = render(<RightSide {...RightSide.args} />)
    expect(baseElement).toBeTruthy()
  })
})
