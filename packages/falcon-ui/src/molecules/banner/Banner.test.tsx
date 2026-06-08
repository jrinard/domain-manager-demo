import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { Banner } from './Banner'

describe('Banner', () => {
  it('renders header text', () => {
    render(<Banner preset="failed" headerText="Title here" />)
    expect(screen.getByText('Title here')).toBeInTheDocument()
  })
  it('renders header text with : when preset error', () => {
    render(<Banner preset="error" headerText="Title here" />)
    expect(screen.getByText('Title here:')).toBeInTheDocument()
  })
})
