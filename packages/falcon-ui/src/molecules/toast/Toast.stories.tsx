import { TextBody } from '../../atoms/textBody/TextBody'
import type { Meta, StoryObj } from '@storybook/react'
import { faker } from '@faker-js/faker/locale/en'

import { useToast } from '../../hooks/useToast'
import { Button } from '@falcon/buttons'

import { Toast, ToastAction } from './Toast'
import { Toaster, ToasterToastProps } from './Toaster'

const meta: Meta<typeof Toast> = {
  title: 'DL: Falcon/Molecules/Toast',
  component: Toast,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        {Story()}
        <Toaster />
      </div>
    ),
  ],
}

export default meta

const ToastOnClick = (props: ToasterToastProps) => {
  const { toast } = useToast()
  return (
    <Button
      onClick={() => {
        toast(props)
      }}
    >
      Show Toast
    </Button>
  )
}
type InteractiveStory = StoryObj<ToasterToastProps>

export const Success: InteractiveStory = {
  args: {
    title: 'Saved Successfully',
  },
  parameters: {
    docs: {
      description: {
        story: 'Successful',
      },
    },
  },
  render: (props) => {
    return <ToastOnClick {...props} variant="success" />
  },
}

export const SuccessWithDescription: InteractiveStory = {
  args: {
    title: 'Success',
  },
  parameters: {
    docs: {
      description: {
        story: 'Successful with a description',
      },
    },
  },
  render: (props) => {
    return (
      <ToastOnClick
        {...props}
        variant="success"
        description={faker.lorem.paragraph()}
      />
    )
  },
}

export const SuccessWithDescriptionAndAction: InteractiveStory = {
  args: {
    title: 'Success',
  },
  parameters: {
    docs: {
      description: {
        story: 'Successful with a description',
      },
    },
  },
  render: (props) => {
    return (
      <ToastOnClick
        {...props}
        variant="success"
        description={faker.lorem.paragraph()}
        action={<ToastAction altText="something">Create Another</ToastAction>}
      />
    )
  },
}

export const Error: InteractiveStory = {
  args: {
    title: 'System down',
  },
  parameters: {
    docs: {
      description: {
        story: 'When an error not directly related to a human/person actions',
      },
    },
  },
  render: (props) => {
    return <ToastOnClick {...props} variant="error" />
  },
}

export const ErrorWithDescription: InteractiveStory = {
  args: {
    title: 'System down',
  },
  parameters: {
    docs: {
      description: {
        story: 'When an error not directly related to a human/person actions',
      },
    },
  },
  render: (props) => {
    return (
      <ToastOnClick
        {...props}
        variant="error"
        description={faker.lorem.paragraph()}
      />
    )
  },
}

export const Failed: InteractiveStory = {
  args: {
    title: 'Validation Error',
  },
  parameters: {
    docs: {
      description: {
        story:
          '**Rules**. Always related to the actions of a person/human. \n' +
          'If the person was not supposed to do an action and did, then a "Failed" message will show up. Once the message is acknowledged, the user can undo their action. \n' +
          'If the person was supposed to do an action and did not, then a "Failed" message will show up. Once the message is acknowledged, the user can do the required action.',
      },
    },
  },
  render: (props) => {
    return <ToastOnClick {...props} variant="failed" />
  },
}

export const FailedWithDescription: InteractiveStory = {
  args: {
    title: 'Requires your attention',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Provide more details to your user as to why their action failed.',
      },
    },
  },
  render: (props) => {
    return (
      <ToastOnClick
        {...props}
        variant="failed"
        description={faker.lorem.paragraph()}
      />
    )
  },
}

export const FailedWithDescriptionAndAction: InteractiveStory = {
  args: {
    title: 'Failed',
  },
  parameters: {
    docs: {
      description: {
        story: 'Provide details and an action to take',
      },
    },
  },
  render: (props) => {
    return (
      <ToastOnClick
        {...props}
        variant="failed"
        description={faker.lorem.paragraph()}
        action={<ToastAction altText="something">Button</ToastAction>}
      />
    )
  },
}

export const Warn: InteractiveStory = {
  args: {
    title: 'Warning',
  },
  parameters: {
    docs: {
      description: {
        story: 'No rules yet',
      },
    },
  },
  render: (props) => {
    return <ToastOnClick {...props} variant="warn" />
  },
}

export const WarnWithDescription: InteractiveStory = {
  args: {
    title: 'Warn',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Provide more details to your user as to why they are receiving a warning.',
      },
    },
  },
  render: (props) => {
    return (
      <ToastOnClick
        {...props}
        variant="warn"
        description={faker.lorem.paragraph()}
      />
    )
  },
}

export const WarnWithDescriptionAndAction: InteractiveStory = {
  args: {
    title: 'Warning',
  },
  parameters: {
    docs: {
      description: {
        story: 'Provide details and an action to take',
      },
    },
  },
  render: (props) => {
    return (
      <ToastOnClick
        {...props}
        variant="warn"
        description={faker.lorem.paragraph()}
        action={<ToastAction altText="something">Button</ToastAction>}
      />
    )
  },
}

export const Info: InteractiveStory = {
  args: {
    title: 'Coming soon',
  },
  parameters: {
    docs: {
      description: {
        story: 'Informative',
      },
    },
  },
  render: (props) => {
    return <ToastOnClick {...props} variant="info" />
  },
}

export const AsBanner: InteractiveStory = {
  parameters: {
    docs: {
      description: {
        story: 'Informative',
      },
    },
  },
  render: (props) => {
    return (
      <ToastOnClick
        {...props}
        variant="emphasized"
        asBanner
        bannerContent={
          <div className="flex size-full items-center justify-center">
            <div className="flex items-center justify-start gap-3">
              <div className="flex gap-2">
                <TextBody weight="bold" className="text-rose-500">
                  Update:
                </TextBody>
                <TextBody>
                  Your{' '}
                  <TextBody weight="bold" span>
                    Fast Finance
                  </TextBody>{' '}
                  data is ready.
                </TextBody>
              </div>
              <div className="flex items-center justify-center">
                <TextBody weight="semibold" className="text-pink-50 underline">
                  My Fast Finance
                </TextBody>
              </div>
            </div>
          </div>
        }
      />
    )
  },
}
