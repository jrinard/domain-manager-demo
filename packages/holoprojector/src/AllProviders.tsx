import { CurrentUserProvider } from '@spacedock/chaincode'
import { QueryCache } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { QueryClientProvider } from './QueryClientProvider'
import { TytoAssetsClientProvider } from './TytoAssetsClientProvider'
import { TytoClientProvider } from './TytoClientProvider'

export const AllProviders = ({
  children,
  queryCache,
}: PropsWithChildren & { queryCache?: QueryCache }) => {
  return (
    <CurrentUserProvider>
      <TytoClientProvider>
        <TytoAssetsClientProvider>
          <QueryClientProvider options={{ queryCache: queryCache }}>
            {children}
          </QueryClientProvider>
        </TytoAssetsClientProvider>
      </TytoClientProvider>
    </CurrentUserProvider>
  )
}
