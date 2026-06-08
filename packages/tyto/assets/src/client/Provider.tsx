import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react'
import { TytoAssetsClient, TytoAssetsClientProps } from './Client'

type ProviderProps = PropsWithChildren & TytoAssetsClientProps
export const TytoAssetClientContext = createContext<
  TytoAssetsClient | undefined
>(undefined)

export const TytoAssetClientProvider = ({
  children,
  axiosStatic,
  baseURL,
}: ProviderProps) => {
  const baseURLRef = useRef(baseURL)
  const [client, setClient] = useState(() => {
    return new TytoAssetsClient({
      axiosStatic,
      baseURL: baseURLRef.current,
    })
  })

  useEffect(() => {
    if (baseURL !== baseURLRef.current) {
      baseURLRef.current = baseURL

      setClient(
        new TytoAssetsClient({
          axiosStatic,
          baseURL: baseURLRef.current,
        }),
      )
    }
  }, [baseURL])

  return (
    <TytoAssetClientContext.Provider value={client}>
      {children}
    </TytoAssetClientContext.Provider>
  )
}

export const useTytoAssetClient = () => {
  const context = useContext(TytoAssetClientContext)
  if (context === undefined) {
    throw new Error(
      'useTytoAssetClient must be inside a TytoAssetClientProvider',
    )
  }
  return context
}
