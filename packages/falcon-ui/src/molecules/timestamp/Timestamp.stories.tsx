import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Timestamp } from './Timestamp'

const TYTO_NULL_DATE = '1900-01-01T00:00:00Z'
const MINUTE_AS_MS = 1000 * 60

const getDate = (minutesAgo?: number) => {
  const date = new Date()

  if (minutesAgo) {
    return new Date(+date - minutesAgo * MINUTE_AS_MS)
  }

  return date
}

const daysAsMinutes = (days: number) => {
  return 60 * 24 * days
}

const meta: Meta<typeof Timestamp> = {
  title: 'DL: Falcon/Molecules/Timestamp',

  component: Timestamp,
  tags: ['autodocs'],
}

// * =========================================
// * =========================================

export default meta
type Story = StoryObj<typeof Timestamp>

export const Now: Story = {
  args: {
    color: 'primary',
    date: getDate(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Renders Rights now as a Relative Time',
      },
    },
  },
  render: ({ color, ...props }) => <Timestamp color={color} {...props} />,
}

export const NowNotRelative: Story = {
  args: {
    color: 'primary',
    date: getDate(),
    relativeTimeLanguageBehavior: 'never',
  },
  parameters: {
    docs: {
      description: {
        story: 'Right now as MM/dd/yyyy',
      },
    },
  },
  render: ({ color, ...props }) => <Timestamp color={color} {...props} />,
}

export const ThreeHoursAgo: Story = {
  args: {
    color: 'primary',
    date: getDate(180),
  },
  parameters: {
    docs: {
      description: {
        story: 'Three Hours ago as a Relative Time',
      },
    },
  },
  render: ({ color, ...props }) => <Timestamp color={color} {...props} />,
}

export const ThreeHoursAgoNotRelative: Story = {
  args: {
    color: 'primary',
    date: getDate(180),
    relativeTimeLanguageBehavior: 'never',
  },
  parameters: {
    docs: {
      description: {
        story: 'Three hours ago but as MM/dd/yyyy',
      },
    },
  },
  render: ({ color, ...props }) => <Timestamp color={color} {...props} />,
}

export const Yesterday: Story = {
  args: {
    color: 'primary',
    date: getDate(daysAsMinutes(1)),
  },
  parameters: {
    docs: {
      description: {
        story: 'Yesterday as MM/dd/yyyy',
      },
    },
  },
  render: ({ color, ...props }) => <Timestamp color={color} {...props} />,
}

export const YesterdayWithRelativeTodayOnly: Story = {
  args: {
    color: 'primary',
    date: getDate(daysAsMinutes(1)),
    relativeTimeLanguageBehavior: 'only-today',
  },
  parameters: {
    docs: {
      description: {
        story: 'Yesterday as MM/dd/yyyy, despite prop value change.',
      },
    },
  },
  render: ({ color, ...props }) => <Timestamp color={color} {...props} />,
}

export const YesterdayWithRelativeAllDates: Story = {
  args: {
    color: 'primary',
    date: getDate(daysAsMinutes(1)),
    relativeTimeLanguageBehavior: 'all-dates',
  },
  parameters: {
    docs: {
      description: {
        story: 'Yesterday, forced as Relative',
      },
    },
  },
  render: ({ color, ...props }) => <Timestamp color={color} {...props} />,
}

export const ThirtyDaysAgo: Story = {
  args: {
    color: 'primary',
    date: getDate(daysAsMinutes(30)),
  },
  parameters: {
    docs: {
      description: {
        story: 'Thirty Days ago as MM/dd/yyyy',
      },
    },
  },
  render: ({ color, ...props }) => <Timestamp color={color} {...props} />,
}

export const ThirtyDaysAgoRelativeAllDates: Story = {
  args: {
    color: 'primary',
    date: getDate(daysAsMinutes(30)),
    relativeTimeLanguageBehavior: 'all-dates',
  },
  parameters: {
    docs: {
      description: {
        story: 'Thirty Days ago, forced to be Relative Time',
      },
    },
  },
  render: ({ color, ...props }) => <Timestamp color={color} {...props} />,
}

export const StandardTytoNullDate: Story = {
  args: {
    color: 'primary',
    date: TYTO_NULL_DATE,
  },
  parameters: {
    docs: {
      description: {
        story: 'Rendering the standard "None" message for a Null Date',
      },
    },
  },
  render: ({ color, ...props }) => <Timestamp color={color} {...props} />,
}

export const OverrideNullDateText: Story = {
  args: {
    color: 'primary',
    date: TYTO_NULL_DATE,
    nullDateText: '- N/A -',
  },
  parameters: {
    docs: {
      description: {
        story: 'Rendering a Custom Message for a Null Date',
      },
    },
  },
  render: ({ color, ...props }) => <Timestamp color={color} {...props} />,
}

export const RedNullDate: Story = {
  args: {
    color: 'error',
    date: TYTO_NULL_DATE,
  },
  parameters: {
    docs: {
      description: {
        story: 'Showing a Timestamp as Error Color',
      },
    },
  },
  render: ({ color, ...props }) => <Timestamp color={color} {...props} />,
}

export const HideNullDate: Story = {
  args: {
    date: TYTO_NULL_DATE,
    hideNullDate: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Rendering nothing when Date is a Null Date',
      },
    },
  },
  render: ({ color, ...props }) => <Timestamp color={color} {...props} />,
}
