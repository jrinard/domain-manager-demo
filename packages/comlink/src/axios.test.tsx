import { renderHook } from '@testing-library/react'
import { describe, it } from 'vitest'
import { AxiosInstanceProvider, useAxiosInstance } from './axios'
import axios from 'axios'

describe('AxiosInstanceProvider', () => {
  it('returns the same provided instance when using useAxiosInstance()', () => {
    const axiosInstance = axios.create({
      baseURL: 'https://localhost:8080/api/v1',
    })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const wrapper = ({ children }) => (
      <AxiosInstanceProvider axios={axiosInstance}>
        {children}
      </AxiosInstanceProvider>
    )
    const { result } = renderHook(() => useAxiosInstance(), { wrapper })

    expect(result.current.defaults.baseURL).toBe(
      'https://localhost:8080/api/v1'
    )
  })
})
