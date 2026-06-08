import { StoryObj } from '@storybook/react'

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
