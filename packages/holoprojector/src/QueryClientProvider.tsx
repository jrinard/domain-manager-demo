import {
  QueryClient,
  QueryClientProvider as QueryClientProviderCore,
} from '@tanstack/react-query'
import type { QueryClientConfig } from '@tanstack/react-query'
import { PropsWithChildren, ReactNode } from 'react'
import { defaultsDeep } from 'lodash'
const defaultQueryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      gcTime: 0,
      staleTime: 0,
      retry: false,
      experimental_prefetchInRender: true,
    },
  },
}

const createQueryClient = (): QueryClient => {
  return new QueryClient(defaultQueryClientConfig)
}

export const QueryClientProvider = ({
  children,
  options,
}: PropsWithChildren & { options?: QueryClientConfig }) => {
  const queryClient = createQueryClient()
  if (options?.defaultOptions) {
    queryClient.setDefaultOptions(
      defaultsDeep(defaultQueryClientConfig, options?.defaultOptions),
    )
  }
  return (
    <QueryClientProviderCore client={queryClient}>
      {children}
    </QueryClientProviderCore>
  )
}
export const withQueryClient =
  (options?: QueryClientConfig) => (StoryFn: () => ReactNode) => {
    return (
      <QueryClientProvider options={options}>{StoryFn()}</QueryClientProvider>
    )
  }
