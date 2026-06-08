import React from 'react'
import { withFalcon } from '@spacedock/holoprojector'
import { createFormFactory } from '@tanstack/react-form'
import type { Meta, StoryObj } from '@storybook/react'

import { DateInputField } from './DateInputField'

const meta: Meta<typeof DateInputField> = {
  title: 'DL: Falcon/Form/DateInputField',
  component: DateInputField,
  tags: ['autodocs'],
  decorators: [withFalcon()],
}

export default meta
type Story = StoryObj<typeof DateInputField>

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Date Input Field with label set to Start Date',
      },
    },
  },
  render: () => {
    const formFactory = createFormFactory<{
      start: Date
    }>()
    const form = formFactory.useForm({
      defaultValues: {
        start: new Date(),
      },
    })
    return (
      <form.Provider>
        <form.Field
          name="start"
          children={(field) => {
            return (
              <DateInputField
                label="Start Date"
                field={field}
                data-testid="fieldinput"
              />
            )
          }}
        />
      </form.Provider>
    )
  },
}

export const IsLoading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'When the data is not ready to be manipulated or seen',
      },
    },
  },
  render: () => {
    const formFactory = createFormFactory<{
      start: Date
    }>()
    const form = formFactory.useForm({
      defaultValues: {
        start: new Date(),
      },
    })
    return (
      <form.Provider>
        <form.Field
          name="start"
          children={(field) => {
            return (
              <DateInputField
                label="Date"
                field={field}
                data-testid="fieldinput"
                isLoading
              />
            )
          }}
        />
      </form.Provider>
    )
  },
}
