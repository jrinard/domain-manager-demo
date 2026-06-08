import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { faker } from '@faker-js/faker'

import { AvatarGroup, AvatarGroupProps } from './AvatarGroup'
import { AvatarProps } from './Avatar'
import { times } from 'lodash'

const meta: Meta<typeof AvatarGroup> = {
  title: 'DL: Falcon/Molecules/Avatar Group',
  component: AvatarGroup,
  tags: ['autodocs'],
}

export default meta

const AvatarGroupWithAvatars = (
  props: AvatarGroupProps & { amount: number }
) => {
  return <div />
}
type StoryAvatarGroupWithAvatars = StoryObj<typeof AvatarGroupWithAvatars>

export const Basic: StoryAvatarGroupWithAvatars = {
  args: {
    max: 3,
    amount: 4,
    size: 'md',
  },
  render: ({ size, amount, max }) => {
    const list: AvatarProps[] = []
    times(amount, (index) => {
      list.push({
        src: `https://i.pravatar.cc/?img=${index}`,
        name: faker.person.fullName(),
      })
    })
    return <AvatarGroup size={size} max={max} list={list} />
  },
}

export const Fallback: StoryAvatarGroupWithAvatars = {
  args: {
    max: 3,
    amount: 4,
    size: 'md',
  },
  render: ({ size, amount, max }) => {
    const list: AvatarProps[] = []
    times(amount, (index) => {
      list.push({
        src: `https://i.pravatar.example/?nope`,
        name: faker.person.fullName(),
      })
    })
    return <AvatarGroup size={size} max={max} list={list} />
  },
}
