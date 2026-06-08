import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Skeleton />)
    expect(baseElement).toBeTruthy()
  })
  it('renders text', () => {
    render(<Skeleton>Send</Skeleton>)
    expect(screen.getByText('Send')).toBeInTheDocument()
  })
})
