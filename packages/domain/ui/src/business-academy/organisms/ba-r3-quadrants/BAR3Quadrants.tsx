import { DISCQuadrants } from '@spacedock/dossier'
import React, { useMemo, useState } from 'react'
import { DiscProfile } from '@tyto/client'
import {
  SkeletonSquare,
  Switch,
  TextBody,
  TextHeading,
} from '@spacedock/falcon-ui'
import { useMeasure } from 'react-use'
import { BAStyleKey } from '../ba-style-key/BAStyleKey'
import { Link } from '@spacedock/navigator'
import { Icon } from '@falcon/icons'

export interface BAR3QuadrantsProps {
  discProfile?: DiscProfile
  isLoading?: boolean
  isPreviewMode?: boolean
}

const BAR3Quadrants = ({
  discProfile,
  isLoading,
  isPreviewMode = false,
}: BAR3QuadrantsProps) => {
  const [isPrivate, setIsPrivate] = useState(false)

  const discValue = useMemo(() => {
    return {
      d3: discProfile?.d3 || 0,
      i3: discProfile?.i3 || 0,
      s3: discProfile?.s3 || 0,
      c3: discProfile?.c3 || 0,
      d2: discProfile?.d2 || 0,
      i2: discProfile?.i2 || 0,
      s2: discProfile?.s2 || 0,
      c2: discProfile?.c2 || 0,
      d1: discProfile?.d1 || 0,
      i1: discProfile?.i1 || 0,
      s1: discProfile?.s1 || 0,
      c1: discProfile?.c1 || 0,
      styleKey3: discProfile?.styleKey3 ?? '',
    }
  }, [discProfile])

  const [ref, { width, height }] = useMeasure<HTMLDivElement>()

  const previewScale = isPreviewMode ? 0.8 : 1 // Fixed 80% scale for preview
  const quadrantsSize = width

  return (
    <section
      ref={ref}
      className="flex w-full flex-col items-start gap-0.5 overflow-hidden"
      style={
        isPreviewMode
          ? {
              transform: `scale(${previewScale})`,
              transformOrigin: 'top left',
              width: `${100 / previewScale}%`,
              height: `${100 / previewScale}%`,
            }
          : {}
      }
    >
      <div className="flex w-full items-center justify-between">
        <TextHeading uppercase={false} size={5}>
          R3
        </TextHeading>
        {!isPreviewMode && (
          <Link to={''} app="r3-tool">
            <Icon icon="arrow-right" color={'muted'} size="xl" />
          </Link>
        )}
      </div>

      {isLoading && <SkeletonSquare size="full" />}
      {!isLoading && width !== 0 && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <TextBody color={'pink100/60'}>Individual Style:</TextBody>
            <BAStyleKey styleKey={discProfile?.styleKey3 ?? ''} />
          </div>
          <div className={`relative ${isPreviewMode ? 'my-1.5' : ''}`}>
            {/* Grid background for preview mode */}
            {isPreviewMode && (
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-4">
                <div className="rounded border border-neutral-600"></div>
                <div className="rounded border border-neutral-600"></div>
                <div className="rounded border border-neutral-600"></div>
                <div className="rounded border border-neutral-600"></div>
              </div>
            )}
            <div className={isPreviewMode ? 'p-6' : ''}>
              <DISCQuadrants
                size={isPreviewMode ? quadrantsSize * 0.7 : quadrantsSize}
                graph={isPrivate ? 'Private' : 'Public'}
                discValues={discValue}
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center gap-4">
        <Switch
          checked={isPrivate}
          onCheckedChange={(e) => setIsPrivate(e === true)}
        />
        <TextBody color={'pink100/60'}>Private</TextBody>
      </div>
    </section>
  )
}
BAR3Quadrants.displayName = 'BAR3'

export { BAR3Quadrants }
