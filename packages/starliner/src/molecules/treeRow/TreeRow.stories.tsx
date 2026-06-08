import type { Meta, StoryObj } from '@storybook/react'
import { useSet } from '@spacedock/noonian'

import type { TreeRowProps } from './TreeRow'
import { TreeRow } from './TreeRow'

const TreeRowWrapper = (props: TreeRowProps) => {
  const toggleState = useSet<number>({ initialList: [] })

  const showChildren = toggleState.has(1)

  return (
    <TreeRow
      {...props}
      showChildren={showChildren}
      updateShowChildren={() => toggleState.toggle(1)}
    >
      {showChildren ? props.children : null}
    </TreeRow>
  )
}

const meta: Meta<typeof TreeRow> = {
  title: 'Starliner/Molecules/Tree Row',

  component: TreeRow,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TreeRow>

export const RowItem: Story = {
  args: {
    title: 'Some Row Item Name',
    type: 'team',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic Toggleable Team Row Item without content inside',
      },
    },
  },
  render: ({ ...props }) => <TreeRowWrapper {...props} />,
}

export const RowItemWithoutToggle: Story = {
  args: {
    title: 'Some Row Item Name',
    type: 'team',
    hideIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic Toggleable Team Row Item no toggle icon',
      },
    },
  },
  render: ({ ...props }) => <TreeRowWrapper {...props} />,
}

export const RowWithContentButNoHidingImplemented: Story = {
  args: {
    title: 'Some Domain Name',
    type: 'domain',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic Toggleable Domain Team Row Item with Fake content inside',
      },
    },
  },
  render: ({ ...props }) => (
    <TreeRow {...props}>
      <ul>
        <li>Some Inside Item</li>
        <li>Some Other Inside Item</li>
      </ul>
    </TreeRow>
  ),
}

export const RowWithContentWithHidingImplemented: Story = {
  args: {
    title: 'Some Domain Name',
    type: 'domain',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic Toggleable Domain Team Row Item with Fake content inside',
      },
    },
  },
  render: ({ ...props }) => (
    <TreeRowWrapper {...props}>
      <ul>
        <li>Some Inside Item</li>
        <li>Some Other Inside Item</li>
      </ul>
    </TreeRowWrapper>
  ),
}

export const PersonTeamRowItem: Story = {
  args: {
    title: 'Jane Doe',
    type: 'user',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic Toggleable Person Row Item with Fake content inside',
      },
    },
  },
  render: ({ ...props }) => (
    <TreeRowWrapper {...props}>
      <ul>
        <li>
          SubInfo #1
          <br />
          Information
        </li>
        <li>
          SubInfo #2
          <br />
          Other Information
        </li>
      </ul>
    </TreeRowWrapper>
  ),
}
