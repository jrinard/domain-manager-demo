import { escapeRegExp, keyBy } from 'lodash'
import type { Data, TytoData } from '@spacedock/manifest'
import { ActiveSession } from '@spacedock/cargo-bay'

export function filterNonEnabledEncodings(encodings?: Data.Encoding[]) {
  if (!encodings || !encodings.length) {
    return []
  }

  return encodings.filter((enc) => enc.activeStatus === 'ocENABLED')
}

export function getEncoding(
  encodings: Data.Encoding[],
  targetEncoding: keyof typeof TytoData.EncodingType,
) {
  if (!encodings || !encodings.length) {
    return undefined
  }

  const keyedEncodings = keyBy(
    filterNonEnabledEncodings(encodings),
    'encodingType',
  )

  // * Treating ocTHUMBNAIL as a special case since in the case of PDFs there are other potentially usable encodings to use in place of a thumbnail
  if (targetEncoding === 'ocTHUMBNAIL') {
    if (keyedEncodings[targetEncoding]) {
      return keyedEncodings[targetEncoding]
    }

    const backupEnc =
      keyedEncodings['ocPDFIMAGES/imgtmp'] ||
      keyedEncodings['ocPDFJSON/jspageimg'] ||
      keyedEncodings['ocPDFIMAGES/thumbtmp'] ||
      keyedEncodings['ocPDFJSON/jspageimg']

    if (backupEnc) {
      return mutatePDFImagePathToBeReadable(backupEnc)
    }
  }

  const key = String(targetEncoding)

  if (key in keyedEncodings) {
    return keyedEncodings[key]
  }

  return (
    keyedEncodings['ocDEFAULT'] ||
    keyedEncodings['ocLARGE'] ||
    keyedEncodings['ocMEDIUM'] ||
    keyedEncodings['ocSMALL'] ||
    keyedEncodings['ocTHUMBNAIL'] ||
    keyedEncodings['ocORIGINAL']
  )
}

export function mutatePDFImagePathToBeReadable(
  encoding: Data.Encoding,
  targetPage = 1,
) {
  if (!encoding) {
    return undefined
  } else if (!encoding.pathURL) {
    return encoding
  }

  if (/\{(0){4}\}/i.test(encoding.pathURL)) {
    const targetPageAsStr = `${targetPage}`
    const pageNumAsString = `${'0'.repeat(4 - targetPageAsStr.length)}`
    const mutatedPathURL = encoding.pathURL.replace('{0000}', pageNumAsString)
    encoding.pathURL = mutatedPathURL
  } else if (/\{0\}/i.test(encoding.pathURL)) {
    const mutatedPathURL = encoding.pathURL.replace('{0}', `${targetPage}`)
    encoding.pathURL = mutatedPathURL
  }

  return encoding
}

export function getEncodingExplicitly(
  encodings: Data.Encoding[],
  targetEncoding: keyof typeof TytoData.EncodingType,
) {
  if (!encodings || !encodings.length) {
    return undefined
  }

  const keyedEncodings = keyBy(
    filterNonEnabledEncodings(encodings),
    'encodingType',
  )

  const key = String(targetEncoding)

  return keyedEncodings[key]
}

type CCMimeType = 'srt' | 'vtt'
type ScopeOptions =
  | 'video'
  | 'image'
  | 'text'
  | CCMimeType
  | 'pdf'
  | 'application'

