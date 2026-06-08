import { render } from '@spacedock/holoprojector'
import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './TeamTree.stories'
const { TeamTreeOnly } = composeStories(stories)

describe('TeamTree', () => {
  it('should render story TeamTree', () => {
    const { baseElement } = render(<TeamTreeOnly {...TeamTreeOnly.args} />)
    expect(baseElement).toBeTruthy()
  })
})
