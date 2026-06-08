import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { StatsCount } from './StatsCount'

const meta: Meta<typeof StatsCount> = {
  title: 'Domain Ui/Molecules/Stats Count',
  component: StatsCount,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A flexible statistics card component that displays key metrics with optional icons, subtitles, and trend indicators.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'The main statistic value to display',
    },
    title: {
      control: 'text',
      description: 'The title/label for the statistic',
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle for additional context',
    },
    iconColorScheme: {
      control: 'select',
      options: ['blue', 'green', 'purple', 'yellow', 'orange', 'red', 'gray'],
      description: 'Color scheme for the icon background',
    },
    iconSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the icon',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the card',
    },
    variant: {
      control: 'select',
      options: ['default', 'dark', 'elevated'],
      description: 'Visual variant of the card',
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state with skeleton animation',
    },
  },
}

export default meta
type Story = StoryObj<typeof StatsCount>

// Example icons (in real use, these would come from an icon library)
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path
      fillRule="evenodd"
      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
      clipRule="evenodd"
    />
  </svg>
)

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path
      fillRule="evenodd"
      d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h9a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25H12v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-.977-3.827 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744z"
      clipRule="evenodd"
    />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      clipRule="evenodd"
    />
  </svg>
)

const VideoIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path d="m15 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53L15 13.5v-3Z" />
    <path d="M4.5 5.25a3 3 0 0 0-3 3v7.5a3 3 0 0 0 3 3h7.5a3 3 0 0 0 3-3v-7.5a3 3 0 0 0-3-3H4.5Z" />
  </svg>
)

export const ActiveEmployees: Story = {
  args: {
    title: 'Active Employees',
    value: '42',
    subtitle: '48 total employees',
    icon: <UserIcon />,
    iconColorScheme: 'blue',
    change: {
      value: '5%',
      trend: 'positive',
      period: 'vs last month',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example of an Active Employees statistics card matching the first image.',
      },
    },
  },
}

export const LearningSeriesCompleted: Story = {
  args: {
    title: 'Learning Series Completed',
    value: '8',
    subtitle: '15 in progress',
    icon: <TrophyIcon />,
    iconColorScheme: 'green',
    change: {
      value: '2%',
      trend: 'positive',
      period: 'vs last month',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example of a Learning Series Completed statistics card matching the second image.',
      },
    },
  },
}

export const CoursesCompleted: Story = {
  args: {
    title: 'Courses Completed',
    value: '156',
    subtitle: '43 in progress',
    icon: <CheckIcon />,
    iconColorScheme: 'purple',
    change: {
      value: '12%',
      trend: 'positive',
      period: 'vs last month',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example of a Courses Completed statistics card matching the third image.',
      },
    },
  },
}

export const LiveCallTrainingVideos: Story = {
  args: {
    title: 'Live Call Training Videos Watched',
    value: '89 videos',
    subtitle: '234h watched',
    icon: <VideoIcon />,
    iconColorScheme: 'yellow',
    change: {
      value: '18%',
      trend: 'positive',
      period: 'vs last month',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example of a Live Call Training Videos statistics card matching the fourth image.',
      },
    },
  },
}

export const AllVariantsGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 bg-gray-50 p-6 md:grid-cols-2 lg:grid-cols-4">
      <StatsCount
        title="Active Employees"
        value="42"
        subtitle="48 total employees"
        icon={<UserIcon />}
        iconColorScheme="blue"
        change={{
          value: '5%',
          trend: 'positive',
          period: 'vs last month',
        }}
      />
      <StatsCount
        title="Learning Series Completed"
        value="8"
        subtitle="15 in progress"
        icon={<TrophyIcon />}
        iconColorScheme="green"
        change={{
          value: '2%',
          trend: 'positive',
          period: 'vs last month',
        }}
      />
      <StatsCount
        title="Courses Completed"
        value="156"
        subtitle="43 in progress"
        icon={<CheckIcon />}
        iconColorScheme="purple"
        change={{
          value: '12%',
          trend: 'positive',
          period: 'vs last month',
        }}
      />
      <StatsCount
        title="Live Call Training Videos Watched"
        value="89 videos"
        subtitle="234h watched"
        icon={<VideoIcon />}
        iconColorScheme="yellow"
        change={{
          value: '18%',
          trend: 'positive',
          period: 'vs last month',
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All four example statistics cards displayed in a grid layout, matching your provided images.',
      },
    },
  },
}

export const WithNegativeTrend: Story = {
  args: {
    title: 'Completion Rate',
    value: '67%',
    subtitle: '12 incomplete',
    icon: <CheckIcon />,
    iconColorScheme: 'red',
    change: {
      value: '3%',
      trend: 'negative',
      period: 'vs last month',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with a negative trend indicator.',
      },
    },
  },
}

export const Loading: Story = {
  args: {
    title: 'Active Employees',
    value: '42',
    subtitle: '48 total employees',
    icon: <UserIcon />,
    iconColorScheme: 'blue',
    isLoading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state with skeleton animation.',
      },
    },
  },
}

export const DarkVariant: Story = {
  args: {
    title: 'Active Employees',
    value: '42',
    subtitle: '48 total employees',
    icon: <UserIcon />,
    iconColorScheme: 'blue',
    variant: 'dark',
    change: {
      value: '5%',
      trend: 'positive',
      period: 'vs last month',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Dark variant of the statistics card.',
      },
    },
  },
}

export const Clickable: Story = {
  args: {
    title: 'Active Employees',
    value: '42',
    subtitle: '48 total employees',
    icon: <UserIcon />,
    iconColorScheme: 'blue',
    onClick: () => alert('Card clicked!'),
    change: {
      value: '5%',
      trend: 'positive',
      period: 'vs last month',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive card with click handler (try clicking it!).',
      },
    },
  },
}

export const SmallSize: Story = {
  args: {
    title: 'Active Employees',
    value: '42',
    subtitle: '48 total employees',
    icon: <UserIcon />,
    iconColorScheme: 'blue',
    iconSize: 'sm',
    size: 'sm',
    change: {
      value: '5%',
      trend: 'positive',
      period: 'vs last month',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Small size variant of the statistics card.',
      },
    },
  },
}

export const LargeSize: Story = {
  args: {
    title: 'Active Employees',
    value: '42',
    subtitle: '48 total employees',
    icon: <UserIcon />,
    iconColorScheme: 'blue',
    iconSize: 'lg',
    size: 'lg',
    change: {
      value: '5%',
      trend: 'positive',
      period: 'vs last month',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Large size variant of the statistics card.',
      },
    },
  },
}
