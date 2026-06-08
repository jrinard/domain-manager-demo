import { PropsWithChildren, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tyto/query'
import axios from 'axios'
import { SessionHandling, LOC_STOR, BROWSER_STORAGE_KEY_RING } from '@spacedock/cargo-bay'
import { CurrentUserProvider } from '@spacedock/chaincode'
import { Toaster } from '@spacedock/falcon-ui'
import { MockTryybServicesProvider } from '@spacedock/tryyb-services'
import { TytoClientProvider } from '@tyto/client'
import { getDemoSession } from '../mocks/demoStore'

const sessionPayload = getDemoSession()

let demoSessionSeeded = false

/** Store once — never call clearActiveSession (it removes storage and retriggers useSession loops). */
function seedDemoSession() {
  if (demoSessionSeeded) return
  // Overwrite stale sessions so domainID always matches demoStore (551).
  LOC_STOR.set(
    BROWSER_STORAGE_KEY_RING.STORED_SESSIONS,
    JSON.stringify([sessionPayload]),
  )
  SessionHandling.setActiveSession(sessionPayload.sessionKey)
  demoSessionSeeded = true
}

seedDemoSession()

export function DemoProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            staleTime: Infinity,
          },
        },
      }),
  )

  return (
    <CurrentUserProvider>
      <MockTryybServicesProvider>
        <TytoClientProvider axiosStatic={axios} baseURL="/api">
          <QueryClientProvider client={queryClient}>
            <Toaster />
            {children}
          </QueryClientProvider>
        </TytoClientProvider>
      </MockTryybServicesProvider>
    </CurrentUserProvider>
  )
}
