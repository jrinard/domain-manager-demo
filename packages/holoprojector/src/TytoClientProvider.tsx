import { Data } from '@spacedock/manifest'
import { PropsWithChildren, ReactNode } from 'react'
import * as React from 'react'
import { TytoClientContext, TytoClientProviderProps } from '@tyto/client'
import { axios } from './AxiosMockProvider'
import { SessionHandling } from '@spacedock/cargo-bay'
import { TytoClient } from './tyto/TytoClient'

export { TytoClient }
export function TytoClientProvider(
  props: PropsWithChildren<TytoClientProviderProps>
) {
  const [client] = React.useState(() => {
    // * Only not an implicit return of this function because of odd behavior in local dev...
    return new TytoClient({
      axiosStatic: props.axiosStatic ?? axios,
      baseURL: props.baseURL ?? 'http://localhost:4400/api',
      onUnauthenticated: props.onUnauthenticated,
    })
  })

  return (
    <TytoClientContext.Provider value={{ client }}>
      {props.children}
    </TytoClientContext.Provider>
  )
}

export const withCurrentUser =
  (overrides?: Partial<Data.SessionData>) => (Story: () => ReactNode) => {
    SessionHandling.clearActiveSession()
    const user: Data.SessionData = {
      userID: 2209853,
      userName: 'John Bailey',
      changePassword: false,
      termsOfServiceSignatureRequired: false,
      adminID: 0,
      teamListSyncDate: '1900-01-01T00:00:00+00:00',
      koPermissionSyncDate: '2023-10-23T17:49:53.013+00:00',
      domainID: 1698652,
      timeOutMnts: 2160,
      onCourseURL: 'https://cardoneventuresceo.com',
      profileThumbPath:
        '/tyto/api/person/profilephoto?assetID=2218073&encoding=ocDEFAULT',
      teamRootID: 1763850,
      roleID: 432,
      onlinePreference: 'ocAVAILABLE',
      sessionKey:
        '7TSCJ6Q982JFB7TV29JFCR1VJ2LXV3H288DR90QLYRHZHVXLYYS4F5Z3N394K0BR',
      ...overrides,
    }
    SessionHandling.setActiveSession(`[${JSON.stringify(user)}]`)
    return <>{Story()}</>
  }

export const withTytoClient =
  (options?: { baseURL?: string }) => (Story: () => ReactNode) => {
    return (
      <TytoClientProvider
        axiosStatic={axios}
        baseURL={options?.baseURL ?? 'http://localhost:4400/api'}
      >
        {Story()}
      </TytoClientProvider>
    )
  }
