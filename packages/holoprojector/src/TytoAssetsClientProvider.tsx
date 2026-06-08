import {
  TytoAssetClientContext,
  TytoAssetsClient,
  TytoAssetsClientProps,
} from '@tyto/assets'
import { AxiosStatic } from 'axios'
import { PropsWithChildren, ReactNode } from 'react'
import * as React from 'react'
import { axios } from './AxiosMockProvider'

class TytoAssetsClientFake extends TytoAssetsClient {
  constructor(props: TytoAssetsClientProps) {
    super(props)
    this.axiosInstance.interceptors.request.clear()
    this.axiosInstance.interceptors.response.clear()
  }
}

export function TytoAssetsClientProvider(
  props: PropsWithChildren<
    Omit<TytoAssetsClientProps, 'axiosStatic'> & { axiosStatic?: AxiosStatic }
  >
) {
  const [client] = React.useState(() => {
    // * Only not an implicit return of this function because of odd behavior in local dev...
    return new TytoAssetsClientFake({
      axiosStatic: props.axiosStatic ?? axios,
      baseURL: props.baseURL ?? 'http://localhost:4400/api',
    })
  })

  return (
    <TytoAssetClientContext.Provider value={client}>
      {props.children}
    </TytoAssetClientContext.Provider>
  )
}

export const withTytoAssetsClient =
  (options?: { baseURL?: string }) => (Story: () => ReactNode) => {
    return (
      <TytoAssetsClientProvider
        axiosStatic={axios}
        baseURL={options?.baseURL ?? 'http://localhost:4400/api'}
      >
        {Story()}
      </TytoAssetsClientProvider>
    )
  }
