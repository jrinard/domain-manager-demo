import { Button } from '@spacedock/falcon-ui'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { expect, describe, it } from 'vitest'
import * as Tdm from '../../../tests/tdm'

import { UserList } from './UserList'

describe('UserList', () => {
  it('renders users', () => {
    render(
      <UserList
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
  it('renders trailing actions', () => {
    render(
      <UserList
        items={[
          Tdm.createUser({ displayName: 'Jean Luc' }),
          Tdm.createUser(),
          Tdm.createUser(),
          Tdm.createUser(),
        ]}
        trailingBuilder={(user, isSelected) => {
          return (
            <Button size="text" variant="ghost">
              Add
            </Button>
          )
        }}
      />
    )
    expect(screen.queryAllByText('Add')[0]).toBeInTheDocument()
  })
})
