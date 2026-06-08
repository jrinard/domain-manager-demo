import { act, render, fireEvent, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './Switch.stories'
const { Enabled, Disabled, ProgrammaticallyOn } = composeStories(stories)

describe('Switch', () => {
  it(Enabled.parameters.docs.description.story, () => {
    render(<Enabled {...Enabled.args} />)
    act(() => {
      fireEvent(
        screen.getByRole('switch'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )
    })
    expect(screen.getByRole('switch').getAttribute('aria-checked')).toEqual(
      'true'
    )
  })
  it(Disabled.parameters.docs.description.story, () => {
    render(<Disabled {...Disabled.args} />)
    act(() => {
      fireEvent(
        screen.getByRole('switch'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      )
    })
    expect(screen.getByRole('switch').getAttribute('aria-checked')).toEqual(
      'false'
    )
  })
  it(ProgrammaticallyOn.parameters.docs.description.story, () => {
    render(<ProgrammaticallyOn {...ProgrammaticallyOn.args} />)
    expect(screen.getByRole('switch').getAttribute('aria-checked')).toEqual(
      'true'
    )
  })
})
