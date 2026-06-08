import { useState } from 'react'
import { useEventListener } from './useEventListener'

export interface ScreenSizeData {
  innerWidth: number
  innerHeight: number
  semanticScreenWidth: 'mobile' | 'tablet' | 'desktop' | 'xl'
  aspectRatio: number
  screenOrientation: 'landscape' | 'portrait'
}

function getScreenSizeData(): ScreenSizeData {
  const innerWidth = window.innerWidth
  const innerHeight = window.innerHeight
  const aspectRatio = innerWidth / innerHeight

  return {
    innerWidth,
    innerHeight,
    semanticScreenWidth: determineSemanticScreenSizeWidth(innerWidth),
    aspectRatio,
    screenOrientation: innerWidth > innerHeight ? 'landscape' : 'portrait',
  }
}

function determineSemanticScreenSizeWidth(windowWidth: number) {
  if (windowWidth >= 1600) {
    return 'xl'
  } else if (windowWidth >= 1056) {
    return 'desktop'
  } else if (windowWidth >= 768) {
    return 'tablet'
  } else {
    return 'mobile'
  }
}

export function useScreenSize() {
  const [screenSize, setScreenSize] =
    useState<ScreenSizeData>(getScreenSizeData())

  useEventListener('resize', () => {
    setScreenSize(getScreenSizeData())
  })

  return screenSize
}
