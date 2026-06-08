import type { AxiosRequestConfig, AxiosInstance } from 'axios'
import * as _ from 'lodash'

// TODO: Determine event dispatching
// import { CustomEvents } from 'data/utils'

export type CallOpts = {
  circumventChangePasswordCheck?: boolean
  paramsAsData?: boolean
  omitSessionKey?: boolean
  axiosConfig?: AxiosRequestConfig
}

const DEFAULT_OPTS = {
  validateStatus: (status: number) => {
    // * Resolve only if the status code is less than 500
    // * In part, because Auth errors are 401, and we want to handle those with side effects
    return status < 500
  },
}

// * Set Hostname and API path to preppend all Tyto Endpoints (example: 'https://api.mocaworks.com/tyto/api')
// axios.defaults.baseURL = API_URL

/**
 * @deprecated
 * Makes a `DELETE` Call via `axios.delete()`
 * @param axios
 * @param endpoint - Absolute path of the endpoint to make a network request to
 * @param params - Object of parameters to send with the request
 * @param opts
 * @returns A Promise
 */
export function deleteCall<ReturnType>(
  axios: AxiosInstance,
  endpoint: string,
  params: object,
  opts?: CallOpts,
): Promise<ReturnType> {
  const { axiosConfig = {} } = opts || {}

  const config = axiosConfig

  // * Some Tyto DELETE endpoints expect params to be passed in as data, not as params.
  // * "That's just the way it is"
  // * - Tupac Shakur
  if (opts && opts.paramsAsData) {
    config.data = params
  } else {
    config.params = params
  }

  return new Promise((res, rej) => {
    axios
      .delete<ReturnType>(endpoint, config)
      .then((resp) => {
        res(resp.data)
      })
      .catch(rej)
  })
}

/**
 * @deprecated
 * Makes a `GET` Call via `axios.get()`
 * @param axios
 * @param endpoint - Absolute path of the endpoint to make a network request to
 * @param params - Object of parameters to send with the request
 * @param opts - Object of options to send with the request, including `opts.axiosConfig`
 * @returns A Promise
 */
export function getCall<ReturnType>(
  axios: AxiosInstance,
  endpoint: string,
  params: object,
  opts?: CallOpts,
): Promise<ReturnType> {
  return new Promise<ReturnType>((res, rej) => {
    const config: AxiosRequestConfig & { omitSessionKey?: boolean } = {
      ...opts?.axiosConfig,
      params,
      omitSessionKey: opts?.omitSessionKey,
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    axios
      .get<ReturnType>(endpoint, config)
      .then((resp) => {
        res(resp.data)
      })
      .catch(rej)
  })
}

/**
 * @deprecated
 * Makes a `POST` Call via `axios.post()` with the params as a `JSON` body
 * @param axios
 * @param endpoint - Absolute path of the endpoint to make a network request to
 * @param params - Object of parameters to send with the request
 * @param opts - Object of options to send with the request, including `opts.axiosConfig`
 * @returns A Promise
 */
export function postCall<ReturnType>(
  axios: AxiosInstance,
  endpoint: string,
  params: object,
  opts?: CallOpts,
) {
  return new Promise<ReturnType>((res, rej) => {
    axios
      .post<ReturnType>(endpoint, params, opts?.axiosConfig) //// Sometimes Causes saveForLessonTest to fail
      .then((resp) => {
        res(resp.data)
      })
      .catch(rej)
  })
}

/**
 * @deprecated
 * Makes a `POST` Call via `axios.post()`, putting the parameters in a FormData object
 * @param _axios - Axios instance
 * @param endpoint - Absolute path of the endpoint to make a network request to
 * @param params - Object of parameters to send with the request
 * @param opts - Object of options to send with the request, including `opts.axiosConfig`
 * @returns A Promise
 */
export function postFormCall<
  ReturnType,
  T = {
    [propertyName: string]: string | null | number | boolean | (File | Blob)[]
  },
>(_axios: AxiosInstance, endpoint: string, params: T, opts?: CallOpts) {
  return new Promise<ReturnType>((res, rej) => {
    // ? Might be other parameters that were passed in but are now unused ?
    const { axiosConfig = {} } = opts || {}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { files, ...rest } = params

    const form = new FormData()

    if (Array.isArray(files) && files.length > 0) {
      // * This is hack for our existing Upload service, which is the only known case for using `postFormCall`
      files.forEach((file: File, idx: number) => {
        form.append(`file${idx + 1}`, file)
      })
    }
    const otherArgs = Object.entries(rest)

    if (otherArgs.length) {
      otherArgs.forEach(([propertyName, propertyValue]) => {
        if (typeof propertyValue === 'string') {
          form.append(propertyName, propertyValue)
        } else if (typeof propertyValue === 'number') {
          form.append(propertyName, `${propertyValue}`)
        } else if (Array.isArray(propertyValue)) {
          form.append(propertyName, propertyValue.join(','))
        }
      })
    }
    _axios
      .post<ReturnType>(endpoint, form, {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...axiosConfig,
      })
      .then((resp) => {
        res(resp.data)
      })
      .catch(rej)
  })
}

/**
 * Makes a `POST` Call via `axios.post()`, putting the parameters in a URL-encoded string
 * @param _axios - Axios instance
 * @param endpoint - Absolute path of the endpoint to make a network request to
 * @param params - Object of parameters to send with the request
 * @param opts - Object of options to send with the request, including `opts.axiosConfig`
 * @returns A Promise
 */
//** */ Used for Badge Asset Upload
export function postUrlEncodedFormCall<
  ReturnType,
  T extends { [key: string]: string | number | boolean | null },
>(_axios: AxiosInstance, endpoint: string, params: T, opts?: CallOpts) {
  return new Promise<ReturnType>((res, rej) => {
    const { axiosConfig = {} } = opts || {}

    const urlEncodedParams = new URLSearchParams()

    Object.entries(params).forEach(([propertyName, propertyValue]) => {
      if (propertyValue !== null && propertyValue !== undefined) {
        urlEncodedParams.append(propertyName, String(propertyValue))
      }
    })

    _axios
      .post<ReturnType>(endpoint, urlEncodedParams.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        ...axiosConfig,
      })
      .then((resp) => {
        res(resp.data)
      })
      .catch((err) => {
        console.error('Error:', err)
        rej(err)
      })
  })
}
/**
 * @deprecated
 * Makes a `PUT` Call via `axios.put()`
 * @param _axios
 * @param endpoint - Absolute path of the endpoint to make a network request to
 * @param params - Object of parameters to send with the request
 * @param opts - Object of options to send with the request, including `opts.axiosConfig`
 * @returns A Promise
 */
export function putCall<ReturnType>(
  _axios: AxiosInstance,
  endpoint: string,
  params: object,
  opts?: CallOpts,
) {
  return new Promise<ReturnType>((res, rej) => {
    _axios
      .put(
        endpoint,
        {
          ...params,
          ..._.get(opts, 'axiosConfig', {}),
          ...DEFAULT_OPTS,
        },
        opts?.axiosConfig,
      )
      .then((resp) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        res(resp.data)
      })
      .catch(rej)
  })
}
