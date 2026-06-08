import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { Dialog, DialogFooter } from './Dialog'
import { DialogTitle } from './DialogTitle'
import { DialogHeader } from './DialogHeader'

describe('Dialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Dialog title="Title" open />)
    expect(baseElement).toBeTruthy()
  })
  it('should not allow DialogTitle', () => {
    expect(() =>
      render(
        <Dialog title="Title" open>
          <DialogTitle>Title</DialogTitle>
        </Dialog>
      )
    ).toThrow()
  })
  it('should not allow DialogHeader', () => {
    expect(() =>
      render(
        <Dialog title="Title" open>
          <DialogHeader>Title</DialogHeader>
        </Dialog>
      )
    ).toThrow()
  })
  it('render delete button as a child', async () => {
    render(
      <Dialog title="Title" open>
        <DialogFooter destructiveLabel="Delete" />
      </Dialog>
    )
    const items = await screen.findAllByText('Delete')
    expect(items).toHaveLength(1)
  })
  it('render complete button as a child', async () => {
    render(
      <Dialog title="Title" open>
        <DialogFooter completeLabel="Confirm" />
      </Dialog>
    )
    const items = await screen.findAllByText('Confirm')
    expect(items).toHaveLength(1)
  })
})
