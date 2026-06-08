import { render } from '@spacedock/holoprojector'
import { act, fireEvent, screen, waitFor } from '@testing-library/react'

import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './UserSelectComboBox.stories'
const { Populated, IsLoading, Empty } = composeStories(stories)

describe('UserSelectComboBox', () => {
  it(IsLoading.parameters.docs.description.story, async () => {
    render(<IsLoading {...IsLoading.args} />)
    await waitFor(() =>
      expect(screen.queryByText('Select user')).toBeInTheDocument()
    )
    act(() => {
      fireEvent.click(screen.getByText('Select user'))
    })
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
    expect(screen.queryByText('Loading...')).toBeInTheDocument()
  })

  it(Empty.parameters.docs.description.story, async () => {
    render(<Empty {...Empty.args} />)
    await waitFor(() =>
      expect(screen.queryByText('Select user')).toBeInTheDocument()
    )
    act(() => {
      fireEvent.click(screen.getByText('Select user'))
    })
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Loading...')).not.toBeInTheDocument()
  })

  it(Populated.parameters.docs.description.story, async () => {
    render(<Populated {...Populated.args} />)
    await waitFor(() =>
      expect(screen.queryByText('Select user')).toBeInTheDocument()
    )
    act(() => {
      fireEvent.click(screen.getByText('Select user'))
    })
    expect(screen.queryByText('John Doe')).toBeInTheDocument()
    expect(screen.queryByLabelText('Loading...')).not.toBeInTheDocument()
  })
})
