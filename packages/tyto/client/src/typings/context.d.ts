import { AxiosStatic } from 'axios'
import { ClientProps } from '../client'

export interface TytoClientProviderProps
  extends Omit<ClientProps, 'axiosStatic'> {
  axiosStatic?: AxiosStatic
}

export interface TytoClientProvidedData {
  client?: import('../client').default
}
