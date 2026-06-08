import { useMemo } from 'react'
import { createFileURL } from '../../utils/file-path'

export const useSafeDestinationPath = (path: string) => {
  return useMemo(() => {
    // Normalize malformed URLs (e.g., "https:/domain.com" -> "https://domain.com")
    const normalizedPath = normalizeUrl(path)
    
    if (isRelativePath(normalizedPath)) {
      return createFileURL(normalizedPath)
    }

    return normalizedPath
  }, [path])
}

function normalizeUrl(path: string): string {
  // Fix malformed URLs like "https:/domain.com" or "http:/domain.com"
  if (path.startsWith('https:/') && !path.startsWith('https://')) {
    return path.replace(/^https:\//, 'https://')
  }
  if (path.startsWith('http:/') && !path.startsWith('http://')) {
    return path.replace(/^http:\//, 'http://')
  }
  return path
}

function isRelativePath(path: string) {
  return !path.startsWith('http://') && !path.startsWith('https://')
}
