import { render } from '@spacedock/holoprojector'
import { screen } from '@testing-library/react'

import { expect, describe, it } from 'vitest'

import { composeStories } from '@storybook/react'

import * as stories from './BAAllEvents.stories'
const { Default } = composeStories(stories)

describe('BAAllEvents', () => {
  it('Default', () => {
    const { baseElement } = render(<Default {...Default.args} />)
    expect(baseElement).toBeTruthy()
    expect(screen.queryByLabelText('loading')).toBeFalsy()
    expect(screen.findAllByText(`Johann's Test Event #2`)).toBeTruthy()
  })
})
