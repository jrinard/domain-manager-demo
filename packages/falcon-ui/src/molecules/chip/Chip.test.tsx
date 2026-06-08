import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { Chip } from './Chip'

describe('Chip', () => {
  it('renders label', () => {
    render(<Chip label="Chris Send" />)
    expect(screen.getByText('Chris Send')).toBeInTheDocument()
  })
})
