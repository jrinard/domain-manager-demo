import React from 'react'
import { withFalcon } from '@spacedock/holoprojector'
import { createFormFactory } from '@tanstack/react-form'
import type { Meta, StoryObj } from '@storybook/react'
import { ComboBoxInputField } from './ComboBoxInputField'

const meta: Meta<typeof ComboBoxInputField> = {
  title: 'DL: Falcon/Form/ComboBox Input Field',
  component: ComboBoxInputField,
  tags: ['autodocs'],
  decorators: [withFalcon()],
}

export default meta
type Story = StoryObj<typeof ComboBoxInputField>

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'labeled',
      },
    },
  },
  render: () => {
    const formFactory = createFormFactory<{
      status: 'error' | 'success' | 'warning'
    }>()
    const form = formFactory.useForm({
      defaultValues: {
        status: 'warning',
      },
    })
    return (
      <form.Provider>
        <form.Field
          name="status"
          children={(field) => {
            return (
              <ComboBoxInputField
                label="Status"
                field={field}
                data-testid="fieldinput"
                items={[
                  { value: 'error', item: 'Error' },
                  { value: 'success', item: 'Success' },
                  { value: 'warning', item: 'Warning' },
                ]}
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
        story: 'labeled',
      },
    },
  },
  render: () => {
    const formFactory = createFormFactory<{
      status: 'error' | 'success' | 'warning'
    }>()
    const form = formFactory.useForm({
      defaultValues: {
        status: 'warning',
      },
    })
    return (
      <form.Provider>
        <form.Field
          name="status"
          children={(field) => {
            return (
              <ComboBoxInputField
                isLoadingItems
                label="Status"
                field={field}
                data-testid="fieldinput"
                items={[
                  { value: 'error', item: 'Error' },
                  { value: 'success', item: 'Success' },
                  { value: 'warning', item: 'Warning' },
                ]}
              />
            )
          }}
        />
      </form.Provider>
    )
  },
}
