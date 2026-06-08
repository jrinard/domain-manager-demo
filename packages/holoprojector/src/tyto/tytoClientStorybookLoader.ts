import { TytoClient } from '../TytoClientProvider'
import axios from 'axios'

export const tytoClientStorybookLoader = () => async () => {
  const client = new TytoClient({
    axiosStatic: axios,
    baseURL: 'http://localhost:4400/api',
  })
  return {
    eventsSuccess: await client.Events.get(),
  }
}
