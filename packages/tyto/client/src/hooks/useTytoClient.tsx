import * as React from 'react'

import { TytoClientContext } from '../context'
import { TytoClient } from '../index'

export function useTytoClient(): TytoClient {
  const { client } = React.useContext(TytoClientContext)
  if (client === undefined) {
    throw new Error('Please use the TytoClientProvider')
  }
  return client
}

export default useTytoClient
