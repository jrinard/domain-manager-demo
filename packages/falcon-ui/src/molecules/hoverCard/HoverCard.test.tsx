import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { HoverCard } from './HoverCard'

describe('HoverCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HoverCard />)
    expect(baseElement).toBeTruthy()
  })
  it('renders text', () => {
    render(<HoverCard>Send</HoverCard>)
    expect(screen.getByText('Send')).toBeInTheDocument()
  })
})
