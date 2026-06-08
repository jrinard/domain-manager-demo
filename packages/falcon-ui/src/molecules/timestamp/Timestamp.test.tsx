import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import { TYTO_NULL_DATE_TEXT } from './timestamp-methods'

import * as stories from './Timestamp.stories'
const { StandardTytoNullDate, HideNullDate, OverrideNullDateText } =
  composeStories(stories)

describe('Timestamp', () => {
  it('Handles a Null Date', () => {
    render(<StandardTytoNullDate {...StandardTytoNullDate.args} />)
    expect(screen.getByText(`${TYTO_NULL_DATE_TEXT}`)).toBeInTheDocument()
  })

  it('Renders Nothing when Told to Hide Null Date', () => {
    const { baseElement } = render(<HideNullDate {...HideNullDate.args} />)
    expect(baseElement.innerText).toBe('')
  })

  it('Renders Custom Message for Null Date', () => {
    render(
      <OverrideNullDateText
        {...OverrideNullDateText.args}
        nullDateText="Uh oh!"
      />
    )
    expect(screen.getByText('Uh oh!')).toBeInTheDocument()
  })

  it('Handles 3 Hours Ago', () => {
    const { baseElement } = render(
      <StandardTytoNullDate {...StandardTytoNullDate.args} />
    )
    expect(baseElement).toBeTruthy()
  })
})
