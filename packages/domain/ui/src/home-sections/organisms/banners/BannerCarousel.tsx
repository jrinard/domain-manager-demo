import React, { useEffect, useState, useRef, useCallback } from 'react'
import type { SectionRenderMode } from '@domain/configs'
import type { BannerItem } from '@domain/schemas'
import type { DomainUI } from '@spacedock/manifest'
import { BannerItem as BannerItemComponent } from './BannerItem'

type TransitionType = 'slide' | 'fade' | 'split'

interface BannerCarouselProps {
  banners: BannerItem[]
  attachments?: DomainUI.Attachment[]
  renderMode: SectionRenderMode
  domainID?: number
  autoPlay?: boolean
  slideDuration?: number
  transitionType?: TransitionType
}

export const BannerCarousel = ({
  banners,
  attachments,
  renderMode,
  domainID,
  autoPlay = true,
  slideDuration = 3,
  transitionType = 'slide',
}: BannerCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isPreview = renderMode === 'mock'
  const carouselRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const resetAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current)
      autoplayIntervalRef.current = null
    }
    if (banners.length > 1 && autoPlay) {
      const durationMs = slideDuration * 1000
      autoplayIntervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length)
      }, durationMs)
    }
  }, [banners.length, autoPlay, slideDuration])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    resetAutoplay()
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
    resetAutoplay()
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
    resetAutoplay()
  }

  // Auto-play carousel when enabled
  useEffect(() => {
    if (banners.length <= 1 || !autoPlay) {
      return
    }

    const durationMs = slideDuration * 1000
    autoplayIntervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, durationMs)

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current)
        autoplayIntervalRef.current = null
      }
    }
  }, [banners.length, autoPlay, slideDuration])

  if (banners.length === 1) {
    // Single banner, no carousel needed
    return (
      <BannerItemComponent
        banner={banners[0]}
        attachments={attachments}
        renderMode={renderMode}
        domainID={domainID}
      />
    )
  }

  // Transition configuration - abstracted for easy extension
  // Each transition type defines how the container and items should be styled
  const transitionConfig = {
    slide: {
      container: {
        className: 'flex',
        style: {
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform',
        } as React.CSSProperties,
      },
      item: (index: number, isActive: boolean) => ({
        className: 'w-full flex-shrink-0',
        style: {} as React.CSSProperties,
      }),
    },
    fade: {
      container: {
        className: 'relative w-full flex-shrink-0',
        style: {
          position: 'relative',
          width: '100%',
          minWidth: '100%',
          maxWidth: '100%',
          minHeight: '200px',
          // Ensure container maintains width for absolutely positioned children
          display: 'block',
        } as React.CSSProperties,
      },
      item: (index: number, isActive: boolean) => ({
        className: 'w-full min-w-full flex-shrink-0',
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          opacity: isActive ? 1 : 0,
          transition: 'opacity 2000ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'opacity',
          zIndex: isActive ? 2 : 1,
          pointerEvents: isActive ? 'auto' : 'none',
        } as React.CSSProperties,
      }),
    },
    split: {
      container: {
        className: 'relative w-full flex-shrink-0',
        style: {
          position: 'relative',
          width: '100%',
          minWidth: '100%',
          maxWidth: '100%',
          minHeight: '200px',
          backgroundColor: 'transparent',
          // Ensure container maintains width for absolutely positioned children
          display: 'block',
        } as React.CSSProperties,
      },
      item: (index: number, isActive: boolean) => {
        // Create a diagonal split/prism effect
        // Reveals diagonally from top-left corner across to bottom-right
        // Creates a prism-like split effect
        const clipPath = isActive
          ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
          : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
        
        return {
          className: 'w-full min-w-full flex-shrink-0',
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            opacity: isActive ? 1 : 0,
            clipPath: clipPath,
            transform: isActive 
              ? 'translateX(0) scale(1) rotateZ(0deg)' 
              : 'translateX(-30px) scale(0.98) rotateZ(-1deg)',
            transition: 'clip-path 1500ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1500ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            willChange: 'clip-path, opacity, transform',
            zIndex: isActive ? 2 : 1,
            pointerEvents: isActive ? 'auto' : 'none',
            backgroundColor: 'transparent',
          } as React.CSSProperties,
        }
      },
    },
  } as const

  const config = transitionConfig[transitionType] || transitionConfig.slide

  return (
    <div 
      className="group relative w-full min-w-0 flex-shrink-0 overflow-hidden rounded-lg"
      style={{
        backgroundColor: 'transparent',
      }}
    >
      {/* Transparent width-establishing container - ensures proper width regardless of image or transition type */}
      {/* This container establishes the width for the grid, and absolutely positioned children fill it */}
      <div
        className="relative w-full"
        style={{
          minHeight: '200px',
          backgroundColor: 'transparent',
          // Ensure container has height for absolutely positioned children
          ...(transitionType !== 'slide' ? { height: 'auto' } : {}),
        }}
      >
        {/* For fade/split: render a non-positioned placeholder to establish width and height */}
        {transitionType !== 'slide' && banners.length > 0 && (
          <div
            className="w-full"
            style={{
              position: 'relative',
              visibility: 'hidden',
              minHeight: '200px',
              pointerEvents: 'none',
              // Let the banner establish its natural height
            }}
            aria-hidden="true"
          >
            <BannerItemComponent
              banner={banners[0]}
              attachments={attachments}
              renderMode={renderMode}
              domainID={domainID}
            />
          </div>
        )}
        {/* Carousel container */}
        <div 
          className="relative w-full min-w-0" 
          ref={containerRef}
          style={{
            backgroundColor: 'transparent',
            // For fade/split, ensure this container fills the parent height
            ...(transitionType !== 'slide' ? { 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            } : {}),
          }}
        >
          <div
            ref={carouselRef}
            className={config.container.className}
            style={{
              ...config.container.style,
              width: '100%',
              minWidth: '100%',
              maxWidth: '100%',
              backgroundColor: 'transparent',
              // For fade/split, ensure full height
              ...(transitionType !== 'slide'
                ? {
                    height: '100%',
                  }
                : {}),
            }}
          >
            {banners.map((banner, index) => {
              const isActive = index === currentIndex
              const itemConfig = config.item(index, isActive)
              return (
                <div
                  key={index}
                  className={itemConfig.className}
                  style={itemConfig.style}
                >
                  <BannerItemComponent
                    banner={banner}
                    attachments={attachments}
                    renderMode={renderMode}
                    domainID={domainID}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity duration-200 hover:bg-black/70 group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity duration-200 hover:bg-black/70 group-hover:opacity-100"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Navigation Dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
