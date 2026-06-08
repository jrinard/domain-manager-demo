import { render, screen } from '@testing-library/react'
import { noop } from 'lodash'
import { expect, describe, it } from 'vitest'

import { RadioGroup } from './RadioGroup'

describe('RadioGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RadioGroup
        options={[
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3' },
        ]}
        onChange={noop}
      />
    )
    expect(baseElement).toBeTruthy()
  })
  it('renders text', () => {
    render(
      <RadioGroup
        options={[
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3' },
        ]}
        onChange={noop}
      />
    )
    expect(screen.getByText('One')).toBeInTheDocument()
  })
})
