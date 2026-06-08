import { render, screen } from '@testing-library/react'
import { expect, describe, it, vi } from 'vitest'

import { TextArea } from './TextArea'

describe('TextArea', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextArea />)
    expect(baseElement).toBeTruthy()
  })
  it('renders text', () => {
    render(<TextArea value="Message to a friend" onChange={vi.fn()} />)
    expect(screen.getByText('Message to a friend')).toBeInTheDocument()
  })
})
