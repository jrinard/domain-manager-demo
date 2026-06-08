import { createFormFactory } from '@tanstack/react-form'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { TextInputField } from './TextInputField'

const meta: Meta<typeof TextInputField> = {
  title: 'DL: Falcon/Form/TextInputField',
  component: TextInputField,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TextInputField>

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Text Input Field with label',
      },
    },
  },
  render: () => {
    const formFactory = createFormFactory<{
      title: string
    }>()
    const form = formFactory.useForm({
      defaultValues: {
        title: `Lorem ipsum`,
      },
    })
    return (
      <form.Provider>
        <form.Field
          name="title"
          children={(field) => {
            return (
              <TextInputField label="title" field={field} data-testid="title" />
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
        story: 'When loading data for input',
      },
    },
  },
  render: () => {
    const formFactory = createFormFactory<{
      title: string
    }>()
    const form = formFactory.useForm({
      defaultValues: {
        title: `Lorem ipsum`,
      },
    })
    return (
      <form.Provider>
        <form.Field
          name="title"
          children={(field) => {
            return (
              <TextInputField
                isLoading
                label="title"
                field={field}
                data-testid="title"
              />
            )
          }}
        />
      </form.Provider>
    )
  },
}

export const IsLoadingDense: Story = {
  parameters: {
    docs: {
      description: {
        story: 'When loading data for a dense input',
      },
    },
  },
  render: () => {
    const formFactory = createFormFactory<{
      title: string
    }>()
    const form = formFactory.useForm({
      defaultValues: {
        title: `Lorem ipsum`,
      },
    })
    return (
      <form.Provider>
        <form.Field
          name="title"
          children={(field) => {
            return (
              <TextInputField
                dense
                isLoading
                label="title"
                field={field}
                data-testid="title"
              />
            )
          }}
        />
      </form.Provider>
    )
  },
}
