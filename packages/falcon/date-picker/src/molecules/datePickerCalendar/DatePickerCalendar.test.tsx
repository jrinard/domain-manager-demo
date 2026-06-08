import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { DatePickerCalendar } from './DatePickerCalendar'

describe('DatePickerCalendar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DatePickerCalendar />)
    expect(baseElement).toBeTruthy()
  })
  it('renders text', () => {
    render(<DatePickerCalendar />)
    expect(screen.getByText('Su')).toBeInTheDocument()
  })
})
