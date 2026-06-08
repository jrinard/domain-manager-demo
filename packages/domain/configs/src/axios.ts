import axios from 'axios'

import { EnvironmentVariables } from '@spacedock/tricorder'

export const axiosInstance = axios.create({
  baseURL: EnvironmentVariables.ASSETS_BASE_URL,
})
