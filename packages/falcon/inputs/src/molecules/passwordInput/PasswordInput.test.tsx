import { render } from '@spacedock/holoprojector'
import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './PasswordInput.stories'
const { PasswordHidden } = composeStories(stories)

describe('PasswordInput', () => {
  it(PasswordHidden.parameters.docs.description.story, () => {
    const { baseElement } = render(<PasswordHidden {...PasswordHidden.args} />)
    expect(baseElement).toBeTruthy()
  })
})
