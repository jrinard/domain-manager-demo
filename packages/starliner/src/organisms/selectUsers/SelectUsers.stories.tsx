import { Icon } from '@falcon/icons'
import { useToggleSelectItems } from '@spacedock/cargo-bay'
import { noop, times } from 'lodash'
import React, { useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { User } from '../../data/user'

import { SelectUsers, SelectUsersProps } from './SelectUsers'
import * as Tdm from '../../../tests/tdm'

const meta: Meta<typeof SelectUsers> = {
  title: 'Starliner/Organisms/Select Users',
  component: SelectUsers,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SelectUsers>
export const Populated: Story = {
  args: {
    items: times<User>(12, (index) => {
      return Tdm.createUser()
    }),
  },
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: (props) => <SelectUsers {...props} onSearch={undefined} />,
}

export const IsLoading: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: () => <SelectUsers onSelect={noop} isLoading items={[]} />,
}

const StatefulSearch = (props: SelectUsersProps) => {
  const [items, setItems] = useState<User[]>([])
  const onSearch = (value: string | undefined) => {
    if (value === undefined) {
      setItems([])
      return
    }
    setItems(
      [
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
        Tdm.createUser(),
      ].filter((user) => user.displayName.includes(value))
    )
  }
  return <SelectUsers {...props} onSearch={onSearch} items={items} />
}
export const Search: Story = {
  parameters: {
    docs: {
      description: {
        story: 'With a search bar',
      },
    },
  },
  render: (props) => <StatefulSearch {...props} />,
}

export const SelectedIcon: Story = {
  args: {
    selectedIcon: 'close',
  },
  parameters: {
    docs: {
      description: {
        story: 'Set selected icon',
      },
    },
  },
  render: (props) => {
    const items = times<User>(12, (index) => {
      return Tdm.createUser()
    })
    return (
      <SelectUsers
        {...props}
        selectedItems={[items[0], items[2]]}
        items={items}
        onSearch={undefined}
      />
    )
  },
}

export const TrailingIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Set a custom trailing icon with modes',
      },
    },
  },
  render: (props) => {
    const users = times<User>(12, (index) => {
      return Tdm.createUser()
    })
    return (
      <SelectUsers
        {...props}
        selectedItems={[users[0], users[2]]}
        items={users}
        trailingIconBuilder={(user, isSelected) => {
          return isSelected ? <Icon icon="close" /> : <Icon icon="plus" />
        }}
        onSearch={undefined}
      />
    )
  },
}

const StatefulSelectedItems = ({
  numberOfItems,
}: {
  numberOfItems: number
}) => {
  const items = useMemo(
    () =>
      times<User>(numberOfItems, (index) => {
        return Tdm.createUser()
      }),
    [numberOfItems]
  )
  const [selected, setSelected] = useToggleSelectItems<User>()
  return (
    <SelectUsers
      items={items}
      selectedItems={selected}
      onSelect={setSelected}
    />
  )
}
export const SelectedItems: StoryObj<{ numberOfItems: number }> = {
  args: {
    numberOfItems: 12,
  },
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: ({ numberOfItems }) => (
    <StatefulSelectedItems numberOfItems={numberOfItems} />
  ),
}

export const Limit: Story = {
  args: {
    limit: 3,
    items: [
      Tdm.createUser(),
      Tdm.createUser(),
      Tdm.createUser(),
      Tdm.createUser(),
      Tdm.createUser(),
      Tdm.createUser(),
      Tdm.createUser(),
      Tdm.createUser(),
      Tdm.createUser(),
      Tdm.createUser(),
      Tdm.createUser(),
      Tdm.createUser(),
      Tdm.createUser(),
      Tdm.createUser(),
      Tdm.createUser(),
      Tdm.createUser(),
      Tdm.createUser(),
      Tdm.createUser(),
      Tdm.createUser(),
      Tdm.createUser(),
    ],
  },
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    docs: {
      description: {
        story: '',
      },
    },
  },
  render: (props) => (
    <SelectUsers {...props} items={props.items} onSelect={props.onSelect} />
  ),
}
