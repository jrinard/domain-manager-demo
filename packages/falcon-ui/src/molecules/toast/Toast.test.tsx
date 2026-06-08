import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { Toast } from './Toast'
import { ToastProvider, ToastViewport } from './Toaster'
import * as React from 'react'

describe('Toast', () => {
  it('renders text', () => {
    render(
      <ToastProvider>
        <Toast>Send</Toast>
        <ToastViewport />
      </ToastProvider>
    )
    expect(screen.getByText('Send')).toBeInTheDocument()
  })
})
