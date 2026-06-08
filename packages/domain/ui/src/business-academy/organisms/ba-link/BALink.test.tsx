import { render } from '@spacedock/holoprojector'
import { screen } from '@testing-library/react'

import { expect, describe, it } from 'vitest'

import { composeStories } from '@storybook/react'

import * as stories from './BALink.stories'
const { Default } = composeStories(stories)

describe('BaLink', () => {
  it('Default', () => {
    const { baseElement } = render(<Default {...Default.args} />)
    expect(baseElement).toBeTruthy()
    expect(screen.getByText('Training')).toBeTruthy()
  })
})
