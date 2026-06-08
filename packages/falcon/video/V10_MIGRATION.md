# @falcon/video -- v10 Migration Reference

This document is a persistent reference for migrating the internals of `@falcon/video`
from video.js v8 to `@videojs/react` v10 when the v10 GA release ships.

**Created:** March 2026
**v10 GA target:** Mid-2026
**v8 EOL plan:** Moves to `video.js-legacy` at GA; security-only patches through 2027+

---

## Timeline

| Milestone | Date | Notes |
|---|---|---|
| v10 Beta | March 10, 2026 | APIs not yet stable. Experimental adoption encouraged. |
| v10 GA | Mid-2026 | Core feature parity with v8. Migration guides available. |
| v8 Legacy | Mid-2026 | Moved to `video.js-legacy` repo/package. CDN copies remain. |
| v8 Security-only | 2027+ | Community contributions de-prioritized. |

---

## Paradigm Comparison

### v8 (current implementation in `internals/videojs-adapter.ts`)

```typescript
// Initialization
const player = videojs(videoElement, options, onReady)

// State access (imperative)
player.currentTime()
player.paused()
player.duration()

// Actions
player.play()
player.pause()
player.currentTime(30) // seek

// Cleanup
player.dispose()
```

### v10 (`@videojs/react` -- future)

```tsx
import { createPlayer } from '@videojs/react'
import { videoFeatures, VideoSkin, Video } from '@videojs/react/video'

const Player = createPlayer({ features: videoFeatures })

// State access (reactive selectors, Zustand-like)
const paused = Player.usePlayer((s) => s.paused)
const currentTime = Player.usePlayer((s) => s.currentTime)

// Actions (from store)
const store = Player.usePlayer()
store.play()
store.pause()

// Rendering (declarative)
<Player.Provider>
  <VideoSkin>
    <Video src="video.mp4" />
  </VideoSkin>
</Player.Provider>

// Cleanup: handled automatically by Provider unmount
```

---

## What Stays Stable (DO NOT change during migration)

These are the public API surfaces consumed by apps (e.g., tryyb). They must remain
identical after the v10 swap:

- **`VideoPlayerProps`** interface (in `src/types.ts`)
- **`VideoPlayerHandle`** interface (in `src/types.ts`)
- **`VideoSource`** and **`TextTrack`** types
- **`VideoPlayer`** component prop signatures and callback behavior
- The `seekTo` prop contract
- All callback signatures: `onReady`, `onTimeUpdate`, `onDurationChange`, etc.
- The barrel export in `src/index.ts`

### Consumer code that must NOT need changes

- `apps/tryyb/src/subcomponents/kv-sub-video/Video.tsx` -- uses `VideoPlayer` + `VideoPlayerHandle`
- `apps/tryyb/src/subcomponents/kv-sub-video/types.ts` -- imports `VideoPlayerHandle`
- `apps/tryyb/src/services/kv-media-viewer/components/Viewer.tsx` -- uses Video via `getPosition`, `setPosition`
- `apps/tryyb/src/site/popups/kv-popups-course-viewer/components/LessonViewer.tsx` -- uses `onPlayerLoad`
- Any future consumer importing from `@falcon/video`

---

## What Changes Internally

All changes are confined to files within this package that are NOT exported:

### 1. Replace `src/internals/videojs-adapter.ts`

Create `src/internals/v10-adapter.ts` that implements the same `VideoPlayerHandle`
interface using v10's store:

```typescript
// v10 adapter concept
import { createPlayer } from '@videojs/react'
import { videoFeatures } from '@videojs/react/video'

const Player = createPlayer({ features: videoFeatures })

export function createVideoPlayerHandle(store: ReturnType<typeof Player.usePlayer>): VideoPlayerHandle {
  return {
    play: () => store.play(),
    pause: () => store.pause(),
    currentTime: () => store.currentTime ?? 0,
    seek: (time) => store.seek(time),
    duration: () => store.duration ?? 0,
    volume: () => store.volume ?? 1,
    setVolume: (v) => store.setVolume(v),
    playbackRate: () => store.playbackRate ?? 1,
    setPlaybackRate: (r) => store.setPlaybackRate(r),
    isDisposed: () => false, // Provider handles lifecycle
  }
}
```

