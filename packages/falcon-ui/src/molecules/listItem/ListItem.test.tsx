import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { ListItem } from './ListItem'

describe('ListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ListItem />)
    expect(baseElement).toBeTruthy()
  })
  it('renders text', () => {
    render(<ListItem>Send</ListItem>)
    expect(screen.getByText('Send')).toBeInTheDocument()
  })
})
