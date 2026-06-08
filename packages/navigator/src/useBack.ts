import { useBack as useBackCore } from 'use-back'

export interface UseBack {
  canGoBack: boolean
  goBack: () => void
}

export const useBack = (): UseBack => {
  const { hasBack, handleBack } = useBackCore()
  return {
    canGoBack: hasBack,
    goBack: handleBack,
  }
}