export function getScopedEncodings({
  encodings,
  encodingTypeScope,
  mimeTypeScope,
}: {
  encodings: Data.Encoding[]
  mimeTypeScope?: ScopeOptions | ScopeOptions[]
  encodingTypeScope?:
    | keyof typeof TytoData.EncodingType
    | keyof (typeof TytoData.EncodingType)[]
}) {
  if (!encodings || !encodings.length) {
    return []
  }

  const filterEncodings = mimeTypeScope || encodingTypeScope

  // * Where both being defined is treated an '&&'
  const scopedEncodings = filterEncodings
    ? encodings.filter((enc) => {
        if (enc.activeStatus !== 'ocENABLED') {
          return false
        }

        let passesRegExp = true

        // * If there is a mimeTypeScope, update vallue to whether it passes or not
        if (mimeTypeScope) {
          const regExp = new RegExp(
            Array.isArray(mimeTypeScope)
              ? `(${mimeTypeScope.join('|')})`
              : escapeRegExp(mimeTypeScope),
            'i',
          )

          passesRegExp = regExp.test(enc.mimeType)

          if (!passesRegExp) {
            return false
          }
        }

        // * If encodingType is truthy, return result of whether it passes or not
        if (encodingTypeScope) {
          if (Array.isArray(encodingTypeScope)) {
            const regExp = new RegExp(`(${encodingTypeScope.join('|')})`, 'i')

            return regExp.test(enc.encodingType)
          }

          return enc.encodingType === encodingTypeScope
        }

        return true
      })
    : encodings

  return scopedEncodings
}

export function getScopedEncoding({
  encodings,
  targetEncoding = 'ocDEFAULT',
  mimeTypeScope,
}: {
  encodings: Data.Encoding[]
  targetEncoding?: keyof typeof TytoData.EncodingType
  mimeTypeScope?:
    | 'video'
    | 'image'
    | 'text'
    | 'srt'
    | 'pdf'
    | 'application'
    | 'octet-stream'
}) {
  const enabledEncodings = (encodings || []).filter(
    (enc) => enc.activeStatus === 'ocENABLED',
  )

  if (!enabledEncodings || !enabledEncodings.length) {
    return undefined
  }

  const scopedEncodings = mimeTypeScope
    ? enabledEncodings.filter((enc) => {
        const regExp = new RegExp(escapeRegExp(mimeTypeScope), 'i')

        return regExp.test(enc.mimeType)
      })
    : enabledEncodings

  if (!scopedEncodings.length) {
    return undefined
  }

  return getEncoding(scopedEncodings, targetEncoding)
}

export function getProfileImageEncoding({
  profileImage,
  targetEncodingType = 'ocTHUMBNAIL',
}: {
  profileImage?: Data.ProfileImageAsset
  targetEncodingType: keyof typeof TytoData.EncodingType
}) {
  if (
    !profileImage ||
    !profileImage.encodings ||
    !profileImage.encodings.length
  ) {
    return ''
  }

  const targetEncoding = getEncoding(profileImage.encodings, targetEncodingType)

  return targetEncoding
}

export function getProfileImagePathURL({
  profileImage,
  targetEncodingType = 'ocTHUMBNAIL',
}: {
  profileImage: Data.ProfileImageAsset | undefined
  targetEncodingType: keyof typeof TytoData.EncodingType
}) {
  const targetEncoding = getProfileImageEncoding({
    profileImage,
    targetEncodingType,
  })

  return targetEncoding ? targetEncoding.pathURL : ''
}

export function makePathFullyQualified({
  baseURL,
  relativePath,
  includeSessionKey = false,
}: {
  baseURL: string
  relativePath: string
  includeSessionKey?: boolean
}) {
  if (!relativePath || !baseURL) {
    return ''
  } else if (baseURL.startsWith('//')) {
    // * If baseURL is the dynamic origin, lets not break things here, since `URL` contructor
    // * will throw an `unhandled exception` if the `base` does not have a proper `protocol`
    baseURL = `https:${baseURL}`
  }

  // * If it is a url insetad of a path, lets split off the path
  // * Matches: `https://cherrylb.mocaworks.com/tyto/api`
  // * Matches: `http://cherrylb.mocaworks.com/tyto/api`
  // * Matches: `//cherrylb.mocaworks.com/tyto/api`
  // * Matches: `cherrylb.mocaworks.com/foo/path/file.svg`
  // * NOT matches: `/tyto/api`
  // * NOT matches: `/foo/path/file.svg`
  if (looksLikeURL(relativePath)) {
    const url = new URL(relativePath, window.location.origin)
    relativePath = url.pathname + url.search + url.hash
  }

  if (!looksLikeURL(baseURL)) {
    // * It is a path and not a full URL, so we need to get the safe href
    const fallbackOrigin =
      window?.location?.origin || ActiveSession.onCourseURL() || ''

    baseURL = `${fallbackOrigin}${baseURL}`

    if (!looksLikeURL(baseURL)) {
      baseURL = fallbackOrigin
    }
  }

  // * Odd, but needs to account for the case where the `baseURL` contains path,
  // * Such as: `https://cherrylb.mocaworks.com/tyto/api`
  // * If it is only passed as the `base`, then `path` gets lopped off and the url will break...
  // * I don't beleve there is a benefit (that I can think of) of redundantly passing the `base` (2nd argument)
  // * But it should not break anything either.
  const url = new URL(`${baseURL}${relativePath}`, baseURL)

  // Caption downloads (Tryyb / `ExistingCaptions`) hit `/x//v2/...` when the dev app base
  // (`/x/`) was concatenated with Tyto `pathURL`s that start with `/v2/..
  if (url.pathname.includes('//')) {
    url.pathname = url.pathname.replace(/\/{2,}/g, '/')
  }

  if (includeSessionKey) {
    url.searchParams.set('sessionKey', ActiveSession.sessionKey() || '')
  }

  return url.toString()
}

