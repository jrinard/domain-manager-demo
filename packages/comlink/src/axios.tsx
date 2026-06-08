/**
 * Inspired by https://blog.openreplay.com/integrating-axios-with-react-hooks/
 */
import {
  createContext,
  PropsWithChildren,
  useRef,
  useContext,
  useMemo,
} from 'react'
import { AxiosInstance } from 'axios'

interface AxiosInstanceProviderProps extends PropsWithChildren {
  axios: AxiosInstance
}

export const AxiosContext = createContext<AxiosInstance | undefined>(undefined)
export const AxiosInstanceProvider = ({
  axios,
  children,
}: AxiosInstanceProviderProps) => {
  const instanceRef = useRef<AxiosInstance>(axios)

  return (
    <AxiosContext.Provider value={instanceRef.current}>
      {children}
    </AxiosContext.Provider>
  )
}

/**
 * We may consider context provisions based on an optional param of an Axios config
 */
export const useAxiosInstance = (): AxiosInstance => {
  const contextInstance = useContext(AxiosContext)
  if (contextInstance === undefined) {
    throw new Error('No Axios instance found in the Context')
  }
  return useMemo(() => {
    return contextInstance
  }, [contextInstance])
}
