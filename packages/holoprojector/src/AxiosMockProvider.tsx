/**
 * @cite https://gist.github.com/rafaelrozon/ed86efbea53094726e162dc05882cddc
 * Make into a decorator import { makeDecorator, useChannel } from '@storybook/addons'
 */
import MockAdapter from 'axios-mock-adapter'
import { ReactElement, ReactNode, useEffect, useRef } from 'react'
import axios from 'axios'
import { AxiosInstanceProvider, useAxiosInstance } from '@spacedock/comlink'

type MockInitCallback = (adapter: MockAdapter) => void

type AxiosMockProps = {
  children: ReactNode
  onInit?: MockInitCallback
}

export function AxiosMockProvider({
  children,
  onInit,
}: AxiosMockProps): ReactElement {
  const axios = useAxiosInstance()
  const mockAdapter = useRef(new MockAdapter(axios)).current
  onInit && onInit(mockAdapter)

  useEffect(() => {
    return () => {
      mockAdapter.restore()
    }
  }, [mockAdapter])

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}

export const withAxios =
  (options?: { baseURL?: string }) => (StoryFn: () => ReactNode) => {
    return (
      <AxiosInstanceProvider
        axios={axios.create({ baseURL: options?.baseURL })}
      >
        {StoryFn()}
      </AxiosInstanceProvider>
    )
  }

export type { MockInitCallback, MockAdapter }
export { axios }
