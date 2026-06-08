import { Heatmap, HeatmapProps } from '@spacedock/dossier'
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
import {
  calcGroupStyle,
  getGroupStyleWithStdDeviation,
} from '../../functions/BAR3Functions'
import { Link } from '@spacedock/navigator'
import { Icon } from '@falcon/icons'

export interface BAR3Props {
  discProfiles: DiscProfile[]
  teamName: string
  isLoading?: boolean
  isPreview?: boolean
}

const BAR3 = ({ discProfiles, isLoading, teamName, isPreview }: BAR3Props) => {
  const [underStress, setUnderStress] = useState(false)

  const discValues: HeatmapProps['discValues'] = useMemo(() => {
    const profiile = discProfiles.map(
      (profile): HeatmapProps['discValues'][0] => {
        return {
          d3: profile.d3 || 0,
          i3: profile.i3 || 0,
          s3: profile.s3 || 0,
          c3: profile.c3 || 0,
          d2: profile.d2 || 0,
          i2: profile.i2 || 0,
          s2: profile.s2 || 0,
          c2: profile.c2 || 0,
          d1: profile.d1 || 0,
          i1: profile.i1 || 0,
          s1: profile.s1 || 0,
          c1: profile.c1 || 0,
          styleKey3: profile.styleKey3,
          personID: profile.personID,
          personName: profile.personName,
        }
      },
    )
    return profiile
  }, [discProfiles])

  const teamStyle = React.useMemo(() => {
    const newGroupStyle = calcGroupStyle(discValues)

    if (Array.isArray(newGroupStyle) && newGroupStyle.length) {
      return getGroupStyleWithStdDeviation(newGroupStyle)
    }
    return ''
  }, [discValues, underStress])

  const [ref, { width }] = useMeasure<HTMLDivElement>()

  return (
    <section
      ref={ref}
      className="flex w-full flex-col items-start gap-3 overflow-hidden"
    >
      <div className="flex w-full items-center justify-between">
        <TextHeading uppercase={false} size={5}>
          R3
        </TextHeading>
        {isPreview ? (
          <div>
            <Icon icon="arrow-right" color={'muted'} size="xl" />
          </div>
        ) : (
          <Link to={''} app="r3-tool">
            <Icon icon="arrow-right" color={'muted'} size="xl" />
          </Link>
        )}
      </div>
      <TextHeading uppercase={false} color={'pink100/60'} truncate>
        {teamName}
      </TextHeading>

      {isLoading && <SkeletonSquare size="full" />}
      {!isLoading && width !== 0 && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <TextBody color={'pink100/60'}>Group Style:</TextBody>
            <BAStyleKey styleKey={teamStyle} />
          </div>
          <Heatmap
            heatMapType={underStress ? 'private' : 'public'}
            discValues={discValues}
            omitLabels
            heatMapWidth={width}
          />
        </div>
      )}
      <div className="flex items-center gap-4">
        <Switch
          checked={underStress}
          onCheckedChange={(e) => setUnderStress(e === true)}
        />
        <TextBody color={'pink100/60'}>Under Stress</TextBody>
      </div>
    </section>
  )
}
BAR3.displayName = 'BAR3'

export { BAR3 }
