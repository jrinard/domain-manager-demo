import { userEvent } from 'storybook/test'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { expect, describe, it, vi } from 'vitest'

import { NumberInput } from './NumberInput'

describe('NumberInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NumberInput />)
    expect(baseElement).toBeTruthy()
  })

  it('should return number set in value', () => {
    const ref = createRef<HTMLInputElement>()
    render(
      <NumberInput
        value="23"
        aria-label="number-input"
        ref={ref}
        onChange={vi.fn()}
      />,
    )
    const input = screen.getByLabelText('number-input')
    expect(ref.current).toHaveProperty('value', '23')
    expect(ref.current?.value).toEqual('23')
    fireEvent.change(input, { target: { value: '11' } })
    expect(ref.current?.value).toEqual('11')
  })

  it('should not be able to set an invalid number', () => {
    const ref = createRef<HTMLInputElement>()
    render(
      <NumberInput
        value="23a"
        aria-label="number-input"
        ref={ref}
        onChange={vi.fn()}
      />,
    )
    const input = screen.getByLabelText('number-input')
    expect(ref.current?.value).toEqual('23')
    fireEvent.change(input, { target: { value: '11-' } })
    expect(ref.current?.value).toHaveProperty('0')
    fireEvent.change(input, { target: { value: '11' } })
    expect(ref.current).toHaveProperty('value', '11')
    fireEvent.change(input, { target: { value: '1s' } })
    expect(ref.current?.value).toEqual('0')
  })

  it('can increment and decrement by arrows', async () => {
    const onChange = vi.fn()
    const ref = createRef<HTMLInputElement>()
    render(
      <NumberInput
        value="20"
        aria-label="number-input"
        step="5"
        ref={ref}
        onChange={onChange}
      />,
    )
    const input = screen.getByLabelText('number-input-increment')
    await act(async () => {
      await userEvent.click(input)
    })
    expect(onChange).toHaveBeenCalledWith(25)
    expect(ref.current?.value).toEqual('25')
  })
})
