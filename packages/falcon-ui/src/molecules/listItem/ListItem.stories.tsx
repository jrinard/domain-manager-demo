import { withRouter } from '@holodeck/router'
import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { ListItem, ListItemMain, ListItemSide } from './ListItem'
import { Icon } from '@falcon/icons'
import { Link } from 'react-router-dom'

const meta: Meta<typeof ListItem> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'DL: Falcon/Molecules/List Item',
  component: ListItem,
  tags: ['autodocs'],
  decorators: [withRouter()],
}

export default meta
type Story = StoryObj<typeof ListItem>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Bare: Story = {
  args: {
    selected: false,
  },
  render: ({ selected }) => <ListItem selected={selected}>Inbox</ListItem>,
}

export const Selected: Story = {
  args: {
    selected: true,
  },
  render: ({ selected }) => <ListItem selected={selected}>Inbox</ListItem>,
}

export const Unselectable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Not disabled but not selectable',
      },
    },
  },
  render: (props) => (
    <ListItem unselectable {...props}>
      Inbox
    </ListItem>
  ),
}

export const IsNew: Story = {
  args: {
    isNew: true,
  },
  render: ({ isNew }) => <ListItem isNew={isNew}>Inbox</ListItem>,
}

export const IsNewAndSelected: Story = {
  args: {
    isNew: true,
    selected: true,
  },
  render: ({ isNew, selected }) => (
    <ListItem isNew={isNew} selected={selected}>
      Inbox
    </ListItem>
  ),
}

export const IsLink: Story = {
  args: {
    selected: false,
  },
  parameters: {
    reactRouter: {
      routePath: '/categories/:id',
      routeParams: { id: 'inbox' },
    },
  },
  render: ({ selected }) => (
    <ListItem selected={selected}>
      <Link to="/categories/inbox">Inbox</Link>
    </ListItem>
  ),
}

export const Disabled: Story = {
  parameters: {
    reactRouter: {
      routePath: '/categories/:id',
      routeParams: { id: 'inbox' },
    },
  },
  render: () => <ListItem disabled>Inbox</ListItem>,
}

const DrawerItemsStateful = () => {
  const [index, setIndex] = useState(0)
  return (
    <ul>
      <ListItem
        selected={index === 0}
        onClick={() => {
          setIndex(0)
        }}
      >
        <ListItemSide>
          <Icon icon="inbox-outline" />
        </ListItemSide>
        <ListItemMain>Inbox</ListItemMain>
      </ListItem>
      <ListItem
        selected={index === 1}
        onClick={() => {
          setIndex(1)
        }}
        isNew
      >
        <ListItemSide>
          <Icon icon="star" />
        </ListItemSide>
        <ListItemMain>New</ListItemMain>
      </ListItem>
      <ListItem
        selected={index === 2}
        onClick={() => {
          setIndex(2)
        }}
      >
        <ListItemSide>
          <Icon icon="pencil-outline" />
        </ListItemSide>
        <ListItemMain>Drafts</ListItemMain>
        <ListItemSide>1</ListItemSide>
      </ListItem>
      <ListItem
        selected={index === 3}
        onClick={() => {
          setIndex(3)
        }}
      >
        <ListItemSide>
          <Icon icon="archive-outline" />
        </ListItemSide>
        <ListItemMain>Archived</ListItemMain>
      </ListItem>
      <ListItem
        selected={index === 4}
        onClick={() => {
          setIndex(4)
        }}
      >
        <ListItemSide>
          <Icon icon="all-outline" />
        </ListItemSide>
        <ListItemMain>All</ListItemMain>
      </ListItem>
    </ul>
  )
}
export const ExampleDrawerItems: Story = {
  render: () => {
    return <DrawerItemsStateful />
  },
}
