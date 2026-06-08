import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { ListGroup } from './ListGroup'

describe('ListGrouped', () => {
  it('renders text', () => {
    render(
      <ListGroup<{ label: string }>
        title="Mine"
        items={[{ label: 'Label 1' }, { label: 'Label 2' }]}
        itemBuilder={(item, isSelected: boolean) => (
          <li key={item.label}>{item.label}</li>
        )}
      />
    )
    expect(screen.getByText('Label 1')).toBeInTheDocument()
  })
})
