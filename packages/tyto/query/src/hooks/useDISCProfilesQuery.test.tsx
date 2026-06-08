import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import axios from 'axios'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { sortBy } from 'lodash'

import { TytoClientProvider, TYTO_ENDPOINT_PATHS } from '@tyto/client'
import type { Endpoints } from '@tyto/client'

import { useDISCProfilesQuery } from './useDISCProfilesQuery'

vi.mock('@spacedock/cargo-bay', () => ({
  SessionHandling: { getActiveSessionKey: () => 'key' },
}))

function randomDISCValue() {
  return Math.max(16, Math.min(0, Math.random() * 16)) - 8
}

function createFakeDiscProfile() {
  const profile = {
    personID: 123,
    d1: randomDISCValue(),
    i1: randomDISCValue(),
    s1: randomDISCValue(),
    c1: randomDISCValue(),
    d2: randomDISCValue(),
    i2: randomDISCValue(),
    s2: randomDISCValue(),
    c2: randomDISCValue(),
    d3: randomDISCValue(),
    i3: randomDISCValue(),
    s3: randomDISCValue(),
    c3: randomDISCValue(),
    styleName3: 'TEST',
  }

  const letters = sortBy(
    [
      ['D', profile.d2],
      ['I', profile.i2],
      ['S', profile.s2],
      ['C', profile.c2],
    ] as const,
    ['[1]'],
    ['desc'],
  )
    .filter(([identifier, value]) => value > 0)
    .map(([identifier]) => identifier)
    .join('')

  return {
    ...profile,
    styleKey3: letters,
  }
}

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
}

export const restHandlers = [
  rest.get<Endpoints.Tyto.DISCProfilesMini.Get.Response>(
    `https://localhost:8080/api${TYTO_ENDPOINT_PATHS.DISCPROFILES_MINI}`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          permit: {},
          discProfiles: [createFakeDiscProfile()],
        }),
      )
    },
  ),
]

const server = setupServer(...restHandlers)

describe('useConversationItemMutation', () => {
  // Start server before all tests
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' })
  })

  //  Close server after all tests
  afterAll(() => server.close())

  // Reset handlers after each test `important for test isolation`
  afterEach(() => {
    server.resetHandlers()
  })
  // * Happy Path (Loading a Single DISC Profile)
  it('returns an Array of a Single DISC Profile', async () => {
    const queryClient = createQueryClient()

    const wrapper = ({ children }: PropsWithChildren) => (
      <TytoClientProvider
        axiosStatic={axios}
        baseURL={'https://localhost:8080/api'}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </TytoClientProvider>
    )
    const { result, rerender } = renderHook(
      () => useDISCProfilesQuery({ personIDs: [123] }),
      { wrapper },
    )

    rerender()
    await waitFor(() => {
      expect(result.current.isPending).toBe(false)
    })

    expect(typeof result.current.data?.discProfiles?.[0]).toBe('object')
    expect(result.current.data?.discProfiles?.[0]?.personID).toBe(123)
    expect(typeof result.current.data?.discProfiles?.[0]?.styleKey3).toBe(
      'string',
    )
    expect(result.current.data?.discProfiles?.[0]?.styleKey3).toEqual('DISC')
    expect(result.current.data).toHaveProperty(
      'discProfiles[0].styleKey3',
      'DISC',
    )
  })
})
