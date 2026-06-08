import {
  render as tlRender,
  RenderOptions as TLRenderOptions,
} from '@testing-library/react'
import { PropsWithChildren, ReactElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { AllProviders } from './AllProviders'
import { FalconProviders } from './falcon/FalconProviders'

export interface RenderOptions extends Omit<TLRenderOptions, 'queries'> {
  initialRoute?: string
  withFalcon?: boolean
}

export const render = (ui: ReactElement, options?: RenderOptions) => {
  const Providers = ({ children }: PropsWithChildren) => {
    if (options && options.withFalcon) {
      children = <FalconProviders>{children}</FalconProviders>
    }
    if (options && options.initialRoute) {
      return (
        <MemoryRouter initialEntries={[options.initialRoute]}>
          <AllProviders>{children}</AllProviders>
        </MemoryRouter>
      )
    }
    return <AllProviders>{children}</AllProviders>
  }
  return tlRender(ui, { wrapper: Providers, ...options })
}
