import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { ContactCard } from './ContactCard'

import TDM from '../../../tests/tdm'
import {
  Avatar,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@spacedock/falcon-ui'
import { faker } from '@faker-js/faker/locale/en'

const meta: Meta<typeof ContactCard> = {
  title: 'Dossier/Organisms/Contact Card',
  component: ContactCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ContactCard>

/*
 *👇 Render functions are a framework specific feature to allow you control over how the component renders.
 * See https://storybook.js.org/docs/react/api/csf to learn how to use render functions.
 */
export const Bare: Story = {
  args: {
    displayName: TDM.createContactCardProps().displayName,
    avatar: TDM.createContactCardProps().avatar,
    title: TDM.createContactCardProps().title,
    phone: TDM.createContactCardProps().phone,
    email: TDM.createContactCardProps().email,
    discValues: TDM.createContactCardProps().discValues,
    weighted: false,
  },
  render: ({
    displayName,
    avatar,
    weighted,
    phone,
    email,
    title,
    discValues,
  }) => (
    <ContactCard
      isLoading={false}
      displayName={displayName}
      discValues={discValues}
      avatar={avatar}
      email={email}
      phone={phone}
      title={title}
      weighted={weighted}
    />
  ),
}

export const IsLoading: Story = {
  args: {
    isLoading: true,
    displayName: TDM.createContactCardProps().displayName,
    avatar: TDM.createContactCardProps().avatar,
    title: TDM.createContactCardProps().title,
    phone: TDM.createContactCardProps().phone,
    email: TDM.createContactCardProps().email,
    discValues: TDM.createContactCardProps().discValues,
    weighted: false,
  },
  render: ({
    isLoading,
    displayName,
    avatar,
    weighted,
    phone,
    email,
    title,
    discValues,
  }) => (
    <ContactCard
      isLoading={isLoading}
      displayName={displayName}
      discValues={discValues}
      avatar={avatar}
      email={email}
      phone={phone}
      title={title}
      weighted={weighted}
    />
  ),
}

export const ExampleHoverCard: Story = {
  args: {
    isLoading: false,
    displayName: TDM.createContactCardProps().displayName,
    avatar: TDM.createContactCardProps().avatar,
    title: TDM.createContactCardProps().title,
    phone: TDM.createContactCardProps().phone,
    email: TDM.createContactCardProps().email,
    discValues: TDM.createContactCardProps().discValues,
    weighted: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'ContactCard as a HoverCard for Avatar and name of a user',
      },
    },
  },
  render: ({
    isLoading,
    displayName,
    avatar,
    weighted,
    phone,
    email,
    title,
    discValues,
  }) => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex cursor-pointer items-center justify-center gap-4 px-10">
          <Avatar name={displayName} src={avatar} />
          <div>{faker.person.fullName()}</div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="bg-site-bg border-ring w-full ">
        <ContactCard
          isLoading={isLoading}
          displayName={displayName}
          discValues={discValues}
          avatar={avatar}
          email={email}
          phone={phone}
          title={title}
          weighted={weighted}
          width="w-full"
        />
      </HoverCardContent>
    </HoverCard>
  ),
}

export const ExampleHoverCardWithNewGraphic: Story = {
  args: {
    isLoading: false,
    displayName: TDM.createContactCardProps().displayName,
    avatar: TDM.createContactCardProps().avatar,
    title: TDM.createContactCardProps().title,
    phone: TDM.createContactCardProps().phone,
    email: TDM.createContactCardProps().email,
    discValues: TDM.createContactCardProps().discValues,
    weighted: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'ContactCard as a HoverCard for Avatar and name of a user',
      },
    },
  },
  render: ({
    isLoading,
    displayName,
    avatar,
    weighted,
    phone,
    email,
    title,
    discValues,
  }) => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex cursor-pointer items-center justify-center gap-4 px-10">
          <Avatar name={displayName} src={avatar} />
          <div>{faker.person.fullName()}</div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="bg-primary border-ring w-full ">
        <ContactCard
          isLoading={isLoading}
          displayName={displayName}
          discValues={discValues}
          avatar={avatar}
          email={email}
          phone={phone}
          title={title}
          weighted={weighted}
          width="w-full"
        />
      </HoverCardContent>
    </HoverCard>
  ),
}
