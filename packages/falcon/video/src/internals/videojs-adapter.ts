/**
 * video.js v8 adapter -- PRIVATE, never exported from the package barrel.
 *
 * When migrating to v10, this file gets replaced by v10-adapter.ts.
 * The public VideoPlayerHandle interface stays the same.
 */
import videojs from 'video.js'
import type { VideoPlayerHandle, VideoSource, TextTrack } from '../types'

type Player = ReturnType<typeof videojs>
type VjsRemoteTextTrack = Parameters<Player['removeRemoteTextTrack']>[0]

export interface AdapterOptions {
  playbackRates?: number[]
  autoplay?: boolean
  controls?: boolean
  responsive?: boolean
  fluid?: boolean
  aspectRatio?: string
  playsInline?: boolean
}

export interface AdapterCallbacks {
  onReady?: (handle: VideoPlayerHandle) => void
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  onTimeUpdate?: (currentTime: number) => void
  onDurationChange?: (duration: number) => void
  onSeeking?: (currentTime: number) => void
  onError?: (error: { code: number; message: string } | null) => void
  onVolumeChange?: (volume: number) => void
  onRateChange?: (rate: number) => void
  onLoadStart?: (src: string) => void
  onLoadedData?: () => void
  onDispose?: () => void
}

export function createVideoPlayerHandle(player: Player): VideoPlayerHandle {
  return {
    play: () => {
      void player.play()?.catch(() => undefined)
    },
    pause: () => {
      player.pause()
    },
    currentTime: () => player.currentTime() ?? 0,
    seek: (time: number) => {
      player.currentTime(time)
    },
    duration: () => player.duration() ?? 0,
    volume: () => player.volume() ?? 1,
    setVolume: (v: number) => {
      player.volume(v)
    },
    playbackRate: () => player.playbackRate() ?? 1,
    setPlaybackRate: (rate: number) => {
      player.playbackRate(rate)
    },
    isDisposed: () => player.isDisposed(),
  }
}

export function initPlayer(
  videoElement: HTMLVideoElement,
  sources: VideoSource[],
  tracks: TextTrack[],
  options: AdapterOptions,
  callbacks: AdapterCallbacks,
  initialVolume?: number,
  initialPlaybackRate?: number,
): { player: Player; handle: VideoPlayerHandle } {
  const playerOptions: Record<string, unknown> = {
    controls: options.controls ?? true,
    responsive: options.responsive,
    fluid: options.fluid,
    aspectRatio: options.aspectRatio,
    playbackRates: options.playbackRates ?? [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
    sources,
    tracks: tracks.map(({ mimeType: _, ...t }) => t),
    ...(options.playsInline != null && {
      playsinline: options.playsInline,
    }),
  }

  if (options.autoplay) {
    playerOptions.autoplay = options.autoplay
  }

  const player = videojs(videoElement, playerOptions, function onReady() {
    if (typeof initialVolume === 'number') {
      player.volume(initialVolume)
    }
    if (typeof initialPlaybackRate === 'number') {
      player.playbackRate(initialPlaybackRate)
    }

    const handle = createVideoPlayerHandle(player)
    callbacks.onReady?.(handle)
  })

  wireEvents(player, callbacks)

  const handle = createVideoPlayerHandle(player)
  return { player, handle }
}

function wireEvents(player: Player, callbacks: AdapterCallbacks) {
  player.on('play', () => callbacks.onPlay?.())
  player.on('pause', () => callbacks.onPause?.())
  player.on('ended', () => callbacks.onEnded?.())

  player.on('timeupdate', () => {
    callbacks.onTimeUpdate?.(player.currentTime() ?? 0)
  })

  player.on('durationchange', () => {
    callbacks.onDurationChange?.(player.duration() ?? 0)
  })

  player.on('seeking', () => {
    callbacks.onSeeking?.(player.currentTime() ?? 0)
  })

  player.on('volumechange', () => {
    callbacks.onVolumeChange?.(player.volume() ?? 1)
  })

  player.on('ratechange', () => {
    callbacks.onRateChange?.(player.playbackRate() ?? 1)
  })

  player.on('loadstart', () => {
    callbacks.onLoadStart?.(player.currentSrc() ?? '')
  })

  player.on('loadeddata', () => {
    callbacks.onLoadedData?.()
  })

  player.on('error', () => {
    const error = player.error()
    if (error) {
      callbacks.onError?.({
        code: error.code ?? 0,
        message: error.message ?? 'Unknown video error',
      })
    } else {
      callbacks.onError?.(null)
    }
  })
}

export function disposePlayer(player: Player) {
  if (player && !player.isDisposed()) {
    player.dispose()
  }
}

export function updateSources(player: Player, sources: VideoSource[]) {
  if (!player.isDisposed()) {
    player.src(sources)
  }
}

export function updateTracks(player: Player, tracks: TextTrack[]) {
  if (player.isDisposed()) return

  const existing = player.remoteTextTracks()
  // video.js types model TextTrackList without a numeric index or `item()`; snapshot for safe removal.
  const snapshot = Array.from(existing as unknown as Iterable<VjsRemoteTextTrack>)
  for (let i = snapshot.length - 1; i >= 0; i--) {
    const t = snapshot[i]
    if (t) {
      player.removeRemoteTextTrack(t)
    }
  }

  for (const track of tracks) {
    player.addRemoteTextTrack(
      {
        src: track.src,
        kind: track.kind,
        srclang: track.srclang,
        label: track.label,
        default: track.default,
      },
      false,
    )
  }

  player.trigger('texttrackchange')
}
