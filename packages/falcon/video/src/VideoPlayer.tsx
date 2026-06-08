import { useEffect, useRef, useCallback } from 'react'
import type { VideoPlayerProps, VideoPlayerHandle } from './types'
import {
  initPlayer,
  disposePlayer,
  type AdapterCallbacks,
} from './internals/videojs-adapter'
import 'video.js/dist/video-js.css'
import './style.scss'

type PlayerInstance = ReturnType<typeof initPlayer>

export function VideoPlayer({
  sources,
  tracks = [],
  mediaType = 'video',
  autoplay,
  controls = true,
  responsive,
  fluid,
  aspectRatio,
  poster,
  playsInline,
  playbackRates,
  initialVolume,
  initialPlaybackRate,
  seekTo,
  className,
  style,
  onReady,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onDurationChange,
  onSeeking,
  onError,
  onVolumeChange,
  onRateChange,
  onLoadStart,
  onLoadedData,
  onDispose,
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<PlayerInstance | null>(null)
  const handleRef = useRef<VideoPlayerHandle | null>(null)

  // Stabilize callbacks in refs so the player doesn't re-init on every render
  const callbacksRef = useRef<AdapterCallbacks>({})
  callbacksRef.current = {
    onReady: (handle) => {
      handleRef.current = handle
      onReady?.(handle)
    },
    onPlay,
    onPause,
    onEnded,
    onTimeUpdate,
    onDurationChange,
    onSeeking,
    onError,
    onVolumeChange,
    onRateChange,
    onLoadStart,
    onLoadedData,
    onDispose,
  }

  const stableCallbacks = useRef<AdapterCallbacks>({})
  // Wrap each callback so it always delegates to the latest ref
  if (!stableCallbacks.current.onReady) {
    stableCallbacks.current = {
      onReady: (h) => callbacksRef.current.onReady?.(h),
      onPlay: () => callbacksRef.current.onPlay?.(),
      onPause: () => callbacksRef.current.onPause?.(),
      onEnded: () => callbacksRef.current.onEnded?.(),
      onTimeUpdate: (t) => callbacksRef.current.onTimeUpdate?.(t),
      onDurationChange: (d) => callbacksRef.current.onDurationChange?.(d),
      onSeeking: (t) => callbacksRef.current.onSeeking?.(t),
      onError: (e) => callbacksRef.current.onError?.(e),
      onVolumeChange: (v) => callbacksRef.current.onVolumeChange?.(v),
      onRateChange: (r) => callbacksRef.current.onRateChange?.(r),
      onLoadStart: (s) => callbacksRef.current.onLoadStart?.(s),
      onLoadedData: () => callbacksRef.current.onLoadedData?.(),
      onDispose: () => callbacksRef.current.onDispose?.(),
    }
  }

  // Initialize the player once on mount
  const initializePlayer = useCallback(() => {
    if (!containerRef.current) return

    const videoEl = document.createElement(
      mediaType === 'audio' ? 'video' : 'video',
    )
    videoEl.classList.add('video-js')
    if (className) {
      videoEl.classList.add(...className.split(/\s+/).filter(Boolean))
    }
    if (poster) {
      videoEl.setAttribute('poster', poster)
    }
    if (playsInline) {
      videoEl.setAttribute('playsinline', 'true')
    }
    containerRef.current.appendChild(videoEl)

    const instance = initPlayer(
      videoEl,
      sources,
      tracks,
      {
        autoplay,
        controls,
        responsive,
        fluid,
        aspectRatio,
        playbackRates,
        playsInline,
      },
      stableCallbacks.current,
      initialVolume,
      initialPlaybackRate,
    )

    playerRef.current = instance
    handleRef.current = instance.handle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    initializePlayer()

    return () => {
      if (playerRef.current) {
        callbacksRef.current.onDispose?.()
        disposePlayer(playerRef.current.player)
        playerRef.current = null
        handleRef.current = null
      }
    }
  }, [initializePlayer])

  // Handle seekTo prop changes
  useEffect(() => {
    if (
      seekTo != null &&
      handleRef.current &&
      !handleRef.current.isDisposed()
    ) {
      handleRef.current.seek(seekTo)
    }
  }, [seekTo])

  // Handle source changes after initial mount
  const prevSourcesRef = useRef(sources)
  useEffect(() => {
    if (prevSourcesRef.current === sources) return
    prevSourcesRef.current = sources

    if (playerRef.current && !playerRef.current.handle.isDisposed()) {
      const { player } = playerRef.current
      import('./internals/videojs-adapter').then(({ updateSources }) => {
        updateSources(player, sources)
      })
    }
  }, [sources])

  // Handle track changes after initial mount (tracks arrive async from _resolveEncodings)
  const prevTracksRef = useRef(tracks)
  useEffect(() => {
    if (prevTracksRef.current === tracks) return
    prevTracksRef.current = tracks

    if (playerRef.current && !playerRef.current.handle.isDisposed()) {
      const { player } = playerRef.current
      import('./internals/videojs-adapter').then(({ updateTracks }) => {
        updateTracks(player, tracks)
      })
    }
  }, [tracks])

  return (
    <div
      data-vjs-player
      ref={containerRef}
      style={style}
      onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    />
  )
}
