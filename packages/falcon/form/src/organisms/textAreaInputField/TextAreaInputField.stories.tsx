import { createFormFactory } from '@tanstack/react-form'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { TextAreaInputField } from './TextAreaInputField'

const meta: Meta<typeof TextAreaInputField> = {
  title: 'DL: Falcon/Form/TextAreaInputField',
  component: TextAreaInputField,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TextAreaInputField>

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Text Area Input Field with label',
      },
    },
  },
  render: () => {
    const formFactory = createFormFactory<{
      notes: string
    }>()
    const form = formFactory.useForm({
      defaultValues: {
        notes: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et malesuada fames ac turpis. Consequat nisl vel pretium lectus quam id leo in vitae. Risus feugiat in ante metus dictum at tempor. Erat nam at lectus urna. Et malesuada fames ac turpis egestas maecenas pharetra convallis posuere. Enim neque volutpat ac tincidunt. Sed libero enim sed faucibus. Turpis massa sed elementum tempus egestas sed sed risus pretium. Sit amet luctus venenatis lectus magna fringilla urna porttitor. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Tellus integer feugiat scelerisque varius morbi enim. Mi ipsum faucibus vitae aliquet. Morbi tincidunt augue interdum velit. Consectetur adipiscing elit ut aliquam. Fermentum posuere urna nec tincidunt praesent semper feugiat. Massa tempor nec feugiat nisl. Pretium fusce id velit ut tortor pretium viverra suspendisse. Non curabitur gravida arcu ac.`,
      },
    })
    return (
      <form.Provider>
        <form.Field
          name="notes"
          children={(field) => {
            return (
              <TextAreaInputField
                label="Notes"
                field={field}
                data-testid="notes-input"
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
        story: 'Data for input is loading',
      },
    },
  },
  render: () => {
    const formFactory = createFormFactory<{
      notes: string
    }>()
    const form = formFactory.useForm({
      defaultValues: {
        notes: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et malesuada fames ac turpis. Consequat nisl vel pretium lectus quam id leo in vitae. Risus feugiat in ante metus dictum at tempor. Erat nam at lectus urna. Et malesuada fames ac turpis egestas maecenas pharetra convallis posuere. Enim neque volutpat ac tincidunt. Sed libero enim sed faucibus. Turpis massa sed elementum tempus egestas sed sed risus pretium. Sit amet luctus venenatis lectus magna fringilla urna porttitor. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Tellus integer feugiat scelerisque varius morbi enim. Mi ipsum faucibus vitae aliquet. Morbi tincidunt augue interdum velit. Consectetur adipiscing elit ut aliquam. Fermentum posuere urna nec tincidunt praesent semper feugiat. Massa tempor nec feugiat nisl. Pretium fusce id velit ut tortor pretium viverra suspendisse. Non curabitur gravida arcu ac.`,
      },
    })
    return (
      <form.Provider>
        <form.Field
          name="notes"
          children={(field) => {
            return (
              <TextAreaInputField
                isLoading
                label="Notes"
                field={field}
                data-testid="notes-input"
              />
            )
          }}
        />
      </form.Provider>
    )
  },
}
