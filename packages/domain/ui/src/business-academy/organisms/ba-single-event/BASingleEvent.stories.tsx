import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { BASingleEvent } from './BASingleEvent'

const meta: Meta<typeof BASingleEvent> = {
  title: 'Domain Ui/Organisms/BA Single Event',
  component: BASingleEvent,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BASingleEvent>

export const Deafult: Story = {
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
    design: {
      type: 'figma',
      url: 'REPLACE WITH FIGMA LINK or REMOVE',
    },
  },
  render: ({ ...props }) => (
    <BASingleEvent
      {...props}
      updatingRegistration={false}
      event={{
        id: '84ea50fc-0c2c-43ad-85f7-32d659b395b1',
        title: 'DEV Test',
        code: 'M7NVNZK8Z5Y',
        description: '',
        virtual: true,
        format: 'Virtual',
        start: '2024-11-08T23:00:00.000Z',
        end: '2024-11-09T00:00:00.000Z',
        closeAfter: '2024-11-08T23:59:00.000Z',
        archiveAfter: '2025-02-07T00:00:00.000Z',
        launchAfter: '1900-01-01T05:00:00.000Z',
        timezone: 'America/Phoenix',
        defaultLocale: 'en-US',
        languages: ['en-US'],
        currency: 'USD',
        registrationSecurityLevel: 'Public',
        status: 'Pending',
        eventStatus: 'Upcoming',
        testMode: true,
        planners: [{ deleted: false, email: '', firstName: '', lastName: '' }],
        customFields: [
          { id: '', name: '', order: 0, type: 'FreeText', value: [] },
        ],
        category: { name: 'Training Session' },
        type: 'TrainingSession',
        _links: {
          invitation: {
            href: 'string',
          },
          agenda: {
            href: 'string',
          },
          summary: {
            href: 'string',
          },
          registration: {
            href: 'string',
          },
        },
        created: '2024-10-02T21:43:46.320Z',
        lastModified: '2024-10-02T21:44:00.086Z',
        createdBy: 'Mblack@cardoneventures.com',
        lastModifiedBy: 'Mblack@cardoneventures.com',
        registration: null,
      }}
    />
  ),
}

export const IsUpdating: Story = {
  parameters: {
    docs: {
      description: {
        story: '',
      },
    },
    design: {
      type: 'figma',
      url: 'REPLACE WITH FIGMA LINK or REMOVE',
    },
  },
  render: ({ ...props }) => (
    <BASingleEvent
      {...props}
      updatingRegistration
      event={{
        id: '84ea50fc-0c2c-43ad-85f7-32d659b395b1',
        title: 'DEV Test',
        code: 'M7NVNZK8Z5Y',
        description: '',
        virtual: true,
        format: 'Virtual',
        start: '2024-11-08T23:00:00.000Z',
        end: '2024-11-09T00:00:00.000Z',
        closeAfter: '2024-11-08T23:59:00.000Z',
        archiveAfter: '2025-02-07T00:00:00.000Z',
        launchAfter: '1900-01-01T05:00:00.000Z',
        timezone: 'America/Phoenix',
        defaultLocale: 'en-US',
        languages: ['en-US'],
        currency: 'USD',
        registrationSecurityLevel: 'Public',
        status: 'Pending',
        eventStatus: 'Upcoming',
        testMode: true,
        planners: [{ deleted: false, email: '', firstName: '', lastName: '' }],
        customFields: [
          { id: '', name: '', order: 0, type: 'FreeText', value: [] },
        ],
        category: { name: 'Training Session' },
        type: 'TrainingSession',
        _links: {
          invitation: {
            href: 'string',
          },
          agenda: {
            href: 'string',
          },
          summary: {
            href: 'string',
          },
          registration: {
            href: 'string',
          },
        },
        created: '2024-10-02T21:43:46.320Z',
        lastModified: '2024-10-02T21:44:00.086Z',
        createdBy: 'Mblack@cardoneventures.com',
        lastModifiedBy: 'Mblack@cardoneventures.com',
        registration: null,
      }}
    />
  ),
}
export const IsLoading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'When the data is loading',
      },
    },
    design: {
      type: 'figma',
      url: 'REPLACE WITH FIGMA LINK or REMOVE',
    },
  },
  render: ({ ...props }) => <BASingleEvent {...props} isLoading />,
}