### 2. Update `src/VideoPlayer.tsx` rendering

Replace the imperative DOM creation pattern:
```tsx
// v8 (current)
const videoEl = document.createElement('video')
containerRef.current.appendChild(videoEl)
initPlayer(videoEl, sources, tracks, options, callbacks)
```

With declarative v10 rendering:
```tsx
// v10 (future)
<Player.Provider>
  <VideoSkin>
    {isHLS ? <HlsVideo src={sources[0].src} /> : <Video src={sources[0].src} />}
  </VideoSkin>
</Player.Provider>
```

### 3. CSS import change

```diff
- import 'video.js/dist/video-js.css'
+ import '@videojs/react/video/skin.css'
```

### 4. Dependencies

```diff
  // package.json
- "video.js": "8.23.7"
+ "@videojs/react": "^10.x.x"
```

---

## Step-by-Step Migration Checklist

When v10 GA ships and you're ready to migrate:

- [ ] Read the official v10 migration guide (will be published before GA)
- [ ] Install `@videojs/react` GA version: `pnpm add @videojs/react -F @falcon/video`
- [ ] Install streaming features if needed (e.g., SPF for HLS)
- [ ] Write `src/internals/v10-adapter.ts` implementing `VideoPlayerHandle` via `usePlayer()` store
- [ ] Update `src/VideoPlayer.tsx` to render `Provider` / `Container` / `VideoSkin` / `Video` pattern
- [ ] Wire all existing callbacks (`onTimeUpdate`, `onDurationChange`, etc.) to v10 selectors
- [ ] Replace CSS import from `video.js/dist/video-js.css` to `@videojs/react/video/skin.css`
- [ ] Remove old `src/internals/videojs-adapter.ts`
- [ ] Remove `video.js` v8 dependency from `package.json`
- [ ] Run all consumers (Viewer.tsx, LessonViewer.tsx) and verify:
  - [ ] Video playback works (progressive MP4 and HLS)
  - [ ] Captions/subtitles display correctly
  - [ ] Playback rate controls work
  - [ ] Start time / bookmark seeking works
  - [ ] Progress tracking (getPosition interval) works
  - [ ] Lesson view history recording works
  - [ ] Error states render correctly
  - [ ] Audio playback via `mediaType="audio"` works
- [ ] Update this document to reflect the completed migration

---

## Design Decisions Log

### Why `VideoPlayerHandle` instead of exposing the raw player

v8 uses an imperative player object (`player.play()`, `player.currentTime()`).
v10 uses a reactive store (`store.play()`, `usePlayer((s) => s.currentTime)`).
By defining our own interface, consumers are insulated from this paradigm shift.
The handle is a thin wrapper that delegates to whichever engine is active.

### Why `seekTo` prop instead of only imperative `seek()`

v10's architecture is declarative -- state flows down through the Provider.
A `seekTo` prop aligns with React's unidirectional data flow and v10's model.
We also keep `VideoPlayerHandle.seek()` as an imperative escape hatch for
cases like the tryyb `setPosition()` method used by `Viewer.tsx`.

### Why private `internals/` directory

The internal adapter is the ONLY file that imports from `video.js` directly.
By isolating it in a never-exported directory, we ensure no consumer can
accidentally depend on v8-specific APIs. The swap surface area is exactly
one file (plus the CSS import in `VideoPlayer.tsx`).

---

## Links

- [v10 Roadmap](https://videojs.com/docs/framework/react/concepts/v10-roadmap)
- [v10 Beta Blog Post](https://videojs.com/blog/videojs-v10-beta-hello-world-again)
- [createPlayer API Reference](https://videojs.org/docs/framework/react/reference/create-player)
- [v10 RFC Examples](https://github.com/videojs/v10/blob/main/rfc/player-api/examples.md)
- [v10 GitHub Repository](https://github.com/videojs/v10)
- [v8 Legacy Docs](https://legacy.videojs.org/) (available after migration)
- [React llms.txt](https://videojs.org/docs/framework/react/llms.txt) (for AI-assisted development)
