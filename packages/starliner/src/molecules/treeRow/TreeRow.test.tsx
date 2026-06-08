import { render } from '@spacedock/holoprojector'
import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './TreeRow.stories'
const { RowItem } = composeStories(stories)

describe('TreeRow', () => {
  it('should render RowItem', () => {
    const { baseElement } = render(<RowItem {...RowItem.args} />)
    expect(baseElement).toBeTruthy()
  })
})
