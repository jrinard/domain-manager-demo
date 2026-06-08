import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { BAAllEventsList } from './BAAllEventsList'

const meta: Meta<typeof BAAllEventsList> = {
  title: 'Domain Ui/Organisms/BA All Events List',
  component: BAAllEventsList,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BAAllEventsList>

export const Default: Story = {
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
    <BAAllEventsList
      {...props}
      date={new Date('2024-12-15T20:00:00.000Z')}
      webcasts={{}}
      events={[
        {
          id: 'cc383ae5-deac-4862-83d7-a44ca8d004a7',
          title: 'Template - HR Live Call',
          code: 'TTNFQ75GY9L',
          virtual: true,
          format: 'Virtual',
          start: '2024-12-15T20:00:00.000Z',
          end: '2024-12-15T21:00:00.000Z',
          closeAfter: '2024-12-15T20:59:00.000Z',
          archiveAfter: '2025-03-15T21:00:00.000Z',
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
              firstName: '10X',
              lastName: 'Business Acadamey',
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
            {
              id: '87b2e6a5-4131-4f7e-894f-302b89f30ef0',
              name: 'Integrate with HubSpot',
              type: 'SingleSelect',
              value: ['Yes'],
              order: 3,
            },
            {
              id: '740422ff-6870-472c-aa39-696e0b111bbc',
              name: 'HubSpot Invited List ID',
              type: 'FreeText',
              value: ['12949'],
              order: 4,
            },
            {
              id: '6a9399e5-3ce9-4e99-8972-1e92045ff286',
              name: 'HubSpot Registered List ID',
              type: 'FreeText',
              value: ['12950'],
              order: 5,
            },
            {
              id: '39f8bb93-623f-4d62-ad6a-d7a33740e2ef',
              name: 'HubSpot Cancelled List ID',
              type: 'FreeText',
              value: ['12951'],
              order: 6,
            },
            {
              id: 'b5b14f29-b563-4bea-9382-b1222be3eedd',
              name: 'HubSpot Attended List ID',
              type: 'FreeText',
              value: ['12952'],
              order: 7,
            },
            {
              id: 'b4687398-a2e3-4ba7-9a7c-4d682a39ea16',
              name: 'Zoom Integration Type',
              type: 'SingleSelect',
              value: ['Meeting'],
              order: 9,
            },
            {
              id: 'b5df9ced-171e-4299-8ca3-c3891b4c9c2f',
              name: 'Participation Minimum Duration',
              type: 'FreeText',
              value: ['45'],
              order: 10,
            },
            {
              id: '717b5093-fb09-4da7-b8b9-899fbccaed66',
              name: 'Zoom Meeting/Webinar Alternate Host',
              type: 'FreeText',
              value: [
                'mblack@cardoneventures.com; jcunningham@cardoneventures.com',
              ],
              order: 11,
            },
            {
              id: '5f3e48de-3220-42ca-9706-84a43eae895e',
              name: 'Zoom Meeting/Webinar Host',
              type: 'FreeText',
              value: ['jlingo@cardoneventures.com'],
              order: 14,
            },
          ],
          category: {
            name: 'Webinar',
          },
          type: 'Webinar',
          _links: {
            invitation: {
              href: 'https://www.cvent.com/d/62qkct/1Q',
            },
            agenda: {
              href: 'https://www.cvent.com/d/62qkct/6X',
            },
            summary: {
              href: 'https://www.cvent.com/d/62qkct',
            },
            registration: {
              href: 'https://www.cvent.com/d/62qkct/4W',
            },
          },
          created: '2024-10-16T21:05:59.413Z',
          lastModified: '2024-10-16T21:06:16.722Z',
          createdBy: 'Mblack@cardoneventures.com',
          lastModifiedBy: 'Mblack@cardoneventures.com',
          registration: null,
          description: '',
        },
      ]}
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
  render: ({ ...props }) => (
    <BAAllEventsList {...props} isLoading events={[]} webcasts={{}} />
  ),
}
