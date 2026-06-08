import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { TextSubHeading } from './TextSubHeading'

describe('TextSubHeading', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextSubHeading />)
    expect(baseElement).toBeTruthy()
  })
  it('renders text', () => {
    render(<TextSubHeading>Send</TextSubHeading>)
    expect(screen.getByText('Send')).toBeInTheDocument()
  })
})
