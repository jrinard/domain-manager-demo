import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useImageCropData } from './hooks'
import { PropsWithChildren } from 'react'
import { QueryClientProvider } from '@spacedock/holoprojector'

describe('useImageCropData', () => {
  it('returns a Function called "createCroppedImageBlobFromData"', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <QueryClientProvider>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useImageCropData(), { wrapper })

    expect(result.current.createCroppedImageBlobFromData).toBeTruthy()
  })

  it('returns a property called "crop" that is undefined by default', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <QueryClientProvider>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useImageCropData(), { wrapper })

    expect(result.current.crop).toBeFalsy()
  })

  it('returns a Function called "onCropChange"', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <QueryClientProvider>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useImageCropData(), { wrapper })

    expect(result.current.onCropChange).toBeTruthy()
  })

  it('returns a ref called "imgRef" that is null by default', async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <QueryClientProvider>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useImageCropData(), { wrapper })

    expect(result.current.imgRef.current).toBeNull()
  })
})
