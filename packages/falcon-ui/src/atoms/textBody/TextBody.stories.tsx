import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { faker } from '@faker-js/faker/locale/en'

import { TextBody, TextBodyProps } from './TextBody'
import {
  SurfaceForStory,
  SurfaceStory,
  SurfaceStoryArgTypes,
} from '@falcon/storybook'

const meta: Meta<typeof TextBody> = {
  title: 'DL: Falcon/Atoms/Text Body',
  component: TextBody,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TextBody>

export const BodyXL: Story = {
  render: (props) => (
    <TextBody {...props} size="xl">
      {faker.lorem.paragraph()}
    </TextBody>
  ),
}

export const BodyL: Story = {
  render: (props) => (
    <TextBody {...props} size="l">
      {faker.lorem.paragraph()}
    </TextBody>
  ),
}

export const BodyM: Story = {
  parameters: {
    docs: {
      description: {
        story: '**default**. This is the default text in our application',
      },
    },
  },
  render: (props) => <TextBody {...props}>{faker.lorem.paragraph()}</TextBody>,
}

export const BodyS: Story = {
  render: (props) => (
    <TextBody {...props} size="s">
      {faker.lorem.paragraph()}
    </TextBody>
  ),
}

export const BodyXS: Story = {
  render: (props) => (
    <TextBody {...props} size="xs">
      {faker.lorem.paragraph()}
    </TextBody>
  ),
}

export const PlainText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Used for disclosures, "the fine print", and legal',
      },
    },
  },
  render: (props) => (
    <TextBody {...props} size="xs">
      {faker.lorem.paragraph()}
    </TextBody>
  ),
}

export const ColorAuto: SurfaceStory<TextBodyProps> = {
  argTypes: {
    ...SurfaceStoryArgTypes,
    onSurface: {
      ...SurfaceStoryArgTypes.onSurface,
      control: {
        type: 'select' as const,
        options: SurfaceStoryArgTypes.onSurface.options,
      },
    },
  },
  args: {
    onSurface: 'light',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example of a TextBody being on a surface using the default "auto" color. Use the storybook panel to change the color',
      },
    },
  },
  render: ({ onSurface, size }) => (
    <SurfaceForStory surface={onSurface}>
      <TextBody>On a {onSurface} surface</TextBody>
    </SurfaceForStory>
  ),
}

export const AsSpan: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '_(Engineer Story)_. Set the property `span` to use any of the body as a `span` instead of a `div`',
      },
    },
  },
  render: (props) => (
    <p>
      <TextBody {...props} span>
        {faker.lorem.word()}&nbsp;{faker.lorem.word()}
      </TextBody>
      <TextBody {...props} span weight="semibold" size="l">
        &nbsp;{faker.lorem.word()}&nbsp;
      </TextBody>
      <TextBody {...props} span>
        {faker.lorem.word()}&nbsp;{faker.lorem.word()}&nbsp;{faker.lorem.word()}
      </TextBody>
    </p>
  ),
}

export const AsParagraph: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '_(Engineer Story)_. Set the property **paragraph** to use any of the body as a `p` instead of a `div` and it has default vertical margin',
      },
    },
  },
  render: (props) => (
    <div>
      <TextBody {...props} paragraph>
        {faker.lorem.word()}&nbsp;{faker.lorem.word()}
      </TextBody>
      <TextBody {...props} paragraph>
        {faker.lorem.paragraph({ min: 10, max: 15 })}
      </TextBody>
      <TextBody {...props} paragraph>
        {faker.lorem.word()}&nbsp;{faker.lorem.word()}&nbsp;{faker.lorem.word()}
      </TextBody>
    </div>
  ),
}

export const Truncate: Story = {
  parameters: {
    docs: {
      description: {
        story: 'text is truncate-able',
      },
    },
  },
  render: (props) => (
    <div className="size-8">
      <TextBody {...props} truncate>
        {faker.lorem.paragraph({ min: 10, max: 15 })}
      </TextBody>
    </div>
  ),
}

export const LineThrough: Story = {
  parameters: {
    docs: {
      description: {
        story: 'text has a line through it',
      },
    },
  },
  render: (props) => (
    <div>
      <TextBody {...props} lineThrough>
        {faker.lorem.word()}
      </TextBody>
    </div>
  ),
}
