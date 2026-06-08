import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { DropdownMenu } from './DropdownMenu'

describe('DropdownMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DropdownMenu />)
    expect(baseElement).toBeTruthy()
  })
  it('renders text', () => {
    render(<DropdownMenu>Send</DropdownMenu>)
    expect(screen.getByText('Send')).toBeInTheDocument()
  })
})
