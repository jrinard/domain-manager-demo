import { renderHook } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import axios from 'axios'
import { afterAll, afterEach, beforeAll, expect } from 'vitest'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

import { TytoClientProvider } from '../context'
import useTytoClient from './useTytoClient'
import { AssetEncoding } from '../resources/Asset.Encoding'
import { PropsWithChildren } from 'react'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

export const restHandlers = [
  rest.post(
    `https://localhost:8080/api${AssetEncoding.endpoint}`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          block: {},
        })
      )
    }
  ),
]

const server = setupServer(...restHandlers)

describe('Hook and Provider for TyoClient', () => {
  // Start server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  //  Close server after all tests
  afterAll(() => server.close())

  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers())
  it('returns the same provided instance when using useTytoClient()', () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider
        axiosStatic={axios}
        baseURL={'https://localhost:8080/api'}
      >
        {children}
      </TytoClientProvider>
    )
    const { result } = renderHook(() => useTytoClient(), { wrapper })

    expect(result.current).toHaveProperty(
      'axiosInstance.defaults.baseURL',
      'https://localhost:8080/api'
    )
  })
})
