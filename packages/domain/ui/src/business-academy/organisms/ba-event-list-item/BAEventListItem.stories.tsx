import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { BAEventListItem } from './BAEventListItem'

const meta: Meta<typeof BAEventListItem> = {
  title: 'Domain UI/Organisms/BA Event List Item',
  component: BAEventListItem,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BAEventListItem>

export const EventToday: Story = {
  parameters: {
    docs: {
      description: {
        story: 'An event that is occuring today',
      },
    },
    design: {
      type: 'figma',
      url: 'REPLACE WITH FIGMA LINK or REMOVE',
    },
  },
  render: ({ ...props }) => (
    <BAEventListItem
      {...props}
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
        planners: [
          {
            firstName: 'Max',
            lastName: 'Black',
            email: '10XBusinessAcademy@cardoneventures.com',
            deleted: true,
          },
        ],
        customFields: [
          {
            id: '2b7f6269-4d33-4b40-959a-a39c07d76697',
            name: 'Live Call Category',
            type: 'SingleSelect',
            value: ['Marketing'],
            order: 1,
          },
          {
            id: '33c880f9-13af-4d4f-9795-fb27d9099185',
            name: 'Live Call Type',
            type: 'SingleSelect',
            value: ['Training'],
            order: 2,
          },
        ],
        category: {
          name: 'Training Session',
        },
        type: 'TrainingSession',
        _links: {
          invitation: {
            href: 'https://www.cvent.com/d/k2q72l/1Q',
          },
          agenda: {
            href: 'https://www.cvent.com/d/k2q72l/6X',
          },
          summary: {
            href: 'https://www.cvent.com/d/k2q72l',
          },
          registration: {
            href: 'https://www.cvent.com/d/k2q72l/4W',
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
