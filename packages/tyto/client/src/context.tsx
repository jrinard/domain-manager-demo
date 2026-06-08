/*
 * Store for General information like "is the menu open?" and "Is the App being viewed on a mobile device?"
 */
import axios from 'axios'
import * as React from 'react'
import type { PropsWithChildren } from 'react'

import TytoClient from './client'

import type {
  TytoClientProvidedData,
  TytoClientProviderProps,
} from './typings/context'

export const TytoClientContext: React.Context<TytoClientProvidedData> =
  React.createContext({})

export function TytoClientProvider(
  props: PropsWithChildren<TytoClientProviderProps>,
) {
  const baseURLRef = React.useRef(props.baseURL)
  const [client, setClient] = React.useState(() => {
    // * Only not an implicit return of this function because of odd behavior in local dev...
    return new TytoClient({
      axiosStatic: props.axiosStatic || axios,
      baseURL: props.baseURL,
      onUnauthenticated: props.onUnauthenticated,
      refreshToken: props.refreshToken,
    })
  })

  React.useEffect(() => {
    if (props.baseURL !== baseURLRef.current) {
      baseURLRef.current = props.baseURL
      setClient(
        new TytoClient({
          axiosStatic: props.axiosStatic || axios,
          baseURL: props.baseURL,
          onUnauthenticated: props.onUnauthenticated,
          refreshToken: props.refreshToken,
        }),
      )
    }
  }, [props.baseURL])

  return (
    <TytoClientContext.Provider value={{ client }}>
      {props.children}
    </TytoClientContext.Provider>
  )
}

export const TytoClientContextConsumer = TytoClientContext.Consumer
