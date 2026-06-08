import { render } from '@spacedock/holoprojector'
import { screen } from '@testing-library/react'

import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './Heatmap.stories'
const { StandardHeatMap } = composeStories(stories)

describe('Heatmap', () => {
  it('Renders Dot per DISC Value', () => {
    const { baseElement } = render(
      <StandardHeatMap {...StandardHeatMap.args} />,
    )
    expect(baseElement).toBeTruthy()
    expect(
      screen.getByTestId(
        StandardHeatMap?.args?.discValues?.[0]?.personName || '',
      ),
    ).toBeInTheDocument()
  })
})
