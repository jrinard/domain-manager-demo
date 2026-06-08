import { Toaster, TooltipProvider } from '@spacedock/falcon-ui'
import { PropsWithChildren, ReactNode } from 'react'

export const FalconProviders = (props: PropsWithChildren) => {
  return (
    <TooltipProvider>
      <Toaster />
      {props.children}
    </TooltipProvider>
  )
}

export const withFalcon = () => (StoryFn: () => ReactNode) => {
  return (
    <TooltipProvider>
      {StoryFn()}
      <Toaster />
    </TooltipProvider>
  )
}
