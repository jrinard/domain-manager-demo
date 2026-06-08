import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { TextLabel } from './TextLabel'

describe('TextLabel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextLabel />)
    expect(baseElement).toBeTruthy()
  })
  it('renders text', () => {
    render(<TextLabel>Send</TextLabel>)
    expect(screen.getByText('Send')).toBeInTheDocument()
  })
})
