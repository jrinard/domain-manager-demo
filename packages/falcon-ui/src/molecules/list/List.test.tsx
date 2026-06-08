import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { List } from './List'

describe('List', () => {
  it('renders items', () => {
    render(
      <List<{ label: string }>
        items={[{ label: 'Label 1' }, { label: 'Label 2' }]}
        itemBuilder={(item, isSelected) => (
          <li key={item.label}>{item.label}</li>
        )}
      />
    )
    expect(screen.getByText('Label 2')).toBeInTheDocument()
  })
})
