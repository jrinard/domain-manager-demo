import { render } from '@spacedock/holoprojector'
import { userEvent } from 'storybook/test'
import { act, screen as canvas, waitFor } from '@testing-library/react'

import { expect, describe, it } from 'vitest'
import { composeStories } from '@storybook/react'

import * as stories from './RemoveUserConfirmDialog.stories'
const { CustomConfirm, DefaultConfirm } = composeStories(stories)

describe('RemoveUserConfirmDialog', () => {
  it('DefaultConfirm', async () => {
    const { baseElement } = render(<DefaultConfirm {...DefaultConfirm.args} />)
    expect(baseElement).toBeTruthy()
    await act(async () => {
      await userEvent.click(canvas.getByRole('button'))
    })
    await waitFor(() =>
      expect(
        canvas.getByText('Are you sure you want to remove Glen Daniel?'),
      ).toBeInTheDocument(),
    )
  })
  it('CustomConfirm', async () => {
    const { baseElement } = render(<CustomConfirm {...CustomConfirm.args} />)
    expect(baseElement).toBeTruthy()
    await act(async () => {
      await userEvent.click(canvas.getByRole('button'))
    })
    await waitFor(() =>
      expect(
        canvas.getByText(
          'Are you sure you want to remove Glen Daniel from the conversation?',
        ),
      ).toBeInTheDocument(),
    )
  })
})
