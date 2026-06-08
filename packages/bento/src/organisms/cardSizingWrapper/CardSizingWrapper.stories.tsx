import type { Meta, StoryObj } from '@storybook/react'

import { Grid } from '../grid/Grid'
import { CardSizingWrapper } from './CardSizingWrapper'

const meta: Meta<typeof CardSizingWrapper> = {
  title: 'Bento/Organisms/Card Sizing Wrapper',
  component: CardSizingWrapper,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CardSizingWrapper>

export const Standard: Story = {
  args: {
    columnSpan: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Sizes a Child Card in a Grid',
      },
    },
    design: {
      type: 'figma',
      url: '',
    },
  },
  render: ({ columnSpan, rowSpan, ...props }) => (
    <Grid>
      <CardSizingWrapper columnSpan={columnSpan} rowSpan={rowSpan} {...props}>
        <div
          className="flex items-center justify-center bg-orange-500"
          style={{ height: '80px' }}
        >
          Spanning {columnSpan}
        </div>
      </CardSizingWrapper>
    </Grid>
  ),
}
