import { render } from '@spacedock/holoprojector'
import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './CardSizingWrapper.stories'
const { Standard } = composeStories(stories)

describe('CardSizingWrapper', () => {
  it(Standard.parameters.docs.description.story, () => {
    const { baseElement } = render(<Standard {...Standard.args} />)
    expect(baseElement).toBeTruthy()
  })
})
