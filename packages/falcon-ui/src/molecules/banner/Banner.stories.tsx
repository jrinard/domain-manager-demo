import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { faker } from '@faker-js/faker/locale/en'

import { Button } from '../button/Button'

import { Banner } from './Banner'

const meta: Meta<typeof Banner> = {
  title: 'DL: Falcon/Molecules/Banner',
  component: Banner,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Banner>

/*
 *👇 Render functions are a framework specific feature to allow you control over how the component renders.
 * See https://storybook.js.org/docs/react/api/csf to learn how to use render functions.
 */
export const error: Story = {
  args: {
    preset: 'error',
  },
  argTypes: {
    preset: {
      options: ['error', 'failed', 'future', 'info', 'success', 'warn'],
      control: { type: 'select' },
    },
  },
  render: ({ preset }) => (
    <Banner
      preset={preset}
      bodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    />
  ),
}

export const failed: Story = {
  render: () => (
    <Banner
      preset="failed"
      bodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    />
  ),
}

export const failedWithAction: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Fail banner with action button _(any button provided will be forced to a primary button)_.',
      },
    },
  },
  render: () => (
    <Banner
      preset="failed"
      bodyText={faker.lorem.paragraphs({ min: 1, max: 3 })}
      action={<Button>Button</Button>}
    />
  ),
}

export const future: Story = {
  render: () => (
    <Banner
      preset="future"
      bodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    />
  ),
}

export const futureWithAction: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Future banner with action button _(any button provided will be forced to a primary button)_.',
      },
    },
  },
  render: () => (
    <Banner
      preset="future"
      bodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      action={<Button>Button</Button>}
    />
  ),
}

export const warningSmall: Story = {
  render: () => (
    <Banner
      preset="warn"
      size="small"
      headerText="This is a Warning"
      bodyText="But everything is smaller, because size='small' was passed in props"
    />
  ),
}

export const info: Story = {
  render: () => (
    <Banner
      preset="info"
      bodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    />
  ),
}

export const success: Story = {
  render: () => (
    <Banner
      preset="success"
      bodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    />
  ),
}

export const warning: Story = {
  render: () => (
    <Banner
      preset="warn"
      bodyText="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    />
  ),
}
