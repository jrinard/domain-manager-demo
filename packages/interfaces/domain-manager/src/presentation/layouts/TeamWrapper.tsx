import * as React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import TeamHeader from './TeamHeader'

export const TeamWrapper = () => {
  const { teamID } = useParams<{ teamID: string }>()

  if (!teamID) return null

  return (
    <div className="mx-6 flex h-full flex-col">
      <div className="bg-site-bg sticky top-[var(--site-top-height)] z-10 pt-6">
        <TeamHeader teamID={Number(teamID)} />
      </div>
      <div className="flex-1 overflow-visible">
        <Outlet /> {/* Team tab content */}
      </div>
    </div>
  )
}
