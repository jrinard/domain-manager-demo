import { Resource } from '../utils/Resource'
import useTytoClient from './useTytoClient'

export const useTytoResource = <T>(ResourceClass: typeof Resource): T => {
  const tytoClient = useTytoClient()
  return tytoClient.wireResource(ResourceClass) as T
}
