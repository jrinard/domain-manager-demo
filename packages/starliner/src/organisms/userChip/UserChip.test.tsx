import { render, screen } from '@testing-library/react'
import { expect, describe, it, vi } from 'vitest'

import { UserChip } from './UserChip'

describe('UserChip', () => {
  it('renders displayName', () => {
    render(
      <UserChip
        displayName="Micheal Jordan"
        avatar=""
        onRemoveClick={vi.fn()}
      />
    )
    expect(screen.getByText('Micheal Jordan')).toBeInTheDocument()
  })
})
