import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { Label } from './Label'

describe('Label', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Label />)
    expect(baseElement).toBeTruthy()
  })
  it('renders text', () => {
    render(<Label>Send</Label>)
    expect(screen.getByText('Send')).toBeInTheDocument()
  })
})
