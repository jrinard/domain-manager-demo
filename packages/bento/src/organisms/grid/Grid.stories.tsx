import type { Meta, StoryObj } from '@storybook/react'

import { Grid } from './Grid'

const meta: Meta<typeof Grid> = {
  title: 'Bento/Organisms/Grid',
  component: Grid,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Grid>

export const Standard: Story = {
  args: {
    columns: 12,
    className: 'w-full',
    style: { height: '400px', backgroundColor: '#1a202c', padding: '20px' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Renders Some Cards',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ columns, ...props }) => (
    <Grid columns={columns} {...props}>
      <div className="col-span-3 rounded-lg bg-orange-500">01</div>
      <div className="col-span-5 rounded-lg bg-orange-800">02</div>
      <div className="col-span-4 rounded-lg bg-lime-500">03</div>
      <div className="col-span-8 rounded-lg bg-teal-800">04</div>
    </Grid>
  ),
}

export const DefinedAreas: Story = {
  args: {
    columns: 12,
    className: 'w-full',
    style: {
      height: '400px',
      backgroundColor: '#1a202c',
      padding: '20px',
    },
    areasByName: [
      [...repeatName('one', 6), ...repeatName('two', 6)],
      [
        ...repeatName('three', 3),
        ...repeatName('four', 4),
        ...repeatName('five', 3),
        ...repeatName('six', 2),
      ],
      [
        ...repeatName('seven', 3),
        ...repeatName('four', 4),
        ...repeatName('eight', 1),
        ...repeatName('nine', 4),
      ],
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Renders Some Cards',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ areasByName, columns, ...props }) => (
    <Grid columns={columns} areasByName={areasByName} {...props}>
      <div className="rounded-lg bg-orange-500" style={{ gridArea: 'one' }}>
        01
      </div>
      <div className="rounded-lg bg-orange-800" style={{ gridArea: 'two' }}>
        02
      </div>
      <div className="rounded-lg bg-lime-500" style={{ gridArea: 'three' }}>
        03
      </div>
      <div className="rounded-lg bg-teal-800" style={{ gridArea: 'four' }}>
        04
      </div>
      <div className="rounded-lg bg-teal-400" style={{ gridArea: 'five' }}>
        05
      </div>
      <div className="bg-grayscale-800 rounded-lg" style={{ gridArea: 'six' }}>
        06
      </div>
      <div
        className="bg-grayscale-300 rounded-lg"
        style={{ gridArea: 'seven' }}
      >
        07
      </div>
      <div className="rounded-lg bg-red-800" style={{ gridArea: 'eight' }}>
        08
      </div>
      <div className="rounded-lg bg-red-400" style={{ gridArea: 'nine' }}>
        09
      </div>
    </Grid>
  ),
}

function repeatName<NameLiteral extends string>(
  name: NameLiteral,
  quantity = 2,
): NameLiteral[] {
  return new Array(quantity).fill(name)
}