function looksLikeURL(urlOrPath: string) {
  return /^((http(s)?:)?\/\/)?(\w|\d|-)+((\.(\w|\d|-|\.)+)|(:\d+))(\/)?/i.test(
    urlOrPath,
  )
}

/**
 * URL Class breaks if given a path and we do not want to override the origin if the value is a full URL.
 * @param urlOrPath
 * @returns
 */
function getSafeHRef(urlOrPath: string) {
  const a = document.createElement('a')
  a.href = urlOrPath
  const href = a.href
  a.remove()

  return href
}

/**
 * Creates a URL string from the supplied path or URL, and optional params.
 * If the `pathOrURL` is only a path, the return values does not contain the origin.
 */
export function createURLString(
  pathOrURL: string,
  params?: Record<string, string | boolean | number | undefined | null>,
): string {
  // Determine if the input contains a domain/origin
  const hasOrigin =
    pathOrURL.startsWith('http://') ||
    pathOrURL.startsWith('https://') ||
    pathOrURL.startsWith('//')

  // Create a URL object
  let url: URL
  if (hasOrigin) {
    // For protocol-relative URLs (//example.com), prepend https:
    const fullURL = pathOrURL.startsWith('//')
      ? `https:${pathOrURL}`
      : pathOrURL
    url = new URL(fullURL)
  } else {
    // For paths, use a dummy base URL
    url = new URL(
      pathOrURL,
      window.location.origin || 'https://example.mocaworks.com',
    )
  }

  // Add search params if provided
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value))
      }
    })
  }

  // Return based on whether the input had an origin
  if (hasOrigin) {
    return url.toString()
  } else {
    return url.pathname + url.search + url.hash
  }
}

export function getTargetAssets({
  assets,
  targetAssetType,
}: {
  assets: Data.Asset[]
  targetAssetType: TytoData.AssetType
}) {
  return assets.filter((asset) => asset.assetType === targetAssetType)
}

/** Non-playback encoding types on video/audio primary assets */
const PLAYBACK_EXCLUDE_ENCODING_TYPES = /ocTHUMBNAIL|ocFFPROBE|ocCAPTION/i

/**
 * Enabled video (progressive) + HLS encodings suitable for HTML5 / Video.js playback.
 * Excludes thumbnails, probes, caption encodings, QuickTime, and .mov paths.
 */
export function getPlayableVideoEncodings(encodings: Data.Encoding[]) {
  if (!encodings?.length) {
    return []
  }

  return encodings.filter((enc) => {
    if (enc.activeStatus !== 'ocENABLED') {
      return false
    }
    if (PLAYBACK_EXCLUDE_ENCODING_TYPES.test(enc.encodingType)) {
      return false
    }

    const mt = (enc.mimeType || '').toLowerCase()
    const path = enc.pathURL || ''
    const encodingType = enc.encodingType || ''

    const isHls =
      /ocHLS/i.test(encodingType) || mt === 'application/vnd.apple.mpegurl'

    const isProgressiveVideo =
      /^video\//.test(mt) &&
      !/quicktime/i.test(mt) &&
      !/(\w|\d)+\.mov/i.test(path)

    return isHls || isProgressiveVideo
  })
}

