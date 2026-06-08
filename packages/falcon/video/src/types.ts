/**
 * Public types for @falcon/video.
 *
 * These types are intentionally decoupled from any specific video.js version
 * so that internals can be swapped (e.g. v8 -> v10) without breaking consumers.
 */

export interface VideoSource {
  src: string
  type: string
}

export interface TextTrack {
  src: string
  kind: 'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata'
  srclang: string
  label: string
  default?: boolean
  /** Hint for consumers (e.g. SRT vs WebVTT); not passed to video.js. */
  mimeType?: string
}

export interface VideoPlayerHandle {
  play: () => void
  pause: () => void
  currentTime: () => number
  seek: (time: number) => void
  duration: () => number
  volume: () => number
  setVolume: (v: number) => void
  playbackRate: () => number
  setPlaybackRate: (rate: number) => void
  isDisposed: () => boolean
}

export interface VideoPlayerError {
  code: number
  message: string
}

export interface VideoPlayerProps {
  sources: VideoSource[]
  tracks?: TextTrack[]
  mediaType?: 'video' | 'audio'
  autoplay?: boolean
  controls?: boolean
  responsive?: boolean
  fluid?: boolean
  aspectRatio?: string
  poster?: string
  playsInline?: boolean
  playbackRates?: number[]
  initialVolume?: number
  initialPlaybackRate?: number
  seekTo?: number
  className?: string
  style?: React.CSSProperties

  onReady?: (handle: VideoPlayerHandle) => void
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  onTimeUpdate?: (currentTime: number) => void
  onDurationChange?: (duration: number) => void
  onSeeking?: (currentTime: number) => void
  onError?: (error: VideoPlayerError | null) => void
  onVolumeChange?: (volume: number) => void
  onRateChange?: (rate: number) => void
  onLoadStart?: (src: string) => void
  onLoadedData?: () => void
  onDispose?: () => void
}
