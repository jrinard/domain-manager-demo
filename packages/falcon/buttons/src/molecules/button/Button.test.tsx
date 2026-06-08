import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { Button } from './Button'

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Button />)
    expect(baseElement).toBeTruthy()
  })
  it('renders text', () => {
    render(<Button>Send</Button>)
    expect(screen.getByText('Send')).toBeInTheDocument()
  })
})
