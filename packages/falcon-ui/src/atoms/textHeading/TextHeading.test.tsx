import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { TextHeading } from './TextHeading'

describe('TextHeading', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextHeading />)
    expect(baseElement).toBeTruthy()
  })
  it('renders text', () => {
    render(<TextHeading>Send</TextHeading>)
    expect(screen.getByText('Send')).toBeInTheDocument()
  })
})
