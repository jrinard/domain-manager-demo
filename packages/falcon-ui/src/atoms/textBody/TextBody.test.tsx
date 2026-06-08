import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { TextBody } from './TextBody'

describe('TextBody', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextBody />)
    expect(baseElement).toBeTruthy()
  })
  it('renders text', () => {
    render(<TextBody>Send</TextBody>)
    expect(screen.getByText('Send')).toBeInTheDocument()
  })
})
