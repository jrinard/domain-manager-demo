import { useAppBaseUrl } from './useAppBaseUrl'

export const useAppPath = (
  appName: string | undefined,
  to: string,
): string | undefined => {
  const baseUrl = useAppBaseUrl(appName)

  if (baseUrl === undefined) {
    return undefined
  }

  return `${baseUrl}${baseUrl[baseUrl.length - 1] === '/' ? '' : '/'}${to}`
}
