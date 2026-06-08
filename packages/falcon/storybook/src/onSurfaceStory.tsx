import { StoryObj } from '@storybook/react'
import React, { PropsWithChildren } from 'react'

export type Surface = 'light' | 'dark'
interface OnSurface {
  onSurface: Surface
}
export type SurfaceStory<T> = StoryObj<OnSurface & T>
export const SurfaceStoryArgTypes = {
  onSurface: {
    control: 'select',
    options: ['light', 'dark'],
  },
}

export const SurfaceForStory = ({
  surface,
  children,
}: { surface: Surface } & PropsWithChildren) => {
  return (
    <div
      data-surface={surface}
      className={`group flex h-[200px] items-center justify-center ${
        surface === 'light' ? 'bg-secondary' : 'bg-primary'
      } p-6`}
    >
      {children}
    </div>
  )
}
