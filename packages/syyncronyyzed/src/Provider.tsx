import type { FC, PropsWithChildren } from 'react'
import React, { createContext, useState, useEffect, useRef } from 'react'
import type { CoreKnownMessageTypes, SyyncProps } from './types'
import Syyncronyyzed from './Syyncronyyzed'

type SyyncronyyzedContextType = {
  syyncronyyzed: Syyncronyyzed<CoreKnownMessageTypes> | null
}

type Props = {
  window: Window
  appType: SyyncProps['appType']
  targetHosts: SyyncProps['targetHosts']
}

// Create the context
const SyyncronyyzedContext = createContext<SyyncronyyzedContextType>({
  syyncronyyzed: null,
})

// Create the Provider component
const SyyncronyyzedProvider: FC<PropsWithChildren<Props>> = ({
  appType,
  targetHosts = ['*'],
  children,
  window,
}) => {
  const windowRef = useRef(window)
  const wasSet = useRef(false)

  const [syyncronyyzed, setSyyncronyyzed] =
    useState<Syyncronyyzed<CoreKnownMessageTypes> | null>(() => {
      wasSet.current = true
      windowRef.current = window

      return new Syyncronyyzed<CoreKnownMessageTypes>({
        targetWindow: window,
        appRole: 'child',
        appType,
        targetHosts,
      })
    })

  useEffect(() => {
    if ((syyncronyyzed && window === windowRef.current) || wasSet.current)
      return

    wasSet.current = true
    windowRef.current = window

    const newSyync = new Syyncronyyzed<CoreKnownMessageTypes>({
      targetWindow: window,
      appRole: 'child',
      appType,
      targetHosts,
    })

    setSyyncronyyzed(newSyync)
  }, [window])

  return (
    <SyyncronyyzedContext.Provider value={{ syyncronyyzed }}>
      {children}
    </SyyncronyyzedContext.Provider>
  )
}

export { SyyncronyyzedContext, SyyncronyyzedProvider }
