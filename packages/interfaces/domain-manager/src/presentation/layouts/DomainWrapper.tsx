import * as React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useApplyDomainStylesheet } from '@domain/configs'
import DomainHeader from './DomainHeader'
import { useSession } from '@spacedock/cargo-bay'

export const DomainWrapper = () => {
  const { domainID } = useParams<{ domainID: string }>()
  const domainIDNumber = domainID ? Number(domainID) : undefined
  const session = useSession({ throwOnMissingSession: false })
  const onCourseURL = session?.onCourseURL

  // Apply the edited domain's stylesheet immediately when domain is selected/changed
  // This ensures the preview shows the correct theme for the domain being edited
  useApplyDomainStylesheet({
    domainID: domainIDNumber,
    originOverride: onCourseURL,
  })

  if (!domainID) return null

  return (
    <div className="mx-6 flex h-full flex-col">
      <div className="bg-site-bg sticky top-[var(--site-top-height)] z-10 pt-6">
        <DomainHeader teamID={Number(domainID)} />
      </div>
      <div className="grow overflow-visible">
        <Outlet /> {/* Domain tab content */}
      </div>
    </div>
  )
}
