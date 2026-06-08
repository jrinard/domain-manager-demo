import { renderHook } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { PropsWithChildren } from 'react'
import { useParamNumber } from './useParamNumber'

describe('useParamNumber', () => {
  it('returns number from url parameter', () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <MemoryRouter initialEntries={['/domains/123']}>
        <Routes>
          <Route path="/domains/:domainID" element={children} />
        </Routes>
      </MemoryRouter>
    )
    const { result } = renderHook(() => useParamNumber('domainID'), { wrapper })

    expect(result.current).toEqual(123)
  })
  it('returns undefined from url parameter', () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <MemoryRouter initialEntries={['/persons/123']}>
        <Routes>
          <Route path="/domains/:domainID" element={children} />
          <Route path="/persons/:personID" element={children} />
        </Routes>
      </MemoryRouter>
    )
    const { result } = renderHook(() => useParamNumber('domainID'), { wrapper })

    expect(result.current).toEqual(undefined)
  })
})
