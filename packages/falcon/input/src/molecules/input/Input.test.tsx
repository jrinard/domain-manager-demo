import { render } from '@spacedock/holoprojector'
import { screen } from '@testing-library/react'
import { expect, describe, it, vi } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('renders without requiring properties', () => {
    const { baseElement } = render(<Input />)
    expect(baseElement).toBeTruthy()
  })
  it('renders value', () => {
    const onChange = vi.fn()
    render(
      <Input aria-label="name" type="text" value="Mario" onChange={onChange} />
    )
    expect(screen.getByLabelText('name')).toHaveProperty('value', 'Mario')
  })
})
