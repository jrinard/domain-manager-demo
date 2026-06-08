import * as React from 'react'
import { createContext, useReducer, useContext, ReactNode } from 'react'

interface DomainManagerStoreState {
  isMobile: boolean
}

type Action = { type: 'SET_IS_MOBILE'; payload: boolean }

const initialState: DomainManagerStoreState = {
  isMobile: window.innerWidth <= 768,
}

function reducer(
  state: DomainManagerStoreState,
  action: Action,
): DomainManagerStoreState {
  switch (action.type) {
    case 'SET_IS_MOBILE':
      return { ...state, isMobile: action.payload }
    default:
      return state
  }
}

interface DomainManagerStoreProps {
  isMobile: boolean
  setIsMobile: (value: boolean) => void
}

const DomainManagerStoreContext = createContext<
  DomainManagerStoreProps | undefined
>(undefined)

export function DomainManagerStoreContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [state, dispatch] = useReducer(reducer, initialState)

  React.useEffect(() => {
    const handleResize = () => {
      dispatch({ type: 'SET_IS_MOBILE', payload: window.innerWidth <= 768 })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const contextValue: DomainManagerStoreProps = {
    isMobile: state.isMobile,
    setIsMobile: (value: boolean) =>
      dispatch({ type: 'SET_IS_MOBILE', payload: value }),
  }

  return (
    <DomainManagerStoreContext.Provider value={contextValue}>
      {children}
    </DomainManagerStoreContext.Provider>
  )
}

export function useDomainManagerStore(): DomainManagerStoreProps {
  const context = useContext(DomainManagerStoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
