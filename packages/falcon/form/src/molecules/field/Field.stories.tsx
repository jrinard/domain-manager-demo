import { DateInput, TextInput } from '@falcon/inputs'
import React from 'react'
import { TooltipProvider, TextBody } from '@spacedock/falcon-ui'
import type { Meta, StoryObj } from '@storybook/react'

import { Field } from './Field'

const meta: Meta<typeof Field> = {
  title: 'DL: Falcon/Form/Molecules/Field',
  component: Field,
  tags: ['autodocs'],
  decorators: [(StoryFn) => <TooltipProvider>{StoryFn()}</TooltipProvider>],
}

export default meta
type Story = StoryObj<typeof Field>

export const Explanation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'What is the purpose',
      },
    },
  },
  render: () => (
    <TextBody>
      Field serves as a foundation for Form Field inputs providing a consistent
      experience for users
    </TextBody>
  ),
}

export const Required: Story = {
  render: () => (
    <Field required name="required-text">
      <TextInput />
    </Field>
  ),
}

export const Errors: Story = {
  render: () => (
    <Field
      errors={['Must be at least 3 characters.', 'Must contain numbers']}
      name="errors-text"
    >
      <TextInput />
    </Field>
  ),
}

export const MetaErrors: Story = {
  render: () => (
    <Field
      meta={{
        isTouched: true,
        isValidating: false,
        touchedErrors: [
          'Must be at least 3 characters.',
          'Must contain numbers',
        ],
        errors: [],
        errorMap: {},
      }}
      name="errors-text"
    >
      <TextInput />
    </Field>
  ),
}

export const IsValidating: Story = {
  render: () => (
    <Field
      meta={{
        isTouched: true,
        isValidating: true,
        touchedErrors: [],
        errors: [],
        errorMap: {},
      }}
      name="validating"
    >
      <TextInput />
    </Field>
  ),
}

export const Dirty: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'According to [here](https://www.c-sharpcorner.com/article/pristine-vs-dirty-touched-vs-untouched-valid-vs-invalid-in-angular/) dirty is "the user has modified the form control but not saved"',
      },
    },
  },
  render: () => (
    <Field dirty name="dirty-text">
      <TextInput />
    </Field>
  ),
}

export const Label: Story = {
  render: () => (
    <Field label="First Name" name="label-text">
      <TextInput />
    </Field>
  ),
}

export const ExampleDateInput: Story = {
  render: () => (
    <Field label="Start Date" name="label-text">
      <DateInput placeholder="Start" />
    </Field>
  ),
}