/**
 * Enabled audio encodings suitable for playback (excludes probes, thumbnails, etc.).
 */
export function getPlayableAudioEncodings(encodings: Data.Encoding[]) {
  if (!encodings?.length) {
    return []
  }

  return encodings.filter((enc) => {
    if (enc.activeStatus !== 'ocENABLED') {
      return false
    }
    if (PLAYBACK_EXCLUDE_ENCODING_TYPES.test(enc.encodingType)) {
      return false
    }
    return /audio/i.test(enc.mimeType || '')
  })
}

function encodingPlaybackPriorityRank(enc: Data.Encoding): number {
  const et = enc.encodingType || ''
  if (/ocHLS/i.test(et)) {
    return 1
  }
  if (et === 'ocLARGE') {
    return 2
  }
  if (et === 'ocMEDIUM') {
    return 3
  }
  if (et === 'ocSMALL') {
    return 4
  }
  if (et === 'ocDEFAULT') {
    return 5
  }
  if (et === 'ocORIGINAL') {
    return 99
  }
  return 50
}

/**
 * Sort encodings for Video.js `sources`: adaptive/HLS first, progressive renditions,
 * then unknown types, with `ocORIGINAL` last (fallback only).
 */
export function sortEncodingsByPlaybackPriority(
  encodings: Data.Encoding[],
): Data.Encoding[] {
  return [...encodings].sort((a, b) => {
    const ra = encodingPlaybackPriorityRank(a)
    const rb = encodingPlaybackPriorityRank(b)
    if (ra !== rb) {
      return ra - rb
    }
    const ha = a.height || 0
    const hb = b.height || 0
    return hb - ha
  })
}

export type PlayerTextTrackSpec = {
  src: string
  kind: 'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata'
  srclang: string
  label: string
  default?: boolean
  /** Source encoding MIME type (e.g. `text/srt`) for player-side proxy handling. */
  mimeType?: string
}

type AssetWithLanguage = Data.Asset & { languageTag?: string }

/**
 * Build text tracks for Video.js: prefers user-uploaded caption Assets (`ocCaption`).
 * If none exist, optionally falls back to auto-generated `ocCAPTION` encoding on the
 * primary video asset using `buildCaptionEncodingUrl`.
 */
export function getCaptionTracksFromAssets(
  assets: Data.Asset[],
  options?: {
    videoAsset?: Data.Asset
    buildCaptionEncodingUrl?: (videoAssetId: number) => string
  },
): PlayerTextTrackSpec[] {
  const captionAssets = assets.filter(
    (a) => (a.assetType as string) === 'ocCaption',
  )
  const tracks: PlayerTextTrackSpec[] = []

  for (const cap of captionAssets) {
    const fromSubtitleMime = getScopedEncodings({
      encodings: cap.encodings,
      mimeTypeScope: ['srt', 'vtt'],
    })
    const enc = fromSubtitleMime[0] || getEncoding(cap.encodings, 'ocORIGINAL')
    if (!enc?.pathURL) {
      continue
    }

    const langRaw = ((cap as AssetWithLanguage).languageTag || 'en').trim()
    const srclang =
      langRaw === '' || langRaw.toLowerCase() === 'und' ? 'en' : langRaw
    const label = cap.assetDesc?.trim() || cap.assetName || 'Captions'

    tracks.push({
      src: enc.pathURL,
      kind: 'subtitles',
      label,
      srclang,
      default: tracks.length === 0,
      mimeType: enc.mimeType,
    })
  }

  if (
    tracks.length === 0 &&
    options?.videoAsset &&
    options.buildCaptionEncodingUrl
  ) {
    const hasCaptionEncoding = options.videoAsset.encodings.some(
      (e: Data.Encoding) =>
        e.encodingType === 'ocCAPTION' && e.activeStatus === 'ocENABLED',
    )
    if (hasCaptionEncoding) {
      tracks.push({
        src: options.buildCaptionEncodingUrl(options.videoAsset.assetID),
        kind: 'subtitles',
        label: 'Captions',
        srclang: 'en',
        default: true,
      })
    }
  }

  return tracks
}
