import { Icon } from '@spacedock/falcon-ui'
import { render, screen } from '@testing-library/react'
import { expect, describe, it, vi } from 'vitest'

import { SelectUsers } from './SelectUsers'
import * as Tdm from '../../../tests/tdm'

describe('SelectUsers', () => {
  it('renders users', () => {
    render(
      <SelectUsers
        items={[
          Tdm.createUser({ displayName: 'Jean Luc' }),
          Tdm.createUser(),
          Tdm.createUser(),
          Tdm.createUser(),
        ]}
      />
    )
    expect(screen.getByText('Jean Luc')).toBeInTheDocument()
  })
  it('displays search', () => {
    render(
      <SelectUsers
        onSearch={vi.fn()}
        items={[
          Tdm.createUser({ displayName: 'Jean Luc' }),
          Tdm.createUser(),
          Tdm.createUser(),
          Tdm.createUser(),
        ]}
      />
    )
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
  })
  it('does not display search', () => {
    render(
      <SelectUsers
        items={[
          Tdm.createUser({ displayName: 'Jean Luc' }),
          Tdm.createUser(),
          Tdm.createUser(),
          Tdm.createUser(),
        ]}
      />
    )
    expect(screen.queryByPlaceholderText('Search')).not.toBeInTheDocument()
  })

  it('throws error for using two incompatible properties', () => {
    expect(() => {
      render(
        <SelectUsers
          selectedIcon="chevron-right"
          trailingIconBuilder={(user, isSelected) => {
            return <Icon icon="check" />
          }}
          items={[Tdm.createUser({ displayName: 'Jean Luc' })]}
        />
      )
    }).toThrowError(
      'trailingIconBuilder and selectedIcon cannot both be defined'
    )
  })
})
