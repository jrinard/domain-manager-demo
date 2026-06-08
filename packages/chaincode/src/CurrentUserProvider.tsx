import { defaultsDeep } from 'lodash'
import { createContext, PropsWithChildren, useState } from 'react'
import type { Session } from '@spacedock/manifest'

export type ChaincodeUser = Session | undefined | null

export type CurrentUserProviderValue = {
  user: ChaincodeUser
  setUser: (value: Session | undefined | null) => void
}

export const CurrentUserContext = createContext<
  CurrentUserProviderValue | undefined
>(undefined)

export const CurrentUserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUserState] = useState<ChaincodeUser>(undefined)
  const setUser = (value: Session | undefined | null) => {
    setUserState((current) => defaultsDeep(value, current))
  }
  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}
