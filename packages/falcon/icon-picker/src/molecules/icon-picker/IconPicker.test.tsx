import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { IconPicker } from './IconPicker'

describe('IconPicker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IconPicker />)
    expect(baseElement).toBeTruthy()
  })

  it('renders "Choose Icon" text when no icon selected', () => {
    render(<IconPicker />)
    expect(screen.getByText('Choose Icon')).toBeInTheDocument()
  })
})
