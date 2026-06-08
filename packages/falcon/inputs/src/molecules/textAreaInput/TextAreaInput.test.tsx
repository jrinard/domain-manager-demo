import { render, screen } from '@testing-library/react'
import { expect, describe, it, vi } from 'vitest'

import { TextAreaInput } from './TextAreaInput'

describe('TextArea', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextAreaInput />)
    expect(baseElement).toBeTruthy()
  })
  it('renders text', () => {
    render(<TextAreaInput value="Message to a friend" onChange={vi.fn()} />)
    expect(screen.getByText('Message to a friend')).toBeInTheDocument()
  })
})
