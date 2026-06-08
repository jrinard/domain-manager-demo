import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { Surface } from './Surface'

describe('Surface', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Surface />)
    expect(baseElement).toBeTruthy()
  })
  it('renders text', () => {
    render(<Surface>Send</Surface>)
    expect(screen.getByText('Send')).toBeInTheDocument()
  })
})
