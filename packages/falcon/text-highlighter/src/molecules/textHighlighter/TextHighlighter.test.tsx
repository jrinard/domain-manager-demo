import { render } from '@spacedock/holoprojector'
import { screen } from '@testing-library/react'

import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './TextHighlighter.stories'
const { HighlightsText } = composeStories(stories)

describe('TextHighlighter', () => {
  it('Highlightstext', () => {
    const { baseElement } = render(<HighlightsText {...HighlightsText.args} />)
    expect(baseElement).toBeTruthy()
    expect(screen.getByText(/This/i)).toBeTruthy()
  })
})
