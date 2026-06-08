import { renderHook } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { PropsWithChildren } from 'react'
import { useSearchParamNumber } from './useSearchParamNumber'

describe('useSearchParamNumber', () => {
  it('returns number from url query / search', () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <MemoryRouter initialEntries={['/employee?id=123&type=admin']}>
        <Routes>
          <Route path="/employee" element={children} />
        </Routes>
      </MemoryRouter>
    )
    const { result } = renderHook(() => useSearchParamNumber('id'), { wrapper })

    expect(result.current).toEqual(123)
  })
  it('returns undefined from url parameter', () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <MemoryRouter initialEntries={['/employee?id=123&type=admin']}>
        <Routes>
          <Route path="/employee" element={children} />
        </Routes>
      </MemoryRouter>
    )
    const { result } = renderHook(() => useSearchParamNumber('domainID'), {
      wrapper,
    })

    expect(result.current).toEqual(undefined)
  })
})
