import type { Meta, StoryObj } from '@storybook/react'

import { ComboBox } from './ComboBox'

const meta: Meta<typeof ComboBox> = {
  title: 'DL: Falcon/Molecules/ComboBox',
  component: ComboBox,
  tags: ['autodocs'],
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
}

export default meta
type Story = StoryObj<typeof ComboBox>

export const StringItems: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Items item property passed as strings',
      },
    },
  },
  render: (props) => {
    return (
      <ComboBox
        {...props}
        value={'1'}
        items={[
          { value: '1', item: 'John Doe' },
          { value: '2', item: 'Jane Doe' },
        ]}
      />
    )
  },
}

export const ElementItems: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Items passed use elements',
      },
    },
  },
  render: (props) => {
    return (
      <ComboBox
        {...props}
        value={'2'}
        items={[
          { value: '1', item: <li className="text-info">Info</li> },
          { value: '2', item: <li className="text-success">Success</li> },
          { value: '3', item: <li className="text-error">Error</li> },
          { value: '4', item: <li className="text-warn">Warn</li> },
          { value: '5', item: <li className="text-future">Future</li> },
        ]}
      />
    )
  },
}

export const TriggerIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Change the right side / trailing icon ("trigger icon")',
      },
    },
  },
  render: (props) => {
    return (
      <ComboBox
        {...props}
        triggerIcon="unfold-more-horizontal"
        value="1"
        items={[
          { value: '1', item: 'John Doe' },
          { value: '2', item: 'Jane Doe' },
        ]}
      />
    )
  },
}

export const WithSearch: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Includes search',
      },
    },
  },
  render: () => {
    return (
      <ComboBox
        includeSearch
        value={'4'}
        items={[
          { value: '1', item: <li className="text-info">Info</li> },
          { value: '2', item: <li className="text-success">Success</li> },
          { value: '3', item: <li className="text-error">Error</li> },
          { value: '4', item: <li className="text-warn">Warn</li> },
          { value: '5', item: <li className="text-future">Future</li> },
        ]}
      />
    )
  },
}

export const Fill: Story = {
  render: (props) => {
    return (
      <ComboBox
        {...props}
        fill
        value="1"
        items={[
          { value: '1', item: 'John Doe' },
          { value: '2', item: 'Jane Doe' },
        ]}
      />
    )
  },
}

export const IsLoadingItems: Story = {
  parameters: {
    docs: {
      description: {
        story: 'When the items are loading',
      },
    },
  },
  render: (props) => {
    return (
      <ComboBox
        {...props}
        isLoadingItems
        items={[
          { value: '1', item: 'John Doe' },
          { value: '2', item: 'Jane Doe' },
        ]}
      />
    )
  },
}
